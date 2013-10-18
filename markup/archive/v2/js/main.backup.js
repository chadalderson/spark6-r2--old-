/* Main JS */

$(function(){
	
	var app = (function(){
		// selectors
		var body	= $('body'),
			winWidth= $(window).width(),
			wrapper = $('body > .container'),
			header 	= $('#header'),
			stickyThis = '',
			deskXS	= false,
			wrap_w	= wrapper.width(),
			logo	= $('#logo'),
			openMob	= $('#openMenu'),
			nav 	= $('#nav'),
			nav_li 	= nav.find('li'),
			nav_a 	= nav.find('a'),
			team	= $('#team'),
			home_vid= $('.home-video > a'),
			serv_a	= $('#services a'),
			fb_btn	= $('.home-facebook a'),
			navserv = $('#nav-services a'),
			gmap 	= $('#gmap'),
			address = '1415 10th Street STE 2 Santa Monica, California 90401',
			contact = $('#contactForm label'),
			member  = $('#team .member'),
			locate  = $('#redcols a'),
			instagram = $('#instagram'),
			IE8		= $.support.cssFloat,
			// classes
			active 	= 'active';
		
		var site = {
			init: function(){
				svgeezy.init(false, 'png');
				
				this.bindResize();
				// Menu FX for Desktop 
				this.headerFx();
				this.headerScroll();

				// Service FX for Desktop Home
				this.servicesRollover();
				
				// Mobile and Tablet Menu
				this.mobileMenu();
				// Team Carousel for Mobile and Tablet
				this.memberCarousel();
				
				this.homeVideo();
				this.fbRollover();
				this.navServices();
				this.googleMap();
				this.placeholderLabels();
				this.memberRollover();
				this.locationRollover();
				this.instagramCols();

				winWidth = $(window).width();
				if(winWidth>1024){
					deskXS = false;
				} else {
					deskXS = true;
				} 
			},

			bindResize: function(){
				$(window).on("throttledresize", function( event ) {

					wrap_w	= wrapper.width();
					winWidth = $(window).width();

					if(winWidth>1024){
						// Run Desktop Menu
						deskXS = false;
						if(stickyThis!==""){
							//console.log('destroying');
							stickyThis.destroy();
							app.headerScroll();
						}
						app.buildDesktopNav();
					} else{
						// Run Mobile Menu
						deskXS = true;
						if(stickyThis!==""){
							//console.log('destroying');
							stickyThis.destroy();
							app.headerScroll();
						}
						app.buildMobileNav();
					}

					if(instagram.length){
						if(winWidth<=769){
							var columnsGrid = 3;
						} else {
							var columnsGrid = 3;
						}
						instagram.isotope({
							masonry: { columnWidth: instagram.width() / columnsGrid }
						});
					}

				});
			},
			
			headerFx: function(){
								
				header.hover(
					// mouseenter
					function(e){
						if(!jQuery.browser.mobile && deskXS === false){
							if(header.hasClass('stickit')){
								
								if(!nav.hasClass('animating')){
		  							logo.stop().animate( {
			    						marginTop: "-73px",
			  						}, 200, function(){
			  							logo.addClass(active);
			  						} );
			  						//header.animate({'marginTop': '-94px'}, 200);
			  						header.css('background-color','#fff');
			  						//nav.fadeTo(10, 0);
			  						//nav.stop().fadeTo(400, 1);
			  						nav.css({opacity: 0, display: 'block'});
			  						nav.stop().animate( { opacity: 1 }, 400 );
			  						if(IE8===false){
			  							nav.show();
			  						}
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
			  						//nav.fadeTo(10, 0);
			  						//nav.stop().fadeTo(200, 1);
			  						nav.css({opacity: 0, display: 'block'});
			  						nav.stop().animate( { opacity: 1 }, 200 );
			  						if(IE8===false){
			  							nav.show();
			  						}
		  						}	  						
		  					}		
		  				}				
					},
					// mouseleave
					function(e){
						if(!jQuery.browser.mobile && deskXS === false)
							if(header.hasClass('stickit')){

								nav.addClass('animating').stop().animate( { opacity: 0 }, 200, function(){
									if(IE8===false){
			  							nav.hide();
			  						}
									header.css('background-color','transparent');
									//header.animate({'margin-top': '-104px'}, 200);
									logo.stop().animate( {
			    						marginTop: "32px",
			  						}, 400, function(){
			  							nav.removeClass('animating');
			  							logo.removeClass(active);
			  							
			  						});								
								});
		  							  					
			  				} else {
			  					
								nav.addClass('animating').stop().animate( { opacity: 0 }, 200, function(){
									if(IE8===false){
			  							nav.hide();
			  						}
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
				if(!jQuery.browser.mobile && winWidth>=1024){
					stickyThis = $(document).stickem({
				 	 	item: header,
				 		container: wrapper,
				 		stickClass: 'stickit',
				 		endStickClass: 'stickit-end',
				 		/*start: ,*/
				 		offset: -105,
				 		onStick: function(){
				 			//console.log('stucked');
				 			
				 			app.headerFx();
				 			/*
				 			header.css({
				 				width: wrap_w,
				 				left: '-' + ( wrap_w / 2 ),
				 				marginTop: '-104px',
				 				backgroundColor: 'transparent'
				 			});*/
				 			
				 			//wrapper.css('padding-top','158px');
				 			
				 			// In case the menu was open and user started to scroll
				 			/*
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
							});*/
					 	},
				 		onUnstick: function(){
				 			//console.log('unstucked');
				 			/*
				 			app.headerFx();
				 			header.css({
				 				width: '100%',
				 				marginTop: '0px',
				 				backgroundColor: 'transparent'
				 			});
				 			wrapper.css('padding-top','0px');
				 			*/
				 		}
				 	});
				} else {
					if(stickyThis!==""){
						stickyThis.destroy();
					}
				}
			},

			buildDesktopNav: function(){
				
			},

			buildMobileNav: function(){
				
			},

			mobileMenu: function(){

				openMob.on('click', function(){
					if(jQuery.browser.mobile || deskXS === true){
						$(this).toggleClass('active');
						var tmp_height = nav.outerHeight();
						nav.css('opacity', 1);
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
							nav.hide();
							wrapper.stop(true, true).animate({
									paddingTop:'0px'
								}, 400);
						}
					}
				});

				// Delete this
				$('#companies a').on('click', function(e){
					e.preventDefault();
				});

			},

			memberCarousel: function(){
				if(team.length && jQuery.browser.mobile){
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
				home_vid.on('click', function(e){
					e.preventDefault();
					$(this).find('.video-box').stop(true, true).fadeIn(300);					
				});
			},

			servicesRollover: function(){
				
				serv_a.hover(
					//mouseenter
					function(){
						if(!jQuery.browser.mobile){
							var topVal = '77px';
							if(winWidth<=1025){
								topVal = '40px';
							}
							$(this).find('.red-overlay').stop(true,true).fadeIn(200);
							$(this).find('h4').stop(true,true).animate({ top:topVal, color:'#ffffff' });
							$(this).find('.service-text').stop(true,true).fadeIn(500);
						} 
					},
					//mouseleave
					function(){
						if(!jQuery.browser.mobile){
							var topVal = '140px';
							if(winWidth<=1025){
								topVal = '90px';
							}
							$(this).find('.red-overlay').stop(true,true).fadeOut(200);
							$(this).find('h4').stop(true,true).animate({ top:topVal, color:'#cbcbcb' });
							$(this).find('.service-text').stop(true,true).fadeOut(500);
						}
					}
				);

			},

			fbRollover: function(){
				
				fb_btn.hover(
					//mousenter
					function(){
						if(winWidth<=767){
							$(this).find('.fb-icon').stop(true,true).animate({ top:'30px'}, 200);
						} else {
							$(this).find('.fb-icon').stop(true,true).animate({ top:'118px'}, 200);
						}
					},
					//mouseleave
					function(){
						if(winWidth<=767){
							$(this).find('.fb-icon').stop(true,true).animate({ top:'50px'}, 200);
						} else {
							$(this).find('.fb-icon').stop(true,true).animate({ top:'130px'}, 200);
						}
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
						if(!jQuery.browser.mobile){					
							$(this).find('.red-overlay').stop(true, true).fadeIn(500);
						}
					},
					//mouseleave
					function(){
						if(!jQuery.browser.mobile){	
							$(this).find('.red-overlay').stop(true, true).fadeOut(500);
						}
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
				if(!jQuery.browser.mobile){			
					member.hover(
						//mouseenter
						function(){
							$(this).find('img').stop(true, true).fadeTo(300, 0.15);
							$(this).find('.member-text').stop(true, true).animate({ top:'94px', opacity:1 }, 300, function(){ });
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
					if(winWidth<=769){
						var columnsGrid = 3;
					} else {
						var columnsGrid = 3;
					}
					// initialize
					instagram.isotope({
					  itemSelector : '.isotope-item',
					  animationEngine: 'best-available',
					  resizable: false, // disable normal resizing
					  masonry: {
					    columnWidth: instagram.width() / columnsGrid
					    /*gutterWidth: 0*/
					  }
					});
					instagram.isotope( 'reLayout' );
				}
				
			}
			
		}
		
		return site;
		
	}());
	
	app.init();
	
});
