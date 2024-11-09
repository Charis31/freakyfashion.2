// public/javascripts/form-submit.js

document.getElementById('product-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Gather form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/admin/products/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            // Redirect to products list page on successful submission
            window.location.href = '/admin/products';
        } else {
            console.error('Failed to add product:', response.statusText);
            alert('Error adding product. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});