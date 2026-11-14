// The ÒSEYI wordmark, set in a high-contrast serif like the box foil.
export default function Wordmark({ className = "" }) {
  return (
    <span className={`font-serif tracking-[0.04em] ${className}`} aria-label="Òseyi">
      ÒSEYI
    </span>
  );
}
