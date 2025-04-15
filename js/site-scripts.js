(function($) {
	$.fn.menumaker = function(options) {
		var cssmenu = $(this), settings = $.extend({
			title: "Menu",
			format: "dropdown",
			sticky: false
		}, options);
		
		return this.each(function() {
			cssmenu.prepend('<div id="menu-button">' + settings.title + '</div>');
			$(this).find("#menu-button").on('click', function(){
				$(this).toggleClass('menu-opened');
				var mainmenu = $(this).next('ul');
				if (mainmenu.hasClass('open')) { 
					mainmenu.hide().removeClass('open');
				} else {
					mainmenu.show().addClass('open');
					if (settings.format === "dropdown") {
						mainmenu.find('ul').show();
					}
				}
			});
			
			cssmenu.find('li ul').parent().addClass('has-sub');
			
			multiTg = function() {
				cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
				cssmenu.find('.submenu-button').on('click', function() {
					$(this).toggleClass('submenu-opened');
					if ($(this).siblings('ul').hasClass('open')) {
						$(this).siblings('ul').removeClass('open').hide();
					} else {
						$(this).siblings('ul').addClass('open').show();
					}
				});
			};
			
			if (settings.format === 'multitoggle') {
				multiTg();
			} else { 
				cssmenu.addClass('dropdown');
			}
			
			if (settings.sticky === true) {
				cssmenu.css('position', 'fixed');
			}
			
			resizeFix = function() {
				if ($( window ).width() > 768) {
					cssmenu.find('ul').show();
				}
				
				if ($(window).width() <= 768) {
					cssmenu.find('ul').hide().removeClass('open');
				}
			};
			
			resizeFix();
			return $(window).on('resize', resizeFix);
		});
	};
	
	$(document).ready(function(){
		$(".navbar").menumaker({
			title: "Menu",
			format: "multitoggle"
		});
		
		$("#site-slideshow").glide({
			type: "slideshow",
			autoplay: 2500,
		})

		if ($('.back-to-top').length) {
			var scrollTrigger = 350,
			backToTop = function () {
				var scrollTop = $(window).scrollTop();
				if (scrollTop > scrollTrigger) {
					$('.back-to-top').addClass('show');
				} else {
					$('.back-to-top').removeClass('show');
				}
			};
			
			backToTop();
			
			$(window).on('scroll', function () {
				backToTop();
			});
			
			$('.back-to-top').on('click', function (e) {
				e.preventDefault();
				$('html,body').animate({
					scrollTop: 0
				}, 700);
			});
		}
	});
})(jQuery);