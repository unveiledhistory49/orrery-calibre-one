import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";

export const metadata: Metadata = {
  title: "ORRERY — CALIBRE ONE",
  description:
    "A 39mm titanium mechanical watch with an in-house movement. Inside the movement.",
  metadataBase: new URL("https://orrery.example"),
  openGraph: {
    title: "ORRERY — CALIBRE ONE",
    description: "A movement made, not assumed.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#film" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
