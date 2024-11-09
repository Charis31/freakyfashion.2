const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const router = express.Router();

const dbPath = path.join(__dirname, '../db/product-management.db');

// GET route to serve the new product form
router.get('/', (req, res) => {
    res.render('admin/products/new'); // Adjust this path if needed to match the location of new.ejs
});

// POST route to handle form submissions and add a new product
router.post('/', (req, res) => {
    const { name, imageUrl, brand, SKU, pris } = req.body;

    // Append 'SEK' to the price
    const formattedPrice = `${pris} SEK`; // Append SEK to the price

    const sql = `
        INSERT INTO products (product_name, item_url, brand, SKU, pris)
        VALUES (?, ?, ?, ?, ?)
    `;

    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: err.message });
        }
    });

    db.run(sql, [name, imageUrl, brand, SKU, formattedPrice], function (error) {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: error.message });
        }
       

        // Respond with success status
        res.status(201).json({ message: 'Product added successfully' });
    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("Database connection closed.");
        }
    });
});


module.exports = router;
