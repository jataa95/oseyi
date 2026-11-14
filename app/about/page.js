import Image from "next/image";
import Footer from "@/components/Footer";
import RevealTitle from "@/components/RevealTitle";
import { site } from "@/data/site";

export const metadata = { title: "Our Story" };

const notes = [
  { n: "01", title: "From a corner of a room", body: "Òseyi started in a small corner of a bedroom. Today it has its own workspace, shelves of black boxes and a steady stream of orders going out." },
  { n: "02", title: "Packed in black", body: "Every order leaves in the matte-black Òseyi box with a dust bag and swing tag. It's meant to feel like a gift, even when it's for you." },
  { n: "03", title: "Delivered nationwide", body: "We ship across Nigeria. Order by DM, we confirm sizes and delivery, and your box is on its way." },
  { n: "04", title: "Registered and reviewed", body: "Òseyi is a CAC-registered business. Customer reviews and delivery updates are on our Instagram highlights." },
];

export default function About() {
  return (
    <>
      <main className="px-[var(--gutter)]">
        <section className="grid min-h-svh place-items-center text-center">
          <div>
            <p className="caps text-ash">Our story</p>
            <RevealTitle as="h1" text={"Classy, Without\nThe Effort"} className="mt-6 text-[17vw] md:text-[8vw]" />
          </div>
        </section>

        <section className="mx-auto grid max-w-[1200px] items-center gap-12 md:grid-cols-2 md:gap-24">
          <div className="relative aspect-[9/16] overflow-hidden border border-line md:max-w-[440px]">
            <video src="/media/unboxing.mp4" poster="/media/unboxing-poster.jpg" muted loop playsInline autoPlay preload="metadata" className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="display text-[9vw] md:text-[3.4vw]">
              {site.name} is a Nigerian clothing brand for people who like to look put together.
            </p>
            <p className="mt-8 max-w-[46ch] text-[17px] leading-snug text-bone/75">
              Textured shirts with small details, everyday footwear, and a box worth keeping. We pick every piece for how it
              feels and how it sits, then pack it like a gift.
            </p>
          </div>
        </section>

        <ul className="mx-auto mt-[20vh] grid max-w-[1400px] grid-cols-1 gap-x-8 gap-y-14 border-t border-line pt-8 md:grid-cols-4">
          {notes.map((n) => (
            <li key={n.n}>
              <p className="display text-2xl text-ash">{n.n}</p>
              <h2 className="display mt-6 text-4xl">{n.title}</h2>
              <p className="mt-4 max-w-[36ch] text-[15px] leading-relaxed text-bone/70">{n.body}</p>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-[20vh] grid max-w-[1400px] grid-cols-2 gap-3 md:grid-cols-4">
          {["/media/oseyi-box.jpg", "/media/duo-flatlay.jpg", "/media/matching-pairs-still.jpg", "/media/black-white-duo.jpg"].map((src) => (
            <div key={src} className="relative aspect-[4/5] overflow-hidden bg-coal">
              <Image src={src} alt="" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
