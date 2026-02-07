const emergencies = [
    {
        id: 'burns', title: 'Queimaduras', icon: 'flame', color: 'bg-orange-500', text: 'text-orange-600',
        steps: [
            { t: 'Resfrie a área', c: 'Coloque sob água corrente fria por 15 minutos.' },
            { t: 'Proteja a lesão', c: 'Cubra com pano limpo. Não estoure bolhas.' },
            { t: 'Procure um médico', c: 'Vá ao hospital para avaliação profissional.' }
        ],
        warning: 'NUNCA use gelo, manteiga ou pasta de dente.'
    },
    {
        id: 'cuts', title: 'Cortes', icon: 'scissors', color: 'bg-red-500', text: 'text-red-600',
        steps: [
            { t: 'Comprima o local', c: 'Use um pano limpo e faça pressão direta.' },
            { t: 'Limpe o ferimento', c: 'Lave com água e sabão se for superficial.' },
            { t: 'Procure um médico', c: 'Se o corte for profundo ou não parar de sangrar.' }
        ],
        warning: 'NÃO tente retirar objetos encravados.'
    },
    {
        id: 'choking', title: 'Engasgo', icon: 'wind', color: 'bg-blue-500', text: 'text-blue-600',
        steps: [
            { t: 'Incentive a tosse', c: 'Se a pessoa tossir, não interfira.' },
            { t: 'Manobra de Heimlich', c: 'Abrace por trás e pressione a boca do estômago.' },
            { t: 'Procure um médico', c: 'Exames internos são necessários após engasgos.' }
        ],
        warning: 'Se desmaiar, ligue 192 e inicie massagem cardíaca.'
    },
    {
        id: 'fainting', title: 'Desmaio', icon: 'activity', color: 'bg-purple-500', text: 'text-purple-600',
        steps: [
            { t: 'Deite a pessoa', c: 'Eleve as pernas acima do nível do coração.' },
            { t: 'Ventilação', c: 'Afrouxe roupas e garanta ar fresco.' },
            { t: 'Procure um médico', c: 'Investigue a causa do desmaio com um profissional.' }
        ],
        warning: 'Não ofereça água ou comida até a consciência total.'
    },
    {
        id: 'shock', title: 'Choque Elétrico', icon: 'zap', color: 'bg-yellow-500', text: 'text-yellow-600',
        steps: [
            { t: 'Corte a energia', c: 'Desligue o disjuntor antes de tocar na vítima.' },
            { t: 'Afaste o perigo', c: 'Use madeira seca para afastar fios.' },
            { t: 'Procure um médico', c: 'Todo choque elétrico requer avaliação cardíaca.' }
        ],
        warning: 'Cuidado com chão molhado ao socorrer.'
    },
    {
        id: 'poisoning', title: 'Intoxicação', icon: 'triangle-alert', color: 'bg-green-600', text: 'text-green-700',
        steps: [
            { t: 'Identifique o produto', c: 'Guarde a embalagem para mostrar ao médico.' },
            { t: 'Ligue para o SAMU', c: 'Siga exatamente as instruções do 192.' },
            { t: 'Vá ao hospital', c: 'Leve a vítima imediatamente ao pronto-socorro.' }
        ],
        warning: 'NUNCA provoque vômito sem orientação médica.'
    }
];

function renderMenu() {
    const grid = document.getElementById('button-grid');
    if (!grid) return;
    
    grid.innerHTML = emergencies.map(e => `
        <button onclick="showDetail('${e.id}')" class="bg-white p-6 rounded-2xl shadow-md border-2 border-slate-200 hover:border-red-500 text-left step-card transition-all">
            <div class="${e.color} w-14 h-14 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg">
                <i data-lucide="${e.icon}"></i>
            </div>
            <h2 class="text-xl font-black text-slate-800">${e.title}</h2>
            <p class="text-slate-500 text-sm mt-2">Clique para ver o passo a passo seguro.</p>
        </button>
    `).join('');
    
    // Recarrega os ícones do Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function showDetail(id) {
    const item = emergencies.find(e => e.id === id);
    const content = document.getElementById('detail-content');
    
    content.innerHTML = `
        <div class="${item.color} p-8 text-white">
            <h2 class="text-3xl font-black uppercase tracking-tight">${item.title}</h2>
        </div>
        <div class="p-8 space-y-6">
            ${item.steps.map((s, i) => `
                <div class="flex gap-4">
                    <div class="w-10 h-10 rounded-full ${item.color} flex items-center justify-center font-black flex-shrink-0 border-4 border-white shadow">${i+1}</div>
                    <div>
                        <h3 class="font-bold text-lg">${s.t}</h3>
                        <p class="text-slate-600">${s.c}</p>
                    </div>
                </div>
            `).join('')}
            <div class="bg-red-50 border-l-4 border-red-600 p-4 mt-6">
                <p class="font-black text-red-800 uppercase text-xs">Atenção Crítica</p>
                <p class="text-red-700 font-medium">${item.warning}</p>
            </div>
            <button onclick="showMenu()" class="w-full py-4 bg-slate-800 text-white rounded-xl font-bold mt-4 shadow-lg">VOLTAR AO MENU</button>
        </div>
    `;
    
    document.getElementById('menu-view').classList.add('hidden-view');
    document.getElementById('detail-view').classList.remove('hidden-view');
    window.scrollTo(0, 0);
}

function showMenu() {
    document.getElementById('detail-view').classList.add('hidden-view');
    document.getElementById('menu-view').classList.remove('hidden-view');
}

// Inicializa o menu quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
});
