// Banco de dados das emergências
const emergencies = [
    {
        id: 'burns', title: 'Queimaduras', icon: 'flame', 
        tags: ['fogo', 'quente', 'óleo', 'sol', 'calor'],
        steps: [
            { t: 'Resfrie a área afetada', c: 'Coloque a lesão sob água corrente fria (não gelada) por 10 a 15 minutos.' },
            { t: 'Proteja a lesão limpa', c: 'Cubra com um pano limpo, úmido e que não solte fiapos.' },
            { t: 'Busque avaliação médica', c: 'Vá ao hospital se a queimadura for maior que a palma da mão.' }
        ],
        warning: 'NUNCA aplique gelo, manteiga, creme dental ou pó de café.'
    },
    {
        id: 'cuts', title: 'Cortes Profundos', icon: 'scissors',
        tags: ['sangramento', 'faca', 'vidro', 'ferimento'],
        steps: [
            { t: 'Comprima o local', c: 'Use um pano limpo ou gaze e faça pressão direta e firme.' },
            { t: 'Eleve o membro', c: 'Se possível, eleve o membro acima do nível do coração.' },
            { t: 'Mantenha a pressão', c: 'Se o sangramento não parar após 10 min, vá ao pronto-socorro.' }
        ],
        warning: 'NÃO tente retirar objetos encravados. Fixe-os e ligue 192.'
    },
    {
        id: 'choking', title: 'Engasgo', icon: 'wind',
        tags: ['sufocamento', 'comida', 'ar', 'heimlich'],
        steps: [
            { t: 'Avalie a tosse', c: 'Se a pessoa tossir ou falar, apenas incentive-a a tossir.' },
            { t: 'Manobra de Heimlich', c: 'Abrace por trás e faça compressões rápidas para dentro e para cima.' },
            { t: 'Repita o processo', c: 'Continue até o objeto sair ou a vítima desmaiar.' }
        ],
        warning: 'Mesmo após desengasgar, exames médicos são recomendados.'
    },
    {
        id: 'fainting', title: 'Desmaio', icon: 'activity',
        tags: ['consciência', 'caiu', 'tontura'],
        steps: [
            { t: 'Posicione a vítima', c: 'Deite a pessoa e eleve as pernas cerca de 30 a 40 centímetros.' },
            { t: 'Facilite a respiração', c: 'Afrouxe roupas apertadas e mantenha o ambiente arejado.' },
            { t: 'Monitore o retorno', c: 'Se não acordar em 1 minuto, ligue 192 imediatamente.' }
        ],
        warning: 'NÃO jogue água no rosto nem ofereça álcool para cheirar.'
    },
    {
        id: 'shock', title: 'Choque Elétrico', icon: 'zap',
        tags: ['raio', 'tomada', 'fio', 'energia'],
        steps: [
            { t: 'Corte a fonte de energia', c: 'Desligue o disjuntor antes de tocar na vítima.' },
            { t: 'Afaste a vítima', c: 'Use um objeto de madeira seco se não puder desligar a energia.' },
            { t: 'Cheque sinais vitais', c: 'Verifique respiração e inicie RCP se necessário.' }
        ],
        warning: 'NUNCA toque na vítima enquanto ela estiver em contato com a luz.'
    },
    {
        id: 'poison', title: 'Intoxicação', icon: 'flask-conical',
        tags: ['veneno', 'limpeza', 'remédio'],
        steps: [
            { t: 'Identifique o agente', c: 'Descubra o que foi ingerido e guarde a embalagem.' },
            { t: 'Busque ajuda', c: 'Ligue para o CIATox (0800 722 6001) ou SAMU (192).' },
            { t: 'Posição de segurança', c: 'Deite a vítima de lado para evitar sufocamento por vômito.' }
        ],
        warning: 'NUNCA provoque vômito sem orientação médica expressa.'
    }
];

// Elementos do DOM
const els = {
    viewMenu: document.getElementById('view-menu'),
    viewDetail: document.getElementById('view-detail'),
    cardsGrid: document.getElementById('cards-grid'),
    searchInput: document.getElementById('search-input'),
    noResults: document.getElementById('no-results'),
    detailContent: document.getElementById('detail-content'),
    btnBack: document.getElementById('btn-back')
};

// Renderização dos cards iniciais
function renderCards(data) {
    els.cardsGrid.innerHTML = '';
    
    if (data.length === 0) {
        els.cardsGrid.classList.add('hidden-view');
        els.noResults.classList.remove('hidden-view');
        return;
    }

    els.cardsGrid.classList.remove('hidden-view');
    els.noResults.classList.add('hidden-view');

    els.cardsGrid.innerHTML = data.map(item => `
        <button data-id="${item.id}" class="emergency-card bg-card-bg p-6 rounded-3xl text-left hover:-translate-y-2 hover:shadow-xl group border-b-4 border-transparent hover:border-destaque-laranja flex flex-col h-full shadow-md">
            <div class="bg-roxo-bg w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-destaque-laranja transition-colors shadow-sm">
                <i data-lucide="${item.icon}" class="w-7 h-7 text-white group-hover:text-roxo-escuro"></i>
            </div>
            <h3 class="text-xl font-black text-roxo-escuro mb-2">${item.title}</h3>
            <p class="text-slate-500 text-sm mt-auto">Clique para ver instruções.</p>
        </button>
    `).join('');
    
    lucide.createIcons();
}

// Renderização dos detalhes
function renderDetail(id) {
    const item = emergencies.find(e => e.id === id);
    if (!item) return;

    const stepsHtml = item.steps.map((step, index) => `
        <div class="relative pl-14 pb-10 timeline-item">
            <div class="timeline-line"></div>
            <div class="absolute left-0 top-0 w-10 h-10 bg-roxo-bg text-white rounded-full flex items-center justify-center font-black z-10">
                ${index + 1}
            </div>
            <h4 class="text-lg font-black text-roxo-escuro mb-2">${step.t}</h4>
            <p class="text-slate-600">${step.c}</p>
        </div>
    `).join('');

    els.detailContent.innerHTML = `
        <div class="bg-gradient-to-r from-roxo-bg to-roxo-hover p-8">
            <div class="flex items-center gap-5">
                <div class="bg-white p-4 rounded-2xl shadow-lg">
                    <i data-lucide="${item.icon}" class="w-10 h-10 text-destaque-laranja"></i>
                </div>
                <h2 class="text-3xl font-black text-white">${item.title}</h2>
            </div>
        </div>
        <div class="p-8 bg-white">
            <h3 class="text-sm uppercase tracking-widest text-slate-400 font-bold mb-8">Passo a Passo</h3>
            <div class="relative">${stepsHtml}</div>
            <div class="mt-6 bg-yellow-50 border-l-4 border-destaque-laranja rounded-r-2xl p-6 flex gap-4">
                <i data-lucide="triangle-alert" class="w-7 h-7 text-destaque-laranja flex-shrink-0"></i>
                <div>
                    <h5 class="text-destaque-escuro font-black uppercase mb-1 text-sm">Aviso Crítico</h5>
                    <p class="text-slate-800 font-medium">${item.warning}</p>
                </div>
            </div>
        </div>
    `;

    lucide.createIcons();
    els.viewMenu.classList.add('hidden-view');
    els.viewDetail.classList.remove('hidden-view');
    window.scrollTo(0, 0);
}

// Listeners
function setupEventListeners() {
    els.searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        const filtered = emergencies.filter(item => 
            item.title.toLowerCase().includes(term) || item.tags.some(tag => tag.includes(term))
        );
        renderCards(filtered);
    });

    els.cardsGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.emergency-card');
        if (card) renderDetail(card.dataset.id);
    });

    els.btnBack.addEventListener('click', () => {
        els.viewDetail.classList.add('hidden-view');
        els.viewMenu.classList.remove('hidden-view');
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderCards(emergencies);
    setupEventListeners();
});
