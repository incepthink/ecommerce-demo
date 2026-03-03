import { Product } from "@/lib/types";

export const products: Product[] = [
  {
    id: "1", slug: "leather-weekender-bag", name: "Leather Weekender Bag",
    description: "Hand-stitched full-grain leather weekender. Brass hardware, cotton canvas lining, detachable shoulder strap. Perfect for 2–3 day trips.",
    price: 289, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    category: "Bags", stock: 8, featured: true, rating: 4.8, reviews: 124
  },
  {
    id: "2", slug: "canvas-backpack", name: "Waxed Canvas Backpack",
    description: "Water-resistant waxed canvas with vegetable-tanned leather trim. Padded laptop sleeve fits up to 15\".",
    price: 179, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    category: "Bags", stock: 15, featured: false, rating: 4.5, reviews: 89
  },
  {
    id: "3", slug: "minimalist-crossbody", name: "Minimalist Crossbody",
    description: "Slim profile crossbody in pebbled leather. Adjustable strap, zip closure, interior card slots.",
    price: 119, image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=600&q=80",
    category: "Bags", stock: 22, featured: true, rating: 4.6, reviews: 67
  },
  {
    id: "4", slug: "merino-crew-sweater", name: "Merino Crew Sweater",
    description: "Ultra-fine 18.5 micron merino wool. Naturally temperature regulating, machine washable.",
    price: 145, image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
    category: "Apparel", stock: 30, featured: true, rating: 4.7, reviews: 203
  },
  {
    id: "5", slug: "denim-overshirt", name: "Selvedge Denim Overshirt",
    description: "Japanese selvedge denim, 12oz weight. Triple-needle stitching, horn buttons, dual chest pockets.",
    price: 198, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
    category: "Apparel", stock: 12, featured: false, rating: 4.4, reviews: 56
  },
  {
    id: "6", slug: "organic-cotton-tee", name: "Organic Cotton Tee",
    description: "Heavy-weight 220gsm organic cotton. Garment-dyed for a lived-in feel. Relaxed fit.",
    price: 48, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    category: "Apparel", stock: 50, featured: false, rating: 4.3, reviews: 312
  },
  {
    id: "7", slug: "linen-trousers", name: "Relaxed Linen Trousers",
    description: "European flax linen, pre-washed for softness. Elastic waistband with drawstring, tapered leg.",
    price: 125, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
    category: "Apparel", stock: 18, featured: true, rating: 4.6, reviews: 98
  },
  {
    id: "8", slug: "titanium-field-watch", name: "Titanium Field Watch",
    description: "Grade 5 titanium case, 40mm. Swiss automatic movement, sapphire crystal, 200m water resistant.",
    price: 495, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80",
    category: "Accessories", stock: 5, featured: true, rating: 4.9, reviews: 47
  },
  {
    id: "9", slug: "leather-card-wallet", name: "Leather Card Wallet",
    description: "Slim cardholder in Buttero leather from Conceria Walpier. Holds 6 cards plus folded bills.",
    price: 65, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
    category: "Accessories", stock: 35, featured: false, rating: 4.5, reviews: 156
  },
  {
    id: "10", slug: "silk-pocket-square", name: "Hand-Rolled Silk Pocket Square",
    description: "Italian silk twill, hand-rolled edges. Abstract geometric print in earth tones.",
    price: 55, image: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=600&q=80",
    category: "Accessories", stock: 40, featured: false, rating: 4.2, reviews: 34
  },
  {
    id: "11", slug: "suede-desert-boots", name: "Suede Desert Boots",
    description: "English suede uppers, crepe rubber sole. Blake-stitched construction for easy resoling.",
    price: 225, image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&q=80",
    category: "Accessories", stock: 10, featured: true, rating: 4.7, reviews: 82
  },
  {
    id: "12", slug: "cashmere-scarf", name: "Mongolian Cashmere Scarf",
    description: "100% Grade A Mongolian cashmere. Lightweight yet warm, with hand-fringed edges.",
    price: 175, image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&q=80",
    category: "Accessories", stock: 14, featured: false, rating: 4.8, reviews: 71
  },
];

export const categories = ["Bags", "Apparel", "Accessories"];
