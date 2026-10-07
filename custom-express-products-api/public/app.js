const baseUrl = '/api/products';
let currentPage = 1;
let selectedCategory = '';
let selectedSort = 'id';
let selectedOrder = 'asc';
let pageSize = 10;

const productGrid = document.getElementById('productGrid');
const categoryList = document.getElementById('categoryList');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const applyFilters = document.getElementById('applyFilters');
const minPrice = document.getElementById('minPrice');
const maxPrice = document.getElementById('maxPrice');
const sortBy = document.getElementById('sortBy');
const sortOrder = document.getElementById('sortOrder');
const prevPage = document.getElementById('prevPage');
const nextPage = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');
const resultCount = document.getElementById('resultCount');
const totalProducts = document.getElementById('totalProducts');
const avgPrice = document.getElementById('avgPrice');
const categoriesCount = document.getElementById('categoriesCount');
const totalStock = document.getElementById('totalStock');

async function loadCategories() {
  const res = await fetch(`${baseUrl}/categories`);
  const data = await res.json();
  const categories = data.data || [];

  categoryList.innerHTML = '';

  const all = document.createElement('button');
  all.className = 'category-chip' + (!selectedCategory ? ' active' : '');
  all.innerText = 'All';
  all.addEventListener('click', () => {
    selectedCategory = '';
    loadProducts();
    loadCategories();
  });
  categoryList.appendChild(all);

  for (const cat of categories) {
    const btn = document.createElement('button');
    btn.className = 'category-chip' + (selectedCategory === cat.name ? ' active' : '');
    btn.innerText = cat.name;
    btn.addEventListener('click', () => {
      selectedCategory = cat.name;
      loadProducts();
      loadCategories();
    });
    categoryList.appendChild(btn);
  }
}

async function loadStats() {
  const res = await fetch(`${baseUrl}/stats`);
  const data = await res.json();
  const stats = data.data;

  totalProducts.textContent = stats.totalProducts;
  avgPrice.textContent = `$${stats.averagePrice}`;
  categoriesCount.textContent = stats.categoriesCount || stats.categoriesCount;
  totalStock.textContent = stats.totalStock;
}

async function loadProducts() {
  const query = new URLSearchParams();
  const keyword = searchInput.value.trim();
  const priceMin = Number(minPrice.value || 0);
  const priceMax = Number(maxPrice.value || 500);

  if (keyword) query.set('q', keyword);
  if (selectedCategory) query.set('category', selectedCategory);
  if (priceMin >= 0) query.set('minPrice', priceMin);
  if (priceMax > 0) query.set('maxPrice', priceMax);
  query.set('page', currentPage);
  query.set('limit', pageSize);
  query.set('sortBy', selectedSort);
  query.set('order', selectedOrder);

  const res = await fetch(`${baseUrl}?${query.toString()}`);
  const payload = await res.json();

  if (!payload.success) {
    productGrid.innerHTML = '<p class="empty">No products found.</p>';
    return;
  }

  resultCount.textContent = payload.total;
  pageInfo.textContent = `Page ${payload.page} / ${payload.totalPages}`;
  prevPage.disabled = payload.page <= 1;
  nextPage.disabled = payload.page >= payload.totalPages;

  productGrid.innerHTML = '';

  for (const product of payload.data) {
    const card = document.createElement('article');
    card.className = 'product-card';

    const img = document.createElement('div');
    img.className = 'product-image';
    img.style.backgroundImage = `url('${product.thumbnail || product.images?.[0]}')`;

    const category = document.createElement('div');
    category.className = 'product-category';
    category.innerText = product.category;

    const title = document.createElement('h3');
    title.innerText = product.title;

    const description = document.createElement('div');
    description.className = 'product-description';
    description.innerText = product.description;

    const meta = document.createElement('div');
    meta.className = 'product-meta';

    const price = document.createElement('div');
    price.className = 'product-price';
    price.innerText = `$${product.price}`;

    const rating = document.createElement('div');
    rating.className = 'product-rating';
    rating.innerText = `★ ${product.rating}`;

    meta.append(price, rating);
    card.append(img, category, title, description, meta);
    productGrid.appendChild(card);
  }
}

searchButton.addEventListener('click', () => {
  currentPage = 1;
  loadProducts();
});

applyFilters.addEventListener('click', () => {
  currentPage = 1;
  loadProducts();
});

sortBy.addEventListener('change', () => {
  selectedSort = sortBy.value;
  currentPage = 1;
  loadProducts();
});

sortOrder.addEventListener('change', () => {
  selectedOrder = sortOrder.value;
  currentPage = 1;
  loadProducts();
});

prevPage.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage -= 1;
    loadProducts();
  }
});

nextPage.addEventListener('click', () => {
  currentPage += 1;
  loadProducts();
});

loadCategories();
loadStats();
loadProducts();
