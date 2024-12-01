document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = {
        name: formData.get("name"),
        beskrivning: formData.get("beskrivning"),
        brand: formData.get("brand"),
        SKU: formData.get("SKU"),
        pris: formData.get("pris")
    };

    fetch('/admin/products/new', {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            window.location.href = '/admin/products';
        } else {
            alert('Något gick fel. Kontrollera formuläret och försök igen.');
        }
    })
    .catch(() => {
        alert('Kunde inte skicka data. Kontrollera din anslutning och försök igen.');
    });
});


 