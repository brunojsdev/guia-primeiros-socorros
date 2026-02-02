import React, { useState } from 'react';
import { 
  Flame, 
  Scissors, 
  Wind, 
  Activity, 
  Zap, 
  TriangleAlert, 
  Phone, 
  ArrowLeft,
  AlertOctagon,
  ChevronRight,
  HeartPulse
} from 'lucide-react';

// Dados das Emergências
const emergencyData = [
  {
    id: 'burns',
    title: 'Queimaduras',
    description: 'Para queimaduras térmicas leves (1º e 2º grau).',
    icon: <Flame size={40} />,
    color: 'bg-orange-500',
    lightColor: 'bg-orange-50',
    textColor: 'text-orange-600',
    steps: [
      {
        title: 'Resfrie a área',
        content: 'Coloque a parte queimada sob água corrente fria (não gelada) por 10 a 15 minutos. Isso diminui a dor e o inchaço.'
      },
      {
        title: 'Proteja a lesão',
        content: 'Cubra a queimadura com um pano limpo ou gaze úmida para evitar infecções. Não estoure bolhas.'
      },
      {
        title: 'Procure um médico',
        content: 'Mesmo que pareça leve, vá a uma unidade de saúde para avaliação profissional e curativo adequado.'
      }
    ],
    warning: 'NUNCA use gelo direto, manteiga, pó de café ou pasta de dente.'
  },
  {
    id: 'cuts',
    title: 'Cortes e Sangramentos',
    description: 'Controle de hemorragias externas e cortes superficiais.',
    icon: <Scissors size={40} />,
    color: 'bg-red-500',
    lightColor: 'bg-red-50',
    textColor: 'text-red-600',
    steps: [
      {
        title: 'Comprima o local',
        content: 'Use um pano limpo ou gaze e faça pressão direta sobre o ferimento para estancar o sangue.'
      },
      {
        title: 'Limpe (se for superficial)',
        content: 'Se o sangramento parar, lave suavemente com água e sabão neutro.'
      },
      {
        title: 'Procure um médico',
        content: 'Se o corte for profundo, não parar de sangrar ou houver objetos no ferimento, vá ao hospital imediatamente.'
      }
    ],
    warning: 'NÃO tente retirar objetos profundos ou fazer torniquetes sem treinamento.'
  },
  {
    id: 'choking',
    title: 'Engasgo (Adulto)',
    description: 'Obstrução das vias aéreas por alimento ou objeto.',
    icon: <Wind size={40} />,
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    steps: [
      {
        title: 'Incentive a tosse',
        content: 'Se a pessoa consegue falar ou tossir, incentive-a a tossir com força.'
      },
      {
        title: 'Manobra de Heimlich',
        content: 'Se não houver som, abrace a pessoa por trás, feche o punho na boca do estômago e faça movimentos fortes para dentro e para cima.'
      },
      {
        title: 'Procure um médico',
        content: 'Mesmo que o objeto saia, a pessoa deve ser examinada por um médico para garantir que não há lesões internas.'
      }
    ],
    warning: 'Se a pessoa desmaiar, inicie a RCP (Ressuscitação Cardiopulmonar) e ligue 192.'
  },
  {
    id: 'fainting',
    title: 'Desmaio',
    description: 'Perda temporária de consciência.',
    icon: <Activity size={40} />,
    color: 'bg-purple-500',
    lightColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    steps: [
      {
        title: 'Deite a pessoa',
        content: 'Deite a pessoa de costas em uma superfície segura e eleve as pernas dela acima do nível do coração.'
      },
      {
        title: 'Facilite a respiração',
        content: 'Afrouxe roupas apertadas (colarinhos, cintos) e garanta que o ambiente esteja ventilado.'
      },
      {
        title: 'Procure um médico',
        content: 'Ao acordar, não dê comida ou água imediatamente. Leve-a ao médico para investigar a causa.'
      }
    ],
    warning: 'Se a pessoa não respirar, inicie a RCP imediatamente e ligue 192.'
  },
  {
    id: 'shock',
    title: 'Choque Elétrico',
    description: 'Acidentes com rede elétrica ou aparelhos.',
    icon: <Zap size={40} />,
    color: 'bg-yellow-500',
    lightColor: 'bg-yellow-50',
    textColor: 'text-yellow-600',
    steps: [
      {
        title: 'Corte a energia',
        content: 'Desligue a chave geral ou disjuntor antes de tocar na vítima. Não toque na pessoa se ela ainda estiver em contato com a corrente.'
      },
      {
        title: 'Afaste o perigo',
        content: 'Se não puder desligar, use um objeto não condutor (madeira seca, plástico) para afastar o fio.'
      },
      {
        title: 'Procure um médico',
        content: 'Toda vítima de choque elétrico deve ser avaliada em hospital, pois pode haver danos internos invisíveis.'
      }
    ],
    warning: 'Cuidado com água no chão. Garanta sua segurança antes de ajudar.'
  },
  {
    id: 'poisoning',
    title: 'Intoxicação',
    description: 'Ingestão ou contato com produtos químicos/venenos.',
    icon: <TriangleAlert size={40} />,
    color: 'bg-green-600',
    lightColor: 'bg-green-50',
    textColor: 'text-green-700',
    steps: [
      {
        title: 'Identifique a causa',
        content: 'Tente descobrir o que foi ingerido e guarde a embalagem ou rótulo.'
      },
      {
        title: 'Ligue para o SAMU/CEATOX',
        content: 'Ligue 192 ou para o centro de intoxicação local. Siga as instruções do atendente.'
      },
      {
        title: 'Procure um médico',
        content: 'Leve a vítima e a embalagem do produto imediatamente ao pronto-socorro.'
      }
    ],
    warning: 'NUNCA provoque vômito a menos que orientado por um profissional de saúde.'
  }
];

const App = () => {
  const [selectedEmergency, setSelectedEmergency] = useState(null);

  // Componente de Cabeçalho de Aviso
  const DisclaimerBanner = () => (
    <div className="bg-yellow-100 border-b border-yellow-200 p-2 text-center relative z-20">
      <p className="text-yellow-900 text-xs md:text-sm font-bold flex items-center justify-center gap-2 uppercase tracking-wide">
        <AlertOctagon size={14} />
        Aviso Legal: Este guia é informativo. Em casos graves, ligue 192.
      </p>
    </div>
  );

  // Tela Principal (Menu)
  const MenuView = () => (
    <div className="animate-in fade-in duration-500">
      
      {/* Grid de Cartões */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 -mt-8 relative z-10 px-4">
        {emergencyData.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedEmergency(item)}
            className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border-2 border-slate-200 hover:border-red-400 text-left flex flex-col h-full hover:-translate-y-1 active:scale-95"
          >
            <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 transition-transform ring-4 ring-white`}>
              {item.icon}
            </div>
            <h2 className="text-xl font-extrabold text-slate-800 mb-2 group-hover:text-red-600 transition-colors">{item.title}</h2>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">{item.description}</p>
            <div className={`mt-auto pt-5 text-sm font-bold ${item.textColor} flex items-center uppercase tracking-wide`}>
              Ver Procedimentos <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        ))}
      </div>

      {/* Seção de Telefones de Emergência */}
      <div className="px-4">
        <div className="bg-slate-800 text-white rounded-2xl p-6 md:p-8 shadow-xl mb-8 border-t-4 border-red-500">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-red-600 p-4 rounded-full animate-pulse shadow-lg shadow-red-900/50">
                <Phone size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Telefones de Emergência</h3>
                <p className="text-slate-300 text-sm">Tenha sempre em mãos em caso de gravidade.</p>
              </div>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <div className="flex-1 md:flex-none bg-slate-700 p-4 rounded-xl text-center min-w-[120px] border border-slate-600">
                <span className="block text-3xl font-black text-white">192</span>
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-300">SAMU</span>
              </div>
              <div className="flex-1 md:flex-none bg-slate-700 p-4 rounded-xl text-center min-w-[120px] border border-slate-600">
                <span className="block text-3xl font-black text-white">193</span>
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-300">Bombeiros</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Tela de Detalhes (Passo a Passo)
  const DetailView = ({ data }) => (
    <div className="animate-in slide-in-from-right duration-300 max-w-3xl mx-auto pt-8 px-4">
      <button 
        onClick={() => setSelectedEmergency(null)}
        className="mb-6 flex items-center text-slate-600 hover:text-red-700 font-bold bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 hover:bg-red-50 transition-all"
      >
        <ArrowLeft size={20} className="mr-2" /> Voltar para o menu
      </button>

      {/* Cabeçalho do Detalhe */}
      <div className={`${data.color} rounded-t-3xl p-8 md:p-10 text-white shadow-lg relative overflow-hidden border-b-4 border-black/10`}>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
          <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md shadow-inner w-fit">
            {React.cloneElement(data.icon, { size: 48 })}
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">{data.title}</h2>
            <p className="text-white/90 mt-2 font-medium text-lg">Guia de procedimento rápido</p>
          </div>
        </div>
        <div className="absolute -bottom-10 -right-10 opacity-20 transform scale-150 rotate-12 mix-blend-overlay">
           {React.cloneElement(data.icon, { size: 200 })}
        </div>
      </div>

      {/* Corpo do Detalhe */}
      <div className="bg-white rounded-b-3xl shadow-xl border-x-2 border-b-2 border-slate-200 p-6 md:p-10">
        
        {/* Passos */}
        <div className="space-y-8 relative">
          {/* Linha vertical de conexão (opcional, visual) */}
          <div className="absolute left-5 top-4 bottom-4 w-0.5 bg-slate-100 hidden md:block"></div>

          {data.steps.map((step, index) => (
            <div key={index} className="flex gap-6 relative">
              <div className="flex-shrink-0 relative">
                <div className={`${data.lightColor} ${data.textColor} w-12 h-12 rounded-full flex items-center justify-center font-black text-xl border-4 border-white shadow-md ring-2 ring-slate-100`}>
                  {index + 1}
                </div>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl w-full border border-slate-100 hover:border-slate-300 transition-colors">
                <h3 className="text-xl font-bold text-slate-800 mb-2">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium">{step.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Aviso Específico */}
        <div className="mt-10 bg-red-50 border-l-8 border-red-600 p-6 rounded-r-xl shadow-sm">
          <div className="flex gap-4 items-start">
            <TriangleAlert className="text-red-600 flex-shrink-0 mt-1" size={28} />
            <div>
              <p className="font-black text-red-800 text-lg uppercase tracking-wider">Atenção Crítica</p>
              <p className="text-red-700 font-medium mt-1 text-lg">{data.warning}</p>
            </div>
          </div>
        </div>

        {/* Botão de Conclusão/Médico */}
        <div className="mt-10 pt-8 border-t-2 border-slate-100 text-center">
          <p className="text-slate-500 mb-4 font-medium">Lembre-se: O socorro inicial não substitui o médico.</p>
          <button 
            onClick={() => setSelectedEmergency(null)}
            className="w-full md:w-auto px-10 py-4 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Entendido, voltar ao início
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 font-sans selection:bg-red-100 selection:text-red-900">
      {/* Banner Topo */}
      <DisclaimerBanner />

      {/* Header Vermelho Principal - Apenas visível no Menu */}
      {!selectedEmergency && (
        <div className="bg-red-600 text-white pb-24 pt-12 px-4 shadow-lg">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="inline-flex items-center justify-center p-3 bg-red-700 rounded-full mb-4 shadow-inner">
              <HeartPulse size={32} className="text-white animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-md">
              Primeiros Socorros
            </h1>
            <p className="text-red-100 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Guia rápido de resposta para emergências domésticas. <br/>
              <span className="bg-red-800/50 px-2 py-0.5 rounded text-sm uppercase tracking-wider font-bold mt-2 inline-block">Mantenha a calma e siga os passos</span>
            </p>
          </div>
        </div>
      )}

      {/* Conteúdo Principal */}
      <main className="container mx-auto pb-12 max-w-6xl">
        {selectedEmergency ? (
          <DetailView data={selectedEmergency} />
        ) : (
          <MenuView />
        )}
      </main>

      {/* Rodapé */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-8 text-center px-4">
        <div className="container mx-auto">
          <p className="text-red-600 font-bold mb-2 text-sm uppercase tracking-wide">
            Em casos graves, sempre ligue para 192 ou vá ao hospital.
          </p>
          <p className="text-slate-400 text-sm font-medium">
            © 2026 Projeto Primeiros Socorros
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
