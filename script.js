document.addEventListener('DOMContentLoaded', function() {
    const telefone = '5541998278767';

    // Controle de quantidade
    document.querySelectorAll('.btn-quantidade').forEach(botao => {
        botao.addEventListener('click', function() {
            const input = this.parentNode.querySelector('.quantidade-input');
            let valor = parseInt(input.value);
            if (this.classList.contains('mais') && valor < 20) valor++;
            if (this.classList.contains('menos') && valor > 1) valor--;
            input.value = valor;
        });
    });

    // Armazenar localização opcional
    let ultimaLocalizacao = '';

    document.querySelectorAll('.btn-localizacao').forEach(botao => {
        botao.addEventListener('click', function() {
            if (!navigator.geolocation) {
                alert('Geolocalização não é suportada neste navegador.');
                return;
            }
            botao.textContent = 'Obtendo localização...';
            navigator.geolocation.getCurrentPosition(pos => {
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;
                ultimaLocalizacao = `https://www.google.com/maps?q=${lat},${lon}`;
                botao.textContent = 'Localização adicionada ✅';
            }, err => {
                alert('Não foi possível obter a localização.');
                botao.textContent = 'Adicionar Localização';
            });
        });
    });

    // Botão de pedido
    document.querySelectorAll('.btn-pedido').forEach(botao => {
        botao.addEventListener('click', function() {
            const card = this.closest('.produto-card');
            const nome = this.dataset.produto;
            const quantidade = card.querySelector('.quantidade-input').value;

            // Mensagem automática personalizada
            let mensagem = `Olá, deu vontade de um Bendito Brownie! Quero pedir ${quantidade} unidade(s) do ${nome}.`;

            if (ultimaLocalizacao) {
                mensagem += `\n📍 Minha localização: ${ultimaLocalizacao}`;
            }

            const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
            window.open(url, '_blank');
        });
    });
});
