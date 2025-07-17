$(document).ready(function () {
// Vérifie que la page est bien la page d’accueil
const isHomePage = $('body').hasClass('home');
if (!isHomePage) return;

const JSON_PATH = './data/projects.json'; // Facile à changer si besoin
let currentPage = 1;
const itemsPerPage = 6;
let totalItems = 0;
let allItems = [];
let filteredItems = [];

function fetchItems() {
    axios.get(JSON_PATH)
        .then(response => {
            allItems = response.data;
            filteredItems = [...allItems];
            totalItems = filteredItems.length;
            updatePagination();
            displayItemsForPage(currentPage);
        })
        .catch(error => console.error('Error:', error));
}

function displayItemsForPage(page) {
  const $itemsList = $('#projets');
  $itemsList.empty();

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const itemsToDisplay = filteredItems.slice(startIndex, endIndex);

  if (itemsToDisplay.length === 0) {
    $itemsList.html('<div class="column"><div class="notification is-warning">Aucun résultat trouvé</div></div>');
    return;
  }

  itemsToDisplay.forEach(item => {
    const $itemDiv = $(`
      <div class="column is-one-third" style="display:none;">
        <div class="item panel is-link my-2">
          <h3 class="panel-heading">${item.titre}</h3>
          <p class="panel-block has-text-weight-light">${item.description}</p>
          <div class="buttons is-right mt-2">
            <button class="detailsBtn button is-link is-small is-responsive mr-5" 
              data-id="${item.id}" 
              data-url="${item.lien || '#'}" 
              data-title="${item.titre}">Voir plus</button>
          </div>
          <div id="detailsForm-${item.id}" class="field p-1" style="display:none; margin-top:-20px;">
            <div class="content p-1">${item.details} </div>
          </div>
        </div>
      </div>
    `);

    $itemsList.append($itemDiv);
    $itemDiv.delay(200).fadeIn(300); // animation douce
  });
}

function updatePagination() {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const $paginationNumbers = $('#paginationNumbers');
    $paginationNumbers.empty();

    $('#prevPage').toggleClass('is-disabled', currentPage === 1);
    $('#nextPage').toggleClass('is-disabled', currentPage === totalPages || totalPages === 0);

    for (let i = 1; i <= totalPages; i++) {
        $paginationNumbers.append(
            `<li><a class="pagination-link ${i === currentPage ? 'is-current' : ''}" 
                data-page="${i}">${i}</a></li>`
        );
    }
}

function performSearch(searchTerm) {
    searchTerm = searchTerm.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredItems = [...allItems];
    } else {
        filteredItems = allItems.filter(item => 
            item.titre.toLowerCase().includes(searchTerm) || 
            item.description.toLowerCase().includes(searchTerm) || 
            item.details.toLowerCase().includes(searchTerm)
        );
    }
    
    totalItems = filteredItems.length;
    currentPage = 1;
    updatePagination();
    displayItemsForPage(currentPage);
}

// Gestion des événements
$(document).on('click', '#prevPage', function() {
    if (currentPage > 1) {
        currentPage--;
        displayItemsForPage(currentPage);
        updatePagination();
    }
});

$(document).on('click', '#nextPage', function() {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayItemsForPage(currentPage);
        updatePagination();
    }
});

$(document).on('click', '.pagination-link', function() {
    const page = $(this).data('page');
    if (page !== currentPage) {
        currentPage = page;
        displayItemsForPage(currentPage);
        updatePagination();
    }
});

$(document).on('click', '.search', function() {
    $('div.field.has-addons').toggle();
});

$(document).on('click', '.detailsBtn', function() {
    const id = $(this).data('id');
    $(`#detailsForm-${id}`).toggle();
});

$('#searchButton').click(function() {
    const searchTerm = $('#searchInput').val();
    performSearch(searchTerm);
});

$('#searchInput').keypress(function(e) {
    if (e.which === 13) {
        const searchTerm = $('#searchInput').val();
        performSearch(searchTerm);
    }
});

$('#resetSearch').click(function() {
    $('#searchInput').val('');
    performSearch('');
});

// Charger les items au démarrage
fetchItems();

// Animation h1
$('h1.title').hide().slideDown(800);

// Effet de survol
$itemsList.on('mouseenter', 'a.button', function () {
    $(this).addClass('is-primary');
}).on('mouseleave', 'a.button', function () {
    $(this).removeClass('is-primary');
});

});

/*$(document).ready(function () {
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
*/
