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
  image?: string;
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

export interface StoryLineItem {
  title: string;
  lead: string;
  body: string;
}

export const STORY_COPY = {
  eyebrowBn: "রানীর মাটির ঐতিহ্য ও খাঁটি স্বাদ",
  eyebrowEn: "HERITAGE OF RANIGANJ",
  headline: "Hand-Blended in Small Kadai Batches.",
  lines: [
    {
      title: "THE ROAST",
      lead: "Hear that crackle? We're getting there.",
      body: "The peanuts roast slowly in the hot kadai until they turn golden, fragrant and properly crunchy.",
    },
    {
      title: "THE TOSS",
      lead: "Everything meets right here.",
      body: "Golden sev ribbons and slow-roasted Bengal peanuts tossed hot in the kadai with pure mustard oil.",
    },
    {
      title: "THE MASALA",
      lead: "Ground right, blended right.",
      body: "Our signature blend of sun-dried Guntur chillies, black rock salt, and whole roasted cumin ground fresh.",
    },
  ],
};

export const DIFFERENTIATORS: DifferentiatorItem[] = [
  {
    id: "kadai-roast",
    iconName: "kadai",
    titleEn: "Small Kadai Flame Roast",
    titleBn: "ছোট কড়াইয়ের খাঁটি ভাজা",
    descEn: "No automated extruder tunnels. Crafted in 25kg batches to control heat, crunch, and delicate aroma.",
    descBn: "স্বয়ংক্রিয় মেশিন নয়, ছোট কড়াইয়ে যত্ন সহকারে ভাজা হয় যাতে প্রতিটি দানায় থাকে খাঁটি স্বাদ।",
  },
  {
    id: "heritage-spices",
    iconName: "leaf",
    titleEn: "Proprietary Spice Blend",
    titleBn: "নিজস্ব মশলার ঐতিহ্যবাহী মেলবন্ধন",
    descEn: "Whole roasted cumin, black rock salt, and sun-dried chillies ground fresh daily in Raniganj.",
    descBn: "গোটা জিরে, বিট নুন এবং রোদে শুকানো লঙ্কা প্রতিদিন টাটকা গুঁড়ো করে মেশানো হয়।",
  },
  {
    id: "mustard-oil",
    iconName: "flame",
    titleEn: "Pure Mustard Oil Warmth",
    titleBn: "খাঁটি সরিষার তেলের ঝাঁঝালো স্বাদ",
    descEn: "Fried in pure edible oil delivering the authentic pungent bite Bengal tea connoisseurs demand.",
    descBn: "সরিষার তেলের আসল ঝাঁঝ যা সন্ধ্যার চায়ের আড্ডাকে করে তোলে আরো জমজমাট।",
  },
  {
    id: "nitrogen-lock",
    iconName: "pack",
    titleEn: "Nitrogen Freshness Lock",
    titleBn: "এয়ারটাইট নাইট্রোজেন সিলিং প্যাক",
    descEn: "Packed in multi-layer moisture barrier foils to preserve day-one crunch for up to 90 days.",
    descBn: "আধুনিক নাইট্রোজেন প্যাকেজিং যা আর্দ্রতা রোধ করে এবং চানাচুরকে রাখে ৯০ দিন পর্যন্ত মুচমুচে।",
  },
  {
    id: "evening-adda",
    iconName: "chai",
    titleEn: "The Soul of Bengali Adda",
    titleBn: "বাঙালির সন্ধ্যার আড্ডার আসল সঙ্গী",
    descEn: "Created specifically to complement hot clay cups of tea and soulful neighbourhood conversations.",
    descBn: "মাটির ভাঁড়ের গরম চা আর বন্ধুদের আড্ডার এক অবিচ্ছেদ্য চিরন্তন সঙ্গী।",
  },
  {
    id: "trusted-heritage",
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
    tag: "Protein Rich",
  },
  {
    id: "besan-sev",
    nameEn: "Crispy Besan Sev",
    nameBn: "খাঁটি বেসন সেভ",
    subtitleEn: "Fine Gram Flour Strands",
    subtitleBn: "মুচমুচে সোনালী সেভ",
    notesEn: "Hand-pressed chickpea flour infused with turmeric and ajwain, fried into gossamer crisp ribbons.",
    tag: "Signature Crunch",
  },
  {
    id: "chiwda",
    nameEn: "Spiced Roasted Chiwda",
    nameBn: "মুচমুচে মশলা চিঁড়ে",
    subtitleEn: "Flattened Rice Flakes",
    subtitleBn: "হালকা ভাজা চিঁড়ে",
    notesEn: "Airy, featherlight flattened rice roasted with curry leaves and mustard seeds.",
    tag: "Light & Crispy",
  },
  {
    id: "boondi",
    nameEn: "Crunchy Spiced Boondi",
    nameBn: "কুড়মুড়ে বুন্দিয়া",
    subtitleEn: "Golden Droplet Pearls",
    subtitleBn: "মশলাদার বুন্দিয়া",
    notesEn: "Porous chickpea droplets absorbing black rock salt and tangy amchur notes.",
    tag: "Tangy Burst",
  },
  {
    id: "dry-chilli",
    nameEn: "Sun-Dried Red Chilli",
    nameBn: "খাঁটি শুকনো লঙ্কা",
    subtitleEn: "Fiery Bengal Heat",
    subtitleBn: "ঝাল ও সুবাস",
    notesEn: "Whole dried crimson chillies stone-crushed for deep smoky warmth without harsh bitterness.",
    tag: "Aromatic Heat",
  },
  {
    id: "fried-lentils",
    nameEn: "Fried Spiced Chana Dal",
    nameBn: "মচমচে ভাজা ডাল",
    subtitleEn: "Golden Split Lentils",
    subtitleBn: "চটপটা নোনতা ডাল",
    notesEn: "Crispy fried yellow split lentils providing a firm, savory toothsome texture in every spoonful.",
    tag: "Savory Bite",
  },
  {
    id: "masoor-dal",
    nameEn: "Fried Masoor Dal",
    nameBn: "মচমচে মসুর ডাল",
    subtitleEn: "Crispy Whole Red Lentils",
    subtitleBn: "খাস্তা ভাজা ডাল",
    notesEn: "Whole brown-red lentils fried to an airy crunch with subtle roasted aroma and savory spice dusting.",
    tag: "Protein Rich",
  },
  {
    id: "besan-gathia",
    nameEn: "Crispy Besan Gathia",
    nameBn: "খাঁটি বেসন গাঁঠিয়া",
    subtitleEn: "Spiced Gram Flour Crunch",
    subtitleBn: "মশলাদার গাঁঠিয়া",
    notesEn: "Thick golden chickpea ribbons infused with ajwain and crushed black pepper for a bold savory bite.",
    tag: "Bold Crunch",
  },
  {
    id: "raisins-cashews",
    nameEn: "Raisins & Roasted Cashews",
    nameBn: "কিশমিশ ও কাজুবাদাম",
    subtitleEn: "Sweet & Nutty Harmony",
    subtitleBn: "মিষ্টি ও বাদামের মেলবন্ধন",
    notesEn: "Plump sun-kissed golden raisins and crunchy dry-roasted cashews creating a rich royal contrast.",
    tag: "Royal Crunch",
  },
];

export const PRODUCTS_CATALOG: SKUProduct[] = [
  {
    id: "sku-5-jhal",
    title: "Pocket Pack",
    flavor: "SPECIAL JHAL",
    flavorBn: "স্পেশাল ঝাল",
    tagline: "Quick mini crunch on the go",
    price: "₹5",
    netWt: "25gm",
    badge: "Mini Pack",
    image: "/5_rs_jhal_old.webp",
    description: "Crispy, fiery, and perfectly portioned 25g snack pack with signature Bengal spices.",
    spiceLevel: "jhal",
    ingredientsList: ["Besan Sev", "Roasted Peanuts", "Boondi", "Dry Chilli Blend", "Mustard Oil"],
  },
  {
    id: "sku-5-misti",
    title: "Pocket Pack",
    flavor: "TAK JHAL MISTI",
    flavorBn: "টক ঝাল মিষ্টি",
    tagline: "Tangy sweet mini snack for instant cravings",
    price: "₹5",
    netWt: "25gm",
    badge: "Mini Pack",
    image: "/5_rs_misti_old.webp",
    description: "Sweet, tangy, and mildly spiced 25g mini pack crafted for quick tea breaks.",
    spiceLevel: "misti",
    ingredientsList: ["Besan Sev", "Chiwda", "Sweet Boondi", "Roasted Peanuts", "Amchur Spice Blend"],
  },
  {
    id: "sku-10-jhal-red",
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
    id: "sku-10-jhal-classic",
    title: "Pocket Buddy",
    flavor: "SPECIAL JHAL",
    flavorBn: "স্পেশাল ঝাল (ক্লাসিক)",
    tagline: "Classic golden recipe in pocket size",
    price: "₹10",
    netWt: "50gm",
    badge: "Classic",
    image: "/10_rs_jhal_old.webp",
    description: "The time-tested Raniganj classic recipe packed with crispy sev, split dal, and slow-roasted peanuts.",
    spiceLevel: "jhal",
    ingredientsList: ["Besan Sev", "Chana Dal", "Roasted Peanuts", "Classic Spice Blend", "Mustard Oil"],
  },
  {
    id: "sku-10-misti-new",
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
    id: "sku-10-misti-classic",
    title: "Pocket Buddy",
    flavor: "TAK JHAL MISTI",
    flavorBn: "টক ঝাল মিষ্টি (ক্লাসিক)",
    tagline: "Heritage sweet & sour tea-time favorite",
    price: "₹10",
    netWt: "50gm",
    badge: "Classic",
    image: "/10_rs_misti_old.webp",
    description: "Heritage sweet-tangy chanachur blended with crispy sev and savory crunch for evening cha.",
    spiceLevel: "misti",
    ingredientsList: ["Besan Sev", "Crisp Chiwda", "Boondi", "Roasted Peanuts", "Tangy Masala"],
  },
  {
    id: "sku-150-jhal",
    title: "Big Brother Pack",
    flavor: "SPECIAL JHAL",
    flavorBn: "স্পেশাল ঝাল",
    tagline: "Generous evening adda size",
    price: "₹38",
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
    price: "₹38",
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
    price: "₹102",
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
    price: "₹102",
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
    price: "₹105",
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
    price: "₹105",
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
    netWt: "50gm / 30gm",
    badge: "Specialty",
    image: "/Chira.webp",
    description: "Featherlight flattened rice tossed with roasted peanuts, curry leaves, and crunchy mustard seasoning.",
    spiceLevel: "medium",
    ingredientsList: ["Flattened Rice (Poha)", "Roasted Peanuts", "Curry Leaves", "Mustard Seeds", "Turmeric Salt"],
  },
];
