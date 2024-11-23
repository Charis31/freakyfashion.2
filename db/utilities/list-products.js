
const sqlite3 = require("sqlite3").verbose();
 
// 3 - Skapa db-objekt - vi använder detta för att kommunicera med databasen
const db = new sqlite3.Database(
  "../product-management.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err.message);
  }
);
 
// 4 - Förbered SQL som ska köras mot databasen
 
const sql = `
   SELECT brand,
          product_name,
          SKU,
          pris
          
     FROM products
`;
 
// 5 - Kör SQL-kommando
 
db.all(sql, [], function (error, rows) {
   

    rows.forEach(row => {
        console.log(row.brand + ", " +row.product_name + ", " + row.SKU + ", " + row.pris + "SEK" );
    });
 
});