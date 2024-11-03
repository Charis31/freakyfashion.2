const express = require("express");
const path = require("path");
const router = express.Router();

// Serve the new product page
router.get('/', (req, res) => {
    res.render('admin/products/new'); // This should point to the correct EJS file
});

// Handle the POST request to add a new product
router.post('/', (req, res) => {
    // Extract form data from the request body
    const { name, Beskrivning, SKU, pris } = req.body; // Ensure these match your form field names

    // Database insert logic
    const sql = `
        INSERT INTO products (product_name, Beskrivning, SKU, pris)
        VALUES (?, ?, ?, ?)
    `;

    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: err.message });
        }
    });

    db.run(sql, [name, Beskrivning, SKU, pris], function (error) {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: error.message });
        }

        res.redirect('/admin/products'); // Redirect after a successful insertion
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