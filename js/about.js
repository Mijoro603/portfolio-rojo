$(document).ready(function () {
  // Fonction de chargement des données JSON
  function loadAboutData() {
    axios.get('./data/about.json')
      .then(response => {
        const data = response.data;

        // Profil résumé
        $('#profil').html(`<p>${data.profil}</p><p class="mt-3">${data.poste} | ${data.secteur}</p>`);

        // Formation
        $('#formation').html(`<h2 class="subtitle is-size-4 is-italic has-text-weight-bold">Formation</h2><p>${data.formation}</p>`);

        // Objectif
        $('#objectif').html(`<h2 class="subtitle is-size-4 is-italic has-text-weight-bold">Objectif professionnel</h2><p>${data.objectif}</p>`);

        // Expérience
        let xpHTML = '<h2 class="subtitle is-size-4 is-italic has-text-weight-bold">Expérience professionnelle</h2>';
        data.experience.forEach(exp => {
          xpHTML += `<h3 class="has-text-weight-bold">${exp.poste}</h3>
                     <p class="is-size-7">${exp.organisation}</p>
                     <ul class="content" style="list-style-type: circle!important; padding-left: 16px;">`;
          exp.missions.forEach(m => {
            xpHTML += `<li>${m}</li>`;
          });
          xpHTML += '</ul>';
        });
        $('#experience').html(xpHTML);

        // Compétences
        const keys = ['frontend', 'backend', 'bdd', 'autres'];
        keys.forEach(cat => {
          data.competences[cat].forEach(c => {
            $(`#${cat}`).append(`<li>${c}</li>`);
          });
        });
      })
      .catch(error => {
        console.error("Erreur lors du chargement du fichier about.json", error);
      });
  }

  // Lazy Load avec IntersectionObserver
  const aboutObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadAboutData(); // Charge les données JSON
        observer.unobserve(entry.target); // Ne recharge pas plusieurs fois
      }
    });
  }, { threshold: 0.25 });

  const containerAbout = document.querySelector('.container');
  if (containerAbout) {
    aboutObserver.observe(containerAbout);
  }
});
