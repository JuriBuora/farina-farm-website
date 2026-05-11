import { Suspense, lazy, useEffect, useState } from "react";

const CookieConsentBanner = lazy(() => import("@/components/CookieConsentBanner"));
const Toaster = lazy(() => import("@/components/ui/toaster").then((module) => ({ default: module.Toaster })));
const CLIENT_CHROME_DELAY_MS = 5000;

const scheduleAfterFirstPaint = (callback: () => void) => {
  let firstFrame = 0;
  let secondFrame = 0;
  let idleHandle: number | null = null;
  let timeoutHandle: number | null = null;

  const run = () => {
    if (typeof window.requestIdleCallback === "function") {
      idleHandle = window.requestIdleCallback(callback, { timeout: CLIENT_CHROME_DELAY_MS });
      return;
    }

    timeoutHandle = window.setTimeout(callback, CLIENT_CHROME_DELAY_MS);
  };

  firstFrame = window.requestAnimationFrame(() => {
    secondFrame = window.requestAnimationFrame(run);
  });

  return () => {
    window.cancelAnimationFrame(firstFrame);
    window.cancelAnimationFrame(secondFrame);
    if (idleHandle !== null && typeof window.cancelIdleCallback === "function") {
      window.cancelIdleCallback(idleHandle);
    }
    if (timeoutHandle !== null) {
      window.clearTimeout(timeoutHandle);
    }
  };
};

const DeferredClientChrome = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    return scheduleAfterFirstPaint(() => setReady(true));
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <Toaster />
      <CookieConsentBanner />
    </Suspense>
  );
};

export default DeferredClientChrome;
