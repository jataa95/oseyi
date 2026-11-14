import Gate from "@/components/home/Gate";
import Intro from "@/components/home/Intro";
import Expand from "@/components/home/Expand";
import Slides from "@/components/home/Slides";
import Statement from "@/components/home/Statement";
import Collection from "@/components/home/Collection";
import Ordinary from "@/components/home/Ordinary";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Gate line="Shirts, footwear and gifts chosen for texture, detail and presence. Not simply to be worn." />
      <main>
        <Intro />
        <Expand />
        <Slides />
        <Statement />
        <Collection />
        <Ordinary />
      </main>
      <Footer />
    </>
  );
}
