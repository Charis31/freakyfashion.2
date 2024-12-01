const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const router = express.Router();
const dbPath = path.join(__dirname, "../db/product-management.db");


// Route to render the admin.ejs page
router.get('/products', (req, res) => {
    res.render("admin/products/admin"); 
});

// API route to get products as JSON data
router.get("/api/products", (req, res) => {
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error("Error opening database:", err.message);
            return res.status(500).json({ error: "Database connection failed" });
        }
    });

    const sql = `SELECT brand, product_name, SKU, pris FROM products`;

    db.all(sql, [], (error, rows) => {
        if (error) {
            console.error("Error fetching products:", error.message);
            return res.status(500).json({ error: "Error fetching products" });
        }

        res.json(rows); // Send JSON response

        db.close((err) => {
            if (err) console.error("Error closing database:", err.message);
        });
    });
});

module.exports = router;

