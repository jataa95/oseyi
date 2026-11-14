import Link from "next/link";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import RevealTitle from "@/components/RevealTitle";
import { categories, products } from "@/data/products";

export const metadata = { title: "Shop" };

const sorts = [
  { id: "new", label: "Newest" },
  { id: "price-asc", label: "Price ↑" },
  { id: "price-desc", label: "Price ↓" },
  { id: "name", label: "A–Z" },
];

// Unpriced pieces ("DM for price") go last when sorting by price.
function sortProducts(list, sort) {
  const out = [...list];
  const price = (p, dir) => (p.price == null ? Infinity : dir * p.price);
  if (sort === "price-asc") out.sort((a, b) => price(a, 1) - price(b, 1));
  if (sort === "price-desc") out.sort((a, b) => price(a, -1) - price(b, -1));
  if (sort === "name") out.sort((a, b) => a.name.localeCompare(b.name));
  return out;
}

export default async function Shop({ searchParams }) {
  const { c, sort } = await searchParams;
  const active = categories.includes(c) ? c : "All";
  const filtered = active === "All" ? products : products.filter((p) => p.category === active);
  const list = sortProducts(filtered, sort);
  const qs = (next) => {
    const q = new URLSearchParams();
    if (next.c && next.c !== "All") q.set("c", next.c);
    if (next.sort && next.sort !== "new") q.set("sort", next.sort);
    const s = q.toString();
    return s ? `/shop?${s}` : "/shop";
  };
  const activeSort = sorts.some((s) => s.id === sort) ? sort : "new";
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
                href={qs({ c: cat, sort: activeSort })}
                className={`border-b pb-1 transition-colors ${cat === active ? "border-bone text-bone" : "border-transparent text-ash hover:text-bone"}`}
                aria-current={cat === active ? "page" : undefined}
              >
                {cat} ({count(cat)})
              </Link>
            ))}
          </nav>
        </div>
        <div className="caps mx-auto mt-16 flex max-w-[1600px] flex-wrap items-center justify-between gap-4 border-y border-line py-4 text-ash">
          <span>
            {list.length} piece{list.length === 1 ? "" : "s"}
          </span>
          <div className="flex gap-5">
            <span className="hidden sm:inline">Sort</span>
            {sorts.map((s) => (
              <Link key={s.id} href={qs({ c: active, sort: s.id })} className={s.id === activeSort ? "text-bone" : "hover:text-bone"}>
                {s.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-10 grid max-w-[1600px] grid-cols-1 gap-x-4 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
