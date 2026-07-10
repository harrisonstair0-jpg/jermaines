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

type MenuCategory = "all" | "sweet" | "savory" | "breakfast" | "wraps" | "bowls" | "shakes" | "jamaican" | "coffee" | "drinks";
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
const sandwichPhoto = photo("photo-1509722747041-616f39b57569");
const grilledCheesePhoto = photo("photo-1528736235302-52922df5c122");
const wrapPhoto = photo("photo-1626700051175-6818013e1d4f");
const bowlPhoto = photo("photo-1512621776951-a57141f2eefd");
const breakfastPhoto = photo("photo-1547592180-85f173990554");
const coffeePhoto = photo("photo-1495474472287-4d71bcdd2085");
const shakePhoto = photo("photo-1553787499-6f9133860278");
const chocolateShakePhoto = photo("photo-1572490122747-3968b75cc699");
const greenSmoothiePhoto = photo("photo-1610970881699-44a5587cabec");
const berrySmoothiePhoto = photo("photo-1622597467836-f3285f2131b8");
const tropicalSmoothiePhoto = photo("photo-1623065422902-30a2d299bbe4");
const coolDrinkPhoto = photo("photo-1662130187270-a4d52c700eb6");
const bobaPhoto = photo("photo-1558857563-b371033873d8");
const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Jermaine%27s%2C+728+N+Main+St%2C+Gunnison%2C+CO+81230";
const ease = [0.22, 1, 0.36, 1] as const;

const menuItems: MenuItem[] = [
  { name: "Roasted Chicken Panini", description: "Oven-roasted chicken, bacon, roasted yellow tomato, avocado, house BBQ, and pepper jack cheese. Add spinach $0.50.", price: "$10.50", category: "savory", image: sandwichPhoto, tag: "Panini" },
  { name: "Pesto'nator", description: "Roasted chicken or turkey, tomato, spinach, basil pesto or roasted red pepper pesto, and mozzarella.", price: "$9.00", category: "savory", image: sandwichPhoto, tag: "Panini" },
  { name: "Spicy Swiss", description: "Ham, Swiss cheese, onions, and Sriracha mayo. Add spinach $0.50.", price: "$8.50", category: "savory", image: grilledCheesePhoto, tag: "Panini" },
  { name: "Caprese Melt", description: "Tomato, spinach, mozzarella cheese, and basil or roasted red pepper pesto. Sub vegan pesto $0.50.", price: "$8.50", category: "savory", image: sandwichPhoto, tag: "Crowd favorite" },
  { name: "Cheese Melt", description: "Mozzarella cheese plus the cheese of your choice, toasted until melty.", price: "$6.50", category: "savory", image: grilledCheesePhoto, tag: "Easy favorite" },
  { name: "Rib Daddy", description: "Braised short rib, caramelized onions, cheddar cheese, and BBQ sauce.", price: "$10.50", category: "savory", image: sandwichPhoto, tag: "Panini" },
  { name: "Chicken Panini", description: "A generous toasted sandwich for a satisfying lunch stop.", category: "savory", image: photo("photo-1649305785246-a1d65e8bc078") },
  { name: "Traditional Gyro Sandwich", description: "A savory gyro wrap with seasoned meat, fresh vegetables, and creamy sauce.", category: "savory", image: photo("photo-1676300187347-6f60002fd83e") },
  { name: "Cowboy Wrap", description: "Oven-roasted chicken, bacon, Swiss cheese, avocado, spinach, green chili, and whipped cream cheese.", price: "$9.75", category: "wraps", image: wrapPhoto, tag: "Wrap" },
  { name: "Farm Fresh Wrap", description: "Turkey, bacon, avocado, tomato, spinach, and veggie cream cheese.", price: "$10.00", category: "wraps", image: wrapPhoto, tag: "Wrap" },
  { name: "Rib Wrap", description: "Braised short rib, avocado, caramelized onions, carrots, spinach, and BBQ sauce.", price: "$10.50", category: "wraps", image: wrapPhoto, tag: "Wrap" },
  { name: "Mighty Meats Wrap", description: "Ham, bacon, caramelized onions, avocado, lettuce, tomato, and cheddar cheese.", price: "$9.50", category: "wraps", image: wrapPhoto, tag: "Wrap" },
  { name: "Green Angel Wrap", description: "Lettuce, spinach, tomatoes, green peppers, cucumbers, avocado, red onions, carrots, and house-made carrot or basil pesto.", price: "$9.00", category: "wraps", image: wrapPhoto, tag: "Veggie" },
  { name: "Jerk Chicken Wrap", description: "Jerk chicken, sweet corn, avocado, spinach, and lite buttermilk ranch.", price: "$10.00", category: "wraps", image: wrapPhoto, tag: "Jamaican-inspired" },
  { name: "Chicken Pesto Bowl", description: "Exotic grains, oven-roasted chicken, carrots, and cucumber topped with basil pesto or roasted red pepper pesto. Sub vegan pesto $0.50.", price: "$11.50", category: "bowls", image: bowlPhoto, tag: "Bowl" },
  { name: "Jerk Chicken Bowl", description: "Jerk chicken with exotic grains or a bed of greens, avocado, spinach, and house-made buttermilk ranch.", price: "$11.50", category: "bowls", image: bowlPhoto, tag: "Bowl" },
  { name: "Ital Is Vital Bowl", description: "Lettuce, spinach, avocado, tomato, cucumber, green pepper, and red onion topped with ranch, basil pesto, or roasted red pepper pesto. Sub vegan pesto $0.50.", price: "$9.00", category: "bowls", image: bowlPhoto, tag: "Bowl" },
  { name: "Breakfast Burrito Builder", description: "Build your burrito with eggs, bacon, sausage, ham, pecan-roasted shoulder bacon, shredded cheddar or Jack mix, onion, green pepper, tomato, spinach, avocado, hash brown, chili, or salsa. Includes a bag of chips.", category: "breakfast", image: wrapPhoto, tag: "Build your own" },
  { name: "Mountaineer", description: "Bacon, sausage or ham, two eggs, and cheese. Add lettuce $0.50 or tomato $0.50.", price: "$8.00", category: "breakfast", image: sandwichPhoto, tag: "Breakfast" },
  { name: "Hashtag", description: "Pecan-smoked shoulder bacon, cheese, hash browns, spinach, and yellow tomato.", price: "$9.50", category: "breakfast", image: sandwichPhoto, tag: "Breakfast" },
  { name: "Da Sammy", description: "Plain cream cheese, turkey or ham, lettuce, tomato, and onion. Add cheese $0.50.", price: "$9.00", category: "breakfast", image: sandwichPhoto, tag: "Breakfast" },
  { name: "BLT Breakfast Sandwich", description: "Bacon cream cheese, bacon, avocado, tomato, and lettuce.", price: "$9.00", category: "breakfast", image: sandwichPhoto, tag: "Breakfast" },
  { name: "Veggie Delight", description: "House-made hummus, spinach, avocado, cucumber, carrots, and tomato.", price: "$9.00", category: "breakfast", image: wrapPhoto, tag: "Vegetarian" },
  { name: "C.O.T.D.", description: "The catch of the day with plain cream cheese, red onions, capers, salmon, and tomato.", price: "$9.50", category: "breakfast", image: sandwichPhoto, tag: "Breakfast" },
  { name: "Mr. Brown", description: "Two hash brown patties or an English muffin with fire-roasted short rib, poached eggs, and hollandaise sauce.", price: "$11.00", category: "breakfast", image: breakfastPhoto, tag: "Breakfast" },
  { name: "C.Y.O. Sandwich", description: "Create your own masterpiece. Mix and match your favorite bread, fillings, vegetables, and spreads.", category: "breakfast", image: sandwichPhoto, tag: "Create your own" },
  { name: "Jamaican Beef Patty", description: "Golden, flaky pastry with a warm, savory center.", price: "$5.50", category: "jamaican", image: jamaicanPattyPhoto, tag: "Jamaican favorite" },
  { name: "Veggie Patty", description: "Carrots, cabbage, and broccoli wrapped in flaky pastry.", price: "$5.50", category: "jamaican", image: jamaicanPattyPhoto, tag: "Jamaican favorite" },
  { name: "Jerk Chicken Patty", description: "Marinated roasted chicken wrapped in flaky pastry.", price: "$5.50", category: "jamaican", image: jamaicanPattyPhoto, tag: "Jamaican favorite" },
  { name: "Curry Chicken Patty", description: "Spicy curried chicken wrapped in flaky pastry.", price: "$5.50", category: "jamaican", image: jamaicanPattyPhoto, tag: "Jamaican favorite" },
  { name: "Snowcap Milkshake", description: "Vanilla ice cream and white chocolate blended into a classic thick shake.", price: "$5.50", category: "shakes", image: chocolateShakePhoto, tag: "House classic" },
  { name: "The Sea Turtle", description: "Chocolate ice cream, coconut, and caramel syrup.", price: "$5.50", category: "shakes", image: chocolateShakePhoto },
  { name: "Cafe Au Lait Shake", description: "Vanilla ice cream and espresso blended smooth.", price: "$5.50", category: "shakes", image: shakePhoto },
  { name: "Mocha Milkshake", description: "Vanilla or chocolate ice cream with espresso.", price: "$5.50", category: "shakes", image: chocolateShakePhoto },
  { name: "Caramel Macchiato Shake", description: "Coffeehouse comfort, blended into a cool, creamy treat.", price: "$5.50", category: "shakes", image: shakePhoto, tag: "Sweet sips" },
  { name: "Mudslide", description: "Vanilla or chocolate ice cream, Irish cream syrup, and espresso.", price: "$5.50", category: "shakes", image: chocolateShakePhoto },
  { name: "Frappucino Milkshake", description: "Vanilla ice cream, hazelnut, and espresso.", price: "$5.50", category: "shakes", image: shakePhoto },
  { name: "Easy Skankin'", description: "Vanilla ice cream and chocolate syrup.", price: "$5.50", category: "shakes", image: chocolateShakePhoto },
  { name: "Powerhouse Milkshake", description: "Vanilla ice cream, banana, protein powder, and peanut butter.", price: "$5.50", category: "shakes", image: shakePhoto },
  { name: "Peanut Butter Milkshake", description: "Vanilla ice cream and peanut butter.", price: "$5.50", category: "shakes", image: chocolateShakePhoto },
  { name: "Oreo Milkshake", description: "Vanilla or chocolate ice cream and Oreo cookies.", price: "$5.50", category: "shakes", image: chocolateShakePhoto },
  { name: "M&M Milkshake", description: "Vanilla or chocolate ice cream and M&M's.", price: "$5.50", category: "shakes", image: chocolateShakePhoto },
  { name: "Reese's Milkshake", description: "Vanilla or chocolate ice cream and Reese's peanut butter cups.", price: "$5.50", category: "shakes", image: chocolateShakePhoto },
  { name: "Black Berry Milkshake", description: "Vanilla ice cream and blackberries.", price: "$5.50", category: "shakes", image: berrySmoothiePhoto },
  { name: "Chai Shake", description: "Vanilla ice cream and L.P. chai.", price: "$5.50", category: "shakes", image: shakePhoto },
  { name: "Ice Cream Shake", description: "Mix and match any of our ice cream flavors.", price: "$5.50", category: "shakes", image: shakePhoto },
  { name: "Caribbean Smoothie", description: "Pineapples, mango, sorbet, and fruit juice.", price: "$5.50", category: "shakes", image: tropicalSmoothiePhoto, tag: "Dairy free" },
  { name: "Mango Burst Smoothie", description: "Mango, sorbet, and apple juice.", price: "$5.50", category: "shakes", image: tropicalSmoothiePhoto, tag: "Dairy free" },
  { name: "Triple Berry Smoothie", description: "Blueberry, strawberry, raspberry, sorbet, and pear juice.", price: "$5.50", category: "shakes", image: berrySmoothiePhoto, tag: "Dairy free" },
  { name: "Strawberry Banana Smoothie", description: "Strawberry, banana, fro-yo, apple, and pear juice.", price: "$5.50", category: "shakes", image: berrySmoothiePhoto },
  { name: "Green Machine Smoothie", description: "Mango, spinach, sorbet, ginger, and apple juice.", price: "$5.50", category: "shakes", image: greenSmoothiePhoto, tag: "Dairy free" },
  { name: "Frozen Yogurt", description: "Build your own cup with flavors and toppings to match your mood.", category: "sweet", image: photo("photo-1550594645-25c5bd703258"), tag: "Make it yours" },
  { name: "Ice Cream", description: "A cheerful scoop, a colorful cone, or however you like it.", category: "sweet", image: photo("photo-1501443762994-82bd5dace89a"), tag: "Cool treat" },
  { name: "Drip Coffee", description: "Bring your own cup or choose a 12 oz or 16 oz pour.", price: "$2.00+", category: "coffee", image: coffeePhoto, tag: "Hot or iced" },
  { name: "Hot Tea", description: "A warm, easy cup for a slower morning or afternoon reset.", price: "$1.25+", category: "coffee", image: coffeePhoto },
  { name: "Jamaican Blue Mountain Coffee", description: "French press coffee served as a rich, slow-sipping specialty.", price: "$4.00", category: "coffee", image: coffeePhoto, tag: "Specialty coffee" },
  { name: "Americano", description: "Espresso and water. 12 oz or 16 oz.", price: "$2.35+", category: "coffee", image: coffeePhoto },
  { name: "Mocha", description: "Espresso, chocolate, and milk. 12 oz or 16 oz.", price: "$3.60+", category: "coffee", image: coffeePhoto },
  { name: "Latte", description: "Espresso and steamed milk. 12 oz or 16 oz.", price: "$3.25+", category: "coffee", image: coffeePhoto },
  { name: "White Mocha", description: "Espresso, white chocolate, and milk. 12 oz or 16 oz.", price: "$3.60+", category: "coffee", image: coffeePhoto },
  { name: "Cappuccino", description: "Espresso, steamed milk, and foam. 12 oz or 16 oz.", price: "$3.25+", category: "coffee", image: coffeePhoto },
  { name: "Chai Latte", description: "L.P. chai and milk. 12 oz or 16 oz.", price: "$3.25+", category: "coffee", image: coffeePhoto },
  { name: "Dirty Chai", description: "L.P. chai, milk, and espresso. 12 oz or 16 oz.", price: "$3.50+", category: "coffee", image: coffeePhoto },
  { name: "Hot Chocolate", description: "Rich hot chocolate served warm and cozy.", price: "$3.35+", category: "coffee", image: chocolateShakePhoto },
  { name: "Matcha Latte", description: "Matcha and milk with a bright, earthy finish. 12 oz or 16 oz.", price: "$3.65+", category: "coffee", image: coffeePhoto },
  { name: "Italian Cream Soda", description: "Ask about the current flavors and make it a refreshing, creamy soda.", price: "$3.25", category: "drinks", image: coolDrinkPhoto, tag: "Ask about flavors" },
  { name: "Lavender Milk Tea", description: "Crystal boba with a floral lavender milk tea base.", price: "$5.25", category: "drinks", image: bobaPhoto, tag: "Crystal boba" },
  { name: "Milk Tea", description: "Classic milk tea with crystal boba.", price: "$5.25", category: "drinks", image: bobaPhoto, tag: "Crystal boba" },
  { name: "Matcha Green Tea", description: "Bright matcha green tea with crystal boba.", price: "$5.25", category: "drinks", image: bobaPhoto, tag: "Crystal boba" },
  { name: "Passion Fruit Tea", description: "A bright, tropical tea for an easy afternoon sip.", price: "$4.00", category: "drinks", image: tropicalSmoothiePhoto },
  { name: "Soda", description: "A simple cold drink to go with lunch or a sweet treat.", price: "$3.50", category: "drinks", image: coolDrinkPhoto },
];

const categories: Array<{ label: string; filter: ItemCategory; description: string; image: string; accent: string }> = [
  { label: "Ice Cream & Fro-Yo", filter: "sweet", description: "Cool, creamy, and completely your call with toppings.", image: photo("photo-1501443762994-82bd5dace89a"), accent: "mango" },
  { label: "Paninis & Sandwiches", filter: "savory", description: "Toasty, generous, and ready when the trail day turns hungry.", image: sandwichPhoto, accent: "turquoise" },
  { label: "Breakfast Burritos", filter: "breakfast", description: "Build a breakfast burrito or start the day with a loaded sandwich.", image: wrapPhoto, accent: "sunshine" },
  { label: "Wraps", filter: "wraps", description: "Fresh vegetables, hearty fillings, and big lunch energy.", image: wrapPhoto, accent: "lavender" },
  { label: "Bowls", filter: "bowls", description: "Hearty grains, crisp greens, and colorful toppings.", image: bowlPhoto, accent: "sunshine" },
  { label: "Shakes & Smoothies", filter: "shakes", description: "Thick shakes, bright smoothies, and little vacation energy.", image: shakePhoto, accent: "coral" },
  { label: "Jamaican Favorites", filter: "jamaican", description: "A Caribbean wink in the middle of Colorado’s mountain air.", image: jamaicanPattyPhoto, accent: "green" },
  { label: "Coffee", filter: "coffee", description: "Warm cups, Jamaican Blue Mountain coffee, and easy morning favorites.", image: coffeePhoto, accent: "green" },
  { label: "Cool Drinks", filter: "drinks", description: "Italian cream soda, fruit tea, milk tea, and crystal boba.", image: bobaPhoto, accent: "coral" },
];

const filterLabels: Array<{ label: string; value: MenuCategory }> = [
  { label: "Everything", value: "all" },
  { label: "Sweet treats", value: "sweet" },
  { label: "Paninis & sandwiches", value: "savory" },
  { label: "Breakfast", value: "breakfast" },
  { label: "Wraps", value: "wraps" },
  { label: "Bowls", value: "bowls" },
  { label: "Shakes & smoothies", value: "shakes" },
  { label: "Jamaican favorites", value: "jamaican" },
  { label: "Coffee", value: "coffee" },
  { label: "More drinks", value: "drinks" },
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

const menuThemes = {
  garden: { label: "garden fresh", icon: "✿", ingredients: ["leafy greens", "avocado", "herb lift"] },
  herb: { label: "herb + bright", icon: "✦", ingredients: ["basil", "tomato", "mozzarella"] },
  berry: { label: "berry bright", icon: "✺", ingredients: ["berries", "fruit", "ice cold"] },
  tropical: { label: "tropical chill", icon: "✧", ingredients: ["mango", "pineapple", "sorbet"] },
  jamaica: { label: "island spice", icon: "✹", ingredients: ["warm spice", "jerk", "Caribbean soul"] },
  breakfast: { label: "morning fuel", icon: "☀", ingredients: ["eggs", "hash browns", "bacon"] },
  smoky: { label: "smoky + bold", icon: "◒", ingredients: ["slow cooked", "BBQ", "savory"] },
  cheese: { label: "melty comfort", icon: "✺", ingredients: ["toasty", "cheese pull", "comfort"] },
  coffee: { label: "coffeehouse", icon: "☕", ingredients: ["espresso", "milk", "foam"] },
  caramel: { label: "caramel cloud", icon: "✧", ingredients: ["caramel", "cream", "espresso"] },
  cocoa: { label: "chocolate crush", icon: "●", ingredients: ["cocoa", "cookie", "cream"] },
  boba: { label: "chewy + cool", icon: "○", ingredients: ["tea", "crystal boba", "sweet sip"] },
  vanilla: { label: "cool + creamy", icon: "❋", ingredients: ["creamy", "toppings", "happy"] },
  savory: { label: "toasty + savory", icon: "◌", ingredients: ["fresh", "toasted", "house sauce"] },
} as const;

type MenuThemeKey = keyof typeof menuThemes;

function getMenuTheme(item: MenuItem): MenuThemeKey {
  const text = `${item.name} ${item.description}`.toLowerCase();
  if (text.includes("boba") || text.includes("milk tea")) return "boba";
  if (text.includes("green machine") || text.includes("spinach") || text.includes("avocado") || text.includes("cucumber") || text.includes("veggie")) return "garden";
  if (text.includes("pesto") || text.includes("caprese") || text.includes("basil")) return "herb";
  if (text.includes("caribbean") || text.includes("mango") || text.includes("pineapple") || text.includes("passion fruit")) return "tropical";
  if (text.includes("berry") || text.includes("strawberry")) return "berry";
  if (text.includes("blue mountain")) return "coffee";
  if (text.includes("jamaican") || text.includes("jerk") || text.includes("curry")) return "jamaica";
  if (item.category === "breakfast" || text.includes("breakfast") || text.includes("egg") || text.includes("hash brown") || text.includes("hollandaise")) return "breakfast";
  if (text.includes("short rib") || text.includes("bbq") || text.includes("gyro") || text.includes("ranch")) return "smoky";
  if (text.includes("caramel")) return "caramel";
  if (text.includes("chocolate") || text.includes("oreo") || text.includes("reese") || text.includes("m&m") || text.includes("mudslide")) return "cocoa";
  if (text.includes("coffee") || text.includes("espresso") || text.includes("mocha") || text.includes("chai") || text.includes("cappuccino") || text.includes("latte") || text.includes("americano") || text.includes("cafe au lait")) return "coffee";
  if (text.includes("cheese") || text.includes("swiss") || text.includes("mozzarella") || text.includes("melt")) return "cheese";
  if (item.category === "sweet") return "vanilla";
  return "savory";
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const themeKey = getMenuTheme(item);
  const theme = menuThemes[themeKey];

  return (
    <motion.article
      className={`menu-card menu-theme-${themeKey}`}
      data-category={item.category}
      data-theme={themeKey}
      key={item.name}
      layout
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -18, scale: 0.94 }}
      transition={{ delay: Math.min(index * 0.035, 0.5), duration: 0.42, ease }}
      whileHover={{ y: -10, rotate: index % 2 ? 0.55 : -0.55 }}
      whileTap={{ scale: 0.985 }}
    >
      <div className="menu-card-image">
        <img src={item.image} alt={item.name} loading="lazy" />
        <span className="menu-card-photo-label"><span aria-hidden="true">{theme.icon}</span>{theme.label}</span>
        <span className="menu-card-ingredient-mark" aria-hidden="true">{theme.icon}</span>
        {item.tag && <span className="menu-tag">{item.tag}</span>}
      </div>
      <div className="menu-card-copy">
        <div className="menu-card-meta"><span>{theme.label}</span><i aria-hidden="true">{theme.icon}</i></div>
        <div className="menu-card-title"><h3>{item.name}</h3>{item.price ? <strong>{item.price}</strong> : <span className="ask-price">Ask us</span>}</div>
        <p>{item.description}</p>
        <div className="ingredient-row" aria-label={`${item.name} flavor notes`}>
          {theme.ingredients.map((ingredient) => <span key={ingredient}>{ingredient}</span>)}
        </div>
      </div>
    </motion.article>
  );
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
          <div className="hero-visual" aria-label="Jermaine’s colorful ice cream and smoothie collage">
            <motion.div className="hero-orbit orbit-one" animate={{ rotate: [-15, -8, -15] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div className="hero-orbit orbit-two" animate={{ rotate: [25, 34, 25] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div className="float-shape shape-coral" aria-hidden="true" animate={{ y: [0, -16, 0], rotate: [0, 7, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div className="float-shape shape-turquoise" aria-hidden="true" animate={{ y: [0, 13, 0], rotate: [0, -6, 0] }} transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }} />
            <motion.div className="hero-image hero-image-main photo-placeholder" style={{ y: heroParallax, scale: heroScale, rotate: 5 }}><img src={photo("photo-1501443762994-82bd5dace89a")} alt="Colorful ice cream scoops in a cup" fetchPriority="high" /><span className="image-kicker">cold + colorful</span></motion.div>
            <div className="hero-image hero-image-small photo-placeholder"><img src={photo("photo-1553530666-ba11a7da3888")} alt="Fresh smoothie in a glass" /><span className="image-kicker">fresh blend</span></div>
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
            {categories.map((category, index) => <motion.article className={`category-card category-${category.accent}`} key={category.label} initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ delay: index * 0.08, duration: 0.62, ease }} whileHover={{ y: -7, rotate: index % 2 ? 0.7 : -0.7 }}><div className="category-image photo-placeholder"><img src={category.image} alt={category.label} loading="lazy" />{category.filter === "jamaican" && <div className="category-steam" aria-hidden="true"><i /><i /></div>}</div><div className="category-content"><span className="category-number">0{index + 1}</span><h3>{category.label}</h3><p>{category.description}</p><span className="category-hover-note">tap for favorites</span><button type="button" onClick={() => showMenu(category.filter)}>See favorites <Arrow /></button></div></motion.article>)}
          </div>
        </motion.section>

        <motion.section className="section menu-section" id="menu" aria-labelledby="menu-title" {...reveal}>
          <div className="menu-header"><div><p className="eyebrow"><span /> The full menu</p><h2 id="menu-title">All the <em>good stuff.</em></h2></div><p>Paninis, wraps, bowls, breakfast builds, Jamaican favorites, shakes, smoothies, coffee, boba, and more — organized by category so you can find your thing fast.</p></div>
          <div className="menu-filters" role="tablist" aria-label="Filter menu items">{filterLabels.map((filter) => <button key={filter.value} className={activeMenu === filter.value ? "active" : ""} type="button" role="tab" aria-selected={activeMenu === filter.value} onClick={() => setActiveMenu(filter.value)}>{filter.label}</button>)}</div>
          <motion.div className="menu-grid" layout>
            <AnimatePresence initial={false} mode="popLayout">
              {visibleItems.map((item, index) => <MenuCard item={item} index={index} key={item.name} />)}
            </AnimatePresence>
          </motion.div>
          <p className="menu-note">Menu items and prices are transcribed from the supplied menu boards. Flavors, add-ons, and availability can change — call ahead if you’re looking for something specific.</p>
        </motion.section>

        <motion.section className="about-section" id="about" aria-labelledby="about-title" {...reveal}>
          <div className="about-photo photo-placeholder"><img src={photo("photo-1521017432531-fbd92d768814")} alt="Colorful café table with food and drinks" loading="lazy" /><div className="about-stamp" aria-hidden="true"><span>gunnison’s</span><strong>happy<br />little<br />corner</strong></div></div>
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
            {galleryPhotos.map((item, index) => <motion.button className={`gallery-tile photo-placeholder gallery-photo-${index + 1} ${index === 0 ? "gallery-tall" : index === 2 ? "gallery-wide" : ""}`} key={item.label} type="button" onClick={() => setLightboxIndex(index)} initial={{ opacity: 0, y: index % 2 ? 28 : 0, x: index % 2 ? 18 : -18 }} whileInView={{ opacity: 1, y: 0, x: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ delay: index * 0.08, duration: 0.65, ease }} aria-label={`Open ${item.label} photo`}><img src={item.src} alt={item.alt} loading="lazy" /><span className="gallery-label">{item.label}</span></motion.button>)}
            <div className="gallery-tile gallery-accent"><span className="gallery-spark" aria-hidden="true">✦</span><strong>Bring<br />your<br />people.</strong><small>there’s room for your whole crew</small></div>
          </div>
          <p className="placeholder-note">A visual taste of the colorful, easygoing energy waiting inside.</p>
        </motion.section>

        <motion.section className="visit-section" id="visit" aria-labelledby="visit-title" {...reveal}>
          <div className="visit-copy"><p className="eyebrow"><span /> Find your way here</p><h2 id="visit-title">Meet us at<br /><em>the happy corner.</em></h2><div className="address-block"><strong>Jermaine’s</strong><span>728 N Main St<br />Gunnison, CO 81230</span><small>Located in Mountain Meadows Shopping Center</small></div><div className="visit-actions"><a className="button button-primary" href={directionsUrl} target="_blank" rel="noreferrer">Open in Google Maps <Arrow /></a><a className="button button-light" href="tel:+19706419876">Call to order <span aria-hidden="true">☎</span></a></div></div>
          <div className="visit-card"><div className="map-placeholder" role="img" aria-label="Map showing Jermaine’s location in Gunnison"><div className="map-grid" /><div className="map-road road-one" /><div className="map-road road-two" /><motion.div className="map-pin" style={{ rotate: -45 }} initial={{ opacity: 0, y: -42, scale: 0.65 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.45 }} transition={{ type: "spring", stiffness: 260, damping: 15 }}><span>J</span></motion.div><div className="map-label">Mountain Meadows<br /><small>728 N Main St</small></div><span className="map-placeholder-label">Find us here</span></div><div className="hours-card"><div><span className="open-pulse" aria-hidden="true" /><strong>Hours</strong></div><p><span>Mon – Sat</span>8:00 AM – 9:30 PM</p><p><span>Sunday</span>12:00 PM – 9:30 PM</p><a href="tel:+19706419876">(970) 641-9876 <Arrow /></a></div></div>
        </motion.section>

        <footer className="site-footer"><div className="footer-top"><a className="brand footer-brand" href="#top" aria-label="Back to Jermaine’s home"><span className="brand-mark" aria-hidden="true">J</span><span className="brand-copy"><strong>Jermaine’s</strong><small>eat · drink · love</small></span></a><p>Bright bites.<br /><em>Big heart.</em></p><div className="footer-links"><a href="#menu">Menu</a><a href="#about">About</a><a href="#gallery">Gallery</a><a href="#visit">Visit us</a></div></div><div className="footer-bottom"><div><span>728 N Main St · Gunnison, CO 81230</span><a href="tel:+19706419876">(970) 641-9876</a></div><div className="footer-socials"><a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Jermaine’s Facebook placeholder">Facebook · add link</a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Jermaine’s Instagram placeholder">Instagram · add link</a></div><small>© {new Date().getFullYear()} Jermaine’s · Website designed for Jermaine’s</small></div></footer>

        <AnimatePresence>
          {lightboxIndex !== null && <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><button className="lightbox-backdrop" type="button" aria-label="Close photo viewer" onClick={() => setLightboxIndex(null)} /><motion.div className="lightbox-card" initial={{ opacity: 0, y: 24, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.96 }} transition={{ duration: 0.35, ease }}><button className="lightbox-close" type="button" onClick={() => setLightboxIndex(null)} aria-label="Close photo viewer">×</button><img src={galleryPhotos[lightboxIndex].src} alt={galleryPhotos[lightboxIndex].alt} /><div className="lightbox-footer"><span>{galleryPhotos[lightboxIndex].label} · visual moodboard</span><div><button type="button" onClick={() => setLightboxIndex((current) => current === null ? 0 : (current - 1 + galleryPhotos.length) % galleryPhotos.length)} aria-label="Previous photo">←</button><button type="button" onClick={() => setLightboxIndex((current) => current === null ? 0 : (current + 1) % galleryPhotos.length)} aria-label="Next photo">→</button></div></div></motion.div></motion.div>}
        </AnimatePresence>

        <div className="mobile-action-bar" aria-label="Quick actions"><a href="tel:+19706419876"><span aria-hidden="true">☎</span> Call</a><a href={directionsUrl} target="_blank" rel="noreferrer"><span aria-hidden="true">↗</span> Directions</a></div>
      </main>
    </MotionConfig>
  );
}
