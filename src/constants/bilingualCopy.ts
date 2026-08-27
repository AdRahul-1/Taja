/**
 * Verified Bilingual Copy Registry (English & Bengali).
 * Native Speaker Verified for Tiro Bangla & Noto Sans Bengali typography.
 */

export interface DifferentiatorItem {
  id: string;
  iconName: "kadai" | "hand" | "flame" | "leaf" | "pack" | "chai";
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
}

export interface IngredientItem {
  id: string;
  nameEn: string;
  nameBn: string;
  subtitleEn: string;
  subtitleBn: string;
  notesEn: string;
  image: string;
  tag: string;
}

export interface SKUProduct {
  id: string;
  title: string;
  flavor: "SPECIAL JHAL" | "TAK JHAL MISTI" | "MASALA CHIRA";
  flavorBn: string;
  tagline: string;
  price: string;
  netWt: string;
  badge?: string;
  image: string;
  description: string;
  spiceLevel: "medium" | "jhal" | "misti";
  ingredientsList: string[];
}

export const HERO_COPY = {
  eyebrowBn: "সন্ধ্যার খাঁটি আড্ডা, ২০০৯ থেকে",
  eyebrowEn: "AUTHENTIC BENGALI TEA-TIME RITUAL • ESTD. 2009",
  headline: "Your Evening Ritual, Since 2009.",
  subheadline:
    "Hand-blended in small kadai batches in Raniganj, West Bengal. Crisp golden sev, roasted Bengal peanuts, and aromatic spices crafted for the true connoisseur of evening tea.",
  ctaPrimary: "Explore The Shelf",
  ctaSecondary: "Bulk & Distributor Enquiries",
  flavorJhal: "Special Jhal",
  flavorMisti: "Tak Jhal Misti",
};

export const STORY_COPY = {
  eyebrowBn: "রানীর মাটির ঐতিহ্য ও খাঁটি স্বাদ",
  eyebrowEn: "HERITAGE OF RANIGANJ",
  headline: "Hand-Blended in Small Kadai Batches.",
  lines: [
    {
      title: "Born in Raniganj, 2009",
      body: "Our journey began over a decade and a half ago in Raniganj, West Bengal. We set out to preserve the timeless art of Bengali tea-time snacks—made not in mass industrial mills, but hand-tossed in traditional brass kadais.",
    },
    {
      title: "The Art of the Small Batch",
      body: "Every batch is prepared with slow-roasted peanuts, freshly ground spices, and cold-pressed mustard oil. The heat is regulated by master artisans whose timing gives Taja its signature golden crispness.",
    },
    {
      title: "One Perfect Handful",
      body: "Whether it’s a rainy afternoon adda, evening ginger tea with family, or late-night conversations—Taja Chanachur is crafted to deliver the unmistakable crunch and warmth of authentic Bengal.",
    },
  ],
};

export const DIFFERENTIATORS: DifferentiatorItem[] = [
  {
    id: "kadai-batch",
    iconName: "kadai",
    titleEn: "Small Kadai Batches",
    titleBn: "হাতে তৈরি ছোট কড়াই ব্যাচ",
    descEn: "Never mass-extruded. Every batch is slow-roasted and tossed by hand in traditional brass kadais for even spice distribution.",
    descBn: "যন্ত্রে নয়, ঐতিহ্যবাহী কড়াইয়ে অল্প অল্প করে ভেজে মেশানো খাঁটি স্বাদ।",
  },
  {
    id: "spice-heritage",
    iconName: "leaf",
    titleEn: "Pure Heritage Spices",
    titleBn: "খাঁটি মশলার নিজস্ব ঐতিহ্য",
    descEn: "Whole roasted cumin, black salt, sun-dried chillies, and secret Bengal spice aromatics ground fresh in-house.",
    descBn: "ঘরোয়া পদ্ধতিতে প্রস্তুত জিরা, বিট নুন ও খাঁটি শুকনো লঙ্কার অতুলনীয় ব্লেন্ড।",
  },
  {
    id: "mustard-oil",
    iconName: "flame",
    titleEn: "Mustard Oil Crispness",
    titleBn: "সরিষার তেলের খাস্তা স্বাদ",
    descEn: "Fried to a delicate crunch in pure edible oil, delivering the authentic pungent warmth beloved across Bengal.",
    descBn: "খাঁটি তেলের নিখুঁত তাপে ভাজা মুচমুচে খাস্তা অনুভূতি।",
  },
  {
    id: "zero-transfat",
    iconName: "pack",
    titleEn: "Zero Trans-Fat Lock",
    titleBn: "জিরো ট্রান্স-ফ্যাট ও ফ্রেশনেস",
    descEn: "Multi-layer airtight nitrogen barrier packaging locking in crispy freshness from our Raniganj workshop to your tea table.",
    descBn: "উন্নত প্যাকেজিংয়ে সংরক্ষিত যাতে প্রতিটি কামড়ে থাকে প্রথম দিনের সতেজতা।",
  },
  {
    id: "chai-companion",
    iconName: "chai",
    titleEn: "The Ultimate Tea Partner",
    titleBn: "সন্ধ্যার এক কাপ চায়ের সঙ্গী",
    descEn: "Balanced to complement the brisk tannic notes of classic Darjeeling and clay-cup ginger milk tea.",
    descBn: "ধোঁয়া ওঠা মাটির ভাঁড়ের চা কিংবা লিকার চায়ের সেরা সঙ্গী।",
  },
  {
    id: "raniganj-roots",
    iconName: "hand",
    titleEn: "Raniganj Roots Since 2009",
    titleBn: "রানীগঞ্জের ঐতিহ্য, ২০০৯ থেকে",
    descEn: "Manufactured with uncompromising quality and FSSAI certified standards by R.R. Food Products.",
    descBn: "আর. আর. ফুড প্রোডাক্টসের ১৫ বছরের বিশ্বস্ততা ও গুণমানের নিশ্চয়তা।",
  },
];

export const INGREDIENTS: IngredientItem[] = [
  {
    id: "peanuts",
    nameEn: "Roasted Bengal Peanuts",
    nameBn: "ভাজা চিনেবাদাম",
    subtitleEn: "Crunchy & Salt-Glazed",
    subtitleBn: "নোনতা খাস্তা স্বাদ",
    notesEn: "Selected whole kernels slow-roasted to bring out rich nutty oils and a brittle golden crunch.",
    image: "/ingredients/peanuts.jpg",
    tag: "Protein Rich",
  },
  {
    id: "besan-sev",
    nameEn: "Crispy Besan Sev",
    nameBn: "খাঁটি বেসন সেভ",
    subtitleEn: "Fine Gram Flour Strands",
    subtitleBn: "মুচমুচে সোনালী সেভ",
    notesEn: "Hand-pressed chickpea flour infused with turmeric and ajwain, fried into gossamer crisp ribbons.",
    image: "/ingredients/besan_sev.jpg",
    tag: "Signature Crunch",
  },
  {
    id: "chiwda",
    nameEn: "Spiced Roasted Chiwda",
    nameBn: "মুচমুচে মশলা চিঁড়ে",
    subtitleEn: "Flattened Rice Flakes",
    subtitleBn: "হালকা ভাজা চিঁড়ে",
    notesEn: "Airy, featherlight flattened rice roasted with curry leaves and mustard seeds.",
    image: "/ingredients/chiwda.jpg",
    tag: "Light & Crispy",
  },
  {
    id: "boondi",
    nameEn: "Crunchy Spiced Boondi",
    nameBn: "কুড়মুড়ে বুন্দিয়া",
    subtitleEn: "Golden Droplet Pearls",
    subtitleBn: "মশলাদার বুন্দিয়া",
    notesEn: "Porous chickpea droplets absorbing black rock salt and tangy amchur notes.",
    image: "/ingredients/boondi.jpg",
    tag: "Tangy Burst",
  },
  {
    id: "dry-chilli",
    nameEn: "Sun-Dried Red Chilli",
    nameBn: "খাঁটি শুকনো লঙ্কা",
    subtitleEn: "Fiery Bengal Heat",
    subtitleBn: "ঝাল ও সুবাস",
    notesEn: "Whole dried crimson chillies stone-crushed for deep smoky warmth without harsh bitterness.",
    image: "/ingredients/dry_chilli.jpg",
    tag: "Aromatic Heat",
  },
  {
    id: "fried-lentils",
    nameEn: "Fried Spiced Chana Dal",
    nameBn: "মচমচে ভাজা ডাল",
    subtitleEn: "Golden Split Lentils",
    subtitleBn: "চটপটা নোনতা ডাল",
    notesEn: "Crispy fried yellow split lentils providing a firm, savory toothsome texture in every spoonful.",
    image: "/ingredients/fried_lentils.jpg",
    tag: "Savory Bite",
  },
];

export const PRODUCTS_CATALOG: SKUProduct[] = [
  {
    id: "sku-10-jhal",
    title: "Pocket Buddy",
    flavor: "SPECIAL JHAL",
    flavorBn: "স্পেশাল ঝাল",
    tagline: "The daily companion for solo tea-time cravings",
    price: "₹10",
    netWt: "50gm",
    badge: "Bestseller",
    image: "/10_rs_jhal_red_new.webp",
    description: "Fiery, crispy, and packed with bold Bengal spices. The quintessential 50g snack pack for your desk or travel bag.",
    spiceLevel: "jhal",
    ingredientsList: ["Besan Sev", "Roasted Peanuts", "Boondi", "Dry Chilli Blend", "Mustard Oil"],
  },
  {
    id: "sku-10-misti",
    title: "Pocket Buddy",
    flavor: "TAK JHAL MISTI",
    flavorBn: "টক ঝাল মিষ্টি",
    tagline: "Sweet, tangy & spicy harmony",
    price: "₹10",
    netWt: "50gm",
    badge: "Popular",
    image: "/10_rs_misti_new.webp",
    description: "A playful melody of sweet raisins, amchur tanginess, and gentle spice heat for lovers of sweet & sour chanachur.",
    spiceLevel: "misti",
    ingredientsList: ["Besan Sev", "Chiwda", "Sweet Boondi", "Roasted Peanuts", "Amchur Spice Blend"],
  },
  {
    id: "sku-150-jhal",
    title: "Big Brother Pack",
    flavor: "SPECIAL JHAL",
    flavorBn: "স্পেশাল ঝাল",
    tagline: "Generous evening adda size",
    price: "₹35",
    netWt: "150gm",
    image: "/150_jhal.webp",
    description: "Ideal for sharing with 2–3 friends over evening tea. Extra roasted peanuts and heavy sev crunch.",
    spiceLevel: "jhal",
    ingredientsList: ["Besan Sev", "Chana Dal", "Roasted Peanuts", "Red Chilli Flakes", "Mustard Oil"],
  },
  {
    id: "sku-150-misti",
    title: "Big Brother Pack",
    flavor: "TAK JHAL MISTI",
    flavorBn: "টক ঝাল মিষ্টি",
    tagline: "Balanced sweet-tangy crunch for family tea",
    price: "₹35",
    netWt: "150gm",
    image: "/150_misti.webp",
    description: "150g of harmonious tak-jhal-misti crunch packed in our signature freshness-preserving pouch.",
    spiceLevel: "misti",
    ingredientsList: ["Besan Sev", "Crisp Chiwda", "Boondi", "Roasted Peanuts", "Tangy Masala"],
  },
  {
    id: "sku-400-jhal",
    title: "Family Celebration Pack",
    flavor: "SPECIAL JHAL",
    flavorBn: "স্পেশাল ঝাল",
    tagline: "The weekend family staple",
    price: "₹90",
    netWt: "400gm",
    badge: "Value Pack",
    image: "/400_jhal.webp",
    description: "400 grams of premium chanachur made for festive gatherings, holiday snacks, and daily tea-time trays.",
    spiceLevel: "jhal",
    ingredientsList: ["Besan Sev", "Roasted Peanuts", "Boondi", "Fried Chana Dal", "Bengal Spice Masala"],
  },
  {
    id: "sku-400-misti",
    title: "Family Celebration Pack",
    flavor: "TAK JHAL MISTI",
    flavorBn: "টক ঝাল মিষ্টি",
    tagline: "Sweet & sour abundance for celebrations",
    price: "₹90",
    netWt: "400gm",
    image: "/400_misti.webp",
    description: "Big 400g pouch filled with sweet-tangy sev, crunchy peanuts, and aromatic spices.",
    spiceLevel: "misti",
    ingredientsList: ["Besan Sev", "Chiwda", "Boondi", "Peanuts", "Amchur Spice Blend"],
  },
  {
    id: "sku-500-jumbo-jhal",
    title: "Jumbo Master Pack",
    flavor: "SPECIAL JHAL",
    flavorBn: "স্পেশাল ঝাল",
    tagline: "Maximum crunch for chanachur lovers",
    price: "₹90",
    netWt: "500gm",
    badge: "Mega Saver",
    image: "/500_jhal.webp",
    description: "Our largest half-kilogram pack delivering unbeatable value and unmatched freshness.",
    spiceLevel: "jhal",
    ingredientsList: ["Besan Sev", "Roasted Peanuts", "Fried Dal", "Boondi", "Chilli Flakes"],
  },
  {
    id: "sku-500-jumbo-misti",
    title: "Jumbo Master Pack",
    flavor: "TAK JHAL MISTI",
    flavorBn: "টক ঝাল মিষ্টি",
    tagline: "Half-kilo of authentic Bengal flavor",
    price: "₹90",
    netWt: "500gm",
    image: "/500_msti.webp",
    description: "500 grams of Tak Jhal Misti goodness to keep your snack jar always filled.",
    spiceLevel: "misti",
    ingredientsList: ["Besan Sev", "Chiwda", "Sweet Boondi", "Peanuts", "Tangy Masala"],
  },
  {
    id: "sku-chira",
    title: "Special Masala Chira",
    flavor: "MASALA CHIRA",
    flavorBn: "স্পেশাল মশলা চিঁড়ে",
    tagline: "Golden spiced flattened rice snack",
    price: "₹10 / ₹5",
    netWt: "50gm / 25gm",
    badge: "Specialty",
    image: "/Chira.webp",
    description: "Featherlight flattened rice tossed with roasted peanuts, curry leaves, and crunchy mustard seasoning.",
    spiceLevel: "medium",
    ingredientsList: ["Flattened Rice (Poha)", "Roasted Peanuts", "Curry Leaves", "Mustard Seeds", "Turmeric Salt"],
  },
];
