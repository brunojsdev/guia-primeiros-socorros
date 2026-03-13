/**
 * 1. BANCO DE DADOS (Simulado)
 */
const emergencies = [
    {
        id: 'burns', title: 'Queimaduras', icon: 'flame', 
        tags: ['fogo', 'quente', 'óleo', 'sol', 'calor'],
        steps: [
            { t: 'Resfrie a área afetada', c: 'Coloque a lesão sob água corrente fria (não gelada) por 10 a 15 minutos para interromper a queimação.' },
            { t: 'Proteja a lesão limpa', c: 'Cubra com um pano limpo, úmido e que não solte fiapos. Nunca estoure as bolhas.' },
            { t: 'Busque avaliação médica', c: 'Vá ao hospital se a queimadura for maior que a palma da mão, no rosto, articulações ou genitais.' }
        ],
        warning: 'NUNCA aplique gelo, manteiga, creme dental, clara de ovo ou pó de café na queimadura. Isso pode agravar a lesão e causar infecções.'
    },
    {
        id: 'cuts', title: 'Cortes Profundos', icon: 'scissors',
        tags: ['sangramento', 'faca', 'vidro', 'ferimento', 'sangue', 'hemorragia'],
        steps: [
            { t: 'Comprima o local', c: 'Use um pano limpo ou gaze e faça pressão direta e firme sobre o corte para estancar o sangramento.' },
            { t: 'Eleve o membro afetado', c: 'Se for no braço ou perna, eleve-o acima do nível do coração. A gravidade ajuda a reduzir o fluxo sanguíneo.' },
            { t: 'Mantenha a pressão', c: 'Se o sangramento não parar após 10 minutos de pressão contínua, vá ao pronto-socorro imediatamente.' }
        ],
        warning: 'NÃO tente retirar objetos encravados (facas, estilhaços de vidro). Fixe-os no local com curativos ao redor e ligue 192.'
    },
    {
        id: 'choking', title: 'Engasgo', icon: 'wind',
        tags: ['sufocamento', 'comida', 'ar', 'respirar', 'heimlich'],
        steps: [
            { t: 'Avalie a tosse', c: 'Se a pessoa consegue tossir com força ou falar, apenas incentive-a a tossir. Não bata nas costas, pois o objeto pode descer mais.' },
            { t: 'Manobra de Heimlich', c: 'Se ela não respira e não tosse: abrace-a por trás, posicione uma das mãos (fechada) acima do umbigo, cubra com a outra mão e faça compressões rápidas para dentro e para cima (em formato de "J").' },
            { t: 'Repita o processo', c: 'Continue até o objeto ser expulso ou a vítima desmaiar. Se desmaiar, deite-a e inicie RCP (Reanimação Cardiopulmonar).' }
        ],
        warning: 'Mesmo após desengasgar com sucesso, uma avaliação médica é recomendada para checar possíveis lesões internas na garganta ou vias aéreas.'
    },
    {
        id: 'fainting', title: 'Desmaio', icon: 'activity',
        tags: ['consciência', 'caiu', 'tontura', 'pressão', 'apagou'],
        steps: [
            { t: 'Posicione a vítima', c: 'Deite a pessoa de barriga para cima e eleve as pernas dela cerca de 30 a 40 centímetros do chão para facilitar a ida do sangue ao cérebro.' },
            { t: 'Facilite a respiração', c: 'Afrouxe roupas apertadas no pescoço e cintura. Mantenha o ambiente arejado e afaste curiosos para permitir circulação de ar.' },
            { t: 'Monitore o retorno', c: 'A pessoa deve recobrar a consciência em pouco tempo. Se não acordar em 1 minuto ou não estiver respirando normalmente, ligue 192 imediatamente.' }
        ],
        warning: 'NÃO jogue água no rosto da vítima nem ofereça álcool, amônia ou comida/água para ela cheirar ou engolir enquanto estiver inconsciente.'
    },
    {
        id: 'shock', title: 'Choque Elétrico', icon: 'zap',
        tags: ['raio', 'tomada', 'fio', 'energia', 'eletricidade'],
        steps: [
            { t: 'Corte a fonte de energia', c: 'Desligue imediatamente a chave geral, disjuntor ou tire o aparelho da tomada antes de tentar qualquer outra ação.' },
            { t: 'Afaste a vítima com segurança', c: 'Se não puder desligar a energia, use um objeto totalmente seco e não condutor (cabo de vassoura de madeira seca, tapete de borracha grossa) para afastar a pessoa da fonte de energia.' },
            { t: 'Cheque os sinais vitais', c: 'Após separá-la da energia, verifique se a pessoa respira. Se não, inicie massagem cardíaca e peça para alguém ligar 192.' }
        ],
        warning: 'NUNCA toque diretamente na vítima com as mãos desprotegidas enquanto ela estiver em contato com a corrente elétrica, ou você também será eletrocutado.'
    },
    {
        id: 'poison', title: 'Intoxicação', icon: 'flask-conical',
        tags: ['veneno', 'produto de limpeza', 'remédio', 'ingeriu', 'químico'],
        steps: [
            { t: 'Identifique o agente', c: 'Descubra rapidamente o que foi ingerido, inalado ou tocou a pele. Guarde a embalagem, bula ou frasco do produto para mostrar aos médicos.' },
            { t: 'Busque ajuda especializada', c: 'Ligue imediatamente para o CIATox (Centro de Informação e Assistência Toxicológica - 0800 722 6001) ou SAMU (192) e siga as instruções rigorosamente.' },
            { t: 'Posição de segurança', c: 'Se a vítima estiver inconsciente mas respirando, deixe-a deitada de lado (Posição Lateral de Segurança) caso ela vomite, para evitar que sufoque com o próprio vômito.' }
        ],
        warning: 'NUNCA provoque vômito ou ofereça leite/água como "antídoto" sem orientação médica expressa. Alguns produtos químicos queimam a garganta ao entrar e também ao sair se houver vômito.'
    }
];

/**
 * 2. MAPEAMENTO DE ELEMENTOS DO DOM
 */
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

/**
 * 3. FUNÇÕES PRINCIPAIS
 */
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

    const html = data.map(item => `
        <button data-id="${item.id}" class="emergency-card bg-card-bg p-8 rounded-[2rem] text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,170,0,0.15)] group border border-slate-200 hover:border-destaque-laranja flex flex-col h-full relative overflow-hidden focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-destaque-laranja/30">
            
            <div class="absolute -right-8 -top-8 w-32 h-32 bg-slate-50 rounded-full group-hover:bg-gradient-to-br group-hover
