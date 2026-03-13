/* Estilos customizados adicionais ao Tailwind CSS
 */

/* Oculta elementos da interface, mas permite transições quando exibidos via JS */
.hidden-view { 
    display: none !important; 
}

/* Estilização da linha vertical (Timeline) no passo a passo */
.timeline-item {
    position: relative;
}

.timeline-item::before {
    content: '';
    position: absolute;
    left: 1.5rem; /* Alinhado com o centro do círculo */
    top: 3.5rem;  /* Começa abaixo do círculo */
    bottom: -1rem; /* Estende até o próximo item */
    width: 3px;
    background: #e2e8f0; /* Cor cinza suave para a linha */
    border-radius: 4px;
    z-index: 0;
}

/* Remove a linha do último item para um acabamento limpo */
.timeline-item:last-child::before {
    display: none;
}

/* Customização da barra de rolagem (Scrollbar) para combinar com o tema escuro */
::-webkit-scrollbar { 
    width: 8px; 
}

::-webkit-scrollbar-track { 
    background: #150136; /* Cor roxo-escuro */
}

::-webkit-scrollbar-thumb { 
    background: #4A2B99; /* Cor roxo-bg */
    border-radius: 8px; 
}

::-webkit-scrollbar-thumb:hover { 
    background: #ffaa00; /* Cor destaque-laranja no hover */
}

/* Foco acessível para navegação por teclado (Acessibilidade) */
button:focus-visible, input:focus-visible {
    outline: 2px solid #ffdd00; /* Cor destaque-amarelo */
    outline-offset: 2px;
}
