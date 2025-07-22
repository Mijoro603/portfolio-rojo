$(document).ready(function () {
  // 🧩 Initialisation (seulement pour la page d'accueil)
  if (!$('body').hasClass('home')) return;

  const JSON_PATH = './data/projects.json';
  const ITEMS_PER_PAGE = 6;

  let currentPage = 1;
  let totalItems = 0;
  let allItems = [];
  let filteredItems = [];

  init(); // Initialise tout sauf fetchData()

  // 🐌 Lazy Load avec Intersection Observer
  const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        fetchData(); // Charge les projets quand la section apparaît
        observer.unobserve(entry.target); // Ne recharge pas à chaque scroll
      }
    });
  }, { threshold: 0.25 });

  const projetsSection = document.querySelector('#projets');
  if (projetsSection) {
    observer.observe(projetsSection);
  }

  // 🔄 Initialisation complète
  function init() {
    // fetchData(); ← supprimé ici car déclenché par l'observateur
    bindUIEvents();
    animateHeader();
  }

  // 📡 Charge les données depuis le fichier JSON
  function fetchData() {
    axios.get(JSON_PATH)
      .then(response => {
        allItems = response.data.sort((a, b) => b.id.localeCompare(a.id)); // Ordre décroissant par ID
        filteredItems = [...allItems];
        totalItems = filteredItems.length;
        renderPagination();
        renderItems(currentPage);
      })
      .catch(error => console.error('Erreur de chargement JSON :', error));
  }

  // 🖼️ Affiche les éléments pour une page donnée
  function renderItems(page) {
    const $container = $('#projets').empty();

    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = Math.min(start + ITEMS_PER_PAGE, totalItems);
    const items = filteredItems.slice(start, end);

    if (items.length === 0) {
      $container.html(`<div class="column"><div class="notification is-warning">Aucun résultat trouvé</div></div>`);
      return;
    }

    items.forEach(item => {
      const $item = $(`
        <div class="column is-one-third" style="display:none;">
          <div class="item panel is-link my-2">
            <h3 class="panel-heading">${item.titre}</h3>
            <div class="columns">
            	<div class="column is-10"><p class="panel-block has-text-weight-semibold is-size-6">${item.description}</p></div>
            	<div class="column">
            		<div class="buttons is-right mt-2">
              			<button class="detailsBtn button is-link is-small is-responsive"
                			data-id="${item.id}"
                			data-url="${item.lien || '#'}"
                			data-title="${item.titre}">
                			<span class="icon"><i class="fas fa-square-plus"></i></span>
              			</button>
            		</div>
            	</div>
            </div>
            <div id="detailsForm-${item.id}" class="has-text-weight-light p-1" style="display:none; margin-top:-20px;">
              <div class="content p-1">${item.details}</div>
            </div>
          </div>
        </div>
      `);

      $container.append($item);
      $item.delay(200).fadeIn(300);
    });
  }

  // 🔢 Met à jour la pagination
  function renderPagination() {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const $pagination = $('#paginationNumbers').empty();

    $('#prevPage').toggleClass('is-disabled', currentPage === 1);
    $('#nextPage').toggleClass('is-disabled', currentPage === totalPages || totalPages === 0);

    for (let i = 1; i <= totalPages; i++) {
      $pagination.append(`
        <li>
          <a class="pagination-link ${i === currentPage ? 'is-current' : ''}" data-page="${i}">
            ${i}
          </a>
        </li>
      `);
    }
  }

  // 🔎 Applique la recherche
  function searchItems(term) {
    const query = term.toLowerCase().trim();

    filteredItems = query === ''
      ? [...allItems]
      : allItems.filter(item =>
          item.titre.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.details.toLowerCase().includes(query)
        );

    totalItems = filteredItems.length;
    currentPage = 1;
    renderPagination();
    renderItems(currentPage);
  }

  // 🧠 Événements UI
  function bindUIEvents() {
    $('#searchButton').click(() => searchItems($('#searchInput').val()));
    $('#searchInput').keypress(e => { if (e.which === 13) searchItems($('#searchInput').val()); });
    $('#resetSearch').click(() => { $('#searchInput').val(''); searchItems(''); });
    $('.search').click(() => $('div.field.has-addons').toggle());

    $(document).on('click', '.pagination-link', function () {
      const page = $(this).data('page');
      if (page !== currentPage) {
        currentPage = page;
        renderItems(currentPage);
        renderPagination();
      }
    });

    $('#prevPage').click(() => {
      if (currentPage > 1) {
        currentPage--;
        renderItems(currentPage);
        renderPagination();
      }
    });

    $('#nextPage').click(() => {
      const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
      if (currentPage < totalPages) {
        currentPage++;
        renderItems(currentPage);
        renderPagination();
      }
    });

    $(document).on('click', '.detailsBtn', function () {
      const id = $(this).data('id');
      $(`#detailsForm-${id}`).toggle();
    });

    // Hover visuel sur les boutons
    $('#projets').on('mouseenter', 'a.button', function () {
      $(this).addClass('is-primary');
    }).on('mouseleave', 'a.button', function () {
      $(this).removeClass('is-primary');
    });
  }

  // 🎬 Animation titre principal
  function animateHeader() {
    $('h1.title').hide().slideDown(800);
  }
});
