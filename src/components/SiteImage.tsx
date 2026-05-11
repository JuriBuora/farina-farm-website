import type { ImgHTMLAttributes } from "react";
import { getSiteImage, type SiteImageSource } from "@/lib/siteImages";

type SiteImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> & {
  alt: string;
  image?: SiteImageSource;
  imageName?: string;
  preferOriginal?: boolean;
};

export default function SiteImage({
  alt,
  image,
  imageName,
  fetchPriority,
  preferOriginal = false,
  sizes = "100vw",
  ...imgProps
}: SiteImageProps) {
  const resolvedImage = image ?? (imageName ? getSiteImage(imageName) : undefined);

  if (!resolvedImage) {
    throw new Error("SiteImage requires either image or imageName.");
  }

  const avifSource = preferOriginal ? undefined : resolvedImage.avifSrcSet ?? resolvedImage.avif;
  const webpSource = preferOriginal ? undefined : resolvedImage.webpSrcSet ?? resolvedImage.webp;

  return (
    <picture>
      {avifSource ? <source srcSet={avifSource} type="image/avif" sizes={sizes} /> : null}
      {webpSource ? <source srcSet={webpSource} type="image/webp" sizes={sizes} /> : null}
      <img
        src={resolvedImage.src}
        alt={alt}
        {...(preferOriginal ? {} : { sizes })}
        {...(fetchPriority ? { fetchpriority: fetchPriority } : {})}
        {...imgProps}
      />
    </picture>
  );
}
