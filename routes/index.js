// routes/index.js
var express = require('express');
var router = express.Router();

//product data
const products = [
  { id: "Svart-T-Shirt",
    name: "Svart T-Shirt", 
    price: 199, 
    brand: "Levis", 
    imageUrl: "https://placehold.co/300x500/000000/FFF?text=Svart T-Shirt" },
 
   { id: "Stickad-tröja", 
     name: "Stickad tröja", 
     price: 399, brand: "Holister Co.", 
     imageUrl: "https://placehold.co/300x500/F5F5DC/FFF?text=Stickad tröja" },
  
  { id: "Sweatshirt", 
    name: "Sweatshirt", 
    price: 279, brand: "Friboo", 
    imageUrl: "https://placehold.co/300x500/000080/FFF?text=Sweatshirt" },
  
  { id: "Orange-Top-Tank", 
    name: "Orange Top-Tank", 
    price: 99, brand: "Adidas", 
    imageUrl: "https://placehold.co/300x500/FFA500/FFF?text=Orange Top-Tank" },
  
  { id: "Svart-Jacka", 
    name: "Svart Jacka", 
    price: 399, brand: "Pier One", 
    imageUrl: "https://placehold.co/300x500/000000/FFF?text=Svart Jacka" },

  { id: "Pique-Shirt", 
    name: "Pique Shirt", 
    price: 119, 
    brand: "Gant", 
    imageUrl: "https://placehold.co/300x500/ADD8E6/FFF?text=Pique Shirt" },
 
  { id: "Kappa", 
    name: "Kappa", 
    price: 499, 
    brand: "Toppman", 
    imageUrl: "https://placehold.co/300x500/060607/FFF?text=Lång-Kappa" },
  
  { id: "Rosa-T-Shirt", 
    name: "Rosa T-Shirt", 
    price: 99, 
    brand: "Berhska", 
    imageUrl: "https://placehold.co/300x500/FF69B4/FFF?text=Rosa T-Shirt" },
];

// Route to render the index page with product data
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Freaky Fashion', products });
});

// Route to render product details
/*
router.get('/product/:id', function(req, res, next) {
  const productId = req.params.id; // Get the product ID from the URL
  const product = products.find(p => p.id === productId); // Find the product in the array

  if (product) {
    res.render('product-details', { product }); // Render product details page with the product data
  } else {
    res.status(404).send('Product not found'); // Handle product not found case
  }
}); */
// Route to render product details
router.get('/product/:id', function(req, res, next) {
  const productId = req.params.id; // Get the product ID from the URL
  const product = products.find(p => p.id === productId); // Find the product in the array

  if (product) {
    // Function to get 3 random products
    const getRandomProducts = (num) => {
      // Filter out the current product from the products array
      const filteredProducts = products.filter(p => p.id !== productId);
      
      // Shuffle the filtered products array
      const shuffled = filteredProducts.sort(() => 0.5 - Math.random());
      
      // Return up to 'num' random products
      return shuffled.slice(0, Math.min(num, filteredProducts.length)); 
    };

    const similarProducts = getRandomProducts(3); // Get 3 random similar products

    // Ensure we have at least 3 products by filling with any remaining products if less than 3 are available
    while (similarProducts.length < 3) {
      const additionalProduct = products.find(p => p.id !== productId && !similarProducts.includes(p));
      if (additionalProduct) similarProducts.push(additionalProduct);
    }

    res.render('product-details', { product, similarProducts }); // Pass similar products to the template
  } else {
    res.status(404).send('Product not found'); // Handle product not found case
  }
});


module.exports = router;