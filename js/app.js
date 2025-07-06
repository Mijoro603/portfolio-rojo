$(document).ready(function () {
	// Ferme la notification (verte ou rouge) quand on clique sur l'icône .delete
	$('.delete').click(function() {
  		$('.notification.is-success, .notification.is-danger').slideUp(function() {
    		$(this).empty(); // Nettoie le contenu après avoir disparu
  		});
	});
	
	// Désactive le clic droit sur toute la page (empêche le menu contextuel)
	$(document).on("contextmenu", function() {
	  	return false;
	});
	
	// Active/désactive le burger menu de la navbar (sur mobile): gestion du burger menu responsive
	$('.navbar-burger').click(function() {
  		$('.navbar-menu, .navbar-burger').toggleClass('is-active');
	});
	
	// Marque le lien actif en fonction de l'URL actuelle
	const currentPage = window.location.pathname.split('/').pop(); // ex: about.html
	
	$('.navbar-item').each(function () {
		const href = $(this).attr('href');
		
		// Si le lien correspond à la page actuelle, active ce lien
		if (href === currentPage || (href === 'index.html' && currentPage === '')) {
    		$(this).addClass('is-active');
		} else {
    		$(this).removeClass('is-active');
		}
	});

	// Sur les petits écrans (<1024px), permet d’ouvrir les sous-menus de la navbar
	if ($(window).width() < 1024) {
  		$(".navbar-menu .has-dropdown").on("click", function (e) {
    		$(this).children(".navbar-dropdown").toggle(); // Affiche/masque le dropdown
  		});
	}
	
	// Cache le texte à droite de la navbar sur les écrans <1200px
	if ($(window).width() < 1200) {
  		$(".navbar-end span").removeClass('is-flex is-justify-content-center is-align-items-center has-text-weight-bold');
	  	$('.navbar-end span').addClass("is-hidden");
	}
	
	// Fonctions de gestion d’onglets manuels
	function tabRojo() {
  		removeActive();        // Retire la classe active de tous les onglets
  		hideAll();             // Cache tous les contenus
  		$("#rojo").addClass("is-active");
  		$("#tab-pane-rojo").removeClass("is-hidden");
	}
	
	function tabZosalama() {
  		removeActive();
  		hideAll();
  		$("#zosalama").addClass("is-active");
  		$("#tab-pane-zosalama").removeClass("is-hidden");
	}
	
	function tabRakotomanana() {
  		removeActive();
  		hideAll();
  		$("#rakotomanana").addClass("is-active");
  		$("#tab-pane-rakotomanana").removeClass("is-hidden");
	}
	
	function tabRojoniaina() {
  		removeActive();
  		hideAll();
  		$("#rojoniaina").addClass("is-active");
  		$("#tab-pane-rojoniaina").removeClass("is-hidden");
	}
	
	// Supprime la classe "is-active" sur tous les <li>
	function removeActive() {
  		$("li").each(function() {
    		$(this).removeClass("is-active");
  		});
	}
	
	// Cache tous les contenus des onglets
	function hideAll() {
  		$("#tab-pane-rojo").addClass("is-hidden");
  		$("#tab-pane-zosalama").addClass("is-hidden");
  		$("#tab-pane-rakotomanana").addClass("is-hidden");
  		$("#tab-pane-rojoniaina").addClass("is-hidden");
	}
});
