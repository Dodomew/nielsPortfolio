$(document).ready(function() {

	// Animate elements on scroll
	// function cssScrollAnimations(){
	//
	// 	// Init scroll magic controller
	// 	var controller = new ScrollMagic.Controller();
	//
	// 	// Scroll Animate
	// 	var $elAnim = $('body').find('.js-anim-scroll');
	// 	$elAnim.each(function() {
	//
	// 		// Animation options
	// 		var animOptions = $(this).data("ani");
	//
	// 		// GSAP tweens
	// 		var fadeInUp = new TimelineLite()
	// 			.fromTo( $(this), animOptions.dur, {opacity: 0, y: animOptions.val}, {ease: Power1.easeOut, opacity: 1, y: 0}, animOptions.del)
	// 		;
	//
	// 		// Scrolmagic
	// 		var scene = new ScrollMagic.Scene({
	// 			triggerElement: this,
	// 			reverse:false
	// 		})
	// 		.setTween(fadeInUp)
	// 		.triggerHook(0.6)//0.6
	// 		.addIndicators({name: "slide-up"})
	// 		.addTo(controller);
	// 	});
	// }

	// Load background images asap
	$(window).on("resize", function () {
		var windowWidth = $(window).width();

		$('.js-load_background_image').each(function (i, e) {
			var $this = $(this);
			var $theImg = $this.data('backgroundimage');

			// serve correct size according to windowsize
			if (windowWidth <= 400 && $this.data('backgroundimage__mobile')) $theImg = $this.data('backgroundimage__mobile');
			else if (windowWidth <= 750 && $this.data('backgroundimage__tablet')) $theImg = $this.data('backgroundimage__tablet');

			$this.css({'background-image': 'url(' + $theImg.replace(/ /g, '%20') + ')'});
		});
	}).resize();

	// transfer click to element
	$('body').on('click', '.js-href-click', function (e) {
		//$(this).find('.js-href').click(); // Infinite recursion and Not working!!
		if ($(e.target).prop('tagName') != 'A') {
			var anchor = $(this).find('.js-href').length ? $(this).find('.js-href') : $(this).find('a');
			if (anchor.hasClass('js-modal')) anchor.click();
			else {
				var theUrl = anchor.attr('href');
				if (theUrl !== undefined && theUrl != null) {
					if (anchor.hasClass('js-track')) trackEvent(anchor.data('track-category'), anchor.data('track-action'), anchor.data('track-label'));

					var blank = anchor.attr('target') == '_blank';
					if (blank || e.ctrlKey || e.metaKey) {
						window.open(theUrl);
						if (!e.shiftKey) self.focus(); //doesn't work, but would be nice if it does
					} else window.location = theUrl;
					e.preventDefault();
				}
			}
		}
	});


	// Init functions
	function init(){
		cssScrollAnimations();
	}
	init();

}); // end ready



// Parent
	// Child
	// Child
