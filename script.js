/* Ocultar visualizações via JS */
.hidden-view { 
    display: none !important; 
}

/* Linha da timeline para o passo a passo */
.timeline-line::before {
    content: '';
    position: absolute;
    left: 1.25rem;
    top: 3rem;
    bottom: -1rem;
    width: 3px;
    background: #f1f5f9; /* cinza bem claro */
    z-index: 0;
}

.timeline-item:last-child .timeline-line::before {
    display: none;
}
