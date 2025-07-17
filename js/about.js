$(document).ready(function () {
  axios.get('./data/about.json')
    .then(response => {
      const data = response.data;

      // Profil résumé
      $('#profil').html(`<p>${data.profil}</p><p class="mt-3"><strong>Poste :</strong> ${data.poste} | ${data.secteur}</p>`);

      // Formation
      $('#formation').html(`<h2 class="subtitle">Formation</h2><p>${data.formation}</p>`);

      // Objectif
      $('#objectif').html(`<h2 class="subtitle">Objectif professionnel</h2><p>${data.objectif}</p>`);

      // Expérience
      let xpHTML = '<h2 class="subtitle">Expérience professionnelle</h2>';
      data.experience.forEach(exp => {
        xpHTML += `<h3 class="has-text-weight-bold">${exp.poste}</h3><p>${exp.organisation}</p><ul>`;
        exp.missions.forEach(m => xpHTML += `<li>${m}</li>`);
        xpHTML += '</ul>';
      });
      $('#experience').html(xpHTML);

      // Localisation
      $('#localisation').html(`
        <h2 class="subtitle">Localisation</h2>
        <p>${data.localisation.ville}, ${data.localisation.région}, ${data.localisation.pays}</p>
      `);

      // Compétences
      const keys = ['frontend', 'backend', 'bdd', 'autres'];
      keys.forEach(cat => {
        data.competences[cat].forEach(c => {
          $(`#${cat}`).append(`<li>${c}</li>`);
        });
      });
    })
    .catch(error => {
      console.error("Erreur lors du chargement du fichier apropos.json", error);
    });
});
