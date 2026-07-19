
  // Mobile Menu
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  mobileMenuBtn.addEventListener('click', () => {
    const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuBtn.querySelector('i');
    icon.className = mobileMenu.classList.contains('hidden') ? 'fas fa-bars text-xl' : 'fas fa-times text-xl';
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      mobileMenuBtn.querySelector('i').className = 'fas fa-bars text-xl';
    });
  });

  // ABOUT DATA
  function loadAboutData() {
    axios.get('./data/about.json')
      .then(response => {
        const data = response.data;
        $('#profil').html(`<p class="mb-3">${data.profil}</p><p class="text-brand-primary font-semibold">${data.poste} | ${data.secteur}</p>`);
        const badgesHtml = [
          { text: 'FullStack', cls: 'badge-vue' },
          { text: 'TypeScript', cls: 'badge-react' },
          { text: 'TailwindCss', cls: 'badge-node' },
          { text: 'PHP', cls: 'badge-php' },
          { text: 'CodeIgniter', cls: 'badge-ci' },
          { text: 'Laravel', cls: 'badge-laravel' },
          { text: 'Symfony', cls: 'badge-symfony' },
          { text: 'Python', cls: 'badge-python' },
          { text: 'Django', cls: 'badge-python' },
          { text: 'FastAPI', cls: 'badge-python' },
          { text: 'Data Analysis', cls: 'badge-db' },
          { text: 'Data Science', cls: 'badge-db' },
          { text: 'SGBDR Expert', cls: 'badge-db' },
          { text: 'Agent IA', cls: 'badge-default' },
          { text: '7+ ans exp.', cls: 'badge-node' },
          { text: 'Madagascar', cls: 'badge-angular' }
        ].map(b => `<span class="px-3 py-1 rounded-full text-xs font-semibold ${b.cls}">${b.text}</span>`).join('');
        $('#about-badges').html(badgesHtml);
        $('#formation').html(`<h3 class="text-xl font-bold text-brand-primary mb-3 flex items-center gap-2"><i class="fas fa-graduation-cap"></i> Formation</h3><p class="text-slate-300">${data.formation}</p>`);
        $('#objectif').html(`<h3 class="text-xl font-bold text-brand-secondary mb-3 flex items-center gap-2"><i class="fas fa-bullseye"></i> Objectif professionnel</h3><p class="text-slate-300">${data.objectif}</p>`);
        let xpHTML = `<h3 class="text-xl font-bold text-white mb-4 flex items-center gap-2"><i class="fas fa-briefcase text-brand-accent"></i> Expérience professionnelle</h3>`;
        data.experience.forEach(exp => {
          xpHTML += `<div class="mb-4 pb-4 border-b border-white/10 last:border-0"><h4 class="font-bold text-white">${exp.poste}</h4><p class="text-xs text-slate-500 mb-2">${exp.organisation}</p><ul class="space-y-1 text-sm text-slate-400" style="list-style-type:circle;padding-left:16px">`;
          exp.missions.forEach(m => { xpHTML += `<li>${m}</li>`; });
          xpHTML += '</ul></div>';
        });
        $('#experience').html(xpHTML);
      })
      .catch(error => { console.error("Erreur about.json:", error); });
  }

  // STACKS DATA (compétences)
  function loadStacksData() {
    axios.get('./data/about.json')
      .then(response => {
        const data = response.data;
        const keys = ['frontend', 'backend', 'bdd', 'autres'];
        keys.forEach(cat => {
          $(`#${cat}`).empty();
          data.competences[cat].forEach(c => {
            $(`#${cat}`).append(`<li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>${c}</li>`);
          });
        });
      })
      .catch(error => { console.error("Erreur stacks:", error); });
  }

  // SERVICES DATA
  function loadServicesData() {
    axios.get('./data/services.json')
      .then(response => {
        const services = response.data;
        services.forEach((service, index) => {
          const isCTA = service.titre === "Prêt à collaborer ?";
          const iconMap = {
            "Conception web": "fa-paint-brush",
            "Développement d'applications": "fa-code",
            "UX/UI Design": "fa-palette",
            "SEO & Marketing digital": "fa-chart-line",
            "Bases de données": "fa-database",
            "Prêt à collaborer ?": "fa-handshake"
          };
          const icon = iconMap[service.titre] || "fa-cog";
          const colors = [
            "from-brand-primary/20 to-brand-primary/5 border-brand-primary/30",
            "from-brand-accent/20 to-brand-accent/5 border-brand-accent/30",
            "from-brand-secondary/20 to-brand-secondary/5 border-brand-secondary/30",
            "from-purple-500/20 to-purple-500/5 border-purple-500/30",
            "from-green-500/20 to-green-500/5 border-green-500/30",
            "from-brand-primary/20 to-brand-accent/5 border-brand-primary/30"
          ];
          if (isCTA) {
            $('#services-grid').append(`<div class="sm:col-span-2 lg:col-span-1"><div class="h-full glass rounded-2xl p-6 border ${colors[index]} card-glow transition-all duration-500 hover:-translate-y-1 flex flex-col justify-center items-center text-center"><div class="w-14 h-14 rounded-full bg-gradient-to-br ${colors[index].split(' ')[0]} flex items-center justify-center mb-4 text-2xl"><i class="fas ${icon} text-white"></i></div><h3 class="text-lg font-bold text-white mb-3">${service.titre}</h3><div class="text-slate-300">${service.description}</div></div></div>`);
          } else {
            $('#services-grid').append(`<div class="glass rounded-2xl p-6 border ${colors[index]} card-glow transition-all duration-500 hover:-translate-y-1"><div class="w-12 h-12 rounded-full bg-gradient-to-br ${colors[index].split(' ')[0]} flex items-center justify-center mb-4 text-xl"><i class="fas ${icon} text-white"></i></div><h3 class="text-lg font-bold text-white mb-3">${service.titre}</h3><p class="text-slate-400 text-sm leading-relaxed">${service.description}</p></div>`);
          }
        });
      })
      .catch(error => {
        console.error('Erreur services:', error);
        $('#services-grid').html(`<div class="col-span-full text-center text-brand-accent p-4">Impossible de charger les services.</div>`);
      });
  }

  // HORAIRES
  function loadHoraires() {
    const maintenant = new Date();
    const optionsJour = { weekday: 'long', timeZone: 'Africa/Nairobi' };
    const heureLocale = maintenant.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Nairobi', hour12: false });
    const horairesDispo = {
      'lundi': { debut: '07:00', fin: '17:00' },
      'mardi': { debut: '07:00', fin: '17:00' },
      'mercredi': { debut: '07:00', fin: '17:00' },
      'jeudi': { debut: '07:00', fin: '17:00' },
      'vendredi': { debut: '07:00', fin: '17:00' },
    };
    const jourActuel = maintenant.toLocaleDateString('fr-FR', optionsJour).toLowerCase();
    const horaireDuJour = horairesDispo[jourActuel];
    const afficherHoraires = () => {
      $('#horaires').html(`<div class="glass rounded-2xl p-6 border border-brand-primary/30"><p class="font-semibold text-brand-primary mb-3"><i class="fas fa-clock mr-2"></i>Mes disponibilités (GMT+3 — Antananarivo, Riad, Nairobi)</p><ul class="space-y-2 text-slate-300 text-sm"><li><strong class="text-white">Lundi - Vendredi :</strong> 07:00 à 17:00</li></ul></div>`);
    };
    const afficherIndisponible = (message) => {
      $('#horaires').html(`<div class="glass rounded-2xl p-6 border border-brand-secondary/30"><p class="font-bold text-brand-secondary mb-2"><i class="fas fa-clock mr-2"></i>⏳ Indisponible pour le moment</p><p class="text-slate-300 text-sm">${message}</p></div>`);
    };
    if (horaireDuJour) {
      const heureActuelle = heureLocale;
      const debut = horaireDuJour.debut;
      const fin = horaireDuJour.fin;
      if (heureActuelle >= debut && heureActuelle <= fin) {
        afficherHoraires();
      } else {
        afficherIndisponible("Actuellement, je ne suis pas disponible sur ce créneau horaire car je suis engagé dans un projet en cours ou en période de repos programmée. Je reste toutefois à votre écoute pour planifier une future collaboration");
      }
    } else {
      afficherIndisponible("Actuellement, aucune disponibilité n'est prévue pour ce jour ou cette plage horaire. Il se peut que le jour ne soit pas pris en compte par le système ou que je sois engagé sur un projet en cours ou en période de repos. Je reste disponible pour échanger et organiser un rendez-vous selon vos besoins.");
    }
  }

  // PROJECTS
  const JSON_PATH = './data/projects.json';
  const ITEMS_PER_PAGE = 6;
  let currentPage = 1;
  let totalItems = 0;
  let allItems = [];
  let filteredItems = [];

  function getTechBadges(description) {
    const techs = [];
    const desc = description.toLowerCase();
    const techMap = [
      ['react', 'React', 'badge-react'],
      ['vue', 'Vue', 'badge-vue'],
      ['angular', 'Angular', 'badge-angular'],
      ['laravel', 'Laravel', 'badge-laravel'],
      ['symfony', 'Symfony', 'badge-symfony'],
      ['codeigniter', 'CodeIgniter', 'badge-ci'],
      ['node', 'Node.js', 'badge-node'],
      ['express', 'Express', 'badge-node'],
      ['php', 'PHP', 'badge-php'],
      ['python', 'Python', 'badge-python'],
      ['mysql', 'MySQL', 'badge-db'],
      ['mariadb', 'MariaDB', 'badge-db'],
      ['postgresql', 'PostgreSQL', 'badge-db'],
      ['sqlite', 'SQLite', 'badge-db'],
      ['oracle', 'Oracle', 'badge-db'],
      ['mongodb', 'MongoDB', 'badge-db'],
      ['supabase', 'Supabase', 'badge-db'],
      ['javascript', 'JavaScript', 'badge-node'],
      ['html', 'HTML/CSS', 'badge-react'],
      ['java ', 'Java', 'badge-angular'],
      ['spring', 'Spring', 'badge-angular'],
      ['c#', 'C#', 'badge-symfony'],
      ['c++', 'C++', 'badge-laravel'],
      ['go', 'Go', 'badge-laravel'],
      ['ruby', 'Ruby', 'badge-symfony'],
      ['rust', 'Rust', 'badge-symfony'],
      ['docker', 'Docker', 'badge-laravel'],
      ['bootstrap', 'Bootstrap', 'badge-react'],
      ['bulma', 'Bulma', 'badge-react'],
      ['tailwind', 'Tailwind', 'badge-node'],
      ['jquery', 'jQuery', 'badge-node'],
      ['django', 'Django', 'badge-python'],
      ['fastapi', 'FastAPI', 'badge-python'],
      ['flask', 'Flask', 'badge-python'],
      ['odoo', 'Odoo', 'badge-python'],
      ['mkdocs', 'MKDocs', 'badge-python'],
      ['rest', 'REST API', 'badge-symfony'],
      ['websocket', 'WebSocket', 'badge-angular'],
      ['elasticsearch', 'ELK', 'badge-node'],
      ['ldap', 'LDAP', 'badge-default'],
      ['uml', 'UML', 'badge-angular'],
      ['android', 'Android', 'badge-default'],
      ['flutter', 'Flutter', 'badge-react'],
      ['wordpress', 'Wordpress', 'badge-react'],
      ['hugo', 'Hugo', 'badge-default'],
      ['markdown', 'Markdown', 'badge-laravel'],
      ['json', 'JSON', 'badge-node'],
      ['ajax', 'AJAX', 'badge-php'],
      ['sass', 'SASS', 'badge-php'],
      ['typescript', 'TypeScript', 'badge-laravel'],
      ['vite', 'Vite', 'badge-laravel'],
      ['shadcn', 'Shadcn', 'badge-laravel'],
      ['pl/sql', 'PL/SQL', 'badge-db'],
      ['trigger', 'Triggers', 'badge-db'],
      ['procedure', 'Procedures', 'badge-db'],
      ['pdo', 'PDO', 'badge-php'],
      ['curl', 'cURL', 'badge-php'],
      ['postman', 'Postman', 'badge-laravel'],
      ['jira', 'JIRA', 'badge-angular'],
      ['trello', 'Trello', 'badge-node'],
      ['scrum', 'Scrum', 'badge-php'],
      ['google', 'Google', 'badge-python'],
      ['codesandbox', 'CodeSandbox', 'badge-laravel'],
      ['biome', 'Biome', 'badge-default'],
      ['marked', 'Marked.js', 'badge-laravel'],
      ['highlight', 'Highlight.js', 'badge-laravel'],
      ['only-dev', 'only-dev', 'badge-php'],
      ['jsonplaceholder', 'JSONPlaceholder', 'badge-node'],
      ['live-server', 'Live Server', 'badge-node'],
      ['notepad++', 'Notepad++', 'badge-vue'],
      ['sublime', 'Sublime', 'badge-symfony'],
      ['vscode', 'VS Code', 'badge-react'],
      ['netbeans', 'NetBeans', 'badge-default'],
      ['aptana', 'Aptana', 'badge-default'],
      ['tomcat', 'Tomcat', 'badge-angular'],
      ['xampp', 'XAMPP', 'badge-laravel'],
      ['apache', 'Apache', 'badge-angular'],
      ['wamp', 'WAMP', 'badge-laravel'],
      ['phpmyadmin', 'phpMyAdmin', 'badge-db'],
      ['pgadmin', 'pgAdmin', 'badge-db'],
      ['mysql workbench', 'Workbench', 'badge-db'],
      ['sqlite studio', 'SQLiteStudio', 'badge-db'],
      ['console', 'Console', 'badge-symfony'],
      ['terminal', 'Terminal', 'badge-symfony'],
      ['git', 'Git', 'badge-vue'],
      ['github', 'GitHub', 'badge-laravel'],
      ['gitlab', 'GitLab', 'badge-node'],
      ['ungit', 'Ungit', 'badge-node'],
      ['mdx', 'MDX', 'badge-node'],
      ['featherpad', 'FeatherPad', 'badge-react'],
      ['dart-sass', 'Dart-Sass', 'badge-node'],
      ['npm', 'NPM', 'badge-node'],
      ['cmake', 'CMake', 'badge-ci'],
      ['odbc', 'ODBC', 'badge-default'],
      ['tty', 'TTY', 'badge-symfony'],
      ['virtual', 'VM', 'badge-default'],
      ['debian', 'Debian', 'badge-default'],
      ['openclassrooms', 'OpenClassrooms', 'badge-db'],
      ['grafikart', 'Grafikart', 'badge-node'],
      ['w3schools', 'W3Schools', 'badge-vue'],
      ['visual paradigm', 'V.Paradigm', 'badge-ci'],
      ['modelio', 'Modelio', 'badge-ci'],
      ['staruml', 'StarUML', 'badge-default'],
      ['plantuml', 'PlantUML', 'badge-default'],
      ['htc', 'HTC Emu', 'badge-default'],
      ['emulateur', 'Emulateur', 'badge-default'],
      ['spring boot', 'Spring Boot', 'badge-angular'],
      ['svelte', 'Svelte', 'badge-ci'],
      ['asp', 'ASP', 'badge-default'],
      ['vbscript', 'VBScript', 'badge-default'],
      ['jsp', 'JSP', 'badge-default'],
      ['wt ', 'WT', 'badge-ci'],
      ['elixir', 'Elixir', 'badge-ci'],
      ['razor', 'Razor', 'badge-default'],
      ['asp.net', 'ASP.NET', 'badge-default'],
      ['vb.net', 'VB.NET', 'badge-default'],
      ['merise', 'MERISE', 'badge-default'],
      ['2tup', '2TUP', 'badge-laravel'],
      ['cisco', 'CISCO', 'badge-laravel'],
      ['datacenter', 'DataCenter', 'badge-laravel'],
      ['erp', 'ERP', 'badge-laravel'],
      ['serverless', 'Serverless', 'badge-default'],
      ['agritech', 'AgriTech', 'badge-default'],
      ['lovable', 'Lovable', 'badge-default'],
    ];

    techMap.forEach(([keyword, name, cls]) => {
      if (desc.includes(keyword) && !techs.find(t => t.name === name)) {
        techs.push({name, class: cls});
      }
    });

    return techs.slice(0, 6).map(t => `<span class="px-2 py-0.5 rounded-full text-xs font-medium ${t.class}">${t.name}</span>`).join('');
  }

  function fetchData() {
    axios.get(JSON_PATH)
      .then(response => {
        allItems = response.data.sort((a, b) => b.id.localeCompare(a.id));
        filteredItems = [...allItems];
        totalItems = filteredItems.length;
        renderPagination();
        renderItems(currentPage);
      })
      .catch(error => console.error('Erreur JSON:', error));
  }

  function renderItems(page) {
    const $container = $('#projets-grid').empty();
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = Math.min(start + ITEMS_PER_PAGE, totalItems);
    const items = filteredItems.slice(start, end);

    if (items.length === 0) {
      $container.html(`<div class="col-span-full text-center py-12"><div class="glass rounded-2xl p-8 inline-block"><p class="text-brand-secondary font-semibold text-lg">Aucun résultat trouvé</p></div></div>`);
      return;
    }

    items.forEach(item => {
      const badges = getTechBadges(item.description);
      const $item = $(`
        <div class="glass rounded-2xl p-6 card-glow transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer group" data-id="${item.id}">
          <div class="flex items-start justify-between mb-4">
            <h3 class="text-lg font-bold text-white group-hover:text-brand-primary transition-colors">${item.titre}</h3>
            <button class="detailsBtn w-8 h-8 rounded-full bg-brand-primary/20 text-brand-primary flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all" data-id="${item.id}" data-title="${item.titre}">
              <i class="fas fa-plus text-sm"></i>
            </button>
          </div>
          <p class="text-slate-400 text-sm leading-relaxed mb-4">${item.description}</p>
          <div class="flex flex-wrap gap-2 mb-4">${badges}</div>
          <div id="details-${item.id}" class="hidden mt-4 pt-4 border-t border-white/10 text-slate-300 text-sm leading-relaxed"></div>
        </div>
      `);
      $container.append($item);
      $item.hide().fadeIn(300);
    });
  }

  function renderPagination() {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const $pagination = $('#paginationNumbers').empty();

    $('#prevPage').prop('disabled', currentPage === 1).toggleClass('opacity-50 cursor-not-allowed', currentPage === 1);
    $('#nextPage').prop('disabled', currentPage === totalPages || totalPages === 0).toggleClass('opacity-50 cursor-not-allowed', currentPage === totalPages || totalPages === 0);

    for (let i = 1; i <= totalPages; i++) {
      const isCurrent = i === currentPage;
      $pagination.append(`
        <button class="w-8 h-8 sm:w-10 sm:h-10 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${isCurrent ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/30' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'}" data-page="${i}">
          ${i}
        </button>
      `);
    }
  }

  function searchItems(term) {
    const query = term.toLowerCase().trim();
    filteredItems = query === '' ? [...allItems] : allItems.filter(item =>
      item.titre.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.details.toLowerCase().includes(query)
    );
    totalItems = filteredItems.length;
    currentPage = 1;
    renderPagination();
    renderItems(currentPage);
  }

  // Event bindings
  $('#searchButton').click(() => searchItems($('#searchInput').val()));
  $('#searchInput').on('keypress', e => { if (e.which === 13) searchItems($('#searchInput').val()); });
  $('#resetSearch').click(() => { $('#searchInput').val(''); searchItems(''); });

  $(document).on('click', '#paginationNumbers button', function () {
    const page = $(this).data('page');
    if (page !== currentPage) {
      currentPage = page;
      renderItems(currentPage);
      renderPagination();
      document.getElementById('projets').scrollIntoView({ behavior: 'smooth' });
    }
  });

  $('#prevPage').click(() => {
    if (currentPage > 1) {
      currentPage--;
      renderItems(currentPage);
      renderPagination();
      document.getElementById('projets').scrollIntoView({ behavior: 'smooth' });
    }
  });

  $('#nextPage').click(() => {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    if (currentPage < totalPages) {
      currentPage++;
      renderItems(currentPage);
      renderPagination();
      document.getElementById('projets').scrollIntoView({ behavior: 'smooth' });
    }
  });

  $(document).on('click', '.detailsBtn', function () {
    const id = $(this).data('id');
    const $details = $(`#details-${id}`);
    const item = allItems.find(i => i.id === id);
    if ($details.hasClass('hidden')) {
      $details.html(item.details).removeClass('hidden').hide().slideDown(300);
      $(this).html('<i class="fas fa-minus text-sm"></i>');
    } else {
      $details.slideUp(300, () => $details.addClass('hidden'));
      $(this).html('<i class="fas fa-plus text-sm"></i>');
    }
  });

  // CONTACT FORM
  $('#contactForm').submit(function (e) {
    e.preventDefault();
    const nom = $('#nom').val().trim();
    const email = $('#email').val().trim();
    const message = $('#message').val().trim();
    if (!nom || !email || !message) {
      showNotification('Veuillez remplir tous les champs.', 'bg-red-500');
      return;
    }
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('email', email);
    formData.append('message', message);
    const endpoint = "https://formspree.io/f/xyzjalaw";
    axios.post(endpoint, formData)
      .then(() => {
        showNotification('Votre message a bien été envoyé !', 'bg-green-500');
        $('#contactForm')[0].reset();
      })
      .catch(() => {
        showNotification("Une erreur est survenue lors de l'envoi. Veuillez réessayer plus tard.", 'bg-red-500');
      });
  });

  function showNotification(message, bgClass) {
    const $notif = $(`
      <div class="${bgClass} text-white px-6 py-4 rounded-xl shadow-lg mb-4 flex items-center justify-between animate-fade-in-up">
        <span>${message}</span>
        <button class="delete ml-4 text-white/80 hover:text-white"><i class="fas fa-times"></i></button>
      </div>
    `);
    $('#contactForm').before($notif);
    setTimeout(() => $notif.fadeOut(400, () => $notif.remove()), 5000);
  }

  $(document).on('click', '.delete', function () {
    $(this).closest('div').slideUp(400, () => $(this).closest('div').remove());
  });

  // AVAILABILITY MESSAGE
  const dateFinProjet = new Date('2025-07-24');
  const aujourdHui = new Date();
  let messageHtml = '';
  if (aujourdHui >= dateFinProjet) {
    messageHtml = `
      <div class="glass rounded-2xl p-6 border border-green-500/30">
        <p class="text-green-400 font-bold flex items-center gap-2">
          <i class="fas fa-check-circle"></i> Je suis disponible pour un projet dès maintenant. N'hésitez pas à me contacter pour discuter de vos idées.
        </p>
      </div>
    `;
  } else {
    const optionsDate = { day: 'numeric', month: 'long', year: 'numeric' };
    const dateText = dateFinProjet.toLocaleDateString('fr-FR', optionsDate);
    messageHtml = `
      <div class="glass rounded-2xl p-6 border border-brand-accent/30">
        <p class="text-brand-accent font-bold flex items-center gap-2">
          <i class="fas fa-clock"></i> Désolé, je suis actuellement engagé sur un projet qui se termine le <strong>${dateText}</strong>. Je reste disponible pour planifier une future collaboration.
        </p>
      </div>
    `;
  }
  $('#availabilityMessage').html(messageHtml);

  // FOOTER
  const année = new Date().getFullYear();
  const footerContent = `
    <div class="grid sm:grid-cols-2 gap-8 mb-8">
      <div class="text-left">
        <ul class="space-y-2 text-slate-400 text-sm">
          <li class="flex items-center gap-2"><i class="fas fa-envelope text-brand-primary w-5"></i>razosalama12050@gmail.com</li>
          <li class="flex items-center gap-2"><i class="fas fa-phone text-brand-primary w-5"></i>+261340513372</li>
          <li class="flex items-center gap-2"><i class="fab fa-whatsapp text-green-400 w-5"></i>+261330820002</li>
        </ul>
      </div>
      <div class="text-left sm:text-right">
        <p class="text-slate-400 text-sm mb-2"><strong class="text-white">Retrouvez-moi sur :</strong></p>
        <div class="flex flex-wrap gap-3 sm:justify-end">
          <a href="https://github.com/Mjoro603" class="text-slate-400 hover:text-brand-primary transition-colors text-sm">GitHub</a>
          <a href="https://linkedin.com/in/rojoniaina-zosalama-rakotomanana-7b324186" class="text-slate-400 hover:text-brand-primary transition-colors text-sm">LinkedIn</a>
          <a href="https://x.com/rajaonasyrojo" class="text-slate-400 hover:text-brand-primary transition-colors text-sm">X</a>
          <a href="https://www.youtube.com/@ZoSalamaNiaina/posts" class="text-slate-400 hover:text-brand-accent transition-colors text-sm">Youtube</a>
        </div>
      </div>
    </div>
    <div class="text-center text-xs text-slate-500 font-semibold border-t border-white/10 pt-6">
      &copy; ${année} — Tous droits réservés — Auteur : <strong class="text-slate-300">Zo Rojo</strong> — Réalisé avec : HTML5, CSS3, TailwindCSS, jQuery 3.7.1, Axios 1.8.2 et JSON
    </div>
  `;
  $('#portfolio-footer').html(footerContent);

  // Disable right click
  $(document).on("contextmenu", () => false);

  // Intersection Observers for lazy loading
  const aboutObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadAboutData();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  const stacksObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadStacksData();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  const servicesObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadServicesData();
        loadHoraires();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const projectsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        fetchData();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  const aboutSection = document.getElementById('about');
  const stacksSection = document.getElementById('staks');
  const servicesSection = document.getElementById('services');
  const projetsSection = document.getElementById('projets');

  if (aboutSection) aboutObserver.observe(aboutSection);
  if (stacksSection) stacksObserver.observe(stacksSection);
  if (servicesSection) servicesObserver.observe(servicesSection);
  if (projetsSection) projectsObserver.observe(projetsSection);
  