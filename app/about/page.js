import Image from "next/image";
import Footer from "@/components/Footer";
import { site } from "@/data/site";

export const metadata = { title: "About" };

const notes = [
  { n: "01", title: "From a corner of a room", body: "Òseyi started in a small corner of a bedroom. Today it has its own workspace, shelves of black boxes and a steady stream of orders going out." },
  { n: "02", title: "Packed in black", body: "Every order leaves in the matte-black Òseyi box with a dust bag and swing tag. It's meant to feel like a gift, even when it's for you." },
  { n: "03", title: "Delivered nationwide", body: "We ship across Nigeria. Order by DM, we confirm sizes and delivery, and your box is on its way." },
  { n: "04", title: "Registered and reviewed", body: "Òseyi is a CAC-registered business. Customer reviews and delivery updates are on our Instagram highlights." },
];

export default function About() {
  return (
    <>
      <main className="px-[var(--gutter)] pt-[30vh]">
        <div className="grid grid-cols-4 gap-[var(--gap)]">
          <h1 className="col-span-4 font-serif text-[14vw] leading-[0.85] md:col-span-3 md:text-[7.5vw]">
            Classy, <em>without</em>
            <br />
            the effort.
          </h1>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-[var(--gap)] md:grid-cols-4">
          <div className="relative aspect-[9/16] overflow-hidden bg-coal md:col-span-1">
            <video src="/media/unboxing.mp4" poster="/media/unboxing-poster.jpg" muted loop playsInline autoPlay preload="metadata" className="h-full w-full object-cover" />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden bg-coal md:col-span-1 md:mt-[30%]">
            <Image src="/media/oseyi-box.jpg" alt="The Òseyi box" fill sizes="(min-width: 768px) 25vw, 100vw" className="object-cover" />
          </div>
          <div className="md:col-span-2 md:pl-[calc(var(--col)*0.25)]">
            <p className="font-serif text-3xl leading-tight md:text-4xl">
              {site.name} is a Nigerian clothing brand for people who like to look put together: textured shirts with
              small details, everyday footwear, and a box worth keeping.
            </p>
          </div>
        </div>

        <ul className="mt-32 grid grid-cols-1 gap-x-[var(--gap)] gap-y-12 border-t border-line pt-4 md:grid-cols-4">
          {notes.map((n) => (
            <li key={n.n}>
              <p className="label text-ash">{n.n}</p>
              <h2 className="label mt-6">{n.title}</h2>
              <p className="mt-2 max-w-[36ch] text-[15px] leading-relaxed text-bone/75">{n.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-32 grid grid-cols-2 gap-[var(--gap)] md:grid-cols-4">
          {["/media/duo-flatlay.jpg", "/media/matching-pairs-still.jpg", "/media/crochet-shirt-back.jpg", "/media/textured-shirt-white.jpg"].map((src) => (
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
