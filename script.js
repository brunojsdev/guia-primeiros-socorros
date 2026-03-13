/**
 * Controla a lógica de renderização, busca e navegação do app.
 * Contém os 6 protocolos de emergência.
 */

const emergencies = [
    {
        id: 'burns', title: 'Queimaduras', icon: 'flame', 
        tags: ['fogo', 'quente', 'óleo', 'sol', 'calor', 'queimou'],
        steps: [
            { t: 'Resfrie a área afetada', c: 'Coloque a lesão sob água corrente fria (não gelada) por 10 a 15 minutos para interromper a queimação.' },
            { t: 'Proteja a lesão limpa', c: 'Cubra com um pano limpo, úmido e que não solte fiapos. Nunca estoure as bolhas.' },
            { t: 'Busque avaliação médica', c: 'Vá ao hospital se a queimadura for maior que a palma da mão, no rosto, articulações ou genitais.' }
        ],
        warning: 'NUNCA aplique gelo, manteiga, creme dental, clara de ovo ou pó de café na queimadura. Isso pode agravar a lesão e causar infecções.'
    },
    {
        id: 'cuts', title: 'Cortes Profundos', icon: 'scissors',
        tags: ['sangramento', 'faca', 'vidro', 'ferimento', 'sangue', 'hemorragia', 'cortou'],
        steps: [
            { t: 'Comprima o local', c: 'Use um pano limpo ou gaze e faça pressão direta e firme sobre o corte para estancar o sangramento.' },
            { t: 'Eleve o membro afetado', c: 'Se for no braço ou perna, eleve-o acima do nível do coração. A gravidade ajuda a reduzir o fluxo sanguíneo.' },
            { t: 'Mantenha a pressão', c: 'Se o sangramento não parar após 10 minutos de pressão contínua, vá ao pronto-socorro imediatamente.' }
        ],
        warning: 'NÃO tente retirar objetos encravados (facas, estilhaços de vidro). Fixe-os no local com curativos ao redor e ligue 192 ou 193.'
    },
    {
        id: 'choking', title: 'Engasgo', icon: 'wind',
        tags: ['sufocamento', 'comida', 'ar', 'respirar', 'heimlich', 'engasgou'],
        steps: [
            { t: 'Avalie a tosse', c: 'Se a pessoa consegue tossir com força ou falar, apenas incentive-a a tossir. Não bata nas costas, pois o objeto pode descer mais.' },
            { t: 'Manobra de Heimlich', c: 'Se ela não respira e não tosse: abrace-a por trás, posicione uma das mãos (fechada) acima do umbigo, cubra com a outra mão e faça compressões rápidas para dentro e para cima.' },
            { t: 'Repita o processo', c: 'Continue até o objeto ser expulso ou a vítima desmaiar. Se desmaiar, deite-a e inicie RCP.' }
        ],
        warning: 'Mesmo após desengasgar com sucesso, uma avaliação médica é recomendada para checar possíveis lesões internas.'
    },
    {
        id: 'fainting', title: 'Desmaio', icon: 'activity',
        tags: ['consciência', 'caiu', 'tontura', 'pressão', 'apagou', 'desmaiou'],
        steps: [
            { t: 'Posicione a vítima', c: 'Deite a pessoa de barriga para cima e eleve as pernas dela cerca de 30 a 40 centímetros do chão.' },
            { t: 'Facilite a respiração', c: 'Afrouxe roupas apertadas no pescoço e cintura. Mantenha o ambiente arejado.' },
            { t: 'Monitore o retorno', c: 'Se não acordar em 1 minuto ou não estiver respirando normalmente, ligue 192 ou 193 imediatamente.' }
        ],
        warning: 'NÃO jogue água no rosto da vítima nem ofereça álcool ou comida para ela enquanto estiver inconsciente.'
    },
    {
        id: 'shock', title: 'Choque Elétrico', icon: 'zap',
        tags: ['raio', 'tomada', 'fio', 'energia', 'eletricidade', 'choque'],
        steps: [
            { t: 'Corte a fonte de energia', c: 'Desligue imediatamente a chave geral ou tire o aparelho da tomada antes de tocar na vítima.' },
            { t: 'Afaste a vítima com segurança', c: 'Se não puder desligar, use um objeto seco e não condutor (madeira ou borracha) para afastar a pessoa.' },
            { t: 'Cheque os sinais vitais', c: 'Verifique se a pessoa respira. Se não, inicie massagem cardíaca e peça ajuda.' }
        ],
        warning: 'NUNCA toque diretamente na vítima com as mãos desprotegidas enquanto ela estiver em contato com a corrente elétrica.'
    },
    {
        id: 'poison', title: 'Intoxicação', icon: 'flask-conical',
        tags: ['veneno', 'limpeza', 'remédio', 'ingeriu', 'químico', 'bebeu'],
        steps: [
            { t: 'Identifique o agente', c: 'Descubra o que foi ingerido e guarde a embalagem para mostrar aos médicos.' },
            { t: 'Busque ajuda especializada', c: 'Ligue para o CIATox (0800 722 6001), SAMU (192) ou Bombeiros (193).' },
            { t: 'Posição de segurança', c: 'Se a vítima estiver inconsciente mas respirando, deixe-a deitada de lado para evitar sufocamento por vómito.' }
        ],
        warning: 'NUNCA provoque vómito ou ofereça leite sem orientação médica. Alguns químicos podem queimar a garganta novamente ao sair.'
    }
];

const els = {
    viewMenu: document.getElementById('view-menu'),
    viewDetail: document.getElementById('view-detail'),
    cardsGrid: document.getElementById('cards-grid'),
    searchInput: document.getElementById('search-input'),
    clearSearchBtn: document.getElementById('clear-search'),
    noResults: document.getElementById('no-results'),
    detailContent: document.getElementById('detail-content'),
    btnBack: document.getElementById('btn-back')
};

function init() {
    renderCards(emergencies);
    setupEventListeners();
}

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
        <button data-id="${item.id}" class="emergency-card bg-card-bg p-8 rounded-[2rem] text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,170,0,0.15)] group border border-slate-200 hover:border-destaque-laranja flex flex-col h-full relative overflow-hidden">
            <div class="relative z-10 flex flex-col h-full">
                <div class="bg-roxo-bg w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-destaque-laranja transition-colors duration-300">
                    <i data-lucide="${item.icon}" class="w-8 h-8 text-white group-hover:text-roxo-escuro"></i>
                </div>
                <h3 class="text-2xl font-black text-roxo-escuro mb-3 group-hover:text-roxo-bg">${item.title}</h3>
                <div class="flex-grow"></div>
                <p class="text-slate-400 font-semibold text-sm mt-4 flex items-center gap-2 group-hover:text-destaque-escuro transition-colors">
                    Ver protocolo 
                    <i data-lucide="arrow-right" class="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300"></i>
                </p>
            </div>
        </button>
    `).join('');
    if (window.lucide) lucide.createIcons();
}

function renderDetail(id) {
    const item = emergencies.find(e => e.id === id);
    if (!item) return;

    const stepsHtml = item.steps.map((step, index) => `
        <div class="timeline-item pl-16 pb-12 group">
            <div class="absolute left-0 top-0 w-12 h-12 bg-roxo-bg text-destaque-amarelo rounded-full flex items-center justify-center font-black shadow-lg z-10 text-xl border-4 border-white group-hover:bg-destaque-laranja group-hover:text-roxo-escuro transition-colors duration-300">
                ${index + 1}
            </div>
            <h4 class="text-xl font-black text-roxo-escuro mb-2 pt-2">${step.t}</h4>
            <p class="text-slate-600 font-medium leading-relaxed">${step.c}</p>
        </div>
    `).join('');

    els.detailContent.innerHTML = `
        <div class="bg-gradient-to-br from-roxo-bg to-roxo-escuro p-8 md:p-12">
            <div class="flex items-center gap-6">
                <div class="bg-white p-5 rounded-3xl shadow-xl">
                    <i data-lucide="${item.icon}" class="w-12 h-12 text-destaque-laranja"></i>
                </div>
                <h2 class="text-3xl md:text-5xl font-black text-white tracking-tight">${item.title}</h2>
            </div>
        </div>
        <div class="p-8 md:p-12 bg-white">
            <h3 class="text-sm uppercase tracking-widest text-slate-400 font-black mb-10">Ações Imediatas</h3>
            <div class="relative">${stepsHtml}</div>
            <div class="mt-4 bg-red-50 border-l-4 border-red-500 rounded-r-3xl p-6 flex flex-col sm:flex-row gap-5">
                <div class="bg-white p-3 rounded-2xl shadow-sm border border-red-100 shrink-0">
                    <i data-lucide="triangle-alert" class="w-8 h-8 text-red-500"></i>
                </div>
                <div>
                    <h5 class="text-red-700 font-black uppercase tracking-widest text-sm mb-2">Aviso Crítico</h5>
                    <p class="text-slate-800 font-semibold">${item.warning}</p>
                </div>
            </div>
        </div>
    `;
    if (window.lucide) lucide.createIcons();
    els.viewMenu.classList.add('hidden-view');
    els.viewDetail.classList.remove('hidden-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetToHome() {
    els.viewDetail.classList.add('hidden-view');
    els.viewMenu.classList.remove('hidden-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setupEventListeners() {
    els.searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        els.clearSearchBtn.classList.toggle('hidden', term.length === 0);
        const filtered = emergencies.filter(item => 
            item.title.toLowerCase().includes(term) || 
            item.tags.some(tag => tag.includes(term))
        );
        renderCards(filtered);
    });

    els.clearSearchBtn.addEventListener('click', () => {
        els.searchInput.value = '';
        els.clearSearchBtn.classList.add('hidden');
        renderCards(emergencies);
        els.searchInput.focus(); 
    });

    els.cardsGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.emergency-card');
        if (card) renderDetail(card.dataset.id);
    });

    els.btnBack.addEventListener('click', resetToHome);
    window.resetToHome = resetToHome;
}

document.addEventListener('DOMContentLoaded', init);
