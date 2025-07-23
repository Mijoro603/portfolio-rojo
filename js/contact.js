$(document).ready(function () {
	$('#contactForm').submit(function (e) {
  	e.preventDefault();
	
  	const nom = $('#nom').val().trim();
  	const email = $('#email').val().trim();
  	const message = $('#message').val().trim();
	
  	if (!nom || !email || !message) {
    	// alert("Veuillez remplir tous les champs.");
    	showNotification('Veuillez remplir tous les champs.', 'is-danger')
    	return;
  	}
	
  	// 📦 Crée un formulaire simulé
  	const formData = new FormData();
  	formData.append('nom', nom);
  	formData.append('email', email);
  	formData.append('message', message);
	
  	const endpoint = "https://formspree.io/f/xyzjalaw";// à remplacer par ton vrai lien

    // ✅ Envoie les données au serveur Formspree
    axios.post(endpoint, formData)
      .then(() => {
        	showNotification('Votre message a bien été envoyé !', 'is-success');
        	$('#contactForm')[0].reset(); // Réinitialise le formulaire
      	})
      	.catch(error => {
        	// console.error("Erreur Formspree :", error);
        	showNotification('Une erreur est survenue lors de l’envoi. Veuillez réessayer plus tard.', 'is-danger');
      	});
  	});
	
  	// ✅ Fonction utilitaire pour afficher une notification dynamiquement
  	function showNotification(message, type = 'is-info') {
    	const $notif = $(`
      	<div class="notification ${type}">
        	<button class="delete"></button>
        	${message}
      	</div>
    	`);
    	$('#contactForm').before($notif); // Affiche la notification avant le formulaire
	
    	// 🧼 Auto-suppression au bout de 5 secondes
    	setTimeout(() => $notif.fadeOut(400, () => $notif.remove()), 5000);
  	}
});
