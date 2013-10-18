/* Main JS */

$(function(){
	
	var app = (function(){
		// selectors
		var body	= $('body'),
			wrapper = $('body > .container'),
			header 	= $('#header'),
			wrap_w	= wrapper.width();
			logo	= $('#logo'),
			openMob	= $('#openMenu'),
			nav 	= $('#nav'),
			nav_li 	= nav.find('li'),
			nav_a 	= nav.find('a'),
			team	= $('#team'),
			isiPad  = false,
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
			active 	= 'active';
		
		var site = {
			init: function(){
				svgeezy.init(false, 'png');
				
				// if not Mobile
				if(!isMobile.any()){
					this.bindResize();
					this.headerFx();
					this.headerScroll();
					this.servicesRollover();
				} else {
					this.mobileMenu();
					this.memberCarousel();
				}
				
				this.homeVideo();
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
							
							if(!nav.hasClass('animating')){
	  							logo.stop().animate( {
		    						marginTop: "-73px",
		  						}, 200, function(){
		  							logo.addClass(active);
		  						} );
		  						header.animate({'marginTop': '-94px'}, 200);
		  						header.css('background-color','#fff');
		  						nav.css({opacity: 0, display: 'block'});
		  						nav.stop().animate( { opacity: 1 }, 400 );
	  						}	  	

	  					} else {
	  						if(!nav.hasClass('animating')){
	  							logo.stop().animate( {
		    						marginTop: "-73px",
		  						}, 200, function(){

		  							logo.addClass(active);
		  							logo.find('.text').css({opacity: 0, display: 'block'});
		  							logo.find('.text').stop().animate( { opacity: 1 }, 200 );
		  						} );
		  						nav.css({opacity: 0, display: 'block'});
		  						nav.stop().animate( { opacity: 1 }, 200 );
	  						}	  						
	  					}						
					},
					// mouseleave
					function(e){

						if(header.hasClass('stickit')){

							nav.addClass('animating').stop().animate( { opacity: 0 }, 200, function(){
								header.css('background-color','transparent');
								header.animate({'margin-top': '-104px'}, 200);
								logo.stop().animate( {
		    						marginTop: "32px",
		  						}, 400, function(){
		  							nav.removeClass('animating');
		  							logo.removeClass(active);
		  							
		  						});								
							});
	  							  					
		  				} else {
							nav.addClass('animating').stop().animate( { opacity: 0 }, 200, function(){
								logo.stop().animate( {
		    						marginTop: "32px",
		  						}, 200, function(){
		  							nav.removeClass('animating');
		  							logo.removeClass(active);
		  							logo.find('.text').hide();	
		  							
		  						});								
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
			 			
			 			// In case the menu was open and user started to scroll
			 			logo.find('.text').hide();	
			 			nav.addClass('animating').stop().animate( { opacity: 0 }, 200, function(){
							header.css('background-color','transparent');
							header.animate({'margin-top': '-104px'}, 200);
							logo.stop().animate( {
	    						marginTop: "32px",
	  						}, 400, function(){
	  							nav.removeClass('animating');
	  							logo.removeClass(active);
	  							
	  						});								
						});
				 	},
			 		onUnstick: function(){
			 			app.headerFx();
			 			header.css({
			 				width: '100%',
			 				marginTop: '0px',
			 				backgroundColor: 'transparent'
			 			});
			 			wrapper.css('padding-top','0px');
			 		}
			 	});
			},

			mobileMenu: function(){

				openMob.on('click', function(){
					$(this).toggleClass('active');
					var tmp_height = nav.outerHeight();
					if($(this).hasClass('active')){
						logo.find('.spark').fadeOut(200, function(){
							logo.find('.text').fadeIn(200);
						});
						wrapper.stop(true, true).animate({
							paddingTop: tmp_height
						}, 300, function(){
							nav.stop(true, true).fadeIn(400);
						});
					}else{
						logo.find('.text').fadeOut(200, function(){
							logo.find('.spark').fadeIn(200);
						});
						nav.stop(true, true).fadeOut(100, function(){
							wrapper.stop(true, true).animate({
								paddingTop:'0px'
							}, 400);
						});
					}
				});

				// Delete this
				$('#companies a').on('click', function(e){
					e.preventDefault();
				});

			},

			memberCarousel: function(){
				if(team.length){
					isiPad = true;
					team.touchCarousel({
				        itemsPerMove: 1,
				        snapToItems: false,
				        pagingNav: false,
				        pagingNavControls: false,
				        scrollbar: false,
				        directionNav: false,
				        loopItems: true,
				        useWebkit3d: false
				    });
				}
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
				if(!isiPad){			
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
				}
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
