/**
 * 1. BANCO DE DADOS (Simulado)
 * Estrutura de objetos contendo as informações de cada emergência.
 */
const emergencies = [
    {
        id: 'burns', title: 'Queimaduras', icon: 'flame', 
        tags: ['fogo', 'quente', 'óleo', 'sol', 'calor'],
        steps: [
            { t: 'Resfrie a área afetada', c: 'Coloque a lesão sob água corrente fria (não gelada) por 10 a 15 minutos para interromper a queimação.' },
            { t: 'Proteja a lesão limpa', c: 'Cubra com um pano limpo, úmido e que não solte fiapos. Nunca estoure as bolhas.' },
            { t: 'Busque avaliação médica', c: 'Vá ao hospital se a queimadura for maior que a palma da mão.' }
        ],
        warning: 'NUNCA aplique gelo, manteiga, creme dental ou pó de café na queimadura.'
    },
    {
        id: 'cuts', title: 'Cortes Profundos', icon: 'scissors',
        tags: ['sangramento', 'faca', 'vidro', 'ferimento', 'sangue'],
        steps: [
            { t: 'Comprima o local', c: 'Use um pano limpo ou gaze e faça pressão direta e firme sobre o corte.' },
            { t: 'Eleve o membro', c: 'Se for no braço ou perna, eleve-o acima do nível do coração para reduzir o fluxo sanguíneo.' },
            { t: 'Mantenha a pressão', c: 'Se o sangramento não parar após 10 minutos, vá ao pronto-socorro.' }
        ],
        warning: 'NÃO tente retirar objetos encravados. Fixe-os no local e ligue 192.'
    },
    {
        id: 'choking', title: 'Engasgo', icon: 'wind',
        tags: ['sufocamento', 'comida', 'ar', 'respirar', 'heimlich'],
        steps: [
            { t: 'Avalie a tosse', c: 'Se a pessoa consegue tossir ou falar, incentive-a a tossir forte.' },
            { t: 'Manobra de Heimlich', c: 'Se não respira: abrace-a por trás, feche a mão acima do umbigo e pressione para dentro e para cima.' },
            { t: 'Repita o processo', c: 'Continue até o objeto ser expulso ou a vítima desmaiar.' }
        ],
        warning: 'Mesmo após desengasgar, exames médicos são recomendados para checar lesões internas.'
    },
    // ... os demais itens (fainting, shock, poison) seguem a mesma estrutura
];

/**
 * 2. REFERÊNCIAS DO DOM
 * Centralizamos os elementos em um objeto para facilitar a manutenção.
 */
const els = {
    viewMenu: document.getElementById('view-menu'),
    viewDetail: document.getElementById('view-detail'),
    cardsGrid: document.getElementById('cards-grid'),
    searchInput: document.getElementById('search-input'),
    noResults: document.getElementById('no-results'),
    detailContent: document.getElementById('detail-content'),
    btnBack: document.getElementById('btn-back')
};

/**
 * 3. FUNÇÕES DE INICIALIZAÇÃO E RENDERIZAÇÃO
 */

function init() {
    renderCards(emergencies); // Carrega todos os cards inicialmente
    lucide.createIcons();     // Ativa os ícones da biblioteca Lucide
    setupEventListeners();   // Configura cliques e busca
}

// Gera o HTML dos cards no Menu Principal
function renderCards(data) {
    els.cardsGrid.innerHTML = '';
    
    if (data.length === 0) {
        els.cardsGrid.classList.add('hidden-view');
        els.noResults.classList.remove('hidden-view');
        return;
    }

    els.cardsGrid.classList.remove('hidden-view');
    els.noResults.classList.add('hidden-view');

    const html = data.map(item => `
        <button data-id="${item.id}" class="emergency-card bg-card-bg p-8 rounded-[2rem] text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group border-2 border-slate-100 hover:border-destaque-laranja flex flex-col h-full relative overflow-hidden">
            <div class="relative z-10">
                <div class="bg-roxo-bg w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-destaque-laranja transition-colors duration-300">
                    <i data-lucide="${item.icon}" class="w-8 h-8 text-white group-hover:text-roxo-escuro"></i>
                </div>
                <h3 class="text-2xl font-black text-roxo-escuro mb-3 tracking-tight">${item.title}</h3>
                <p class="text-slate-500 font-medium text-sm mt-auto flex items-center gap-2 group-hover:text-destaque-escuro transition-colors">
                    Ver protocolo <i data-lucide="arrow-right" class="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all"></i>
                </p>
            </div>
        </button>
    `).join('');

    els.cardsGrid.innerHTML = html;
    lucide.createIcons(); // Re-renderiza ícones injetados via innerHTML
}

// Gera a tela de detalhes de um item específico
function renderDetail(id) {
    const item = emergencies.find(e => e.id === id);
    if (!item) return;

    // Gera o HTML da lista de passos
    const stepsHtml = item.steps.map((step, index) => `
        <div class="relative pl-16 pb-12 timeline-item">
            <div class="timeline-line"></div>
            <div class="absolute left-0 top-0 w-12 h-12 bg-roxo-bg text-destaque-amarelo rounded-full flex items-center justify-center font-black shadow-lg z-10 text-xl border-4 border-white">
                ${index + 1}
            </div>
            <h4 class="text-xl font-black text-roxo-escuro mb-3 pt-2">${step.t}</h4>
            <p class="text-slate-600 font-medium leading-relaxed text-base">${step.c}</p>
        </div>
    `).join('');

    els.detailContent.innerHTML = `
        <div class="bg-gradient-to-br from-roxo-bg via-roxo-bg to-[#331C70] p-8 md:p-12 relative overflow-hidden">
            <div class="flex items-center gap-6 relative z-10">
                <div class="bg-white p-5 rounded-3xl shadow-2xl transform -rotate-6">
                    <i data-lucide="${item.icon}" class="w-12 h-12 text-destaque-laranja"></i>
                </div>
                <h2 class="text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">${item.title}</h2>
            </div>
        </div>
        <div class="p-8 md:p-12 bg-white">
            <h3 class="text-sm uppercase tracking-widest text-slate-400 font-black mb-10 flex items-center gap-2">
                <i data-lucide="list-ordered" class="w-5 h-5"></i> Passo a Passo
            </h3>
            <div class="relative mt-4">${stepsHtml}</div>
            <div class="mt-8 bg-yellow-50 border border-destaque-laranja/30 rounded-3xl p-6 md:p-8 flex gap-5 items-start">
                <div class="bg-white p-3 rounded-2xl shadow-sm shrink-0">
                    <i data-lucide="triangle-alert" class="w-8 h-8 text-destaque-laranja"></i>
                </div>
                <div>
                    <h5 class="text-destaque-escuro font-black uppercase tracking-widest text-sm mb-2">Aviso Crítico</h5>
                    <p class="text-slate-700 font-semibold leading-relaxed text-base">${item.warning}</p>
                </div>
            </div>
        </div>
    `;

    lucide.createIcons();
    
    // Troca de "página" (View)
    els.viewMenu.classList.add('hidden-view');
    els.viewDetail.classList.remove('hidden-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * 4. ESCUTADORES DE EVENTOS
 */
function setupEventListeners() {
    // Busca em tempo real
    els.searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        const filtered = emergencies.filter(item => 
            item.title.toLowerCase().includes(term) || 
            item.tags.some(tag => tag.includes(term))
        );
        renderCards(filtered);
    });

    // Clique no card (Usa Delegação de Eventos para melhor performance)
    els.cardsGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.emergency-card');
        if (card) renderDetail(card.dataset.id);
    });

    // Botão Voltar para o menu
    els.btnBack.addEventListener('click', () => {
        els.viewDetail.classList.add('hidden-view');
        els.viewMenu.classList.remove('hidden-view');
        els.searchInput.value = ''; 
        renderCards(emergencies);
    });
}

// Inicia o app quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', init);
