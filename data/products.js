// The catalogue. Prices are in naira; set `price: null` to show "DM for price".
// Images live in /public/media.

const shirtSizes = ["S", "M", "L", "XL", "XXL"];
const shoeSizes = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"];

export const products = [
  {
    slug: "crochet-camp-shirt",
    name: "Crochet Camp Shirt",
    category: "Shirts",
    price: null,
    colors: ["Ivory", "Black"],
    sizes: shirtSizes,
    images: ["/media/crochet-shirt-front.jpg", "/media/crochet-shirt-back.jpg"],
    summary:
      "Open-weave crochet in vertical cable stripes, a relaxed camp collar and short boxy sleeves. Breathes in the heat, holds its shape at night.",
    details: ["Camp (Cuban) collar", "Crochet cable-knit texture", "Relaxed, boxy fit", "Tonal buttons"],
  },
  {
    slug: "textured-shirt",
    name: "Textured Shirt",
    category: "Shirts",
    price: null,
    colors: ["White", "Black"],
    sizes: shirtSizes,
    images: ["/media/textured-shirt-white.jpg", "/media/black-white-duo.jpg"],
    video: "/media/dressing-classy.mp4",
    poster: "/media/dressing-classy-poster.jpg",
    summary:
      "A crinkled, wave-textured shirt finished with turquoise stone buttons. Clean enough for dinner, easy enough for the weekend.",
    details: ["Point collar", "Wave-texture fabric", "Turquoise buttons", "Regular fit"],
  },
  {
    slug: "ribbed-utility-shirt",
    name: "Ribbed Utility Shirt",
    category: "Shirts",
    price: null,
    colors: ["Ivory", "Black"],
    sizes: shirtSizes,
    images: ["/media/pocket-shirt-ivory.jpg", "/media/pocket-shirt-black.jpg", "/media/duo-flatlay.jpg"],
    video: "/media/unboxing.mp4",
    poster: "/media/unboxing-poster.jpg",
    summary:
      "Fine vertical ribbing, two flap chest pockets and a soft spread collar. The one you reach for when you want to look put together without trying.",
    details: ["Two flap chest pockets", "Fine ribbed texture", "Short sleeves", "Relaxed fit"],
  },
  {
    slug: "boston-clog",
    name: "Birkenstock Boston Suede",
    category: "Footwear",
    price: null,
    colors: ["Taupe", "Mocha", "Black", "Stone", "Pink"],
    sizes: shoeSizes,
    images: ["/media/boston-lineup.jpg", "/media/boston-pink.jpg", "/media/matching-pairs-still.jpg"],
    video: "/media/another-color.mp4",
    poster: "/media/another-color-poster.jpg",
    summary:
      "The Boston clog in soft suede on a cork footbed. Authentic pairs, sourced by Òseyi. Get one for you and one for bae.",
    details: ["Suede upper", "Cork-latex footbed", "Adjustable buckle", "Boxed with tags"],
  },
];

export const categories = ["All", ...new Set(products.map((p) => p.category))];

export function getProduct(slug) {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(price) {
  if (price == null) return "DM for price";
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(price);
}
