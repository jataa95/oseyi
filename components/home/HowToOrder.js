import Button from "../Button";
import { site } from "@/data/site";

const steps = [
  { n: "01", title: "Add to bag", body: "Pick your pieces, colours and sizes. Your bag is saved on this device." },
  { n: "02", title: "Send your order", body: "Tap Order on Instagram. We copy your order so you can paste it straight into the DM." },
  { n: "03", title: "Receive it boxed", body: "We confirm payment and delivery, then send it in the Òseyi box anywhere in Nigeria." },
];

export default function HowToOrder() {
  return (
    <section className="px-[var(--gutter)] py-[14vh]">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
          <h2 className="display text-[14vw] md:text-[5vw]">How to order</h2>
          <Button href={site.instagramDm}>Questions? Send a DM</Button>
        </div>
        <ol className="grid gap-12 pt-10 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n}>
              <p className="display text-2xl text-stone">{s.n}</p>
              <h3 className="display mt-4 text-4xl">{s.title}</h3>
              <p className="mt-3 max-w-[38ch] text-[15px] leading-relaxed text-bone/70">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
