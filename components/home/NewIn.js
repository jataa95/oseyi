import Link from "next/link";
import ProductCard from "../ProductCard";
import RevealTitle from "../RevealTitle";
import { products } from "@/data/products";

export default function NewIn() {
  return (
    <section className="px-[var(--gutter)] py-[14vh]">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex items-end justify-between gap-6">
          <RevealTitle text="New In" className="text-[18vw] md:text-[7vw]" />
          <Link href="/shop" className="caps border-b border-bone pb-1 hover:border-stone hover:text-stone">
            View all ({products.length})
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-x-4 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
