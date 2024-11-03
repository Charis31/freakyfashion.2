// Radera studerande baserat på personnummer
 
// 1 - Importera/hämta in moduler som behövs
const sqlite3 = require("sqlite3").verbose();
const prompt = require("prompt-sync")();
 
// 2 - Skapa db-objekt - vi använder detta för att kommunicera med databasen
const db = new sqlite3.Database(
  "../product-management.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err.message);
  }
);
 
// 3 - Förbered SQL som ska köras mot databasen
 
const sql = `
    DELETE FROM products
          WHERE brand = ?
    );
`;
 
// 4 - Hämta in värden från användaren
// Behöver paket som låter oss interagera med användaren
// npm install prompt-sync
 
const brand = prompt("Brand: ");

 
// 5 - Kör SQL-kommando
 
// Använd db.run() för att köra SQL INSERT INTO, UPDATE och DELETE
db.run(sql, [brand], function (error) {
   
    if (error) console.error(error);
 
    console.log("Product raderad");
 
});