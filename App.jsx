import React, {
  useState, useEffect, useRef, useMemo, createContext, useContext,
} from "react";
import {
  ShoppingCart, ShoppingBag, Search, Menu, X, ChevronDown, ChevronRight,
  ChevronLeft, Star, Truck, Store, RotateCcw, Plus, Minus, Shirt, Sofa,
  Lamp, Coffee, Wind, Zap, Check, ArrowLeft, ArrowRight, Facebook,
  Instagram, Twitter, Youtube, Mail, Globe, MessageCircle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* CONFIG                                                               */
/* ------------------------------------------------------------------ */

// Replace with your real WhatsApp number, country code first, digits only.
const WHATSAPP_NUMBER = "96500000000";

/* ------------------------------------------------------------------ */
/* TRANSLATIONS                                                         */
/* ------------------------------------------------------------------ */

const STR = {
  en: {
    brand: "daylight",
    searchPlaceholder: "Search everything at daylight",
    shopCategories: "Shop Categories",
    clothing: "Clothing",
    appliances: "Home Appliances",
    furniture: "Furniture",
    heroClothing: "New season,\neasy fits",
    heroAppliances: "Small appliances,\nbig upgrades",
    heroFurniture: "Furnish it\nyour way",
    shopNow: "Shop Now",
    freeShippingTitle: "Free Shipping",
    freeShippingSub: "On orders over 15.000 KWD",
    freeStorePickup: "Free Store Pickup",
    freeStorePickupSub: "Ready in as little as 2 hours",
    easyReturns: "Easy 30-Day Returns",
    easyReturnsSub: "No questions asked",
    clothingSubtitle: "Everyday fits, easy pricing",
    appliancesSubtitle: "Small kitchen upgrades, big results",
    furnitureSubtitle: "Pieces that make a room feel done",
    selectOptions: "Select Options",
    addToCart: "Add to Cart",
    addedToCart: "Added to Cart",
    yourCart: "Your Cart",
    emptyCart: "Your cart is empty",
    subtotal: "Subtotal",
    checkout: "Checkout",
    addMore: "Add",
    addMoreEnd: "more for free shipping",
    freeShippingUnlocked: "You've unlocked free shipping!",
    backToShopping: "Back to shopping",
    color: "Color",
    size: "Size",
    qty: "Qty",
    youSave: "You save",
    moreIn: "More in",
    joinDeals: "Join for deals & 10% off",
    joinDealsSub: "Sign up for emails and get 10% off your next order, plus first access to sales.",
    emailPlaceholder: "Email address",
    join: "Join",
    subscribed: "You're subscribed!",
    getHelp: "Get Help",
    trackOrder: "Track Order",
    returnsExch: "Returns & Exchanges",
    shippingInfo: "Shipping Info",
    contactUs: "Contact Us",
    aboutTitle: "About Daylight",
    ourStory: "Our Story",
    careers: "Careers",
    press: "Press",
    sustainability: "Sustainability",
    shopTitle: "Shop",
    giftCards: "Gift Cards",
    rights: "© 2026 Daylight General Merchandise Co.",
    privacy: "Privacy",
    terms: "Terms",
    accessibility: "Accessibility",
    whatsappTip: "Chat with us",
    freeShipFooter: "Free shipping over 15.000 KWD",
    returns30: "30-day returns",
    added: "added to cart",
    switchTo: "العربية",
  },
  ar: {
    brand: "دايلايت",
    searchPlaceholder: "ابحث عن أي شيء في دايلايت",
    shopCategories: "تسوق حسب الفئة",
    clothing: "ملابس",
    appliances: "أجهزة منزلية صغيرة",
    furniture: "أثاث",
    heroClothing: "موسم جديد،\nقصّات سهلة",
    heroAppliances: "أجهزة صغيرة،\nنتائج كبيرة",
    heroFurniture: "أثّث منزلك\nبأسلوبك",
    shopNow: "تسوّق الآن",
    freeShippingTitle: "شحن مجاني",
    freeShippingSub: "للطلبات فوق 15.000 د.ك",
    freeStorePickup: "استلام مجاني من المتجر",
    freeStorePickupSub: "جاهز خلال ساعتين فقط",
    easyReturns: "إرجاع سهل خلال 30 يومًا",
    easyReturnsSub: "دون أي أسئلة",
    clothingSubtitle: "قصّات يومية، أسعار واضحة",
    appliancesSubtitle: "ترقية بسيطة للمطبخ، نتيجة كبيرة",
    furnitureSubtitle: "قطع تُكمل شكل الغرفة",
    selectOptions: "اختر الخيارات",
    addToCart: "أضف إلى السلة",
    addedToCart: "أُضيف إلى السلة",
    yourCart: "سلتك",
    emptyCart: "سلتك فارغة",
    subtotal: "المجموع الفرعي",
    checkout: "إتمام الشراء",
    addMore: "أضف",
    addMoreEnd: "أكثر للحصول على شحن مجاني",
    freeShippingUnlocked: "لقد حصلت على الشحن المجاني!",
    backToShopping: "العودة للتسوق",
    color: "اللون",
    size: "المقاس",
    qty: "الكمية",
    youSave: "توفّر",
    moreIn: "المزيد من",
    joinDeals: "اشترك واحصل على خصم 10%",
    joinDealsSub: "اشترك بالبريد الإلكتروني واحصل على خصم 10% على طلبك القادم، مع أولوية الوصول للتخفيضات.",
    emailPlaceholder: "البريد الإلكتروني",
    join: "اشترك",
    subscribed: "تم الاشتراك بنجاح!",
    getHelp: "المساعدة",
    trackOrder: "تتبّع الطلب",
    returnsExch: "الإرجاع والاستبدال",
    shippingInfo: "معلومات الشحن",
    contactUs: "تواصل معنا",
    aboutTitle: "عن دايلايت",
    ourStory: "قصتنا",
    careers: "الوظائف",
    press: "الإعلام",
    sustainability: "الاستدامة",
    shopTitle: "تسوّق",
    giftCards: "بطاقات هدايا",
    rights: "© 2026 شركة دايلايت للتجارة العامة",
    privacy: "الخصوصية",
    terms: "الشروط",
    accessibility: "إمكانية الوصول",
    whatsappTip: "تواصل معنا عبر واتساب",
    freeShipFooter: "شحن مجاني للطلبات فوق 15.000 د.ك",
    returns30: "إرجاع خلال 30 يومًا",
    added: "أُضيف إلى السلة",
    switchTo: "English",
  },
};

const SPEC_KEY_AR = {
  "Wattage": "الطاقة", "Capacity": "السعة", "Programmable": "قابل للبرمجة",
  "Auto Shutoff": "إيقاف تلقائي", "Warranty": "الضمان", "Functions": "الوظائف",
  "Interior Light": "إضاءة داخلية", "Cups Included": "أكواب مرفقة",
  "Blades": "الشفرات", "Dishwasher Safe": "آمن لغسالة الأطباق",
  "Presets": "برامج جاهزة", "Basket": "السلة", "Bowl Capacity": "سعة الوعاء",
  "Speeds": "السرعات", "Attachments": "الملحقات", "Height": "الارتفاع",
  "Oscillation": "الدوران", "Timer": "المؤقت", "Dimensions": "الأبعاد",
  "Seat Height": "ارتفاع المقعد", "Weight Capacity": "الحمولة القصوى",
  "Assembly": "التركيب", "Materials": "الخامات", "Shelves": "الأرفف",
  "Storage": "التخزين", "Mattress Size": "مقاس المرتبة", "Seats": "عدد المقاعد",
  "Drawers": "الأدراج",
};

const LangContext = createContext(null);
function useLang() {
  return useContext(LangContext);
}

function money(n, lang) {
  const v = n.toFixed(3);
  return lang === "ar" ? `${v} د.ك` : `${v} KWD`;
}

/* ------------------------------------------------------------------ */
/* DATA                                                                 */
/* ------------------------------------------------------------------ */

const CLOTHING = [
  {
    name: "Relaxed Fit Crewneck Sweatshirt", nameAr: "سويت شيرت رقبة دائرية واسع",
    price: 24.99, was: 32.99,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Charcoal", nameAr: "رمادي غامق", hex: "#333333" },
      { name: "Rally Red", nameAr: "أحمر", hex: "#CC0000" },
      { name: "Oat", nameAr: "بيج", hex: "#EDE1CF" },
      { name: "Navy", nameAr: "كحلي", hex: "#1F2A44" },
    ],
    rating: 4.6, reviews: 812, icon: Shirt,
  },
  {
    name: "High-Rise Straight Leg Jeans", nameAr: "جينز خصر عالي ساق مستقيمة",
    price: 34.99,
    sizes: ["24", "26", "28", "30", "32", "34"],
    colors: [
      { name: "Indigo", nameAr: "نيلي", hex: "#2C3E63" },
      { name: "Black", nameAr: "أسود", hex: "#1A1A1A" },
      { name: "Light Wash", nameAr: "أزرق فاتح", hex: "#A9BCC9" },
    ],
    rating: 4.4, reviews: 356, icon: Shirt,
  },
  {
    name: "Everyday Ribbed Knit Tee", nameAr: "تيشيرت محبوك يومي",
    price: 12.99, was: 15.99,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", nameAr: "أبيض", hex: "#FFFFFF" },
      { name: "Black", nameAr: "أسود", hex: "#1A1A1A" },
      { name: "Sage", nameAr: "أخضر فاتح", hex: "#8A9A7E" },
      { name: "Rally Red", nameAr: "أحمر", hex: "#CC0000" },
    ],
    rating: 4.8, reviews: 1204, icon: Shirt,
  },
  {
    name: "Quilted Puffer Vest", nameAr: "سترة منفوخة مبطنة",
    price: 39.99,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Olive", nameAr: "زيتي", hex: "#5B6B4D" },
      { name: "Black", nameAr: "أسود", hex: "#1A1A1A" },
      { name: "Rally Red", nameAr: "أحمر", hex: "#CC0000" },
    ],
    rating: 4.5, reviews: 198, icon: Shirt,
  },
  {
    name: "Wide-Leg Trousers", nameAr: "بنطال واسع الساق",
    price: 29.99,
    sizes: ["0", "4", "8", "12", "16", "20"],
    colors: [
      { name: "Black", nameAr: "أسود", hex: "#1A1A1A" },
      { name: "Tan", nameAr: "بني فاتح", hex: "#C9A876" },
      { name: "Navy", nameAr: "كحلي", hex: "#1F2A44" },
    ],
    rating: 4.3, reviews: 143, icon: Shirt,
  },
  {
    name: "Fleece-Lined Zip Hoodie", nameAr: "هودي بسحاب مبطن بالفليس",
    price: 27.99, was: 35.99,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Heather Gray", nameAr: "رمادي مُخلّط", hex: "#A8A8A8" },
      { name: "Rally Red", nameAr: "أحمر", hex: "#CC0000" },
      { name: "Forest", nameAr: "أخضر غامق", hex: "#33513B" },
    ],
    rating: 4.7, reviews: 567, icon: Shirt,
  },
];

const APPLIANCES = [
  {
    name: "12-Cup Programmable Coffee Maker", nameAr: "ماكينة قهوة قابلة للبرمجة 12 كوب",
    price: 34.99, feature: "12-Cup Capacity", featureAr: "سعة 12 كوب",
    specs: { "Wattage": "900W", "Capacity": "12 cups", "Programmable": "Yes, 24-hr", "Auto Shutoff": "2 hours", "Warranty": "1 year" },
    bullets: ["Brew-strength selector", "Reusable gold-tone filter", "Warming plate keeps coffee hot for 2 hours"],
    bulletsAr: ["اختيار قوة التحضير", "فلتر ذهبي قابل لإعادة الاستخدام", "لوح تدفئة يحافظ على سخونة القهوة لساعتين"],
    rating: 4.5, reviews: 940, icon: Coffee,
  },
  {
    name: "6-Slice Convection Toaster Oven", nameAr: "فرن تحميص بالحمل الحراري 6 شرائح",
    price: 59.99, was: 74.99, feature: "Fits a 12-in Pizza", featureAr: "يستوعب بيتزا 12 إنش",
    specs: { "Wattage": "1500W", "Capacity": "6 slices / 12-in pizza", "Functions": "Bake, Broil, Toast, Convection", "Interior Light": "Yes", "Warranty": "1 year" },
    bullets: ["Even-heat convection fan", "Removable crumb tray", "Non-stick interior"],
    bulletsAr: ["مروحة حمل حراري لتوزيع متساوٍ للحرارة", "درج فتات قابل للإزالة", "طبقة داخلية غير لاصقة"],
    rating: 4.6, reviews: 512, icon: Zap,
  },
  {
    name: "Personal Blender with To-Go Cups", nameAr: "خلاط شخصي مع أكواب للتنقل",
    price: 24.99, feature: "700W Motor", featureAr: "محرك 700 واط",
    specs: { "Wattage": "700W", "Cups Included": "2 (20 oz)", "Blades": "Stainless steel, 4-point", "Dishwasher Safe": "Yes (cups)", "Warranty": "1 year" },
    bullets: ["Flip-and-go lids for on-the-go", "One-touch pulse blending", "Compact footprint"],
    bulletsAr: ["أغطية سريعة للاستخدام أثناء التنقل", "خلط بلمسة واحدة", "حجم صغير موفر للمساحة"],
    rating: 4.2, reviews: 301, icon: Zap,
  },
  {
    name: "Compact Digital Air Fryer, 4-Qt", nameAr: "قلاية هوائية رقمية مدمجة 4 لتر",
    price: 49.99, feature: "Digital Touchscreen", featureAr: "شاشة لمس رقمية",
    specs: { "Wattage": "1200W", "Capacity": "4 quarts", "Presets": "8 one-touch programs", "Basket": "Dishwasher-safe, non-stick", "Warranty": "1 year" },
    bullets: ["Little to no oil needed", "Auto shut-off + timer", "Cool-touch handle"],
    bulletsAr: ["قلي بأقل كمية زيت أو بدونه", "إيقاف تلقائي مع مؤقت", "مقبض بارد آمن للمس"],
    rating: 4.7, reviews: 1120, icon: Wind,
  },
  {
    name: "Stand Mixer, 5.5-Qt", nameAr: "خلاط عجين واقف 5.5 لتر",
    price: 189.99, was: 219.99, feature: "10 Speed Settings", featureAr: "10 درجات سرعة",
    specs: { "Wattage": "500W", "Bowl Capacity": "5.5 quarts", "Speeds": "10", "Attachments": "Flat beater, whisk, dough hook", "Warranty": "2 years" },
    bullets: ["Tilt-head design for easy access", "Splash guard included", "Direct-drive gearing for heavy dough"],
    bulletsAr: ["رأس مائل لسهولة الوصول", "واقٍ ضد الرذاذ مرفق", "نظام دفع قوي مناسب للعجين الثقيل"],
    rating: 4.9, reviews: 743, icon: Zap,
  },
  {
    name: "Tower Fan with Remote, 40-in", nameAr: "مروحة برجية بريموت 40 إنش",
    price: 44.99, feature: "3 Speeds / Oscillating", featureAr: "3 سرعات / دوّارة",
    specs: { "Height": "40 inches", "Speeds": "3", "Oscillation": "70-degree", "Timer": "Up to 7.5 hours", "Warranty": "1 year" },
    bullets: ["Whisper-quiet operation", "Removable washable filter", "Includes remote control"],
    bulletsAr: ["تشغيل هادئ جدًا", "فلتر قابل للإزالة والغسل", "يشمل جهاز تحكم عن بعد"],
    rating: 4.4, reviews: 288, icon: Wind,
  },
];

const FURNITURE = [
  {
    name: "Mid-Century Accent Chair", nameAr: "كرسي أكسنت بطراز منتصف القرن",
    price: 249.99, dims: "28\"W x 30\"D x 32\"H", materials: "Solid wood legs, performance woven fabric",
    materialsAr: "أرجل خشب صلب، قماش منسوج عالي الأداء",
    specs: { "Dimensions": "28\"W x 30\"D x 32\"H", "Seat Height": "17.5\"", "Weight Capacity": "300 lbs", "Assembly": "Legs attach only", "Materials": "Solid wood, performance fabric" },
    rating: 4.6, reviews: 214, icon: Sofa,
  },
  {
    name: "3-Shelf Bookcase", nameAr: "مكتبة بثلاثة أرفف",
    price: 89.99, was: 109.99, dims: "24\"W x 12\"D x 48\"H", materials: "Engineered wood, walnut finish",
    materialsAr: "خشب هندسي بلمسة نهائية جوزية",
    specs: { "Dimensions": "24\"W x 12\"D x 48\"H", "Shelves": "3, fixed", "Weight Capacity": "35 lbs / shelf", "Assembly": "Required, tools included", "Materials": "Engineered wood" },
    rating: 4.3, reviews: 176, icon: Sofa,
  },
  {
    name: "Storage Ottoman Bench", nameAr: "مقعد أوتومان بتخزين",
    price: 69.99, dims: "40\"W x 16\"D x 18\"H", materials: "Linen-blend upholstery, hinged lid",
    materialsAr: "تنجيد كتاني مع غطاء مفصلي",
    specs: { "Dimensions": "40\"W x 16\"D x 18\"H", "Storage": "Hinged lid, interior bin", "Weight Capacity": "250 lbs (seat)", "Assembly": "Legs attach only", "Materials": "Linen-blend, engineered wood frame" },
    rating: 4.5, reviews: 132, icon: Sofa,
  },
  {
    name: "Queen Platform Bed Frame", nameAr: "إطار سرير كوين بدون قاعدة زنبركية",
    price: 299.99, dims: "63\"W x 84\"D x 14\"H", materials: "Solid pine frame, slatted base",
    materialsAr: "إطار من خشب الصنوبر الصلب مع قاعدة شرائحية",
    specs: { "Dimensions": "63\"W x 84\"D x 14\"H", "Mattress Size": "Queen (box spring not needed)", "Weight Capacity": "700 lbs", "Assembly": "Required, ~45 min", "Materials": "Solid pine" },
    rating: 4.7, reviews: 389, icon: Sofa,
  },
  {
    name: "Round Pedestal Dining Table", nameAr: "طاولة طعام دائرية بقاعدة واحدة",
    price: 199.99, dims: "42\" Diameter x 30\"H", materials: "Engineered wood, oak finish",
    materialsAr: "خشب هندسي بلمسة نهائية بلوطية",
    specs: { "Dimensions": "42\" Diameter x 30\"H", "Seats": "4", "Weight Capacity": "150 lbs", "Assembly": "Required, tools included", "Materials": "Engineered wood, oak veneer" },
    rating: 4.4, reviews: 97, icon: Sofa,
  },
  {
    name: "2-Drawer Nightstand", nameAr: "طاولة جانبية بدرجين",
    price: 59.99, was: 74.99, dims: "20\"W x 16\"D x 24\"H", materials: "Engineered wood, soft-close drawers",
    materialsAr: "خشب هندسي مع أدراج تنغلق بهدوء",
    specs: { "Dimensions": "20\"W x 16\"D x 24\"H", "Drawers": "2, soft-close", "Weight Capacity": "20 lbs / drawer", "Assembly": "Required, tools included", "Materials": "Engineered wood" },
    rating: 4.5, reviews: 221, icon: Lamp,
  },
];

const CATEGORY_META = {
  clothing: { data: CLOTHING, tint: "linear-gradient(160deg, #FFF3F3 0%, #FFD9D9 100%)" },
  appliances: { data: APPLIANCES, tint: "linear-gradient(160deg, #F1F5F8 0%, #DCE6EC 100%)" },
  furniture: { data: FURNITURE, tint: "linear-gradient(160deg, #FBF4E9 0%, #F0E1C4 100%)" },
};

const ALL_PRODUCTS = Object.entries(CATEGORY_META).flatMap(([cat, meta]) =>
  meta.data.map((p, i) => ({ ...p, category: cat, id: `${cat}-${i}` }))
);

/* ------------------------------------------------------------------ */
/* SMALL HELPERS                                                        */
/* ------------------------------------------------------------------ */

function StarRating({ rating, reviews, size = 14 }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star key={n} size={size} fill={n <= Math.round(rating) ? "#E8A400" : "none"} stroke="#E8A400" strokeWidth={1.5} />
        ))}
      </div>
      {reviews != null && <span style={{ fontSize: 12, color: "#767676" }}>({reviews})</span>}
    </div>
  );
}

function PriceBlock({ price, was, size = "base" }) {
  const { lang } = useLang();
  const big = size === "lg" ? 20 : 15;
  return (
    <div className="flex items-baseline gap-2 flex-wrap">
      <span style={{ fontWeight: 700, fontSize: big, color: was ? "#CC0000" : "#333333" }}>{money(price, lang)}</span>
      {was && <span style={{ fontSize: 12.5, color: "#767676", textDecoration: "line-through" }}>{money(was, lang)}</span>}
    </div>
  );
}

function CategoryThumb({ product, className = "" }) {
  const meta = CATEGORY_META[product.category];
  const Icon = product.icon;
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ background: meta.tint }}>
      {product.was && (
        <span className="absolute top-2 rtl:right-2 ltr:left-2 rounded-sm px-2 py-0.5 text-white" style={{ background: "#CC0000", fontSize: 11, fontWeight: 700, letterSpacing: 0.3 }}>
          SALE
        </span>
      )}
      <Icon size={56} strokeWidth={1.25} color="#333333" opacity={0.55} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MAIN APP                                                             */
/* ------------------------------------------------------------------ */

export default function DaylightStore() {
  const [lang, setLang] = useState("en");
  const [view, setView] = useState("home");
  const [selectedId, setSelectedId] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [catDropdown, setCatDropdown] = useState(false);
  const [query, setQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [toast, setToast] = useState(null);
  const [pendingScroll, setPendingScroll] = useState(null);

  const dir = lang === "ar" ? "rtl" : "ltr";
  const t = STR[lang];

  const clothingRef = useRef(null);
  const appliancesRef = useRef(null);
  const furnitureRef = useRef(null);
  const sectionRefs = { clothing: clothingRef, appliances: appliancesRef, furniture: furnitureRef };

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", dir);
  }, [lang, dir]);

  useEffect(() => {
    if (view === "home" && pendingScroll && sectionRefs[pendingScroll].current) {
      sectionRefs[pendingScroll].current.scrollIntoView({ behavior: "smooth", block: "start" });
      setPendingScroll(null);
    }
  }, [view, pendingScroll]);

  useEffect(() => {
    if (toast) {
      const id = setTimeout(() => setToast(null), 2400);
      return () => clearTimeout(id);
    }
  }, [toast]);

  const fontHeading = { fontFamily: lang === "ar" ? "'Tajawal', sans-serif" : "'Poppins', sans-serif" };
  const fontBody = { fontFamily: lang === "ar" ? "'Tajawal', sans-serif" : "'Inter', sans-serif" };

  function goToCategory(cat) {
    setMobileNavOpen(false);
    setCatDropdown(false);
    setView("home");
    setPendingScroll(cat);
  }

  function openProduct(id) {
    setSelectedId(id);
    setView("detail");
    setMobileNavOpen(false);
    setQuery("");
    window.scrollTo(0, 0);
  }

  function goHome() {
    setView("home");
    window.scrollTo(0, 0);
  }

  function addToCart(product, opts = {}, qty = 1) {
    const optKey = opts.size || opts.color ? `${opts.size || ""}-${opts.color || ""}` : "std";
    const cartId = `${product.id}-${optKey}`;
    setCart((prev) => {
      const existing = prev.find((c) => c.cartId === cartId);
      if (existing) return prev.map((c) => (c.cartId === cartId ? { ...c, qty: c.qty + qty } : c));
      return [...prev, {
        cartId, id: product.id,
        name: product.name, nameAr: product.nameAr,
        price: product.price, category: product.category, icon: product.icon,
        size: opts.size, color: opts.color, colorAr: opts.colorAr, qty,
      }];
    });
    setToast(`${lang === "ar" ? product.nameAr : product.name} ${t.added}`);
    setCartOpen(true);
  }

  function updateQty(cartId, delta) {
    setCart((prev) => prev.map((c) => (c.cartId === cartId ? { ...c, qty: c.qty + delta } : c)).filter((c) => c.qty > 0));
  }

  function removeFromCart(cartId) {
    setCart((prev) => prev.filter((c) => c.cartId !== cartId));
  }

  const subtotal = useMemo(() => cart.reduce((s, c) => s + c.price * c.qty, 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((s, c) => s + c.qty, 0), [cart]);
  const FREE_SHIP_THRESHOLD = 15;
  const shipProgress = Math.min(subtotal / FREE_SHIP_THRESHOLD, 1);
  const remaining = Math.max(0, FREE_SHIP_THRESHOLD - subtotal);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return ALL_PRODUCTS.filter((p) => p.name.toLowerCase().includes(q) || (p.nameAr && p.nameAr.includes(query))).slice(0, 6);
  }, [query]);

  const selectedProduct = ALL_PRODUCTS.find((p) => p.id === selectedId);

  return (
    <LangContext.Provider value={{ lang, setLang, t, dir }}>
      <div dir={dir} style={{ ...fontBody, background: "#FFFFFF", color: "#333333", minHeight: "100vh" }} className="w-full">
        <Header
          cartCount={cartCount} onCartClick={() => setCartOpen(true)}
          mobileNavOpen={mobileNavOpen} setMobileNavOpen={setMobileNavOpen}
          catDropdown={catDropdown} setCatDropdown={setCatDropdown}
          goToCategory={goToCategory} goHome={goHome}
          query={query} setQuery={setQuery}
          searchFocused={searchFocused} setSearchFocused={setSearchFocused}
          searchResults={searchResults} openProduct={openProduct}
          fontHeading={fontHeading}
        />

        {view === "home" && (
          <HomeView fontHeading={fontHeading} goToCategory={goToCategory} openProduct={openProduct} addToCart={addToCart} refs={sectionRefs} />
        )}

        {view === "detail" && selectedProduct && (
          <ProductDetail product={selectedProduct} onBack={goHome} addToCart={addToCart} fontHeading={fontHeading} onOpenProduct={openProduct} />
        )}

        <Footer fontHeading={fontHeading} />

        <CartDrawer
          open={cartOpen} onClose={() => setCartOpen(false)} cart={cart}
          updateQty={updateQty} removeFromCart={removeFromCart}
          subtotal={subtotal} shipProgress={shipProgress} remaining={remaining}
          fontHeading={fontHeading}
        />

        <WhatsAppButton />

        {toast && (
          <div
            className="fixed z-[70] left-1/2 -translate-x-1/2 bottom-6 flex items-center gap-2 px-4 py-3 rounded-md shadow-lg"
            style={{ background: "#333333", color: "#fff", fontSize: 14 }}
          >
            <Check size={16} color="#7BE07B" />
            {toast}
          </div>
        )}
      </div>
    </LangContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/* WHATSAPP FLOATING BUTTON                                             */
/* ------------------------------------------------------------------ */

function WhatsAppButton() {
  const { t, dir } = useLang();
  const side = dir === "rtl" ? "left-5 md:left-6" : "right-5 md:right-6";
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      title={t.whatsappTip}
      className={`fixed bottom-5 md:bottom-6 ${side} z-[55] flex items-center justify-center rounded-full shadow-lg`}
      style={{ width: 56, height: 56, background: "#25D366" }}
    >
      <span className="absolute inline-flex h-full w-full rounded-full opacity-40 animate-ping" style={{ background: "#25D366" }} />
      <MessageCircle size={26} color="#fff" fill="#fff" className="relative" />
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* HEADER                                                               */
/* ------------------------------------------------------------------ */

function Header({
  cartCount, onCartClick, mobileNavOpen, setMobileNavOpen, catDropdown,
  setCatDropdown, goToCategory, goHome, query, setQuery, searchFocused,
  setSearchFocused, searchResults, openProduct, fontHeading,
}) {
  const { lang, setLang, t, dir } = useLang();
  const NextChevron = dir === "rtl" ? ChevronLeft : ChevronRight;

  return (
    <header className="sticky top-0 z-50 bg-white border-b" style={{ borderColor: "#EDEDED" }}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="flex items-center gap-3 md:gap-6 py-3">
          <button className="md:hidden p-2 -ms-2" onClick={() => setMobileNavOpen((v) => !v)} aria-label="Open menu">
            {mobileNavOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <button onClick={goHome} className="flex items-center gap-2 shrink-0">
            <span className="flex items-center justify-center rounded-lg" style={{ width: 34, height: 34, background: "#CC0000" }}>
              <Plus size={20} color="#fff" strokeWidth={3} />
            </span>
            <span style={{ ...fontHeading, fontWeight: 800, fontSize: 22, color: "#CC0000", letterSpacing: -0.5 }}>{t.brand}</span>
          </button>

          <div className="hidden md:block relative flex-1 max-w-[520px] mx-auto">
            <div className="flex items-center rounded-full px-4" style={{ background: "#F7F7F7", height: 42, border: searchFocused ? "1.5px solid #CC0000" : "1.5px solid transparent" }}>
              <Search size={17} color="#767676" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
                placeholder={t.searchPlaceholder}
                className="bg-transparent outline-none flex-1 px-2 text-sm"
                style={{ color: "#333333" }}
              />
            </div>
            {searchFocused && searchResults.length > 0 && (
              <div className="absolute top-[46px] start-0 end-0 bg-white rounded-lg shadow-lg border overflow-hidden z-50" style={{ borderColor: "#EDEDED" }}>
                {searchResults.map((p) => (
                  <button key={p.id} onMouseDown={() => openProduct(p.id)} className="w-full flex items-center gap-3 px-4 py-2.5 text-start hover:bg-[#F7F7F7]">
                    <span className="flex items-center justify-center rounded" style={{ width: 32, height: 32, background: CATEGORY_META[p.category].tint }}>
                      <p.icon size={16} color="#333333" />
                    </span>
                    <span className="flex-1">
                      <div style={{ fontSize: 13.5, fontWeight: 500 }}>{lang === "ar" ? p.nameAr : p.name}</div>
                      <div style={{ fontSize: 12, color: "#767676" }}>{t[p.category]}</div>
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>{money(p.price, lang)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="hidden sm:flex items-center gap-1 text-sm font-semibold px-2 py-1.5 rounded-md hover:bg-[#F7F7F7]"
          >
            <Globe size={16} /> {t.switchTo}
          </button>

          <button onClick={onCartClick} className="relative ms-auto md:ms-0 p-2" aria-label="Open cart">
            <ShoppingCart size={24} color="#333333" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -end-1 flex items-center justify-center rounded-full text-white" style={{ background: "#CC0000", fontSize: 11, fontWeight: 700, minWidth: 18, height: 18, padding: "0 4px" }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>

        <div className="md:hidden pb-3 relative flex items-center gap-2">
          <div className="flex items-center rounded-full px-4 flex-1" style={{ background: "#F7F7F7", height: 40 }}>
            <Search size={16} color="#767676" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
              placeholder={t.searchPlaceholder}
              className="bg-transparent outline-none flex-1 px-2 text-sm"
            />
          </div>
          <button onClick={() => setLang(lang === "en" ? "ar" : "en")} className="flex items-center gap-1 text-xs font-semibold px-2 py-2 rounded-md" style={{ background: "#F7F7F7" }}>
            <Globe size={14} /> {t.switchTo}
          </button>
          {searchFocused && searchResults.length > 0 && (
            <div className="absolute top-[46px] start-4 end-4 bg-white rounded-lg shadow-lg border overflow-hidden z-50" style={{ borderColor: "#EDEDED" }}>
              {searchResults.map((p) => (
                <button key={p.id} onMouseDown={() => openProduct(p.id)} className="w-full flex items-center gap-3 px-4 py-2.5 text-start hover:bg-[#F7F7F7]">
                  <span className="flex-1"><div style={{ fontSize: 13.5, fontWeight: 500 }}>{lang === "ar" ? p.nameAr : p.name}</div></span>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>{money(p.price, lang)}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <nav className="hidden md:flex items-center gap-6 pb-3 relative">
          <div onMouseEnter={() => setCatDropdown(true)} onMouseLeave={() => setCatDropdown(false)} className="relative">
            <button className="flex items-center gap-1 text-sm font-semibold py-1">
              {t.shopCategories} <ChevronDown size={15} />
            </button>
            {catDropdown && (
              <div className="absolute top-full start-0 bg-white shadow-lg rounded-lg border py-2 min-w-[200px] z-50" style={{ borderColor: "#EDEDED" }}>
                {["clothing", "appliances", "furniture"].map((key) => (
                  <button key={key} onClick={() => goToCategory(key)} className="w-full text-start px-4 py-2 text-sm hover:bg-[#F7F7F7] flex items-center justify-between">
                    {t[key]} <NextChevron size={14} color="#999" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => goToCategory("clothing")} className="text-sm font-medium hover:text-[#CC0000]">{t.clothing}</button>
          <button onClick={() => goToCategory("appliances")} className="text-sm font-medium hover:text-[#CC0000]">{t.appliances}</button>
          <button onClick={() => goToCategory("furniture")} className="text-sm font-medium hover:text-[#CC0000]">{t.furniture}</button>
        </nav>
      </div>

      {mobileNavOpen && (
        <div className="md:hidden border-t px-4 py-3" style={{ borderColor: "#EDEDED" }}>
          {["clothing", "appliances", "furniture"].map((key) => (
            <button key={key} onClick={() => goToCategory(key)} className="w-full text-start py-2.5 text-sm font-medium border-b flex items-center justify-between" style={{ borderColor: "#F2F2F2" }}>
              {t[key]} <NextChevron size={15} color="#999" />
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* HOME VIEW                                                            */
/* ------------------------------------------------------------------ */

function HomeView({ fontHeading, goToCategory, openProduct, addToCart, refs }) {
  const { t } = useLang();
  return (
    <main>
      <Hero fontHeading={fontHeading} goToCategory={goToCategory} />
      <TrustRow />
      <CategorySection sectionRef={refs.clothing} titleKey="clothing" subtitleKey="clothingSubtitle" categoryKey="clothing" fontHeading={fontHeading} openProduct={openProduct} addToCart={addToCart} />
      <CategorySection sectionRef={refs.appliances} titleKey="appliances" subtitleKey="appliancesSubtitle" categoryKey="appliances" fontHeading={fontHeading} openProduct={openProduct} addToCart={addToCart} />
      <CategorySection sectionRef={refs.furniture} titleKey="furniture" subtitleKey="furnitureSubtitle" categoryKey="furniture" fontHeading={fontHeading} openProduct={openProduct} addToCart={addToCart} last />
    </main>
  );
}

function Hero({ fontHeading, goToCategory }) {
  const { t, dir } = useLang();
  const NextChevron = dir === "rtl" ? ChevronLeft : ChevronRight;
  const blocks = [
    { key: "clothing", headline: t.heroClothing, icon: Shirt, tint: CATEGORY_META.clothing.tint },
    { key: "appliances", headline: t.heroAppliances, icon: Coffee, tint: CATEGORY_META.appliances.tint },
    { key: "furniture", headline: t.heroFurniture, icon: Sofa, tint: CATEGORY_META.furniture.tint },
  ];
  return (
    <section className="grid grid-cols-1 md:grid-cols-3">
      {blocks.map((b) => (
        <div key={b.key} className="relative flex flex-col justify-between p-8 md:p-10 min-h-[280px] md:min-h-[360px]" style={{ background: b.tint }}>
          <b.icon size={40} strokeWidth={1.25} color="#333333" opacity={0.5} />
          <div>
            <h2 style={{ ...fontHeading, fontWeight: 800, fontSize: 28, lineHeight: 1.15, color: "#333333", whiteSpace: "pre-line" }} className="mb-5">
              {b.headline}
            </h2>
            <button onClick={() => goToCategory(b.key)} className="inline-flex items-center gap-1.5 text-white font-semibold rounded-full px-5 py-2.5 text-sm" style={{ background: "#CC0000" }}>
              {t.shopNow} <NextChevron size={15} />
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}

function TrustRow() {
  const { t } = useLang();
  const items = [
    { icon: Truck, title: t.freeShippingTitle, sub: t.freeShippingSub },
    { icon: Store, title: t.freeStorePickup, sub: t.freeStorePickupSub },
    { icon: RotateCcw, title: t.easyReturns, sub: t.easyReturnsSub },
  ];
  return (
    <section className="border-b" style={{ borderColor: "#EDEDED" }}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {items.map((it) => (
          <div key={it.title} className="flex items-center gap-3">
            <span className="flex items-center justify-center rounded-full shrink-0" style={{ width: 44, height: 44, background: "#F7F7F7" }}>
              <it.icon size={20} color="#CC0000" />
            </span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14.5 }}>{it.title}</div>
              <div style={{ fontSize: 13, color: "#767676" }}>{it.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CategorySection({ sectionRef, titleKey, subtitleKey, categoryKey, fontHeading, openProduct, addToCart, last }) {
  const { t } = useLang();
  const products = CATEGORY_META[categoryKey].data.map((p, i) => ({ ...p, category: categoryKey, id: `${categoryKey}-${i}` }));
  return (
    <section ref={sectionRef} className={`max-w-[1280px] mx-auto px-4 md:px-6 py-10 ${last ? "" : "border-b"}`} style={{ borderColor: "#EDEDED" }}>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 style={{ ...fontHeading, fontWeight: 800, fontSize: 24, color: "#333333" }}>{t[titleKey]}</h2>
          <p style={{ fontSize: 13.5, color: "#767676", marginTop: 2 }}>{t[subtitleKey]}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {products.map((p) => <ProductCard key={p.id} product={p} openProduct={openProduct} addToCart={addToCart} />)}
      </div>
    </section>
  );
}

function ProductCard({ product, openProduct, addToCart }) {
  const { lang, t } = useLang();
  const isClothing = product.category === "clothing";
  const isAppliance = product.category === "appliances";
  const isFurniture = product.category === "furniture";
  const name = lang === "ar" ? product.nameAr : product.name;

  return (
    <div className="flex flex-col rounded-lg overflow-hidden" style={{ background: "#F7F7F7" }}>
      <button onClick={() => openProduct(product.id)} className="text-start">
        <CategoryThumb product={product} className="w-full h-40 md:h-44" />
      </button>
      <div className="p-3.5 flex flex-col gap-1.5 flex-1">
        <button onClick={() => openProduct(product.id)} className="text-start">
          <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.3 }}>{name}</div>
        </button>

        {isClothing && (
          <div className="flex items-center gap-1 mt-0.5">
            {product.colors.slice(0, 4).map((c) => (
              <span key={c.name} className="rounded-full border" style={{ width: 14, height: 14, background: c.hex, borderColor: c.hex === "#FFFFFF" ? "#DDD" : c.hex }} title={lang === "ar" ? c.nameAr : c.name} />
            ))}
            <span style={{ fontSize: 11, color: "#767676", marginInlineStart: 2 }}>{product.sizes[0]}–{product.sizes[product.sizes.length - 1]}</span>
          </div>
        )}
        {isAppliance && <div style={{ fontSize: 12, color: "#767676" }}>{lang === "ar" ? product.featureAr : product.feature}</div>}
        {isFurniture && <div style={{ fontSize: 12, color: "#767676" }}>{product.dims}</div>}

        <StarRating rating={product.rating} reviews={product.reviews} size={12} />
        <PriceBlock price={product.price} was={product.was} />

        {isClothing ? (
          <button onClick={() => openProduct(product.id)} className="mt-1 text-sm font-semibold rounded-full py-2 border" style={{ borderColor: "#CC0000", color: "#CC0000" }}>
            {t.selectOptions}
          </button>
        ) : (
          <button onClick={() => addToCart(product)} className="mt-1 text-sm font-semibold rounded-full py-2 text-white" style={{ background: "#CC0000" }}>
            {t.addToCart}
          </button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PRODUCT DETAIL                                                       */
/* ------------------------------------------------------------------ */

function ProductDetail({ product, onBack, addToCart, fontHeading, onOpenProduct }) {
  const { lang, t, dir } = useLang();
  const BackArrow = dir === "rtl" ? ArrowRight : ArrowLeft;
  const isClothing = product.category === "clothing";
  const isAppliance = product.category === "appliances";
  const isFurniture = product.category === "furniture";

  const [size, setSize] = useState(isClothing ? product.sizes[2] || product.sizes[0] : null);
  const [color, setColor] = useState(isClothing ? product.colors[0] : null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const name = lang === "ar" ? product.nameAr : product.name;
  const related = ALL_PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  function handleAdd() {
    addToCart(product, isClothing ? { size, color: color.name, colorAr: color.nameAr } : {}, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <main className="max-w-[1280px] mx-auto px-4 md:px-6 py-8">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm font-medium mb-6" style={{ color: "#767676" }}>
        <BackArrow size={16} /> {t.backToShopping}
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <CategoryThumb product={product} className="w-full h-80 md:h-[420px] rounded-lg" />

        <div>
          <div style={{ fontSize: 12.5, color: "#767676", fontWeight: 600 }} className="mb-1">{t[product.category]}</div>
          <h1 style={{ ...fontHeading, fontWeight: 800, fontSize: 24, lineHeight: 1.25 }} className="mb-2">{name}</h1>
          <div className="mb-3"><StarRating rating={product.rating} reviews={product.reviews} size={15} /></div>
          <div className="mb-5">
            <PriceBlock price={product.price} was={product.was} size="lg" />
            {product.was && (
              <span style={{ fontSize: 12.5, color: "#0A7D2C", fontWeight: 600 }}>
                {t.youSave} {money(product.was - product.price, lang)}
              </span>
            )}
          </div>

          {isClothing && (
            <>
              <div className="mb-5">
                <div style={{ fontSize: 13, fontWeight: 700 }} className="mb-2">
                  {t.color} — <span style={{ fontWeight: 500, color: "#767676" }}>{lang === "ar" ? color.nameAr : color.name}</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((c) => (
                    <button key={c.name} onClick={() => setColor(c)} className="rounded-full flex items-center justify-center border-2"
                      style={{ width: 34, height: 34, background: c.hex, borderColor: color.name === c.name ? "#CC0000" : (c.hex === "#FFFFFF" ? "#DDD" : "transparent") }}
                      title={lang === "ar" ? c.nameAr : c.name}>
                      {color.name === c.name && <Check size={14} color={c.hex === "#FFFFFF" || c.hex === "#EDE1CF" ? "#333" : "#fff"} />}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <div style={{ fontSize: 13, fontWeight: 700 }} className="mb-2">{t.size} — <span style={{ fontWeight: 500, color: "#767676" }}>{size}</span></div>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((s) => (
                    <button key={s} onClick={() => setSize(s)} className="rounded-md text-sm font-medium"
                      style={{ minWidth: 42, height: 38, padding: "0 10px", border: size === s ? "1.5px solid #CC0000" : "1.5px solid #DDD", color: size === s ? "#CC0000" : "#333333", background: size === s ? "#FFF5F5" : "#fff" }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {isAppliance && (
            <div className="mb-6">
              <div style={{ fontSize: 13.5, fontWeight: 700, color: "#CC0000" }} className="mb-3">{lang === "ar" ? product.featureAr : product.feature}</div>
              <ul className="mb-4 space-y-1.5">
                {(lang === "ar" ? product.bulletsAr : product.bullets).map((b) => (
                  <li key={b} className="flex items-start gap-2" style={{ fontSize: 13.5 }}>
                    <Check size={15} color="#0A7D2C" className="mt-0.5 shrink-0" /> {b}
                  </li>
                ))}
              </ul>
              <SpecsTable specs={product.specs} />
            </div>
          )}

          {isFurniture && (
            <div className="mb-6">
              <div style={{ fontSize: 13.5 }} className="mb-3">{lang === "ar" ? product.materialsAr : product.materials}</div>
              <SpecsTable specs={product.specs} />
            </div>
          )}

          <div className="flex items-center gap-4 mb-4">
            <div style={{ fontSize: 13, fontWeight: 700 }}>{t.qty}</div>
            <div className="flex items-center border rounded-full" style={{ borderColor: "#DDD" }}>
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2.5"><Minus size={14} /></button>
              <span style={{ width: 24, textAlign: "center", fontSize: 14, fontWeight: 600 }}>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="p-2.5"><Plus size={14} /></button>
            </div>
          </div>

          <button onClick={handleAdd} className="w-full md:w-auto md:min-w-[260px] rounded-full py-3.5 px-8 text-white font-semibold text-[15px] flex items-center justify-center gap-2" style={{ background: added ? "#0A7D2C" : "#CC0000" }}>
            {added ? <><Check size={17} /> {t.addedToCart}</> : <><ShoppingBag size={17} /> {t.addToCart} — {money(product.price * qty, lang)}</>}
          </button>

          <div className="flex items-center gap-6 mt-5 flex-wrap">
            <div className="flex items-center gap-1.5" style={{ fontSize: 12.5, color: "#767676" }}><Truck size={15} /> {t.freeShipFooter}</div>
            <div className="flex items-center gap-1.5" style={{ fontSize: 12.5, color: "#767676" }}><RotateCcw size={15} /> {t.returns30}</div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h3 style={{ ...fontHeading, fontWeight: 800, fontSize: 20 }} className="mb-5">{t.moreIn} {t[product.category]}</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {related.map((p) => <ProductCard key={p.id} product={p} openProduct={onOpenProduct} addToCart={addToCart} />)}
          </div>
        </div>
      )}
    </main>
  );
}

function SpecsTable({ specs }) {
  const { lang } = useLang();
  return (
    <div className="rounded-lg overflow-hidden border" style={{ borderColor: "#EDEDED" }}>
      {Object.entries(specs).map(([k, v], i) => (
        <div key={k} className="flex justify-between px-4 py-2.5" style={{ background: i % 2 === 0 ? "#F7F7F7" : "#fff", fontSize: 13 }}>
          <span style={{ color: "#767676" }}>{lang === "ar" ? (SPEC_KEY_AR[k] || k) : k}</span>
          <span style={{ fontWeight: 600 }}>{v}</span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CART DRAWER                                                         */
/* ------------------------------------------------------------------ */

function CartDrawer({ open, onClose, cart, updateQty, removeFromCart, subtotal, shipProgress, remaining, fontHeading }) {
  const { lang, t, dir } = useLang();
  const closedTransform = dir === "rtl" ? "translateX(-100%)" : "translateX(100%)";
  const side = dir === "rtl" ? "left-0" : "right-0";

  return (
    <>
      <div onClick={onClose} className={`fixed inset-0 bg-black/40 z-[60] transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} />
      <aside className={`fixed top-0 ${side} h-full bg-white z-[65] flex flex-col shadow-2xl transition-transform duration-300`}
        style={{ width: "min(420px, 100vw)", transform: open ? "translateX(0)" : closedTransform }}>
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "#EDEDED" }}>
          <h2 style={{ ...fontHeading, fontWeight: 800, fontSize: 18 }}>{t.yourCart} ({cart.reduce((s, c) => s + c.qty, 0)})</h2>
          <button onClick={onClose} className="p-1"><X size={20} /></button>
        </div>

        <div className="px-5 py-4 border-b" style={{ borderColor: "#EDEDED", background: "#F7F7F7" }}>
          {remaining > 0 ? (
            <div style={{ fontSize: 13 }} className="mb-2">
              {t.addMore} <span style={{ fontWeight: 700, color: "#CC0000" }}>{money(remaining, lang)}</span> {t.addMoreEnd}
            </div>
          ) : (
            <div style={{ fontSize: 13, fontWeight: 700, color: "#0A7D2C" }} className="mb-2 flex items-center gap-1.5">
              <Check size={15} /> {t.freeShippingUnlocked}
            </div>
          )}
          <div className="w-full rounded-full h-2 overflow-hidden" style={{ background: "#E6E6E6" }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${shipProgress * 100}%`, background: "#CC0000" }} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3">
              <ShoppingBag size={40} color="#CCC" />
              <div style={{ color: "#767676", fontSize: 14 }}>{t.emptyCart}</div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map((c) => {
                const Icon = c.icon;
                const name = lang === "ar" ? c.nameAr : c.name;
                const colorLabel = lang === "ar" ? c.colorAr : c.color;
                return (
                  <div key={c.cartId} className="flex gap-3">
                    <span className="flex items-center justify-center rounded-md shrink-0" style={{ width: 64, height: 64, background: CATEGORY_META[c.category].tint }}>
                      <Icon size={24} color="#333" opacity={0.6} />
                    </span>
                    <div className="flex-1">
                      <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.3 }}>{name}</div>
                      {(c.size || colorLabel) && (
                        <div style={{ fontSize: 12, color: "#767676" }}>
                          {colorLabel} {c.size && `· ${t.size} ${c.size}`}
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border rounded-full" style={{ borderColor: "#DDD" }}>
                          <button onClick={() => updateQty(c.cartId, -1)} className="p-1.5"><Minus size={12} /></button>
                          <span style={{ width: 20, textAlign: "center", fontSize: 13, fontWeight: 600 }}>{c.qty}</span>
                          <button onClick={() => updateQty(c.cartId, 1)} className="p-1.5"><Plus size={12} /></button>
                        </div>
                        <span style={{ fontWeight: 700, fontSize: 13.5 }}>{money(c.price * c.qty, lang)}</span>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(c.cartId)} className="self-start p-1" style={{ color: "#999" }}>
                      <X size={15} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="px-5 py-4 border-t" style={{ borderColor: "#EDEDED" }}>
            <div className="flex justify-between items-center mb-3">
              <span style={{ fontSize: 14, fontWeight: 600 }}>{t.subtotal}</span>
              <span style={{ fontSize: 18, fontWeight: 800 }}>{money(subtotal, lang)}</span>
            </div>
            <button className="w-full rounded-full py-3.5 text-white font-semibold text-[15px]" style={{ background: "#CC0000" }}>
              {t.checkout}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* FOOTER                                                               */
/* ------------------------------------------------------------------ */

function Footer({ fontHeading }) {
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer style={{ background: "#F7F7F7" }} className="mt-4">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr_1fr] gap-10 pb-10 border-b" style={{ borderColor: "#E5E5E5" }}>
          <div>
            <div style={{ ...fontHeading, fontWeight: 800, fontSize: 19 }} className="mb-2">{t.joinDeals}</div>
            <p style={{ fontSize: 13, color: "#767676" }} className="mb-3">{t.joinDealsSub}</p>
            {subscribed ? (
              <div className="flex items-center gap-2" style={{ color: "#0A7D2C", fontSize: 13.5, fontWeight: 600 }}>
                <Check size={16} /> {t.subscribed}
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); if (email.trim()) setSubscribed(true); }} className="flex gap-2 max-w-[360px]">
                <div className="flex items-center bg-white rounded-full px-4 flex-1 border" style={{ borderColor: "#DDD", height: 42 }}>
                  <Mail size={15} color="#999" />
                  <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.emailPlaceholder} type="email" className="bg-transparent outline-none flex-1 px-2 text-sm" />
                </div>
                <button type="submit" className="rounded-full px-5 text-white font-semibold text-sm" style={{ background: "#CC0000" }}>{t.join}</button>
              </form>
            )}
            <div className="flex gap-3 mt-5">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <span key={i} className="flex items-center justify-center rounded-full" style={{ width: 34, height: 34, background: "#fff" }}>
                  <Icon size={16} color="#333" />
                </span>
              ))}
            </div>
          </div>

          <FooterCol title={t.getHelp} links={[t.trackOrder, t.returnsExch, t.shippingInfo, t.contactUs]} />
          <FooterCol title={t.aboutTitle} links={[t.ourStory, t.careers, t.press, t.sustainability]} />
          <FooterCol title={t.shopTitle} links={[t.clothing, t.appliances, t.furniture, t.giftCards]} />
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-6" style={{ fontSize: 12.5, color: "#767676" }}>
          <span>{t.rights}</span>
          <div className="flex gap-4"><span>{t.privacy}</span><span>{t.terms}</span><span>{t.accessibility}</span></div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <div style={{ fontWeight: 700, fontSize: 13.5 }} className="mb-3">{title}</div>
      <ul className="flex flex-col gap-2">
        {links.map((l) => <li key={l} style={{ fontSize: 13, color: "#767676" }}>{l}</li>)}
      </ul>
    </div>
  );
}
