
// Importing required modules
const express = require('express');
const bodyParser = require('body-parser');

// Initializing the app
const app = express();
const PORT = 3000;

// In-memory product storage
let products = [
  {
    name: 'laptop',
    id: '1',
    price: '40000',
    category: 'Digital',
    manufacturingDate: '2024-06-03',
    expDate: '2035-01-30',
  },
  {
    name: 'Mobile',
    id: '2',
    price: '15000',
    category: 'Digital',
    manufacturingDate: '2024-11-05',
    expDate: '2028-06-30',
  },
];

// Configuring middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Setting view engine to serve HTML files
app.set('view engine', 'ejs');

// Home page route
app.get('/', (req, res) => {
  res.render('index');
});

// Admin login route
app.get('/admin-login', (req, res) => {
  res.render('admin-login');
});

// User login route
app.get('/user-login', (req, res) => {
  res.render('user-login');
});

// Admin dashboard to register products
app.get('/admin-dashboard', (req, res) => {
  res.render('admin-dashboard', { products });
});

// Registering a new product
app.post('/register-product', (req, res) => {
  const { name, id, price, category, manufacturingDate, expDate } = req.body;
  products.push({ name, id, price, category, manufacturingDate, expDate });
  res.redirect('/admin-dashboard');
});

// User product search
app.get('/search-products', (req, res) => {
  const { name, category } = req.query;
  let filteredProducts = products;

  if (name) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (category) {
    filteredProducts = filteredProducts.filter((product) =>
      product.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  res.render('search-results', { products: filteredProducts });
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
