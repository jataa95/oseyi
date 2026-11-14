import RevealTitle from "../RevealTitle";

// First screen after entering: one centred line.
export default function Intro() {
  return (
    <section className="grid h-svh place-items-center px-[var(--gutter)] text-center">
      <RevealTitle as="h1" afterEnter text={"We Don’t Just Make Shirts\nWe Dress You Classy"} className="text-[12vw] md:text-[6.4vw]" />
    </section>
  );
}
