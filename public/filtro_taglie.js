/* === filtro_taglie.js – Versione 1.1 === */
/* Compatibile con uomo.html e donna.html */

document.addEventListener('DOMContentLoaded', () => {
  const filterIcon = document.getElementById('filterIcon');
  const filterPanel = document.getElementById('filterPanel');
  const filterSizesContainer = document.getElementById('filterSizes');
  const resetButton = document.getElementById('resetFilters');
  const gallery = document.getElementById('gallery');

  if (!filterIcon || !filterPanel) return;

  // Determina se è pagina uomo o donna
  const isUomo = window.location.href.includes('uomo');
  const taglie = isUomo ? [...Array(14)].map((_, i) => 36 + i) : [...Array(11)].map((_, i) => 35 + i);
  const selectedSizes = new Set();

  // Crea bottoni taglie
  filterSizesContainer.innerHTML = '';
  taglie.forEach(size => {
    const btn = document.createElement('button');
    btn.textContent = size;
    btn.addEventListener('click', () => {
      if (selectedSizes.has(size)) {
        selectedSizes.delete(size);
        btn.classList.remove('active');
      } else {
        selectedSizes.add(size);
        btn.classList.add('active');
      }
    });
    filterSizesContainer.appendChild(btn);
  });

  // Mostra/nascondi pannello
  filterIcon.addEventListener('click', () => {
    const isActive = filterPanel.classList.toggle('active');
    if (!isActive) {
      applicaFiltri();
    }
  });

  // Reset filtri
  resetButton.addEventListener('click', () => {
    selectedSizes.clear();
    document.querySelectorAll('.filter-sizes button').forEach(b => b.classList.remove('active'));
    applicaFiltri();
  });

  // Funzione per applicare i filtri
  function applicaFiltri() {
    const prodottiFiltrati = prodotti.filter(p => {
      if (p.category !== 'Scarpe') return false;

      if (selectedSizes.size === 0) return true;

      return p.sizes.some(taglia => {
        const base = Math.floor(taglia);
        return selectedSizes.has(base);
      });
    });

    mostraProdotti(prodottiFiltrati);
  }
});
