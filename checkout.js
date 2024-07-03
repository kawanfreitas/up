var customCheckoutButton = document.getElementById('spaceCheckoutButton');

if (customCheckoutButton) {
    customCheckoutButton.addEventListener('click', function (event) {
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