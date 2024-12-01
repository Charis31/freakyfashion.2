document.getElementById('load-products-btn').addEventListener('click', () => {
  
  fetch('/admin/api/products')
    .then(response => {
      if (!response.ok) {
        alert('Det gick inte att ladda produkter!');
        return;
      }
      return response.json();
    })
    .then(products => {
     const productTableBody = document.querySelector('#product-table tbody');
      productTableBody.innerHTML = ''; 

      products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${product.brand}</td>
          <td>${product.product_name}</td>
          <td>${product.SKU}</td>
          <td>${product.pris}</td>
        `;  
        productTableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Ett oväntat fel uppstod vid inläsning av produkter:', error);
      alert('Ett fel inträffade. Försök igen senare.');
    });
});