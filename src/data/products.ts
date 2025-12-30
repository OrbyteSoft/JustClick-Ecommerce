export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images: string[];
  category: string;
  subcategory: string;
  brand: string;
  rating: number;
  reviews: number;
  stock: number;
  description: string;
  specifications: Record<string, string>;
  features: string[];
  seller: {
    id: string;
    name: string;
    rating: number;
  };
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image: string;
  productCount: number;
  subcategories: { id: string; name: string; slug: string }[];
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Computer Hardware",
    slug: "computer-hardware",
    icon: "Monitor",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400",
    productCount: 256,
    subcategories: [
      { id: "1-1", name: "Processors", slug: "processors" },
      { id: "1-2", name: "Graphics Cards", slug: "graphics-cards" },
      { id: "1-3", name: "Motherboards", slug: "motherboards" },
      { id: "1-4", name: "RAM", slug: "ram" },
      { id: "1-5", name: "Storage", slug: "storage" },
      { id: "1-6", name: "Power Supply", slug: "power-supply" },
    ],
  },
  {
    id: "2",
    name: "Accessories",
    slug: "accessories",
    icon: "Headphones",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
    productCount: 189,
    subcategories: [
      { id: "2-1", name: "Keyboards", slug: "keyboards" },
      { id: "2-2", name: "Mouse", slug: "mouse" },
      { id: "2-3", name: "Headsets", slug: "headsets" },
      { id: "2-4", name: "Webcams", slug: "webcams" },
      { id: "2-5", name: "USB Hubs", slug: "usb-hubs" },
    ],
  },
  {
    id: "3",
    name: "Electronic Materials",
    slug: "electronic-materials",
    icon: "Cpu",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400",
    productCount: 312,
    subcategories: [
      { id: "3-1", name: "Cables & Wires", slug: "cables-wires" },
      { id: "3-2", name: "Switches", slug: "switches" },
      { id: "3-3", name: "Connectors", slug: "connectors" },
      { id: "3-4", name: "Circuit Boards", slug: "circuit-boards" },
      { id: "3-5", name: "LEDs", slug: "leds" },
    ],
  },
  {
    id: "4",
    name: "Tiles",
    slug: "tiles",
    icon: "Grid3X3",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
    productCount: 178,
    subcategories: [
      { id: "4-1", name: "Floor Tiles", slug: "floor-tiles" },
      { id: "4-2", name: "Wall Tiles", slug: "wall-tiles" },
      { id: "4-3", name: "Outdoor Tiles", slug: "outdoor-tiles" },
      { id: "4-4", name: "Mosaic Tiles", slug: "mosaic-tiles" },
    ],
  },
  {
    id: "5",
    name: "Marbles",
    slug: "marbles",
    icon: "Square",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400",
    productCount: 92,
    subcategories: [
      { id: "5-1", name: "Italian Marble", slug: "italian-marble" },
      { id: "5-2", name: "Indian Marble", slug: "indian-marble" },
      { id: "5-3", name: "Granite", slug: "granite" },
      { id: "5-4", name: "Onyx", slug: "onyx" },
    ],
  },
  {
    id: "6",
    name: "Ceramics",
    slug: "ceramics",
    icon: "Palette",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400",
    productCount: 134,
    subcategories: [
      { id: "6-1", name: "Bathroom Ceramics", slug: "bathroom-ceramics" },
      { id: "6-2", name: "Kitchen Ceramics", slug: "kitchen-ceramics" },
      { id: "6-3", name: "Decorative", slug: "decorative" },
    ],
  },
  {
    id: "7",
    name: "Sanitary Wares",
    slug: "sanitary-wares",
    icon: "Droplets",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400",
    productCount: 156,
    subcategories: [
      { id: "7-1", name: "Toilets", slug: "toilets" },
      { id: "7-2", name: "Basins", slug: "basins" },
      { id: "7-3", name: "Bathtubs", slug: "bathtubs" },
      { id: "7-4", name: "Faucets", slug: "faucets" },
      { id: "7-5", name: "Showers", slug: "showers" },
    ],
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "AMD Ryzen 9 7950X Processor",
    slug: "amd-ryzen-9-7950x",
    price: 89999,
    originalPrice: 99999,
    discount: 10,
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800",
    images: [
      "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800",
      "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800",
    ],
    category: "Computer Hardware",
    subcategory: "Processors",
    brand: "AMD",
    rating: 4.9,
    reviews: 234,
    stock: 15,
    description: "The AMD Ryzen 9 7950X is the ultimate processor for gamers and creators. With 16 cores and 32 threads, it delivers exceptional performance for the most demanding applications.",
    specifications: {
      "Cores": "16",
      "Threads": "32",
      "Base Clock": "4.5 GHz",
      "Boost Clock": "5.7 GHz",
      "Cache": "80MB",
      "TDP": "170W",
    },
    features: [
      "16 cores and 32 threads",
      "5nm Zen 4 architecture",
      "PCIe 5.0 support",
      "DDR5 memory support",
    ],
    seller: { id: "s1", name: "TechZone Nepal", rating: 4.8 },
    isFeatured: true,
    isBestSeller: true,
  },
  {
    id: "2",
    name: "NVIDIA GeForce RTX 4090 Graphics Card",
    slug: "nvidia-rtx-4090",
    price: 249999,
    originalPrice: 279999,
    discount: 11,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800",
    images: [
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800",
    ],
    category: "Computer Hardware",
    subcategory: "Graphics Cards",
    brand: "NVIDIA",
    rating: 4.8,
    reviews: 156,
    stock: 8,
    description: "The NVIDIA GeForce RTX 4090 is the most powerful graphics card ever made. Experience incredible gaming and creative performance with next-gen ray tracing and AI capabilities.",
    specifications: {
      "CUDA Cores": "16384",
      "Memory": "24GB GDDR6X",
      "Memory Bus": "384-bit",
      "Boost Clock": "2.52 GHz",
      "TDP": "450W",
    },
    features: [
      "Ada Lovelace architecture",
      "DLSS 3 support",
      "Ray tracing cores",
      "24GB GDDR6X memory",
    ],
    seller: { id: "s2", name: "Graphics Hub", rating: 4.7 },
    isFeatured: true,
    isNew: true,
  },
  {
    id: "3",
    name: "Logitech G Pro X Superlight",
    slug: "logitech-g-pro-x-superlight",
    price: 15999,
    originalPrice: 18999,
    discount: 16,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800",
    images: [
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800",
    ],
    category: "Accessories",
    subcategory: "Mouse",
    brand: "Logitech",
    rating: 4.9,
    reviews: 412,
    stock: 45,
    description: "The Logitech G Pro X Superlight is an ultra-lightweight wireless gaming mouse designed for professional esports athletes.",
    specifications: {
      "Weight": "63g",
      "Sensor": "HERO 25K",
      "DPI": "25,600",
      "Battery Life": "70 hours",
      "Connection": "LIGHTSPEED Wireless",
    },
    features: [
      "Ultra-lightweight 63g design",
      "HERO 25K sensor",
      "LIGHTSPEED wireless",
      "Zero-additive PTFE feet",
    ],
    seller: { id: "s3", name: "Gaming Gear Nepal", rating: 4.9 },
    isFeatured: true,
    isBestSeller: true,
  },
  {
    id: "4",
    name: "Premium Italian Carrara Marble",
    slug: "italian-carrara-marble",
    price: 4500,
    originalPrice: 5500,
    discount: 18,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    ],
    category: "Marbles",
    subcategory: "Italian Marble",
    brand: "Stone Italia",
    rating: 4.7,
    reviews: 89,
    stock: 200,
    description: "Authentic Italian Carrara marble, known for its beautiful white and grey veining. Perfect for luxury countertops, flooring, and wall cladding.",
    specifications: {
      "Origin": "Carrara, Italy",
      "Size": "60x60 cm",
      "Thickness": "18mm",
      "Finish": "Polished",
      "Application": "Indoor/Outdoor",
    },
    features: [
      "100% authentic Italian marble",
      "Unique veining patterns",
      "High durability",
      "Easy maintenance",
    ],
    seller: { id: "s4", name: "Marble World", rating: 4.6 },
    isFeatured: true,
  },
  {
    id: "5",
    name: "Samsung 980 PRO 2TB NVMe SSD",
    slug: "samsung-980-pro-2tb",
    price: 32999,
    originalPrice: 39999,
    discount: 18,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800",
    images: [
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800",
    ],
    category: "Computer Hardware",
    subcategory: "Storage",
    brand: "Samsung",
    rating: 4.8,
    reviews: 324,
    stock: 30,
    description: "The Samsung 980 PRO delivers next-level SSD performance with read speeds up to 7,000 MB/s. Perfect for gamers, creators, and power users.",
    specifications: {
      "Capacity": "2TB",
      "Interface": "PCIe 4.0 x4",
      "Read Speed": "7,000 MB/s",
      "Write Speed": "5,100 MB/s",
      "Form Factor": "M.2 2280",
    },
    features: [
      "PCIe 4.0 NVMe",
      "Samsung V-NAND technology",
      "Nickel-coated controller",
      "5-year warranty",
    ],
    seller: { id: "s1", name: "TechZone Nepal", rating: 4.8 },
    isBestSeller: true,
  },
  {
    id: "6",
    name: "Kohler Eir Wall-Hung Toilet",
    slug: "kohler-eir-toilet",
    price: 125000,
    originalPrice: 145000,
    discount: 14,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
    ],
    category: "Sanitary Wares",
    subcategory: "Toilets",
    brand: "Kohler",
    rating: 4.9,
    reviews: 67,
    stock: 12,
    description: "The Kohler Eir intelligent toilet combines advanced hygiene technology with stunning minimalist design. Features include bidet functionality, heated seat, and automatic lid.",
    specifications: {
      "Type": "Wall-hung",
      "Material": "Vitreous China",
      "Bowl Shape": "Elongated",
      "Flush": "Dual-flush 1.28/0.8 GPF",
      "Features": "Bidet, Heated Seat, Auto Lid",
    },
    features: [
      "Intelligent bidet functionality",
      "Heated seat with temperature control",
      "Automatic lid open/close",
      "UV sanitization",
    ],
    seller: { id: "s5", name: "Sanitary Solutions", rating: 4.8 },
    isNew: true,
    isFeatured: true,
  },
  {
    id: "7",
    name: "Porcelain Floor Tiles - Grey Matte",
    slug: "porcelain-floor-tiles-grey",
    price: 1850,
    originalPrice: 2200,
    discount: 16,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    ],
    category: "Tiles",
    subcategory: "Floor Tiles",
    brand: "TileMaster",
    rating: 4.6,
    reviews: 198,
    stock: 500,
    description: "Premium porcelain floor tiles with a modern grey matte finish. Perfect for living rooms, bedrooms, and commercial spaces.",
    specifications: {
      "Size": "60x60 cm",
      "Material": "Porcelain",
      "Finish": "Matte",
      "Thickness": "10mm",
      "PEI Rating": "4",
    },
    features: [
      "Anti-slip surface",
      "Frost resistant",
      "Easy to clean",
      "Low water absorption",
    ],
    seller: { id: "s6", name: "Tiles & More", rating: 4.5 },
    isBestSeller: true,
  },
  {
    id: "8",
    name: "Mechanical Gaming Keyboard RGB",
    slug: "mechanical-gaming-keyboard-rgb",
    price: 8999,
    originalPrice: 10999,
    discount: 18,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800",
    images: [
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800",
    ],
    category: "Accessories",
    subcategory: "Keyboards",
    brand: "Keychron",
    rating: 4.7,
    reviews: 276,
    stock: 35,
    description: "Full-size mechanical gaming keyboard with hot-swappable switches and customizable RGB backlighting.",
    specifications: {
      "Switch Type": "Gateron Red",
      "Layout": "Full-size (104 keys)",
      "Backlight": "RGB per-key",
      "Connection": "USB-C / Wireless",
      "Battery": "4000mAh",
    },
    features: [
      "Hot-swappable switches",
      "PBT double-shot keycaps",
      "N-key rollover",
      "Mac & Windows compatible",
    ],
    seller: { id: "s3", name: "Gaming Gear Nepal", rating: 4.9 },
    isNew: true,
  },
];

export const banners = [
  {
    id: "1",
    title: "New Year Sale",
    subtitle: "Up to 50% Off on Electronics",
    description: "Shop the biggest sale of the year on computer hardware and accessories",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200",
    cta: "Shop Now",
    link: "/products?category=computer-hardware",
    gradient: "from-primary to-orange-600",
  },
  {
    id: "2",
    title: "Premium Tiles Collection",
    subtitle: "Transform Your Space",
    description: "Explore our curated collection of Italian marbles and designer tiles",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
    cta: "Explore",
    link: "/products?category=tiles",
    gradient: "from-secondary to-slate-700",
  },
  {
    id: "3",
    title: "Become a Seller",
    subtitle: "Grow Your Business",
    description: "Join thousands of sellers and reach millions of customers",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200",
    cta: "Start Selling",
    link: "/seller/register",
    gradient: "from-success to-emerald-600",
  },
];

export const features = [
  {
    icon: "Truck",
    title: "Fast Delivery",
    description: "Free shipping on orders above Rs. 5,000",
  },
  {
    icon: "Shield",
    title: "Secure Payment",
    description: "100% secure payment gateway",
  },
  {
    icon: "RotateCcw",
    title: "Easy Returns",
    description: "7-day hassle-free return policy",
  },
  {
    icon: "Headphones",
    title: "24/7 Support",
    description: "Dedicated customer support",
  },
];
