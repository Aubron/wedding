/*
 * The Typekit service used to deliver this font or fonts for use on websites
 * is provided by Adobe and is subject to these Terms of Use
 * http://www.adobe.com/products/eulas/tou_typekit. For font license
 * information, see the list below.
 *
 * dolce:
 *   - http://typekit.com/eulas/00000000000000007735bd2b
 *   - http://typekit.com/eulas/00000000000000007735bd2e
 * gaultier:
 *   - http://typekit.com/eulas/00000000000000007735c63f
 *   - http://typekit.com/eulas/00000000000000007735c642
 *   - http://typekit.com/eulas/00000000000000007735c653
 *   - http://typekit.com/eulas/00000000000000007735c655
 * gaultier-lights:
 *   - http://typekit.com/eulas/00000000000000007735c654
 *   - http://typekit.com/eulas/00000000000000007735c656
 * layaan-arabic:
 *   - http://typekit.com/eulas/00000000000000007750ff1f
 *
 * © 2009-2024 Adobe Systems Incorporated. All Rights Reserved.
 */
/*{"last_published":"2024-03-15 04:40:48 UTC"}*/

import localFont from "next/font/local";
// Font files can be colocated inside of `pages`
export const layaan = localFont({ src: "./fonts/layaan-arabic.woff2" });
export const dolce = localFont({
  src: [
    {
      path: "./fonts/dolce-400.woff2",
      weight: "400",
    },
    {
      path: "./fonts/dolce-700.woff2",
      weight: "700",
    },
  ],
});

export const gaultier = localFont({
  src: [
    {
      path: "./fonts/gaultier-300-i.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/gaultier-300-i.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/gaultier-400-i.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/gaultier-400-n.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/gaultier-700-i.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/gaultier-700-n.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});
