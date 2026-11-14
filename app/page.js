import Preloader from "@/components/home/Preloader";
import Intro from "@/components/home/Intro";
import Perks from "@/components/home/Perks";
import NewIn from "@/components/home/NewIn";
import Categories from "@/components/home/Categories";
import Collection from "@/components/home/Collection";
import Ordinary from "@/components/home/Ordinary";
import HowToOrder from "@/components/home/HowToOrder";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Preloader line="Shirts, footwear and gifts. Delivered across Nigeria." />
      <main>
        <Intro />
        <Perks />
        <NewIn />
        <Categories />
        <Collection />
        <Ordinary />
        <HowToOrder />
      </main>
      <Footer />
    </>
  );
}
