"""Create and decode-verify print-ready QR assets for the permanent /qr address.

Install the one-off generator dependencies with:
  python3 -m pip install "qrcode[pil]" cairosvg zxing-cpp
"""

from pathlib import Path
from tempfile import TemporaryDirectory

import cairosvg
import qrcode
import zxingcpp
from PIL import Image
from qrcode.constants import ERROR_CORRECT_H
from qrcode.image.svg import SvgPathImage

QR_PUBLIC_URL = "https://www.aziendaagricolafarina.com/qr"
OUTPUT_DIR = Path("public/qr-assets")
LOGO_PATH = Path("public/logo-farina.png")


def make_qr(box_size: int, fill_color: str = "#000000") -> Image.Image:
    code = qrcode.QRCode(error_correction=ERROR_CORRECT_H, box_size=box_size, border=4)
    code.add_data(QR_PUBLIC_URL)
    code.make(fit=True)
    return code.make_image(fill_color=fill_color, back_color="#ffffff").convert("RGBA")


def make_svg(output_path: Path) -> None:
    code = qrcode.QRCode(error_correction=ERROR_CORRECT_H, box_size=16, border=4, image_factory=SvgPathImage)
    code.add_data(QR_PUBLIC_URL)
    code.make(fit=True)
    code.make_image().save(output_path)


def make_branded_qr() -> Image.Image:
    image = make_qr(box_size=48, fill_color="#163d25")
    logo = Image.open(LOGO_PATH).convert("RGBA")
    logo.thumbnail((170, 170), Image.Resampling.LANCZOS)

    # A small white backing preserves contrast; the centered mark is well clear
    # of the three finder patterns and is protected by high error correction.
    badge_size = max(logo.width, logo.height) + 34
    badge = Image.new("RGBA", (badge_size, badge_size), "white")
    badge.alpha_composite(logo, ((badge_size - logo.width) // 2, (badge_size - logo.height) // 2))
    position = ((image.width - badge_size) // 2, (image.height - badge_size) // 2)
    image.alpha_composite(badge, position)
    return image


def assert_decodes_to(image_path: Path) -> None:
    image = Image.open(image_path).convert("RGB")
    result = zxingcpp.read_barcode(image)
    if result is None or result.text != QR_PUBLIC_URL:
        raise RuntimeError(f"{image_path} did not decode to the expected QR URL")


def assert_svg_decodes_to(svg_path: Path) -> None:
    with TemporaryDirectory() as temp_dir:
        raster_path = Path(temp_dir) / "qr.svg.png"
        cairosvg.svg2png(
            url=str(svg_path),
            write_to=str(raster_path),
            output_width=2048,
            output_height=2048,
            background_color="#ffffff",
        )
        assert_decodes_to(raster_path)


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    high_resolution = OUTPUT_DIR / "azienda-agricola-farina-qr.png"
    compact = OUTPUT_DIR / "azienda-agricola-farina-qr-compact.png"
    branded = OUTPUT_DIR / "azienda-agricola-farina-qr-branded.png"
    scalable = OUTPUT_DIR / "azienda-agricola-farina-qr.svg"

    make_qr(box_size=52).save(high_resolution)
    make_qr(box_size=14).save(compact)
    make_branded_qr().save(branded)
    make_svg(scalable)

    for file_path in (high_resolution, compact, branded):
        assert_decodes_to(file_path)
    assert_svg_decodes_to(scalable)

    print(f"[qr-assets] Generated and verified 4 assets for {QR_PUBLIC_URL}")


if __name__ == "__main__":
    main()
