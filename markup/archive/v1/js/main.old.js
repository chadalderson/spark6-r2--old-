/* Main JS */

$(function(){
	
	var app = (function(){
		// selectors
		var body	= $('body'),
			wrapper = $('body > .container'),
			header 	= $('#header'),
			wrap_w	= wrapper.width();
			logo	= $('#logo'),
			nav 	= $('#nav'),
			nav_li 	= nav.find('li'),
			nav_a 	= nav.find('a'),
			home_vid= $('.home-video a'),
			serv_a	= $('#services a'),
			fb_btn	= $('.home-facebook a'),
			navserv = $('#nav-services a'),
			gmap 	= $('#gmap'),
			address = '1415 10th Street STE 2 Santa Monica, California 90401',
			contact = $('#contactForm label'),
			member  = $('#team .member'),
			locate  = $('#redcols a'),
			instagram = $('#instagram'),
			// classes
			active 	= 'active',
			// user agent 
			ua = navigator.userAgent;
		
		var site = {
			init: function(){
				svgeezy.init(false, 'png');
				this.bindResize();
				this.headerFx();
				this.headerScroll();
				this.homeVideo();
				this.servicesRollover();
				this.fbRollover();
				this.navServices();
				this.googleMap();
				this.placeholderLabels();
				this.memberRollover();
				this.locationRollover();
				this.instagramCols();
			},

			bindResize: function(){
				$(window).resize(function() {
					wrap_w	= wrapper.width();
					if(header.hasClass('stickit')){
						header.css({
			 				width: wrap_w,
			 				left: '-' + ( wrap_w / 2 )
			 			});
					}
				});
			},
			
			headerFx: function(){
								
				header.hover(
					// mouseenter
					function(e){
						if(header.hasClass('stickit')){
							


	  					} else {

	  						if(!logo.hasClass('animating')){
	  							logo.dequeue().stop().animate( {
		    						marginTop: "-73px",
		  						}, 200, function(){
		  							logo.addClass(active);
		  							logo.find('.text').css({opacity: 0, display: 'block'});
		  							logo.find('.text').dequeue().stop().animate( { opacity: 1 }, 200 );
		  						} );
		  						nav.css({opacity: 0, display: 'block'});
		  						nav.dequeue().stop().animate( { opacity: 1 }, 200 );
	  						}
	  						
	  					}
						
					},
					// mouseleave
					function(e){

						if(header.hasClass('stickit')){

	  							  					
		  				} else {
							
							logo.addClass('animating').animate( {
	    						marginTop: "32px",
	  						}, 200, function(){
	  							logo.removeClass('animating');
	  							logo.removeClass(active);
	  							logo.find('.text').hide();	
	  							nav.animate( { opacity: 0 }, 200 );
	  						});
	  						
	  											

		  				}
							
					}
				);					

			},

			headerScroll: function(){
				$(document).stickem({
			 	 	item: header,
			 		container: wrapper,
			 		stickClass: 'stickit',
			 		endStickClass: 'stickit-end',
			 		start: 104,
			 		offset: 0,
			 		onStick: function(){
			 			app.headerFx();
			 			header.css({
			 				width: wrap_w,
			 				left: '-' + ( wrap_w / 2 ),
			 				marginTop: '-104px',
			 				backgroundColor: 'transparent'
			 			});
			 			wrapper.css('padding-top','158px');
				 	},
			 		onUnstick: function(){
			 			app.headerFx();
			 			header.css({
			 				width: '100%',
			 				marginTop: '0px',
			 				backgroundColor: '#fff'
			 			});
			 			wrapper.css('padding-top','0px');
			 		}
			 	});
			},

			homeVideo: function(){
				home_vid.hover(
					//mousenter
					function(){
						$(this).find('.video').stop(true, true).fadeIn(300);
					},
					//mouseleave
					function(){
						$(this).find('.video').stop(true, true).fadeOut(300);
					}
				);
			},

			servicesRollover: function(){
				
				serv_a.hover(
					//mouseenter
					function(){
						$(this).find('.red-overlay').stop(true,true).fadeIn(200);
						$(this).find('h4').stop(true,true).animate({ top:'77px', color:'#ffffff' });
						$(this).find('.service-text').stop(true,true).fadeIn(500);
					},
					//mouseleave
					function(){
						$(this).find('.red-overlay').stop(true,true).fadeOut(200);
						$(this).find('h4').stop(true,true).animate({ top:'140px', color:'#cbcbcb' });
						$(this).find('.service-text').stop(true,true).fadeOut(500);
					}
				);

			},

			fbRollover: function(){
				
				fb_btn.hover(
					//mousenter
					function(){
						$(this).find('.fb-icon').stop(true,true).animate({ top:'118px'}, 200);
					},
					//mouseleave
					function(){
						$(this).find('.fb-icon').stop(true,true).animate({ top:'130px'}, 200);
					}
				);

				fb_btn.on('click', function(e){
					e.preventDefault();
					if(!$(this).hasClass('deactive')){
						$(this).addClass('pressed');
						$(this).find('.like-txt').html('Thanks!');
						setTimeout(function() {
						    fb_btn.removeClass('pressed').addClass('deactive');
						    fb_btn.find('.like-txt').html('741 Likes');
						}, 3000);
					}
				});

			},

			navServices: function(){
				
				navserv.hover(
					//mouseenter
					function(){						
						$(this).find('.red-overlay').stop(true, true).fadeIn(500);
					},
					//mouseleave
					function(){
						$(this).find('.red-overlay').stop(true, true).fadeOut(500);
					}
				);

			},

			googleMap: function(){
				if(gmap.length){
					gmap.gmap3({
					    marker:{
					      address: address
					    },
					    map:{
					      options:{
					        zoom: 14
					      }
					    }
					});
				}
			},

			placeholderLabels: function(){
				contact.inFieldLabels();
			},

			memberRollover: function(){
				member.hover(
					//mouseenter
					function(){
						$(this).find('img').stop(true, true).fadeTo(300, 0.15);
						$(this).find('.member-text').stop(true, true).animate({ top:'94px', opacity:1 }, 300);
					},
					//mouseleave
					function(){
						$(this).find('img').stop(true, true).fadeTo(300, 1);
						$(this).find('.member-text').stop(true, true).animate({ top:'114px', opacity:0 }, 300);
						$(this).find('.member-profile').stop(true, true).fadeOut(300);
					}
				);

				member.on('click', function(e){
					e.preventDefault();
					$(this).find('.member-profile').stop(true, true).fadeIn(300);
					
				});
			},

			locationRollover: function(){
				
				locate.hover(
					//mouseenter
					function(){
						$(this).find('.location-hover').stop(true, true).fadeIn(300);
					},
					//mouseleave
					function(){
						$(this).find('.location-hover').stop(true, true).fadeOut(300);
					}
				);

			},

			instagramCols: function(){
				if(instagram.length){
					// initialize
					instagram.isotope({
					  itemSelector : '.isotope-item',
					  masonry: {
					    columnWidth: 370,
					    gutterWidth: 0
					  }
					});
				}
				
			}
			
		}
		
		return site;
		
	}());
	
	app.init();
	
});
