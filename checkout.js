document.addEventListener('DOMContentLoaded', function() {
    const checkoutButton = document.querySelector('button[name="checkout"]');

    if (checkoutButton) {
        checkoutButton.addEventListener('click', function(event) {
            event.preventDefault();
            var cartContents = fetch(window.Shopify.routes.root + 'cart.js')
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    alert('teste')
                });
        });
    }
});