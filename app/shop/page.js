import Link from "next/link";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import RevealTitle from "@/components/RevealTitle";
import { categories, products } from "@/data/products";

export const metadata = { title: "Shop" };

export default async function Shop({ searchParams }) {
  const { c } = await searchParams;
  const active = categories.includes(c) ? c : "All";
  const list = active === "All" ? products : products.filter((p) => p.category === active);
  const count = (cat) => (cat === "All" ? products.length : products.filter((p) => p.category === cat).length);

  return (
    <>
      <main className="px-[var(--gutter)] pt-[26vh]">
        <div className="text-center">
          <p className="caps text-ash">The collection</p>
          <RevealTitle key={active} as="h1" text={active === "All" ? "Every Piece" : active} className="mt-6 text-[20vw] md:text-[9vw]" />
          <nav aria-label="Categories" className="caps mt-10 flex justify-center gap-8">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={cat === "All" ? "/shop" : `/shop?c=${cat}`}
                className={`border-b pb-1 transition-colors ${cat === active ? "border-bone text-bone" : "border-transparent text-ash hover:text-bone"}`}
                aria-current={cat === active ? "page" : undefined}
              >
                {cat} ({count(cat)})
              </Link>
            ))}
          </nav>
        </div>
        <div className="mx-auto mt-20 grid max-w-[1400px] grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
