document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENTOS DO DOM ---
    const destinationsGrid = document.getElementById('destinations-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Modal
    const modal = document.getElementById('reserva-modal');
    const modalDestinoNome = document.getElementById('modal-destino-nome');
    const reservaForm = document.getElementById('reserva-form');
    const modalNomeCliente = document.getElementById('modal-nome-cliente');
    const closeModalBtn = modal.querySelector('.close-btn');

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightboxBtn = lightbox.querySelector('.lightbox-close-btn');

    // Tema Escuro
    const themeToggle = document.getElementById('theme-toggle');

    // --- INICIALIZAÇÕES ---
    AOS.init({ duration: 800, once: true });
    
    new Swiper('.swiper', {
        loop: true,
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        autoplay: { delay: 4000, disableOnInteraction: false },
    });

    // --- FUNÇÕES ---

    /**
     * Renderiza os pacotes na tela.
     * @param {Array} pacotesParaRenderizar - O array de pacotes a ser exibido.
     */
    function renderPacotes(pacotesParaRenderizar) {
        destinationsGrid.innerHTML = '';
        pacotesParaRenderizar.forEach(pacote => {
            const card = document.createElement('div');
            card.className = 'destination-card';
            card.setAttribute('data-aos', 'fade-up');
            card.innerHTML = `
                <img src="${pacote.imagem}" alt="Foto de ${pacote.destino}" data-destino="${pacote.destino}">
                <div class="destination-info">
                    <h3>${pacote.destino}</h3>
                    <p class="destination-price">${pacote.preco}</p>
                    <button class="reserve-button" data-destino="${pacote.destino}">Fazer Reserva</button>
                </div>
            `;
            destinationsGrid.appendChild(card);
        });
    }

    // --- LÓGICA DE EVENTOS ---

    // Filtros
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const tipo = btn.dataset.tipo;
            const pacotesFiltrados = tipo === 'todos' ? pacotes : pacotes.filter(p => p.tipo === tipo);
            renderPacotes(pacotesFiltrados);
        });
    });

    // Modal e Lightbox (usando delegação de eventos)
    destinationsGrid.addEventListener('click', (e) => {
        // Abrir Modal
        if (e.target.classList.contains('reserve-button')) {
            const destino = e.target.dataset.destino;
            modalDestinoNome.textContent = destino;
            modal.style.display = 'flex';
        }
        // Abrir Lightbox
        if (e.target.tagName === 'IMG') {
            lightboxImg.src = e.target.src;
            lightbox.style.display = 'flex';
        }
    });

    // Fechar Modal
    closeModalBtn.addEventListener('click', () => modal.style.display = 'none');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    // Envio do Formulário do Modal
    reservaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = modalNomeCliente.value;
        const destino = modalDestinoNome.textContent;
        const numero = '5531982684415';
        const mensagem = `Olá! Meu nome é ${nome} e tenho interesse em reservar o pacote para ${destino}.`;
        const linkWhatsApp = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
        
        window.open(linkWhatsApp, '_blank');
        modal.style.display = 'none';
        reservaForm.reset();
    });

    // Fechar Lightbox
    closeLightboxBtn.addEventListener('click', () => lightbox.style.display = 'none');
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.style.display = 'none';
    });
    
    // Tema Escuro
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Salva a preferência do usuário
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // Verifica se já existe um tema salvo
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // --- RENDERIZAÇÃO INICIAL ---
    renderPacotes(pacotes);
});
