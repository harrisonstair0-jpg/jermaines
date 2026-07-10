import type { Metadata } from "next";
import "./globals.css";

const assetPath = process.env.GITHUB_PAGES === "true" ? "/jermaines" : "";

export const metadata: Metadata = {
  title: "Jermaine’s | Eat. Drink. Love. | Gunnison, Colorado",
  description: "Jermaine’s is Gunnison’s colorful café for ice cream, frozen yogurt, sandwiches, shakes, Jamaican coffee, baked treats, and more.",
  keywords: ["Jermaine’s Gunnison", "ice cream Gunnison", "frozen yogurt Gunnison", "café Gunnison", "sandwiches Gunnison"],
  openGraph: {
    title: "Jermaine’s | Eat. Drink. Love.",
    description: "Sweet treats, savory favorites, and Caribbean flavor in the heart of Gunnison.",
    type: "website",
    locale: "en_US",
    siteName: "Jermaine’s",
    images: [{ url: `${assetPath}/og.png`, width: 1200, height: 630, alt: "Jermaine’s — Eat. Drink. Love. — Gunnison, Colorado" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jermaine’s | Eat. Drink. Love.",
    description: "Sweet treats, savory favorites, and Caribbean flavor in the heart of Gunnison.",
    images: [`${assetPath}/og.png`],
  },
  icons: { icon: `${assetPath}/favicon.svg`, shortcut: `${assetPath}/favicon.svg` },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
