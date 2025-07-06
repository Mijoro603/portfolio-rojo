$(document).ready(function () {
    $('#contactForm').submit(function (e) {
    e.preventDefault();

    const nom = $('#nom').val().trim();
    const email = $('#email').val().trim();
    const message = $('#message').val().trim();

    if (!nom || !email || !message) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    // Prépare les données comme Formspree les attend
    const data = {
        nom,
        email,
        message
    };

    // 🔁 Remplace cette URL par TON lien Formspree (après création)
    const endpoint = "https://formspree.io/f/abcxyz";

    axios.post(endpoint, data)
        .then(() => {
        alert("Votre message a bien été envoyé !");
        $('#contactForm')[0].reset();
        })
        .catch(error => {
        console.error("Erreur Formspree :", error);
        alert("Une erreur est survenue lors de l’envoi. Veuillez réessayer plus tard.");
        });
    });
});
