/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
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