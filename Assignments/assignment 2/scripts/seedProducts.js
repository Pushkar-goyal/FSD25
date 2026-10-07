const fs = require('fs');
const path = require('path');

const categories = [
  {
    name: "Electronics",
    prefix: "ELEC",
    items: [
      { title: "UltraSound Pro Noise-Cancelling Headphones", brand: "AuraTech", price: 299.99, discount: 12.5, rating: 4.8, stock: 45, tags: ["audio", "bluetooth", "noise-cancelling", "wireless"] },
      { title: "PulseFit Smartwatch Series 7", brand: "Chronos", price: 199.50, discount: 15.0, rating: 4.6, stock: 80, tags: ["wearable", "smartwatch", "fitness", "waterproof"] },
      { title: "ZenView 27-inch 4K UHD Monitor", brand: "Visionix", price: 449.00, discount: 8.0, rating: 4.7, stock: 25, tags: ["monitor", "4k", "ips", "display"] },
      { title: "Quantum Mechanical Gaming Keyboard", brand: "VortexKey", price: 129.99, discount: 10.0, rating: 4.9, stock: 60, tags: ["keyboard", "gaming", "rgb", "mechanical"] },
      { title: "GlideFlow Ergonomic Wireless Mouse", brand: "ErgoLogic", price: 69.95, discount: 5.0, rating: 4.5, stock: 110, tags: ["mouse", "ergonomic", "wireless", "office"] },
      { title: "TitanSound Portable Waterproof Speaker", brand: "BassWave", price: 89.99, discount: 20.0, rating: 4.7, stock: 95, tags: ["speaker", "bluetooth", "outdoor", "waterproof"] },
      { title: "AeroTab Pro 11-inch Tablet 128GB", brand: "Nexis", price: 549.00, discount: 10.0, rating: 4.6, stock: 35, tags: ["tablet", "touchscreen", "portable", "android"] },
      { title: "HyperBeam 4K HDR Home Cinema Projector", brand: "LumaView", price: 799.99, discount: 18.0, rating: 4.4, stock: 18, tags: ["projector", "cinema", "4k", "hdr"] },
      { title: "SonicPods True Wireless Earbuds", brand: "AuraTech", price: 119.00, discount: 15.0, rating: 4.6, stock: 120, tags: ["audio", "earbuds", "wireless", "anc"] },
      { title: "OmniPower 65W GaN Fast Charger", brand: "VoltCore", price: 39.99, discount: 5.0, rating: 4.8, stock: 140, tags: ["charger", "usb-c", "fast-charge", "gan"] }
    ]
  },
  {
    name: "Clothing & Fashion",
    prefix: "CLTH",
    items: [
      { title: "Heritage Raw Denim Trucker Jacket", brand: "DenimCraft", price: 120.00, discount: 10.0, rating: 4.7, stock: 50, tags: ["jacket", "denim", "outerwear", "casual"] },
      { title: "Organic Pima Cotton Crewneck Tee", brand: "PureWeave", price: 34.50, discount: 0.0, rating: 4.8, stock: 150, tags: ["t-shirt", "cotton", "basics", "sustainable"] },
      { title: "Tailored Stretch Chino Pants", brand: "UrbanStitch", price: 68.00, discount: 15.0, rating: 4.5, stock: 85, tags: ["pants", "chinos", "stretch", "menswear"] },
      { title: "Pure Merino Wool Crew Sweater", brand: "HighlandWools", price: 135.00, discount: 20.0, rating: 4.9, stock: 40, tags: ["sweater", "merino", "wool", "winter"] },
      { title: "StormShield All-Weather Trench Coat", brand: "WeatherGuard", price: 210.00, discount: 12.0, rating: 4.6, stock: 30, tags: ["coat", "waterproof", "outerwear", "formal"] },
      { title: "AeroFlex Breathable Running Shorts", brand: "Velocity", price: 42.00, discount: 10.0, rating: 4.4, stock: 110, tags: ["shorts", "running", "athletic", "gym"] },
      { title: "Classic Top-Grain Leather Belt", brand: "Ox & Hide", price: 48.00, discount: 5.0, rating: 4.7, stock: 95, tags: ["belt", "leather", "accessories", "wardrobe"] },
      { title: "Relaxed Fit Linen Button-Down Shirt", brand: "BreezeWear", price: 59.99, discount: 10.0, rating: 4.5, stock: 75, tags: ["shirt", "linen", "summer", "casual"] },
      { title: "Water-Resistant Commuter Backpack", brand: "PackSmart", price: 89.00, discount: 15.0, rating: 4.8, stock: 65, tags: ["backpack", "travel", "commute", "waterproof"] },
      { title: "Cushioned Merino Wool Hiking Socks 3-Pack", brand: "HighlandWools", price: 28.00, discount: 0.0, rating: 4.9, stock: 130, tags: ["socks", "hiking", "wool", "accessories"] }
    ]
  },
  {
    name: "Home & Kitchen",
    prefix: "HOME",
    items: [
      { title: "Barista Touch Espresso Machine", brand: "BrewMaster", price: 599.99, discount: 10.0, rating: 4.9, stock: 22, tags: ["coffee", "espresso", "appliances", "kitchen"] },
      { title: "Pre-Seasoned Cast Iron Skillet 12-inch", brand: "IronStone", price: 44.95, discount: 8.0, rating: 4.8, stock: 90, tags: ["cookware", "cast-iron", "skillet", "kitchen"] },
      { title: "CrispWave XXL Digital Air Fryer", brand: "AeroChef", price: 119.99, discount: 25.0, rating: 4.7, stock: 55, tags: ["air-fryer", "appliances", "healthy", "cooking"] },
      { title: "CleanBot L10 Smart Robot Vacuum & Mop", brand: "RoboHome", price: 379.00, discount: 15.0, rating: 4.5, stock: 32, tags: ["vacuum", "smart-home", "cleaning", "robot"] },
      { title: "Japanese Damascus Steel Chef Knife 8-inch", brand: "KatanaBlade", price: 89.50, discount: 10.0, rating: 4.9, stock: 45, tags: ["knife", "cutlery", "chef", "cooking"] },
      { title: "Precision Gooseneck Electric Kettle", brand: "BrewMaster", price: 74.99, discount: 12.0, rating: 4.8, stock: 70, tags: ["kettle", "tea", "coffee", "temperature-control"] },
      { title: "Organic Bamboo End-Grain Cutting Board", brand: "EcoBoard", price: 39.99, discount: 5.0, rating: 4.7, stock: 80, tags: ["cutting-board", "bamboo", "kitchen", "wood"] },
      { title: "PowerBlend Pro 1500W Blender", brand: "VortexKitchen", price: 149.00, discount: 20.0, rating: 4.6, stock: 48, tags: ["blender", "smoothie", "appliances", "kitchen"] },
      { title: "Ergonomic Cooling Gel Memory Foam Pillow", brand: "RestCloud", price: 49.99, discount: 15.0, rating: 4.6, stock: 100, tags: ["bedding", "pillow", "memory-foam", "sleep"] },
      { title: "AromaMist Ultrasonic Essential Oil Diffuser", brand: "ZenAtmosphere", price: 32.50, discount: 0.0, rating: 4.5, stock: 115, tags: ["aromatherapy", "diffuser", "wellness", "home"] }
    ]
  },
  {
    name: "Sports & Fitness",
    prefix: "SPRT",
    items: [
      { title: "QuickSelect Adjustable Dumbbell Pair 50lbs", brand: "FlexIron", price: 329.00, discount: 10.0, rating: 4.8, stock: 28, tags: ["fitness", "weights", "dumbbells", "gym"] },
      { title: "GripPro Non-Slip Natural Rubber Yoga Mat", brand: "ZenMotion", price: 58.00, discount: 12.0, rating: 4.9, stock: 85, tags: ["yoga", "mat", "exercise", "pilates"] },
      { title: "Apex Speed Carbon Fiber Road Bike", brand: "Veloce", price: 1299.00, discount: 5.0, rating: 4.7, stock: 12, tags: ["cycling", "bike", "road-bike", "outdoor"] },
      { title: "Heavy-Duty Resistance Loop Bands Set of 5", brand: "FitTribe", price: 24.99, discount: 0.0, rating: 4.7, stock: 140, tags: ["resistance-bands", "fitness", "workout", "portable"] },
      { title: "HydroShield 32oz Insulated Stainless Bottle", brand: "AquaVault", price: 34.00, discount: 10.0, rating: 4.8, stock: 125, tags: ["water-bottle", "hydration", "insulated", "gym"] },
      { title: "EnduroPulse GPS Multisport Watch", brand: "Chronos", price: 289.00, discount: 15.0, rating: 4.6, stock: 40, tags: ["gps", "smartwatch", "running", "triathlon"] },
      { title: "FoldEase Space-Saving Treadmill", brand: "AeroStep", price: 499.00, discount: 20.0, rating: 4.4, stock: 16, tags: ["treadmill", "cardio", "home-gym", "running"] },
      { title: "Cast Iron Competition Kettlebell 16kg", brand: "FlexIron", price: 65.00, discount: 0.0, rating: 4.8, stock: 60, tags: ["kettlebell", "strength", "crossfit", "weights"] },
      { title: "ProCombat Leather Boxing Gloves 14oz", brand: "StrikeForce", price: 79.99, discount: 10.0, rating: 4.7, stock: 50, tags: ["boxing", "combat", "gloves", "sparring"] },
      { title: "TerraGrip Waterproof Trail Running Shoes", brand: "StridePeak", price: 139.50, discount: 15.0, rating: 4.6, stock: 70, tags: ["shoes", "trail-running", "hiking", "footwear"] }
    ]
  },
  {
    name: "Beauty & Personal Care",
    prefix: "BEAU",
    items: [
      { title: "PureHydra Hyaluronic Acid Facial Serum", brand: "DermaGlow", price: 28.00, discount: 10.0, rating: 4.9, stock: 135, tags: ["skincare", "serum", "hydrating", "anti-aging"] },
      { title: "Radiance Vitamin C Brightening Cream", brand: "DermaGlow", price: 36.50, discount: 12.0, rating: 4.7, stock: 90, tags: ["skincare", "moisturizer", "vitamin-c", "glow"] },
      { title: "SonicCleanse Pro Electric Toothbrush", brand: "DentaCare", price: 79.99, discount: 20.0, rating: 4.8, stock: 80, tags: ["oral-care", "electric-toothbrush", "hygiene", "rechargeable"] },
      { title: "Mineral Shield Invisible Sunscreen SPF 50", brand: "SunSip", price: 24.00, discount: 0.0, rating: 4.8, stock: 110, tags: ["sunscreen", "spf50", "skincare", "protection"] },
      { title: "Moroccan Argan Intensive Hair Repair Mask", brand: "Botanique", price: 32.00, discount: 15.0, rating: 4.6, stock: 65, tags: ["haircare", "argan-oil", "conditioner", "repair"] },
      { title: "Gentle Calendula Foaming Facial Cleanser", brand: "PurePore", price: 22.00, discount: 5.0, rating: 4.7, stock: 120, tags: ["cleanser", "face-wash", "gentle", "sensitive-skin"] },
      { title: "Precision Titanium Beard & Hair Trimmer", brand: "GroomBaron", price: 54.95, discount: 10.0, rating: 4.6, stock: 75, tags: ["grooming", "shaver", "trimmer", "mens-care"] },
      { title: "Detox French Green Clay Face Mask", brand: "Botanique", price: 26.50, discount: 0.0, rating: 4.5, stock: 85, tags: ["face-mask", "clay", "detox", "pores"] },
      { title: "Midnight Renewal Retinol 0.5% Night Cream", brand: "DermaGlow", price: 44.00, discount: 18.0, rating: 4.8, stock: 55, tags: ["retinol", "night-cream", "anti-wrinkle", "skincare"] },
      { title: "Organic Damask Rose Hydrating Mist", brand: "PurePore", price: 19.99, discount: 0.0, rating: 4.6, stock: 105, tags: ["toner", "rosewater", "hydration", "facial-mist"] }
    ]
  },
  {
    name: "Books & Stationery",
    prefix: "BOOK",
    items: [
      { title: "Modern Distributed Systems in Practice", brand: "TechCraft Press", price: 49.99, discount: 5.0, rating: 4.9, stock: 65, tags: ["programming", "systems", "software", "architecture"] },
      { title: "Full-Stack Web Architecture Handbook", brand: "CodeCraft Publishing", price: 42.50, discount: 10.0, rating: 4.8, stock: 80, tags: ["javascript", "web-dev", "full-stack", "coding"] },
      { title: "The Clean Coder & Agile Craftsman", brand: "DevPress", price: 38.00, discount: 0.0, rating: 4.9, stock: 95, tags: ["best-practices", "software", "career", "agile"] },
      { title: "Hardcover 160 GSM Dotted Bullet Journal", brand: "ArtisanPaper", price: 23.99, discount: 10.0, rating: 4.8, stock: 110, tags: ["notebook", "bullet-journal", "stationery", "paper"] },
      { title: "Handcrafted Matte Black Fountain Pen Set", brand: "NobleQuill", price: 45.00, discount: 15.0, rating: 4.7, stock: 70, tags: ["pen", "fountain-pen", "calligraphy", "gift"] },
      { title: "Dual-Sided Eco Leather & Felt Desk Mat", brand: "DeskArmor", price: 29.99, discount: 8.0, rating: 4.7, stock: 130, tags: ["desk-mat", "stationery", "leather", "office"] },
      { title: "Precision Mechanical Drafting Pencil 0.5mm", brand: "Grafix", price: 16.50, discount: 0.0, rating: 4.6, stock: 140, tags: ["pencil", "drafting", "sketching", "drawing"] },
      { title: "Rechargeable Warm Amber LED Book Light", brand: "LuminaRead", price: 18.99, discount: 5.0, rating: 4.8, stock: 115, tags: ["reading", "book-light", "rechargeable", "gadget"] },
      { title: "Weekly Undated Focus & Productivity Planner", brand: "ZenithGoals", price: 27.50, discount: 12.0, rating: 4.7, stock: 90, tags: ["planner", "productivity", "organization", "journal"] },
      { title: "Erasable Dual-Tip Gel Ink Pens 8-Pack", brand: "ColorFlow", price: 14.99, discount: 0.0, rating: 4.5, stock: 150, tags: ["pens", "gel-pens", "erasable", "stationery"] }
    ]
  },
  {
    name: "Toys & Games",
    prefix: "TOYS",
    items: [
      { title: "6-Axis Robotic Arm STEM Coding Kit", brand: "RoboMaker", price: 119.99, discount: 15.0, rating: 4.8, stock: 35, tags: ["stem", "robotics", "coding", "educational"] },
      { title: "Hand-Carved Walnut & Maple Chess Set", brand: "Grandmaster", price: 95.00, discount: 10.0, rating: 4.9, stock: 40, tags: ["chess", "board-game", "woodwork", "classic"] },
      { title: "Celestial Galaxy 1000-Piece Panoramic Puzzle", brand: "PuzzlePinnacle", price: 21.99, discount: 0.0, rating: 4.7, stock: 85, tags: ["puzzle", "jigsaw", "galaxy", "family"] },
      { title: "SkyExplorer 1080p Foldable Mini Drone", brand: "AeroFly", price: 79.99, discount: 20.0, rating: 4.4, stock: 60, tags: ["drone", "camera", "rc", "quadcopter"] },
      { title: "Settlers of Terra Strategy Board Game", brand: "MythosGames", price: 54.00, discount: 12.0, rating: 4.9, stock: 75, tags: ["board-game", "tabletop", "strategy", "multiplayer"] },
      { title: "Magnetic Geometry 3D Building Blocks 100pcs", brand: "MagnaShape", price: 46.99, discount: 10.0, rating: 4.8, stock: 90, tags: ["magnetic-tiles", "building", "toddler", "creative"] },
      { title: "High-Speed All-Terrain RC Monster Buggy", brand: "VeloceRC", price: 68.50, discount: 15.0, rating: 4.5, stock: 55, tags: ["rc-car", "off-road", "hobby", "remote-control"] },
      { title: "Young Scientist 50+ Chemistry Experiments Lab", brand: "StemLab", price: 39.99, discount: 5.0, rating: 4.7, stock: 70, tags: ["science", "chemistry", "experiments", "learning"] },
      { title: "Solid Beechwood Magnetic Train Railway Set", brand: "WoodWhimsy", price: 62.00, discount: 8.0, rating: 4.9, stock: 45, tags: ["train-set", "wooden-toys", "kids", "classic"] },
      { title: "Micro Programmable Rover with Ultrasonic Sensor", brand: "RoboMaker", price: 49.99, discount: 10.0, rating: 4.6, stock: 50, tags: ["stem", "robot", "sensor", "arduino"] }
    ]
  },
  {
    name: "Gourmet Food & Beverages",
    prefix: "FOOD",
    items: [
      { title: "Ethiopian Yirgacheffe Single-Origin Coffee Beans 1kg", brand: "RoastMaster", price: 34.00, discount: 0.0, rating: 4.9, stock: 80, tags: ["coffee", "single-origin", "artisan", "beverage"] },
      { title: "Ceremonial Grade Uji Matcha Green Tea 100g", brand: "ZenTea", price: 32.50, discount: 10.0, rating: 4.8, stock: 65, tags: ["matcha", "green-tea", "japanese", "organic"] },
      { title: "Cold-Pressed Extra Virgin Kalamata Olive Oil 1L", brand: "OlympusGroves", price: 29.99, discount: 5.0, rating: 4.9, stock: 90, tags: ["olive-oil", "gourmet", "cooking", "mediterranean"] },
      { title: "Raw Wildflower Honey with Honeycomb 500g", brand: "BeeHaven", price: 18.50, discount: 0.0, rating: 4.8, stock: 110, tags: ["honey", "raw", "natural", "sweetener"] },
      { title: "Artisanal Single-Origin Dark Chocolate Gift Box 12pcs", brand: "ChocoLuxe", price: 28.00, discount: 12.0, rating: 4.7, stock: 75, tags: ["chocolate", "sweets", "gift", "gourmet"] },
      { title: "Himalayan Pink Rock Salt Adjustable Mill", brand: "SpiceOrigin", price: 14.99, discount: 0.0, rating: 4.6, stock: 140, tags: ["salt", "seasoning", "cooking", "kitchen"] },
      { title: "Traditional Modena Balsamic Vinegar 12-Year Aged", brand: "AcetoPrestigio", price: 48.00, discount: 8.0, rating: 4.9, stock: 40, tags: ["balsamic", "italian", "condiment", "aged"] },
      { title: "Organic Chamomile & Lavender Herbal Sleep Tea 40 Bags", brand: "ZenTea", price: 16.99, discount: 0.0, rating: 4.7, stock: 120, tags: ["tea", "herbal", "sleep", "wellness"] },
      { title: "Smoked Barbecue Spice Rub Sampler Pack of 4", brand: "GrillFather", price: 22.50, discount: 10.0, rating: 4.8, stock: 95, tags: ["bbq", "spices", "rub", "grilling"] },
      { title: "Pure Canadian Grade A Amber Maple Syrup 500ml", brand: "NorthMaple", price: 19.99, discount: 5.0, rating: 4.9, stock: 100, tags: ["maple-syrup", "breakfast", "organic", "sweetener"] }
    ]
  },
  {
    name: "Office & Workstation",
    prefix: "OFFC",
    items: [
      { title: "ErgoComfort High-Back Mesh Desk Chair", brand: "ErgoLogic", price: 289.00, discount: 15.0, rating: 4.8, stock: 35, tags: ["chair", "ergonomic", "office", "lumbar-support"] },
      { title: "Heavy-Duty Dual Monitor Gas Spring Arm Mount", brand: "DeskArmor", price: 79.99, discount: 10.0, rating: 4.7, stock: 65, tags: ["monitor-mount", "dual-screen", "desk-setup", "ergonomic"] },
      { title: "Electric Height Adjustable Motorized Standing Desk", brand: "ApexLift", price: 429.00, discount: 18.0, rating: 4.9, stock: 20, tags: ["standing-desk", "ergonomic", "motorized", "workspace"] },
      { title: "Under-Desk Steel Cable Management Spine & Tray", brand: "CableTidy", price: 29.95, discount: 0.0, rating: 4.6, stock: 110, tags: ["cable-management", "desk-accessory", "organization"] },
      { title: "Ventilated Aluminum Laptop Riser Stand", brand: "LiftPro", price: 36.00, discount: 8.0, rating: 4.8, stock: 95, tags: ["laptop-stand", "aluminum", "ergonomic", "portable"] },
      { title: "Architect Eye-Care LED Desk Lamp with USB Port", brand: "LumaWork", price: 45.99, discount: 12.0, rating: 4.7, stock: 85, tags: ["lamp", "lighting", "eye-care", "desk"] },
      { title: "Ergonomic Angled Footrest with Massage Texture", brand: "ErgoLogic", price: 34.50, discount: 5.0, rating: 4.5, stock: 100, tags: ["footrest", "ergonomic", "office-comfort"] },
      { title: "Noise-Cancelling USB-C Conference Speakerphone", brand: "VoiceLink", price: 119.00, discount: 10.0, rating: 4.6, stock: 45, tags: ["speakerphone", "conference", "zoom", "microphone"] },
      { title: "Multi-Port Aluminum 7-in-1 USB-C Hub & Dock", brand: "VoltCore", price: 49.99, discount: 15.0, rating: 4.7, stock: 90, tags: ["usb-c", "hub", "hdmi", "dock"] },
      { title: "Broadcast USB Condenser Studio Microphone", brand: "AudioStream", price: 89.99, discount: 12.0, rating: 4.8, stock: 55, tags: ["microphone", "podcast", "streaming", "audio"] }
    ]
  },
  {
    name: "Automotive & Travel",
    prefix: "AUTO",
    items: [
      { title: "Magnetic MagSafe Qi Wireless Car Mount & Charger", brand: "DriveTech", price: 39.99, discount: 10.0, rating: 4.7, stock: 100, tags: ["car-mount", "wireless-charger", "magsafe", "phone"] },
      { title: "Smart Digital Cordless Tire Inflator 150 PSI", brand: "AirForge", price: 59.99, discount: 15.0, rating: 4.8, stock: 75, tags: ["tire-inflator", "air-pump", "emergency", "portable"] },
      { title: "Dual 4K Front & 1080p Rear Dash Camera with GPS", brand: "RoadSentry", price: 139.00, discount: 20.0, rating: 4.6, stock: 45, tags: ["dashcam", "car-camera", "safety", "gps"] },
      { title: "Professional 12-Piece Auto Detailing Brush & Wash Kit", brand: "ShineArmor", price: 34.50, discount: 8.0, rating: 4.7, stock: 85, tags: ["detailing", "car-wash", "cleaning", "brushes"] },
      { title: "Heavy-Duty All-Weather Deep Dish Floor Mats Set", brand: "ToughTread", price: 69.99, discount: 10.0, rating: 4.5, stock: 50, tags: ["floor-mats", "car-interior", "waterproof", "rubber"] },
      { title: "Bluetooth 5.3 FM Transmitter & Fast Car Charger", brand: "DriveTech", price: 21.99, discount: 0.0, rating: 4.6, stock: 130, tags: ["fm-transmitter", "bluetooth", "car-charger", "audio"] },
      { title: "Collapsible Heavy-Duty Trunk Organizer with Cooler", brand: "PackSmart", price: 42.00, discount: 12.0, rating: 4.8, stock: 70, tags: ["trunk-organizer", "storage", "car-accessories", "cooler"] },
      { title: "Waterproof Scratch-Proof Pet Seat Cover Hammock", brand: "PawTraveler", price: 38.99, discount: 15.0, rating: 4.8, stock: 80, tags: ["pet-cover", "dog-seat", "waterproof", "travel"] },
      { title: "2000A Peak Portable Car Battery Jump Starter Pack", brand: "VoltCore", price: 89.95, discount: 18.0, rating: 4.9, stock: 60, tags: ["jump-starter", "power-bank", "emergency", "battery"] },
      { title: "Ultra-Plush Microfiber Drying Towels 3-Pack 1200GSM", brand: "ShineArmor", price: 19.99, discount: 0.0, rating: 4.7, stock: 125, tags: ["microfiber", "drying-towel", "car-detailing", "cleaning"] }
    ]
  }
];

let globalId = 1;
const allProducts = [];

const baseDate = new Date('2025-01-01T08:00:00.000Z');

categories.forEach((cat) => {
  cat.items.forEach((item, index) => {
    const itemNumber = index + 1;
    const sku = `${cat.prefix}-${String(itemNumber).padStart(3, '0')}`;
    const creationDate = new Date(baseDate.getTime() + globalId * 86400000 * 2.5).toISOString();
    
    allProducts.push({
      id: globalId,
      title: item.title,
      description: `High performance ${item.title.toLowerCase()} crafted by ${item.brand}. Engineered for premium reliability, optimal ergonomics, and long-lasting durability in the ${cat.name} category.`,
      category: cat.name,
      price: item.price,
      discountPercentage: item.discount,
      rating: item.rating,
      stock: item.stock,
      brand: item.brand,
      sku: sku,
      tags: item.tags,
      warrantyInformation: item.price > 100 ? "2-year comprehensive manufacturer warranty" : "1-year standard warranty",
      returnPolicy: "30-day hassle-free return policy",
      thumbnail: `https://images.unsplash.com/photo-placeholder-${globalId}?auto=format&fit=crop&w=400&q=80`,
      images: [
        `https://images.unsplash.com/photo-placeholder-${globalId}-1?auto=format&fit=crop&w=800&q=80`,
        `https://images.unsplash.com/photo-placeholder-${globalId}-2?auto=format&fit=crop&w=800&q=80`
      ],
      createdAt: creationDate
    });
    globalId++;
  });
});

console.log(`Generated ${allProducts.length} products.`);

const outputPath = path.join(__dirname, 'src', 'data', 'products.json');
fs.writeFileSync(outputPath, JSON.stringify(allProducts, null, 2), 'utf-8');
console.log(`Written products to ${outputPath}`);
