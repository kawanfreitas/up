var customCheckoutButton = document.getElementById('spaceCheckoutButton');

if (customCheckoutButton) {
    customCheckoutButton.addEventListener('click', function (event) {
        event.preventDefault(); // Impede o comportamento padrão

        // Obter os dados do carrinho
        fetch('/cart.js')
            .then(response => response.json())
            .then(cart => {
                // Converter os dados do carrinho em uma string de parâmetros de URL
                const params = new URLSearchParams();
                params.append('cart', JSON.stringify(cart));

                // Construir a URL com os parâmetros
                const url = `https://dev-pay.spacefy.com.br/shopify?${params.toString()}`;

                // Fazer a requisição GET
                fetch(url, {
                    method: 'GET'
                })
                    .then(response => {
                        window.location.href = 'https://dev-pay.spacefy.com.br/checkout';
                    })
                    .catch(error => {
                        console.error('Erro ao obter o carrinho:', error);
                    });
            })
            .catch(error => {
                console.error('Erro ao obter o carrinho:', error);
            });
    });
}

function postAjax(url, data, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
        function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
        }
    ).join('&');

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('GET', url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState > 3 && xhr.status == 200) {
            success(xhr.responseText);
        }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(params);

    return xhr;
}