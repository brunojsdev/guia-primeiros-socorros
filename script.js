/**
 * Lógica de Primeiros Socorros
 * Responsável por renderizar cards, busca e navegação.
 */

const emergencies = [
    {
        id: 'burns', title: 'Queimaduras', icon: 'flame', 
        tags: ['fogo', 'quente', 'óleo', 'sol', 'calor'],
        steps: [
            { t: 'Resfrie a área afetada', c: 'Coloque a lesão sob água corrente fria por 10 a 15 minutos.' },
            { t: 'Proteja a lesão', c: 'Cubra com um pano limpo e úmido. Nunca estoure as bolhas.' },
            { t: 'Busque avaliação', c: 'Vá ao hospital se a queimadura for maior que a palma da mão.' }
        ],
        warning: 'NUNCA aplique gelo, manteiga, creme dental ou pó de café.'
    },
    {
        id: 'cuts', title: 'Cortes Profundos', icon: 'scissors',
        tags: ['sangramento', 'faca', 'vidro', 'sangue'],
        steps: [
            { t: 'Comprima o local', c: 'Use um pano limpo ou gaze e faça pressão direta sobre o corte.' },
            { t: 'Eleve o membro', c: 'Mantenha o local acima do nível do coração se possível.' },
            { t: 'Mantenha a pressão', c: 'Se o sangramento não parar em 10 min, vá ao pronto-socorro.' }
        ],
        warning: 'NÃO retire objetos encravados. Fixe-os no local e ligue 192.'
    },
    {
        id: 'choking', title: 'Engasgo', icon: 'wind',
        tags: ['sufocamento', 'comida', 'ar', 'heimlich'],
        steps: [
            { t: 'Incentive a tosse', c: 'Se a pessoa tossir ou falar, não interfira, apenas observe.' },
            { t: 'Manobra de Heimlich', c: 'Abrace por trás, feche a mão acima do umbigo e pressione para dentro e para cima.' },
            { t: 'Persista', c: 'Continue até o objeto ser expulso ou a vítima desmaiar.' }
        ],
        warning: 'Mesmo após desengasgar, procure um médico para checar lesões internas.'
    },
    {
        id: 'shock', title: 'Choque Elétrico', icon: 'zap',
        tags: ['fio', 'energia', 'eletricidade', 'tomada'],
        steps: [
            { t: 'Corte a energia', c: 'Desligue a chave geral ou disjuntor imediatamente.' },
            { t: 'Afastamento seguro', c: 'Use madeira ou borracha seca para afastar a vítima do fio.' },
            { t: 'Sinais vitais', c: 'Verifique respiração. Se ausente, ligue 192 e inicie massagem cardíaca.' }
        ],
        warning: 'NUNCA toque na vítima com as mãos se ela estiver em contato com a energia.'
    }
];

const els = {
    viewMenu: document.getElementById('view-menu'),
    viewDetail: document.getElementById('view-detail'),
    cardsGrid: document.getElementById('cards-grid'),
    searchInput: document.getElementById('search-input'),
    noResults: document.getElementById('no-results'),
    detailContent: document.getElementById('detail-content'),
    btnBack: document.getElementById('btn-back')
};

function renderCards(data) {
    els.cardsGrid.innerHTML = '';
    
    if (data.length === 0) {
        els.cardsGrid.classList.add('hidden');
        els.noResults.classList.remove('hidden');
        return;
    }

    els.cardsGrid.classList.remove('hidden');
    els.noResults.classList.add('hidden');

    const html = data.map(item => `
        <button data-id="${item.id}" class="emergency-card bg-white p-6 rounded-3xl text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group border-b-4 border-transparent hover:border-[#ffaa00] flex flex-col h-full shadow-md">
            <div class="bg-[#4A2B99] w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#ffaa00] transition-colors duration-300">
                <i data-lucide="${item.icon}" class="w-7 h-7 text-white group-hover:text-[#150136]"></i>
            </div>
            <h3 class="text-xl font-black text-[#150136] mb-2">${item.title}</h3>
            <p class="text-slate-500 text-sm mt-auto">Ver protocolo de socorro.</p>
        </button>
    `).join('');

    els.cardsGrid.innerHTML = html;
    lucide.createIcons();
}

function renderDetail(id) {
    const item = emergencies.find(e => e.id === id);
    if (!item) return;

    const stepsHtml = item.steps.map((step, index) => `
        <div class="relative pl-14 pb-10 timeline-item">
            <div class="timeline-line"></div>
            <div class="absolute left-0 top-0 w-10 h-10 bg-[#4A2B99] text-white rounded-full flex items-center justify-center font-black shadow-md z-10 text-lg">
                ${index + 1}
            </div>
            <h4 class="text-lg font-black text-[#150136] mb-2">${step.t}</h4>
            <p class="text-slate-600">${step.c}</p>
        </div>
    `).join('');

    els.detailContent.innerHTML = `
        <div class="bg-gradient-to-r from-[#4A2B99] to-[#5D38B4] p-8 relative">
            <div class="flex items-center gap-5 relative z-10">
                <div class="bg-white p-4 rounded-2xl shadow-lg">
                    <i data-lucide="${item.icon}" class="w-10 h-10 text-[#ffaa00]"></i>
                </div>
                <h2 class="text-3xl font-black text-white">${item.title}</h2>
            </div>
        </div>
        <div class="p-8 bg-white">
            <h3 class="text-xs uppercase tracking-widest text-slate-400 font-bold mb-8">Procedimentos</h3>
            <div class="relative">${stepsHtml}</div>
            <div class="mt-6 bg-yellow-50 border-l-4 border-[#ffaa00] rounded-r-2xl p-6 flex gap-4 items-start shadow-sm">
                <i data-lucide="triangle-alert" class="w-7 h-7 text-[#ffaa00]"></i>
                <div>
                    <h5 class="text-[#ff9900] font-black uppercase text-sm mb-1">Atenção Crítica</h5>
                    <p class="text-slate-800 font-medium text-sm">${item.warning}</p>
                </div>
            </div>
        </div>
    `;

    lucide.createIcons();
    els.viewMenu.classList.add('hidden');
    els.viewDetail.classList.remove('hidden');
    window.scrollTo(0, 0);
}

function setupListeners() {
    els.searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        const filtered = emergencies.filter(item => 
            item.title.toLowerCase().includes(term) || 
            item.tags.some(tag => tag.includes(term))
        );
        renderCards(filtered);
    });

    els.cardsGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.emergency-card');
        if (card) renderDetail(card.dataset.id);
    });

    els.btnBack.addEventListener('click', () => {
        els.viewDetail.classList.add('hidden');
        els.viewMenu.classList.remove('hidden');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderCards(emergencies);
    setupListeners();
});
