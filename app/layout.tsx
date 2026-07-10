import type { Metadata } from "next";
import "./globals.css";

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
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Jermaine’s — Eat. Drink. Love. — Gunnison, Colorado" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jermaine’s | Eat. Drink. Love.",
    description: "Sweet treats, savory favorites, and Caribbean flavor in the heart of Gunnison.",
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
