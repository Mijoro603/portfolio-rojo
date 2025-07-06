$(document).ready(function () {
  const DATA_PATH = './data/about.json';

  axios.get(DATA_PATH)
    .then(response => {
      const data = response.data;

      $('#parcoursAcademique').html(`
        <header>
          <h2 class="subtitle is-4">🎓 Parcours académique</h2>
        </header>
        <p>${data.parcoursAcademique}</p>
      `);

      $('#competencesAcademique').html(`
        <header>
          <h2 class="subtitle is-4">🧠 Compétences académiques</h2>
        </header>
        <ul>${data.competencesAcademique.map(c => `<li>${c}</li>`).join('')}</ul>
      `);

      $('#parcoursPro').html(`
        <header>
          <h2 class="subtitle is-4">💼 Parcours professionnel</h2>
        </header>
        <p>${data.parcoursPro}</p>
      `);

      $('#competencesPro').html(`
        <header>
          <h2 class="subtitle is-4">🔧 Compétences acquises en pro</h2>
        </header>
        <ul>${data.competencesPro.map(c => `<li>${c}</li>`).join('')}</ul>
      `);
    })
    .catch(error => {
      console.error("Erreur de chargement du fichier JSON :", error);
    });
});
