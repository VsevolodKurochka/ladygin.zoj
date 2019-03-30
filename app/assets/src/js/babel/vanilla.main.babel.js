(function(){
	function log(content){
		console.log(content);
	}

	var hasClass = (element, cls) => (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;

	function addClass(element,cls){
		if( !hasClass(element, cls) ){
			let empty = '';
			if(element.classList.value != "") empty = ' ';
			element.className += empty + cls;
		}
	}

	function removeClass(element, cls){
		if( hasClass(element, cls) ) element.classList.remove(cls);
	}

	function toggleClass(element, cls){
		hasClass(element, cls) ? removeClass(element, cls) : addClass(element, cls);
	}

	var exists = element => typeof(element) != 'undefined' && element != null;

	class Modal {
		constructor(){

			// Prefix for modal class
			this.prefix = '';

			// Name of modal class
			this.name = `${this.prefix}modal`;

			// All modals
			this.modals = document.querySelectorAll(`.${this.name}`);

			// Open Buttons
			this.openButtons = document.querySelectorAll(`[data-action="${this.name}"]`);

			// Close Button(`x`)
			this.closeButtons = document.querySelectorAll(`[data-close="${this.name}"]`);


			for(let i = 0; i < this.openButtons.length; i++){
				this.openButtons[i].addEventListener('click', (e) => {
					this._showButtonClick(e);
				});
			}

			for(let i = 0; i < this.closeButtons.length; i++){
				this.closeButtons[i].addEventListener('click', (e) => {
					this._closeButtonClick(e);
				});
			}

			document.body.addEventListener('click', (e) => {
				this._bodyClick(e);
			});
		}


		modalClose(el){
			removeClass(el, `${this.name}_showing_in`);
			removeClass(document.body, `${this.name}-open`);
		}

		modalOpen(el){
			addClass(document.body, `${this.name}-open`);
			addClass(el, `${this.name}_showing_in`);
		}

		_showButtonClick(e) {
			// Get button data-attributes
			var modalData = e.target.dataset;

			// Get attribute data-open and replace # with empty line
			var modalID = modalData.open.replace("#", "");
			
			
			if( exists(document.getElementById(modalID) ) ){

				let modalCurrent = document.getElementById(modalID);

				this.modalOpen(modalCurrent);

				if(modalData.video != undefined){
					

					if( exists(modalCurrent.getElementsByClassName('modal__video')[0]) ){

						this._removeIframe(modalCurrent);

						let videoIframe = document.createElement('iframe');

						addClass(videoIframe, 'modal__video-iframe');

						let videoSRC = modalData.video;
						videoIframe.setAttribute('src', videoSRC);
						videoIframe.setAttribute('allow', 'autoplay; encrypted-media');
						videoIframe.setAttribute('allowfullscreen', 'allowfullscreen');

						modalCurrent.getElementsByClassName('modal__video')[0].appendChild(videoIframe);
					}
				}

			}else{
				console.error('No element with ID: ' + modalID);
			}
		}

		_removeIframe(element){
			if( exists(element.getElementsByClassName('modal__video')[0]) ){
				let _videoWrapper = element.getElementsByClassName('modal__video')[0];
				_videoWrapper.innerHTML = '';
			}
		}

		_closeButtonClick(e) {

			let modalCurrent = e.target.closest(`.${this.name}`);
			this.modalClose( modalCurrent );

			this._removeIframe(modalCurrent);
		}

		_getEventTarget(e){
			var targ;

			if (e.target) { // W3C
				targ = e.target;
			}else if (e.srcElement) { // IE6-8
				targ = e.srcElement;
			}else if(e.originalTarget){
				targ = e.originalTarget;
			}
			if (targ.nodeType == 3) { // Safari
				targ = targ.parentNode;
			}
			return targ;
		}

		_bodyClick(e){
			let target = this._getEventTarget(e);

			//log(target);
			for(let i = 0; i < this.modals.length; i++){

				let targetModal = this.modals[i];

				if(target == targetModal){
					this.modalClose(targetModal);
					this._removeIframe(targetModal);
				}
			}
		}
	}

	class Navigation {
		constructor(){
			this.prefix = '';
			this.navigation = document.getElementById('js-navigation');
			this.menu = document.getElementById('js-navigation-menu');
			this.hamburger = document.getElementById('js-nav-hamburger');
			this.addition = document.getElementById('js-nav-addition-button-1');
			this.links = '.nav__menu-item-link';

			this.linksScroll();

			if(exists(this.navigation)) {
				this.navigationScroll();
			}

			if(exists(this.hamburger)) {
				this.hamburger.addEventListener( 'click', (e) => this.hamburgerClick(e) );
			}

			if(exists(this.addition)) {
				this.addition.addEventListener( 'click', (e) => this.additionClick(e) );
			}
		}

		checkScrollY() {
			window.scrollY > 0 ? addClass(this.navigation, 'nav_scrolled') : removeClass(this.navigation, 'nav_scrolled');
		}

		navigationScroll(){

			this.checkScrollY();
			window.addEventListener("scroll", ()	=> this.checkScrollY() );

		}

		hamburgerClick(el) {

			toggleClass(this.hamburger, 'active');
			toggleClass(this.menu, `nav__menu_active`);

		}

		additionClick(el) {

			toggleClass(this.addition, 'active');

		}

		linksScroll() {

			new SmoothScroll(this.links, {
				header: '.fixed',
				before: () => {
					if(exists(this.hamburger)){
						removeClass(this.hamburger, 'active');
					}
					removeClass(this.menu, `nav__menu_active`);
				}
			});

		}
	}

	document.addEventListener("DOMContentLoaded", function(){
		new Modal();
		new Navigation();
		var input = document.querySelectorAll("input[type='tel']");
		for (var i = 0; i < input.length; i++) {
			window.intlTelInput(input[i], {
				separateDialCode: true,
			  initialCountry: "auto",
			  geoIpLookup: function(callback) {
			    $.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
			      var countryCode = (resp && resp.country) ? resp.country : "";
			      callback(countryCode);
			    });
			  },
			  utilsScript: "assets/build/js/utils.js" // just for formatting/placeholders etc
			});
		}
		
	});
}());