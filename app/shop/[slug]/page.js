import Image from "next/image";
import { notFound } from "next/navigation";
import AddToBag from "@/components/AddToBag";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { formatPrice, getProduct, products } from "@/data/products";
import { site } from "@/data/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return { title: p.name, description: p.summary, openGraph: { images: [p.images[0]] } };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const others = products.filter((p) => p.slug !== slug);

  return (
    <>
      <main className="px-[var(--gutter)] pt-[100px]">
        <div className="grid grid-cols-1 gap-[var(--gap)] md:grid-cols-4">
          <div className="grid grid-cols-1 gap-[var(--gap)] md:col-span-2 md:grid-cols-2">
            {product.images.map((src, i) => (
              <div key={src} className={`relative aspect-[4/5] overflow-hidden bg-coal ${i === 0 ? "md:col-span-2" : ""}`}>
                <Image src={src} alt={`${product.name}, view ${i + 1}`} fill priority={i === 0} sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
            ))}
            {product.video && (
              <div className="relative aspect-[9/16] overflow-hidden bg-coal md:col-span-1">
                <video src={product.video} poster={product.poster} muted loop playsInline autoPlay preload="metadata" className="h-full w-full object-cover" />
              </div>
            )}
          </div>

          <aside className="md:col-span-2 md:pl-[calc(var(--col)*0.25)]">
            <div className="space-y-8 md:sticky md:top-[100px]">
              <div>
                <p className="label text-ash">{product.category}</p>
                <h1 className="mt-2 font-serif text-5xl leading-[0.95] md:text-6xl">{product.name}</h1>
                <p className="label mt-4">{formatPrice(product.price)}</p>
              </div>
              <p className="max-w-[46ch] text-[15px] leading-relaxed text-bone/80">{product.summary}</p>
              <AddToBag product={product} />
              <ul className="label divide-y divide-line border-y border-line text-ash">
                {product.details.map((d) => (
                  <li key={d} className="py-2">
                    {d}
                  </li>
                ))}
                <li className="py-2">Comes in the Òseyi box</li>
                <li className="py-2">Delivery across Nigeria</li>
                <li className="py-2">
                  Questions?{" "}
                  <a href={site.instagramDm} target="_blank" rel="noopener" className="text-bone underline underline-offset-2">
                    DM @{site.instagram}
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>

        <section className="mt-32">
          <h2 className="label mb-4">More pieces</h2>
          <div className="grid grid-cols-2 gap-x-[var(--gap)] gap-y-10 md:grid-cols-4">
            {others.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
