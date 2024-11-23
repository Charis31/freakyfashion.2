document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('load-products-btn').addEventListener('click', () => {
    fetch('/admin/api/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(products => {
        const productTableBody = document.querySelector('#product-table tbody');
        productTableBody.innerHTML = ''; // Clear existing rows

        // Populate table with products
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
        console.error('There was a problem with the fetch operation:', error);
      });
  });
});