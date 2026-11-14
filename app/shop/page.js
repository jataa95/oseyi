import Link from "next/link";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Roll from "@/components/Roll";
import { categories, products } from "@/data/products";

export const metadata = { title: "Shop" };

export default async function Shop({ searchParams }) {
  const { c } = await searchParams;
  const active = categories.includes(c) ? c : "All";
  const list = active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <>
      <main className="px-[var(--gutter)] pt-[30vh]">
        <div className="mb-10 grid grid-cols-4 items-end gap-[var(--gap)]">
          <h1 className="col-span-4 font-serif text-[18vw] leading-[0.8] md:col-span-2 md:text-[9vw]">
            {active === "All" ? "Shop" : active}
          </h1>
          <nav aria-label="Categories" className="label col-span-4 flex gap-6 md:col-span-2 md:col-start-3">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={cat === "All" ? "/shop" : `/shop?c=${cat}`}
                className={cat === active ? "text-bone" : "text-ash"}
                aria-current={cat === active ? "page" : undefined}
              >
                <Roll>{`${cat} (${cat === "All" ? products.length : products.filter((p) => p.category === cat).length})`}</Roll>
              </Link>
            ))}
          </nav>
        </div>
        <div className="grid grid-cols-2 gap-x-[var(--gap)] gap-y-10 md:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
