import Link from "next/link";
import Roll from "./Roll";
import Wordmark from "./Wordmark";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-line px-[var(--gutter)] pb-[var(--gutter)] pt-4">
      <div className="label grid grid-cols-2 gap-[var(--gap)] text-ash md:grid-cols-4">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <div className="flex flex-col">
          <Link href="/shop" className="text-bone">
            <Roll>Shop</Roll>
          </Link>
          <Link href="/about" className="text-bone">
            <Roll>About</Roll>
          </Link>
        </div>
        <div className="flex flex-col">
          <a href={site.instagramUrl} target="_blank" rel="noopener" className="text-bone">
            <Roll>Instagram</Roll>
          </a>
          <a href={site.instagramDm} target="_blank" rel="noopener" className="text-bone">
            <Roll>Send a DM</Roll>
          </a>
        </div>
        <span>
          Delivery nationwide
          <br />
          CAC registered
        </span>
      </div>
      <Wordmark className="mt-16 block text-center text-[23vw] leading-[0.75]" />
    </footer>
  );
}
