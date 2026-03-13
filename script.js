// 1. DADOS
const emergencies = [
    {
        id: 'burns', title: 'Queimaduras', icon: 'flame', 
        tags: ['fogo', 'quente', 'óleo', 'sol', 'calor'],
        steps: [
            { t: 'Resfrie a área afetada', c: 'Coloque a lesão sob água corrente fria (não gelada) por 10 a 15 minutos para interromper a queimação.' },
            { t: 'Proteja a lesão limpa', c: 'Cubra com um pano limpo, úmido e que não solte fiapos. Nunca estoure as bolhas.' },
            { t: 'Busque avaliação médica', c: 'Vá ao hospital se a queimadura for maior que a palma da mão, no rosto ou genitais.' }
        ],
        warning: 'NUNCA aplique gelo, manteiga, creme dental ou pó de café na queimadura.'
    },
    {
        id: 'cuts', title: 'Cortes Profundos', icon: 'scissors',
        tags: ['sangramento', 'faca', 'vidro', 'ferimento', 'sangue'],
        steps: [
            { t: 'Comprima o local', c: 'Use um pano limpo ou gaze e faça pressão direta e firme sobre o corte.' },
            { t: 'Eleve o membro', c: 'Se for no braço ou perna, eleve-o acima do nível do coração para ajudar a reduzir o fluxo sanguíneo.' },
            { t: 'Mantenha a pressão', c: 'Se o sangramento não parar após 10 minutos de pressão contínua, vá ao pronto-socorro.' }
        ],
        warning: 'NÃO tente retirar objetos encravados (facas, vidros). Fixe-os no local e ligue 192.'
    },
    {
        id: 'choking', title: 'Engasgo', icon: 'wind',
        tags: ['sufocamento', 'comida', 'ar', 'respirar', 'heimlich'],
        steps: [
            { t: 'Avalie a tosse', c: 'Se a pessoa consegue tossir com força ou falar, apenas incentive-a a tossir. Não bata nas costas.' },
            { t: 'Manobra de Heimlich', c: 'Se ela não respira: abrace-a por trás, posicione as mãos (fechadas) acima do umbigo e faça compressões para dentro e para cima.' },
            { t: 'Repita o processo', c: 'Continue até o objeto ser expulso ou a vítima desmaiar (neste caso, deite-a e inicie RCP).' }
        ],
        warning: 'Mesmo após desengasgar, exames médicos são recomendados para checar lesões internas.'
    },
    {
        id: 'fainting', title: 'Desmaio', icon: 'activity',
        tags: ['consciência', 'caiu', 'tontura', 'pressão'],
        steps: [
            { t: 'Posicione a vítima', c: 'Deite a pessoa de barriga para cima e eleve as pernas dela cerca de 30 a 40 centímetros do chão.' },
            { t: 'Facilite a respiração', c: 'Afrouxe roupas apertadas no pescoço e cintura. Mantenha o ambiente arejado e afaste curiosos.' },
            { t: 'Monitore o retorno', c: 'Se não acordar em 1 minuto ou não estiver respirando, ligue 192 imediatamente.' }
        ],
        warning: 'NÃO jogue água no rosto nem ofereça álcool/comida para a pessoa cheirar ou engolir.'
    },
    {
        id: 'shock', title: 'Choque Elétrico', icon: 'zap',
        tags: ['raio', 'tomada', 'fio', 'energia', 'eletricidade'],
        steps: [
            { t: 'Corte a fonte de energia', c: 'Desligue imediatamente a chave geral, disjuntor ou tire da tomada antes de qualquer outra ação.' },
            { t: 'Afaste a vítima com segurança', c: 'Se não puder desligar a energia, use um objeto totalmente seco e não condutor (cabo de vassoura de madeira, borracha) para afastar o fio.' },
            { t: 'Cheque os sinais vitais', c: 'Verifique se a pessoa respira. Se não, inicie massagem cardíaca e peça para ligarem 192.' }
        ],
        warning: 'NUNCA toque na vítima com as mãos desprotegidas enquanto ela estiver em contato com a eletricidade.'
    },
    {
        id: 'poison', title: 'Intoxicação', icon: 'flask-conical',
        tags: ['veneno', 'produto de limpeza', 'remédio', 'ingeriu'],
        steps: [
            { t: 'Identifique o agente', c: 'Descubra o que foi ingerido, inalado ou tocou a pele. Guarde a embalagem ou frasco.' },
            { t: 'Busque ajuda especializada', c: 'Ligue para o CIATox (0800 722 6001) ou SAMU (192) e siga as instruções rigorosamente.' },
            { t: 'Posição de segurança', c: 'Deixe a vítima deitada de lado caso ela vomite, para evitar que ela sufoque.' }
        ],
        warning: 'NUNCA provoque vômito ou ofereça leite/água sem orientação médica expressa.'
    }
];

// 2. ELEMENTOS DO DOM
const els = {
    viewMenu: document.getElementById('view-menu'),
    viewDetail: document.getElementById('view-detail'),
    cardsGrid: document.getElementById('cards-grid'),
    searchInput: document.getElementById('search-input'),
    noResults: document.getElementById('no-results'),
    detailContent: document.getElementById('detail-content'),
    btnBack: document.getElementById('btn-back')
};

// 3. FUNÇÕES PRINCIPAIS
function init() {
    renderCards(emergencies);
    lucide.createIcons();
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

    const html = data.map(item => `
        <button data-id="${item.id}" class="emergency-card bg-card-bg p-8 rounded-[2rem] text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(21,1,54,0.15)] group border-2 border-slate-100 hover:border-destaque-laranja flex flex-col h-full relative overflow-hidden">
            
            <div class="absolute -right-6 -top-6 w-32 h-32 bg-slate-50 rounded-full group-hover:bg-destaque-laranja/5 transition-colors duration-500"></div>

            <div class="relative z-10">
                <div class="bg-roxo-bg w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-destaque-laranja transition-colors duration-300 shadow-lg">
                    <i data-lucide="${item.icon}" class="w-8 h-8 text-white group-hover:text-roxo-escuro transition-colors"></i>
                </div>
                <h3 class="text-2xl font-black text-roxo-escuro mb-3 tracking-tight">${item.title}</h3>
                <p class="text-slate-500 font-medium text-sm leading-relaxed mt-auto flex items-center gap-2 group-hover:text-destaque-escuro transition-colors">
                    Ver protocolo <i data-lucide="arrow-right" class="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all"></i>
                </p>
            </div>
        </button>
    `).join('');

    els.cardsGrid.innerHTML = html;
    lucide.createIcons();
}

function renderDetail(id) {
    const item = emergencies.find(e => e.id === id);
    if (!item) return;

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
            <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 24px 24px;"></div>
            
            <div class="flex items-center gap-6 relative z-10">
                <div class="bg-white p-5 rounded-3xl shadow-2xl transform -rotate-6">
                    <i data-lucide="${item.icon}" class="w-12 h-12 text-destaque-laranja"></i>
                </div>
                <h2 class="text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">${item.title}</h2>
            </div>
        </div>
        
        <div class="p-8 md:p-12 bg-white">
            <h3 class="text-sm uppercase tracking-widest text-slate-400 font-black mb-10 flex items-center gap-2">
                <i data-lucide="list-ordered" class="w-5 h-5"></i>
                Passo a Passo
            </h3>
            
            <div class="relative mt-4">
                ${stepsHtml}
            </div>

            <div class="mt-8 bg-yellow-50 border border-destaque-laranja/30 rounded-3xl p-6 md:p-8 flex gap-5 items-start shadow-inner">
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
    
    els.viewMenu.classList.add('hidden-view');
    els.viewDetail.classList.remove('hidden-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 4. EVENT LISTENERS
function setupEventListeners() {
    // Filtro de Busca Dinâmica
    els.searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        const filtered = emergencies.filter(item => 
            item.title.toLowerCase().includes(term) || 
            item.tags.some(tag => tag.includes(term))
        );
        renderCards(filtered);
    });

    // Delegação de eventos para os cards
    els.cardsGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.emergency-card');
        if (card) {
            renderDetail(card.dataset.id);
        }
    });

    // Botão Voltar
    els.btnBack.addEventListener('click', () => {
        els.viewDetail.classList.add('hidden-view');
        els.viewMenu.classList.remove('hidden-view');
        els.searchInput.value = ''; // Reseta a busca
        renderCards(emergencies);
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', init);
