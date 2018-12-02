$.fn.extend({
  animateCss: function(animationName, callback) {
    var animationEnd = (function(el) {
      var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd',
      };

      for (var t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    })(document.createElement('div'));

    this.addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);

      if (typeof callback === 'function') callback();
    });

    return this;
  },
});


$(function(){
	
	//----offset measures the distance from the top and the left

	var navOffset = $('#section-2').offset();
	var homeOffset = $('#section-2').offset();


	$(document).on('scroll',function(){

		var iScrollTop = $(document).scrollTop();

		//----functon makes our nav fixed than we past it
		if( iScrollTop> (navOffset.top - 100)){
			//-fix the nav position
			$('.nav-top').addClass('fixed');

		}else{
			//--unfix it
			$('.nav-top').removeClass('fixed');

		}

		if( iScrollTop>navOffset.top - 150){
			$('.sidebar').addClass('show');
		}else{
			//--unfix it
			$('.sidebar').removeClass('show');

		}



		if( iScrollTop> (homeOffset.top - (homeOffset.top*0.9))){
			//-fix the nav position
			$('.home').addClass('fixed');

		}else{
			//--unfix it
			$('.home').removeClass('fixed');

		}

		//-----higlights the right section in the nav while scrolling
		let activeLi;
		$('.sidebar-list>li').each(function(){
			let Target = $(this).find('.sidebar-link').attr('href');
			let sectionOffset = $(Target).offset().top - 200;
			if(iScrollTop >= sectionOffset){
				activeLi = $(this);
				activeLi.addClass('active');
			}		
		});
		$('.sidebar-list>li').not(activeLi).removeClass('active');

		// gradient transition
		let activeGradient;

		$('.section').each(function(){
			let sectionOffset = $(this).offset().top - 300;
			if(iScrollTop >= sectionOffset){
				activeGradient = $(this).find('.section-background');
				activeGradient.addClass('show');
			}
			
		});
		$('section .section-background').not(activeGradient).removeClass('show');


	});

	///------Navigation between sections
	$('.sidebar-link').on('click', function(e){
		
		e.preventDefault();

			var sTarget = $(this).attr('href');
			var targetOffset = $(sTarget).offset().top;
			$('html, body').animate({scrollTop:targetOffset},1000);

	});
	$('#btn-s1-down').on('click', function(e){
		
		e.preventDefault();

			var sTarget = $(this).data('target');
			var targetOffset = $(sTarget).offset().top;
			$('html, body').animate({scrollTop:targetOffset},2000);

	});
	
	var mq  = window.matchMedia( "(min-width: 991px)" );
		// ScrollReveal should proceed if we’re not mobile,
		// or if we’re mobile with a matching minimum width. 
	if (mq.matches) {

		//assign class v to all properties which should have an opacity = 1
		$('.section-title').addClass('v').css('opacity','0');
	  	$('.contact-form').addClass('v');
	  	$('.contact-info').addClass('v');
	  	$('.contact-message').addClass('v');
	  	$('.service').addClass('v');
	  	$('.work').addClass('v');
	  	$('.about-text').addClass('v');
	  	$('.about-icon').addClass('v');

	  	//animation
		var oServices = anime({
							  	targets: '.service',
							  	translateY: ['300',0],					  		
							 	opacity:[0,1],
							  	easing: 'linear',
							  	delay: function(el,i,l){
										return 300*i;
									},
								duration:1800,
							  	autoplay: false,			  
							});

		var oWorks = anime({
							  targets: '.work',
							  opacity: [0,1],
							  scale: [
							  	{value: 0},
							  	{value: 2},
							  	{value: 1}

							  ],
							  easing: 'easeInOutQuad',
							  delay: function(el,i,l){
										return 500*i;
									},
							  autoplay: false			  
							});
		
		var oAboutTimeline = anime.timeline(
				{
					autoplay: false,
					duration: 1800
				}
			);

		oAboutTimeline.add({
							  	targets: '.about-icon',
							  	translateY: ['-300',0],	
							  	scale: [
							 		{value:0.5},
							 		{value: 2},
							 		{value:1}
							 	],				  		
							 	opacity:[0,1],
							  	easing: 'linear',
							  	delay: function(el,i,l){
										return 300*i;
									},
								offset:0		  
							});
		oAboutTimeline.add({
							  	targets: '.about-text.left',
							  	translateX: ['-150',0],	
							  	scale: [
							 		{value:0.5},
							 		{value:1.5},
							 		{value:1}
							 	],				  		
							 	opacity:[0,1],
							  	easing: 'linear',
							  	delay: function(el,i,l){
										return 300*(i+1);
									},
								offset:0		  
							});
		oAboutTimeline.add({
							  	targets: '.about-text.right',
							  	translateX: ['150',0],					  		
							 	opacity:[0,1],
							  	easing: 'linear',
							  	delay: function(el,i,l){
										return 300*(i+2);
									},
								offset:0		  
							});
		oAboutTimeline.add({
							  	targets: '.about-text.center',
							  	translateY: ['300',0],					  		
							 	opacity:[0,1],
							 	scale:[
							 		{value: 0.5},
							 		{value: 1.2},
							 		{value: 1}
							 	],
							  	easing: 'linear',
							  	delay: 1200,
								offset:0		  
							});
	  	
	  	//animate section-header on scroll
	  	$(document).on('scroll',function(){
	  		var iScrollTop = $(document).scrollTop();
	  		var iServiceOffset = $('#section-2').offset().top - 500;
			if(iScrollTop > iServiceOffset){
				oServices.play();

				$('.service').removeClass('v');

					
					
			}

			var iWorkOffset = $('#section-3').offset().top - 500;
			if(iScrollTop > iWorkOffset){
				oWorks.play();
				$('.work').removeClass('v');
			}

			var iAboutOffset = $('#section-4').offset().top - 500;
			if(iScrollTop > iAboutOffset){
				oAboutTimeline.play();
				$('.about-text').removeClass('v');
				$('.about-icon').removeClass('v');
				
			}

			var iContactOffset = $('#section-5').offset().top - 500;
			if(iScrollTop > iContactOffset+200){

				//-----prevents adding of class every time than we scroll

				if($('.contact-form').hasClass('v') == true){
					$('.contact-form')
						.animateCss('slideInUp slower')
						.removeClass('v');
					$('.contact-info')
						.animateCss('fadeInUpBig slow')
						.removeClass('v');
					$('.contact-message')
						.animateCss('fadeInUpBig slower')
						.removeClass('v');
				}
			}
			

		  	$('.section-title').each(function(i,el){
				var iHeadeingOffset = $(el).offset().top;
				if( iScrollTop >= (iHeadeingOffset-600)){


					//-----prevents adding of class every time than we scroll
					if($(el).hasClass('v') == true){
						
						if($(el).hasClass('title-center') == true){
							var cssProperties = anime({
								  targets: el,
								  opacity: [0,1],
								  top: ['300px',0],
								  easing: 'easeInOutQuad'
								});

						}else{
							var cssProperties = anime({
								  targets: el,
								  opacity: [0,1],
								  left: ['500px',0],
								  easing: 'easeInOutQuad'
								});
						}
							
						$(el).removeClass('v');
					}

				}
			});
			
	  	});
	}

});