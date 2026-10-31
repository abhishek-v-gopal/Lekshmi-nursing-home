import Script from "next/script";
// Google Analytics 4. Production builds only, so local development is not counted.
// NEXT_PUBLIC_GA_ID on the host overrides the default property.
// GA4 counts page changes between pages on its own (enhanced measurement), so no router hook is needed.
export default function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID || "G-Y00Z3E9HLF";
  if (process.env.NODE_ENV !== "production" || !/^G-[A-Z0-9]+$/.test(id)) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${id}');`}
      </Script>
    </>
  );
}
