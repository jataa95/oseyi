import Button from "../Button";
import RevealTitle from "../RevealTitle";
import { products } from "@/data/products";

// Full-screen video with the headline and the two ways into the shop.
export default function Intro() {
  return (
    <section className="relative h-svh overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/media/dressing-classy.mp4"
        poster="/media/dressing-classy-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/40" />
      <div className="absolute inset-x-0 bottom-0 grid gap-8 px-[var(--gutter)] pb-16 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="caps text-bone/70">New season · {products.length} pieces</p>
          <RevealTitle as="h1" afterEnter text={"The New\nCollection"} className="mt-4 text-[22vw] md:text-[10vw]" />
        </div>
        <div className="max-w-[360px] md:pb-4">
          <p className="text-[17px] leading-snug text-bone/85">Shirts, footwear and gifts. Delivered across Nigeria.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/shop">Shop now</Button>
            <Button href="/shop?c=Footwear">Footwear</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
