import Link from "next/link";
import Roll from "@/components/Roll";

export default function NotFound() {
  return (
    <main className="flex h-svh flex-col items-start justify-end gap-6 px-[var(--gutter)] pb-[var(--gutter)]">
      <h1 className="font-serif text-[20vw] leading-[0.8]">Not here.</h1>
      <Link href="/shop" className="label border-b border-bone pb-1">
        <Roll>Back to the shop</Roll>
      </Link>
    </main>
  );
}
