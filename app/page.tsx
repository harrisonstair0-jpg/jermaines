/* eslint-disable @next/next/no-img-element */
"use client";

import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";

type MenuCategory = "all" | "sweet" | "savory" | "shakes" | "jamaican" | "coffee";
type ItemCategory = Exclude<MenuCategory, "all">;

type MenuItem = {
  name: string;
  description: string;
  price?: string;
  category: ItemCategory;
  image: string;
  tag?: string;
};

const imageParams = "auto=format&fit=crop&w=1200&q=84";
const photo = (id: string) => `https://images.unsplash.com/${id}?${imageParams}`;
const jamaicanPattyPhoto = "https://upload.wikimedia.org/wikipedia/commons/6/6c/05_Jamaican_Beef_Patty_-_Sybil%27s_Bakery_%284349822967%29.jpg?width=1200";
const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Jermaine%27s%2C+728+N+Main+St%2C+Gunnison%2C+CO+81230";
const ease = [0.22, 1, 0.36, 1] as const;

const menuItems: MenuItem[] = [
  { name: "Caprese Melt", description: "A bright, melty favorite for lunch or an easy afternoon bite.", price: "$11.50", category: "savory", image: photo("photo-1509722747041-616f39b57569"), tag: "Crowd favorite" },
  { name: "Jamaican Beef Patty", description: "Golden, flaky pastry with a warm, savory center.", price: "$6.50", category: "jamaican", image: jamaicanPattyPhoto, tag: "Jamaican favorite" },
  { name: "Caramel Macchiato Shake", description: "Coffeehouse comfort, blended into a cool, creamy treat.", price: "$5.50", category: "shakes", image: photo("photo-1553787499-6f9133860278"), tag: "Sweet sips" },
  { name: "Snowcap Milkshake", description: "A classic thick shake made for big smiles and slow sips.", price: "$5.50", category: "shakes", image: photo("photo-1572490122747-3968b75cc699"), tag: "House classic" },
  { name: "Cheese Melt", description: "Toasty, melty, and just right when the day calls for comfort.", price: "$8.50", category: "savory", image: photo("photo-1528736235302-52922df5c122"), tag: "Easy favorite" },
  { name: "Traditional Gyro Sandwich", description: "One of the savory staples people come back for.", category: "savory", image: photo("photo-1676300187347-6f60002fd83e") },
  { name: "Chicken Panini", description: "A generous, toasted sandwich for a satisfying lunch stop.", category: "savory", image: photo("photo-1649305785246-a1d65e8bc078") },
  { name: "Frozen Yogurt", description: "Build your own cup with flavors and toppings to match your mood.", category: "sweet", image: photo("photo-1550594645-25c5bd703258"), tag: "Make it yours" },
  { name: "Ice Cream", description: "A cheerful scoop, a colorful cone, or however you like it.", category: "sweet", image: photo("photo-1501443762994-82bd5dace89a"), tag: "Cool treat" },
  { name: "Jamaican Coffee", description: "A warm cup to start your morning or reset your afternoon.", category: "coffee", image: photo("photo-1495474472287-4d71bcdd2085") },
];

const categories: Array<{ label: string; filter: ItemCategory; description: string; image: string; accent: string }> = [
  { label: "Ice Cream & Fro-Yo", filter: "sweet", description: "Cool, creamy, and completely your call with toppings.", image: photo("photo-1501443762994-82bd5dace89a"), accent: "mango" },
  { label: "Sandwiches & Paninis", filter: "savory", description: "Toasty, generous, and ready when the trail day turns hungry.", image: photo("photo-1509722747041-616f39b57569"), accent: "turquoise" },
  { label: "Shakes & Smoothies", filter: "shakes", description: "Thick shakes, bright smoothies, and little vacation energy.", image: photo("photo-1553787499-6f9133860278"), accent: "coral" },
  { label: "Jamaican Favorites", filter: "jamaican", description: "A Caribbean wink in the middle of Colorado’s mountain air.", image: jamaicanPattyPhoto, accent: "green" },
  { label: "Coffee & Baked Treats", filter: "coffee", description: "Warm cups and bakery-case treasures for a slower moment.", image: photo("photo-1495474472287-4d71bcdd2085"), accent: "sunshine" },
];

const filterLabels: Array<{ label: string; value: MenuCategory }> = [
  { label: "Everything", value: "all" },
  { label: "Sweet treats", value: "sweet" },
  { label: "Savory favorites", value: "savory" },
  { label: "Shakes & smoothies", value: "shakes" },
  { label: "Jamaican favorites", value: "jamaican" },
  { label: "Coffee & baked", value: "coffee" },
];

const reviews = [
  { quote: "Awesome little place, good food, and awesome customer service!", name: "E Hale", color: "cream" },
  { quote: "There’s a great selection of sweet and savory items, and gluten-free stuff too!", name: "Nathaniel G", color: "lavender" },
  { quote: "Sandwiches and smoothies are generous in size and absolutely delicious.", name: "A happy guest", color: "turquoise" },
];

const galleryPhotos = [
  { src: photo("photo-1551024506-0bccd828d307"), alt: "Colorful baked treats", label: "pastries" },
  { src: photo("photo-1495474472287-4d71bcdd2085"), alt: "Fresh coffee on a café table", label: "coffee" },
  { src: photo("photo-1528735602780-2552fd46c7af"), alt: "Sandwich ready for lunch", label: "sandwiches" },
  { src: photo("photo-1572490122747-3968b75cc699"), alt: "Milkshake with whipped cream", label: "shakes" },
];

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: "Jermaine’s",
  description: "A colorful Gunnison café serving ice cream, frozen yogurt, sandwiches, shakes, Jamaican coffee, and baked treats.",
  telephone: "+1-970-641-9876",
  priceRange: "$10–20",
  address: { "@type": "PostalAddress", streetAddress: "728 N Main St", addressLocality: "Gunnison", addressRegion: "CO", postalCode: "81230", addressCountry: "US" },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "08:00", closes: "21:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "12:00", closes: "21:30" },
  ],
  servesCuisine: ["Cafe", "Desserts", "Jamaican"],
};

const reveal = {
  initial: false,
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.7, ease },
};

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [activeMenu, setActiveMenu] = useState<MenuCategory>("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeReview, setActiveReview] = useState(0);
  const [reviewPaused, setReviewPaused] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const headerPadding = useTransform(scrollY, [0, 90], ["1.35rem", "0.72rem"]);
  const headerBackground = useTransform(scrollY, [0, 90], ["rgba(255,249,238,1)", "rgba(255,249,238,.88)"]);
  const heroParallax = useTransform(scrollYProgress, [0, 0.22], [0, -60]);
  const heroScale = useTransform(scrollYProgress, [0, 0.22], [1, 1.07]);
  const visibleItems = activeMenu === "all" ? menuItems : menuItems.filter((item) => item.category === activeMenu);

  useEffect(() => {
    if (prefersReducedMotion || reviewPaused) return;
    const timer = window.setInterval(() => setActiveReview((current) => (current + 1) % reviews.length), 5200);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, reviewPaused]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowRight") setLightboxIndex((current) => current === null ? 0 : (current + 1) % galleryPhotos.length);
      if (event.key === "ArrowLeft") setLightboxIndex((current) => current === null ? galleryPhotos.length - 1 : (current - 1 + galleryPhotos.length) % galleryPhotos.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  const showMenu = (filter: MenuCategory = "all") => {
    setActiveMenu(filter);
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const changeReview = (direction: number) => {
    setReviewPaused(true);
    setActiveReview((current) => (current + direction + reviews.length) % reviews.length);
  };

  return (
    <MotionConfig reducedMotion="user">
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }} />
        <div className="announcement"><span className="announcement-spark" aria-hidden="true">✦</span> Sweet treats + savory favorites in the heart of Gunnison <span className="announcement-dot" aria-hidden="true" /> Open today — come hang out</div>

        <motion.header className="site-header" style={{ paddingTop: headerPadding, paddingBottom: headerPadding, backgroundColor: headerBackground }}>
          <a className="brand" href="#top" aria-label="Jermaine’s home"><span className="brand-mark" aria-hidden="true">J</span><span className="brand-copy"><strong>Jermaine’s</strong><small>eat · drink · love</small></span></a>
          <button className="mobile-nav-toggle" type="button" aria-expanded={mobileMenuOpen} aria-controls="site-navigation" onClick={() => setMobileMenuOpen((open) => !open)}><span>{mobileMenuOpen ? "Close" : "Menu"}</span><i aria-hidden="true" /></button>
          <nav id="site-navigation" className={`site-nav ${mobileMenuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
            <a href="#menu" onClick={() => setMobileMenuOpen(false)}>Menu</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#gallery" onClick={() => setMobileMenuOpen(false)}>Gallery</a>
            <a href="#visit" onClick={() => setMobileMenuOpen(false)}>Visit us</a>
            <a className="nav-call" href="tel:+19706419876">Call <span>(970) 641-9876</span></a>
          </nav>
        </motion.header>

        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <motion.p className="eyebrow" initial={false} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.55, ease }}><span /> Gunnison, Colorado <span /></motion.p>
            <h1 id="hero-title" aria-label="Eat. Drink. Love.">
              {[
                ["Eat.", "hero-word-mango"],
                ["Drink.", "hero-word-coral"],
                ["Love.", "hero-word-sunshine"],
                ].map(([word, className], index) => <span key={word}><motion.span className={`hero-word ${className}`} initial={false} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + index * 0.13, duration: 0.7, ease }}>{word}</motion.span>{index < 2 && <br />}</span>)}
            </h1>
            <motion.p className="hero-lede" initial={false} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72, duration: 0.6, ease }}>Sweet treats, savory favorites, and Caribbean flavor in the heart of Gunnison.</motion.p>
            <motion.div className="hero-actions" initial={false} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.86, duration: 0.6, ease }}><a className="button button-primary" href="#menu">View the menu <Arrow /></a><a className="button button-ghost" href={directionsUrl} target="_blank" rel="noreferrer">Get directions <Arrow /></a></motion.div>
            <motion.a className="hero-phone" href="tel:+19706419876" initial={false} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.6 }}><span className="phone-icon" aria-hidden="true">☎</span> Call Jermaine’s <strong>(970) 641-9876</strong></motion.a>
          </div>
          <div className="hero-visual" aria-label="Photo placeholder collage">
            <motion.div className="hero-orbit orbit-one" animate={{ rotate: [-15, -8, -15] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div className="hero-orbit orbit-two" animate={{ rotate: [25, 34, 25] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div className="float-shape shape-coral" aria-hidden="true" animate={{ y: [0, -16, 0], rotate: [0, 7, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div className="float-shape shape-turquoise" aria-hidden="true" animate={{ y: [0, 13, 0], rotate: [0, -6, 0] }} transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }} />
            <motion.div className="hero-image hero-image-main photo-placeholder" style={{ y: heroParallax, scale: heroScale, rotate: 5 }}><img src={photo("photo-1501443762994-82bd5dace89a")} alt="Colorful ice cream scoops in a cup" fetchPriority="high" /><span>Photo placeholder</span></motion.div>
            <div className="hero-image hero-image-small photo-placeholder"><img src={photo("photo-1553530666-ba11a7da3888")} alt="Fresh smoothie in a glass" /><span>Photo placeholder</span></div>
            <div className="hero-sticker sticker-sun" aria-hidden="true"><span>made with</span><strong>good<br />vibes</strong></div>
            <div className="hero-sticker sticker-rating"><strong>4.5</strong><span>★ ★ ★ ★ ★</span><small>281+ Google reviews</small></div>
            <div className="hero-doodle doodle-star" aria-hidden="true">✦</div><div className="hero-doodle doodle-wave" aria-hidden="true">〰</div>
          </div>
        </section>

        <motion.section className="quick-strip" aria-label="Jermaine’s highlights" {...reveal}><div><span className="strip-icon" aria-hidden="true">✿</span><p><strong>Big flavor</strong><br />for every kind of day</p></div><div><span className="strip-icon" aria-hidden="true">☻</span><p><strong>Family friendly</strong><br />easy stops, happy people</p></div><div><span className="strip-icon" aria-hidden="true">✺</span><p><strong>Gluten-free options</strong><br />ask our friendly staff</p></div><div className="strip-hours"><span className="open-pulse" aria-hidden="true" /><p><strong>Open today</strong><br />Mon–Sat 8am · Sun 12pm</p></div></motion.section>

        <motion.section className="section categories-section" aria-labelledby="categories-title" {...reveal}>
          <div className="sweet-confetti" aria-hidden="true"><i>•</i><i>✦</i><i>•</i><i>✧</i><span>〰</span></div>
          <div className="section-heading section-heading-row"><div><p className="eyebrow eyebrow-dark"><span /> A little something for everyone</p><h2 id="categories-title">Pick your<br /><em>happy place.</em></h2></div><p className="section-intro">Stop in for something cold, something savory, or just a good excuse to slow down for a minute.</p></div>
          <div className="category-grid">
            {categories.map((category, index) => <motion.article className={`category-card category-${category.accent}`} key={category.label} initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ delay: index * 0.08, duration: 0.62, ease }} whileHover={{ y: -7, rotate: index % 2 ? 0.7 : -0.7 }}><div className="category-image photo-placeholder"><img src={category.image} alt="" loading="lazy" /><span>Photo placeholder</span>{category.filter === "jamaican" && <div className="category-steam" aria-hidden="true"><i /><i /></div>}</div><div className="category-content"><span className="category-number">0{index + 1}</span><h3>{category.label}</h3><p>{category.description}</p><span className="category-hover-note">tap for favorites</span><button type="button" onClick={() => showMenu(category.filter)}>See favorites <Arrow /></button></div></motion.article>)}
          </div>
        </motion.section>

        <motion.section className="section menu-section" id="menu" aria-labelledby="menu-title" {...reveal}>
          <div className="menu-header"><div><p className="eyebrow"><span /> What’s good today</p><h2 id="menu-title">The <em>good stuff.</em></h2></div><p>A few crowd favorites to get you started. Ask the team about today’s flavors, toppings, and bakery treats.</p></div>
          <div className="menu-filters" role="tablist" aria-label="Filter menu items">{filterLabels.map((filter) => <button key={filter.value} className={activeMenu === filter.value ? "active" : ""} type="button" role="tab" aria-selected={activeMenu === filter.value} onClick={() => setActiveMenu(filter.value)}>{filter.label}</button>)}</div>
          <motion.div className="menu-grid" layout>
            <AnimatePresence initial={false} mode="popLayout">
              {visibleItems.map((item, index) => <motion.article className="menu-card" key={item.name} layout initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -18, scale: 0.94 }} transition={{ delay: index * 0.045, duration: 0.42, ease }} whileHover={{ y: -7, rotate: index % 2 ? 0.4 : -0.4 }}><div className="menu-card-image photo-placeholder"><img src={item.image} alt={item.name} loading="lazy" /><span>Photo placeholder</span>{item.tag && <span className="menu-tag">{item.tag}</span>}</div><div className="menu-card-copy"><div className="menu-card-title"><h3>{item.name}</h3>{item.price ? <strong>{item.price}</strong> : <span className="ask-price">Ask us</span>}</div><p>{item.description}</p></div></motion.article>)}
            </AnimatePresence>
          </motion.div>
          <p className="menu-note">Prices shown where provided. Menu flavors and availability can change — call ahead if you’re looking for something specific.</p>
        </motion.section>

        <motion.section className="about-section" id="about" aria-labelledby="about-title" {...reveal}>
          <div className="about-photo photo-placeholder"><img src={photo("photo-1521017432531-fbd92d768814")} alt="Colorful café table with food and drinks" loading="lazy" /><span>Photo placeholder</span><div className="about-stamp" aria-hidden="true"><span>gunnison’s</span><strong>happy<br />little<br />corner</strong></div></div>
          <div className="about-copy"><p className="eyebrow eyebrow-dark"><span /> More than a pit stop</p><h2 id="about-title">Good food.<br /><em>Good people.</em><br />Good energy.</h2><p>Jermaine’s is a locally loved Gunnison café with a colorful, Caribbean-inspired personality and something for every appetite. Come by for a frozen yogurt piled with toppings, a generous sandwich, a Jamaican beef patty, or a coffee and pastry that makes the morning feel easy.</p><p>It’s casual, welcoming, and made for the whole crew — families, tourists, teenagers, and regulars who know exactly what they want.</p><div className="about-signoff"><span>Eat · Drink · Love</span><i aria-hidden="true">✦</i></div></div>
        </motion.section>

        <motion.section className="review-section" aria-labelledby="reviews-title" {...reveal}>
          <div className="review-topline"><div className="review-score"><strong>4.5</strong><motion.span className="review-stars" aria-label="4.5 out of 5 stars" initial={{ clipPath: "inset(0 100% 0 0)" }} whileInView={{ clipPath: "inset(0 0% 0 0)" }} viewport={{ once: true }} transition={{ duration: 1.3, delay: 0.25, ease }}>★ ★ ★ ★ ★</motion.span></div><div><p className="eyebrow eyebrow-dark"><span /> People are saying</p><h2 id="reviews-title">The kind of place<br /><em>people tell friends about.</em></h2></div><p className="review-count">281+<small>Google reviews</small></p></div>
          <div className="review-carousel" onMouseEnter={() => setReviewPaused(true)} onMouseLeave={() => setReviewPaused(false)} onFocusCapture={() => setReviewPaused(true)}>
            <div className="review-viewport"><motion.div className="review-track" animate={{ x: `${-activeReview * 100}%` }} transition={{ duration: 0.7, ease }}>{reviews.map((review) => <blockquote className={`review-slide review-${review.color}`} key={review.name}><span className="quote-mark">“</span><p>{review.quote}</p><cite>— {review.name}</cite></blockquote>)}</motion.div></div>
            <div className="review-controls"><button type="button" onClick={() => changeReview(-1)} aria-label="Previous review">←</button><div className="review-dots">{reviews.map((review, index) => <button type="button" key={review.name} className={index === activeReview ? "active" : ""} onClick={() => { setReviewPaused(true); setActiveReview(index); }} aria-label={`Show review ${index + 1}`} aria-pressed={index === activeReview} />)}</div><button type="button" onClick={() => changeReview(1)} aria-label="Next review">→</button></div>
          </div>
          <p className="review-disclaimer">Sample excerpts from customer feedback. Not a live reviews feed.</p>
        </motion.section>

        <motion.section className="gf-section" aria-labelledby="gf-title" {...reveal}><div className="gf-badge" aria-hidden="true">GF</div><div><p className="eyebrow"><span /> More ways to feel good</p><h2 id="gf-title">Gluten-free<br /><em>goodness.</em></h2></div><div className="gf-copy"><p>Jermaine’s has gluten-free choices available, so more of your crew can find something delicious.</p><p className="allergy-note">Have a serious allergy or celiac disease? Please ask our staff about ingredients and preparation methods.</p></div></motion.section>

        <motion.section className="section gallery-section" id="gallery" aria-labelledby="gallery-title" {...reveal}>
          <div className="section-heading section-heading-row"><div><p className="eyebrow eyebrow-dark"><span /> A peek at the vibe</p><h2 id="gallery-title">Come for the<br /><em>color.</em></h2></div><p className="section-intro">A bright little corner with cold treats, warm welcomes, and plenty of reasons to stay a little longer.</p></div>
          <div className="gallery-grid">
            {galleryPhotos.map((item, index) => <motion.button className={`gallery-tile photo-placeholder gallery-photo-${index + 1} ${index === 0 ? "gallery-tall" : index === 2 ? "gallery-wide" : ""}`} key={item.label} type="button" onClick={() => setLightboxIndex(index)} initial={{ opacity: 0, y: index % 2 ? 28 : 0, x: index % 2 ? 18 : -18 }} whileInView={{ opacity: 1, y: 0, x: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ delay: index * 0.08, duration: 0.65, ease }} aria-label={`Open ${item.label} photo`}><img src={item.src} alt={item.alt} loading="lazy" /><span>Photo placeholder · {item.label}</span></motion.button>)}
            <div className="gallery-tile gallery-accent"><span className="gallery-spark" aria-hidden="true">✦</span><strong>Bring<br />your<br />people.</strong><small>there’s room for your whole crew</small></div>
          </div>
          <p className="placeholder-note">Photo placeholders are ready to be replaced with Jermaine’s own café photography. Click a photo to preview it larger.</p>
        </motion.section>

        <motion.section className="visit-section" id="visit" aria-labelledby="visit-title" {...reveal}>
          <div className="visit-copy"><p className="eyebrow"><span /> Find your way here</p><h2 id="visit-title">Meet us at<br /><em>the happy corner.</em></h2><div className="address-block"><strong>Jermaine’s</strong><span>728 N Main St<br />Gunnison, CO 81230</span><small>Located in Mountain Meadows Shopping Center</small></div><div className="visit-actions"><a className="button button-primary" href={directionsUrl} target="_blank" rel="noreferrer">Open in Google Maps <Arrow /></a><a className="button button-light" href="tel:+19706419876">Call now <span aria-hidden="true">☎</span></a></div></div>
          <div className="visit-card"><div className="map-placeholder" role="img" aria-label="Map placeholder showing Jermaine’s location in Gunnison"><div className="map-grid" /><div className="map-road road-one" /><div className="map-road road-two" /><motion.div className="map-pin" style={{ rotate: -45 }} initial={{ opacity: 0, y: -42, scale: 0.65 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.45 }} transition={{ type: "spring", stiffness: 260, damping: 15 }}><span>J</span></motion.div><div className="map-label">Mountain Meadows<br /><small>728 N Main St</small></div><span className="map-placeholder-label">Map placeholder</span></div><div className="hours-card"><div><span className="open-pulse" aria-hidden="true" /><strong>Hours</strong></div><p><span>Mon – Sat</span>8:00 AM – 9:30 PM</p><p><span>Sunday</span>12:00 PM – 9:30 PM</p><a href="tel:+19706419876">(970) 641-9876 <Arrow /></a></div></div>
        </motion.section>

        <footer className="site-footer"><div className="footer-top"><a className="brand footer-brand" href="#top" aria-label="Back to Jermaine’s home"><span className="brand-mark" aria-hidden="true">J</span><span className="brand-copy"><strong>Jermaine’s</strong><small>eat · drink · love</small></span></a><p>Bright bites.<br /><em>Big heart.</em></p><div className="footer-links"><a href="#menu">Menu</a><a href="#about">About</a><a href="#gallery">Gallery</a><a href="#visit">Visit us</a></div></div><div className="footer-bottom"><div><span>728 N Main St · Gunnison, CO 81230</span><a href="tel:+19706419876">(970) 641-9876</a></div><div className="footer-socials"><a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Jermaine’s Facebook placeholder">Facebook · add link</a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Jermaine’s Instagram placeholder">Instagram · add link</a></div><small>© {new Date().getFullYear()} Jermaine’s · Website designed for Jermaine’s</small></div></footer>

        <AnimatePresence>
          {lightboxIndex !== null && <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><button className="lightbox-backdrop" type="button" aria-label="Close photo viewer" onClick={() => setLightboxIndex(null)} /><motion.div className="lightbox-card" initial={{ opacity: 0, y: 24, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.96 }} transition={{ duration: 0.35, ease }}><button className="lightbox-close" type="button" onClick={() => setLightboxIndex(null)} aria-label="Close photo viewer">×</button><img src={galleryPhotos[lightboxIndex].src} alt={galleryPhotos[lightboxIndex].alt} /><div className="lightbox-footer"><span>{galleryPhotos[lightboxIndex].label} · placeholder photo</span><div><button type="button" onClick={() => setLightboxIndex((current) => current === null ? 0 : (current - 1 + galleryPhotos.length) % galleryPhotos.length)} aria-label="Previous photo">←</button><button type="button" onClick={() => setLightboxIndex((current) => current === null ? 0 : (current + 1) % galleryPhotos.length)} aria-label="Next photo">→</button></div></div></motion.div></motion.div>}
        </AnimatePresence>

        <div className="mobile-action-bar" aria-label="Quick actions"><a href="tel:+19706419876"><span aria-hidden="true">☎</span> Call</a><a href={directionsUrl} target="_blank" rel="noreferrer"><span aria-hidden="true">↗</span> Directions</a></div>
      </main>
    </MotionConfig>
  );
}
