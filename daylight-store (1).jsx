import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  ShoppingCart, ShoppingBag, Search, Menu, X, ChevronDown, ChevronRight,
  ChevronLeft, Star, Truck, Store, RotateCcw, Plus, Minus, Shirt, Sofa,
  Lamp, Coffee, Wind, Zap, Heart, Check, ArrowLeft, Package, Facebook,
  Instagram, Twitter, Youtube, Mail
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* DATA                                                                 */
/* ------------------------------------------------------------------ */

const CLOTHING = [
  {
    name: "Relaxed Fit Crewneck Sweatshirt",
    price: 24.99, was: 32.99,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Charcoal", hex: "#333333" },
      { name: "Rally Red", hex: "#CC0000" },
      { name: "Oat", hex: "#EDE1CF" },
      { name: "Navy", hex: "#1F2A44" },
    ],
    rating: 4.6, reviews: 812,
    icon: Shirt,
  },
  {
    name: "High-Rise Straight Leg Jeans",
    price: 34.99,
    sizes: ["24", "26", "28", "30", "32", "34"],
    colors: [
      { name: "Indigo", hex: "#2C3E63" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Light Wash", hex: "#A9BCC9" },
    ],
    rating: 4.4, reviews: 356,
    icon: Shirt,
  },
  {
    name: "Everyday Ribbed Knit Tee",
    price: 12.99, was: 15.99,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Sage", hex: "#8A9A7E" },
      { name: "Rally Red", hex: "#CC0000" },
    ],
    rating: 4.8, reviews: 1204,
    icon: Shirt,
  },
  {
    name: "Quilted Puffer Vest",
    price: 39.99,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Olive", hex: "#5B6B4D" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Rally Red", hex: "#CC0000" },
    ],
    rating: 4.5, reviews: 198,
    icon: Shirt,
  },
  {
    name: "Wide-Leg Trousers",
    price: 29.99,
    sizes: ["0", "4", "8", "12", "16", "20"],
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Tan", hex: "#C9A876" },
      { name: "Navy", hex: "#1F2A44" },
    ],
    rating: 4.3, reviews: 143,
    icon: Shirt,
  },
  {
    name: "Fleece-Lined Zip Hoodie",
    price: 27.99, was: 35.99,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Heather Gray", hex: "#A8A8A8" },
      { name: "Rally Red", hex: "#CC0000" },
      { name: "Forest", hex: "#33513B" },
    ],
    rating: 4.7, reviews: 567,
    icon: Shirt,
  },
];

const APPLIANCES = [
  {
    name: "12-Cup Programmable Coffee Maker",
    price: 34.99,
    feature: "12-Cup Capacity",
    specs: { "Wattage": "900W", "Capacity": "12 cups", "Programmable": "Yes, 24-hr", "Auto Shutoff": "2 hours", "Warranty": "1 year" },
    bullets: ["Brew-strength selector", "Reusable gold-tone filter", "Warming plate keeps coffee hot for 2 hours"],
    rating: 4.5, reviews: 940,
    icon: Coffee,
  },
  {
    name: "6-Slice Convection Toaster Oven",
    price: 59.99, was: 74.99,
    feature: "Fits a 12-in Pizza",
    specs: { "Wattage": "1500W", "Capacity": "6 slices / 12-in pizza", "Functions": "Bake, Broil, Toast, Convection", "Interior Light": "Yes", "Warranty": "1 year" },
    bullets: ["Even-heat convection fan", "Removable crumb tray", "Non-stick interior"],
    rating: 4.6, reviews: 512,
    icon: Zap,
  },
  {
    name: "Personal Blender with To-Go Cups",
    price: 24.99,
    feature: "700W Motor",
    specs: { "Wattage": "700W", "Cups Included": "2 (20 oz)", "Blades": "Stainless steel, 4-point", "Dishwasher Safe": "Yes (cups)", "Warranty": "1 year" },
    bullets: ["Flip-and-go lids for on-the-go", "One-touch pulse blending", "Compact footprint"],
    rating: 4.2, reviews: 301,
    icon: Zap,
  },
  {
    name: "Compact Digital Air Fryer, 4-Qt",
    price: 49.99,
    feature: "Digital Touchscreen",
    specs: { "Wattage": "1200W", "Capacity": "4 quarts", "Presets": "8 one-touch programs", "Basket": "Dishwasher-safe, non-stick", "Warranty": "1 year" },
    bullets: ["Little to no oil needed", "Auto shut-off + timer", "Cool-touch handle"],
    rating: 4.7, reviews: 1120,
    icon: Wind,
  },
  {
    name: "Stand Mixer, 5.5-Qt",
    price: 189.99, was: 219.99,
    feature: "10 Speed Settings",
    specs: { "Wattage": "500W", "Bowl Capacity": "5.5 quarts", "Speeds": "10", "Attachments": "Flat beater, whisk, dough hook", "Warranty": "2 years" },
    bullets: ["Tilt-head design for easy access", "Splash guard included", "Direct-drive gearing for heavy dough"],
    rating: 4.9, reviews: 743,
    icon: Zap,
  },
  {
    name: "Tower Fan with Remote, 40-in",
    price: 44.99,
    feature: "3 Speeds / Oscillating",
    specs: { "Height": "40 inches", "Speeds": "3", "Oscillation": "70-degree", "Timer": "Up to 7.5 hours", "Warranty": "1 year" },
    bullets: ["Whisper-quiet operation", "Removable washable filter", "Includes remote control"],
    rating: 4.4, reviews: 288,
    icon: Wind,
  },
];

const FURNITURE = [
  {
    name: "Mid-Century Accent Chair",
    price: 249.99,
    dims: "28\"W x 30\"D x 32\"H",
    materials: "Solid wood legs, performance woven fabric",
    specs: { "Dimensions": "28\"W x 30\"D x 32\"H", "Seat Height": "17.5\"", "Weight Capacity": "300 lbs", "Assembly": "Legs attach only", "Materials": "Solid wood, performance fabric" },
    rating: 4.6, reviews: 214,
    icon: Sofa,
  },
  {
    name: "3-Shelf Bookcase",
    price: 89.99, was: 109.99,
    dims: "24\"W x 12\"D x 48\"H",
    materials: "Engineered wood, walnut finish",
    specs: { "Dimensions": "24\"W x 12\"D x 48\"H", "Shelves": "3, fixed", "Weight Capacity": "35 lbs / shelf", "Assembly": "Required, tools included", "Materials": "Engineered wood" },
    rating: 4.3, reviews: 176,
    icon: Sofa,
  },
  {
    name: "Storage Ottoman Bench",
    price: 69.99,
    dims: "40\"W x 16\"D x 18\"H",
    materials: "Linen-blend upholstery, hinged lid",
    specs: { "Dimensions": "40\"W x 16\"D x 18\"H", "Storage": "Hinged lid, interior bin", "Weight Capacity": "250 lbs (seat)", "Assembly": "Legs attach only", "Materials": "Linen-blend, engineered wood frame" },
    rating: 4.5, reviews: 132,
    icon: Sofa,
  },
  {
    name: "Queen Platform Bed Frame",
    price: 299.99,
    dims: "63\"W x 84\"D x 14\"H",
    materials: "Solid pine frame, slatted base",
    specs: { "Dimensions": "63\"W x 84\"D x 14\"H", "Mattress Size": "Queen (box spring not needed)", "Weight Capacity": "700 lbs", "Assembly": "Required, ~45 min", "Materials": "Solid pine" },
    rating: 4.7, reviews: 389,
    icon: Sofa,
  },
  {
    name: "Round Pedestal Dining Table",
    price: 199.99,
    dims: "42\" Diameter x 30\"H",
    materials: "Engineered wood, oak finish",
    specs: { "Dimensions": "42\" Diameter x 30\"H", "Seats": "4", "Weight Capacity": "150 lbs", "Assembly": "Required, tools included", "Materials": "Engineered wood, oak veneer" },
    rating: 4.4, reviews: 97,
    icon: Sofa,
  },
  {
    name: "2-Drawer Nightstand",
    price: 59.99, was: 74.99,
    dims: "20\"W x 16\"D x 24\"H",
    materials: "Engineered wood, soft-close drawers",
    specs: { "Dimensions": "20\"W x 16\"D x 24\"H", "Drawers": "2, soft-close", "Weight Capacity": "20 lbs / drawer", "Assembly": "Required, tools included", "Materials": "Engineered wood" },
    rating: 4.5, reviews: 221,
    icon: Lamp,
  },
];

const CATEGORY_META = {
  clothing: { label: "Clothing", data: CLOTHING, tint: "linear-gradient(160deg, #FFF3F3 0%, #FFD9D9 100%)" },
  appliances: { label: "Home Appliances", data: APPLIANCES, tint: "linear-gradient(160deg, #F1F5F8 0%, #DCE6EC 100%)" },
  furniture: { label: "Furniture", data: FURNITURE, tint: "linear-gradient(160deg, #FBF4E9 0%, #F0E1C4 100%)" },
};

const ALL_PRODUCTS = Object.entries(CATEGORY_META).flatMap(([cat, meta]) =>
  meta.data.map((p, i) => ({ ...p, category: cat, id: `${cat}-${i}` }))
);

/* ------------------------------------------------------------------ */
/* SMALL HELPERS                                                        */
/* ------------------------------------------------------------------ */

function money(n) {
  return `$${n.toFixed(2)}`;
}

function StarRating({ rating, reviews, size = 14 }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            size={size}
            fill={n <= Math.round(rating) ? "#E8A400" : "none"}
            stroke="#E8A400"
            strokeWidth={1.5}
          />
        ))}
      </div>
      {reviews != null && (
        <span style={{ fontSize: 12, color: "#767676" }}>({reviews})</span>
      )}
    </div>
  );
}

function PriceBlock({ price, was, size = "base" }) {
  const big = size === "lg" ? 22 : 16;
  return (
    <div className="flex items-baseline gap-2 flex-wrap">
      <span style={{ fontWeight: 700, fontSize: big, color: was ? "#CC0000" : "#333333" }}>
        {money(price)}
      </span>
      {was && (
        <span style={{ fontSize: 13, color: "#767676", textDecoration: "line-through" }}>
          {money(was)}
        </span>
      )}
    </div>
  );
}

function CategoryThumb({ product, className = "" }) {
  const meta = CATEGORY_META[product.category];
  const Icon = product.icon;
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ background: meta.tint }}
    >
      {product.was && (
        <span
          className="absolute top-2 left-2 rounded-sm px-2 py-0.5 text-white"
          style={{ background: "#CC0000", fontSize: 11, fontWeight: 700, letterSpacing: 0.3 }}
        >
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

  const clothingRef = useRef(null);
  const appliancesRef = useRef(null);
  const furnitureRef = useRef(null);
  const sectionRefs = { clothing: clothingRef, appliances: appliancesRef, furniture: furnitureRef };

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  useEffect(() => {
    if (view === "home" && pendingScroll && sectionRefs[pendingScroll].current) {
      sectionRefs[pendingScroll].current.scrollIntoView({ behavior: "smooth", block: "start" });
      setPendingScroll(null);
    }
  }, [view, pendingScroll]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2400);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const fontHeading = { fontFamily: "'Poppins', sans-serif" };
  const fontBody = { fontFamily: "'Inter', sans-serif" };

  function goToCategory(cat) {
    setMobileNavOpen(false);
    setCatDropdown(false);
    if (view !== "home") {
      setView("home");
      setPendingScroll(cat);
    } else {
      setPendingScroll(cat);
    }
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
      if (existing) {
        return prev.map((c) => (c.cartId === cartId ? { ...c, qty: c.qty + qty } : c));
      }
      return [
        ...prev,
        {
          cartId,
          id: product.id,
          name: product.name,
          price: product.price,
          category: product.category,
          icon: product.icon,
          size: opts.size,
          color: opts.color,
          qty,
        },
      ];
    });
    setToast(`${product.name} added to cart`);
    setCartOpen(true);
  }

  function updateQty(cartId, delta) {
    setCart((prev) =>
      prev
        .map((c) => (c.cartId === cartId ? { ...c, qty: c.qty + delta } : c))
        .filter((c) => c.qty > 0)
    );
  }

  function removeFromCart(cartId) {
    setCart((prev) => prev.filter((c) => c.cartId !== cartId));
  }

  const subtotal = useMemo(() => cart.reduce((s, c) => s + c.price * c.qty, 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((s, c) => s + c.qty, 0), [cart]);
  const FREE_SHIP_THRESHOLD = 35;
  const shipProgress = Math.min(subtotal / FREE_SHIP_THRESHOLD, 1);
  const remaining = Math.max(0, FREE_SHIP_THRESHOLD - subtotal);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return ALL_PRODUCTS.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  const selectedProduct = ALL_PRODUCTS.find((p) => p.id === selectedId);

  return (
    <div style={{ ...fontBody, background: "#FFFFFF", color: "#333333", minHeight: "100vh" }} className="w-full">
      <Header
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        mobileNavOpen={mobileNavOpen}
        setMobileNavOpen={setMobileNavOpen}
        catDropdown={catDropdown}
        setCatDropdown={setCatDropdown}
        goToCategory={goToCategory}
        goHome={goHome}
        query={query}
        setQuery={setQuery}
        searchFocused={searchFocused}
        setSearchFocused={setSearchFocused}
        searchResults={searchResults}
        openProduct={openProduct}
        fontHeading={fontHeading}
      />

      {view === "home" && (
        <HomeView
          fontHeading={fontHeading}
          goToCategory={goToCategory}
          openProduct={openProduct}
          addToCart={addToCart}
          refs={sectionRefs}
        />
      )}

      {view === "detail" && selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onBack={goHome}
          addToCart={addToCart}
          fontHeading={fontHeading}
          onOpenProduct={openProduct}
        />
      )}

      <Footer fontHeading={fontHeading} />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        updateQty={updateQty}
        removeFromCart={removeFromCart}
        subtotal={subtotal}
        shipProgress={shipProgress}
        remaining={remaining}
        fontHeading={fontHeading}
      />

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
  return (
    <header className="sticky top-0 z-50 bg-white border-b" style={{ borderColor: "#EDEDED" }}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="flex items-center gap-3 md:gap-6 py-3">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 -ml-2"
            onClick={() => setMobileNavOpen((v) => !v)}
            aria-label="Open menu"
          >
            {mobileNavOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <button onClick={goHome} className="flex items-center gap-2 shrink-0">
            <span
              className="flex items-center justify-center rounded-lg"
              style={{ width: 34, height: 34, background: "#CC0000" }}
            >
              <Plus size={20} color="#fff" strokeWidth={3} />
            </span>
            <span style={{ ...fontHeading, fontWeight: 800, fontSize: 22, color: "#CC0000", letterSpacing: -0.5 }}>
              daylight
            </span>
          </button>

          {/* Search - desktop centered */}
          <div className="hidden md:block relative flex-1 max-w-[520px] mx-auto">
            <div
              className="flex items-center rounded-full px-4"
              style={{ background: "#F7F7F7", height: 42, border: searchFocused ? "1.5px solid #CC0000" : "1.5px solid transparent" }}
            >
              <Search size={17} color="#767676" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
                placeholder="Search everything at daylight"
                className="bg-transparent outline-none flex-1 px-2 text-sm"
                style={{ color: "#333333" }}
              />
            </div>
            {searchFocused && searchResults.length > 0 && (
              <div className="absolute top-[46px] left-0 right-0 bg-white rounded-lg shadow-lg border overflow-hidden z-50" style={{ borderColor: "#EDEDED" }}>
                {searchResults.map((p) => (
                  <button
                    key={p.id}
                    onMouseDown={() => openProduct(p.id)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-[#F7F7F7]"
                  >
                    <span className="flex items-center justify-center rounded" style={{ width: 32, height: 32, background: CATEGORY_META[p.category].tint }}>
                      <p.icon size={16} color="#333333" />
                    </span>
                    <span className="flex-1">
                      <div style={{ fontSize: 13.5, fontWeight: 500 }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: "#767676" }}>{CATEGORY_META[p.category].label}</div>
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>{money(p.price)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cart */}
          <button onClick={onCartClick} className="relative ml-auto md:ml-0 p-2" aria-label="Open cart">
            <ShoppingCart size={24} color="#333333" />
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 flex items-center justify-center rounded-full text-white"
                style={{ background: "#CC0000", fontSize: 11, fontWeight: 700, minWidth: 18, height: 18, padding: "0 4px" }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile search */}
        <div className="md:hidden pb-3 relative">
          <div className="flex items-center rounded-full px-4" style={{ background: "#F7F7F7", height: 40 }}>
            <Search size={16} color="#767676" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
              placeholder="Search everything at daylight"
              className="bg-transparent outline-none flex-1 px-2 text-sm"
            />
          </div>
          {searchFocused && searchResults.length > 0 && (
            <div className="absolute top-[46px] left-4 right-4 bg-white rounded-lg shadow-lg border overflow-hidden z-50" style={{ borderColor: "#EDEDED" }}>
              {searchResults.map((p) => (
                <button
                  key={p.id}
                  onMouseDown={() => openProduct(p.id)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-[#F7F7F7]"
                >
                  <span className="flex-1">
                    <div style={{ fontSize: 13.5, fontWeight: 500 }}>{p.name}</div>
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>{money(p.price)}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Category nav - desktop */}
        <nav className="hidden md:flex items-center gap-6 pb-3 relative">
          <div
            onMouseEnter={() => setCatDropdown(true)}
            onMouseLeave={() => setCatDropdown(false)}
            className="relative"
          >
            <button className="flex items-center gap-1 text-sm font-semibold py-1">
              Shop Categories <ChevronDown size={15} />
            </button>
            {catDropdown && (
              <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg border py-2 min-w-[200px] z-50" style={{ borderColor: "#EDEDED" }}>
                {Object.entries(CATEGORY_META).map(([key, meta]) => (
                  <button
                    key={key}
                    onClick={() => goToCategory(key)}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-[#F7F7F7] flex items-center justify-between"
                  >
                    {meta.label} <ChevronRight size={14} color="#999" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => goToCategory("clothing")} className="text-sm font-medium hover:text-[#CC0000]">Clothing</button>
          <button onClick={() => goToCategory("appliances")} className="text-sm font-medium hover:text-[#CC0000]">Home Appliances</button>
          <button onClick={() => goToCategory("furniture")} className="text-sm font-medium hover:text-[#CC0000]">Furniture</button>
        </nav>
      </div>

      {/* Mobile nav drawer */}
      {mobileNavOpen && (
        <div className="md:hidden border-t px-4 py-3" style={{ borderColor: "#EDEDED" }}>
          {Object.entries(CATEGORY_META).map(([key, meta]) => (
            <button
              key={key}
              onClick={() => goToCategory(key)}
              className="w-full text-left py-2.5 text-sm font-medium border-b flex items-center justify-between"
              style={{ borderColor: "#F2F2F2" }}
            >
              {meta.label} <ChevronRight size={15} color="#999" />
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
  return (
    <main>
      <Hero fontHeading={fontHeading} goToCategory={goToCategory} />
      <TrustRow />
      <CategorySection
        sectionRef={refs.clothing}
        title="Clothing"
        subtitle="Everyday fits, easy pricing"
        categoryKey="clothing"
        fontHeading={fontHeading}
        openProduct={openProduct}
        addToCart={addToCart}
      />
      <CategorySection
        sectionRef={refs.appliances}
        title="Home Appliances"
        subtitle="Small kitchen upgrades, big results"
        categoryKey="appliances"
        fontHeading={fontHeading}
        openProduct={openProduct}
        addToCart={addToCart}
      />
      <CategorySection
        sectionRef={refs.furniture}
        title="Furniture"
        subtitle="Pieces that make a room feel done"
        categoryKey="furniture"
        fontHeading={fontHeading}
        openProduct={openProduct}
        addToCart={addToCart}
        last
      />
    </main>
  );
}

function Hero({ fontHeading, goToCategory }) {
  const blocks = [
    { key: "clothing", label: "Clothing", headline: "New season,\neasy fits", icon: Shirt, tint: CATEGORY_META.clothing.tint },
    { key: "appliances", label: "Home Appliances", headline: "Small appliances,\nbig upgrades", icon: Coffee, tint: CATEGORY_META.appliances.tint },
    { key: "furniture", label: "Furniture", headline: "Furnish it\nyour way", icon: Sofa, tint: CATEGORY_META.furniture.tint },
  ];
  return (
    <section className="grid grid-cols-1 md:grid-cols-3">
      {blocks.map((b) => (
        <div
          key={b.key}
          className="relative flex flex-col justify-between p-8 md:p-10 min-h-[280px] md:min-h-[360px]"
          style={{ background: b.tint }}
        >
          <b.icon size={40} strokeWidth={1.25} color="#333333" opacity={0.5} />
          <div>
            <h2
              style={{ ...fontHeading, fontWeight: 800, fontSize: 30, lineHeight: 1.08, color: "#333333", whiteSpace: "pre-line" }}
              className="mb-5"
            >
              {b.headline}
            </h2>
            <button
              onClick={() => goToCategory(b.key)}
              className="inline-flex items-center gap-1.5 text-white font-semibold rounded-full px-5 py-2.5 text-sm"
              style={{ background: "#CC0000" }}
            >
              Shop Now <ChevronRight size={15} />
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}

function TrustRow() {
  const items = [
    { icon: Truck, title: "Free Shipping", sub: "On orders over $35" },
    { icon: Store, title: "Free Store Pickup", sub: "Ready in as little as 2 hours" },
    { icon: RotateCcw, title: "Easy 30-Day Returns", sub: "No questions asked" },
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

function CategorySection({ sectionRef, title, subtitle, categoryKey, fontHeading, openProduct, addToCart, last }) {
  const products = CATEGORY_META[categoryKey].data.map((p, i) => ({ ...p, category: categoryKey, id: `${categoryKey}-${i}` }));
  return (
    <section ref={sectionRef} className={`max-w-[1280px] mx-auto px-4 md:px-6 py-10 ${last ? "" : "border-b"}`} style={{ borderColor: "#EDEDED" }}>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 style={{ ...fontHeading, fontWeight: 800, fontSize: 24, color: "#333333" }}>{title}</h2>
          <p style={{ fontSize: 13.5, color: "#767676", marginTop: 2 }}>{subtitle}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} openProduct={openProduct} addToCart={addToCart} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product, openProduct, addToCart }) {
  const isClothing = product.category === "clothing";
  const isAppliance = product.category === "appliances";
  const isFurniture = product.category === "furniture";
  return (
    <div
      className="flex flex-col rounded-lg overflow-hidden"
      style={{ background: "#F7F7F7" }}
    >
      <button onClick={() => openProduct(product.id)} className="text-left">
        <CategoryThumb product={product} className="w-full h-40 md:h-44" />
      </button>
      <div className="p-3.5 flex flex-col gap-1.5 flex-1">
        <button onClick={() => openProduct(product.id)} className="text-left">
          <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.3 }}>{product.name}</div>
        </button>

        {isClothing && (
          <div className="flex items-center gap-1 mt-0.5">
            {product.colors.slice(0, 4).map((c) => (
              <span
                key={c.name}
                className="rounded-full border"
                style={{ width: 14, height: 14, background: c.hex, borderColor: c.hex === "#FFFFFF" ? "#DDD" : c.hex }}
                title={c.name}
              />
            ))}
            <span style={{ fontSize: 11, color: "#767676", marginLeft: 2 }}>{product.sizes[0]}–{product.sizes[product.sizes.length - 1]}</span>
          </div>
        )}
        {isAppliance && (
          <div style={{ fontSize: 12, color: "#767676" }}>{product.feature}</div>
        )}
        {isFurniture && (
          <div style={{ fontSize: 12, color: "#767676" }}>{product.dims}</div>
        )}

        <StarRating rating={product.rating} reviews={product.reviews} size={12} />
        <PriceBlock price={product.price} was={product.was} />

        {isClothing ? (
          <button
            onClick={() => openProduct(product.id)}
            className="mt-1 text-sm font-semibold rounded-full py-2 border"
            style={{ borderColor: "#CC0000", color: "#CC0000" }}
          >
            Select Options
          </button>
        ) : (
          <button
            onClick={() => addToCart(product)}
            className="mt-1 text-sm font-semibold rounded-full py-2 text-white"
            style={{ background: "#CC0000" }}
          >
            Add to Cart
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
  const isClothing = product.category === "clothing";
  const isAppliance = product.category === "appliances";
  const isFurniture = product.category === "furniture";

  const [size, setSize] = useState(isClothing ? product.sizes[2] || product.sizes[0] : null);
  const [color, setColor] = useState(isClothing ? product.colors[0] : null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const related = ALL_PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  function handleAdd() {
    addToCart(product, isClothing ? { size, color: color.name } : {}, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <main className="max-w-[1280px] mx-auto px-4 md:px-6 py-8">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm font-medium mb-6" style={{ color: "#767676" }}>
        <ArrowLeft size={16} /> Back to shopping
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <CategoryThumb product={product} className="w-full h-80 md:h-[420px] rounded-lg" />

        <div>
          <div style={{ fontSize: 12.5, color: "#767676", fontWeight: 600 }} className="mb-1">
            {CATEGORY_META[product.category].label}
          </div>
          <h1 style={{ ...fontHeading, fontWeight: 800, fontSize: 26, lineHeight: 1.2 }} className="mb-2">
            {product.name}
          </h1>
          <div className="mb-3">
            <StarRating rating={product.rating} reviews={product.reviews} size={15} />
          </div>
          <div className="mb-5">
            <PriceBlock price={product.price} was={product.was} size="lg" />
            {product.was && (
              <span style={{ fontSize: 12.5, color: "#0A7D2C", fontWeight: 600 }}>
                You save {money(product.was - product.price)}
              </span>
            )}
          </div>

          {isClothing && (
            <>
              <div className="mb-5">
                <div style={{ fontSize: 13, fontWeight: 700 }} className="mb-2">
                  Color — <span style={{ fontWeight: 500, color: "#767676" }}>{color.name}</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setColor(c)}
                      className="rounded-full flex items-center justify-center border-2"
                      style={{
                        width: 34, height: 34,
                        background: c.hex,
                        borderColor: color.name === c.name ? "#CC0000" : (c.hex === "#FFFFFF" ? "#DDD" : "transparent"),
                      }}
                      title={c.name}
                    >
                      {color.name === c.name && (
                        <Check size={14} color={c.hex === "#FFFFFF" || c.hex === "#EDE1CF" ? "#333" : "#fff"} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <div style={{ fontSize: 13, fontWeight: 700 }} className="mb-2">Size — <span style={{ fontWeight: 500, color: "#767676" }}>{size}</span></div>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className="rounded-md text-sm font-medium"
                      style={{
                        minWidth: 42, height: 38, padding: "0 10px",
                        border: size === s ? "1.5px solid #CC0000" : "1.5px solid #DDD",
                        color: size === s ? "#CC0000" : "#333333",
                        background: size === s ? "#FFF5F5" : "#fff",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {isAppliance && (
            <div className="mb-6">
              <div style={{ fontSize: 13.5, fontWeight: 700, color: "#CC0000" }} className="mb-3">{product.feature}</div>
              <ul className="mb-4 space-y-1.5">
                {product.bullets.map((b) => (
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
              <div style={{ fontSize: 13.5 }} className="mb-3">{product.materials}</div>
              <SpecsTable specs={product.specs} />
            </div>
          )}

          <div className="flex items-center gap-4 mb-4">
            <div style={{ fontSize: 13, fontWeight: 700 }}>Qty</div>
            <div className="flex items-center border rounded-full" style={{ borderColor: "#DDD" }}>
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2.5"><Minus size={14} /></button>
              <span style={{ width: 24, textAlign: "center", fontSize: 14, fontWeight: 600 }}>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="p-2.5"><Plus size={14} /></button>
            </div>
          </div>

          <button
            onClick={handleAdd}
            className="w-full md:w-auto md:min-w-[260px] rounded-full py-3.5 px-8 text-white font-semibold text-[15px] flex items-center justify-center gap-2"
            style={{ background: added ? "#0A7D2C" : "#CC0000" }}
          >
            {added ? <><Check size={17} /> Added to Cart</> : <><ShoppingBag size={17} /> Add to Cart — {money(product.price * qty)}</>}
          </button>

          <div className="flex items-center gap-6 mt-5">
            <div className="flex items-center gap-1.5" style={{ fontSize: 12.5, color: "#767676" }}><Truck size={15} /> Free shipping over $35</div>
            <div className="flex items-center gap-1.5" style={{ fontSize: 12.5, color: "#767676" }}><RotateCcw size={15} /> 30-day returns</div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h3 style={{ ...fontHeading, fontWeight: 800, fontSize: 20 }} className="mb-5">
            More {CATEGORY_META[product.category].label}
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} openProduct={onOpenProduct} addToCart={addToCart} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

function SpecsTable({ specs }) {
  return (
    <div className="rounded-lg overflow-hidden border" style={{ borderColor: "#EDEDED" }}>
      {Object.entries(specs).map(([k, v], i) => (
        <div
          key={k}
          className="flex justify-between px-4 py-2.5"
          style={{ background: i % 2 === 0 ? "#F7F7F7" : "#fff", fontSize: 13 }}
        >
          <span style={{ color: "#767676" }}>{k}</span>
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
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />
      <aside
        className="fixed top-0 right-0 h-full bg-white z-[65] flex flex-col shadow-2xl transition-transform duration-300"
        style={{ width: "min(420px, 100vw)", transform: open ? "translateX(0)" : "translateX(100%)" }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "#EDEDED" }}>
          <h2 style={{ ...fontHeading, fontWeight: 800, fontSize: 18 }}>Your Cart ({cart.reduce((s, c) => s + c.qty, 0)})</h2>
          <button onClick={onClose} className="p-1"><X size={20} /></button>
        </div>

        {/* Shipping progress */}
        <div className="px-5 py-4 border-b" style={{ borderColor: "#EDEDED", background: "#F7F7F7" }}>
          {remaining > 0 ? (
            <div style={{ fontSize: 13 }} className="mb-2">
              Add <span style={{ fontWeight: 700, color: "#CC0000" }}>{money(remaining)}</span> more for <span style={{ fontWeight: 700 }}>free shipping</span>
            </div>
          ) : (
            <div style={{ fontSize: 13, fontWeight: 700, color: "#0A7D2C" }} className="mb-2 flex items-center gap-1.5">
              <Check size={15} /> You've unlocked free shipping!
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
              <div style={{ color: "#767676", fontSize: 14 }}>Your cart is empty</div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.cartId} className="flex gap-3">
                    <span
                      className="flex items-center justify-center rounded-md shrink-0"
                      style={{ width: 64, height: 64, background: CATEGORY_META[c.category].tint }}
                    >
                      <Icon size={24} color="#333" opacity={0.6} />
                    </span>
                    <div className="flex-1">
                      <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.3 }}>{c.name}</div>
                      {(c.size || c.color) && (
                        <div style={{ fontSize: 12, color: "#767676" }}>
                          {c.color && c.color} {c.size && `· Size ${c.size}`}
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border rounded-full" style={{ borderColor: "#DDD" }}>
                          <button onClick={() => updateQty(c.cartId, -1)} className="p-1.5"><Minus size={12} /></button>
                          <span style={{ width: 20, textAlign: "center", fontSize: 13, fontWeight: 600 }}>{c.qty}</span>
                          <button onClick={() => updateQty(c.cartId, 1)} className="p-1.5"><Plus size={12} /></button>
                        </div>
                        <span style={{ fontWeight: 700, fontSize: 13.5 }}>{money(c.price * c.qty)}</span>
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
              <span style={{ fontSize: 14, fontWeight: 600 }}>Subtotal</span>
              <span style={{ fontSize: 18, fontWeight: 800 }}>{money(subtotal)}</span>
            </div>
            <button
              className="w-full rounded-full py-3.5 text-white font-semibold text-[15px]"
              style={{ background: "#CC0000" }}
            >
              Checkout
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
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer style={{ background: "#F7F7F7" }} className="mt-4">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr_1fr] gap-10 pb-10 border-b" style={{ borderColor: "#E5E5E5" }}>
          <div>
            <div style={{ ...fontHeading, fontWeight: 800, fontSize: 19 }} className="mb-2">
              Join for deals & 10% off
            </div>
            <p style={{ fontSize: 13, color: "#767676" }} className="mb-3">
              Sign up for emails and get 10% off your next order, plus first access to sales.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2" style={{ color: "#0A7D2C", fontSize: 13.5, fontWeight: 600 }}>
                <Check size={16} /> You're subscribed!
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); if (email.trim()) setSubscribed(true); }}
                className="flex gap-2 max-w-[360px]"
              >
                <div className="flex items-center bg-white rounded-full px-4 flex-1 border" style={{ borderColor: "#DDD", height: 42 }}>
                  <Mail size={15} color="#999" />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    type="email"
                    className="bg-transparent outline-none flex-1 px-2 text-sm"
                  />
                </div>
                <button type="submit" className="rounded-full px-5 text-white font-semibold text-sm" style={{ background: "#CC0000" }}>
                  Join
                </button>
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

          <FooterCol title="Get Help" links={["Track Order", "Returns & Exchanges", "Shipping Info", "Contact Us"]} />
          <FooterCol title="About Daylight" links={["Our Story", "Careers", "Press", "Sustainability"]} />
          <FooterCol title="Shop" links={["Clothing", "Home Appliances", "Furniture", "Gift Cards"]} />
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-6" style={{ fontSize: 12.5, color: "#767676" }}>
          <span>© 2026 Daylight General Merchandise Co.</span>
          <div className="flex gap-4">
            <span>Privacy</span><span>Terms</span><span>Accessibility</span>
          </div>
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
        {links.map((l) => (
          <li key={l} style={{ fontSize: 13, color: "#767676" }}>{l}</li>
        ))}
      </ul>
    </div>
  );
}
