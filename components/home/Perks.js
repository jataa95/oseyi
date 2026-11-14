const perks = ["Delivery across Nigeria", "Packed in the Òseyi box", "Order by Instagram DM", "Authentic Birkenstock", "CAC registered", "New pieces every season"];

// The reasons to buy, running across the screen.
export default function Perks() {
  return (
    <div className="overflow-hidden border-y border-line py-5 whitespace-nowrap">
      <div className="marquee caps inline-flex gap-16 text-bone/80">
        {[...perks, ...perks].map((p, i) => (
          <span key={i} className="inline-flex items-center gap-16">
            {p}
            <span className="text-stone">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
