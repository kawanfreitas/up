document.addEventListener("DOMContentLoaded", function() {
    // Seleciona todos os botões de finalizar compra na página
    var checkoutButtons = document.querySelectorAll('button[name="checkout"], input[name="checkout"]');

    // Itera sobre todos os botões encontrados
    checkoutButtons.forEach(function(button) {
        // Cria um novo botão personalizado
        var customCheckoutButton = document.createElement('button');
        customCheckoutButton.textContent = 'Finalizar compra'; // Define o texto do botão
        customCheckoutButton.style.backgroundColor = '#007bff'; // Altera a cor de fundo do botão
        customCheckoutButton.style.color = '#ffffff'; // Altera a cor do texto do botão
        // Adicione mais estilos conforme desejado
    });


    checkoutButtons.addEventListener('click', function (event) {
        event.preventDefault(); // Impede o comportamento padrão

        // Obter os dados do carrinho
        fetch('/cart.js')
            .then(response => response.json())
            .then(cart => {
                var customCheckoutUrl = 'https://dev-pay.spacefy.com.br/checkout?cart=' + encodeURIComponent(JSON.stringify(cart));
                window.location.href = customCheckoutUrl;
            })
            .catch(error => {
                console.error('Erro ao obter os dados do carrinho:', error);
                window.location.href = '/checkout';
            });
    });
}