import Button from "@/components/Button";

export default function NotFound() {
  return (
    <main className="grid h-svh place-items-center px-[var(--gutter)] text-center">
      <div>
        <h1 className="display text-[22vw] md:text-[11vw]">Not Here</h1>
        <Button href="/shop" className="mt-10">
          Back to the shop
        </Button>
      </div>
    </main>
  );
}
