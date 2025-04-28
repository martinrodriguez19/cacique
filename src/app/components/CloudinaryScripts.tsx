'use client';

import Script from 'next/script';

export default function CloudinaryScripts() {
  return (
    <Script
      src="https://upload-widget.cloudinary.com/global/all.js"
      strategy="lazyOnload"
      id="cloudinary-widget-script"
    />
  );
}