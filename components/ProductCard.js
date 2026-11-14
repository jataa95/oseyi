import Image from "next/image";
import Link from "next/link";
import Roll from "./Roll";
import { formatPrice } from "@/data/products";

export default function ProductCard({ product, sizes = "(min-width: 768px) 25vw, 50vw" }) {
  const [first, second] = product.images;
  return (
    <Link href={`/shop/${product.slug}`} className="roll-group group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-coal">
        <Image src={first} alt={product.name} fill sizes={sizes} className="object-cover transition-opacity duration-700" />
        {second && (
          <Image
            src={second}
            alt=""
            fill
            sizes={sizes}
            className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        )}
      </div>
      <div className="label mt-2 flex justify-between gap-2">
        <Roll>{product.name}</Roll>
        <span className="shrink-0 text-ash">{formatPrice(product.price)}</span>
      </div>
      <p className="label text-ash">{product.colors.length} colours</p>
    </Link>
  );
}
