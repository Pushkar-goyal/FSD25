const fs = require('fs');
const path = require('path');

const categories = [
  'Electronics', 'Clothing', 'Home', 'Beauty', 'Books', 'Sports', 'Grocery', 'Office', 'Toys', 'Accessories'
];

const brands = [
  'Aster', 'Bright', 'Casa', 'Core', 'Ever', 'Flex', 'Glow', 'Nova', 'Peak', 'Zen'
];

const titleWords = [
  'Alpha', 'Modern', 'Classic', 'Smart', 'Daily', 'Compact', 'Pro', 'Urban', 'Pure', 'Essential'
];

function makeProduct(id) {
  const category = categories[(id - 1) % categories.length];
  const brand = brands[(id - 1) % brands.length];
  const word = titleWords[(id - 1) % titleWords.length];
  const price = 20 + ((id * 17) % 480);
  const rating = Number((3.5 + ((id * 7) % 16) / 10).toFixed(1));
  const stock = (id * 3) % 80 + 5;

  return {
    id,
    title: `${word} ${category} ${id}`,
    description: `${word} ${category} product designed for reliable daily use and long-lasting performance.`,
    category,
    price,
    discountPercentage: (id % 25) + 5,
    rating,
    stock,
    brand,
    sku: `SKU-${String(id).padStart(4, '0')}`,
    tags: [category.toLowerCase(), brand.toLowerCase(), 'new'],
    warrantyInformation: '1 year limited warranty',
    returnPolicy: '30 day return policy',
    thumbnail: `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80`,
    images: [
      `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80`
    ],
    createdAt: new Date().toISOString(),
  };
}

const products = Array.from({ length: 100 }, (_, i) => makeProduct(i + 1));

const outPath = path.join(__dirname, '..', 'src', 'data', 'products.json');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(products, null, 2));

console.log(`Seeded ${products.length} products at ${outPath}`);
