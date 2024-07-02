var customCheckoutButton = document.getElementById('spaceCheckoutButton');

if (customCheckoutButton) {
    customCheckoutButton.addEventListener('click', function (event) {
        event.preventDefault(); // Impede o comportamento padrão

        // Pegar os dados do carrinho usando API Ajax da Shopify
        fetch('/cart.js')
            .then(response => response.json())
            .then(cart => {
                // URL do seu checkout personalizado
                var customCheckoutUrl = 'https://dev.spacefy.com.br/checkout';

                // Enviar dados do carrinho via AJAX para o checkout personalizado
                postAjax(customCheckoutUrl, JSON.stringify(cart), function (response) {
                    console.log('Resposta do checkout personalizado:', response);
                    // Aqui você pode lidar com a resposta do seu checkout personalizado
                    // Por exemplo, redirecionar o usuário após o processamento do checkout
                    // window.location.href = 'https://seu-dominio.com/checkout-success';
                });
            })
            .catch(error => {
                console.error('Erro ao pegar os dados do carrinho:', error);
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
    xhr.open('POST', url);
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