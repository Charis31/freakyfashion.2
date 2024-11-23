document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Förhindra att formuläret skickas på det vanliga sättet

    // Samla in data från formuläret
    const formData = {
        name: document.getElementById('name').value,
        Beskrivning: document.getElementById('Beskrivning').value,
        brand: document.getElementById('brand').value,
        SKU: document.getElementById('SKU').value,
        pris: document.getElementById('pris').value
    };

    // Skicka POST-anrop till backend
    fetch('/admin/products/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Något gick fel: ' + response.statusText);
        }
        return response.json(); // Vi kan hantera svar som JSON
    })
    .then(data => {
        // Omdirigera till produktlistan efter att produkten har lagrats
        window.location.href = '/admin/products';
    })
    .catch(error => {
        console.error('Det uppstod ett fel:', error);
        alert('Fel vid inlämning av formuläret. Vänligen försök igen.'); // Visa ett felmeddelande
    });
});