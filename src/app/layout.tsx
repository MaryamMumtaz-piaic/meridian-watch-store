import type { Metadata } from "next";
import { Outfit, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import { ConditionalChrome } from "@/components/layout/conditional-chrome";
import { Providers } from "@/components/layout/providers";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Maison Temps — Fine Mechanical Watches",
    template: "%s | Maison Temps",
  },
  description:
    "Maison Temps crafts fine mechanical watches — heritage movements, considered materials, made to be worn for a lifetime.",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⌚</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${cormorant.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <ConditionalChrome>{children}</ConditionalChrome>
        </Providers>
      </body>
    </html>
  );
}
