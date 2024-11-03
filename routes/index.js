var express = require('express');
var router = express.Router();

//product data
const products = [
  { id: "Creme T-Shirt",
    name: "Creme T-Shirt", 
    SKU: "CRSH-2233-901M",
    price: 199, 
    brand: "Levis", 
    imageUrl: "https://placehold.co/450x700/FFFDD0/FFF?text=Creme T-Shirt" },
 
   { id: "Stickad-tröja", 
     name: "Stickad tröja", 
     SKU: "STTR-1442-807L",
     price: 399, 
     brand: "Holister Co.", 
     imageUrl: "https://placehold.co/450x700/F5F5DC/FFF?text=Stickad tröja" },
  
  { id: "Sweatshirt", 
    name: "Sweatshirt", 
    SKU: "SWSH-3121-981XL",
    price: 279, 
    brand: "Friboo", 
    imageUrl: "https://placehold.co/450x700/000080/FFF?text=Sweatshirt" },
  
  { id: "Orange-Top-Tank", 
    name: "Orange Top-Tank", 
    SKU: "ORTT-0124-703S",
    price: 99, 
    brand: "Adidas", 
    imageUrl: "https://placehold.co/450x700/FFA500/FFF?text=Orange Top-Tank" },
  
  { id: "Grå-Jacka", 
    name: "Grå Jacka", 
    SKU: "GRJK-1930-741M",
    price: 399, 
    brand: "Pier One", 
    imageUrl: "https://placehold.co/450x700/9C9E9A/FFF?text=Grå Jacka" },

  { id: "Pique-Shirt", 
    name: "Pique Shirt", 
    SKU: "PQSH-4451-109S",
    price: 119, 
    brand: "Gant", 
    imageUrl: "https://placehold.co/450x700/ADD8E6/FFF?text=Pique Shirt" },
 
  { id: "Navy-Bl-Kappa", 
    name: "Navy Blue Kappa",
    SKU: "NBKP-8893-451L", 
    price: 499, 
    brand: "Toppman", 
    imageUrl: "https://placehold.co/450x700/000080/FFF?text=Navy Blue Kappa" },
  
  { id: "Rosa-T-Shirt", 
    name: "Rosa T-Shirt", 
    SKU: "RSTS-1090-705S",
    price: 99, 
    brand: "Berhska", 
    imageUrl: "https://placehold.co/450x700/FF69B4/FFF?text=Rosa T-Shirt" },
];

// Route to render the index page with product data
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Freaky Fashion', products });
});


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