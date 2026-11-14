import Image from "next/image";
import { notFound } from "next/navigation";
import AddToBag from "@/components/AddToBag";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import RevealTitle from "@/components/RevealTitle";
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

  const others = products.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <main className="px-[var(--gutter)] pt-28">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 md:grid-cols-[1.2fr_1fr] md:gap-20">
          <div className="grid grid-cols-2 gap-3">
            {product.images.map((src, i) => (
              <div key={src} className={`relative aspect-[4/5] overflow-hidden bg-coal ${i === 0 ? "col-span-2" : ""}`}>
                <Image src={src} alt={`${product.name}, view ${i + 1}`} fill priority={i === 0} sizes="(min-width: 768px) 55vw, 100vw" className="object-cover" />
              </div>
            ))}
            {product.video && (
              <div className="relative aspect-[9/16] overflow-hidden bg-coal">
                <video src={product.video} poster={product.poster} muted loop playsInline autoPlay preload="metadata" className="h-full w-full object-cover" />
              </div>
            )}
          </div>

          <aside>
            <div className="space-y-10 md:sticky md:top-28">
              <div>
                <p className="caps text-ash">{product.category}</p>
                <RevealTitle as="h1" text={product.name} className="mt-5 text-[15vw] md:text-[5vw]" />
                <p className="caps mt-6">{formatPrice(product.price)}</p>
              </div>
              <p className="max-w-[46ch] text-[17px] leading-snug text-bone/80">{product.summary}</p>
              <AddToBag product={product} />
              <ul className="caps divide-y divide-line border-y border-line text-ash">
                {product.details.map((d) => (
                  <li key={d} className="py-3">
                    {d}
                  </li>
                ))}
                <li className="py-3">Comes in the Òseyi box</li>
                <li className="py-3">Delivery across Nigeria</li>
                <li className="py-3">
                  Questions?{" "}
                  <a href={site.instagramDm} target="_blank" rel="noopener" className="text-bone underline underline-offset-4 hover:text-stone">
                    DM @{site.instagram}
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>

        <section className="mx-auto mt-[20vh] max-w-[1400px]">
          <RevealTitle text="More Pieces" className="mb-12 text-center text-[14vw] md:text-[6vw]" />
          <div className="grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
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
