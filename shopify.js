let checkoutButtons = document.querySelectorAll('button[name="checkout"], input[name="checkout"]');

// Itera sobre todos os botões encontrados
checkoutButtons.forEach(function(button) {
    // Cria um novo botão personalizado
    let customCheckoutButton = document.createElement('button');
    customCheckoutButton.textContent = 'Finalizar compra';
    customCheckoutButton.className = 'cart__checkout-button button'

    customCheckoutButton.addEventListener('click', function (event) {
        event.preventDefault(); // Impede o comportamento padrão

        // Obter os dados do carrinho
        fetch('/cart.js')
            .then(response => response.json())
            .then(cart => {
                window.location.href = 'https://dev-pay.spacefy.com.br/checkout?cart=' + encodeURIComponent(JSON.stringify(cart));
            })
            .catch(error => {
                console.error('Erro ao obter os dados do carrinho:', error);
                window.location.href = '/checkout';
            });
    });

    button.parentNode.replaceChild(customCheckoutButton, button);
});
