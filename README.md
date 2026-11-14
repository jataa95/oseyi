# Òseyi

Website for Òseyi, the Nigerian clothing brand ([@oseyi.1](https://www.instagram.com/oseyi.1/)).

Built with Next.js 16 (App Router), React 19, Tailwind CSS 4, GSAP ScrollTrigger and Lenis smooth scrolling.

## Pages

- `/`: an entry screen, then a scroll story: intro line, a video that grows to full screen, pinned 01/03 slides (Texture, Detail, Delivery), a statement, every product one screen at a time, and "Ordinary / Ends Here"
- `/shop`: every product, with a Shirts / Footwear filter (`/shop?c=Shirts`)
- `/shop/[slug]`: a product with colour and size pickers and Add to bag
- `/about`: the brand story

The bag has no online checkout. "Order on Instagram" copies the order to the clipboard and opens a DM with @oseyi.1. Set `whatsapp` in `data/site.js` to also offer WhatsApp.

## Editing content

- `data/site.js`: brand name, Instagram, WhatsApp number, city and time zone
- `data/products.js`: products, prices (in naira; `null` shows "DM for price"), colours, sizes, images
- `components/home/`: the home page sections and their wording
- `public/media/`: photos and videos

## Develop

```bash
npm install
npm run dev
```
