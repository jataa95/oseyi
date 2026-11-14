import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/data/products";

export default function ProductCard({ product, sizes = "(min-width: 768px) 33vw, 50vw" }) {
  const [first, second] = product.images;
  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-coal">
        <Image src={first} alt={product.name} fill sizes={sizes} className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
        {second && (
          <Image src={second} alt="" fill sizes={sizes} className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        )}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="display text-3xl transition-colors group-hover:text-stone">{product.name}</h3>
        <span className="caps shrink-0 text-ash">{formatPrice(product.price)}</span>
      </div>
      <p className="caps mt-1 text-ash">
        {product.category} · {product.colors.length} colours
      </p>
    </Link>
  );
}
