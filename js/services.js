$(document).ready(function () {
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
    });
});
