import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { SkipLink } from "@/components/SkipLink";
import { rootMetadata } from "@/lib/metadata";
import "./globals.css";

const goatDisplay = Bebas_Neue({
  variable: "--font-goat-display",
  subsets: ["latin"],
  weight: "400",
});

const ripsSans = DM_Sans({
  variable: "--font-rips-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = rootMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${goatDisplay.variable} ${ripsSans.variable} h-full antialiased`}
    >
      <body className="font-sans flex min-h-full flex-col overflow-x-hidden bg-background text-foreground">
        <CartProvider>
          <SkipLink />
          <SiteHeader />
          <div id="main-content" className="flex flex-1 flex-col scroll-mt-[var(--header-offset)]">
            {children}
          </div>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
