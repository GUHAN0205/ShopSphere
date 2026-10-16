export const CATEGORIES = [
  {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    shortName: 'Electronics',
    description: 'Workstation displays, mechanical keyboards, and precision creator equipment.',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1000&auto=format&fit=crop',
    itemCount: 6,
    badge: 'Creator Tech',
    tag: 'Creator Tech',
    accentColor: '#1d4ed8'
  },
  {
    id: 'audio',
    name: 'Audio & Headphones',
    slug: 'audio',
    shortName: 'Audio',
    description: 'Reference-grade monitors, spatial ANC headphones, and architectural soundbars.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
    itemCount: 6,
    badge: 'Hi-Fi Sound',
    tag: 'Hi-Fi Sound',
    accentColor: '#ea580c'
  },
  {
    id: 'fashion',
    name: 'Fashion & Outerwear',
    slug: 'fashion',
    shortName: 'Fashion',
    description: 'Architectural trench coats, technical merino layers, and structured minimal apparel.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop',
    itemCount: 6,
    badge: 'Apparel Edit',
    tag: 'Apparel Edit',
    accentColor: '#4d7c0f'
  },
  {
    id: 'footwear',
    name: 'Sneakers & Footwear',
    slug: 'footwear',
    shortName: 'Footwear',
    description: 'Carbon propulsion runners, minimalist calfskin low-tops, and waterproof desert boots.',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1000&auto=format&fit=crop',
    itemCount: 6,
    badge: 'Footwear Lab',
    tag: 'Footwear Lab',
    accentColor: '#1d4ed8'
  },
  {
    id: 'watches',
    name: 'Watches & Accessories',
    slug: 'watches',
    shortName: 'Horology',
    description: 'Titanium chronographs, sapphire automatics, polarized optical wireframes, and minimalist wallets.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
    itemCount: 6,
    badge: 'Fine Metal',
    tag: 'Fine Metal',
    accentColor: '#ea580c'
  },
  {
    id: 'home-living',
    name: 'Home & Living',
    slug: 'home-living',
    shortName: 'Living',
    description: 'Sculptural levitating lamps, ergonomic task seating, stone diffusers, and tactile vessels.',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1000&auto=format&fit=crop',
    itemCount: 6,
    badge: 'Sanctuary',
    tag: 'Sanctuary',
    accentColor: '#4d7c0f'
  },
  {
    id: 'bags-travel',
    name: 'Bags & Travel',
    slug: 'bags-travel',
    shortName: 'Travel',
    description: 'Ballistic EDC backpacks, structured canvas holdalls, and biometric carry-on rollers.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop',
    itemCount: 6,
    badge: 'Transit',
    tag: 'Transit',
    accentColor: '#1d4ed8'
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle & Everyday',
    slug: 'lifestyle',
    shortName: 'Lifestyle',
    description: 'Precision thermal vessels, brass desk tools, ultrasonic wellness objects, and notebooks.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop',
    itemCount: 6,
    badge: 'Everyday Ritual',
    tag: 'Everyday Ritual',
    accentColor: '#ea580c'
  }
];

export function getCategoryBySlug(slug) {
  if (!slug) return null;
  const s = slug.toLowerCase();
  return CATEGORIES.find(c => c.slug.toLowerCase() === s || c.id.toLowerCase() === s) || null;
}

export function getCategoryById(id) {
  if (!id) return null;
  const i = id.toLowerCase();
  return CATEGORIES.find(c => c.id.toLowerCase() === i || c.slug.toLowerCase() === i) || null;
}
