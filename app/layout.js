import { Bodoni_Moda, Inter_Tight } from "next/font/google";
import Header from "@/components/Header";
import { BagProvider } from "@/components/BagProvider";
import { site } from "@/data/site";
import "./globals.css";

const bodoni = Bodoni_Moda({ subsets: ["latin"], variable: "--font-bodoni", style: ["normal", "italic"] });
const inter = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight" });

export const metadata = {
  title: { default: `${site.name} — ${site.tagline}`, template: `%s — ${site.name}` },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    images: ["/media/oseyi-box.jpg"],
  },
};

export const viewport = {
  themeColor: "#0f0e0d",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bodoni.variable} ${inter.variable}`}>
      <body className="grain">
        <BagProvider>
          <Header />
          {children}
        </BagProvider>
      </body>
    </html>
  );
}
