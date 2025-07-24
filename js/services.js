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
  
    // 🕒 Fuseau horaire GMT+3 (Moscou, Téheran, Riad, Naïrobi)
  const maintenant = new Date();
  const optionsJour = { weekday: 'long', timeZone: 'Africa/Nairobi' };
  const heureLocale = maintenant.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Nairobi', hour12: false });

  // ⏰ Horaires d’ouverture en GMT+3
  const horairesDispo = {
    'lundi':     { debut: '07:00', fin: '17:00' },
    'mardi':     { debut: '07:00', fin: '17:00' },
    'mercredi':  { debut: '07:00', fin: '17:00' },
    'jeudi':     { debut: '07:00', fin: '17:00' },
    'vendredi':  { debut: '07:00', fin: '17:00' },
    /* 'samedi':    { debut: '07:00', fin: '14:00' },
    'dimanche':  { debut: '07:00', fin: '12:00' } */
  };

  const jourActuel = maintenant.toLocaleDateString('fr-FR', optionsJour).toLowerCase();
  const horaireDuJour = horairesDispo[jourActuel];

  const afficherHoraires = () => {
    $('#horaires').html(`
      <div class="content">
        <p class="has-text-weight-semibold">
          <!-- ⏱️ Les horaires affichés ci-dessous sont en fuseau horaire GMT+3 comme Riad, Naïrobi, ... et Antananarivo . // Moscou, Téhéran -->
          🕒 Mes disponibilités sont établies selon le fuseau horaire GMT+3, correspondant à des villes telles que Antananarivo, Riad, ou encore Naïrobi. Merci d’en tenir compte lors de vos prises de contact ou demandes de collaboration.
        </p>
        <ul>
          <li><strong>Lundi - Vendredi :</strong> 07:00 à 17:00</li>
          <!--li><strong>Samedi :</strong> 07:00 à 14:00</li>
          <li><strong>Dimanche :</strong> 07:00 à 12:00</li-->
        </ul>
      </div>
    `);
  };

  const afficherIndisponible = (message) => {
    $('#horaires').html(`
      <div class="notification is-warning is-light">
        <strong>⏳ Indisponible pour le moment :</strong> ${message}
      </div>
    `);
  };

  // 🔎 Vérifie si l’heure actuelle est dans la plage d’ouverture
  if (horaireDuJour) {
    const heureActuelle = heureLocale;
    const debut = horaireDuJour.debut;
    const fin = horaireDuJour.fin;

    if (heureActuelle >= debut && heureActuelle <= fin) {
      afficherHoraires(); // ✅ Disponible
    } else {
      afficherIndisponible("Actuellement, je ne suis pas disponible sur ce créneau horaire car je suis engagé dans un projet en cours ou en période de repos programmée. Je reste toutefois à votre écoute pour planifier une future collaboration"); // Je suis actuellement en congé ou en train de finaliser un projet.
    }
  } else {
    afficherIndisponible("Actuellement, aucune disponibilité n’est prévue pour ce jour ou cette plage horaire. Il se peut que le jour ne soit pas pris en compte par le système ou que je sois engagé sur un projet en cours ou en période de repos. Je reste disponible pour échanger et organiser un rendez-vous selon vos besoins."); // Jour non pris en charge ou erreur d’horodatage.
  }
});
