/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

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
const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Jermaine%27s%2C+728+N+Main+St%2C+Gunnison%2C+CO+81230";

const menuItems: MenuItem[] = [
  { name: "Caprese Melt", description: "A bright, melty favorite for lunch or an easy afternoon bite.", price: "$11.50", category: "savory", image: photo("photo-1528735602780-2552fd46c7af"), tag: "Crowd favorite" },
  { name: "Jamaican Beef Patty", description: "Golden, flaky pastry with a warm, savory center.", price: "$6.50", category: "jamaican", image: photo("photo-1601050690597-df0568f70950"), tag: "Jamaican favorite" },
  { name: "Caramel Macchiato Shake", description: "Coffeehouse comfort, blended into a cool, creamy treat.", price: "$5.50", category: "shakes", image: photo("photo-1553530666-ba11a7da3888"), tag: "Sweet sips" },
  { name: "Snowcap Milkshake", description: "A classic thick shake made for big smiles and slow sips.", price: "$5.50", category: "shakes", image: photo("photo-1572490122747-3968b75cc699"), tag: "House classic" },
  { name: "Cheese Melt", description: "Toasty, melty, and just right when the day calls for comfort.", price: "$8.50", category: "savory", image: photo("photo-1481070414801-51fd732d7184"), tag: "Easy favorite" },
  { name: "Traditional Gyro Sandwich", description: "One of the savory staples people come back for.", category: "savory", image: photo("photo-1529006557810-274b9b2fc783") },
  { name: "Chicken Panini", description: "A generous, toasted sandwich for a satisfying lunch stop.", category: "savory", image: photo("photo-1540914124281-342587941389") },
  { name: "Frozen Yogurt", description: "Build your own cup with flavors and toppings to match your mood.", category: "sweet", image: photo("photo-1563805042-7684c019e1cb"), tag: "Make it yours" },
  { name: "Ice Cream", description: "A cheerful scoop, a colorful cone, or however you like it.", category: "sweet", image: photo("photo-1501443762994-82bd5dace89a"), tag: "Cool treat" },
  { name: "Jamaican Coffee", description: "A warm cup to start your morning or reset your afternoon.", category: "coffee", image: photo("photo-1495474472287-4d71bcdd2085") },
];

const categories: Array<{ label: string; filter: ItemCategory; description: string; image: string; accent: string }> = [
  { label: "Ice Cream & Fro-Yo", filter: "sweet", description: "Cool, creamy, and completely your call with toppings.", image: photo("photo-1501443762994-82bd5dace89a"), accent: "mango" },
  { label: "Sandwiches & Paninis", filter: "savory", description: "Toasty, generous, and ready when the trail day turns hungry.", image: photo("photo-1528735602780-2552fd46c7af"), accent: "turquoise" },
  { label: "Shakes & Smoothies", filter: "shakes", description: "Thick shakes, bright smoothies, and little vacation energy.", image: photo("photo-1553530666-ba11a7da3888"), accent: "coral" },
  { label: "Jamaican Favorites", filter: "jamaican", description: "A Caribbean wink in the middle of Colorado’s mountain air.", image: photo("photo-1601050690597-df0568f70950"), accent: "green" },
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

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [activeMenu, setActiveMenu] = useState<MenuCategory>("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const visibleItems = activeMenu === "all" ? menuItems : menuItems.filter((item) => item.category === activeMenu);

  const showMenu = (filter: MenuCategory = "all") => {
    setActiveMenu(filter);
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }} />
      <div className="announcement"><span className="announcement-spark" aria-hidden="true">✦</span> Sweet treats + savory favorites in the heart of Gunnison <span className="announcement-dot" aria-hidden="true" /> Open today — come hang out</div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Jermaine’s home"><span className="brand-mark" aria-hidden="true">J</span><span className="brand-copy"><strong>Jermaine’s</strong><small>eat · drink · love</small></span></a>
        <button className="mobile-nav-toggle" type="button" aria-expanded={mobileMenuOpen} aria-controls="site-navigation" onClick={() => setMobileMenuOpen((open) => !open)}><span>{mobileMenuOpen ? "Close" : "Menu"}</span><i aria-hidden="true" /></button>
        <nav id="site-navigation" className={`site-nav ${mobileMenuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          <a href="#menu" onClick={() => setMobileMenuOpen(false)}>Menu</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#gallery" onClick={() => setMobileMenuOpen(false)}>Gallery</a>
          <a href="#visit" onClick={() => setMobileMenuOpen(false)}>Visit us</a>
          <a className="nav-call" href="tel:+19706419876">Call <span>(970) 641-9876</span></a>
        </nav>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Gunnison, Colorado <span /></p>
          <h1 id="hero-title">Eat.<br /><em>Drink.</em><br />Love.</h1>
          <p className="hero-lede">Sweet treats, savory favorites, and Caribbean flavor in the heart of Gunnison.</p>
          <div className="hero-actions"><a className="button button-primary" href="#menu">View the menu <Arrow /></a><a className="button button-ghost" href={directionsUrl} target="_blank" rel="noreferrer">Get directions <Arrow /></a></div>
          <a className="hero-phone" href="tel:+19706419876"><span className="phone-icon" aria-hidden="true">☎</span> Call Jermaine’s <strong>(970) 641-9876</strong></a>
        </div>
        <div className="hero-visual" aria-label="Photo placeholder collage">
          <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
          <div className="hero-image hero-image-main photo-placeholder"><img src={photo("photo-1501443762994-82bd5dace89a")} alt="Colorful ice cream scoops in a cup" fetchPriority="high" /><span>Photo placeholder</span></div>
          <div className="hero-image hero-image-small photo-placeholder"><img src={photo("photo-1553530666-ba11a7da3888")} alt="Fresh smoothie in a glass" /><span>Photo placeholder</span></div>
          <div className="hero-sticker sticker-sun" aria-hidden="true"><span>made with</span><strong>good<br />vibes</strong></div>
          <div className="hero-sticker sticker-rating"><strong>4.5</strong><span>★ ★ ★ ★ ★</span><small>281+ Google reviews</small></div>
          <div className="hero-doodle doodle-star" aria-hidden="true">✦</div><div className="hero-doodle doodle-wave" aria-hidden="true">〰</div>
        </div>
      </section>

      <section className="quick-strip" aria-label="Jermaine’s highlights">
        <div><span className="strip-icon" aria-hidden="true">✿</span><p><strong>Big flavor</strong><br />for every kind of day</p></div>
        <div><span className="strip-icon" aria-hidden="true">☻</span><p><strong>Family friendly</strong><br />easy stops, happy people</p></div>
        <div><span className="strip-icon" aria-hidden="true">✺</span><p><strong>Gluten-free options</strong><br />ask our friendly staff</p></div>
        <div className="strip-hours"><span className="open-pulse" aria-hidden="true" /><p><strong>Open today</strong><br />Mon–Sat 8am · Sun 12pm</p></div>
      </section>

      <section className="section categories-section" aria-labelledby="categories-title">
        <div className="section-heading section-heading-row"><div><p className="eyebrow eyebrow-dark"><span /> A little something for everyone</p><h2 id="categories-title">Pick your<br /><em>happy place.</em></h2></div><p className="section-intro">Stop in for something cold, something savory, or just a good excuse to slow down for a minute.</p></div>
        <div className="category-grid">
          {categories.map((category, index) => <article className={`category-card category-${category.accent}`} key={category.label}><div className="category-image photo-placeholder"><img src={category.image} alt="" loading="lazy" /><span>Photo placeholder</span></div><div className="category-content"><span className="category-number">0{index + 1}</span><h3>{category.label}</h3><p>{category.description}</p><button type="button" onClick={() => showMenu(category.filter)}>See favorites <Arrow /></button></div></article>)}
        </div>
      </section>

      <section className="section menu-section" id="menu" aria-labelledby="menu-title">
        <div className="menu-header"><div><p className="eyebrow"><span /> What’s good today</p><h2 id="menu-title">The <em>good stuff.</em></h2></div><p>A few crowd favorites to get you started. Ask the team about today’s flavors, toppings, and bakery treats.</p></div>
        <div className="menu-filters" role="tablist" aria-label="Filter menu items">
          {filterLabels.map((filter) => <button key={filter.value} className={activeMenu === filter.value ? "active" : ""} type="button" role="tab" aria-selected={activeMenu === filter.value} onClick={() => setActiveMenu(filter.value)}>{filter.label}</button>)}
        </div>
        <div className="menu-grid">
          {visibleItems.map((item) => <article className="menu-card" key={item.name}><div className="menu-card-image photo-placeholder"><img src={item.image} alt="" loading="lazy" /><span>Photo placeholder</span>{item.tag && <span className="menu-tag">{item.tag}</span>}</div><div className="menu-card-copy"><div className="menu-card-title"><h3>{item.name}</h3>{item.price ? <strong>{item.price}</strong> : <span className="ask-price">Ask us</span>}</div><p>{item.description}</p></div></article>)}
        </div>
        <p className="menu-note">Prices shown where provided. Menu flavors and availability can change — call ahead if you’re looking for something specific.</p>
      </section>

      <section className="about-section" id="about" aria-labelledby="about-title">
        <div className="about-photo photo-placeholder"><img src={photo("photo-1521017432531-fbd92d768814")} alt="Colorful café table with food and drinks" loading="lazy" /><span>Photo placeholder</span><div className="about-stamp" aria-hidden="true"><span>gunnison’s</span><strong>happy<br />little<br />corner</strong></div></div>
        <div className="about-copy"><p className="eyebrow eyebrow-dark"><span /> More than a pit stop</p><h2 id="about-title">Good food.<br /><em>Good people.</em><br />Good energy.</h2><p>Jermaine’s is a locally loved Gunnison café with a colorful, Caribbean-inspired personality and something for every appetite. Come by for a frozen yogurt piled with toppings, a generous sandwich, a Jamaican beef patty, or a coffee and pastry that makes the morning feel easy.</p><p>It’s casual, welcoming, and made for the whole crew — families, tourists, teenagers, and regulars who know exactly what they want.</p><div className="about-signoff"><span>Eat · Drink · Love</span><i aria-hidden="true">✦</i></div></div>
      </section>

      <section className="review-section" aria-labelledby="reviews-title">
        <div className="review-topline"><div className="review-score"><strong>4.5</strong><span>★ ★ ★ ★ ★</span></div><div><p className="eyebrow eyebrow-dark"><span /> People are saying</p><h2 id="reviews-title">The kind of place<br /><em>people tell friends about.</em></h2></div><p className="review-count">281+<small>Google reviews</small></p></div>
        <div className="review-grid"><blockquote><span className="quote-mark">“</span><p>Awesome little place, good food, and awesome customer service!</p><cite>— E Hale</cite></blockquote><blockquote><span className="quote-mark">“</span><p>There’s a great selection of sweet and savory items, and gluten-free stuff too!</p><cite>— Nathaniel G</cite></blockquote><blockquote><span className="quote-mark">“</span><p>Sandwiches and smoothies are generous in size and absolutely delicious.</p><cite>— A happy guest</cite></blockquote></div>
        <p className="review-disclaimer">Sample excerpts from customer feedback. Not a live reviews feed.</p>
      </section>

      <section className="gf-section" aria-labelledby="gf-title"><div className="gf-badge" aria-hidden="true">GF</div><div><p className="eyebrow"><span /> More ways to feel good</p><h2 id="gf-title">Gluten-free<br /><em>goodness.</em></h2></div><div className="gf-copy"><p>Jermaine’s has gluten-free choices available, so more of your crew can find something delicious.</p><p className="allergy-note">Have a serious allergy or celiac disease? Please ask our staff about ingredients and preparation methods.</p></div></section>

      <section className="section gallery-section" id="gallery" aria-labelledby="gallery-title">
        <div className="section-heading section-heading-row"><div><p className="eyebrow eyebrow-dark"><span /> A peek at the vibe</p><h2 id="gallery-title">Come for the<br /><em>color.</em></h2></div><p className="section-intro">A bright little corner with cold treats, warm welcomes, and plenty of reasons to stay a little longer.</p></div>
        <div className="gallery-grid"><div className="gallery-tile gallery-tall photo-placeholder"><img src={photo("photo-1551024506-0bccd828d307")} alt="Colorful baked treats" loading="lazy" /><span>Photo placeholder · pastries</span></div><div className="gallery-tile photo-placeholder"><img src={photo("photo-1495474472287-4d71bcdd2085")} alt="Fresh coffee on a café table" loading="lazy" /><span>Photo placeholder · coffee</span></div><div className="gallery-tile gallery-wide photo-placeholder"><img src={photo("photo-1528735602780-2552fd46c7af")} alt="Sandwich ready for lunch" loading="lazy" /><span>Photo placeholder · sandwiches</span></div><div className="gallery-tile photo-placeholder"><img src={photo("photo-1572490122747-3968b75cc699")} alt="Milkshake with whipped cream" loading="lazy" /><span>Photo placeholder · shakes</span></div><div className="gallery-tile gallery-accent"><span className="gallery-spark" aria-hidden="true">✦</span><strong>Bring<br />your<br />people.</strong><small>there’s room for your whole crew</small></div></div>
        <p className="placeholder-note">Photo placeholders are ready to be replaced with Jermaine’s own café photography.</p>
      </section>

      <section className="visit-section" id="visit" aria-labelledby="visit-title">
        <div className="visit-copy"><p className="eyebrow"><span /> Find your way here</p><h2 id="visit-title">Meet us at<br /><em>the happy corner.</em></h2><div className="address-block"><strong>Jermaine’s</strong><span>728 N Main St<br />Gunnison, CO 81230</span><small>Located in Mountain Meadows Shopping Center</small></div><div className="visit-actions"><a className="button button-primary" href={directionsUrl} target="_blank" rel="noreferrer">Open in Google Maps <Arrow /></a><a className="button button-light" href="tel:+19706419876">Call now <span aria-hidden="true">☎</span></a></div></div>
        <div className="visit-card"><div className="map-placeholder" role="img" aria-label="Map placeholder showing Jermaine’s location in Gunnison"><div className="map-grid" /><div className="map-road road-one" /><div className="map-road road-two" /><div className="map-pin"><span>J</span></div><div className="map-label">Mountain Meadows<br /><small>728 N Main St</small></div><span className="map-placeholder-label">Map placeholder</span></div><div className="hours-card"><div><span className="open-pulse" aria-hidden="true" /><strong>Hours</strong></div><p><span>Mon – Sat</span>8:00 AM – 9:30 PM</p><p><span>Sunday</span>12:00 PM – 9:30 PM</p><a href="tel:+19706419876">(970) 641-9876 <Arrow /></a></div></div>
      </section>

      <footer className="site-footer"><div className="footer-top"><a className="brand footer-brand" href="#top" aria-label="Back to Jermaine’s home"><span className="brand-mark" aria-hidden="true">J</span><span className="brand-copy"><strong>Jermaine’s</strong><small>eat · drink · love</small></span></a><p>Bright bites.<br /><em>Big heart.</em></p><div className="footer-links"><a href="#menu">Menu</a><a href="#about">About</a><a href="#gallery">Gallery</a><a href="#visit">Visit us</a></div></div><div className="footer-bottom"><div><span>728 N Main St · Gunnison, CO 81230</span><a href="tel:+19706419876">(970) 641-9876</a></div><div className="footer-socials"><a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Jermaine’s Facebook placeholder">Facebook · add link</a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Jermaine’s Instagram placeholder">Instagram · add link</a></div><small>© {new Date().getFullYear()} Jermaine’s · Website designed for Jermaine’s</small></div></footer>
      <div className="mobile-action-bar" aria-label="Quick actions"><a href="tel:+19706419876"><span aria-hidden="true">☎</span> Call</a><a href={directionsUrl} target="_blank" rel="noreferrer"><span aria-hidden="true">↗</span> Directions</a></div>
    </main>
  );
}
