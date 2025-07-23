$(document).ready(function () {
  // 👀 Crée l'observateur
  const observer = new IntersectionObserver(function(entries, obs) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 📡 Charge les services quand la section est visible
        axios.get('./data/services.json')
          .then(response => {
            const services = response.data;
            services.forEach(service => {
              $('#services').append(`
                <div class="column is-one-third">
                  <div class="box">
                    <h2 class="subtitle is-4 has-text-weight-semibold">${service.titre}</h2>
                    <p>${service.description}</p>
                  </div>
                </div>
              `);
            });
          })
          .catch(error => {
            console.error('Erreur de chargement :', error);
            $('#services').html(`<div class="notification is-danger">Impossible de charger les services.</div>`);
          });

        // 📵 Empêche de le recharger plusieurs fois
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  // 🎯 Cible la section
  const target = document.querySelector('#services');
  if (target) {
    observer.observe(target);
  }
});
