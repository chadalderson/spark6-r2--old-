/* Main JS */$(function(){var e=function(){var t=$("body"),n=$("body > .container"),r=$("#header"),i=n.width();logo=$("#logo"),nav=$("#nav"),nav_li=nav.find("li"),nav_a=nav.find("a"),home_vid=$(".home-video a"),serv_a=$("#services a"),fb_btn=$(".home-facebook a"),navserv=$("#nav-services a"),gmap=$("#gmap"),address="1415 10th Street STE 2 Santa Monica, California 90401",contact=$("#contactForm label"),member=$("#team a"),locate=$("#redcols a"),instagram=$("#instagram"),active="active",ua=navigator.userAgent;var s={init:function(){svgeezy.init(!1,"png");this.bindResize();this.headerFx();this.headerScroll();this.homeVideo();this.servicesRollover();this.fbRollover();this.navServices();this.googleMap();this.placeholderLabels();this.memberRollover();this.locationRollover();this.instagramCols()},bindResize:function(){$(window).resize(function(){i=n.width();r.hasClass("stickit")&&r.css({width:i,left:"-"+i/2})})},headerFx:function(){r.hover(function(){if(r.hasClass("stickit"))r.css("background-color","#fff").stop(!0,!0).animate({marginTop:"0px"},200,function(){logo.stop(!0,!0).animate({marginTop:"-73px"},200,function(){$(this).addClass(active);$(this).find(".text").stop(!0,!0).fadeIn(500)});nav.stop(!0,!0).fadeIn(200)});else{logo.stop(!0,!0).animate({marginTop:"-73px"},200,function(){$(this).addClass(active);$(this).find(".text").stop(!0,!0).fadeIn(500)});nav.stop(!0,!0).fadeIn(200)}},function(){if(r.hasClass("stickit"))r.stop(!0,!0).animate({marginTop:"-104px"},200,function(){logo.stop(!0,!0).removeClass(active).animate({marginTop:"32px"},200);logo.find(".text").hide();nav.stop(!0,!0).fadeOut(200);r.css("background-color","transparent")});else{logo.stop(!0,!0).removeClass(active).animate({marginTop:"32px"},200);logo.find(".text").hide();nav.stop(!0,!0).fadeOut(200)}})},headerScroll:function(){$(document).stickem({item:r,container:n,stickClass:"stickit",endStickClass:"stickit-end",start:104,offset:0,onStick:function(){e.headerFx();r.css({width:i,left:"-"+i/2,marginTop:"-104px",backgroundColor:"transparent"});n.css("padding-top","158px")},onUnstick:function(){e.headerFx();r.css({width:"100%",marginTop:"0px",backgroundColor:"#fff"});n.css("padding-top","0px")}})},homeVideo:function(){home_vid.hover(function(){$(this).find(".video").stop(!0,!0).fadeIn(300)},function(){$(this).find(".video").stop(!0,!0).fadeOut(300)})},servicesRollover:function(){serv_a.hover(function(){$(this).find(".red-overlay").stop(!0,!0).fadeIn(200);$(this).find("h4").stop(!0,!0).animate({top:"77px",color:"#ffffff"});$(this).find(".service-text").stop(!0,!0).fadeIn(500)},function(){$(this).find(".red-overlay").stop(!0,!0).fadeOut(200);$(this).find("h4").stop(!0,!0).animate({top:"140px",color:"#cbcbcb"});$(this).find(".service-text").stop(!0,!0).fadeOut(500)})},fbRollover:function(){fb_btn.hover(function(){$(this).find(".fb-icon").stop(!0,!0).animate({top:"118px"},200)},function(){$(this).find(".fb-icon").stop(!0,!0).animate({top:"130px"},200)});fb_btn.on("click",function(e){e.preventDefault();if(!$(this).hasClass("deactive")){$(this).addClass("pressed");$(this).find(".like-txt").html("Thanks!");setTimeout(function(){fb_btn.removeClass("pressed").addClass("deactive");fb_btn.find(".like-txt").html("741 Likes")},3e3)}})},navServices:function(){navserv.hover(function(){$(this).find(".red-overlay").stop(!0,!0).fadeIn(500)},function(){$(this).find(".red-overlay").stop(!0,!0).fadeOut(500)})},googleMap:function(){gmap.length&&gmap.gmap3({marker:{address:address},map:{options:{zoom:14}}})},placeholderLabels:function(){contact.inFieldLabels()},memberRollover:function(){member.hover(function(){$(this).find("img").stop(!0,!0).fadeTo(300,.15);$(this).find(".member-text").stop(!0,!0).animate({top:"94px",opacity:1},300)},function(){$(this).find("img").stop(!0,!0).fadeTo(300,1);$(this).find(".member-text").stop(!0,!0).animate({top:"114px",opacity:0},300)})},locationRollover:function(){locate.hover(function(){$(this).find(".location-hover").stop(!0,!0).fadeIn(300)},function(){$(this).find(".location-hover").stop(!0,!0).fadeOut(300)})},instagramCols:function(){instagram.length&&instagram.masonry({columnWidth:150,itemSelector:".insta-pic",gutter:".gutter-sizer"})}};return s}();e.init()});