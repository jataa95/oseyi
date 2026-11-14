import { Geist, Instrument_Serif } from "next/font/google";
import Header from "@/components/Header";
import SmoothScroll from "@/components/SmoothScroll";
import { BagProvider } from "@/components/BagProvider";
import { site } from "@/data/site";
import "./globals.css";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument" });
const sans = Geist({ subsets: ["latin"], variable: "--font-geist" });

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
  themeColor: "#050505",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="weave grain">
        <BagProvider>
          <SmoothScroll />
          <Header />
          {children}
        </BagProvider>
      </body>
    </html>
  );
}
