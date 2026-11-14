import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

const tiles = [
  { cat: "Shirts", image: "/media/pocket-shirt-ivory.jpg", line: "Crochet, textured and ribbed" },
  { cat: "Footwear", image: "/media/boston-pink.jpg", line: "Boston suede in five colours" },
];

// Two big doors into the shop.
export default function Categories() {
  return (
    <section className="grid gap-3 px-[var(--gutter)] md:grid-cols-2">
      {tiles.map((t) => {
        const n = products.filter((p) => p.category === t.cat).length;
        return (
          <Link key={t.cat} href={`/shop?c=${t.cat}`} className="group relative block aspect-[4/5] overflow-hidden md:aspect-[5/6]">
            <Image src={t.image} alt={t.cat} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-10">
              <div>
                <p className="caps text-bone/70">
                  {n} piece{n === 1 ? "" : "s"} · {t.line}
                </p>
                <h2 className="display mt-3 text-[18vw] md:text-[7vw]">{t.cat}</h2>
              </div>
              <span className="gleam caps hidden shrink-0 md:inline-flex group-hover:border-bone group-hover:bg-bone group-hover:text-ink">Shop {t.cat.toLowerCase()}</span>
            </div>
          </Link>
        );
      })}
    </section>
  );
}
