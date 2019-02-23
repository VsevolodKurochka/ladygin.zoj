$(document).ready(function(){

	function scroll(scrollLink, speed){
		$('html, body').animate({
			scrollTop: scrollLink.offset().top
		}, speed);
		return false;
	}
	$('.anchor').click(function(e){
		e.preventDefault();
		scroll($( $(this).attr('href') ), 1500);
	});



	// Collapse

		$(".collapse__group.active").find(".collapse__group-body").slideDown();

		$('.collapse').on('click', '.collapse__group-header', function(){
			var collapseInner = $(this).parents('.collapse').find('.collapse__group');

			$(this)
				.parent()
				.toggleClass('active');

			$(this)
				.next()
				.slideToggle('slow');

			collapseInner
				.not($(this).parent())
				.removeClass('active');

			collapseInner
				.children('.collapse__group-body')
				.not($(this).next())
				.slideUp("slow"); 

		});
	// Tabs
		$('[data-action="tab"]').click(function(){			
			// Tab links toggle class
				$(this).closest(".tabs__list").children("li").removeClass('active');
				$(this).parent().addClass('active');
			// Show tab content
				var tabTarget = $(this).attr('data-target');
				$(tabTarget).fadeIn(0);
				$(".tabs__content > div").not($(tabTarget)).fadeOut(0);
		});

	var $navigationLinks = $('#js-navigation-menu > li > a');
	// cache (in reversed order) the sections
	var $sections = $($("section").get().reverse());

	// map each section id to their corresponding navigation link
	var sectionIdTonavigationLink = {};
	$sections.each(function() {
			var id = $(this).attr('id');
			sectionIdTonavigationLink[id] = $('#js-navigation-menu > li > a[href=\\#' + id + ']');
	});

	// throttle function, enforces a minimum time interval
	function throttle(fn, interval) {
		var lastCall, timeoutId;
		return function () {
			var now = new Date().getTime();
			if (lastCall && now < (lastCall + interval) ) {
					// if we are inside the interval we wait
					clearTimeout(timeoutId);
					timeoutId = setTimeout(function () {
							lastCall = now;
							fn.call();
					}, interval - (now - lastCall) );
			} else {
					// otherwise, we directly call the function 
					lastCall = now;
					fn.call();
			}
		};
	}

	function highlightNavigation() {
		// get the current vertical position of the scroll bar
		var scrollPosition = $(window).scrollTop();

		// iterate the sections
		$sections.each(function() {
				var currentSection = $(this);
				// get the position of the section
				var sectionTop = currentSection.offset().top;

				// if the user has scrolled over the top of the section  
				if (scrollPosition >= sectionTop - 200) {
					// get the section id
					var id = currentSection.attr('id');
					// get the corresponding navigation link
					var $navigationLink = sectionIdTonavigationLink[id];
					// if the link is not active
					if (!$navigationLink.hasClass('active')) {
							// remove .active class from all the links
							$navigationLinks.removeClass('active');
							// add .active class to the current link
							$navigationLink.addClass('active');
					}
					// we have found our section, so we return false to exit the each loop
					return false;
				}
		});
	}

	$(window).scroll( throttle(highlightNavigation,100) );
	
	// Develope
	$('.toggle').each(function(){
		var $this = $(this);
		var unactive = $this.attr('data-unactive');
		var active = $this.attr('data-active');
		var el = $this.attr('href');
		$this.text(active);
		$this.click(function(e){
			e.preventDefault();

			$this.toggleClass('active');

			$(el).slideToggle();
			
			if($this.text() == active){
				$this.text(unactive);
			}else{
				$this.text(active);
			}


			$('html, body').animate({
				scrollTop: $(el).offset().top - $('.fixed').height()
			}, 500);
			return false;

		});
	});

	

	if($(window).width() > 768){
		$('.programm__show').addClass('row');
		$( ".programm__item_hidden" ).wrapAll( "<div id='programm-hidden' class='programm__hidden'><div class='row'></div></div>");
	}else{
		$('.programm__toggle').remove();
	}

	$('[data-scroll-to]').click(function(){
		var href = $(this).attr('data-scroll-to');
		scroll($(href), 1500);
	});

	var expertsSlider = $('#experts-slider').cardSlider({
	  slideTag: 'div', 
	  slideClass: 'slide'
	});

	function hideExpertsContent() {
		$('.experts__content-item').hide();
		var currentSlide = $(expertsSlider.getCurrentSlide());
		var currentSlideToggle = currentSlide.find('.experts__slider-item-toggle');
		currentSlideToggle.text(currentSlideToggle.attr('data-active'));
	}

	$('.experts__slider-button_prev').click(function(){
		expertsSlider.prev();
		hideExpertsContent();
	});
	$('.experts__slider-button_next').click(function(){
		expertsSlider.next();
		hideExpertsContent();
	});
	$('.experts__slider-item-toggle').click(function(){
		var item = $(this).attr('href');


		$('.experts__content')
			.children('.experts__content-item')
			.not($(item))
			.slideUp(0); 
	});
});	