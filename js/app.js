$(document).ready(function () {
  axios.get('./data/projects.json')
    .then(function (response) {
      const projets = response.data;
      const projetsContainer = $('#projets');

      // Meilleure hiérarchie sémantique
      const section = $('<section>', { class: 'section', 'aria-label': 'Projets réalisés' });
      section.append('<h2 class="title is-3">Mes réalisations</h2>');

      const row = $('<div>', { class: 'columns is-multiline' });

      projets.forEach(function (projet) {
        const column = $(`
          <div class="column is-half">
            <article class="box" itemscope itemtype="http://schema.org/CreativeWork">
              <h3 class="title is-4" itemprop="headline">${projet.titre}</h3>
              <p itemprop="description">${projet.description}</p>
              <a href="${projet.lien}" itemprop="url" rel="noopener noreferrer" class="button is-link is-small mt-3" target="_blank">
                Détails du projet
              </a>
            </article>
          </div>
        `);
        row.append(column);
      });

      section.append(row);
      projetsContainer.append(section);
      
		// Apparition douce après injection
		row.find('.column').each(function (i) {
		$(this).delay(200 * i).fadeIn(500);
		});
		
		// Animation titre principal
		$('h1.title').hide().slideDown(800);
		
		// Hover sur les boutons
		$('a.button').hover(
		function () {
    		$(this).addClass('is-primary');
		},
		function () {
    		$(this).removeClass('is-primary');
		}
		);
    })
    .catch(function (error) {
      console.error("Erreur lors du chargement du fichier JSON :", error);
    });
});
