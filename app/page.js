import Gallery from "@/components/Gallery";
import { gallery } from "@/data/gallery";
import { site } from "@/data/site";

export default function Home() {
  return (
    <main
      className="flex h-svh flex-col overflow-hidden pb-[var(--gutter)]"
      style={{ "--item": "min(var(--col), calc((100svh - 230px) * 0.8))" }}
    >
      <section className="grid flex-1 grid-cols-4 items-end gap-[var(--gap)] px-[var(--gutter)] pb-10">
        <h1 className="col-span-4 font-serif text-[13vw] leading-[0.85] tracking-[-0.01em] md:col-span-2 md:text-[5.2vw]">
          The art of
          <br />
          <em>dressing classy.</em>
        </h1>
        <p className="label col-span-4 max-w-[34ch] text-ash md:col-span-1 md:col-start-3">
          Textured shirts, everyday footwear and gifts, packed in black. Made for {site.city}, delivered across Nigeria.
        </p>
      </section>
      <div className="max-md:[--item:72vw]">
        <Gallery items={gallery} />
      </div>
    </main>
  );
}
