/* replace p by svg code for Component icons */
export function svgComponent() {
  document.querySelectorAll('[svg="component"]').forEach((element) => {
    const svgCode = element.textContent;
    if (svgCode !== null) {
      // Crée un DOMParser pour manipuler le SVG
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgCode, 'image/svg+xml');
      const svg = doc.querySelector('svg');
      if (svg) {
        svg.setAttribute('height', '100%');
        // Remplace le contenu de l'élément par le SVG modifié
        element.innerHTML = svg.outerHTML;
      } else {
        // Si ce n'est pas un SVG valide, fallback comportement original
        element.innerHTML = svgCode;
      }
    }
  });
}

/* Scroll to top when clicking on filter buttons */
export function filterScrollTop(): void {
  // Select all filter buttons and radio fields
  const filterElements = document.querySelectorAll(
    '.actualites_filters_button-all, .actualites_filters_radio_field'
  );

  // Add click event listener to each element
  filterElements.forEach((element) => {
    element.addEventListener('click', () => {
      // Scroll to top of the page with smooth animation
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  });
}

export function frDate(): void {
  if (window.location.pathname.includes('/en/')) {
    return;
  }

  const dateElements = document.querySelectorAll('[data-date-fr]');

  // Month translation mapping
  const monthTranslations: Record<string, string> = {
    January: 'Janvier',
    February: 'Février',
    March: 'Mars',
    April: 'Avril',
    May: 'Mai',
    June: 'Juin',
    July: 'Juillet',
    August: 'Août',
    September: 'Septembre',
    October: 'Octobre',
    November: 'Novembre',
    December: 'Décembre',
  };

  dateElements.forEach((element) => {
    let dateText = element.textContent;
    if (dateText) {
      Object.entries(monthTranslations).forEach(([english, french]) => {
        dateText = dateText!.replace(english, french);
      });

      element.textContent = dateText;
    }
  });
}

export function hideEmpty(): void {
  const emptyElements = document.querySelectorAll('.w-dyn-empty');

  emptyElements.forEach((element) => {
    const parentToHide = element.closest('[hide="if-empty"]');

    if (parentToHide) {
      (parentToHide as HTMLElement).style.display = 'none';
    }
  });
}
