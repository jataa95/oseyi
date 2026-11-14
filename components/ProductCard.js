import Image from "next/image";
import Link from "next/link";
import QuickAdd from "./QuickAdd";
import { formatPrice } from "@/data/products";

export default function ProductCard({ product, sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" }) {
  const [first, second] = product.images;
  const href = `/shop/${product.slug}`;
  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-coal">
        <Link href={href} aria-label={product.name} className="absolute inset-0">
          <Image src={first} alt={product.name} fill sizes={sizes} className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
          {second && (
            <Image src={second} alt="" fill sizes={sizes} className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          )}
        </Link>
        <span className="caps pointer-events-none absolute left-3 top-3 bg-ink/70 px-2 py-1 text-[9px] backdrop-blur">New in</span>
        <QuickAdd product={product} />
      </div>
      <Link href={href} className="block">
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <h3 className="display text-[28px] transition-colors group-hover:text-stone">{product.name}</h3>
          <span className="caps shrink-0">{formatPrice(product.price)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between gap-4">
          <p className="caps text-ash">{product.category}</p>
          <p className="caps text-right text-ash">
            {product.colors.length} colour{product.colors.length > 1 ? "s" : ""} · {product.sizes[0]}–{product.sizes.at(-1)}
          </p>
        </div>
      </Link>
    </div>
  );
}
