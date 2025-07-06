$(document).ready(function () {
  // Vérifie que la page est bien la page d’accueil
  const isHomePage = $('body').hasClass('home');
  if (!isHomePage) return;

  const JSON_PATH = './data/projects.json'; // Facile à changer si besoin

  axios.get(JSON_PATH)
    .then(response => {
      const projets = response.data;
      const projetsContainer = $('#projets');

      const section = $('<section>', {
        class: 'section',
        'aria-label': 'Liste des projets réalisés'
      }).append('<h2 class="title is-3">Mes réalisations</h2>');

      const row = $('<div>', { class: 'columns is-multiline' });

      projets.forEach((projet, i) => {
        const column = $(`
          <div class="column is-one-third" style="display:none;">
            <article class="box" itemscope itemtype="http://schema.org/CreativeWork">
              <h3 class="title is-4" itemprop="headline">${projet.titre}</h3>
              <p itemprop="description">${projet.description}</p>
              <a href="${projet.lien}" itemprop="url" class="button is-link is-small mt-3" rel="noopener noreferrer" target="_blank">
                Détails du projet
              </a>
            </article>
          </div>
        `);
        row.append(column);
      });

      section.append(row);
      projetsContainer.append(section);

      // Animation douce
      row.find('.column').each(function (i) {
        $(this).delay(200 * i).fadeIn(500);
      });

      $('h1.title').hide().slideDown(800);

      // Effet de survol
      projetsContainer.on('mouseenter', 'a.button', function () {
        $(this).addClass('is-primary');
      }).on('mouseleave', 'a.button', function () {
        $(this).removeClass('is-primary');
      });
    })
    .catch(error => {
      console.error('Erreur de chargement JSON :', error);
    });
});
