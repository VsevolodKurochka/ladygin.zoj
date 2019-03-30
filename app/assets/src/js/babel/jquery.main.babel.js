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

	function pushToDataLayer(id){
		dataLayer.push({
		 'event': 'view-landing-section',
		 'section' : id
	 	});
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
				 	//pushToDataLayer(id);
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

	//$(window).scroll( throttle(highlightNavigation,100) );
	
	// Develope
	$('[data-scroll-to]').click(function(){
		var href = $(this).attr('data-scroll-to');
		scroll($(href), 1500);
	});
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

	$('.programm__show').addClass('row');
	$( ".programm__item_hidden" ).wrapAll( "<div id='programm-hidden' class='programm__hidden'><div class='flex'></div></div>");


	$( ".reviews-item_hidden" ).wrapAll( "<div id='reviews-hidden' class='reviews__hidden'><div class='flex'></div></div>");

	
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


	var chatSlider = $('#chat-slider').cardSlider({
		slideTag: 'div', 
		slideClass: 'slide'
	});
	$('.chat__slider-button_prev').click(function(){
		chatSlider.prev();
	});
	$('.chat__slider-button_next').click(function(){
		chatSlider.next();
	});


	// button
	$('.btn_landing').each(function(){
		var section = $(this).closest('section').attr('id');
		$(this).attr('id',section + '-button');
	});

	// Timer

	var now = moment(),
	    tomorrow = moment().add(1, 'day').startOf('day'),
	    difference = moment.duration(tomorrow.diff(now));

	var myDate = new Date();

  function returnEndDate(d,h,m){
    myDate.setDate(myDate.getDate()+d);
    myDate.setHours(myDate.getHours()+h);
    myDate.setMinutes(myDate.getMinutes()+m);
    return myDate;
  }
  
  if(Cookies.get("time")){
    var dateEnd = Cookies.get("time");
  }else{
  	var dd = 24 - myDate.getHours();
    var dateEnd = returnEndDate(0,difference.hours(),difference.minutes());
    var date = new Date();
    date.setTime(date.getTime() + (32*60 * 60 * 1000));
    Cookies.set("time", dateEnd, {expires: date});
  }

	//функция вызова таймера
	function get_timer() {
		
		//Дата для обратного отсчета
		var date_new = dateEnd; // June 3,2012 02:00
		////////////////////////////////////
		////////////////////////////////////
		
		//Объект даты для обратного отсчета
		var date_t = new Date(date_new);
		//Объект текущей даты
		var date = new Date();
		//Вычесляем сколько миллисекунд пройдет 
		//от текущей даты до даты отсчета времени
		var timer = date_t - date;
		
		//Проверяем не нужно ли закончить отсчет
		//если дата отсчета еще не истекла, то количество
		//миллисекунд в переменной date_t будет больше чем в переменной date
		if(date_t > date) {
			
			//Вычисляем сколько осталось дней до даты отсчета.
			//Для этого количество миллисекунд до даты остчета делим
			//на количество миллисекунд в одном дне
			var day = parseInt(timer/(60*60*1000*24));
			//если полученное число меньше 10 прибавляем 0
			if(day < 10) {
				day = '0' + day;
			}
			//Приводим результат к строке
			day = day.toString();
				
			//Вычисляем сколько осталось часов до даты отсчета.
			//Для этого переменную timer делим на количество
			//миллисекунд в одном часе и отбрасываем дни
			var hour = parseInt(timer/(60*60*1000))%24;
			//если полученное число меньше 10 прибавляем 0
			if(hour < 10) {
				hour = '0' + hour;
			}
			//Приводим результат к строке
			hour = hour.toString();
				
			//Вычисляем сколько осталось минут до даты отсчета.
			//Для этого переменную timer делим на количество
			//миллисекунд в одной минуте и отбрасываем часы
			var min = parseInt(timer/(1000*60))%60;
			//если полученное число меньше 10 прибавляем 0
			if(min < 10) {
				min = '0' + min;
			}
			//Приводим результат к строке
			min = min.toString();
				
			//Вычисляем сколько осталось секунд до даты отсчета.
			//Для этого переменную timer делим на количество
			//миллисекунд в одной минуте и отбрасываем минуты
			var sec = parseInt(timer/1000)%60;
			//если полученное число меньше 10 прибавляем 0
			if(sec < 10) {
				sec = '0' + sec;
			}
			//Приводим результат к строке
			sec = sec.toString();
			
			//Выводим дни
			//Проверяем какие предыдущие цифры времени должны вывестись на экран
			//Для десятков дней
			if(day[1] == 9 && 
				hour[0] == 2 && 
				hour[1] == 3 && 
				min[0] == 5 && 
				min[1] == 9 && 
				sec[0] == 5 && 
				sec[1] == 9) {
				animation($("#clock").find(".day0"),day[0]);
				animation($("#clock2").find(".day0"),day[0]);
				animation($("#clock3").find(".day0"),day[0]);
				animation($("#clock4").find(".day0"),day[0]);
			}
			else {
				$("#clock").find(".day0").html(day[0]);
				$("#clock2").find(".day0").html(day[0]);
				$("#clock3").find(".day0").html(day[0]);
				$("#clock4").find(".day0").html(day[0]);
			}
			//Для единиц дней
			if(hour[0] == 2 && 
				hour[1] == 3 && 
				min[0] == 5 && 
				min[1] == 9 && 
				sec[0] == 5 && 
				sec[1] == 9) {
				animation($("#clock").find(".day1"),day[1]);
				animation($("#clock2").find(".day1"),day[1]);
				animation($("#clock3").find(".day1"),day[1]);
				animation($("#clock4").find(".day1"),day[1]);
			}
			else {
				$("#clock").find(".day1").html(day[1]);
				$("#clock2").find(".day1").html(day[1]);
				$("#clock3").find(".day1").html(day[1]);
				$("#clock4").find(".day1").html(day[1]);
			}
			//Выводим часы
			//Проверяем какие предыдущие цифры времени должны вывестись на экран
			//Для десятков часов
			if(hour[1] == 3 && 
				min[0] == 5 && 
				min[1] == 9 && 
				sec[0] == 5 && 
				sec[1] == 9) {
				animation($("#clock").find(".hour0"),hour[0]);
				animation($("#clock2").find(".hour0"),hour[0]);
				animation($("#clock3").find(".hour0"),hour[0]);
				animation($("#clock4").find(".hour0"),hour[0]);
			}
			else {
				$("#clock").find(".hour0").html(hour[0]);
				$("#clock2").find(".hour0").html(hour[0]);
				$("#clock3").find(".hour0").html(hour[0]);
				$("#clock4").find(".hour0").html(hour[0]);
			}
			//Для единиц чассов 
			if(min[0] == 5 && 
				min[1] == 9 && 
				sec[0] == 5 && 
				sec[1] == 9) {
				animation($("#clock").find(".hour1"),hour[1]);
				animation($("#clock2").find(".hour1"),hour[1]);
				animation($("#clock3").find(".hour1"),hour[1]);
				animation($("#clock4").find(".hour1"),hour[1]);
			}
			else {
				$("#clock").find(".hour1").html(hour[1]);
				$("#clock2").find(".hour1").html(hour[1]);
				$("#clock3").find(".hour1").html(hour[1]);
				$("#clock4").find(".hour1").html(hour[1]);
			}
				
			//Выводим минуты
			//Проверяем какие предыдущие цифры времени должны вывестись на экран
			//Для десятков минут
			if(min[1] == 9 && 
				sec[0] == 5 && 
				sec[1] == 9) {
				animation($("#clock").find(".min0"),min[0]);
				animation($("#clock2").find(".min0"),min[0]);
				animation($("#clock3").find(".min0"),min[0]);
				animation($("#clock4").find(".min0"),min[0]);
			}
			else {
				$("#clock").find(".min0").html(min[0]);
				$("#clock2").find(".min0").html(min[0]);
				$("#clock3").find(".min0").html(min[0]);
				$("#clock4").find(".min0").html(min[0]);
			}
			//Для единиц минут
			if(sec[0] == 5 && sec[1] == 9) {
				animation($("#clock").find(".min1"),min[1]);
				animation($("#clock2").find(".min1"),min[1]);
				animation($("#clock3").find(".min1"),min[1]);
				animation($("#clock4").find(".min1"),min[1]);
			}
			else {
				$("#clock").find(".min1").html(min[1]);
				$("#clock2").find(".min1").html(min[1]);
				$("#clock3").find(".min1").html(min[1]);
				$("#clock4").find(".min1").html(min[1]);
			}
				
			//Выводим секунды
			//Проверяем какие предыдущие цифры времени должны вывестись на экран
			//Для десятков секунд
			if(sec[1] == 9) {
				animation($("#clock").find(".sec0"),sec[0]);
				animation($("#clock2").find(".sec0"),sec[0]);
				animation($("#clock3").find(".sec0"),sec[0]);
				animation($("#clock4").find(".sec0"),sec[0]);
			}
			else {
				$("#clock").find(".sec0").html(sec[0]);
				$("#clock2").find(".sec0").html(sec[0]);
				$("#clock3").find(".sec0").html(sec[0]);
				$("#clock4").find(".sec0").html(sec[0]);
			}
			animation($("#clock").find(".sec1"),sec[1]); 
			 animation($("#clock2").find(".sec1"),sec[1]); 
			 animation($("#clock3").find(".sec1"),sec[1]); 
			 animation($("#clock4").find(".sec1"),sec[1]); 
			//Переодически вызываем созданную функцию, 
			//интервал вызова одна секунда(1000 милли секунд)
			setTimeout(get_timer,1000);
		}
		
	}
	//Функция для красивого отображения времени.
	function animation(vibor,param) {
		vibor.html(param)
			.css({'marginTop':'-20px','opacity':'0'})
			.animate({'marginTop':'0px','opacity':'1'});
	}
	//Вызываем функцию на исполнение
	get_timer();

	function extractClientId(cookieName) {
		cookieName = cookieName || '_ga';
		var regex = new RegExp(cookieName + '=[^;]*')
		var gaCookie = document.cookie.match(regex);
		if (gaCookie) {
			return gaCookie[0].match(/\d+?\.\d+$/)[0];
		}
	}

	function clientId() {
		var gcid = extractClientId();
		console.log(gcid);
		$('#gcid_field').val('"' + gcid + '"');
		$('#cid_field').val('"' + gcid + '"');
	}

	setTimeout(clientId, 3000);
	document.getElementsByClassName("__gc__internal__form__helper")[0].value = window.location.href;

});	