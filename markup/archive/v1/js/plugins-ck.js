/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-inlinesvg-svg-svgclippaths-touch-cssclasses-teststyles-testprop-testallprops-prefixes-domprefixes
 */
;window.Modernizr=function(a,b,c){function A(a){j.cssText=a}function B(a,b){return A(m.join(a+";")+(b||""))}function C(a,b){return typeof a===b}function D(a,b){return!!~(""+a).indexOf(b)}function E(a,b){for(var d in a){var e=a[d];if(!D(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function F(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:C(f,"function")?f.bind(d||b):f}return!1}function G(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return C(b,"string")||C(b,"undefined")?E(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),F(e,b,c))}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={svg:"http://www.w3.org/2000/svg"},r={},s={},t={},u=[],v=u.slice,w,x=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},y={}.hasOwnProperty,z;!C(y,"undefined")&&!C(y.call,"undefined")?z=function(a,b){return y.call(a,b)}:z=function(a,b){return b in a&&C(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=v.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(v.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(v.call(arguments)))};return e}),r.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:x(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},r.svg=function(){return!!b.createElementNS&&!!b.createElementNS(q.svg,"svg").createSVGRect},r.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==q.svg},r.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(l.call(b.createElementNS(q.svg,"clipPath")))};for(var H in r)z(r,H)&&(w=H.toLowerCase(),e[w]=r[H](),u.push((e[w]?"":"no-")+w));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)z(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},A(""),i=k=null,e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.testProp=function(a){return E([a])},e.testAllProps=G,e.testStyles=x,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+u.join(" "):""),e}(this,this.document);

/* jQuery Stick 'em
/**
 * @name jQuery Stick 'em
 * @author Trevor Davis
 * @version 1.4
 *
 *	$('.container').stickem({
 *	 	item: '.stickem',
 *		container: '.stickem-container',
 *		stickClass: 'stickit',
 *		endStickClass: 'stickit-end',
 *		offset: 0,
 *		onStick: null,
 *		onUnstick: null
 *	});
 */

;(function($, window, document, undefined) {

	var Stickem = function(elem, options) {
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data("stickem-options");
		this.$win = $(window);
	};

	Stickem.prototype = {
		defaults: {
			item: '.stickem',
			container: '.stickem-container',
			stickClass: 'stickit',
			endStickClass: 'stickit-end',
			offset: 0,
			start: 0,
			onStick: null,
			onUnstick: null
		},

		init: function() {
			var _self = this;

			//Merge options
			_self.config = $.extend({}, _self.defaults, _self.options, _self.metadata);

			_self.setWindowHeight();
			_self.getItems();
			_self.bindEvents();

			return _self;
		},

		bindEvents: function() {
			var _self = this;
			
			_self.$win.on('scroll.stickem', $.proxy(_self.handleScroll, _self));
			_self.$win.on('resize.stickem', $.proxy(_self.handleResize, _self));
		},

		destroy: function() {
			var _self = this;

			_self.$win.off('scroll.stickem');
			_self.$win.off('resize.stickem');
		},

		getItem: function(index, element) {
			var _self = this;
			var $this = $(element);
			var item = {
				$elem: $this,
				elemHeight: $this.height(),
				$container: $this.parents(_self.config.container),
				isStuck: false
			};

			//If the element is smaller than the window
			if(_self.windowHeight > item.elemHeight) {
				item.containerHeight = item.$container.outerHeight();
				item.containerInner = {
					border: {
						bottom: parseInt(item.$container.css('border-bottom'), 10) || 0,
						top: parseInt(item.$container.css('border-top'), 10) || 0
					},
					padding: {
						bottom: parseInt(item.$container.css('padding-bottom'), 10) || 0,
						top: parseInt(item.$container.css('padding-top'), 10) || 0
					}
				};

				item.containerInnerHeight = item.$container.height();
				item.containerStart = item.$container.offset().top - _self.config.offset + _self.config.start + item.containerInner.padding.top + item.containerInner.border.top;
				item.scrollFinish = item.containerStart - _self.config.start + (item.containerInnerHeight /*- item.elemHeight*/ );

				//If the element is smaller than the container
				if(item.containerInnerHeight > item.elemHeight) {
					_self.items.push(item);
				}
			} else {
				item.$elem.removeClass(_self.config.stickClass + ' ' + _self.config.endStickClass);
			}
		},

		getItems: function() {
			var _self = this;

			_self.items = [];

			_self.$elem.find(_self.config.item).each($.proxy(_self.getItem, _self));
		},

		handleResize: function() {
			var _self = this;

			_self.getItems();
			_self.setWindowHeight();
		},

		handleScroll: function() {
			var _self = this;

			if(_self.items.length > 0) {
				var pos = _self.$win.scrollTop();

				for(var i = 0, len = _self.items.length; i < len; i++) {
					var item = _self.items[i];

					//If it's stuck, and we need to unstick it
					if(item.isStuck && (pos < item.containerStart || pos > item.scrollFinish)) {
						item.$elem.removeClass(_self.config.stickClass);

						//only at the bottom
						if(pos > item.scrollFinish) {
							item.$elem.addClass(_self.config.endStickClass);
						}

						item.isStuck = false;

						//if supplied fire the onUnstick callback
						if(_self.config.onUnstick) {
							_self.config.onUnstick(item);
						}

					//If we need to stick it
					} else if(item.isStuck === false && pos > item.containerStart && pos < item.scrollFinish) {
							item.$elem.removeClass(_self.config.endStickClass).addClass(_self.config.stickClass);
							item.isStuck = true;

							//if supplied fire the onStick callback
							if(_self.config.onStick) {
								_self.config.onStick(item);
							}
					}
				}
			}
		},

		setWindowHeight: function() {
			var _self = this;

			_self.windowHeight = _self.$win.height() - _self.config.offset;
		}
	};

	Stickem.defaults = Stickem.prototype.defaults;

	$.fn.stickem = function(options) {
		//Create a destroy method so that you can kill it and call it again.
		this.destroy = function() {
			this.each(function() {
				new Stickem(this, options).destroy();
			});
		};

		return this.each(function() {
			new Stickem(this, options).init();
		});
	};

})(jQuery, window , document);

/*! jQuery Color v@2.1.2 http://github.com/jquery/jquery-color | jquery.org/license */
(function(a,b){function m(a,b,c){var d=h[b.type]||{};return a==null?c||!b.def?null:b.def:(a=d.floor?~~a:parseFloat(a),isNaN(a)?b.def:d.mod?(a+d.mod)%d.mod:0>a?0:d.max<a?d.max:a)}function n(b){var c=f(),d=c._rgba=[];return b=b.toLowerCase(),l(e,function(a,e){var f,h=e.re.exec(b),i=h&&e.parse(h),j=e.space||"rgba";if(i)return f=c[j](i),c[g[j].cache]=f[g[j].cache],d=c._rgba=f._rgba,!1}),d.length?(d.join()==="0,0,0,0"&&a.extend(d,k.transparent),c):k[b]}function o(a,b,c){return c=(c+1)%1,c*6<1?a+(b-a)*c*6:c*2<1?b:c*3<2?a+(b-a)*(2/3-c)*6:a}var c="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",d=/^([\-+])=\s*(\d+\.?\d*)/,e=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(a){return[a[1],a[2],a[3],a[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(a){return[a[1]*2.55,a[2]*2.55,a[3]*2.55,a[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(a){return[parseInt(a[1],16),parseInt(a[2],16),parseInt(a[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(a){return[parseInt(a[1]+a[1],16),parseInt(a[2]+a[2],16),parseInt(a[3]+a[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(a){return[a[1],a[2]/100,a[3]/100,a[4]]}}],f=a.Color=function(b,c,d,e){return new a.Color.fn.parse(b,c,d,e)},g={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},h={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},i=f.support={},j=a("<p>")[0],k,l=a.each;j.style.cssText="background-color:rgba(1,1,1,.5)",i.rgba=j.style.backgroundColor.indexOf("rgba")>-1,l(g,function(a,b){b.cache="_"+a,b.props.alpha={idx:3,type:"percent",def:1}}),f.fn=a.extend(f.prototype,{parse:function(c,d,e,h){if(c===b)return this._rgba=[null,null,null,null],this;if(c.jquery||c.nodeType)c=a(c).css(d),d=b;var i=this,j=a.type(c),o=this._rgba=[];d!==b&&(c=[c,d,e,h],j="array");if(j==="string")return this.parse(n(c)||k._default);if(j==="array")return l(g.rgba.props,function(a,b){o[b.idx]=m(c[b.idx],b)}),this;if(j==="object")return c instanceof f?l(g,function(a,b){c[b.cache]&&(i[b.cache]=c[b.cache].slice())}):l(g,function(b,d){var e=d.cache;l(d.props,function(a,b){if(!i[e]&&d.to){if(a==="alpha"||c[a]==null)return;i[e]=d.to(i._rgba)}i[e][b.idx]=m(c[a],b,!0)}),i[e]&&a.inArray(null,i[e].slice(0,3))<0&&(i[e][3]=1,d.from&&(i._rgba=d.from(i[e])))}),this},is:function(a){var b=f(a),c=!0,d=this;return l(g,function(a,e){var f,g=b[e.cache];return g&&(f=d[e.cache]||e.to&&e.to(d._rgba)||[],l(e.props,function(a,b){if(g[b.idx]!=null)return c=g[b.idx]===f[b.idx],c})),c}),c},_space:function(){var a=[],b=this;return l(g,function(c,d){b[d.cache]&&a.push(c)}),a.pop()},transition:function(a,b){var c=f(a),d=c._space(),e=g[d],i=this.alpha()===0?f("transparent"):this,j=i[e.cache]||e.to(i._rgba),k=j.slice();return c=c[e.cache],l(e.props,function(a,d){var e=d.idx,f=j[e],g=c[e],i=h[d.type]||{};if(g===null)return;f===null?k[e]=g:(i.mod&&(g-f>i.mod/2?f+=i.mod:f-g>i.mod/2&&(f-=i.mod)),k[e]=m((g-f)*b+f,d))}),this[d](k)},blend:function(b){if(this._rgba[3]===1)return this;var c=this._rgba.slice(),d=c.pop(),e=f(b)._rgba;return f(a.map(c,function(a,b){return(1-d)*e[b]+d*a}))},toRgbaString:function(){var b="rgba(",c=a.map(this._rgba,function(a,b){return a==null?b>2?1:0:a});return c[3]===1&&(c.pop(),b="rgb("),b+c.join()+")"},toHslaString:function(){var b="hsla(",c=a.map(this.hsla(),function(a,b){return a==null&&(a=b>2?1:0),b&&b<3&&(a=Math.round(a*100)+"%"),a});return c[3]===1&&(c.pop(),b="hsl("),b+c.join()+")"},toHexString:function(b){var c=this._rgba.slice(),d=c.pop();return b&&c.push(~~(d*255)),"#"+a.map(c,function(a){return a=(a||0).toString(16),a.length===1?"0"+a:a}).join("")},toString:function(){return this._rgba[3]===0?"transparent":this.toRgbaString()}}),f.fn.parse.prototype=f.fn,g.hsla.to=function(a){if(a[0]==null||a[1]==null||a[2]==null)return[null,null,null,a[3]];var b=a[0]/255,c=a[1]/255,d=a[2]/255,e=a[3],f=Math.max(b,c,d),g=Math.min(b,c,d),h=f-g,i=f+g,j=i*.5,k,l;return g===f?k=0:b===f?k=60*(c-d)/h+360:c===f?k=60*(d-b)/h+120:k=60*(b-c)/h+240,h===0?l=0:j<=.5?l=h/i:l=h/(2-i),[Math.round(k)%360,l,j,e==null?1:e]},g.hsla.from=function(a){if(a[0]==null||a[1]==null||a[2]==null)return[null,null,null,a[3]];var b=a[0]/360,c=a[1],d=a[2],e=a[3],f=d<=.5?d*(1+c):d+c-d*c,g=2*d-f;return[Math.round(o(g,f,b+1/3)*255),Math.round(o(g,f,b)*255),Math.round(o(g,f,b-1/3)*255),e]},l(g,function(c,e){var g=e.props,h=e.cache,i=e.to,j=e.from;f.fn[c]=function(c){i&&!this[h]&&(this[h]=i(this._rgba));if(c===b)return this[h].slice();var d,e=a.type(c),k=e==="array"||e==="object"?c:arguments,n=this[h].slice();return l(g,function(a,b){var c=k[e==="object"?a:b.idx];c==null&&(c=n[b.idx]),n[b.idx]=m(c,b)}),j?(d=f(j(n)),d[h]=n,d):f(n)},l(g,function(b,e){if(f.fn[b])return;f.fn[b]=function(f){var g=a.type(f),h=b==="alpha"?this._hsla?"hsla":"rgba":c,i=this[h](),j=i[e.idx],k;return g==="undefined"?j:(g==="function"&&(f=f.call(this,j),g=a.type(f)),f==null&&e.empty?this:(g==="string"&&(k=d.exec(f),k&&(f=j+parseFloat(k[2])*(k[1]==="+"?1:-1))),i[e.idx]=f,this[h](i)))}})}),f.hook=function(b){var c=b.split(" ");l(c,function(b,c){a.cssHooks[c]={set:function(b,d){var e,g,h="";if(d!=="transparent"&&(a.type(d)!=="string"||(e=n(d)))){d=f(e||d);if(!i.rgba&&d._rgba[3]!==1){g=c==="backgroundColor"?b.parentNode:b;while((h===""||h==="transparent")&&g&&g.style)try{h=a.css(g,"backgroundColor"),g=g.parentNode}catch(j){}d=d.blend(h&&h!=="transparent"?h:"_default")}d=d.toRgbaString()}try{b.style[c]=d}catch(j){}}},a.fx.step[c]=function(b){b.colorInit||(b.start=f(b.elem,c),b.end=f(b.end),b.colorInit=!0),a.cssHooks[c].set(b.elem,b.start.transition(b.end,b.pos))}})},f.hook(c),a.cssHooks.borderColor={expand:function(a){var b={};return l(["Top","Right","Bottom","Left"],function(c,d){b["border"+d+"Color"]=a}),b}},k=a.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}})(jQuery);

/*
 * SVGeezy.js 1.0
*/
var svgeezy=function(){return{init:function(a,b){this.avoid=a||!1,this.filetype=b||"png",this.svgSupport=this.supportsSvg(),this.svgSupport||(this.images=document.getElementsByTagName("img"),this.imgL=this.images.length,this.fallbacks())},fallbacks:function(){for(;this.imgL--;)if(!this.hasClass(this.images[this.imgL],this.avoid)||!this.avoid){var a=this.images[this.imgL].getAttribute("src");if(null===a)continue;if("svg"==this.getFileExt(a)){var b=a.replace(".svg","."+this.filetype);this.images[this.imgL].setAttribute("src",b)}}},getFileExt:function(a){var b=a.split(".").pop();return-1!==b.indexOf("?")&&(b=b.split("?")[0]),b},hasClass:function(a,b){return(" "+a.className+" ").indexOf(" "+b+" ")>-1},supportsSvg:function(){return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")}}}();

/*!
 *  GMAP3 Plugin for JQuery 5.1.1 - 2013-05-25
 *  Web site  : http://gmap3.net
 */
(function(y,t){var z,i=0;function J(){if(!z){z={verbose:false,queryLimit:{attempt:5,delay:250,random:250},classes:{Map:google.maps.Map,Marker:google.maps.Marker,InfoWindow:google.maps.InfoWindow,Circle:google.maps.Circle,Rectangle:google.maps.Rectangle,OverlayView:google.maps.OverlayView,StreetViewPanorama:google.maps.StreetViewPanorama,KmlLayer:google.maps.KmlLayer,TrafficLayer:google.maps.TrafficLayer,BicyclingLayer:google.maps.BicyclingLayer,GroundOverlay:google.maps.GroundOverlay,StyledMapType:google.maps.StyledMapType,ImageMapType:google.maps.ImageMapType},map:{mapTypeId:google.maps.MapTypeId.ROADMAP,center:[46.578498,2.457275],zoom:2},overlay:{pane:"floatPane",content:"",offset:{x:0,y:0}},geoloc:{getCurrentPosition:{maximumAge:60000,timeout:5000}}}}}function k(M,L){return M!==t?M:"gmap3_"+(L?i+1:++i)}function d(L){var O=function(P){return parseInt(P,10)},N=google.maps.version.split(".").map(O),M;L=L.split(".").map(O);for(M=0;M<L.length;M++){if(N.hasOwnProperty(M)){if(N[M]<L[M]){return false}}else{return false}}return true}function n(P,L,N,Q,O){if(L.todo.events||L.todo.onces){var M={id:Q,data:L.todo.data,tag:L.todo.tag};if(L.todo.events){y.each(L.todo.events,function(R,U){var T=P,S=U;if(y.isArray(U)){T=U[0];S=U[1]}google.maps.event.addListener(N,R,function(V){S.apply(T,[O?O:N,V,M])})})}if(L.todo.onces){y.each(L.todo.onces,function(R,U){var T=P,S=U;if(y.isArray(U)){T=U[0];S=U[1]}google.maps.event.addListenerOnce(N,R,function(V){S.apply(T,[O?O:N,V,M])})})}}}function l(){var L=[];this.empty=function(){return !L.length};this.add=function(M){L.push(M)};this.get=function(){return L.length?L[0]:false};this.ack=function(){L.shift()}}function w(T,L,N){var R={},P=this,Q,S={latLng:{map:false,marker:false,infowindow:false,circle:false,overlay:false,getlatlng:false,getmaxzoom:false,getelevation:false,streetviewpanorama:false,getaddress:true},geoloc:{getgeoloc:true}};if(typeof N==="string"){N=M(N)}function M(V){var U={};U[V]={};return U}function O(){var U;for(U in N){if(U in R){continue}return U}}this.run=function(){var U,V;while(U=O()){if(typeof T[U]==="function"){Q=U;V=y.extend(true,{},z[U]||{},N[U].options||{});if(U in S.latLng){if(N[U].values){x(N[U].values,T,T[U],{todo:N[U],opts:V,session:R})}else{v(T,T[U],S.latLng[U],{todo:N[U],opts:V,session:R})}}else{if(U in S.geoloc){o(T,T[U],{todo:N[U],opts:V,session:R})}else{T[U].apply(T,[{todo:N[U],opts:V,session:R}])}}return}else{R[U]=null}}L.apply(T,[N,R])};this.ack=function(U){R[Q]=U;P.run.apply(P,[])}}function c(N){var L,M=[];for(L in N){M.push(L)}return M}function b(N,Q){var L={};if(N.todo){for(var M in N.todo){if((M!=="options")&&(M!=="values")){L[M]=N.todo[M]}}}var O,P=["data","tag","id","events","onces"];for(O=0;O<P.length;O++){A(L,P[O],Q,N.todo)}L.options=y.extend({},N.opts||{},Q.options||{});return L}function A(N,M){for(var L=2;L<arguments.length;L++){if(M in arguments[L]){N[M]=arguments[L][M];return}}}function r(){var L=[];this.get=function(S){if(L.length){var P,O,N,R,M,Q=c(S);for(P=0;P<L.length;P++){R=L[P];M=Q.length==R.keys.length;for(O=0;(O<Q.length)&&M;O++){N=Q[O];M=N in R.request;if(M){if((typeof S[N]==="object")&&("equals" in S[N])&&(typeof S[N]==="function")){M=S[N].equals(R.request[N])}else{M=S[N]===R.request[N]}}}if(M){return R.results}}}};this.store=function(N,M){L.push({request:N,keys:c(N),results:M})}}function e(Q,P,O,L){var N=this,M=[];z.classes.OverlayView.call(this);this.setMap(Q);this.onAdd=function(){var R=this.getPanes();if(P.pane in R){y(R[P.pane]).append(L)}y.each("dblclick click mouseover mousemove mouseout mouseup mousedown".split(" "),function(T,S){M.push(google.maps.event.addDomListener(L[0],S,function(U){y.Event(U).stopPropagation();google.maps.event.trigger(N,S,[U]);N.draw()}))});M.push(google.maps.event.addDomListener(L[0],"contextmenu",function(S){y.Event(S).stopPropagation();google.maps.event.trigger(N,"rightclick",[S]);N.draw()}))};this.getPosition=function(){return O};this.draw=function(){var R=this.getProjection().fromLatLngToDivPixel(O);L.css("left",(R.x+P.offset.x)+"px").css("top",(R.y+P.offset.y)+"px")};this.onRemove=function(){for(var R=0;R<M.length;R++){google.maps.event.removeListener(M[R])}L.remove()};this.hide=function(){L.hide()};this.show=function(){L.show()};this.toggle=function(){if(L){if(L.is(":visible")){this.show()}else{this.hide()}}};this.toggleDOM=function(){if(this.getMap()){this.setMap(null)}else{this.setMap(Q)}};this.getDOMElement=function(){return L[0]}}function f(O,L){function M(){this.onAdd=function(){};this.onRemove=function(){};this.draw=function(){};return z.classes.OverlayView.apply(this,[])}M.prototype=z.classes.OverlayView.prototype;var N=new M();N.setMap(O);return N}function F(ae,ao,aa){var an=false,ai=false,af=false,Z=false,W=true,V=this,N=[],T={},ad={},U={},aj=[],ah=[],O=[],ak=f(ao,aa.radius),Y,ap,am,P,Q;S();function L(aq){if(!aj[aq]){delete ah[aq].options.map;aj[aq]=new z.classes.Marker(ah[aq].options);n(ae,{todo:ah[aq]},aj[aq],ah[aq].id)}}this.getById=function(aq){if(aq in ad){L(ad[aq]);return aj[ad[aq]]}return false};this.rm=function(ar){var aq=ad[ar];if(aj[aq]){aj[aq].setMap(null)}delete aj[aq];aj[aq]=false;delete ah[aq];ah[aq]=false;delete O[aq];O[aq]=false;delete ad[ar];delete U[aq];ai=true};this.clearById=function(aq){if(aq in ad){this.rm(aq);return true}};this.clear=function(az,av,aA){var ar,ay,at,aw,au,ax=[],aq=C(aA);if(az){ar=ah.length-1;ay=-1;at=-1}else{ar=0;ay=ah.length;at=1}for(aw=ar;aw!=ay;aw+=at){if(ah[aw]){if(!aq||aq(ah[aw].tag)){ax.push(U[aw]);if(av||az){break}}}}for(au=0;au<ax.length;au++){this.rm(ax[au])}};this.add=function(aq,ar){aq.id=k(aq.id);this.clearById(aq.id);ad[aq.id]=aj.length;U[aj.length]=aq.id;aj.push(null);ah.push(aq);O.push(ar);ai=true};this.addMarker=function(ar,aq){aq=aq||{};aq.id=k(aq.id);this.clearById(aq.id);if(!aq.options){aq.options={}}aq.options.position=ar.getPosition();n(ae,{todo:aq},ar,aq.id);ad[aq.id]=aj.length;U[aj.length]=aq.id;aj.push(ar);ah.push(aq);O.push(aq.data||{});ai=true};this.todo=function(aq){return ah[aq]};this.value=function(aq){return O[aq]};this.marker=function(aq){if(aq in aj){L(aq);return aj[aq]}return false};this.markerIsSet=function(aq){return Boolean(aj[aq])};this.setMarker=function(ar,aq){aj[ar]=aq};this.store=function(aq,ar,at){T[aq.ref]={obj:ar,shadow:at}};this.free=function(){for(var aq=0;aq<N.length;aq++){google.maps.event.removeListener(N[aq])}N=[];y.each(T,function(ar){ac(ar)});T={};y.each(ah,function(ar){ah[ar]=null});ah=[];y.each(aj,function(ar){if(aj[ar]){aj[ar].setMap(null);delete aj[ar]}});aj=[];y.each(O,function(ar){delete O[ar]});O=[];ad={};U={}};this.filter=function(aq){am=aq;ag()};this.enable=function(aq){if(W!=aq){W=aq;ag()}};this.display=function(aq){P=aq};this.error=function(aq){Q=aq};this.beginUpdate=function(){an=true};this.endUpdate=function(){an=false;if(ai){ag()}};this.autofit=function(ar){for(var aq=0;aq<ah.length;aq++){if(ah[aq]){ar.extend(ah[aq].options.position)}}};function S(){ap=ak.getProjection();if(!ap){setTimeout(function(){S.apply(V,[])},25);return}Z=true;N.push(google.maps.event.addListener(ao,"zoom_changed",function(){al()}));N.push(google.maps.event.addListener(ao,"bounds_changed",function(){al()}));ag()}function ac(aq){if(typeof T[aq]==="object"){if(typeof(T[aq].obj.setMap)==="function"){T[aq].obj.setMap(null)}if(typeof(T[aq].obj.remove)==="function"){T[aq].obj.remove()}if(typeof(T[aq].shadow.remove)==="function"){T[aq].obj.remove()}if(typeof(T[aq].shadow.setMap)==="function"){T[aq].shadow.setMap(null)}delete T[aq].obj;delete T[aq].shadow}else{if(aj[aq]){aj[aq].setMap(null)}}delete T[aq]}function M(){var ay,ax,aw,au,av,at,ar,aq;if(arguments[0] instanceof google.maps.LatLng){ay=arguments[0].lat();aw=arguments[0].lng();if(arguments[1] instanceof google.maps.LatLng){ax=arguments[1].lat();au=arguments[1].lng()}else{ax=arguments[1];au=arguments[2]}}else{ay=arguments[0];aw=arguments[1];if(arguments[2] instanceof google.maps.LatLng){ax=arguments[2].lat();au=arguments[2].lng()}else{ax=arguments[2];au=arguments[3]}}av=Math.PI*ay/180;at=Math.PI*aw/180;ar=Math.PI*ax/180;aq=Math.PI*au/180;return 1000*6371*Math.acos(Math.min(Math.cos(av)*Math.cos(ar)*Math.cos(at)*Math.cos(aq)+Math.cos(av)*Math.sin(at)*Math.cos(ar)*Math.sin(aq)+Math.sin(av)*Math.sin(ar),1))}function R(){var aq=M(ao.getCenter(),ao.getBounds().getNorthEast()),ar=new google.maps.Circle({center:ao.getCenter(),radius:1.25*aq});return ar.getBounds()}function X(){var ar={},aq;for(aq in T){ar[aq]=true}return ar}function al(){clearTimeout(Y);Y=setTimeout(function(){ag()},25)}function ab(ar){var au=ap.fromLatLngToDivPixel(ar),at=ap.fromDivPixelToLatLng(new google.maps.Point(au.x+aa.radius,au.y-aa.radius)),aq=ap.fromDivPixelToLatLng(new google.maps.Point(au.x-aa.radius,au.y+aa.radius));return new google.maps.LatLngBounds(aq,at)}function ag(){if(an||af||!Z){return}var aE=[],aG={},aF=ao.getZoom(),aH=("maxZoom" in aa)&&(aF>aa.maxZoom),aw=X(),av,au,at,aA,ar=false,aq,aD,ay,az,aB,aC,ax;ai=false;if(aF>3){aq=R();ar=aq.getSouthWest().lng()<aq.getNorthEast().lng()}for(av=0;av<ah.length;av++){if(ah[av]&&(!ar||aq.contains(ah[av].options.position))&&(!am||am(O[av]))){aE.push(av)}}while(1){av=0;while(aG[av]&&(av<aE.length)){av++}if(av==aE.length){break}aA=[];if(W&&!aH){ax=10;do{az=aA;aA=[];ax--;if(az.length){ay=aq.getCenter()}else{ay=ah[aE[av]].options.position}aq=ab(ay);for(au=av;au<aE.length;au++){if(aG[au]){continue}if(aq.contains(ah[aE[au]].options.position)){aA.push(au)}}}while((az.length<aA.length)&&(aA.length>1)&&ax)}else{for(au=av;au<aE.length;au++){if(aG[au]){continue}aA.push(au);break}}aD={indexes:[],ref:[]};aB=aC=0;for(at=0;at<aA.length;at++){aG[aA[at]]=true;aD.indexes.push(aE[aA[at]]);aD.ref.push(aE[aA[at]]);aB+=ah[aE[aA[at]]].options.position.lat();aC+=ah[aE[aA[at]]].options.position.lng()}aB/=aA.length;aC/=aA.length;aD.latLng=new google.maps.LatLng(aB,aC);aD.ref=aD.ref.join("-");if(aD.ref in aw){delete aw[aD.ref]}else{if(aA.length===1){T[aD.ref]=true}P(aD)}}y.each(aw,function(aI){ac(aI)});af=false}}function a(M,L){this.id=function(){return M};this.filter=function(N){L.filter(N)};this.enable=function(){L.enable(true)};this.disable=function(){L.enable(false)};this.add=function(O,N,P){if(!P){L.beginUpdate()}L.addMarker(O,N);if(!P){L.endUpdate()}};this.getById=function(N){return L.getById(N)};this.clearById=function(P,O){var N;if(!O){L.beginUpdate()}N=L.clearById(P);if(!O){L.endUpdate()}return N};this.clear=function(P,Q,N,O){if(!O){L.beginUpdate()}L.clear(P,Q,N);if(!O){L.endUpdate()}}}function D(){var M={},N={};function L(P){return{id:P.id,name:P.name,object:P.obj,tag:P.tag,data:P.data}}this.add=function(R,Q,T,S){var P=R.todo||{},U=k(P.id);if(!M[Q]){M[Q]=[]}if(U in N){this.clearById(U)}N[U]={obj:T,sub:S,name:Q,id:U,tag:P.tag,data:P.data};M[Q].push(U);return U};this.getById=function(R,Q,P){if(R in N){if(Q){return N[R].sub}else{if(P){return L(N[R])}}return N[R].obj}return false};this.get=function(R,T,P,S){var V,U,Q=C(P);if(!M[R]||!M[R].length){return null}V=M[R].length;while(V){V--;U=M[R][T?V:M[R].length-V-1];if(U&&N[U]){if(Q&&!Q(N[U].tag)){continue}return S?L(N[U]):N[U].obj}}return null};this.all=function(S,Q,T){var P=[],R=C(Q),U=function(X){var V,W;for(V=0;V<M[X].length;V++){W=M[X][V];if(W&&N[W]){if(R&&!R(N[W].tag)){continue}P.push(T?L(N[W]):N[W].obj)}}};if(S in M){U(S)}else{if(S===t){for(S in M){U(S)}}}return P};function O(P){if(typeof(P.setMap)==="function"){P.setMap(null)}if(typeof(P.remove)==="function"){P.remove()}if(typeof(P.free)==="function"){P.free()}P=null}this.rm=function(S,Q,R){var P,T;if(!M[S]){return false}if(Q){if(R){for(P=M[S].length-1;P>=0;P--){T=M[S][P];if(Q(N[T].tag)){break}}}else{for(P=0;P<M[S].length;P++){T=M[S][P];if(Q(N[T].tag)){break}}}}else{P=R?M[S].length-1:0}if(!(P in M[S])){return false}return this.clearById(M[S][P],P)};this.clearById=function(S,P){if(S in N){var R,Q=N[S].name;for(R=0;P===t&&R<M[Q].length;R++){if(S===M[Q][R]){P=R}}O(N[S].obj);if(N[S].sub){O(N[S].sub)}delete N[S];M[Q].splice(P,1);return true}return false};this.objGetById=function(R){var Q;if(M.clusterer){for(var P in M.clusterer){if((Q=N[M.clusterer[P]].obj.getById(R))!==false){return Q}}}return false};this.objClearById=function(Q){if(M.clusterer){for(var P in M.clusterer){if(N[M.clusterer[P]].obj.clearById(Q)){return true}}}return null};this.clear=function(V,U,W,P){var R,T,S,Q=C(P);if(!V||!V.length){V=[];for(R in M){V.push(R)}}else{V=g(V)}for(T=0;T<V.length;T++){S=V[T];if(U){this.rm(S,Q,true)}else{if(W){this.rm(S,Q,false)}else{while(this.rm(S,Q,false)){}}}}};this.objClear=function(S,R,T,Q){if(M.clusterer&&(y.inArray("marker",S)>=0||!S.length)){for(var P in M.clusterer){N[M.clusterer[P]].obj.clear(R,T,Q)}}}}var m={},H=new r();function p(){if(!m.geocoder){m.geocoder=new google.maps.Geocoder()}return m.geocoder}function G(){if(!m.directionsService){m.directionsService=new google.maps.DirectionsService()}return m.directionsService}function h(){if(!m.elevationService){m.elevationService=new google.maps.ElevationService()}return m.elevationService}function q(){if(!m.maxZoomService){m.maxZoomService=new google.maps.MaxZoomService()}return m.maxZoomService}function B(){if(!m.distanceMatrixService){m.distanceMatrixService=new google.maps.DistanceMatrixService()}return m.distanceMatrixService}function u(){if(z.verbose){var L,M=[];if(window.console&&(typeof console.error==="function")){for(L=0;L<arguments.length;L++){M.push(arguments[L])}console.error.apply(console,M)}else{M="";for(L=0;L<arguments.length;L++){M+=arguments[L].toString()+" "}alert(M)}}}function E(L){return(typeof(L)==="number"||typeof(L)==="string")&&L!==""&&!isNaN(L)}function g(N){var M,L=[];if(N!==t){if(typeof(N)==="object"){if(typeof(N.length)==="number"){L=N}else{for(M in N){L.push(N[M])}}}else{L.push(N)}}return L}function C(L){if(L){if(typeof L==="function"){return L}L=g(L);return function(N){if(N===t){return false}if(typeof N==="object"){for(var M=0;M<N.length;M++){if(y.inArray(N[M],L)>=0){return true}}return false}return y.inArray(N,L)>=0}}}function I(M,O,L){var N=O?M:null;if(!M||(typeof M==="string")){return N}if(M.latLng){return I(M.latLng)}if(M instanceof google.maps.LatLng){return M}else{if(E(M.lat)){return new google.maps.LatLng(M.lat,M.lng)}else{if(!L&&y.isArray(M)){if(!E(M[0])||!E(M[1])){return N}return new google.maps.LatLng(M[0],M[1])}}}return N}function j(M){var N,L;if(!M||M instanceof google.maps.LatLngBounds){return M||null}if(y.isArray(M)){if(M.length==2){N=I(M[0]);L=I(M[1])}else{if(M.length==4){N=I([M[0],M[1]]);L=I([M[2],M[3]])}}}else{if(("ne" in M)&&("sw" in M)){N=I(M.ne);L=I(M.sw)}else{if(("n" in M)&&("e" in M)&&("s" in M)&&("w" in M)){N=I([M.n,M.e]);L=I([M.s,M.w])}}}if(N&&L){return new google.maps.LatLngBounds(L,N)}return null}function v(T,L,O,S,P){var N=O?I(S.todo,false,true):false,R=N?{latLng:N}:(S.todo.address?(typeof(S.todo.address)==="string"?{address:S.todo.address}:S.todo.address):false),M=R?H.get(R):false,Q=this;if(R){P=P||0;if(M){S.latLng=M.results[0].geometry.location;S.results=M.results;S.status=M.status;L.apply(T,[S])}else{if(R.location){R.location=I(R.location)}if(R.bounds){R.bounds=j(R.bounds)}p().geocode(R,function(V,U){if(U===google.maps.GeocoderStatus.OK){H.store(R,{results:V,status:U});S.latLng=V[0].geometry.location;S.results=V;S.status=U;L.apply(T,[S])}else{if((U===google.maps.GeocoderStatus.OVER_QUERY_LIMIT)&&(P<z.queryLimit.attempt)){setTimeout(function(){v.apply(Q,[T,L,O,S,P+1])},z.queryLimit.delay+Math.floor(Math.random()*z.queryLimit.random))}else{u("geocode failed",U,R);S.latLng=S.results=false;S.status=U;L.apply(T,[S])}}})}}else{S.latLng=I(S.todo,false,true);L.apply(T,[S])}}function x(Q,L,R,M){var O=this,N=-1;function P(){do{N++}while((N<Q.length)&&!("address" in Q[N]));if(N>=Q.length){R.apply(L,[M]);return}v(O,function(S){delete S.todo;y.extend(Q[N],S);P.apply(O,[])},true,{todo:Q[N]})}P()}function o(L,O,M){var N=false;if(navigator&&navigator.geolocation){navigator.geolocation.getCurrentPosition(function(P){if(N){return}N=true;M.latLng=new google.maps.LatLng(P.coords.latitude,P.coords.longitude);O.apply(L,[M])},function(){if(N){return}N=true;M.latLng=false;O.apply(L,[M])},M.opts.getCurrentPosition)}else{M.latLng=false;O.apply(L,[M])}}function K(T){var S=this,U=new l(),V=new D(),N=null,P;this._plan=function(Z){for(var Y=0;Y<Z.length;Y++){U.add(new w(S,R,Z[Y]))}Q()};function Q(){if(!P&&(P=U.get())){P.run()}}function R(){P=null;U.ack();Q.call(S)}function X(Y){if(Y.todo.callback){var Z=Array.prototype.slice.call(arguments,1);if(typeof Y.todo.callback==="function"){Y.todo.callback.apply(T,Z)}else{if(y.isArray(Y.todo.callback)){if(typeof Y.todo.callback[1]==="function"){Y.todo.callback[1].apply(Y.todo.callback[0],Z)}}}}}function O(Y,Z,aa){if(aa){n(T,Y,Z,aa)}X(Y,Z);P.ack(Z)}function L(aa,Y){Y=Y||{};if(N){if(Y.todo&&Y.todo.options){if(Y.todo.options.center){Y.todo.options.center=I(Y.todo.options.center)}N.setOptions(Y.todo.options)}}else{var Z=Y.opts||y.extend(true,{},z.map,Y.todo&&Y.todo.options?Y.todo.options:{});Z.center=aa||I(Z.center);N=new z.classes.Map(T.get(0),Z)}}this.map=function(Y){L(Y.latLng,Y);n(T,Y,N);O(Y,N)};this.destroy=function(Y){V.clear();T.empty();if(N){N=null}O(Y,true)};this.infowindow=function(Z){var aa=[],Y="values" in Z.todo;if(!Y){if(Z.latLng){Z.opts.position=Z.latLng}Z.todo.values=[{options:Z.opts}]}y.each(Z.todo.values,function(ac,ad){var af,ae,ab=b(Z,ad);ab.options.position=ab.options.position?I(ab.options.position):I(ad.latLng);if(!N){L(ab.options.position)}ae=new z.classes.InfoWindow(ab.options);if(ae&&((ab.open===t)||ab.open)){if(Y){ae.open(N,ab.anchor?ab.anchor:t)}else{ae.open(N,ab.anchor?ab.anchor:(Z.latLng?t:(Z.session.marker?Z.session.marker:t)))}}aa.push(ae);af=V.add({todo:ab},"infowindow",ae);n(T,{todo:ab},ae,af)});O(Z,Y?aa:aa[0])};this.circle=function(Z){var aa=[],Y="values" in Z.todo;if(!Y){Z.opts.center=Z.latLng||I(Z.opts.center);Z.todo.values=[{options:Z.opts}]}if(!Z.todo.values.length){O(Z,false);return}y.each(Z.todo.values,function(ac,ad){var af,ae,ab=b(Z,ad);ab.options.center=ab.options.center?I(ab.options.center):I(ad);if(!N){L(ab.options.center)}ab.options.map=N;ae=new z.classes.Circle(ab.options);aa.push(ae);af=V.add({todo:ab},"circle",ae);n(T,{todo:ab},ae,af)});O(Z,Y?aa:aa[0])};this.overlay=function(aa,Z){var ab=[],Y="values" in aa.todo;if(!Y){aa.todo.values=[{latLng:aa.latLng,options:aa.opts}]}if(!aa.todo.values.length){O(aa,false);return}if(!e.__initialised){e.prototype=new z.classes.OverlayView();e.__initialised=true}y.each(aa.todo.values,function(ae,af){var ah,ag,ac=b(aa,af),ad=y(document.createElement("div")).css({border:"none",borderWidth:"0px",position:"absolute"});ad.append(ac.options.content);ag=new e(N,ac.options,I(ac)||I(af),ad);ab.push(ag);ad=null;if(!Z){ah=V.add(aa,"overlay",ag);n(T,{todo:ac},ag,ah)}});if(Z){return ab[0]}O(aa,Y?ab:ab[0])};this.getaddress=function(Y){X(Y,Y.results,Y.status);P.ack()};this.getlatlng=function(Y){X(Y,Y.results,Y.status);P.ack()};this.getmaxzoom=function(Y){q().getMaxZoomAtLatLng(Y.latLng,function(Z){X(Y,Z.status===google.maps.MaxZoomStatus.OK?Z.zoom:false,status);P.ack()})};this.getelevation=function(Z){var aa,Y=[],ab=function(ad,ac){X(Z,ac===google.maps.ElevationStatus.OK?ad:false,ac);P.ack()};if(Z.latLng){Y.push(Z.latLng)}else{Y=g(Z.todo.locations||[]);for(aa=0;aa<Y.length;aa++){Y[aa]=I(Y[aa])}}if(Y.length){h().getElevationForLocations({locations:Y},ab)}else{if(Z.todo.path&&Z.todo.path.length){for(aa=0;aa<Z.todo.path.length;aa++){Y.push(I(Z.todo.path[aa]))}}if(Y.length){h().getElevationAlongPath({path:Y,samples:Z.todo.samples},ab)}else{P.ack()}}};this.defaults=function(Y){y.each(Y.todo,function(Z,aa){if(typeof z[Z]==="object"){z[Z]=y.extend({},z[Z],aa)}else{z[Z]=aa}});P.ack(true)};this.rectangle=function(Z){var aa=[],Y="values" in Z.todo;if(!Y){Z.todo.values=[{options:Z.opts}]}if(!Z.todo.values.length){O(Z,false);return}y.each(Z.todo.values,function(ac,ad){var af,ae,ab=b(Z,ad);ab.options.bounds=ab.options.bounds?j(ab.options.bounds):j(ad);if(!N){L(ab.options.bounds.getCenter())}ab.options.map=N;ae=new z.classes.Rectangle(ab.options);aa.push(ae);af=V.add({todo:ab},"rectangle",ae);n(T,{todo:ab},ae,af)});O(Z,Y?aa:aa[0])};function M(Z,aa,ab){var ac=[],Y="values" in Z.todo;if(!Y){Z.todo.values=[{options:Z.opts}]}if(!Z.todo.values.length){O(Z,false);return}L();y.each(Z.todo.values,function(af,ah){var aj,ag,ae,ai,ad=b(Z,ah);if(ad.options[ab]){if(ad.options[ab][0][0]&&y.isArray(ad.options[ab][0][0])){for(ag=0;ag<ad.options[ab].length;ag++){for(ae=0;ae<ad.options[ab][ag].length;ae++){ad.options[ab][ag][ae]=I(ad.options[ab][ag][ae])}}}else{for(ag=0;ag<ad.options[ab].length;ag++){ad.options[ab][ag]=I(ad.options[ab][ag])}}}ad.options.map=N;ai=new google.maps[aa](ad.options);ac.push(ai);aj=V.add({todo:ad},aa.toLowerCase(),ai);n(T,{todo:ad},ai,aj)});O(Z,Y?ac:ac[0])}this.polyline=function(Y){M(Y,"Polyline","path")};this.polygon=function(Y){M(Y,"Polygon","paths")};this.trafficlayer=function(Y){L();var Z=V.get("trafficlayer");if(!Z){Z=new z.classes.TrafficLayer();Z.setMap(N);V.add(Y,"trafficlayer",Z)}O(Y,Z)};this.bicyclinglayer=function(Y){L();var Z=V.get("bicyclinglayer");if(!Z){Z=new z.classes.BicyclingLayer();Z.setMap(N);V.add(Y,"bicyclinglayer",Z)}O(Y,Z)};this.groundoverlay=function(Y){Y.opts.bounds=j(Y.opts.bounds);if(Y.opts.bounds){L(Y.opts.bounds.getCenter())}var aa,Z=new z.classes.GroundOverlay(Y.opts.url,Y.opts.bounds,Y.opts.opts);Z.setMap(N);aa=V.add(Y,"groundoverlay",Z);O(Y,Z,aa)};this.streetviewpanorama=function(Y){if(!Y.opts.opts){Y.opts.opts={}}if(Y.latLng){Y.opts.opts.position=Y.latLng}else{if(Y.opts.opts.position){Y.opts.opts.position=I(Y.opts.opts.position)}}if(Y.todo.divId){Y.opts.container=document.getElementById(Y.todo.divId)}else{if(Y.opts.container){Y.opts.container=y(Y.opts.container).get(0)}}var aa,Z=new z.classes.StreetViewPanorama(Y.opts.container,Y.opts.opts);if(Z){N.setStreetView(Z)}aa=V.add(Y,"streetviewpanorama",Z);O(Y,Z,aa)};this.kmllayer=function(Z){var aa=[],Y="values" in Z.todo;if(!Y){Z.todo.values=[{options:Z.opts}]}if(!Z.todo.values.length){O(Z,false);return}y.each(Z.todo.values,function(ad,ae){var ag,af,ac,ab=b(Z,ae);if(!N){L()}ac=ab.options;if(ab.options.opts){ac=ab.options.opts;if(ab.options.url){ac.url=ab.options.url}}ac.map=N;if(d("3.10")){af=new z.classes.KmlLayer(ac)}else{af=new z.classes.KmlLayer(ac.url,ac)}aa.push(af);ag=V.add({todo:ab},"kmllayer",af);n(T,{todo:ab},af,ag)});O(Z,Y?aa:aa[0])};this.panel=function(ab){L();var ad,Y=0,ac=0,aa,Z=y(document.createElement("div"));Z.css({position:"absolute",zIndex:1000,visibility:"hidden"});if(ab.opts.content){aa=y(ab.opts.content);Z.append(aa);T.first().prepend(Z);if(ab.opts.left!==t){Y=ab.opts.left}else{if(ab.opts.right!==t){Y=T.width()-aa.width()-ab.opts.right}else{if(ab.opts.center){Y=(T.width()-aa.width())/2}}}if(ab.opts.top!==t){ac=ab.opts.top}else{if(ab.opts.bottom!==t){ac=T.height()-aa.height()-ab.opts.bottom}else{if(ab.opts.middle){ac=(T.height()-aa.height())/2}}}Z.css({top:ac,left:Y,visibility:"visible"})}ad=V.add(ab,"panel",Z);O(ab,Z,ad);Z=null};function W(aa){var af=new F(T,N,aa),Y={},ab={},ae=[],ad=/^[0-9]+$/,ac,Z;for(Z in aa){if(ad.test(Z)){ae.push(1*Z);ab[Z]=aa[Z];ab[Z].width=ab[Z].width||0;ab[Z].height=ab[Z].height||0}else{Y[Z]=aa[Z]}}ae.sort(function(ah,ag){return ah>ag});if(Y.calculator){ac=function(ag){var ah=[];y.each(ag,function(aj,ai){ah.push(af.value(ai))});return Y.calculator.apply(T,[ah])}}else{ac=function(ag){return ag.length}}af.error(function(){u.apply(S,arguments)});af.display(function(ag){var ai,aj,am,ak,al,ah=ac(ag.indexes);if(aa.force||ah>1){for(ai=0;ai<ae.length;ai++){if(ae[ai]<=ah){aj=ab[ae[ai]]}}}if(aj){al=aj.offset||[-aj.width/2,-aj.height/2];am=y.extend({},Y);am.options=y.extend({pane:"overlayLayer",content:aj.content?aj.content.replace("CLUSTER_COUNT",ah):"",offset:{x:("x" in al?al.x:al[0])||0,y:("y" in al?al.y:al[1])||0}},Y.options||{});ak=S.overlay({todo:am,opts:am.options,latLng:I(ag)},true);am.options.pane="floatShadow";am.options.content=y(document.createElement("div")).width(aj.width+"px").height(aj.height+"px").css({cursor:"pointer"});shadow=S.overlay({todo:am,opts:am.options,latLng:I(ag)},true);Y.data={latLng:I(ag),markers:[]};y.each(ag.indexes,function(ao,an){Y.data.markers.push(af.value(an));if(af.markerIsSet(an)){af.marker(an).setMap(null)}});n(T,{todo:Y},shadow,t,{main:ak,shadow:shadow});af.store(ag,ak,shadow)}else{y.each(ag.indexes,function(ao,an){af.marker(an).setMap(N)})}});return af}this.marker=function(aa){var Y="values" in aa.todo,ad=!N;if(!Y){aa.opts.position=aa.latLng||I(aa.opts.position);aa.todo.values=[{options:aa.opts}]}if(!aa.todo.values.length){O(aa,false);return}if(ad){L()}if(aa.todo.cluster&&!N.getBounds()){google.maps.event.addListenerOnce(N,"bounds_changed",function(){S.marker.apply(S,[aa])});return}if(aa.todo.cluster){var Z,ab;if(aa.todo.cluster instanceof a){Z=aa.todo.cluster;ab=V.getById(Z.id(),true)}else{ab=W(aa.todo.cluster);Z=new a(k(aa.todo.id,true),ab);V.add(aa,"clusterer",Z,ab)}ab.beginUpdate();y.each(aa.todo.values,function(af,ag){var ae=b(aa,ag);ae.options.position=ae.options.position?I(ae.options.position):I(ag);ae.options.map=N;if(ad){N.setCenter(ae.options.position);ad=false}ab.add(ae,ag)});ab.endUpdate();O(aa,Z)}else{var ac=[];y.each(aa.todo.values,function(af,ag){var ai,ah,ae=b(aa,ag);ae.options.position=ae.options.position?I(ae.options.position):I(ag);ae.options.map=N;if(ad){N.setCenter(ae.options.position);ad=false}ah=new z.classes.Marker(ae.options);ac.push(ah);ai=V.add({todo:ae},"marker",ah);n(T,{todo:ae},ah,ai)});O(aa,Y?ac:ac[0])}};this.getroute=function(Y){Y.opts.origin=I(Y.opts.origin,true);Y.opts.destination=I(Y.opts.destination,true);G().route(Y.opts,function(aa,Z){X(Y,Z==google.maps.DirectionsStatus.OK?aa:false,Z);P.ack()})};this.directionsrenderer=function(Y){Y.opts.map=N;var aa,Z=new google.maps.DirectionsRenderer(Y.opts);if(Y.todo.divId){Z.setPanel(document.getElementById(Y.todo.divId))}else{if(Y.todo.container){Z.setPanel(y(Y.todo.container).get(0))}}aa=V.add(Y,"directionsrenderer",Z);O(Y,Z,aa)};this.getgeoloc=function(Y){O(Y,Y.latLng)};this.styledmaptype=function(Y){L();var Z=new z.classes.StyledMapType(Y.todo.styles,Y.opts);N.mapTypes.set(Y.todo.id,Z);O(Y,Z)};this.imagemaptype=function(Y){L();var Z=new z.classes.ImageMapType(Y.opts);N.mapTypes.set(Y.todo.id,Z);O(Y,Z)};this.autofit=function(Y){var Z=new google.maps.LatLngBounds();y.each(V.all(),function(aa,ab){if(ab.getPosition){Z.extend(ab.getPosition())}else{if(ab.getBounds){Z.extend(ab.getBounds().getNorthEast());Z.extend(ab.getBounds().getSouthWest())}else{if(ab.getPaths){ab.getPaths().forEach(function(ac){ac.forEach(function(ad){Z.extend(ad)})})}else{if(ab.getPath){ab.getPath().forEach(function(ac){Z.extend(ac);""})}else{if(ab.getCenter){Z.extend(ab.getCenter())}else{if(ab instanceof a){ab=V.getById(ab.id(),true);if(ab){ab.autofit(Z)}}}}}}}});if(!Z.isEmpty()&&(!N.getBounds()||!N.getBounds().equals(Z))){if("maxZoom" in Y.todo){google.maps.event.addListenerOnce(N,"bounds_changed",function(){if(this.getZoom()>Y.todo.maxZoom){this.setZoom(Y.todo.maxZoom)}})}N.fitBounds(Z)}O(Y,true)};this.clear=function(Y){if(typeof Y.todo==="string"){if(V.clearById(Y.todo)||V.objClearById(Y.todo)){O(Y,true);return}Y.todo={name:Y.todo}}if(Y.todo.id){y.each(g(Y.todo.id),function(Z,aa){V.clearById(aa)||V.objClearById(aa)})}else{V.clear(g(Y.todo.name),Y.todo.last,Y.todo.first,Y.todo.tag);V.objClear(g(Y.todo.name),Y.todo.last,Y.todo.first,Y.todo.tag)}O(Y,true)};this.exec=function(Y){var Z=this;y.each(g(Y.todo.func),function(aa,ab){y.each(Z.get(Y.todo,true,Y.todo.hasOwnProperty("full")?Y.todo.full:true),function(ac,ad){ab.call(T,ad)})});O(Y,true)};this.get=function(aa,ad,ac){var Z,ab,Y=ad?aa:aa.todo;if(!ad){ac=Y.full}if(typeof Y==="string"){ab=V.getById(Y,false,ac)||V.objGetById(Y);if(ab===false){Z=Y;Y={}}}else{Z=Y.name}if(Z==="map"){ab=N}if(!ab){ab=[];if(Y.id){y.each(g(Y.id),function(ae,af){ab.push(V.getById(af,false,ac)||V.objGetById(af))});if(!y.isArray(Y.id)){ab=ab[0]}}else{y.each(Z?g(Z):[t],function(af,ag){var ae;if(Y.first){ae=V.get(ag,false,Y.tag,ac);if(ae){ab.push(ae)}}else{if(Y.all){y.each(V.all(ag,Y.tag,ac),function(ai,ah){ab.push(ah)})}else{ae=V.get(ag,true,Y.tag,ac);if(ae){ab.push(ae)}}}});if(!Y.all&&!y.isArray(Z)){ab=ab[0]}}}ab=y.isArray(ab)||!Y.all?ab:[ab];if(ad){return ab}else{O(aa,ab)}};this.getdistance=function(Y){var Z;Y.opts.origins=g(Y.opts.origins);for(Z=0;Z<Y.opts.origins.length;Z++){Y.opts.origins[Z]=I(Y.opts.origins[Z],true)}Y.opts.destinations=g(Y.opts.destinations);for(Z=0;Z<Y.opts.destinations.length;Z++){Y.opts.destinations[Z]=I(Y.opts.destinations[Z],true)}B().getDistanceMatrix(Y.opts,function(ab,aa){X(Y,aa===google.maps.DistanceMatrixStatus.OK?ab:false,aa);P.ack()})};this.trigger=function(Z){if(typeof Z.todo==="string"){google.maps.event.trigger(N,Z.todo)}else{var Y=[N,Z.todo.eventName];if(Z.todo.var_args){y.each(Z.todo.var_args,function(ab,aa){Y.push(aa)})}google.maps.event.trigger.apply(google.maps.event,Y)}X(Z);P.ack()}}function s(M){var L;if(!typeof M==="object"||!M.hasOwnProperty("get")){return false}for(L in M){if(L!=="get"){return false}}return !M.get.hasOwnProperty("callback")}y.fn.gmap3=function(){var M,O=[],N=true,L=[];J();for(M=0;M<arguments.length;M++){if(arguments[M]){O.push(arguments[M])}}if(!O.length){O.push("map")}y.each(this,function(){var P=y(this),Q=P.data("gmap3");N=false;if(!Q){Q=new K(P);P.data("gmap3",Q)}if(O.length===1&&(O[0]==="get"||s(O[0]))){if(O[0]==="get"){L.push(Q.get("map",true))}else{L.push(Q.get(O[0].get,true,O[0].get.full))}}else{Q._plan(O)}});if(L.length){if(L.length===1){return L[0]}else{return L}}return this}})(jQuery);

/*
 * jquery.infieldlabel
 * @version 0.1.4
 */
(function(e){e.InFieldLabels=function(n,i,t){var a=this;a.$label=e(n),a.label=n,a.$field=e(i),a.field=i,a.$label.data("InFieldLabels",a),a.showing=!0,a.init=function(){var n;a.options=e.extend({},e.InFieldLabels.defaultOptions,t),a.options.className&&a.$label.addClass(a.options.className),setTimeout(function(){""!==a.$field.val()?(a.$label.hide(),a.showing=!1):(a.$label.show(),a.showing=!0)},200),a.$field.focus(function(){a.fadeOnFocus()}).blur(function(){a.checkForEmpty(!0)}).bind("keydown.infieldlabel",function(e){a.hideOnChange(e)}).bind("paste",function(){a.setOpacity(0)}).change(function(){a.checkForEmpty()}).bind("onPropertyChange",function(){a.checkForEmpty()}).bind("keyup.infieldlabel",function(){a.checkForEmpty()}),a.options.pollDuration>0&&(n=setInterval(function(){""!==a.$field.val()&&(a.$label.hide(),a.showing=!1,clearInterval(n))},a.options.pollDuration))},a.fadeOnFocus=function(){a.showing&&a.setOpacity(a.options.fadeOpacity)},a.setOpacity=function(e){a.$label.stop().animate({opacity:e},a.options.fadeDuration,function(){0==e&&a.$label.hide()}),a.showing=e>0},a.checkForEmpty=function(e){""===a.$field.val()?(a.prepForShow(),a.setOpacity(e?1:a.options.fadeOpacity)):a.setOpacity(0)},a.prepForShow=function(){a.showing||(a.$label.css({opacity:0}).show(),a.$field.bind("keydown.infieldlabel",function(e){a.hideOnChange(e)}))},a.hideOnChange=function(e){16!==e.keyCode&&9!==e.keyCode&&(a.showing&&(a.$label.hide(),a.showing=!1),a.$field.unbind("keydown.infieldlabel"))},a.init()},e.InFieldLabels.defaultOptions={fadeOpacity:.5,fadeDuration:300,pollDuration:0,enabledInputTypes:["text","search","tel","url","email","password","number","textarea"],className:!1},e.fn.inFieldLabels=function(n){var i=n&&n.enabledInputTypes||e.InFieldLabels.defaultOptions.enabledInputTypes;return this.each(function(){var t,a,o=e(this).attr("for");o&&(t=document.getElementById(o),t&&(a=e.inArray(t.type,i),(-1!==a||"TEXTAREA"===t.nodeName)&&new e.InFieldLabels(this,t,n)))})}})(jQuery);

/**
 * Isotope v1.5.25
 */
(function(a,b,c){"use strict";var d=a.document,e=a.Modernizr,f=function(a){return a.charAt(0).toUpperCase()+a.slice(1)},g="Moz Webkit O Ms".split(" "),h=function(a){var b=d.documentElement.style,c;if(typeof b[a]=="string")return a;a=f(a);for(var e=0,h=g.length;e<h;e++){c=g[e]+a;if(typeof b[c]=="string")return c}},i=h("transform"),j=h("transitionProperty"),k={csstransforms:function(){return!!i},csstransforms3d:function(){var a=!!h("perspective");if(a){var c=" -o- -moz- -ms- -webkit- -khtml- ".split(" "),d="@media ("+c.join("transform-3d),(")+"modernizr)",e=b("<style>"+d+"{#modernizr{height:3px}}"+"</style>").appendTo("head"),f=b('<div id="modernizr" />').appendTo("html");a=f.height()===3,f.remove(),e.remove()}return a},csstransitions:function(){return!!j}},l;if(e)for(l in k)e.hasOwnProperty(l)||e.addTest(l,k[l]);else{e=a.Modernizr={_version:"1.6ish: miniModernizr for Isotope"};var m=" ",n;for(l in k)n=k[l](),e[l]=n,m+=" "+(n?"":"no-")+l;b("html").addClass(m)}if(e.csstransforms){var o=e.csstransforms3d?{translate:function(a){return"translate3d("+a[0]+"px, "+a[1]+"px, 0) "},scale:function(a){return"scale3d("+a+", "+a+", 1) "}}:{translate:function(a){return"translate("+a[0]+"px, "+a[1]+"px) "},scale:function(a){return"scale("+a+") "}},p=function(a,c,d){var e=b.data(a,"isoTransform")||{},f={},g,h={},j;f[c]=d,b.extend(e,f);for(g in e)j=e[g],h[g]=o[g](j);var k=h.translate||"",l=h.scale||"",m=k+l;b.data(a,"isoTransform",e),a.style[i]=m};b.cssNumber.scale=!0,b.cssHooks.scale={set:function(a,b){p(a,"scale",b)},get:function(a,c){var d=b.data(a,"isoTransform");return d&&d.scale?d.scale:1}},b.fx.step.scale=function(a){b.cssHooks.scale.set(a.elem,a.now+a.unit)},b.cssNumber.translate=!0,b.cssHooks.translate={set:function(a,b){p(a,"translate",b)},get:function(a,c){var d=b.data(a,"isoTransform");return d&&d.translate?d.translate:[0,0]}}}var q,r;e.csstransitions&&(q={WebkitTransitionProperty:"webkitTransitionEnd",MozTransitionProperty:"transitionend",OTransitionProperty:"oTransitionEnd otransitionend",transitionProperty:"transitionend"}[j],r=h("transitionDuration"));var s=b.event,t=b.event.handle?"handle":"dispatch",u;s.special.smartresize={setup:function(){b(this).bind("resize",s.special.smartresize.handler)},teardown:function(){b(this).unbind("resize",s.special.smartresize.handler)},handler:function(a,b){var c=this,d=arguments;a.type="smartresize",u&&clearTimeout(u),u=setTimeout(function(){s[t].apply(c,d)},b==="execAsap"?0:100)}},b.fn.smartresize=function(a){return a?this.bind("smartresize",a):this.trigger("smartresize",["execAsap"])},b.Isotope=function(a,c,d){this.element=b(c),this._create(a),this._init(d)};var v=["width","height"],w=b(a);b.Isotope.settings={resizable:!0,layoutMode:"masonry",containerClass:"isotope",itemClass:"isotope-item",hiddenClass:"isotope-hidden",hiddenStyle:{opacity:0,scale:.001},visibleStyle:{opacity:1,scale:1},containerStyle:{position:"relative",overflow:"hidden"},animationEngine:"best-available",animationOptions:{queue:!1,duration:800},sortBy:"original-order",sortAscending:!0,resizesContainer:!0,transformsEnabled:!0,itemPositionDataEnabled:!1},b.Isotope.prototype={_create:function(a){this.options=b.extend({},b.Isotope.settings,a),this.styleQueue=[],this.elemCount=0;var c=this.element[0].style;this.originalStyle={};var d=v.slice(0);for(var e in this.options.containerStyle)d.push(e);for(var f=0,g=d.length;f<g;f++)e=d[f],this.originalStyle[e]=c[e]||"";this.element.css(this.options.containerStyle),this._updateAnimationEngine(),this._updateUsingTransforms();var h={"original-order":function(a,b){return b.elemCount++,b.elemCount},random:function(){return Math.random()}};this.options.getSortData=b.extend(this.options.getSortData,h),this.reloadItems(),this.offset={left:parseInt(this.element.css("padding-left")||0,10),top:parseInt(this.element.css("padding-top")||0,10)};var i=this;setTimeout(function(){i.element.addClass(i.options.containerClass)},0),this.options.resizable&&w.bind("smartresize.isotope",function(){i.resize()}),this.element.delegate("."+this.options.hiddenClass,"click",function(){return!1})},_getAtoms:function(a){var b=this.options.itemSelector,c=b?a.filter(b).add(a.find(b)):a,d={position:"absolute"};return c=c.filter(function(a,b){return b.nodeType===1}),this.usingTransforms&&(d.left=0,d.top=0),c.css(d).addClass(this.options.itemClass),this.updateSortData(c,!0),c},_init:function(a){this.$filteredAtoms=this._filter(this.$allAtoms),this._sort(),this.reLayout(a)},option:function(a){if(b.isPlainObject(a)){this.options=b.extend(!0,this.options,a);var c;for(var d in a)c="_update"+f(d),this[c]&&this[c]()}},_updateAnimationEngine:function(){var a=this.options.animationEngine.toLowerCase().replace(/[ _\-]/g,""),b;switch(a){case"css":case"none":b=!1;break;case"jquery":b=!0;break;default:b=!e.csstransitions}this.isUsingJQueryAnimation=b,this._updateUsingTransforms()},_updateTransformsEnabled:function(){this._updateUsingTransforms()},_updateUsingTransforms:function(){var a=this.usingTransforms=this.options.transformsEnabled&&e.csstransforms&&e.csstransitions&&!this.isUsingJQueryAnimation;a||(delete this.options.hiddenStyle.scale,delete this.options.visibleStyle.scale),this.getPositionStyles=a?this._translate:this._positionAbs},_filter:function(a){var b=this.options.filter===""?"*":this.options.filter;if(!b)return a;var c=this.options.hiddenClass,d="."+c,e=a.filter(d),f=e;if(b!=="*"){f=e.filter(b);var g=a.not(d).not(b).addClass(c);this.styleQueue.push({$el:g,style:this.options.hiddenStyle})}return this.styleQueue.push({$el:f,style:this.options.visibleStyle}),f.removeClass(c),a.filter(b)},updateSortData:function(a,c){var d=this,e=this.options.getSortData,f,g;a.each(function(){f=b(this),g={};for(var a in e)!c&&a==="original-order"?g[a]=b.data(this,"isotope-sort-data")[a]:g[a]=e[a](f,d);b.data(this,"isotope-sort-data",g)})},_sort:function(){var a=this.options.sortBy,b=this._getSorter,c=this.options.sortAscending?1:-1,d=function(d,e){var f=b(d,a),g=b(e,a);return f===g&&a!=="original-order"&&(f=b(d,"original-order"),g=b(e,"original-order")),(f>g?1:f<g?-1:0)*c};this.$filteredAtoms.sort(d)},_getSorter:function(a,c){return b.data(a,"isotope-sort-data")[c]},_translate:function(a,b){return{translate:[a,b]}},_positionAbs:function(a,b){return{left:a,top:b}},_pushPosition:function(a,b,c){b=Math.round(b+this.offset.left),c=Math.round(c+this.offset.top);var d=this.getPositionStyles(b,c);this.styleQueue.push({$el:a,style:d}),this.options.itemPositionDataEnabled&&a.data("isotope-item-position",{x:b,y:c})},layout:function(a,b){var c=this.options.layoutMode;this["_"+c+"Layout"](a);if(this.options.resizesContainer){var d=this["_"+c+"GetContainerSize"]();this.styleQueue.push({$el:this.element,style:d})}this._processStyleQueue(a,b),this.isLaidOut=!0},_processStyleQueue:function(a,c){var d=this.isLaidOut?this.isUsingJQueryAnimation?"animate":"css":"css",f=this.options.animationOptions,g=this.options.onLayout,h,i,j,k;i=function(a,b){b.$el[d](b.style,f)};if(this._isInserting&&this.isUsingJQueryAnimation)i=function(a,b){h=b.$el.hasClass("no-transition")?"css":d,b.$el[h](b.style,f)};else if(c||g||f.complete){var l=!1,m=[c,g,f.complete],n=this;j=!0,k=function(){if(l)return;var b;for(var c=0,d=m.length;c<d;c++)b=m[c],typeof b=="function"&&b.call(n.element,a,n);l=!0};if(this.isUsingJQueryAnimation&&d==="animate")f.complete=k,j=!1;else if(e.csstransitions){var o=0,p=this.styleQueue[0],s=p&&p.$el,t;while(!s||!s.length){t=this.styleQueue[o++];if(!t)return;s=t.$el}var u=parseFloat(getComputedStyle(s[0])[r]);u>0&&(i=function(a,b){b.$el[d](b.style,f).one(q,k)},j=!1)}}b.each(this.styleQueue,i),j&&k(),this.styleQueue=[]},resize:function(){this["_"+this.options.layoutMode+"ResizeChanged"]()&&this.reLayout()},reLayout:function(a){this["_"+this.options.layoutMode+"Reset"](),this.layout(this.$filteredAtoms,a)},addItems:function(a,b){var c=this._getAtoms(a);this.$allAtoms=this.$allAtoms.add(c),b&&b(c)},insert:function(a,b){this.element.append(a);var c=this;this.addItems(a,function(a){var d=c._filter(a);c._addHideAppended(d),c._sort(),c.reLayout(),c._revealAppended(d,b)})},appended:function(a,b){var c=this;this.addItems(a,function(a){c._addHideAppended(a),c.layout(a),c._revealAppended(a,b)})},_addHideAppended:function(a){this.$filteredAtoms=this.$filteredAtoms.add(a),a.addClass("no-transition"),this._isInserting=!0,this.styleQueue.push({$el:a,style:this.options.hiddenStyle})},_revealAppended:function(a,b){var c=this;setTimeout(function(){a.removeClass("no-transition"),c.styleQueue.push({$el:a,style:c.options.visibleStyle}),c._isInserting=!1,c._processStyleQueue(a,b)},10)},reloadItems:function(){this.$allAtoms=this._getAtoms(this.element.children())},remove:function(a,b){this.$allAtoms=this.$allAtoms.not(a),this.$filteredAtoms=this.$filteredAtoms.not(a);var c=this,d=function(){a.remove(),b&&b.call(c.element)};a.filter(":not(."+this.options.hiddenClass+")").length?(this.styleQueue.push({$el:a,style:this.options.hiddenStyle}),this._sort(),this.reLayout(d)):d()},shuffle:function(a){this.updateSortData(this.$allAtoms),this.options.sortBy="random",this._sort(),this.reLayout(a)},destroy:function(){var a=this.usingTransforms,b=this.options;this.$allAtoms.removeClass(b.hiddenClass+" "+b.itemClass).each(function(){var b=this.style;b.position="",b.top="",b.left="",b.opacity="",a&&(b[i]="")});var c=this.element[0].style;for(var d in this.originalStyle)c[d]=this.originalStyle[d];this.element.unbind(".isotope").undelegate("."+b.hiddenClass,"click").removeClass(b.containerClass).removeData("isotope"),w.unbind(".isotope")},_getSegments:function(a){var b=this.options.layoutMode,c=a?"rowHeight":"columnWidth",d=a?"height":"width",e=a?"rows":"cols",g=this.element[d](),h,i=this.options[b]&&this.options[b][c]||this.$filteredAtoms["outer"+f(d)](!0)||g;h=Math.floor(g/i),h=Math.max(h,1),this[b][e]=h,this[b][c]=i},_checkIfSegmentsChanged:function(a){var b=this.options.layoutMode,c=a?"rows":"cols",d=this[b][c];return this._getSegments(a),this[b][c]!==d},_masonryReset:function(){this.masonry={},this._getSegments();var a=this.masonry.cols;this.masonry.colYs=[];while(a--)this.masonry.colYs.push(0)},_masonryLayout:function(a){var c=this,d=c.masonry;a.each(function(){var a=b(this),e=Math.ceil(a.outerWidth(!0)/d.columnWidth);e=Math.min(e,d.cols);if(e===1)c._masonryPlaceBrick(a,d.colYs);else{var f=d.cols+1-e,g=[],h,i;for(i=0;i<f;i++)h=d.colYs.slice(i,i+e),g[i]=Math.max.apply(Math,h);c._masonryPlaceBrick(a,g)}})},_masonryPlaceBrick:function(a,b){var c=Math.min.apply(Math,b),d=0;for(var e=0,f=b.length;e<f;e++)if(b[e]===c){d=e;break}var g=this.masonry.columnWidth*d,h=c;this._pushPosition(a,g,h);var i=c+a.outerHeight(!0),j=this.masonry.cols+1-f;for(e=0;e<j;e++)this.masonry.colYs[d+e]=i},_masonryGetContainerSize:function(){var a=Math.max.apply(Math,this.masonry.colYs);return{height:a}},_masonryResizeChanged:function(){return this._checkIfSegmentsChanged()},_fitRowsReset:function(){this.fitRows={x:0,y:0,height:0}},_fitRowsLayout:function(a){var c=this,d=this.element.width(),e=this.fitRows;a.each(function(){var a=b(this),f=a.outerWidth(!0),g=a.outerHeight(!0);e.x!==0&&f+e.x>d&&(e.x=0,e.y=e.height),c._pushPosition(a,e.x,e.y),e.height=Math.max(e.y+g,e.height),e.x+=f})},_fitRowsGetContainerSize:function(){return{height:this.fitRows.height}},_fitRowsResizeChanged:function(){return!0},_cellsByRowReset:function(){this.cellsByRow={index:0},this._getSegments(),this._getSegments(!0)},_cellsByRowLayout:function(a){var c=this,d=this.cellsByRow;a.each(function(){var a=b(this),e=d.index%d.cols,f=Math.floor(d.index/d.cols),g=(e+.5)*d.columnWidth-a.outerWidth(!0)/2,h=(f+.5)*d.rowHeight-a.outerHeight(!0)/2;c._pushPosition(a,g,h),d.index++})},_cellsByRowGetContainerSize:function(){return{height:Math.ceil(this.$filteredAtoms.length/this.cellsByRow.cols)*this.cellsByRow.rowHeight+this.offset.top}},_cellsByRowResizeChanged:function(){return this._checkIfSegmentsChanged()},_straightDownReset:function(){this.straightDown={y:0}},_straightDownLayout:function(a){var c=this;a.each(function(a){var d=b(this);c._pushPosition(d,0,c.straightDown.y),c.straightDown.y+=d.outerHeight(!0)})},_straightDownGetContainerSize:function(){return{height:this.straightDown.y}},_straightDownResizeChanged:function(){return!0},_masonryHorizontalReset:function(){this.masonryHorizontal={},this._getSegments(!0);var a=this.masonryHorizontal.rows;this.masonryHorizontal.rowXs=[];while(a--)this.masonryHorizontal.rowXs.push(0)},_masonryHorizontalLayout:function(a){var c=this,d=c.masonryHorizontal;a.each(function(){var a=b(this),e=Math.ceil(a.outerHeight(!0)/d.rowHeight);e=Math.min(e,d.rows);if(e===1)c._masonryHorizontalPlaceBrick(a,d.rowXs);else{var f=d.rows+1-e,g=[],h,i;for(i=0;i<f;i++)h=d.rowXs.slice(i,i+e),g[i]=Math.max.apply(Math,h);c._masonryHorizontalPlaceBrick(a,g)}})},_masonryHorizontalPlaceBrick:function(a,b){var c=Math.min.apply(Math,b),d=0;for(var e=0,f=b.length;e<f;e++)if(b[e]===c){d=e;break}var g=c,h=this.masonryHorizontal.rowHeight*d;this._pushPosition(a,g,h);var i=c+a.outerWidth(!0),j=this.masonryHorizontal.rows+1-f;for(e=0;e<j;e++)this.masonryHorizontal.rowXs[d+e]=i},_masonryHorizontalGetContainerSize:function(){var a=Math.max.apply(Math,this.masonryHorizontal.rowXs);return{width:a}},_masonryHorizontalResizeChanged:function(){return this._checkIfSegmentsChanged(!0)},_fitColumnsReset:function(){this.fitColumns={x:0,y:0,width:0}},_fitColumnsLayout:function(a){var c=this,d=this.element.height(),e=this.fitColumns;a.each(function(){var a=b(this),f=a.outerWidth(!0),g=a.outerHeight(!0);e.y!==0&&g+e.y>d&&(e.x=e.width,e.y=0),c._pushPosition(a,e.x,e.y),e.width=Math.max(e.x+f,e.width),e.y+=g})},_fitColumnsGetContainerSize:function(){return{width:this.fitColumns.width}},_fitColumnsResizeChanged:function(){return!0},_cellsByColumnReset:function(){this.cellsByColumn={index:0},this._getSegments(),this._getSegments(!0)},_cellsByColumnLayout:function(a){var c=this,d=this.cellsByColumn;a.each(function(){var a=b(this),e=Math.floor(d.index/d.rows),f=d.index%d.rows,g=(e+.5)*d.columnWidth-a.outerWidth(!0)/2,h=(f+.5)*d.rowHeight-a.outerHeight(!0)/2;c._pushPosition(a,g,h),d.index++})},_cellsByColumnGetContainerSize:function(){return{width:Math.ceil(this.$filteredAtoms.length/this.cellsByColumn.rows)*this.cellsByColumn.columnWidth}},_cellsByColumnResizeChanged:function(){return this._checkIfSegmentsChanged(!0)},_straightAcrossReset:function(){this.straightAcross={x:0}},_straightAcrossLayout:function(a){var c=this;a.each(function(a){var d=b(this);c._pushPosition(d,c.straightAcross.x,0),c.straightAcross.x+=d.outerWidth(!0)})},_straightAcrossGetContainerSize:function(){return{width:this.straightAcross.x}},_straightAcrossResizeChanged:function(){return!0}},b.fn.imagesLoaded=function(a){function h(){a.call(c,d)}function i(a){var c=a.target;c.src!==f&&b.inArray(c,g)===-1&&(g.push(c),--e<=0&&(setTimeout(h),d.unbind(".imagesLoaded",i)))}var c=this,d=c.find("img").add(c.filter("img")),e=d.length,f="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",g=[];return e||h(),d.bind("load.imagesLoaded error.imagesLoaded",i).each(function(){var a=this.src;this.src=f,this.src=a}),c};var x=function(b){a.console&&a.console.error(b)};b.fn.isotope=function(a,c){if(typeof a=="string"){var d=Array.prototype.slice.call(arguments,1);this.each(function(){var c=b.data(this,"isotope");if(!c){x("cannot call methods on isotope prior to initialization; attempted to call method '"+a+"'");return}if(!b.isFunction(c[a])||a.charAt(0)==="_"){x("no such method '"+a+"' for isotope instance");return}c[a].apply(c,d)})}else this.each(function(){var d=b.data(this,"isotope");d?(d.option(a),d._init(c)):b.data(this,"isotope",new b.Isotope(a,this,c))});return this}})(window,jQuery);

/*
* hoverFlow - A Solution to Animation Queue Buildup in jQuery
* Version 1.00
* Copyright (c) 2009 Ralf Stoltze, http://www.2meter3.de/code/hoverFlow/
*/
(function($){$.fn.hoverFlow=function(c,d,e,f,g){if($.inArray(c,['mouseover','mouseenter','mouseout','mouseleave'])==-1){return this}var h=typeof e==='object'?e:{complete:g||!g&&f||$.isFunction(e)&&e,duration:e,easing:g&&f||f&&!$.isFunction(f)&&f};h.queue=false;var i=h.complete;h.complete=function(){$(this).dequeue();if($.isFunction(i)){i.call(this)}};return this.each(function(){var b=$(this);if(c=='mouseover'||c=='mouseenter'){b.data('jQuery.hoverFlow',true)}else{b.removeData('jQuery.hoverFlow')}b.queue(function(){var a=(c=='mouseover'||c=='mouseenter')?b.data('jQuery.hoverFlow')!==undefined:b.data('jQuery.hoverFlow')===undefined;if(a){b.animate(d,h)}else{b.queue([])}})})}})(jQuery);

/* Detect Mobile Devices */

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    iPad: function(){
    	return navigator.userAgent.match(/iPad/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

/* Detect Mobile Browsers */
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(ipad|iphone|ipod|android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);


// jquery.touchcarousel v1.2
(function(f){function q(b,c){var a,e;this.carouselRoot=f(b);var d=this;this._b=this._a=!1;this._e=this._d=this._c="";this._f;this._g;this._h;this._i;this._j;this._k=0;this.settings=f.extend({},f.fn.touchCarousel.defaults,c);this._l=this.carouselRoot.find(".touchcarousel-container");this._m=this._l[0].style;this._n=this._l.wrap(f('<div class="touchcarousel-wrapper" />')).parent();var g=this._l.find(".touchcarousel-item");this.items=[];this.numItems=g.length;a=navigator.userAgent.toLowerCase();e=/(chrome)[ \/]([\w.]+)/.exec(a)||
/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||0>a.indexOf("compatible")&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[];a=e[1]||"";e=e[2]||"0";var r={};a&&(r[a]=!0,r.version=e);r.chrome&&(r.webkit=!0);d._o=r;this._p;this._q=!1;this._t=this._s=this._r=0;this._w=this._v=this._u=!1;"ontouchstart"in window?(this.hasTouch=!0,this._c="touchstart.rs",this._d="touchmove.rs",this._e="touchend.rs",this._x=this.settings.baseTouchFriction):(this.hasTouch=
!1,this._x=this.settings.baseMouseFriction,this.settings.dragUsingMouse?(this._c="mousedown.rs",this._d="mousemove.rs",this._e="mouseup.rs",this._y,this._z,a=d._o,a.msie||a.opera?this._y=this._z="move":a.mozilla&&(this._y="-moz-grab",this._z="-moz-grabbing"),this._a1()):this._n.addClass("auto-cursor"));if((this.hasTouch||this.settings.useWebkit3d)&&"WebKitCSSMatrix"in window&&"m11"in new WebKitCSSMatrix)this._l.css({"-webkit-transform-origin":"0 0","-webkit-transform":"translateZ(0)"}),this._w=!0;
this._w?(this._b1="-webkit-transform",this._c1="translate3d(",this._d1="px, 0, 0)"):(this._b1="left",this._c1="",this._d1="px");this.hasTouch&&(this.settings.directionNavAutoHide=!1);this.settings.directionNav||(this._f1=this.settings.loopItems?this._e1=!0:this._e1=!1,this.settings.loopItems=!0);var p,h,n=0;g.eq(this.numItems-1).addClass("last");g.each(function(b){h=f(this);p={};p.item=h;p.index=b;p.posX=n;p.width=h.outerWidth(!0)||d.settings.itemFallbackWidth;n+=p.width;if(this.hasTouch){var a;h.find("a").each(function(){a=
f(this);a.data("tc-href",a.attr("href"));a.data("tc-target",a.attr("target"));a.attr("href","#");a.bind("click",function(a){a.preventDefault();if(d._q)return!1;a=f(this).data("tc-href");var b=f(this).data("tc-target");!b||"_g1"===b.toLowerCase()?window.location.href=a:window.open(a)})})}else h.find("a").bind("click.touchcarousel",function(a){if(d._q)return a.preventDefault(),!1});h.find(".non-draggable").bind(d._c,function(a){d._q=!1;a.stopImmediatePropagation()});d.items.push(p)});this._h1=this._f=
n;this._i1=0<this.settings.itemsPerMove?this.settings.itemsPerMove:1;if(this.settings.pagingNav){if(this._j1=this.settings.snapToItems=!0,this._k1=Math.ceil(this.numItems/this._i1),this._l1=0,this.settings.pagingNavControls){this._m1=f('<div class="tc-paging-container"><div class="tc-paging-centerer"><div class="tc-paging-centerer-inside"></div></div></div>');g=this._m1.find(".tc-paging-centerer-inside");for(e=1;e<=this._k1;e++)a=f('<a class="tc-paging-item" href="#">'+e+"</a>").data("tc-id",e),e===
this._l1+1&&a.addClass("current"),g.append(a);this._n1=g.find(".tc-paging-item").click(function(a){a.preventDefault();d.goTo((f(a.currentTarget).data("tc-id")-1)*d._i1)});this._n.after(this._m1)}}else this._j1=!1;this._l.css({width:n});this.settings.directionNav&&(this._n.after("<a href='#' class='arrow-holder left'><span class='arrow-icon left'></span></a> <a href='#' class='arrow-holder right'><span class='arrow-icon right'></span></a>"),this.arrowLeft=this.carouselRoot.find(".arrow-holder.left"),
this.arrowRight=this.carouselRoot.find(".arrow-holder.right"),1>this.arrowLeft.length||1>this.arrowRight.length?this.settings.directionNav=!1:this.settings.directionNavAutoHide&&(this.arrowLeft.hide(),this.arrowRight.hide(),this.carouselRoot.one("mousemove.arrowshover",function(){d.arrowLeft.fadeIn("fast");d.arrowRight.fadeIn("fast")}),this.carouselRoot.hover(function(){d.arrowLeft.fadeIn("fast");d.arrowRight.fadeIn("fast")},function(){d.arrowLeft.fadeOut("fast");d.arrowRight.fadeOut("fast")})),this._p1(0),
this.settings.directionNav&&(this.arrowRight.click(function(a){a.preventDefault();(d.settings.loopItems&&!d._u||!d._f1)&&d.next()}),this.arrowLeft.click(function(a){a.preventDefault();(d.settings.loopItems&&!d._u||!d._e1)&&d.prev()})));this.carouselWidth;this._q1="onorientationchange"in window?"orientationchange.touchcarousel":"resize.touchcarousel";var l;f(window).bind(this._q1,function(){l&&clearTimeout(l);l=setTimeout(function(){d.updateCarouselSize(!1)},100)});this.settings.scrollbar?(this._r1=
f("<div class='scrollbar-holder'><div class='scrollbar"+("light"===this.settings.scrollbarTheme.toLowerCase()?" light":" dark")+"'></div></div>"),this._r1.appendTo(this.carouselRoot),this.scrollbarJQ=this._r1.find(".scrollbar"),this._s1="",this._t1=this.scrollbarJQ[0].style,this._u1=0,this.settings.scrollbarAutoHide?(this._v1=!1,this.scrollbarJQ.css("opacity",0)):this._v1=!0):this.settings.scrollbarAutoHide=!1;this.updateCarouselSize(!0);this._n.bind(this._c,function(a){d._w1(a)});this.settings.autoplay&&
0<this.settings.autoplayDelay?(this._x1=!1,this.autoplayTimer="",this.wasAutoplayRunning=!0,this.hasTouch||this.carouselRoot.hover(function(){d._x1=!0;d._y1()},function(){d._x1=!1;d._z1()}),this.autoplay=!0,this._a2()):this.autoplay=!1;this.settings.keyboardNav&&f(document).bind("keydown.touchcarousel",function(a){d._u||(37===a.keyCode?d.prev():39===a.keyCode&&d.next())});this.carouselRoot.css("overflow","visible")}q.prototype={goTo:function(b,c){var a=this.items[b];a&&(!c&&(this.autoplay&&this.settings.autoplayStopAtAction)&&
this.stopAutoplay(),this._b2(b),this.endPos=this._c2(),a=-a.posX,0<a?a=0:a<this.carouselWidth-this._h1&&(a=this.carouselWidth-this._h1),this.animateTo(a,this.settings.transitionSpeed,"easeInOutSine"))},next:function(b){var c=this._c2(),a=this._d2(c).index;this._j1?(c=this._l1+1,a=c>this._k1-1?this.settings.loopItems?0:(this._k1-1)*this._i1:c*this._i1):(a+=this._i1,this.settings.loopItems&&c<=this.carouselWidth-this._h1&&(a=0),a>this.numItems-1&&(a=this.numItems-1));this.goTo(a,b)},prev:function(b){var c=
this._c2(),a=this._d2(c).index;this._j1?(c=this._l1-1,a=0>c?this.settings.loopItems?(this._k1-1)*this._i1:0:c*this._i1):(a-=this._i1,0>a&&(a=this.settings.loopItems?0>c?0:this.numItems-1:0));this.goTo(a,b)},getCurrentId:function(){return this._d2(this._c2()).index},setXPos:function(b,c){c?this._t1[this._b1]=this._c1+b+this._d1:this._m[this._b1]=this._c1+b+this._d1},stopAutoplay:function(){this._y1();this.wasAutoplayRunning=this.autoplay=!1},resumeAutoplay:function(){this.autoplay=!0;this.wasAutoplayRunning||
this._z1()},updateCarouselSize:function(b){this.carouselWidth=this.carouselRoot.width();if(this.settings.scrollToLast){var c=0;if(this._j1){var a=this.numItems%this._i1;if(0<a)for(a=this.numItems-a;a<this.numItems;a++)c+=this.items[a].width;else c=this.carouselWidth}else c=this.items[this.numItems-1].width;this._h1=this._f+this.carouselWidth-c}else this._h1=this._f;this.settings.scrollbar&&(c=Math.round(this._r1.width()/(this._h1/this.carouselWidth)),this.scrollbarJQ.css("width",c),this._u1=this._r1.width()-
c);if(!this.settings.scrollToLast){if(this.carouselWidth>=this._f){this._v=!0;this.settings.loopItems||(this._f1=!0,this.arrowRight.addClass("disabled"),this._e1=!0,this.arrowLeft.addClass("disabled"));this.setXPos(0);return}this._v&&(this._e1=this._f1=this._v=!1,this.arrowRight.removeClass("disabled"),this.arrowLeft.removeClass("disabled"))}b||(b=this.endPos=this._c2(),0<b?b=0:b<this.carouselWidth-this._h1&&(b=this.carouselWidth-this._h1),this.animateTo(b,300,"easeInOutSine"))},animateTo:function(b,
c,a,e,d,g,r){function p(){h._b=!1;h._a2();h.settings.scrollbarAutoHide&&h._g2();null!==h.settings.onAnimComplete&&h.settings.onAnimComplete.call(h)}null!==this.settings.onAnimStart&&this.settings.onAnimStart.call(this);this.autoplay&&this.autoplayTimer&&(this.wasAutoplayRunning=!0,this._y1());this._e2();var h=this,n=this.settings.scrollbar,l=h._b1,j=h._c1,m=h._d1,q={containerPos:this.endPos},k={containerPos:b},v={containerPos:d};d=e?d:b;var s=h._m;h._b=!0;if(n){var t=this._t1,u=h._h1-h.carouselWidth;
this.settings.scrollbarAutoHide&&(this._v1||this._f2())}this._p1(d);this._p=f(q).animate(k,{duration:c,easing:a,step:function(){n&&(t[l]=j+Math.round(h._u1*(-this.containerPos/u))+m);s[l]=j+Math.round(this.containerPos)+m},complete:function(){e?h._p=f(k).animate(v,{duration:g,easing:r,step:function(){n&&(t[l]=j+Math.round(h._u1*(-this.containerPos/u))+m);s[l]=j+Math.round(this.containerPos)+m},complete:function(){n&&(t[l]=j+Math.round(h._u1*(-v.containerPos/u))+m);s[l]=j+Math.round(v.containerPos)+
m;p()}}):(n&&(t[l]=j+Math.round(h._u1*(-k.containerPos/u))+m),s[l]=j+Math.round(k.containerPos)+m,p())}})},destroy:function(){this.stopAutoplay();this._n.unbind(this._c);f(document).unbind(this._d).unbind(this._e);f(window).unbind(this._q1);this.settings.keyboardNav&&f(document).unbind("keydown.touchcarousel");this.carouselRoot.remove()},_b2:function(b){this._j1&&(this._l1=b=this._h2(b),this.settings.pagingNavControls&&(this._n1.removeClass("current"),this._n1.eq(b).addClass("current")))},_h2:function(b){for(var c=
this._i1,a=0;a<this._k1;a++)if(b>=a*c&&b<a*c+c)return a;return 0>b?0:b>=this._k1?this._k1-1:!1},_i2:function(){this.settings.loopItems||(this._e1?(this._e1=!1,this.arrowLeft.removeClass("disabled")):this._f1&&(this._f1=!1,this.arrowRight.removeClass("disabled")))},_o1:function(){!this._e1&&!this.settings.loopItems&&(this._e1=!0,this.arrowLeft.addClass("disabled"),this._f1&&(this._f1=!1,this.arrowRight.removeClass("disabled")))},_j2:function(){!this._f1&&!this.settings.loopItems&&(this._f1=!0,this.arrowRight.addClass("disabled"),
this._e1&&(this._e1=!1,this.arrowLeft.removeClass("disabled")))},_d2:function(b){b=-b;for(var c,a=0;a<this.numItems;a++)if(c=this.items[a],b>=c.posX&&b<c.posX+c.width)return c;return-1},_a2:function(){this.autoplay&&this.wasAutoplayRunning&&(this._x1||this._z1(),this.wasAutoplayRunning=!1)},_g2:function(){var b=this;this._v1=!1;this._s1&&clearTimeout(this._s1);this._s1=setTimeout(function(){b.scrollbarJQ.animate({opacity:0},150,"linear")},450)},_f2:function(){this._v1=!0;this._s1&&clearTimeout(this._s1);
this.scrollbarJQ.stop().animate({opacity:1},150,"linear")},_e2:function(){this._p&&this._p.stop()},_z1:function(){if(this.autoplay){var b=this;this.autoplayTimer||(this.autoplayTimer=setInterval(function(){!b._k2&&!b._b&&b.next(!0)},this.settings.autoplayDelay))}},_y1:function(){this.autoplayTimer&&(clearInterval(this.autoplayTimer),this.autoplayTimer="")},_c2:function(b){b=!b?this._l:this.scrollbarJQ;return this._w?(b=b.css("-webkit-transform").replace(/^matrix\(/i,"").split(/, |\)$/g),parseInt(b[4],
10)):Math.round(b.position().left)},_w1:function(b){if(!this._k2){this.autoplay&&this.settings.autoplayStopAtAction&&this.stopAutoplay();this._e2();this.settings.scrollbarAutoHide&&this._f2();var c;if(this.hasTouch)if(this._a=!1,(c=b.originalEvent.touches)&&0<c.length)c=c[0];else return!1;else c=b,b.preventDefault();this._l2();this._k2=!0;var a=this;this._w&&a._l.css({"-webkit-transition-duration":"0","-webkit-transition-property":"none"});f(document).bind(this._d,function(b){a._m2(b)});f(document).bind(this._e,
function(b){a._n2(b)});this._o2=this._c2();this._i=c.clientX;this._q=!1;this._k=b.timeStamp||(new Date).getTime();this._t=0;this._s=this._r=c.clientX;this._p2=c.clientY}},_m2:function(b){var c=b.timeStamp||(new Date).getTime(),a;if(this.hasTouch){if(this._a)return!1;a=b.originalEvent.touches;if(1<a.length)return!1;a=a[0];if(Math.abs(a.clientY-this._p2)>Math.abs(a.clientX-this._r)+3)return this.settings.lockAxis&&(this._a=!0),!1}else a=b;b.preventDefault();this._j=a.clientX;this._q2=this._r2;b=a.clientX-
this._s;this._q2!=b&&(this._r2=b);if(0!=b){var e=this._o2+this._t;0<=e?(b/=4,this._o1()):e<=this.carouselWidth-this._h1?(this._j2(),b/=4):this._i2();this._t+=b;this.setXPos(e);this.settings.scrollbar&&this.setXPos(this._u1*(-e/(this._h1-this.carouselWidth)),!0)}this._s=a.clientX;350<c-this._k&&(this._k=c,this._i=a.clientX);null!==this.settings.onDragStart&&this.settings.onDragStart.call(this);return!1},_n2:function(b){if(this._k2){var c=this;this._k2=!1;this._a1();this.endPos=this._c2();this.isdrag=
!1;f(document).unbind(this._d).unbind(this._e);if(this.endPos==this._o2){this._q=!1;this.settings.scrollbarAutoHide&&this._g2();return}this._q=!0;var a=this._j-this._i;b=Math.max(40,(b.timeStamp||(new Date).getTime())-this._k);var e=0.5;b=Math.abs(a)/b;var d=function(a){0<a?a=0:a<c.carouselWidth-c._h1&&(a=c.carouselWidth-c._h1);return a};if(this.settings.snapToItems){this.autoplay&&this.settings.autoplayStopAtAction&&this.stopAutoplay();var a=Boolean(0<this._r-this._s),e=d(this._c2()),g=this._d2(e).index;
this._j1?(a&&(e=Math.max(e-this.carouselWidth-1,1-c._h1),g=this._d2(e).index,void 0===g&&(g=this.numItems-1)),g=this._h2(g)*this._i1):g+=a?this._i1:-this._i1+1;g=a?Math.min(g,this.numItems-1):Math.max(g,0);e=this.items[g];this._b2(g);e&&(e=d(-e.posX),d=Math.abs(this.endPos-e),b=Math.max(1.08*d/b,150),g=Boolean(180>b),d*=0.08,a&&(d*=-1),this.animateTo(g?e+d:e,Math.min(b,400),"easeOutSine",g,e,300,"easeOutCubic"))}else d=0,2>=b?(e=3.5*this._x,d=0):2<b&&3>=b?(e=4*this._x,d=200):3<b&&(d=300,4<b&&(b=4,
d=400,e=6*this._x),e=5*this._x),a=2*b*b/(2*e)*(0>a?-1:1),e=2*b/e+d,0<this.endPos+a?0<this.endPos?this.animateTo(0,800,"easeOutCubic"):this.animateTo(this.carouselWidth/10*((d+200)/1E3),1.1*Math.abs(this.endPos)/b,"easeOutSine",!0,0,400,"easeOutCubic"):this.endPos+a<this.carouselWidth-this._h1?this.endPos<this.carouselWidth-this._h1?this.animateTo(this.carouselWidth-this._h1,800,"easeOutCubic"):this.animateTo(this.carouselWidth-this._h1-this.carouselWidth/10*((d+200)/1E3),1.1*Math.abs(this.carouselWidth-
this._h1-this.endPos)/b,"easeOutSine",!0,this.carouselWidth-this._h1,400,"easeOutCubic"):this.animateTo(this.endPos+a,e,"easeOutCubic");null!==this.settings.onDragRelease&&this.settings.onDragRelease.call(this)}return!1},_p1:function(b){void 0===b&&(b=this._c2());this.settings.loopItems||(0<=b?this._o1():b<=this.carouselWidth-this._h1?this._j2():this._i2())},_a1:function(){this._y?this._n.css("cursor",this._y):(this._n.removeClass("grabbing-cursor"),this._n.addClass("grab-cursor"))},_l2:function(){this._z?
this._n.css("cursor",this._z):(this._n.removeClass("grab-cursor"),this._n.addClass("grabbing-cursor"))}};f.fn.touchCarousel=function(b){return this.each(function(){var c=new q(f(this),b);f(this).data("touchCarousel",c)})};f.fn.touchCarousel.defaults={itemsPerMove:1,snapToItems:!1,pagingNav:!1,pagingNavControls:!0,autoplay:!1,autoplayDelay:3E3,autoplayStopAtAction:!0,scrollbar:!0,scrollbarAutoHide:!1,scrollbarTheme:"dark",transitionSpeed:600,directionNav:!0,directionNavAutoHide:!1,loopItems:!1,keyboardNav:!1,
dragUsingMouse:!0,scrollToLast:!1,itemFallbackWidth:500,baseMouseFriction:0.0012,baseTouchFriction:8E-4,lockAxis:!0,useWebkit3d:!1,onAnimStart:null,onAnimComplete:null,onDragStart:null,onDragRelease:null};f.fn.touchCarousel.settings={};f.extend(jQuery.easing,{easeInOutSine:function(b,c,a,e,d){return-e/2*(Math.cos(Math.PI*c/d)-1)+a},easeOutSine:function(b,c,a,e,d){return e*Math.sin(c/d*(Math.PI/2))+a},easeOutCubic:function(b,c,a,e,d){return e*((c=c/d-1)*c*c+1)+a}})})(jQuery);

/*! Video.js v4.2.1 Copyright 2013 Brightcove, Inc. https://github.com/videojs/video.js/blob/master/LICENSE */ (function() {var b=void 0,f=!0,j=null,l=!1;function m(){return function(){}}function p(a){return function(){return this[a]}}function q(a){return function(){return a}}var t;document.createElement("video");document.createElement("audio");document.createElement("track");function u(a,c,d){if("string"===typeof a){0===a.indexOf("#")&&(a=a.slice(1));if(u.wa[a])return u.wa[a];a=u.v(a)}if(!a||!a.nodeName)throw new TypeError("The element or ID supplied is not valid. (videojs)");return a.player||new u.w(a,c,d)}var v=u;
/**
 * @fileoverview Main function src.
 */

// HTML5 Shiv. Must be in <head> to support older browsers.
document.createElement('video');
document.createElement('audio');
document.createElement('track');

/**
 * Doubles as the main function for users to create a player instance and also
 * the main library object.
 *
 * @param  {String|Element} id      Video element or video element ID
 * @param  {Object=} options        Optional options object for config/settings
 * @param  {Function=} ready        Optional ready callback
 * @return {vjs.Player}             A player instance
 */
var vjs = function(id, options, ready){
  var tag; // Element of ID

  // Allow for element or ID to be passed in
  // String ID
  if (typeof id === 'string') {

    // Adjust for jQuery ID syntax
    if (id.indexOf('#') === 0) {
      id = id.slice(1);
    }

    // If a player instance has already been created for this ID return it.
    if (vjs.players[id]) {
      return vjs.players[id];

    // Otherwise get element for ID
    } else {
      tag = vjs.el(id);
    }

  // ID is a media element
  } else {
    tag = id;
  }

  // Check for a useable element
  if (!tag || !tag.nodeName) { // re: nodeName, could be a box div also
    throw new TypeError('The element or ID supplied is not valid. (videojs)'); // Returns
  }

  // Element may have a player attr referring to an already created player instance.
  // If not, set up a new player and return the instance.
  return tag['player'] || new vjs.Player(tag, options, ready);
};

// Extended name, also available externally, window.videojs
var videojs = vjs;
window.videojs = window.vjs = vjs;

// CDN Version. Used to target right flash swf.
vjs.CDN_VERSION = '4.2';
vjs.ACCESS_PROTOCOL = ('https:' == document.location.protocol ? 'https://' : 'http://');

/**
 * Global Player instance options, surfaced from vjs.Player.prototype.options_
 * vjs.options = vjs.Player.prototype.options_
 * All options should use string keys so they avoid
 * renaming by closure compiler
 * @type {Object}
 */
vjs.options = {
  // Default order of fallback technology
  'techOrder': ['html5','flash'],
  // techOrder: ['flash','html5'],

  'html5': {},
  'flash': {},

  // Default of web browser is 300x150. Should rely on source width/height.
  'width': 300,
  'height': 150,
  // defaultVolume: 0.85,
  'defaultVolume': 0.00, // The freakin seaguls are driving me crazy!

  // Included control sets
  'children': {
    'mediaLoader': {},
    'posterImage': {},
    'textTrackDisplay': {},
    'loadingSpinner': {},
    'bigPlayButton': {},
    'controlBar': {}
  },

  // Default message to show when a video cannot be played.
  'notSupportedMessage': 'Sorry, no compatible source and playback ' +
      'technology were found for this video. Try using another browser ' +
      'like <a href="http://bit.ly/ccMUEC">Chrome</a> or download the ' +
      'latest <a href="http://adobe.ly/mwfN1">Adobe Flash Player</a>.'
};

// Set CDN Version of swf
// The added (+) blocks the replace from changing this 4.2 string
if (vjs.CDN_VERSION !== 'GENERATED'+'_CDN_VSN') {
  videojs.options['flash']['swf'] = vjs.ACCESS_PROTOCOL + 'vjs.zencdn.net/'+vjs.CDN_VERSION+'/video-js.swf';
}

/**
 * Global player list
 * @type {Object}
 */
vjs.players = {};
/**
 * Core Object/Class for objects that use inheritance + contstructors
 * @constructor
 */
vjs.CoreObject = vjs['CoreObject'] = function(){};
// Manually exporting vjs['CoreObject'] here for Closure Compiler
// because of the use of the extend/create class methods
// If we didn't do this, those functions would get flattend to something like
// `a = ...` and `this.prototype` would refer to the global object instead of
// CoreObject

/**
 * Create a new object that inherits from this Object
 * @param {Object} props Functions and properties to be applied to the
 *                       new object's prototype
 * @return {vjs.CoreObject} Returns an object that inherits from CoreObject
 * @this {*}
 */
vjs.CoreObject.extend = function(props){
  var init, subObj;

  props = props || {};
  // Set up the constructor using the supplied init method
  // or using the init of the parent object
  // Make sure to check the unobfuscated version for external libs
  init = props['init'] || props.init || this.prototype['init'] || this.prototype.init || function(){};
  // In Resig's simple class inheritance (previously used) the constructor
  //  is a function that calls `this.init.apply(arguments)`
  // However that would prevent us from using `ParentObject.call(this);`
  //  in a Child constuctor because the `this` in `this.init`
  //  would still refer to the Child and cause an inifinite loop.
  // We would instead have to do
  //    `ParentObject.prototype.init.apply(this, argumnents);`
  //  Bleh. We're not creating a _super() function, so it's good to keep
  //  the parent constructor reference simple.
  subObj = function(){
    init.apply(this, arguments);
  };

  // Inherit from this object's prototype
  subObj.prototype = vjs.obj.create(this.prototype);
  // Reset the constructor property for subObj otherwise
  // instances of subObj would have the constructor of the parent Object
  subObj.prototype.constructor = subObj;

  // Make the class extendable
  subObj.extend = vjs.CoreObject.extend;
  // Make a function for creating instances
  subObj.create = vjs.CoreObject.create;

  // Extend subObj's prototype with functions and other properties from props
  for (var name in props) {
    if (props.hasOwnProperty(name)) {
      subObj.prototype[name] = props[name];
    }
  }

  return subObj;
};

/**
 * Create a new instace of this Object class
 * @return {vjs.CoreObject} Returns an instance of a CoreObject subclass
 * @this {*}
 */
vjs.CoreObject.create = function(){
  // Create a new object that inherits from this object's prototype
  var inst = vjs.obj.create(this.prototype);

  // Apply this constructor function to the new object
  this.apply(inst, arguments);

  // Return the new object
  return inst;
};
/**
 * @fileoverview Event System (John Resig - Secrets of a JS Ninja http://jsninja.com/)
 * (Original book version wasn't completely usable, so fixed some things and made Closure Compiler compatible)
 * This should work very similarly to jQuery's events, however it's based off the book version which isn't as
 * robust as jquery's, so there's probably some differences.
 */

/**
 * Add an event listener to element
 * It stores the handler function in a separate cache object
 * and adds a generic handler to the element's event,
 * along with a unique id (guid) to the element.
 * @param  {Element|Object}   elem Element or object to bind listeners to
 * @param  {String}   type Type of event to bind to.
 * @param  {Function} fn   Event listener.
 */
vjs.on = function(elem, type, fn){
  var data = vjs.getData(elem);

  // We need a place to store all our handler data
  if (!data.handlers) data.handlers = {};

  if (!data.handlers[type]) data.handlers[type] = [];

  if (!fn.guid) fn.guid = vjs.guid++;

  data.handlers[type].push(fn);

  if (!data.dispatcher) {
    data.disabled = false;

    data.dispatcher = function (event){

      if (data.disabled) return;
      event = vjs.fixEvent(event);

      var handlers = data.handlers[event.type];

      if (handlers) {
        // Copy handlers so if handlers are added/removed during the process it doesn't throw everything off.
        var handlersCopy = handlers.slice(0);

        for (var m = 0, n = handlersCopy.length; m < n; m++) {
          if (event.isImmediatePropagationStopped()) {
            break;
          } else {
            handlersCopy[m].call(elem, event);
          }
        }
      }
    };
  }

  if (data.handlers[type].length == 1) {
    if (document.addEventListener) {
      elem.addEventListener(type, data.dispatcher, false);
    } else if (document.attachEvent) {
      elem.attachEvent('on' + type, data.dispatcher);
    }
  }
};

/**
 * Removes event listeners from an element
 * @param  {Element|Object}   elem Object to remove listeners from
 * @param  {String=}   type Type of listener to remove. Don't include to remove all events from element.
 * @param  {Function} fn   Specific listener to remove. Don't incldue to remove listeners for an event type.
 */
vjs.off = function(elem, type, fn) {
  // Don't want to add a cache object through getData if not needed
  if (!vjs.hasData(elem)) return;

  var data = vjs.getData(elem);

  // If no events exist, nothing to unbind
  if (!data.handlers) { return; }

  // Utility function
  var removeType = function(t){
     data.handlers[t] = [];
     vjs.cleanUpEvents(elem,t);
  };

  // Are we removing all bound events?
  if (!type) {
    for (var t in data.handlers) removeType(t);
    return;
  }

  var handlers = data.handlers[type];

  // If no handlers exist, nothing to unbind
  if (!handlers) return;

  // If no listener was provided, remove all listeners for type
  if (!fn) {
    removeType(type);
    return;
  }

  // We're only removing a single handler
  if (fn.guid) {
    for (var n = 0; n < handlers.length; n++) {
      if (handlers[n].guid === fn.guid) {
        handlers.splice(n--, 1);
      }
    }
  }

  vjs.cleanUpEvents(elem, type);
};

/**
 * Clean up the listener cache and dispatchers
 * @param  {Element|Object} elem Element to clean up
 * @param  {String} type Type of event to clean up
 */
vjs.cleanUpEvents = function(elem, type) {
  var data = vjs.getData(elem);

  // Remove the events of a particular type if there are none left
  if (data.handlers[type].length === 0) {
    delete data.handlers[type];
    // data.handlers[type] = null;
    // Setting to null was causing an error with data.handlers

    // Remove the meta-handler from the element
    if (document.removeEventListener) {
      elem.removeEventListener(type, data.dispatcher, false);
    } else if (document.detachEvent) {
      elem.detachEvent('on' + type, data.dispatcher);
    }
  }

  // Remove the events object if there are no types left
  if (vjs.isEmpty(data.handlers)) {
    delete data.handlers;
    delete data.dispatcher;
    delete data.disabled;

    // data.handlers = null;
    // data.dispatcher = null;
    // data.disabled = null;
  }

  // Finally remove the expando if there is no data left
  if (vjs.isEmpty(data)) {
    vjs.removeData(elem);
  }
};

/**
 * Fix a native event to have standard property values
 * @param  {Object} event Event object to fix
 * @return {Object}
 */
vjs.fixEvent = function(event) {

  function returnTrue() { return true; }
  function returnFalse() { return false; }

  // Test if fixing up is needed
  // Used to check if !event.stopPropagation instead of isPropagationStopped
  // But native events return true for stopPropagation, but don't have
  // other expected methods like isPropagationStopped. Seems to be a problem
  // with the Javascript Ninja code. So we're just overriding all events now.
  if (!event || !event.isPropagationStopped) {
    var old = event || window.event;

    event = {};
    // Clone the old object so that we can modify the values event = {};
    // IE8 Doesn't like when you mess with native event properties
    // Firefox returns false for event.hasOwnProperty('type') and other props
    //  which makes copying more difficult.
    // TODO: Probably best to create a whitelist of event props
    for (var key in old) {
      // Safari 6.0.3 warns you if you try to copy deprecated layerX/Y
      if (key !== 'layerX' && key !== 'layerY') {
        event[key] = old[key];
      }
    }

    // The event occurred on this element
    if (!event.target) {
      event.target = event.srcElement || document;
    }

    // Handle which other element the event is related to
    event.relatedTarget = event.fromElement === event.target ?
      event.toElement :
      event.fromElement;

    // Stop the default browser action
    event.preventDefault = function () {
      if (old.preventDefault) {
        old.preventDefault();
      }
      event.returnValue = false;
      event.isDefaultPrevented = returnTrue;
    };

    event.isDefaultPrevented = returnFalse;

    // Stop the event from bubbling
    event.stopPropagation = function () {
      if (old.stopPropagation) {
        old.stopPropagation();
      }
      event.cancelBubble = true;
      event.isPropagationStopped = returnTrue;
    };

    event.isPropagationStopped = returnFalse;

    // Stop the event from bubbling and executing other handlers
    event.stopImmediatePropagation = function () {
      if (old.stopImmediatePropagation) {
        old.stopImmediatePropagation();
      }
      event.isImmediatePropagationStopped = returnTrue;
      event.stopPropagation();
    };

    event.isImmediatePropagationStopped = returnFalse;

    // Handle mouse position
    if (event.clientX != null) {
      var doc = document.documentElement, body = document.body;

      event.pageX = event.clientX +
        (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
        (doc && doc.clientLeft || body && body.clientLeft || 0);
      event.pageY = event.clientY +
        (doc && doc.scrollTop || body && body.scrollTop || 0) -
        (doc && doc.clientTop || body && body.clientTop || 0);
    }

    // Handle key presses
    event.which = event.charCode || event.keyCode;

    // Fix button for mouse clicks:
    // 0 == left; 1 == middle; 2 == right
    if (event.button != null) {
      event.button = (event.button & 1 ? 0 :
        (event.button & 4 ? 1 :
          (event.button & 2 ? 2 : 0)));
    }
  }

  // Returns fixed-up instance
  return event;
};

/**
 * Trigger an event for an element
 * @param  {Element|Object} elem  Element to trigger an event on
 * @param  {String} event Type of event to trigger
 */
vjs.trigger = function(elem, event) {
  // Fetches element data and a reference to the parent (for bubbling).
  // Don't want to add a data object to cache for every parent,
  // so checking hasData first.
  var elemData = (vjs.hasData(elem)) ? vjs.getData(elem) : {};
  var parent = elem.parentNode || elem.ownerDocument;
      // type = event.type || event,
      // handler;

  // If an event name was passed as a string, creates an event out of it
  if (typeof event === 'string') {
    event = { type:event, target:elem };
  }
  // Normalizes the event properties.
  event = vjs.fixEvent(event);

  // If the passed element has a dispatcher, executes the established handlers.
  if (elemData.dispatcher) {
    elemData.dispatcher.call(elem, event);
  }

  // Unless explicitly stopped or the event does not bubble (e.g. media events)
    // recursively calls this function to bubble the event up the DOM.
    if (parent && !event.isPropagationStopped() && event.bubbles !== false) {
    vjs.trigger(parent, event);

  // If at the top of the DOM, triggers the default action unless disabled.
  } else if (!parent && !event.isDefaultPrevented()) {
    var targetData = vjs.getData(event.target);

    // Checks if the target has a default action for this event.
    if (event.target[event.type]) {
      // Temporarily disables event dispatching on the target as we have already executed the handler.
      targetData.disabled = true;
      // Executes the default action.
      if (typeof event.target[event.type] === 'function') {
        event.target[event.type]();
      }
      // Re-enables event dispatching.
      targetData.disabled = false;
    }
  }

  // Inform the triggerer if the default was prevented by returning false
  return !event.isDefaultPrevented();
  /* Original version of js ninja events wasn't complete.
   * We've since updated to the latest version, but keeping this around
   * for now just in case.
   */
  // // Added in attion to book. Book code was broke.
  // event = typeof event === 'object' ?
  //   event[vjs.expando] ?
  //     event :
  //     new vjs.Event(type, event) :
  //   new vjs.Event(type);

  // event.type = type;
  // if (handler) {
  //   handler.call(elem, event);
  // }

  // // Clean up the event in case it is being reused
  // event.result = undefined;
  // event.target = elem;
};

/**
 * Trigger a listener only once for an event
 * @param  {Element|Object}   elem Element or object to
 * @param  {[type]}   type [description]
 * @param  {Function} fn   [description]
 * @return {[type]}
 */
vjs.one = function(elem, type, fn) {
  var func = function(){
    vjs.off(elem, type, func);
    fn.apply(this, arguments);
  };
  func.guid = fn.guid = fn.guid || vjs.guid++;
  vjs.on(elem, type, func);
};
var hasOwnProp = Object.prototype.hasOwnProperty;

/**
 * Creates an element and applies properties.
 * @param  {String=} tagName    Name of tag to be created.
 * @param  {Object=} properties Element properties to be applied.
 * @return {Element}
 */
vjs.createEl = function(tagName, properties){
  var el, propName;

  el = document.createElement(tagName || 'div');

  for (propName in properties){
    if (hasOwnProp.call(properties, propName)) {
      //el[propName] = properties[propName];
      // Not remembering why we were checking for dash
      // but using setAttribute means you have to use getAttribute

      // The check for dash checks for the aria-* attributes, like aria-label, aria-valuemin.
      // The additional check for "role" is because the default method for adding attributes does not
      // add the attribute "role". My guess is because it's not a valid attribute in some namespaces, although
      // browsers handle the attribute just fine. The W3C allows for aria-* attributes to be used in pre-HTML5 docs.
      // http://www.w3.org/TR/wai-aria-primer/#ariahtml. Using setAttribute gets around this problem.

       if (propName.indexOf('aria-') !== -1 || propName=='role') {
         el.setAttribute(propName, properties[propName]);
       } else {
         el[propName] = properties[propName];
       }
    }
  }
  return el;
};

/**
 * Uppercase the first letter of a string
 * @param  {String} string String to be uppercased
 * @return {String}
 */
vjs.capitalize = function(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Object functions container
 * @type {Object}
 */
vjs.obj = {};

/**
 * Object.create shim for prototypal inheritance.
 * https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/create
 * @param  {Object}   obj Object to use as prototype
 */
 vjs.obj.create = Object.create || function(obj){
  //Create a new function called 'F' which is just an empty object.
  function F() {}

  //the prototype of the 'F' function should point to the
  //parameter of the anonymous function.
  F.prototype = obj;

  //create a new constructor function based off of the 'F' function.
  return new F();
};

/**
 * Loop through each property in an object and call a function
 * whose arguments are (key,value)
 * @param  {Object}   obj Object of properties
 * @param  {Function} fn  Function to be called on each property.
 * @this {*}
 */
vjs.obj.each = function(obj, fn, context){
  for (var key in obj) {
    if (hasOwnProp.call(obj, key)) {
      fn.call(context || this, key, obj[key]);
    }
  }
};

/**
 * Merge two objects together and return the original.
 * @param  {Object} obj1
 * @param  {Object} obj2
 * @return {Object}
 */
vjs.obj.merge = function(obj1, obj2){
  if (!obj2) { return obj1; }
  for (var key in obj2){
    if (hasOwnProp.call(obj2, key)) {
      obj1[key] = obj2[key];
    }
  }
  return obj1;
};

/**
 * Merge two objects, and merge any properties that are objects
 * instead of just overwriting one. Uses to merge options hashes
 * where deeper default settings are important.
 * @param  {Object} obj1 Object to override
 * @param  {Object} obj2 Overriding object
 * @return {Object}      New object. Obj1 and Obj2 will be untouched.
 */
vjs.obj.deepMerge = function(obj1, obj2){
  var key, val1, val2;

  // make a copy of obj1 so we're not ovewriting original values.
  // like prototype.options_ and all sub options objects
  obj1 = vjs.obj.copy(obj1);

  for (key in obj2){
    if (hasOwnProp.call(obj2, key)) {
      val1 = obj1[key];
      val2 = obj2[key];

      // Check if both properties are pure objects and do a deep merge if so
      if (vjs.obj.isPlain(val1) && vjs.obj.isPlain(val2)) {
        obj1[key] = vjs.obj.deepMerge(val1, val2);
      } else {
        obj1[key] = obj2[key];
      }
    }
  }
  return obj1;
};

/**
 * Make a copy of the supplied object
 * @param  {Object} obj Object to copy
 * @return {Object}     Copy of object
 */
vjs.obj.copy = function(obj){
  return vjs.obj.merge({}, obj);
};

/**
 * Check if an object is plain, and not a dom node or any object sub-instance
 * @param  {Object} obj Object to check
 * @return {Boolean}     True if plain, false otherwise
 */
vjs.obj.isPlain = function(obj){
  return !!obj
    && typeof obj === 'object'
    && obj.toString() === '[object Object]'
    && obj.constructor === Object;
};

/**
 * Bind (a.k.a proxy or Context). A simple method for changing the context of a function
   It also stores a unique id on the function so it can be easily removed from events
 * @param  {*}   context The object to bind as scope
 * @param  {Function} fn      The function to be bound to a scope
 * @param  {Number=}   uid     An optional unique ID for the function to be set
 * @return {Function}
 */
vjs.bind = function(context, fn, uid) {
  // Make sure the function has a unique ID
  if (!fn.guid) { fn.guid = vjs.guid++; }

  // Create the new function that changes the context
  var ret = function() {
    return fn.apply(context, arguments);
  };

  // Allow for the ability to individualize this function
  // Needed in the case where multiple objects might share the same prototype
  // IF both items add an event listener with the same function, then you try to remove just one
  // it will remove both because they both have the same guid.
  // when using this, you need to use the bind method when you remove the listener as well.
  // currently used in text tracks
  ret.guid = (uid) ? uid + '_' + fn.guid : fn.guid;

  return ret;
};

/**
 * Element Data Store. Allows for binding data to an element without putting it directly on the element.
 * Ex. Event listneres are stored here.
 * (also from jsninja.com, slightly modified and updated for closure compiler)
 * @type {Object}
 */
vjs.cache = {};

/**
 * Unique ID for an element or function
 * @type {Number}
 */
vjs.guid = 1;

/**
 * Unique attribute name to store an element's guid in
 * @type {String}
 * @constant
 */
vjs.expando = 'vdata' + (new Date()).getTime();

/**
 * Returns the cache object where data for an element is stored
 * @param  {Element} el Element to store data for.
 * @return {Object}
 */
vjs.getData = function(el){
  var id = el[vjs.expando];
  if (!id) {
    id = el[vjs.expando] = vjs.guid++;
    vjs.cache[id] = {};
  }
  return vjs.cache[id];
};

/**
 * Returns the cache object where data for an element is stored
 * @param  {Element} el Element to store data for.
 * @return {Object}
 */
vjs.hasData = function(el){
  var id = el[vjs.expando];
  return !(!id || vjs.isEmpty(vjs.cache[id]));
};

/**
 * Delete data for the element from the cache and the guid attr from getElementById
 * @param  {Element} el Remove data for an element
 */
vjs.removeData = function(el){
  var id = el[vjs.expando];
  if (!id) { return; }
  // Remove all stored data
  // Changed to = null
  // http://coding.smashingmagazine.com/2012/11/05/writing-fast-memory-efficient-javascript/
  // vjs.cache[id] = null;
  delete vjs.cache[id];

  // Remove the expando property from the DOM node
  try {
    delete el[vjs.expando];
  } catch(e) {
    if (el.removeAttribute) {
      el.removeAttribute(vjs.expando);
    } else {
      // IE doesn't appear to support removeAttribute on the document element
      el[vjs.expando] = null;
    }
  }
};

vjs.isEmpty = function(obj) {
  for (var prop in obj) {
    // Inlude null properties as empty.
    if (obj[prop] !== null) {
      return false;
    }
  }
  return true;
};

/**
 * Add a CSS class name to an element
 * @param {Element} element    Element to add class name to
 * @param {String} classToAdd Classname to add
 */
vjs.addClass = function(element, classToAdd){
  if ((' '+element.className+' ').indexOf(' '+classToAdd+' ') == -1) {
    element.className = element.className === '' ? classToAdd : element.className + ' ' + classToAdd;
  }
};

/**
 * Remove a CSS class name from an element
 * @param {Element} element    Element to remove from class name
 * @param {String} classToAdd Classname to remove
 */
vjs.removeClass = function(element, classToRemove){
  var classNames, i;

  if (element.className.indexOf(classToRemove) == -1) { return; }

  classNames = element.className.split(' ');

  // no arr.indexOf in ie8, and we don't want to add a big shim
  for (i = classNames.length - 1; i >= 0; i--) {
    if (classNames[i] === classToRemove) {
      classNames.splice(i,1);
    }
  }

  element.className = classNames.join(' ');
};

/**
 * Element for testing browser HTML5 video capabilities
 * @type {Element}
 * @constant
 */
vjs.TEST_VID = vjs.createEl('video');

/**
 * Useragent for browser testing.
 * @type {String}
 * @constant
 */
vjs.USER_AGENT = navigator.userAgent;

/**
 * Device is an iPhone
 * @type {Boolean}
 * @constant
 */
vjs.IS_IPHONE = (/iPhone/i).test(vjs.USER_AGENT);
vjs.IS_IPAD = (/iPad/i).test(vjs.USER_AGENT);
vjs.IS_IPOD = (/iPod/i).test(vjs.USER_AGENT);
vjs.IS_IOS = vjs.IS_IPHONE || vjs.IS_IPAD || vjs.IS_IPOD;

vjs.IOS_VERSION = (function(){
  var match = vjs.USER_AGENT.match(/OS (\d+)_/i);
  if (match && match[1]) { return match[1]; }
})();

vjs.IS_ANDROID = (/Android/i).test(vjs.USER_AGENT);
vjs.ANDROID_VERSION = (function() {
  // This matches Android Major.Minor.Patch versions
  // ANDROID_VERSION is Major.Minor as a Number, if Minor isn't available, then only Major is returned
  var match = vjs.USER_AGENT.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i),
    major,
    minor;

  if (!match) {
    return null;
  }

  major = match[1] && parseFloat(match[1]);
  minor = match[2] && parseFloat(match[2]);

  if (major && minor) {
    return parseFloat(match[1] + '.' + match[2]);
  } else if (major) {
    return major;
  } else {
    return null;
  }
})();
// Old Android is defined as Version older than 2.3, and requiring a webkit version of the android browser
vjs.IS_OLD_ANDROID = vjs.IS_ANDROID && (/webkit/i).test(vjs.USER_AGENT) && vjs.ANDROID_VERSION < 2.3;

vjs.IS_FIREFOX = (/Firefox/i).test(vjs.USER_AGENT);
vjs.IS_CHROME = (/Chrome/i).test(vjs.USER_AGENT);

vjs.TOUCH_ENABLED = ('ontouchstart' in window);

/**
 * Get an element's attribute values, as defined on the HTML tag
 * Attributs are not the same as properties. They're defined on the tag
 * or with setAttribute (which shouldn't be used with HTML)
 * This will return true or false for boolean attributes.
 * @param  {Element} tag Element from which to get tag attributes
 * @return {Object}
 */
vjs.getAttributeValues = function(tag){
  var obj, knownBooleans, attrs, attrName, attrVal;

  obj = {};

  // known boolean attributes
  // we can check for matching boolean properties, but older browsers
  // won't know about HTML5 boolean attributes that we still read from
  knownBooleans = ','+'autoplay,controls,loop,muted,default'+',';

  if (tag && tag.attributes && tag.attributes.length > 0) {
    attrs = tag.attributes;

    for (var i = attrs.length - 1; i >= 0; i--) {
      attrName = attrs[i].name;
      attrVal = attrs[i].value;

      // check for known booleans
      // the matching element property will return a value for typeof
      if (typeof tag[attrName] === 'boolean' || knownBooleans.indexOf(','+attrName+',') !== -1) {
        // the value of an included boolean attribute is typically an empty
        // string ('') which would equal false if we just check for a false value.
        // we also don't want support bad code like autoplay='false'
        attrVal = (attrVal !== null) ? true : false;
      }

      obj[attrName] = attrVal;
    }
  }

  return obj;
};

/**
 * Get the computed style value for an element
 * From http://robertnyman.com/2006/04/24/get-the-rendered-style-of-an-element/
 * @param  {Element} el        Element to get style value for
 * @param  {String} strCssRule Style name
 * @return {String}            Style value
 */
vjs.getComputedDimension = function(el, strCssRule){
  var strValue = '';
  if(document.defaultView && document.defaultView.getComputedStyle){
    strValue = document.defaultView.getComputedStyle(el, '').getPropertyValue(strCssRule);

  } else if(el.currentStyle){
    // IE8 Width/Height support
    strValue = el['client'+strCssRule.substr(0,1).toUpperCase() + strCssRule.substr(1)] + 'px';
  }
  return strValue;
};

/**
 * Insert an element as the first child node of another
 * @param  {Element} child   Element to insert
 * @param  {[type]} parent Element to insert child into
 */
vjs.insertFirst = function(child, parent){
  if (parent.firstChild) {
    parent.insertBefore(child, parent.firstChild);
  } else {
    parent.appendChild(child);
  }
};

/**
 * Object to hold browser support information
 * @type {Object}
 */
vjs.support = {};

/**
 * Shorthand for document.getElementById()
 * Also allows for CSS (jQuery) ID syntax. But nothing other than IDs.
 * @param  {String} id  Element ID
 * @return {Element}    Element with supplied ID
 */
vjs.el = function(id){
  if (id.indexOf('#') === 0) {
    id = id.slice(1);
  }

  return document.getElementById(id);
};

/**
 * Format seconds as a time string, H:MM:SS or M:SS
 * Supplying a guide (in seconds) will force a number of leading zeros
 * to cover the length of the guide
 * @param  {Number} seconds Number of seconds to be turned into a string
 * @param  {Number} guide   Number (in seconds) to model the string after
 * @return {String}         Time formatted as H:MM:SS or M:SS
 */
vjs.formatTime = function(seconds, guide) {
  // Default to using seconds as guide
  guide = guide || seconds;
  var s = Math.floor(seconds % 60),
      m = Math.floor(seconds / 60 % 60),
      h = Math.floor(seconds / 3600),
      gm = Math.floor(guide / 60 % 60),
      gh = Math.floor(guide / 3600);

  // handle invalid times
  if (isNaN(seconds) || seconds === Infinity) {
    // '-' is false for all relational operators (e.g. <, >=) so this setting
    // will add the minimum number of fields specified by the guide
    h = m = s = '-';
  }

  // Check if we need to show hours
  h = (h > 0 || gh > 0) ? h + ':' : '';

  // If hours are showing, we may need to add a leading zero.
  // Always show at least one digit of minutes.
  m = (((h || gm >= 10) && m < 10) ? '0' + m : m) + ':';

  // Check if leading zero is need for seconds
  s = (s < 10) ? '0' + s : s;

  return h + m + s;
};

// Attempt to block the ability to select text while dragging controls
vjs.blockTextSelection = function(){
  document.body.focus();
  document.onselectstart = function () { return false; };
};
// Turn off text selection blocking
vjs.unblockTextSelection = function(){ document.onselectstart = function () { return true; }; };

/**
 * Trim whitespace from the ends of a string.
 * @param  {String} string String to trim
 * @return {String}        Trimmed string
 */
vjs.trim = function(str){
  return (str+'').replace(/^\s+|\s+$/g, '');
};

/**
 * Should round off a number to a decimal place
 * @param  {Number} num Number to round
 * @param  {Number} dec Number of decimal places to round to
 * @return {Number}     Rounded number
 */
vjs.round = function(num, dec) {
  if (!dec) { dec = 0; }
  return Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
};

/**
 * Should create a fake TimeRange object
 * Mimics an HTML5 time range instance, which has functions that
 * return the start and end times for a range
 * TimeRanges are returned by the buffered() method
 * @param  {Number} start Start time in seconds
 * @param  {Number} end   End time in seconds
 * @return {Object}       Fake TimeRange object
 */
vjs.createTimeRange = function(start, end){
  return {
    length: 1,
    start: function() { return start; },
    end: function() { return end; }
  };
};

/**
 * Simple http request for retrieving external files (e.g. text tracks)
 * @param  {String} url           URL of resource
 * @param  {Function=} onSuccess  Success callback
 * @param  {Function=} onError    Error callback
 */
vjs.get = function(url, onSuccess, onError){
  var local, request;

  if (typeof XMLHttpRequest === 'undefined') {
    window.XMLHttpRequest = function () {
      try { return new window.ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch (e) {}
      try { return new window.ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch (f) {}
      try { return new window.ActiveXObject('Msxml2.XMLHTTP'); } catch (g) {}
      throw new Error('This browser does not support XMLHttpRequest.');
    };
  }

  request = new XMLHttpRequest();
  try {
    request.open('GET', url);
  } catch(e) {
    onError(e);
  }

  local = (url.indexOf('file:') === 0 || (window.location.href.indexOf('file:') === 0 && url.indexOf('http') === -1));

  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      if (request.status === 200 || local && request.status === 0) {
        onSuccess(request.responseText);
      } else {
        if (onError) {
          onError();
        }
      }
    }
  };

  try {
    request.send();
  } catch(e) {
    if (onError) {
      onError(e);
    }
  }
};

/* Local Storage
================================================================================ */
vjs.setLocalStorage = function(key, value){
  try {
    // IE was throwing errors referencing the var anywhere without this
    var localStorage = window.localStorage || false;
    if (!localStorage) { return; }
    localStorage[key] = value;
  } catch(e) {
    if (e.code == 22 || e.code == 1014) { // Webkit == 22 / Firefox == 1014
      vjs.log('LocalStorage Full (VideoJS)', e);
    } else {
      if (e.code == 18) {
        vjs.log('LocalStorage not allowed (VideoJS)', e);
      } else {
        vjs.log('LocalStorage Error (VideoJS)', e);
      }
    }
  }
};

/**
 * Get abosolute version of relative URL. Used to tell flash correct URL.
 * http://stackoverflow.com/questions/470832/getting-an-absolute-url-from-a-relative-one-ie6-issue
 * @param  {String} url URL to make absolute
 * @return {String}     Absolute URL
 */
vjs.getAbsoluteURL = function(url){

  // Check if absolute URL
  if (!url.match(/^https?:\/\//)) {
    // Convert to absolute URL. Flash hosted off-site needs an absolute URL.
    url = vjs.createEl('div', {
      innerHTML: '<a href="'+url+'">x</a>'
    }).firstChild.href;
  }

  return url;
};

// usage: log('inside coolFunc',this,arguments);
// http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
vjs.log = function(){
  vjs.log.history = vjs.log.history || [];   // store logs to an array for reference
  vjs.log.history.push(arguments);
  if(window.console){
    window.console.log(Array.prototype.slice.call(arguments));
  }
};

// Offset Left
// getBoundingClientRect technique from John Resig http://ejohn.org/blog/getboundingclientrect-is-awesome/
vjs.findPosition = function(el) {
    var box, docEl, body, clientLeft, scrollLeft, left, clientTop, scrollTop, top;

    if (el.getBoundingClientRect && el.parentNode) {
      box = el.getBoundingClientRect();
    }

    if (!box) {
      return {
        left: 0,
        top: 0
      };
    }

    docEl = document.documentElement;
    body = document.body;

    clientLeft = docEl.clientLeft || body.clientLeft || 0;
    scrollLeft = window.pageXOffset || body.scrollLeft;
    left = box.left + scrollLeft - clientLeft;

    clientTop = docEl.clientTop || body.clientTop || 0;
    scrollTop = window.pageYOffset || body.scrollTop;
    top = box.top + scrollTop - clientTop;

    return {
      left: left,
      top: top
    };
};
/**
 * @fileoverview Player Component - Base class for all UI objects
 *
 */

/**
 * Base UI Component class
 * @param {Object} player  Main Player
 * @param {Object=} options
 * @constructor
 */
vjs.Component = vjs.CoreObject.extend({
  /** @constructor */
  init: function(player, options, ready){
    this.player_ = player;

    // Make a copy of prototype.options_ to protect against overriding global defaults
    this.options_ = vjs.obj.copy(this.options_);

    // Updated options with supplied options
    options = this.options(options);

    // Get ID from options, element, or create using player ID and unique ID
    this.id_ = options['id'] || ((options['el'] && options['el']['id']) ? options['el']['id'] : player.id() + '_component_' + vjs.guid++ );

    this.name_ = options['name'] || null;

    // Create element if one wasn't provided in options
    this.el_ = options['el'] || this.createEl();

    this.children_ = [];
    this.childIndex_ = {};
    this.childNameIndex_ = {};

    // Add any child components in options
    this.initChildren();

    this.ready(ready);
    // Don't want to trigger ready here or it will before init is actually
    // finished for all children that run this constructor
  }
});

/**
 * Dispose of the component and all child components.
 */
vjs.Component.prototype.dispose = function(){
  this.trigger('dispose');

  // Dispose all children.
  if (this.children_) {
    for (var i = this.children_.length - 1; i >= 0; i--) {
      if (this.children_[i].dispose) {
        this.children_[i].dispose();
      }
    }
  }

  // Delete child references
  this.children_ = null;
  this.childIndex_ = null;
  this.childNameIndex_ = null;

  // Remove all event listeners.
  this.off();

  // Remove element from DOM
  if (this.el_.parentNode) {
    this.el_.parentNode.removeChild(this.el_);
  }

  vjs.removeData(this.el_);
  this.el_ = null;
};

/**
 * Reference to main player instance.
 * @type {vjs.Player}
 * @private
 */
vjs.Component.prototype.player_;

/**
 * Return the component's player.
 * @return {vjs.Player}
 */
vjs.Component.prototype.player = function(){
  return this.player_;
};

/**
 * Component options object.
 * @type {Object}
 * @private
 */
vjs.Component.prototype.options_;

/**
 * Deep merge of options objects
 * Whenever a property is an object on both options objects
 * the two properties will be merged using vjs.obj.deepMerge.
 *
 * This is used for merging options for child components. We
 * want it to be easy to override individual options on a child
 * component without having to rewrite all the other default options.
 *
 * Parent.prototype.options_ = {
 *   children: {
 *     'childOne': { 'foo': 'bar', 'asdf': 'fdsa' },
 *     'childTwo': {},
 *     'childThree': {}
 *   }
 * }
 * newOptions = {
 *   children: {
 *     'childOne': { 'foo': 'baz', 'abc': '123' }
 *     'childTwo': null,
 *     'childFour': {}
 *   }
 * }
 *
 * this.options(newOptions);
 *
 * RESULT
 *
 * {
 *   children: {
 *     'childOne': { 'foo': 'baz', 'asdf': 'fdsa', 'abc': '123' },
 *     'childTwo': null, // Disabled. Won't be initialized.
 *     'childThree': {},
 *     'childFour': {}
 *   }
 * }
 *
 * @param  {Object} obj Object whose values will be overwritten
 * @return {Object}      NEW merged object. Does not return obj1.
 */
vjs.Component.prototype.options = function(obj){
  if (obj === undefined) return this.options_;

  return this.options_ = vjs.obj.deepMerge(this.options_, obj);
};

/**
 * The DOM element for the component.
 * @type {Element}
 * @private
 */
vjs.Component.prototype.el_;

/**
 * Create the component's DOM element.
 * @param  {String=} tagName  Element's node type. e.g. 'div'
 * @param  {Object=} attributes An object of element attributes that should be set on the element.
 * @return {Element}
 */
vjs.Component.prototype.createEl = function(tagName, attributes){
  return vjs.createEl(tagName, attributes);
};

/**
 * Return the component's DOM element.
 * @return {Element}
 */
vjs.Component.prototype.el = function(){
  return this.el_;
};

/**
 * An optional element where, if defined, children will be inserted
 *   instead of directly in el_
 * @type {Element}
 * @private
 */
vjs.Component.prototype.contentEl_;

/**
 * Return the component's DOM element for embedding content.
 *   will either be el_ or a new element defined in createEl
 * @return {Element}
 */
vjs.Component.prototype.contentEl = function(){
  return this.contentEl_ || this.el_;
};

/**
 * The ID for the component.
 * @type {String}
 * @private
 */
vjs.Component.prototype.id_;

/**
 * Return the component's ID.
 * @return {String}
 */
vjs.Component.prototype.id = function(){
  return this.id_;
};

/**
 * The name for the component. Often used to reference the component.
 * @type {String}
 * @private
 */
vjs.Component.prototype.name_;

/**
 * Return the component's ID.
 * @return {String}
 */
vjs.Component.prototype.name = function(){
  return this.name_;
};

/**
 * Array of child components
 * @type {Array}
 * @private
 */
vjs.Component.prototype.children_;

/**
 * Returns array of all child components.
 * @return {Array}
 */
vjs.Component.prototype.children = function(){
  return this.children_;
};

/**
 * Object of child components by ID
 * @type {Object}
 * @private
 */
vjs.Component.prototype.childIndex_;

/**
 * Returns a child component with the provided ID.
 * @return {Array}
 */
vjs.Component.prototype.getChildById = function(id){
  return this.childIndex_[id];
};

/**
 * Object of child components by Name
 * @type {Object}
 * @private
 */
vjs.Component.prototype.childNameIndex_;

/**
 * Returns a child component with the provided ID.
 * @return {Array}
 */
vjs.Component.prototype.getChild = function(name){
  return this.childNameIndex_[name];
};

/**
 * Adds a child component inside this component.
 * @param {String|vjs.Component} child The class name or instance of a child to add.
 * @param {Object=} options Optional options, including options to be passed to
 *  children of the child.
 * @return {vjs.Component} The child component, because it might be created in this process.
 * @suppress {accessControls|checkRegExp|checkTypes|checkVars|const|constantProperty|deprecated|duplicate|es5Strict|fileoverviewTags|globalThis|invalidCasts|missingProperties|nonStandardJsDocs|strictModuleDepCheck|undefinedNames|undefinedVars|unknownDefines|uselessCode|visibility}
 */
vjs.Component.prototype.addChild = function(child, options){
  var component, componentClass, componentName, componentId;

  // If string, create new component with options
  if (typeof child === 'string') {

    componentName = child;

    // Make sure options is at least an empty object to protect against errors
    options = options || {};

    // Assume name of set is a lowercased name of the UI Class (PlayButton, etc.)
    componentClass = options['componentClass'] || vjs.capitalize(componentName);

    // Set name through options
    options['name'] = componentName;

    // Create a new object & element for this controls set
    // If there's no .player_, this is a player
    // Closure Compiler throws an 'incomplete alias' warning if we use the vjs variable directly.
    // Every class should be exported, so this should never be a problem here.
    component = new window['videojs'][componentClass](this.player_ || this, options);

  // child is a component instance
  } else {
    component = child;
  }

  this.children_.push(component);

  if (typeof component.id === 'function') {
    this.childIndex_[component.id()] = component;
  }

  // If a name wasn't used to create the component, check if we can use the
  // name function of the component
  componentName = componentName || (component.name && component.name());

  if (componentName) {
    this.childNameIndex_[componentName] = component;
  }

  // Add the UI object's element to the container div (box)
  // Having an element is not required
  if (typeof component['el'] === 'function' && component['el']()) {
    this.contentEl().appendChild(component['el']());
  }

  // Return so it can stored on parent object if desired.
  return component;
};

vjs.Component.prototype.removeChild = function(component){
  if (typeof component === 'string') {
    component = this.getChild(component);
  }

  if (!component || !this.children_) return;

  var childFound = false;
  for (var i = this.children_.length - 1; i >= 0; i--) {
    if (this.children_[i] === component) {
      childFound = true;
      this.children_.splice(i,1);
      break;
    }
  }

  if (!childFound) return;

  this.childIndex_[component.id] = null;
  this.childNameIndex_[component.name] = null;

  var compEl = component.el();
  if (compEl && compEl.parentNode === this.contentEl()) {
    this.contentEl().removeChild(component.el());
  }
};

/**
 * Initialize default child components from options
 */
vjs.Component.prototype.initChildren = function(){
  var options = this.options_;

  if (options && options['children']) {
    var self = this;

    // Loop through components and add them to the player
    vjs.obj.each(options['children'], function(name, opts){
      // Allow for disabling default components
      // e.g. vjs.options['children']['posterImage'] = false
      if (opts === false) return;

      // Allow waiting to add components until a specific event is called
      var tempAdd = function(){
        // Set property name on player. Could cause conflicts with other prop names, but it's worth making refs easy.
        self[name] = self.addChild(name, opts);
      };

      if (opts['loadEvent']) {
        // this.one(opts.loadEvent, tempAdd)
      } else {
        tempAdd();
      }
    });
  }
};

vjs.Component.prototype.buildCSSClass = function(){
    // Child classes can include a function that does:
    // return 'CLASS NAME' + this._super();
    return '';
};

/* Events
============================================================================= */

/**
 * Add an event listener to this component's element. Context will be the component.
 * @param  {String}   type Event type e.g. 'click'
 * @param  {Function} fn   Event listener
 * @return {vjs.Component}
 */
vjs.Component.prototype.on = function(type, fn){
  vjs.on(this.el_, type, vjs.bind(this, fn));
  return this;
};

/**
 * Remove an event listener from the component's element
 * @param  {String=}   type Optional event type. Without type it will remove all listeners.
 * @param  {Function=} fn   Optional event listener. Without fn it will remove all listeners for a type.
 * @return {vjs.Component}
 */
vjs.Component.prototype.off = function(type, fn){
  vjs.off(this.el_, type, fn);
  return this;
};

/**
 * Add an event listener to be triggered only once and then removed
 * @param  {String}   type Event type
 * @param  {Function} fn   Event listener
 * @return {vjs.Component}
 */
vjs.Component.prototype.one = function(type, fn) {
  vjs.one(this.el_, type, vjs.bind(this, fn));
  return this;
};

/**
 * Trigger an event on an element
 * @param  {String} type  Event type to trigger
 * @param  {Event|Object} event Event object to be passed to the listener
 * @return {vjs.Component}
 */
vjs.Component.prototype.trigger = function(type, event){
  vjs.trigger(this.el_, type, event);
  return this;
};

/* Ready
================================================================================ */
/**
 * Is the component loaded.
 * @type {Boolean}
 * @private
 */
vjs.Component.prototype.isReady_;

/**
 * Trigger ready as soon as initialization is finished.
 *   Allows for delaying ready. Override on a sub class prototype.
 *   If you set this.isReadyOnInitFinish_ it will affect all components.
 *   Specially used when waiting for the Flash player to asynchrnously load.
 *   @type {Boolean}
 *   @private
 */
vjs.Component.prototype.isReadyOnInitFinish_ = true;

/**
 * List of ready listeners
 * @type {Array}
 * @private
 */
vjs.Component.prototype.readyQueue_;

/**
 * Bind a listener to the component's ready state.
 *   Different from event listeners in that if the ready event has already happend
 *   it will trigger the function immediately.
 * @param  {Function} fn Ready listener
 * @return {vjs.Component}
 */
vjs.Component.prototype.ready = function(fn){
  if (fn) {
    if (this.isReady_) {
      fn.call(this);
    } else {
      if (this.readyQueue_ === undefined) {
        this.readyQueue_ = [];
      }
      this.readyQueue_.push(fn);
    }
  }
  return this;
};

/**
 * Trigger the ready listeners
 * @return {vjs.Component}
 */
vjs.Component.prototype.triggerReady = function(){
  this.isReady_ = true;

  var readyQueue = this.readyQueue_;

  if (readyQueue && readyQueue.length > 0) {

    for (var i = 0, j = readyQueue.length; i < j; i++) {
      readyQueue[i].call(this);
    }

    // Reset Ready Queue
    this.readyQueue_ = [];

    // Allow for using event listeners also, in case you want to do something everytime a source is ready.
    this.trigger('ready');
  }
};

/* Display
============================================================================= */

/**
 * Add a CSS class name to the component's element
 * @param {String} classToAdd Classname to add
 * @return {vjs.Component}
 */
vjs.Component.prototype.addClass = function(classToAdd){
  vjs.addClass(this.el_, classToAdd);
  return this;
};

/**
 * Remove a CSS class name from the component's element
 * @param {String} classToRemove Classname to remove
 * @return {vjs.Component}
 */
vjs.Component.prototype.removeClass = function(classToRemove){
  vjs.removeClass(this.el_, classToRemove);
  return this;
};

/**
 * Show the component element if hidden
 * @return {vjs.Component}
 */
vjs.Component.prototype.show = function(){
  this.el_.style.display = 'block';
  return this;
};

/**
 * Hide the component element if hidden
 * @return {vjs.Component}
 */
vjs.Component.prototype.hide = function(){
  this.el_.style.display = 'none';
  return this;
};

/**
 * Lock an item in its visible state. To be used with fadeIn/fadeOut.
 * @return {vjs.Component}
 */
vjs.Component.prototype.lockShowing = function(){
  this.addClass('vjs-lock-showing');
  return this;
};

/**
 * Unlock an item to be hidden. To be used with fadeIn/fadeOut.
 * @return {vjs.Component}
 */
vjs.Component.prototype.unlockShowing = function(){
  this.removeClass('vjs-lock-showing');
  return this;
};

/**
 * Disable component by making it unshowable
 */
vjs.Component.prototype.disable = function(){
  this.hide();
  this.show = function(){};
};

/**
 * If a value is provided it will change the width of the player to that value
 * otherwise the width is returned
 * http://dev.w3.org/html5/spec/dimension-attributes.html#attr-dim-height
 * Video tag width/height only work in pixels. No percents.
 * But allowing limited percents use. e.g. width() will return number+%, not computed width
 * @param  {Number|String=} num   Optional width number
 * @param  {[type]} skipListeners Skip the 'resize' event trigger
 * @return {vjs.Component|Number|String} Returns 'this' if dimension was set.
 *   Otherwise it returns the dimension.
 */
vjs.Component.prototype.width = function(num, skipListeners){
  return this.dimension('width', num, skipListeners);
};

/**
 * Get or set the height of the player
 * @param  {Number|String=} num     Optional new player height
 * @param  {Boolean=} skipListeners Optional skip resize event trigger
 * @return {vjs.Component|Number|String} The player, or the dimension
 */
vjs.Component.prototype.height = function(num, skipListeners){
  return this.dimension('height', num, skipListeners);
};

/**
 * Set both width and height at the same time.
 * @param  {Number|String} width
 * @param  {Number|String} height
 * @return {vjs.Component}   The player.
 */
vjs.Component.prototype.dimensions = function(width, height){
  // Skip resize listeners on width for optimization
  return this.width(width, true).height(height);
};

/**
 * Get or set width or height.
 * All for an integer, integer + 'px' or integer + '%';
 * Known issue: hidden elements. Hidden elements officially have a width of 0.
 * So we're defaulting to the style.width value and falling back to computedStyle
 * which has the hidden element issue.
 * Info, but probably not an efficient fix:
 * http://www.foliotek.com/devblog/getting-the-width-of-a-hidden-element-with-jquery-using-width/
 * @param  {String=} widthOrHeight 'width' or 'height'
 * @param  {Number|String=} num           New dimension
 * @param  {Boolean=} skipListeners Skip resize event trigger
 * @return {vjs.Component|Number|String} Return the player if setting a dimension.
 *                                         Otherwise it returns the dimension.
 */
vjs.Component.prototype.dimension = function(widthOrHeight, num, skipListeners){
  if (num !== undefined) {

    // Check if using css width/height (% or px) and adjust
    if ((''+num).indexOf('%') !== -1 || (''+num).indexOf('px') !== -1) {
      this.el_.style[widthOrHeight] = num;
    } else if (num === 'auto') {
      this.el_.style[widthOrHeight] = '';
    } else {
      this.el_.style[widthOrHeight] = num+'px';
    }

    // skipListeners allows us to avoid triggering the resize event when setting both width and height
    if (!skipListeners) { this.trigger('resize'); }

    // Return component
    return this;
  }

  // Not setting a value, so getting it
  // Make sure element exists
  if (!this.el_) return 0;

  // Get dimension value from style
  var val = this.el_.style[widthOrHeight];
  var pxIndex = val.indexOf('px');
  if (pxIndex !== -1) {
    // Return the pixel value with no 'px'
    return parseInt(val.slice(0,pxIndex), 10);

  // No px so using % or no style was set, so falling back to offsetWidth/height
  // If component has display:none, offset will return 0
  // TODO: handle display:none and no dimension style using px
  } else {

    return parseInt(this.el_['offset'+vjs.capitalize(widthOrHeight)], 10);

    // ComputedStyle version.
    // Only difference is if the element is hidden it will return
    // the percent value (e.g. '100%'')
    // instead of zero like offsetWidth returns.
    // var val = vjs.getComputedStyleValue(this.el_, widthOrHeight);
    // var pxIndex = val.indexOf('px');

    // if (pxIndex !== -1) {
    //   return val.slice(0, pxIndex);
    // } else {
    //   return val;
    // }
  }
};

/**
 * Emit 'tap' events when touch events are supported. We're requireing them to
 * be enabled because otherwise every component would have this extra overhead
 * unnecessarily, on mobile devices where extra overhead is especially bad.
 *
 * This is being implemented so we can support taps on the video element
 * toggling the controls.
 */
vjs.Component.prototype.emitTapEvents = function(){
  var touchStart, touchTime, couldBeTap, noTap;

  // Track the start time so we can determine how long the touch lasted
  touchStart = 0;

  this.on('touchstart', function(event) {
    // Record start time so we can detect a tap vs. "touch and hold"
    touchStart = new Date().getTime();
    // Reset couldBeTap tracking
    couldBeTap = true;
  });

  noTap = function(){
    couldBeTap = false;
  };
  // TODO: Listen to the original target. http://youtu.be/DujfpXOKUp8?t=13m8s
  this.on('touchmove', noTap);
  this.on('touchleave', noTap);
  this.on('touchcancel', noTap);

  // When the touch ends, measure how long it took and trigger the appropriate
  // event
  this.on('touchend', function() {
    // Proceed only if the touchmove/leave/cancel event didn't happen
    if (couldBeTap === true) {
      // Measure how long the touch lasted
      touchTime = new Date().getTime() - touchStart;
      // The touch needs to be quick in order to consider it a tap
      if (touchTime < 250) {
        this.trigger('tap');
        // It may be good to copy the touchend event object and change the
        // type to tap, if the other event properties aren't exact after
        // vjs.fixEvent runs (e.g. event.target)
      }
    }
  });
};
/* Button - Base class for all buttons
================================================================================ */
/**
 * Base class for all buttons
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.Button = vjs.Component.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Component.call(this, player, options);

    var touchstart = false;
    this.on('touchstart', function(event) {
      // Stop click and other mouse events from triggering also
      event.preventDefault();
      touchstart = true;
    });
    this.on('touchmove', function() {
      touchstart = false;
    });
    var self = this;
    this.on('touchend', function(event) {
      if (touchstart) {
        self.onClick(event);
      }
      event.preventDefault();
    });

    this.on('click', this.onClick);
    this.on('focus', this.onFocus);
    this.on('blur', this.onBlur);
  }
});

vjs.Button.prototype.createEl = function(type, props){
  // Add standard Aria and Tabindex info
  props = vjs.obj.merge({
    className: this.buildCSSClass(),
    innerHTML: '<div class="vjs-control-content"><span class="vjs-control-text">' + (this.buttonText || 'Need Text') + '</span></div>',
    role: 'button',
    'aria-live': 'polite', // let the screen reader user know that the text of the button may change
    tabIndex: 0
  }, props);

  return vjs.Component.prototype.createEl.call(this, type, props);
};

vjs.Button.prototype.buildCSSClass = function(){
  // TODO: Change vjs-control to vjs-button?
  return 'vjs-control ' + vjs.Component.prototype.buildCSSClass.call(this);
};

  // Click - Override with specific functionality for button
vjs.Button.prototype.onClick = function(){};

  // Focus - Add keyboard functionality to element
vjs.Button.prototype.onFocus = function(){
  vjs.on(document, 'keyup', vjs.bind(this, this.onKeyPress));
};

  // KeyPress (document level) - Trigger click when keys are pressed
vjs.Button.prototype.onKeyPress = function(event){
  // Check for space bar (32) or enter (13) keys
  if (event.which == 32 || event.which == 13) {
    event.preventDefault();
    this.onClick();
  }
};

// Blur - Remove keyboard triggers
vjs.Button.prototype.onBlur = function(){
  vjs.off(document, 'keyup', vjs.bind(this, this.onKeyPress));
};
/* Slider
================================================================================ */
/**
 * Parent for seek bar and volume slider
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.Slider = vjs.Component.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Component.call(this, player, options);

    // Set property names to bar and handle to match with the child Slider class is looking for
    this.bar = this.getChild(this.options_['barName']);
    this.handle = this.getChild(this.options_['handleName']);

    player.on(this.playerEvent, vjs.bind(this, this.update));

    this.on('mousedown', this.onMouseDown);
    this.on('touchstart', this.onMouseDown);
    this.on('focus', this.onFocus);
    this.on('blur', this.onBlur);
    this.on('click', this.onClick);

    this.player_.on('controlsvisible', vjs.bind(this, this.update));

    // This is actually to fix the volume handle position. http://twitter.com/#!/gerritvanaaken/status/159046254519787520
    // this.player_.one('timeupdate', vjs.bind(this, this.update));

    player.ready(vjs.bind(this, this.update));

    this.boundEvents = {};
  }
});

vjs.Slider.prototype.createEl = function(type, props) {
  props = props || {};
  // Add the slider element class to all sub classes
  props.className = props.className + ' vjs-slider';
  props = vjs.obj.merge({
    role: 'slider',
    'aria-valuenow': 0,
    'aria-valuemin': 0,
    'aria-valuemax': 100,
    tabIndex: 0
  }, props);

  return vjs.Component.prototype.createEl.call(this, type, props);
};

vjs.Slider.prototype.onMouseDown = function(event){
  event.preventDefault();
  vjs.blockTextSelection();

  this.boundEvents.move = vjs.bind(this, this.onMouseMove);
  this.boundEvents.end = vjs.bind(this, this.onMouseUp);

  vjs.on(document, 'mousemove', this.boundEvents.move);
  vjs.on(document, 'mouseup', this.boundEvents.end);
  vjs.on(document, 'touchmove', this.boundEvents.move);
  vjs.on(document, 'touchend', this.boundEvents.end);

  this.onMouseMove(event);
};

vjs.Slider.prototype.onMouseUp = function() {
  vjs.unblockTextSelection();
  vjs.off(document, 'mousemove', this.boundEvents.move, false);
  vjs.off(document, 'mouseup', this.boundEvents.end, false);
  vjs.off(document, 'touchmove', this.boundEvents.move, false);
  vjs.off(document, 'touchend', this.boundEvents.end, false);

  this.update();
};

vjs.Slider.prototype.update = function(){
  // In VolumeBar init we have a setTimeout for update that pops and update to the end of the
  // execution stack. The player is destroyed before then update will cause an error
  if (!this.el_) return;

  // If scrubbing, we could use a cached value to make the handle keep up with the user's mouse.
  // On HTML5 browsers scrubbing is really smooth, but some flash players are slow, so we might want to utilize this later.
  // var progress =  (this.player_.scrubbing) ? this.player_.getCache().currentTime / this.player_.duration() : this.player_.currentTime() / this.player_.duration();

  var barProgress,
      progress = this.getPercent(),
      handle = this.handle,
      bar = this.bar;

  // Protect against no duration and other division issues
  if (isNaN(progress)) { progress = 0; }

  barProgress = progress;

  // If there is a handle, we need to account for the handle in our calculation for progress bar
  // so that it doesn't fall short of or extend past the handle.
  if (handle) {

    var box = this.el_,
        boxWidth = box.offsetWidth,

        handleWidth = handle.el().offsetWidth,

        // The width of the handle in percent of the containing box
        // In IE, widths may not be ready yet causing NaN
        handlePercent = (handleWidth) ? handleWidth / boxWidth : 0,

        // Get the adjusted size of the box, considering that the handle's center never touches the left or right side.
        // There is a margin of half the handle's width on both sides.
        boxAdjustedPercent = 1 - handlePercent,

        // Adjust the progress that we'll use to set widths to the new adjusted box width
        adjustedProgress = progress * boxAdjustedPercent;

    // The bar does reach the left side, so we need to account for this in the bar's width
    barProgress = adjustedProgress + (handlePercent / 2);

    // Move the handle from the left based on the adjected progress
    handle.el().style.left = vjs.round(adjustedProgress * 100, 2) + '%';
  }

  // Set the new bar width
  bar.el().style.width = vjs.round(barProgress * 100, 2) + '%';
};

vjs.Slider.prototype.calculateDistance = function(event){
  var el, box, boxX, boxY, boxW, boxH, handle, pageX, pageY;

  el = this.el_;
  box = vjs.findPosition(el);
  boxW = boxH = el.offsetWidth;
  handle = this.handle;

  if (this.options_.vertical) {
    boxY = box.top;

    if (event.changedTouches) {
      pageY = event.changedTouches[0].pageY;
    } else {
      pageY = event.pageY;
    }

    if (handle) {
      var handleH = handle.el().offsetHeight;
      // Adjusted X and Width, so handle doesn't go outside the bar
      boxY = boxY + (handleH / 2);
      boxH = boxH - handleH;
    }

    // Percent that the click is through the adjusted area
    return Math.max(0, Math.min(1, ((boxY - pageY) + boxH) / boxH));

  } else {
    boxX = box.left;

    if (event.changedTouches) {
      pageX = event.changedTouches[0].pageX;
    } else {
      pageX = event.pageX;
    }

    if (handle) {
      var handleW = handle.el().offsetWidth;

      // Adjusted X and Width, so handle doesn't go outside the bar
      boxX = boxX + (handleW / 2);
      boxW = boxW - handleW;
    }

    // Percent that the click is through the adjusted area
    return Math.max(0, Math.min(1, (pageX - boxX) / boxW));
  }
};

vjs.Slider.prototype.onFocus = function(){
  vjs.on(document, 'keyup', vjs.bind(this, this.onKeyPress));
};

vjs.Slider.prototype.onKeyPress = function(event){
  if (event.which == 37) { // Left Arrow
    event.preventDefault();
    this.stepBack();
  } else if (event.which == 39) { // Right Arrow
    event.preventDefault();
    this.stepForward();
  }
};

vjs.Slider.prototype.onBlur = function(){
  vjs.off(document, 'keyup', vjs.bind(this, this.onKeyPress));
};

/**
 * Listener for click events on slider, used to prevent clicks
 *   from bubbling up to parent elements like button menus.
 * @param  {Object} event Event object
 */
vjs.Slider.prototype.onClick = function(event){
  event.stopImmediatePropagation();
  event.preventDefault();
};

/**
 * SeekBar Behavior includes play progress bar, and seek handle
 * Needed so it can determine seek position based on handle position/size
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.SliderHandle = vjs.Component.extend();

/**
 * Default value of the slider
 * @type {Number}
 */
vjs.SliderHandle.prototype.defaultValue = 0;

/** @inheritDoc */
vjs.SliderHandle.prototype.createEl = function(type, props) {
  props = props || {};
  // Add the slider element class to all sub classes
  props.className = props.className + ' vjs-slider-handle';
  props = vjs.obj.merge({
    innerHTML: '<span class="vjs-control-text">'+this.defaultValue+'</span>'
  }, props);

  return vjs.Component.prototype.createEl.call(this, 'div', props);
};
/* Menu
================================================================================ */
/**
 * The base for text track and settings menu buttons.
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.Menu = vjs.Component.extend();

/**
 * Add a menu item to the menu
 * @param {Object|String} component Component or component type to add
 */
vjs.Menu.prototype.addItem = function(component){
  this.addChild(component);
  component.on('click', vjs.bind(this, function(){
    this.unlockShowing();
  }));
};

/** @inheritDoc */
vjs.Menu.prototype.createEl = function(){
  var contentElType = this.options().contentElType || 'ul';
  this.contentEl_ = vjs.createEl(contentElType, {
    className: 'vjs-menu-content'
  });
  var el = vjs.Component.prototype.createEl.call(this, 'div', {
    append: this.contentEl_,
    className: 'vjs-menu'
  });
  el.appendChild(this.contentEl_);

  // Prevent clicks from bubbling up. Needed for Menu Buttons,
  // where a click on the parent is significant
  vjs.on(el, 'click', function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
  });

  return el;
};

/**
 * Menu item
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.MenuItem = vjs.Button.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Button.call(this, player, options);
    this.selected(options['selected']);
  }
});

/** @inheritDoc */
vjs.MenuItem.prototype.createEl = function(type, props){
  return vjs.Button.prototype.createEl.call(this, 'li', vjs.obj.merge({
    className: 'vjs-menu-item',
    innerHTML: this.options_['label']
  }, props));
};

/** @inheritDoc */
vjs.MenuItem.prototype.onClick = function(){
  this.selected(true);
};

/**
 * Set this menu item as selected or not
 * @param  {Boolean} selected
 */
vjs.MenuItem.prototype.selected = function(selected){
  if (selected) {
    this.addClass('vjs-selected');
    this.el_.setAttribute('aria-selected',true);
  } else {
    this.removeClass('vjs-selected');
    this.el_.setAttribute('aria-selected',false);
  }
};


/**
 * A button class with a popup menu
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.MenuButton = vjs.Button.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Button.call(this, player, options);

    this.menu = this.createMenu();

    // Add list to element
    this.addChild(this.menu);

    // Automatically hide empty menu buttons
    if (this.items && this.items.length === 0) {
      this.hide();
    }

    this.on('keyup', this.onKeyPress);
    this.el_.setAttribute('aria-haspopup', true);
    this.el_.setAttribute('role', 'button');
  }
});

/**
 * Track the state of the menu button
 * @type {Boolean}
 */
vjs.MenuButton.prototype.buttonPressed_ = false;

vjs.MenuButton.prototype.createMenu = function(){
  var menu = new vjs.Menu(this.player_);

  // Add a title list item to the top
  if (this.options().title) {
    menu.el().appendChild(vjs.createEl('li', {
      className: 'vjs-menu-title',
      innerHTML: vjs.capitalize(this.kind_),
      tabindex: -1
    }));
  }

  this.items = this['createItems']();

  if (this.items) {
    // Add menu items to the menu
    for (var i = 0; i < this.items.length; i++) {
      menu.addItem(this.items[i]);
    }
  }

  return menu;
};

/**
 * Create the list of menu items. Specific to each subclass.
 */
vjs.MenuButton.prototype.createItems = function(){};

/** @inheritDoc */
vjs.MenuButton.prototype.buildCSSClass = function(){
  return this.className + ' vjs-menu-button ' + vjs.Button.prototype.buildCSSClass.call(this);
};

// Focus - Add keyboard functionality to element
// This function is not needed anymore. Instead, the keyboard functionality is handled by
// treating the button as triggering a submenu. When the button is pressed, the submenu
// appears. Pressing the button again makes the submenu disappear.
vjs.MenuButton.prototype.onFocus = function(){};
// Can't turn off list display that we turned on with focus, because list would go away.
vjs.MenuButton.prototype.onBlur = function(){};

vjs.MenuButton.prototype.onClick = function(){
  // When you click the button it adds focus, which will show the menu indefinitely.
  // So we'll remove focus when the mouse leaves the button.
  // Focus is needed for tab navigation.
  this.one('mouseout', vjs.bind(this, function(){
    this.menu.unlockShowing();
    this.el_.blur();
  }));
  if (this.buttonPressed_){
    this.unpressButton();
  } else {
    this.pressButton();
  }
};

vjs.MenuButton.prototype.onKeyPress = function(event){
  event.preventDefault();

  // Check for space bar (32) or enter (13) keys
  if (event.which == 32 || event.which == 13) {
    if (this.buttonPressed_){
      this.unpressButton();
    } else {
      this.pressButton();
    }
  // Check for escape (27) key
  } else if (event.which == 27){
    if (this.buttonPressed_){
      this.unpressButton();
    }
  }
};

vjs.MenuButton.prototype.pressButton = function(){
  this.buttonPressed_ = true;
  this.menu.lockShowing();
  this.el_.setAttribute('aria-pressed', true);
  if (this.items && this.items.length > 0) {
    this.items[0].el().focus(); // set the focus to the title of the submenu
  }
};

vjs.MenuButton.prototype.unpressButton = function(){
  this.buttonPressed_ = false;
  this.menu.unlockShowing();
  this.el_.setAttribute('aria-pressed', false);
};

/**
 * Main player class. A player instance is returned by _V_(id);
 * @param {Element} tag        The original video tag used for configuring options
 * @param {Object=} options    Player options
 * @param {Function=} ready    Ready callback function
 * @constructor
 */
vjs.Player = vjs.Component.extend({
  /** @constructor */
  init: function(tag, options, ready){
    this.tag = tag; // Store the original tag used to set options

    // Set Options
    // The options argument overrides options set in the video tag
    // which overrides globally set options.
    // This latter part coincides with the load order
    // (tag must exist before Player)
    options = vjs.obj.merge(this.getTagSettings(tag), options);

    // Cache for video property values.
    this.cache_ = {};

    // Set poster
    this.poster_ = options['poster'];
    // Set controls
    this.controls_ = options['controls'];
    // Original tag settings stored in options
    // now remove immediately so native controls don't flash.
    // May be turned back on by HTML5 tech if nativeControlsForTouch is true
    tag.controls = false;

    // Run base component initializing with new options.
    // Builds the element through createEl()
    // Inits and embeds any child components in opts
    vjs.Component.call(this, this, options, ready);

    // Update controls className. Can't do this when the controls are initially
    // set because the element doesn't exist yet.
    if (this.controls()) {
      this.addClass('vjs-controls-enabled');
    } else {
      this.addClass('vjs-controls-disabled');
    }

    // TODO: Make this smarter. Toggle user state between touching/mousing
    // using events, since devices can have both touch and mouse events.
    // if (vjs.TOUCH_ENABLED) {
    //   this.addClass('vjs-touch-enabled');
    // }

    // Firstplay event implimentation. Not sold on the event yet.
    // Could probably just check currentTime==0?
    this.one('play', function(e){
      var fpEvent = { type: 'firstplay', target: this.el_ };
      // Using vjs.trigger so we can check if default was prevented
      var keepGoing = vjs.trigger(this.el_, fpEvent);

      if (!keepGoing) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    });

    this.on('ended', this.onEnded);
    this.on('play', this.onPlay);
    this.on('firstplay', this.onFirstPlay);
    this.on('pause', this.onPause);
    this.on('progress', this.onProgress);
    this.on('durationchange', this.onDurationChange);
    this.on('error', this.onError);
    this.on('fullscreenchange', this.onFullscreenChange);

    // Make player easily findable by ID
    vjs.players[this.id_] = this;

    if (options['plugins']) {
      vjs.obj.each(options['plugins'], function(key, val){
        this[key](val);
      }, this);
    }

    this.listenForUserActivity();
  }
});

/**
 * Player instance options, surfaced using vjs.options
 * vjs.options = vjs.Player.prototype.options_
 * Make changes in vjs.options, not here.
 * All options should use string keys so they avoid
 * renaming by closure compiler
 * @type {Object}
 * @private
 */
vjs.Player.prototype.options_ = vjs.options;

vjs.Player.prototype.dispose = function(){
  this.trigger('dispose');
  // prevent dispose from being called twice
  this.off('dispose');

  // Kill reference to this player
  vjs.players[this.id_] = null;
  if (this.tag && this.tag['player']) { this.tag['player'] = null; }
  if (this.el_ && this.el_['player']) { this.el_['player'] = null; }

  // Ensure that tracking progress and time progress will stop and plater deleted
  this.stopTrackingProgress();
  this.stopTrackingCurrentTime();

  if (this.tech) { this.tech.dispose(); }

  // Component dispose
  vjs.Component.prototype.dispose.call(this);
};

vjs.Player.prototype.getTagSettings = function(tag){
  var options = {
    'sources': [],
    'tracks': []
  };

  vjs.obj.merge(options, vjs.getAttributeValues(tag));

  // Get tag children settings
  if (tag.hasChildNodes()) {
    var children, child, childName, i, j;

    children = tag.childNodes;

    for (i=0,j=children.length; i<j; i++) {
      child = children[i];
      // Change case needed: http://ejohn.org/blog/nodename-case-sensitivity/
      childName = child.nodeName.toLowerCase();
      if (childName === 'source') {
        options['sources'].push(vjs.getAttributeValues(child));
      } else if (childName === 'track') {
        options['tracks'].push(vjs.getAttributeValues(child));
      }
    }
  }

  return options;
};

vjs.Player.prototype.createEl = function(){
  var el = this.el_ = vjs.Component.prototype.createEl.call(this, 'div');
  var tag = this.tag;

  // Remove width/height attrs from tag so CSS can make it 100% width/height
  tag.removeAttribute('width');
  tag.removeAttribute('height');
  // Empty video tag sources and tracks so the built-in player doesn't use them also.
  // This may not be fast enough to stop HTML5 browsers from reading the tags
  // so we'll need to turn off any default tracks if we're manually doing
  // captions and subtitles. videoElement.textTracks
  if (tag.hasChildNodes()) {
    var nodes, nodesLength, i, node, nodeName, removeNodes;

    nodes = tag.childNodes;
    nodesLength = nodes.length;
    removeNodes = [];

    while (nodesLength--) {
      node = nodes[nodesLength];
      nodeName = node.nodeName.toLowerCase();
      if (nodeName === 'source' || nodeName === 'track') {
        removeNodes.push(node);
      }
    }

    for (i=0; i<removeNodes.length; i++) {
      tag.removeChild(removeNodes[i]);
    }
  }

  // Make sure tag ID exists
  tag.id = tag.id || 'vjs_video_' + vjs.guid++;

  // Give video tag ID and class to player div
  // ID will now reference player box, not the video tag
  el.id = tag.id;
  el.className = tag.className;

  // Update tag id/class for use as HTML5 playback tech
  // Might think we should do this after embedding in container so .vjs-tech class
  // doesn't flash 100% width/height, but class only applies with .video-js parent
  tag.id += '_html5_api';
  tag.className = 'vjs-tech';

  // Make player findable on elements
  tag['player'] = el['player'] = this;
  // Default state of video is paused
  this.addClass('vjs-paused');

  // Make box use width/height of tag, or rely on default implementation
  // Enforce with CSS since width/height attrs don't work on divs
  this.width(this.options_['width'], true); // (true) Skip resize listener on load
  this.height(this.options_['height'], true);

  // Wrap video tag in div (el/box) container
  if (tag.parentNode) {
    tag.parentNode.insertBefore(el, tag);
  }
  vjs.insertFirst(tag, el); // Breaks iPhone, fixed in HTML5 setup.

  return el;
};

// /* Media Technology (tech)
// ================================================================================ */
// Load/Create an instance of playback technlogy including element and API methods
// And append playback element in player div.
vjs.Player.prototype.loadTech = function(techName, source){

  // Pause and remove current playback technology
  if (this.tech) {
    this.unloadTech();

  // If the first time loading, HTML5 tag will exist but won't be initialized
  // So we need to remove it if we're not loading HTML5
  } else if (techName !== 'Html5' && this.tag) {
    this.el_.removeChild(this.tag);
    this.tag['player'] = null;
    this.tag = null;
  }

  this.techName = techName;

  // Turn off API access because we're loading a new tech that might load asynchronously
  this.isReady_ = false;

  var techReady = function(){
    this.player_.triggerReady();

    // Manually track progress in cases where the browser/flash player doesn't report it.
    if (!this.features['progressEvents']) {
      this.player_.manualProgressOn();
    }

    // Manually track timeudpates in cases where the browser/flash player doesn't report it.
    if (!this.features['timeupdateEvents']) {
      this.player_.manualTimeUpdatesOn();
    }
  };

  // Grab tech-specific options from player options and add source and parent element to use.
  var techOptions = vjs.obj.merge({ 'source': source, 'parentEl': this.el_ }, this.options_[techName.toLowerCase()]);

  if (source) {
    if (source.src == this.cache_.src && this.cache_.currentTime > 0) {
      techOptions['startTime'] = this.cache_.currentTime;
    }

    this.cache_.src = source.src;
  }

  // Initialize tech instance
  this.tech = new window['videojs'][techName](this, techOptions);

  this.tech.ready(techReady);
};

vjs.Player.prototype.unloadTech = function(){
  this.isReady_ = false;
  this.tech.dispose();

  // Turn off any manual progress or timeupdate tracking
  if (this.manualProgress) { this.manualProgressOff(); }

  if (this.manualTimeUpdates) { this.manualTimeUpdatesOff(); }

  this.tech = false;
};

// There's many issues around changing the size of a Flash (or other plugin) object.
// First is a plugin reload issue in Firefox that has been around for 11 years: https://bugzilla.mozilla.org/show_bug.cgi?id=90268
// Then with the new fullscreen API, Mozilla and webkit browsers will reload the flash object after going to fullscreen.
// To get around this, we're unloading the tech, caching source and currentTime values, and reloading the tech once the plugin is resized.
// reloadTech: function(betweenFn){
//   vjs.log('unloadingTech')
//   this.unloadTech();
//   vjs.log('unloadedTech')
//   if (betweenFn) { betweenFn.call(); }
//   vjs.log('LoadingTech')
//   this.loadTech(this.techName, { src: this.cache_.src })
//   vjs.log('loadedTech')
// },

/* Fallbacks for unsupported event types
================================================================================ */
// Manually trigger progress events based on changes to the buffered amount
// Many flash players and older HTML5 browsers don't send progress or progress-like events
vjs.Player.prototype.manualProgressOn = function(){
  this.manualProgress = true;

  // Trigger progress watching when a source begins loading
  this.trackProgress();

  // Watch for a native progress event call on the tech element
  // In HTML5, some older versions don't support the progress event
  // So we're assuming they don't, and turning off manual progress if they do.
  // As opposed to doing user agent detection
  this.tech.one('progress', function(){

    // Update known progress support for this playback technology
    this.features['progressEvents'] = true;

    // Turn off manual progress tracking
    this.player_.manualProgressOff();
  });
};

vjs.Player.prototype.manualProgressOff = function(){
  this.manualProgress = false;
  this.stopTrackingProgress();
};

vjs.Player.prototype.trackProgress = function(){

  this.progressInterval = setInterval(vjs.bind(this, function(){
    // Don't trigger unless buffered amount is greater than last time
    // log(this.cache_.bufferEnd, this.buffered().end(0), this.duration())
    /* TODO: update for multiple buffered regions */
    if (this.cache_.bufferEnd < this.buffered().end(0)) {
      this.trigger('progress');
    } else if (this.bufferedPercent() == 1) {
      this.stopTrackingProgress();
      this.trigger('progress'); // Last update
    }
  }), 500);
};
vjs.Player.prototype.stopTrackingProgress = function(){ clearInterval(this.progressInterval); };

/* Time Tracking -------------------------------------------------------------- */
vjs.Player.prototype.manualTimeUpdatesOn = function(){
  this.manualTimeUpdates = true;

  this.on('play', this.trackCurrentTime);
  this.on('pause', this.stopTrackingCurrentTime);
  // timeupdate is also called by .currentTime whenever current time is set

  // Watch for native timeupdate event
  this.tech.one('timeupdate', function(){
    // Update known progress support for this playback technology
    this.features['timeupdateEvents'] = true;
    // Turn off manual progress tracking
    this.player_.manualTimeUpdatesOff();
  });
};

vjs.Player.prototype.manualTimeUpdatesOff = function(){
  this.manualTimeUpdates = false;
  this.stopTrackingCurrentTime();
  this.off('play', this.trackCurrentTime);
  this.off('pause', this.stopTrackingCurrentTime);
};

vjs.Player.prototype.trackCurrentTime = function(){
  if (this.currentTimeInterval) { this.stopTrackingCurrentTime(); }
  this.currentTimeInterval = setInterval(vjs.bind(this, function(){
    this.trigger('timeupdate');
  }), 250); // 42 = 24 fps // 250 is what Webkit uses // FF uses 15
};

// Turn off play progress tracking (when paused or dragging)
vjs.Player.prototype.stopTrackingCurrentTime = function(){ clearInterval(this.currentTimeInterval); };

// /* Player event handlers (how the player reacts to certain events)
// ================================================================================ */
vjs.Player.prototype.onEnded = function(){
  if (this.options_['loop']) {
    this.currentTime(0);
    this.play();
  }
};

vjs.Player.prototype.onPlay = function(){
  vjs.removeClass(this.el_, 'vjs-paused');
  vjs.addClass(this.el_, 'vjs-playing');
};

vjs.Player.prototype.onFirstPlay = function(){
    //If the first starttime attribute is specified
    //then we will start at the given offset in seconds
    if(this.options_['starttime']){
      this.currentTime(this.options_['starttime']);
    }

    this.addClass('vjs-has-started');
};

vjs.Player.prototype.onPause = function(){
  vjs.removeClass(this.el_, 'vjs-playing');
  vjs.addClass(this.el_, 'vjs-paused');
};

vjs.Player.prototype.onProgress = function(){
  // Add custom event for when source is finished downloading.
  if (this.bufferedPercent() == 1) {
    this.trigger('loadedalldata');
  }
};

// Update duration with durationchange event
// Allows for cacheing value instead of asking player each time.
vjs.Player.prototype.onDurationChange = function(){
  this.duration(this.techGet('duration'));
};

vjs.Player.prototype.onError = function(e) {
  vjs.log('Video Error', e);
};

vjs.Player.prototype.onFullscreenChange = function() {
  if (this.isFullScreen) {
    this.addClass('vjs-fullscreen');
  } else {
    this.removeClass('vjs-fullscreen');
  }
};

// /* Player API
// ================================================================================ */

/**
 * Object for cached values.
 * @private
 */
vjs.Player.prototype.cache_;

vjs.Player.prototype.getCache = function(){
  return this.cache_;
};

// Pass values to the playback tech
vjs.Player.prototype.techCall = function(method, arg){
  // If it's not ready yet, call method when it is
  if (this.tech && !this.tech.isReady_) {
    this.tech.ready(function(){
      this[method](arg);
    });

  // Otherwise call method now
  } else {
    try {
      this.tech[method](arg);
    } catch(e) {
      vjs.log(e);
      throw e;
    }
  }
};

// Get calls can't wait for the tech, and sometimes don't need to.
vjs.Player.prototype.techGet = function(method){

  if (this.tech && this.tech.isReady_) {

    // Flash likes to die and reload when you hide or reposition it.
    // In these cases the object methods go away and we get errors.
    // When that happens we'll catch the errors and inform tech that it's not ready any more.
    try {
      return this.tech[method]();
    } catch(e) {
      // When building additional tech libs, an expected method may not be defined yet
      if (this.tech[method] === undefined) {
        vjs.log('Video.js: ' + method + ' method not defined for '+this.techName+' playback technology.', e);
      } else {
        // When a method isn't available on the object it throws a TypeError
        if (e.name == 'TypeError') {
          vjs.log('Video.js: ' + method + ' unavailable on '+this.techName+' playback technology element.', e);
          this.tech.isReady_ = false;
        } else {
          vjs.log(e);
        }
      }
      throw e;
    }
  }

  return;
};

/**
 * Start media playback
 * http://dev.w3.org/html5/spec/video.html#dom-media-play
 * We're triggering the 'play' event here instead of relying on the
 * media element to allow using event.preventDefault() to stop
 * play from happening if desired. Usecase: preroll ads.
 */
vjs.Player.prototype.play = function(){
  this.techCall('play');
  return this;
};

// http://dev.w3.org/html5/spec/video.html#dom-media-pause
vjs.Player.prototype.pause = function(){
  this.techCall('pause');
  return this;
};

// http://dev.w3.org/html5/spec/video.html#dom-media-paused
// The initial state of paused should be true (in Safari it's actually false)
vjs.Player.prototype.paused = function(){
  return (this.techGet('paused') === false) ? false : true;
};

// http://dev.w3.org/html5/spec/video.html#dom-media-currenttime
vjs.Player.prototype.currentTime = function(seconds){
  if (seconds !== undefined) {

    // Cache the last set value for smoother scrubbing.
    this.cache_.lastSetCurrentTime = seconds;

    this.techCall('setCurrentTime', seconds);

    // Improve the accuracy of manual timeupdates
    if (this.manualTimeUpdates) { this.trigger('timeupdate'); }

    return this;
  }

  // Cache last currentTime and return
  // Default to 0 seconds
  return this.cache_.currentTime = (this.techGet('currentTime') || 0);
};

// http://dev.w3.org/html5/spec/video.html#dom-media-duration
// Duration should return NaN if not available. ParseFloat will turn false-ish values to NaN.
vjs.Player.prototype.duration = function(seconds){
  if (seconds !== undefined) {

    // Cache the last set value for optimiized scrubbing (esp. Flash)
    this.cache_.duration = parseFloat(seconds);

    return this;
  }

  return this.cache_.duration;
};

// Calculates how much time is left. Not in spec, but useful.
vjs.Player.prototype.remainingTime = function(){
  return this.duration() - this.currentTime();
};

// http://dev.w3.org/html5/spec/video.html#dom-media-buffered
// Buffered returns a timerange object.
// Kind of like an array of portions of the video that have been downloaded.
// So far no browsers return more than one range (portion)
vjs.Player.prototype.buffered = function(){
  var buffered = this.techGet('buffered'),
      start = 0,
      buflast = buffered.length - 1,
      // Default end to 0 and store in values
      end = this.cache_.bufferEnd = this.cache_.bufferEnd || 0;

  if (buffered && buflast >= 0 && buffered.end(buflast) !== end) {
    end = buffered.end(buflast);
    // Storing values allows them be overridden by setBufferedFromProgress
    this.cache_.bufferEnd = end;
  }

  return vjs.createTimeRange(start, end);
};

// Calculates amount of buffer is full. Not in spec but useful.
vjs.Player.prototype.bufferedPercent = function(){
  return (this.duration()) ? this.buffered().end(0) / this.duration() : 0;
};

// http://dev.w3.org/html5/spec/video.html#dom-media-volume
vjs.Player.prototype.volume = function(percentAsDecimal){
  var vol;

  if (percentAsDecimal !== undefined) {
    vol = Math.max(0, Math.min(1, parseFloat(percentAsDecimal))); // Force value to between 0 and 1
    this.cache_.volume = vol;
    this.techCall('setVolume', vol);
    vjs.setLocalStorage('volume', vol);
    return this;
  }

  // Default to 1 when returning current volume.
  vol = parseFloat(this.techGet('volume'));
  return (isNaN(vol)) ? 1 : vol;
};

// http://dev.w3.org/html5/spec/video.html#attr-media-muted
vjs.Player.prototype.muted = function(muted){
  if (muted !== undefined) {
    this.techCall('setMuted', muted);
    return this;
  }
  return this.techGet('muted') || false; // Default to false
};

// Check if current tech can support native fullscreen (e.g. with built in controls lik iOS, so not our flash swf)
vjs.Player.prototype.supportsFullScreen = function(){ return this.techGet('supportsFullScreen') || false; };

// Turn on fullscreen (or window) mode
vjs.Player.prototype.requestFullScreen = function(){
  var requestFullScreen = vjs.support.requestFullScreen;
  this.isFullScreen = true;

  if (requestFullScreen) {
    // the browser supports going fullscreen at the element level so we can
    // take the controls fullscreen as well as the video

    // Trigger fullscreenchange event after change
    // We have to specifically add this each time, and remove
    // when cancelling fullscreen. Otherwise if there's multiple
    // players on a page, they would all be reacting to the same fullscreen
    // events
    vjs.on(document, requestFullScreen.eventName, vjs.bind(this, function(e){
      this.isFullScreen = document[requestFullScreen.isFullScreen];

      // If cancelling fullscreen, remove event listener.
      if (this.isFullScreen === false) {
        vjs.off(document, requestFullScreen.eventName, arguments.callee);
      }

      this.trigger('fullscreenchange');
    }));

    this.el_[requestFullScreen.requestFn]();

  } else if (this.tech.supportsFullScreen()) {
    // we can't take the video.js controls fullscreen but we can go fullscreen
    // with native controls
    this.techCall('enterFullScreen');
  } else {
    // fullscreen isn't supported so we'll just stretch the video element to
    // fill the viewport
    this.enterFullWindow();
    this.trigger('fullscreenchange');
  }

  return this;
};

vjs.Player.prototype.cancelFullScreen = function(){
  var requestFullScreen = vjs.support.requestFullScreen;
  this.isFullScreen = false;

  // Check for browser element fullscreen support
  if (requestFullScreen) {
    document[requestFullScreen.cancelFn]();
  } else if (this.tech.supportsFullScreen()) {
   this.techCall('exitFullScreen');
  } else {
   this.exitFullWindow();
   this.trigger('fullscreenchange');
  }

  return this;
};

// When fullscreen isn't supported we can stretch the video container to as wide as the browser will let us.
vjs.Player.prototype.enterFullWindow = function(){
  this.isFullWindow = true;

  // Storing original doc overflow value to return to when fullscreen is off
  this.docOrigOverflow = document.documentElement.style.overflow;

  // Add listener for esc key to exit fullscreen
  vjs.on(document, 'keydown', vjs.bind(this, this.fullWindowOnEscKey));

  // Hide any scroll bars
  document.documentElement.style.overflow = 'hidden';

  // Apply fullscreen styles
  vjs.addClass(document.body, 'vjs-full-window');

  this.trigger('enterFullWindow');
};
vjs.Player.prototype.fullWindowOnEscKey = function(event){
  if (event.keyCode === 27) {
    if (this.isFullScreen === true) {
      this.cancelFullScreen();
    } else {
      this.exitFullWindow();
    }
  }
};

vjs.Player.prototype.exitFullWindow = function(){
  this.isFullWindow = false;
  vjs.off(document, 'keydown', this.fullWindowOnEscKey);

  // Unhide scroll bars.
  document.documentElement.style.overflow = this.docOrigOverflow;

  // Remove fullscreen styles
  vjs.removeClass(document.body, 'vjs-full-window');

  // Resize the box, controller, and poster to original sizes
  // this.positionAll();
  this.trigger('exitFullWindow');
};

vjs.Player.prototype.selectSource = function(sources){

  // Loop through each playback technology in the options order
  for (var i=0,j=this.options_['techOrder'];i<j.length;i++) {
    var techName = vjs.capitalize(j[i]),
        tech = window['videojs'][techName];

    // Check if the browser supports this technology
    if (tech.isSupported()) {
      // Loop through each source object
      for (var a=0,b=sources;a<b.length;a++) {
        var source = b[a];

        // Check if source can be played with this technology
        if (tech['canPlaySource'](source)) {
          return { source: source, tech: techName };
        }
      }
    }
  }

  return false;
};

// src is a pretty powerful function
// If you pass it an array of source objects, it will find the best source to play and use that object.src
//   If the new source requires a new playback technology, it will switch to that.
// If you pass it an object, it will set the source to object.src
// If you pass it anything else (url string) it will set the video source to that
vjs.Player.prototype.src = function(source){
  // Case: Array of source objects to choose from and pick the best to play
  if (source instanceof Array) {

    var sourceTech = this.selectSource(source),
        techName;

    if (sourceTech) {
        source = sourceTech.source;
        techName = sourceTech.tech;

      // If this technology is already loaded, set source
      if (techName == this.techName) {
        this.src(source); // Passing the source object
      // Otherwise load this technology with chosen source
      } else {
        this.loadTech(techName, source);
      }
    } else {
      this.el_.appendChild(vjs.createEl('p', {
        innerHTML: this.options()['notSupportedMessage']
      }));
    }

  // Case: Source object { src: '', type: '' ... }
  } else if (source instanceof Object) {

    if (window['videojs'][this.techName]['canPlaySource'](source)) {
      this.src(source.src);
    } else {
      // Send through tech loop to check for a compatible technology.
      this.src([source]);
    }

  // Case: URL String (http://myvideo...)
  } else {
    // Cache for getting last set source
    this.cache_.src = source;

    if (!this.isReady_) {
      this.ready(function(){
        this.src(source);
      });
    } else {
      this.techCall('src', source);
      if (this.options_['preload'] == 'auto') {
        this.load();
      }
      if (this.options_['autoplay']) {
        this.play();
      }
    }
  }
  return this;
};

// Begin loading the src data
// http://dev.w3.org/html5/spec/video.html#dom-media-load
vjs.Player.prototype.load = function(){
  this.techCall('load');
  return this;
};

// http://dev.w3.org/html5/spec/video.html#dom-media-currentsrc
vjs.Player.prototype.currentSrc = function(){
  return this.techGet('currentSrc') || this.cache_.src || '';
};

// Attributes/Options
vjs.Player.prototype.preload = function(value){
  if (value !== undefined) {
    this.techCall('setPreload', value);
    this.options_['preload'] = value;
    return this;
  }
  return this.techGet('preload');
};
vjs.Player.prototype.autoplay = function(value){
  if (value !== undefined) {
    this.techCall('setAutoplay', value);
    this.options_['autoplay'] = value;
    return this;
  }
  return this.techGet('autoplay', value);
};
vjs.Player.prototype.loop = function(value){
  if (value !== undefined) {
    this.techCall('setLoop', value);
    this.options_['loop'] = value;
    return this;
  }
  return this.techGet('loop');
};

/**
 * The url of the poster image source.
 * @type {String}
 * @private
 */
vjs.Player.prototype.poster_;

/**
 * Get or set the poster image source url.
 * @param  {String} src Poster image source URL
 * @return {String}    Poster image source URL or null
 */
vjs.Player.prototype.poster = function(src){
  if (src !== undefined) {
    this.poster_ = src;
  }
  return this.poster_;
};

/**
 * Whether or not the controls are showing
 * @type {Boolean}
 * @private
 */
vjs.Player.prototype.controls_;

/**
 * Get or set whether or not the controls are showing.
 * @param  {Boolean} controls Set controls to showing or not
 * @return {Boolean}    Controls are showing
 */
vjs.Player.prototype.controls = function(bool){
  if (bool !== undefined) {
    bool = !!bool; // force boolean
    // Don't trigger a change event unless it actually changed
    if (this.controls_ !== bool) {
      this.controls_ = bool;
      if (bool) {
        this.removeClass('vjs-controls-disabled');
        this.addClass('vjs-controls-enabled');
        this.trigger('controlsenabled');
      } else {
        this.removeClass('vjs-controls-enabled');
        this.addClass('vjs-controls-disabled');
        this.trigger('controlsdisabled');
      }
    }
    return this;
  }
  return this.controls_;
};

vjs.Player.prototype.usingNativeControls_;

/**
 * Toggle native controls on/off. Native controls are the controls built into
 * devices (e.g. default iPhone controls), Flash, or other techs
 * (e.g. Vimeo Controls)
 *
 * **This should only be set by the current tech, because only the tech knows
 * if it can support native controls**
 *
 * @param  {Boolean} bool    True signals that native controls are on
 * @return {vjs.Player}      Returns the player
 */
vjs.Player.prototype.usingNativeControls = function(bool){
  if (bool !== undefined) {
    bool = !!bool; // force boolean
    // Don't trigger a change event unless it actually changed
    if (this.usingNativeControls_ !== bool) {
      this.usingNativeControls_ = bool;
      if (bool) {
        this.addClass('vjs-using-native-controls');
        this.trigger('usingnativecontrols');
      } else {
        this.removeClass('vjs-using-native-controls');
        this.trigger('usingcustomcontrols');
      }
    }
    return this;
  }
  return this.usingNativeControls_;
};

vjs.Player.prototype.error = function(){ return this.techGet('error'); };
vjs.Player.prototype.ended = function(){ return this.techGet('ended'); };
vjs.Player.prototype.seeking = function(){ return this.techGet('seeking'); };

// When the player is first initialized, trigger activity so components
// like the control bar show themselves if needed
vjs.Player.prototype.userActivity_ = true;
vjs.Player.prototype.reportUserActivity = function(event){
  this.userActivity_ = true;
};

vjs.Player.prototype.userActive_ = true;
vjs.Player.prototype.userActive = function(bool){
  if (bool !== undefined) {
    bool = !!bool;
    if (bool !== this.userActive_) {
      this.userActive_ = bool;
      if (bool) {
        // If the user was inactive and is now active we want to reset the
        // inactivity timer
        this.userActivity_ = true;
        this.removeClass('vjs-user-inactive');
        this.addClass('vjs-user-active');
        this.trigger('useractive');
      } else {
        // We're switching the state to inactive manually, so erase any other
        // activity
        this.userActivity_ = false;

        // Chrome/Safari/IE have bugs where when you change the cursor it can
        // trigger a mousemove event. This causes an issue when you're hiding
        // the cursor when the user is inactive, and a mousemove signals user
        // activity. Making it impossible to go into inactive mode. Specifically
        // this happens in fullscreen when we really need to hide the cursor.
        //
        // When this gets resolved in ALL browsers it can be removed
        // https://code.google.com/p/chromium/issues/detail?id=103041
        this.tech.one('mousemove', function(e){
          e.stopPropagation();
          e.preventDefault();
        });
        this.removeClass('vjs-user-active');
        this.addClass('vjs-user-inactive');
        this.trigger('userinactive');
      }
    }
    return this;
  }
  return this.userActive_;
};

vjs.Player.prototype.listenForUserActivity = function(){
  var onMouseActivity, onMouseDown, mouseInProgress, onMouseUp,
      activityCheck, inactivityTimeout;

  onMouseActivity = this.reportUserActivity;

  onMouseDown = function() {
    onMouseActivity();
    // For as long as the they are touching the device or have their mouse down,
    // we consider them active even if they're not moving their finger or mouse.
    // So we want to continue to update that they are active
    clearInterval(mouseInProgress);
    // Setting userActivity=true now and setting the interval to the same time
    // as the activityCheck interval (250) should ensure we never miss the
    // next activityCheck
    mouseInProgress = setInterval(vjs.bind(this, onMouseActivity), 250);
  };

  onMouseUp = function(event) {
    onMouseActivity();
    // Stop the interval that maintains activity if the mouse/touch is down
    clearInterval(mouseInProgress);
  };

  // Any mouse movement will be considered user activity
  this.on('mousedown', onMouseDown);
  this.on('mousemove', onMouseActivity);
  this.on('mouseup', onMouseUp);

  // Listen for keyboard navigation
  // Shouldn't need to use inProgress interval because of key repeat
  this.on('keydown', onMouseActivity);
  this.on('keyup', onMouseActivity);

  // Consider any touch events that bubble up to be activity
  // Certain touches on the tech will be blocked from bubbling because they
  // toggle controls
  this.on('touchstart', onMouseDown);
  this.on('touchmove', onMouseActivity);
  this.on('touchend', onMouseUp);
  this.on('touchcancel', onMouseUp);

  // Run an interval every 250 milliseconds instead of stuffing everything into
  // the mousemove/touchmove function itself, to prevent performance degradation.
  // `this.reportUserActivity` simply sets this.userActivity_ to true, which
  // then gets picked up by this loop
  // http://ejohn.org/blog/learning-from-twitter/
  activityCheck = setInterval(vjs.bind(this, function() {
    // Check to see if mouse/touch activity has happened
    if (this.userActivity_) {
      // Reset the activity tracker
      this.userActivity_ = false;

      // If the user state was inactive, set the state to active
      this.userActive(true);

      // Clear any existing inactivity timeout to start the timer over
      clearTimeout(inactivityTimeout);

      // In X seconds, if no more activity has occurred the user will be
      // considered inactive
      inactivityTimeout = setTimeout(vjs.bind(this, function() {
        // Protect against the case where the inactivityTimeout can trigger just
        // before the next user activity is picked up by the activityCheck loop
        // causing a flicker
        if (!this.userActivity_) {
          this.userActive(false);
        }
      }), 2000);
    }
  }), 250);

  // Clean up the intervals when we kill the player
  this.on('dispose', function(){
    clearInterval(activityCheck);
    clearTimeout(inactivityTimeout);
  });
};

// Methods to add support for
// networkState: function(){ return this.techCall('networkState'); },
// readyState: function(){ return this.techCall('readyState'); },
// seeking: function(){ return this.techCall('seeking'); },
// initialTime: function(){ return this.techCall('initialTime'); },
// startOffsetTime: function(){ return this.techCall('startOffsetTime'); },
// played: function(){ return this.techCall('played'); },
// seekable: function(){ return this.techCall('seekable'); },
// videoTracks: function(){ return this.techCall('videoTracks'); },
// audioTracks: function(){ return this.techCall('audioTracks'); },
// videoWidth: function(){ return this.techCall('videoWidth'); },
// videoHeight: function(){ return this.techCall('videoHeight'); },
// defaultPlaybackRate: function(){ return this.techCall('defaultPlaybackRate'); },
// playbackRate: function(){ return this.techCall('playbackRate'); },
// mediaGroup: function(){ return this.techCall('mediaGroup'); },
// controller: function(){ return this.techCall('controller'); },
// defaultMuted: function(){ return this.techCall('defaultMuted'); }

// TODO
// currentSrcList: the array of sources including other formats and bitrates
// playList: array of source lists in order of playback

// RequestFullscreen API
(function(){
  var prefix, requestFS, div;

  div = document.createElement('div');

  requestFS = {};

  // Current W3C Spec
  // http://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html#api
  // Mozilla Draft: https://wiki.mozilla.org/Gecko:FullScreenAPI#fullscreenchange_event
  // New: https://dvcs.w3.org/hg/fullscreen/raw-file/529a67b8d9f3/Overview.html
  if (div.cancelFullscreen !== undefined) {
    requestFS.requestFn = 'requestFullscreen';
    requestFS.cancelFn = 'exitFullscreen';
    requestFS.eventName = 'fullscreenchange';
    requestFS.isFullScreen = 'fullScreen';

  // Webkit (Chrome/Safari) and Mozilla (Firefox) have working implementations
  // that use prefixes and vary slightly from the new W3C spec. Specifically,
  // using 'exit' instead of 'cancel', and lowercasing the 'S' in Fullscreen.
  // Other browsers don't have any hints of which version they might follow yet,
  // so not going to try to predict by looping through all prefixes.
  } else {

    if (document.mozCancelFullScreen) {
      prefix = 'moz';
      requestFS.isFullScreen = prefix + 'FullScreen';
    } else {
      prefix = 'webkit';
      requestFS.isFullScreen = prefix + 'IsFullScreen';
    }

    if (div[prefix + 'RequestFullScreen']) {
      requestFS.requestFn = prefix + 'RequestFullScreen';
      requestFS.cancelFn = prefix + 'CancelFullScreen';
    }
    requestFS.eventName = prefix + 'fullscreenchange';
  }

  if (document[requestFS.cancelFn]) {
    vjs.support.requestFullScreen = requestFS;
  }

})();


/**
 * Container of main controls
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.ControlBar = vjs.Component.extend();

vjs.ControlBar.prototype.options_ = {
  loadEvent: 'play',
  children: {
    'playToggle': {},
    'currentTimeDisplay': {},
    'timeDivider': {},
    'durationDisplay': {},
    'remainingTimeDisplay': {},
    'progressControl': {},
    'fullscreenToggle': {},
    'volumeControl': {},
    'muteToggle': {}
    // 'volumeMenuButton': {}
  }
};

vjs.ControlBar.prototype.createEl = function(){
  return vjs.createEl('div', {
    className: 'vjs-control-bar'
  });
};
/**
 * Button to toggle between play and pause
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.PlayToggle = vjs.Button.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Button.call(this, player, options);

    player.on('play', vjs.bind(this, this.onPlay));
    player.on('pause', vjs.bind(this, this.onPause));
  }
});

vjs.PlayToggle.prototype.buttonText = 'Play';

vjs.PlayToggle.prototype.buildCSSClass = function(){
  return 'vjs-play-control ' + vjs.Button.prototype.buildCSSClass.call(this);
};

  // OnClick - Toggle between play and pause
vjs.PlayToggle.prototype.onClick = function(){
  if (this.player_.paused()) {
    this.player_.play();
  } else {
    this.player_.pause();
  }
};

  // OnPlay - Add the vjs-playing class to the element so it can change appearance
vjs.PlayToggle.prototype.onPlay = function(){
  vjs.removeClass(this.el_, 'vjs-paused');
  vjs.addClass(this.el_, 'vjs-playing');
  this.el_.children[0].children[0].innerHTML = 'Pause'; // change the button text to "Pause"
};

  // OnPause - Add the vjs-paused class to the element so it can change appearance
vjs.PlayToggle.prototype.onPause = function(){
  vjs.removeClass(this.el_, 'vjs-playing');
  vjs.addClass(this.el_, 'vjs-paused');
  this.el_.children[0].children[0].innerHTML = 'Play'; // change the button text to "Play"
};/**
 * Displays the current time
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.CurrentTimeDisplay = vjs.Component.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Component.call(this, player, options);

    player.on('timeupdate', vjs.bind(this, this.updateContent));
  }
});

vjs.CurrentTimeDisplay.prototype.createEl = function(){
  var el = vjs.Component.prototype.createEl.call(this, 'div', {
    className: 'vjs-current-time vjs-time-controls vjs-control'
  });

  this.content = vjs.createEl('div', {
    className: 'vjs-current-time-display',
    innerHTML: '<span class="vjs-control-text">Current Time </span>' + '0:00', // label the current time for screen reader users
    'aria-live': 'off' // tell screen readers not to automatically read the time as it changes
  });

  el.appendChild(vjs.createEl('div').appendChild(this.content));
  return el;
};

vjs.CurrentTimeDisplay.prototype.updateContent = function(){
  // Allows for smooth scrubbing, when player can't keep up.
  var time = (this.player_.scrubbing) ? this.player_.getCache().currentTime : this.player_.currentTime();
  this.content.innerHTML = '<span class="vjs-control-text">Current Time </span>' + vjs.formatTime(time, this.player_.duration());
};

/**
 * Displays the duration
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.DurationDisplay = vjs.Component.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Component.call(this, player, options);

    player.on('timeupdate', vjs.bind(this, this.updateContent)); // this might need to be changes to 'durationchange' instead of 'timeupdate' eventually, however the durationchange event fires before this.player_.duration() is set, so the value cannot be written out using this method. Once the order of durationchange and this.player_.duration() being set is figured out, this can be updated.
  }
});

vjs.DurationDisplay.prototype.createEl = function(){
  var el = vjs.Component.prototype.createEl.call(this, 'div', {
    className: 'vjs-duration vjs-time-controls vjs-control'
  });

  this.content = vjs.createEl('div', {
    className: 'vjs-duration-display',
    innerHTML: '<span class="vjs-control-text">Duration Time </span>' + '0:00', // label the duration time for screen reader users
    'aria-live': 'off' // tell screen readers not to automatically read the time as it changes
  });

  el.appendChild(vjs.createEl('div').appendChild(this.content));
  return el;
};

vjs.DurationDisplay.prototype.updateContent = function(){
  var duration = this.player_.duration();
  if (duration) {
      this.content.innerHTML = '<span class="vjs-control-text">Duration Time </span>' + vjs.formatTime(duration); // label the duration time for screen reader users
  }
};

/**
 * Time Separator (Not used in main skin, but still available, and could be used as a 'spare element')
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.TimeDivider = vjs.Component.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Component.call(this, player, options);
  }
});

vjs.TimeDivider.prototype.createEl = function(){
  return vjs.Component.prototype.createEl.call(this, 'div', {
    className: 'vjs-time-divider',
    innerHTML: '<div><span>/</span></div>'
  });
};

/**
 * Displays the time left in the video
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.RemainingTimeDisplay = vjs.Component.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Component.call(this, player, options);

    player.on('timeupdate', vjs.bind(this, this.updateContent));
  }
});

vjs.RemainingTimeDisplay.prototype.createEl = function(){
  var el = vjs.Component.prototype.createEl.call(this, 'div', {
    className: 'vjs-remaining-time vjs-time-controls vjs-control'
  });

  this.content = vjs.createEl('div', {
    className: 'vjs-remaining-time-display',
    innerHTML: '<span class="vjs-control-text">Remaining Time </span>' + '-0:00', // label the remaining time for screen reader users
    'aria-live': 'off' // tell screen readers not to automatically read the time as it changes
  });

  el.appendChild(vjs.createEl('div').appendChild(this.content));
  return el;
};

vjs.RemainingTimeDisplay.prototype.updateContent = function(){
  if (this.player_.duration()) {
    this.content.innerHTML = '<span class="vjs-control-text">Remaining Time </span>' + '-'+ vjs.formatTime(this.player_.remainingTime());
  }

  // Allows for smooth scrubbing, when player can't keep up.
  // var time = (this.player_.scrubbing) ? this.player_.getCache().currentTime : this.player_.currentTime();
  // this.content.innerHTML = vjs.formatTime(time, this.player_.duration());
};
/**
 * Toggle fullscreen video
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.FullscreenToggle = vjs.Button.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Button.call(this, player, options);
  }
});

vjs.FullscreenToggle.prototype.buttonText = 'Fullscreen';

vjs.FullscreenToggle.prototype.buildCSSClass = function(){
  return 'vjs-fullscreen-control ' + vjs.Button.prototype.buildCSSClass.call(this);
};

vjs.FullscreenToggle.prototype.onClick = function(){
  if (!this.player_.isFullScreen) {
    this.player_.requestFullScreen();
    this.el_.children[0].children[0].innerHTML = 'Non-Fullscreen'; // change the button text to "Non-Fullscreen"
  } else {
    this.player_.cancelFullScreen();
    this.el_.children[0].children[0].innerHTML = 'Fullscreen'; // change the button to "Fullscreen"
  }
};/**
 * Seek, Load Progress, and Play Progress
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.ProgressControl = vjs.Component.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Component.call(this, player, options);
  }
});

vjs.ProgressControl.prototype.options_ = {
  children: {
    'seekBar': {}
  }
};

vjs.ProgressControl.prototype.createEl = function(){
  return vjs.Component.prototype.createEl.call(this, 'div', {
    className: 'vjs-progress-control vjs-control'
  });
};

/**
 * Seek Bar and holder for the progress bars
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.SeekBar = vjs.Slider.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Slider.call(this, player, options);
    player.on('timeupdate', vjs.bind(this, this.updateARIAAttributes));
    player.ready(vjs.bind(this, this.updateARIAAttributes));
  }
});

vjs.SeekBar.prototype.options_ = {
  children: {
    'loadProgressBar': {},
    'playProgressBar': {},
    'seekHandle': {}
  },
  'barName': 'playProgressBar',
  'handleName': 'seekHandle'
};

vjs.SeekBar.prototype.playerEvent = 'timeupdate';

vjs.SeekBar.prototype.createEl = function(){
  return vjs.Slider.prototype.createEl.call(this, 'div', {
    className: 'vjs-progress-holder',
    'aria-label': 'video progress bar'
  });
};

vjs.SeekBar.prototype.updateARIAAttributes = function(){
    // Allows for smooth scrubbing, when player can't keep up.
    var time = (this.player_.scrubbing) ? this.player_.getCache().currentTime : this.player_.currentTime();
    this.el_.setAttribute('aria-valuenow',vjs.round(this.getPercent()*100, 2)); // machine readable value of progress bar (percentage complete)
    this.el_.setAttribute('aria-valuetext',vjs.formatTime(time, this.player_.duration())); // human readable value of progress bar (time complete)
};

vjs.SeekBar.prototype.getPercent = function(){
  var currentTime;
  // Flash RTMP provider will not report the correct time
  // immediately after a seek. This isn't noticeable if you're
  // seeking while the video is playing, but it is if you seek
  // while the video is paused.
  if (this.player_.techName === 'Flash' && this.player_.seeking()) {
    var cache = this.player_.getCache();
    if (cache.lastSetCurrentTime) {
      currentTime = cache.lastSetCurrentTime;
    }
    else {
      currentTime = this.player_.currentTime();
    }
  }
  else {
    currentTime = this.player_.currentTime();
  }

  return currentTime / this.player_.duration();
};

vjs.SeekBar.prototype.onMouseDown = function(event){
  vjs.Slider.prototype.onMouseDown.call(this, event);

  this.player_.scrubbing = true;

  this.videoWasPlaying = !this.player_.paused();
  this.player_.pause();
};

vjs.SeekBar.prototype.onMouseMove = function(event){
  var newTime = this.calculateDistance(event) * this.player_.duration();

  // Don't let video end while scrubbing.
  if (newTime == this.player_.duration()) { newTime = newTime - 0.1; }

  // Set new time (tell player to seek to new time)
  this.player_.currentTime(newTime);
};

vjs.SeekBar.prototype.onMouseUp = function(event){
  vjs.Slider.prototype.onMouseUp.call(this, event);

  this.player_.scrubbing = false;
  if (this.videoWasPlaying) {
    this.player_.play();
  }
};

vjs.SeekBar.prototype.stepForward = function(){
  this.player_.currentTime(this.player_.currentTime() + 5); // more quickly fast forward for keyboard-only users
};

vjs.SeekBar.prototype.stepBack = function(){
  this.player_.currentTime(this.player_.currentTime() - 5); // more quickly rewind for keyboard-only users
};


/**
 * Shows load progres
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.LoadProgressBar = vjs.Component.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Component.call(this, player, options);
    player.on('progress', vjs.bind(this, this.update));
  }
});

vjs.LoadProgressBar.prototype.createEl = function(){
  return vjs.Component.prototype.createEl.call(this, 'div', {
    className: 'vjs-load-progress',
    innerHTML: '<span class="vjs-control-text">Loaded: 0%</span>'
  });
};

vjs.LoadProgressBar.prototype.update = function(){
  if (this.el_.style) { this.el_.style.width = vjs.round(this.player_.bufferedPercent() * 100, 2) + '%'; }
};


/**
 * Shows play progress
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.PlayProgressBar = vjs.Component.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Component.call(this, player, options);
  }
});

vjs.PlayProgressBar.prototype.createEl = function(){
  return vjs.Component.prototype.createEl.call(this, 'div', {
    className: 'vjs-play-progress',
    innerHTML: '<span class="vjs-control-text">Progress: 0%</span>'
  });
};

/**
 * SeekBar component includes play progress bar, and seek handle
 * Needed so it can determine seek position based on handle position/size
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.SeekHandle = vjs.SliderHandle.extend();

/** @inheritDoc */
vjs.SeekHandle.prototype.defaultValue = '00:00';

/** @inheritDoc */
vjs.SeekHandle.prototype.createEl = function(){
  return vjs.SliderHandle.prototype.createEl.call(this, 'div', {
    className: 'vjs-seek-handle'
  });
};/**
 * Control the volume
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.VolumeControl = vjs.Component.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Component.call(this, player, options);

    // hide volume controls when they're not supported by the current tech
    if (player.tech && player.tech.features && player.tech.features['volumeControl'] === false) {
      this.addClass('vjs-hidden');
    }
    player.on('loadstart', vjs.bind(this, function(){
      if (player.tech.features && player.tech.features['volumeControl'] === false) {
        this.addClass('vjs-hidden');
      } else {
        this.removeClass('vjs-hidden');
      }
    }));
  }
});

vjs.VolumeControl.prototype.options_ = {
  children: {
    'volumeBar': {}
  }
};

vjs.VolumeControl.prototype.createEl = function(){
  return vjs.Component.prototype.createEl.call(this, 'div', {
    className: 'vjs-volume-control vjs-control'
  });
};

/**
 * Contains volume level
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.VolumeBar = vjs.Slider.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Slider.call(this, player, options);
    player.on('volumechange', vjs.bind(this, this.updateARIAAttributes));
    player.ready(vjs.bind(this, this.updateARIAAttributes));
    setTimeout(vjs.bind(this, this.update), 0); // update when elements is in DOM
  }
});

vjs.VolumeBar.prototype.updateARIAAttributes = function(){
  // Current value of volume bar as a percentage
  this.el_.setAttribute('aria-valuenow',vjs.round(this.player_.volume()*100, 2));
  this.el_.setAttribute('aria-valuetext',vjs.round(this.player_.volume()*100, 2)+'%');
};

vjs.VolumeBar.prototype.options_ = {
  children: {
    'volumeLevel': {},
    'volumeHandle': {}
  },
  'barName': 'volumeLevel',
  'handleName': 'volumeHandle'
};

vjs.VolumeBar.prototype.playerEvent = 'volumechange';

vjs.VolumeBar.prototype.createEl = function(){
  return vjs.Slider.prototype.createEl.call(this, 'div', {
    className: 'vjs-volume-bar',
    'aria-label': 'volume level'
  });
};

vjs.VolumeBar.prototype.onMouseMove = function(event) {
  this.player_.volume(this.calculateDistance(event));
};

vjs.VolumeBar.prototype.getPercent = function(){
  if (this.player_.muted()) {
    return 0;
  } else {
    return this.player_.volume();
  }
};

vjs.VolumeBar.prototype.stepForward = function(){
  this.player_.volume(this.player_.volume() + 0.1);
};

vjs.VolumeBar.prototype.stepBack = function(){
  this.player_.volume(this.player_.volume() - 0.1);
};

/**
 * Shows volume level
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.VolumeLevel = vjs.Component.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Component.call(this, player, options);
  }
});

vjs.VolumeLevel.prototype.createEl = function(){
  return vjs.Component.prototype.createEl.call(this, 'div', {
    className: 'vjs-volume-level',
    innerHTML: '<span class="vjs-control-text"></span>'
  });
};

/**
 * Change volume level
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
 vjs.VolumeHandle = vjs.SliderHandle.extend();

 /** @inheritDoc */
 vjs.VolumeHandle.prototype.defaultValue = '00:00';

 /** @inheritDoc */
 vjs.VolumeHandle.prototype.createEl = function(){
   return vjs.SliderHandle.prototype.createEl.call(this, 'div', {
     className: 'vjs-volume-handle'
   });
 };
/**
 * Mute the audio
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.MuteToggle = vjs.Button.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Button.call(this, player, options);

    player.on('volumechange', vjs.bind(this, this.update));

    // hide mute toggle if the current tech doesn't support volume control
    if (player.tech && player.tech.features && player.tech.features['volumeControl'] === false) {
      this.addClass('vjs-hidden');
    }
    player.on('loadstart', vjs.bind(this, function(){
      if (player.tech.features && player.tech.features['volumeControl'] === false) {
        this.addClass('vjs-hidden');
      } else {
        this.removeClass('vjs-hidden');
      }
    }));
  }
});

vjs.MuteToggle.prototype.createEl = function(){
  return vjs.Button.prototype.createEl.call(this, 'div', {
    className: 'vjs-mute-control vjs-control',
    innerHTML: '<div><span class="vjs-control-text">Mute</span></div>'
  });
};

vjs.MuteToggle.prototype.onClick = function(){
  this.player_.muted( this.player_.muted() ? false : true );
};

vjs.MuteToggle.prototype.update = function(){
  var vol = this.player_.volume(),
      level = 3;

  if (vol === 0 || this.player_.muted()) {
    level = 0;
  } else if (vol < 0.33) {
    level = 1;
  } else if (vol < 0.67) {
    level = 2;
  }

  // Don't rewrite the button text if the actual text doesn't change.
  // This causes unnecessary and confusing information for screen reader users.
  // This check is needed because this function gets called every time the volume level is changed.
  if(this.player_.muted()){
      if(this.el_.children[0].children[0].innerHTML!='Unmute'){
          this.el_.children[0].children[0].innerHTML = 'Unmute'; // change the button text to "Unmute"
      }
  } else {
      if(this.el_.children[0].children[0].innerHTML!='Mute'){
          this.el_.children[0].children[0].innerHTML = 'Mute'; // change the button text to "Mute"
      }
  }

  /* TODO improve muted icon classes */
  for (var i = 0; i < 4; i++) {
    vjs.removeClass(this.el_, 'vjs-vol-'+i);
  }
  vjs.addClass(this.el_, 'vjs-vol-'+level);
};
/**
 * Menu button with a popup for showing the volume slider.
 * @constructor
 */
vjs.VolumeMenuButton = vjs.MenuButton.extend({
  /** @constructor */
  init: function(player, options){
    vjs.MenuButton.call(this, player, options);

    // Same listeners as MuteToggle
    player.on('volumechange', vjs.bind(this, this.update));

    // hide mute toggle if the current tech doesn't support volume control
    if (player.tech && player.tech.features && player.tech.features.volumeControl === false) {
      this.addClass('vjs-hidden');
    }
    player.on('loadstart', vjs.bind(this, function(){
      if (player.tech.features && player.tech.features.volumeControl === false) {
        this.addClass('vjs-hidden');
      } else {
        this.removeClass('vjs-hidden');
      }
    }));
    this.addClass('vjs-menu-button');
  }
});

vjs.VolumeMenuButton.prototype.createMenu = function(){
  var menu = new vjs.Menu(this.player_, {
    contentElType: 'div'
  });
  var vc = new vjs.VolumeBar(this.player_, vjs.obj.merge({vertical: true}, this.options_.volumeBar));
  menu.addChild(vc);
  return menu;
};

vjs.VolumeMenuButton.prototype.onClick = function(){
  vjs.MuteToggle.prototype.onClick.call(this);
  vjs.MenuButton.prototype.onClick.call(this);
};

vjs.VolumeMenuButton.prototype.createEl = function(){
  return vjs.Button.prototype.createEl.call(this, 'div', {
    className: 'vjs-volume-menu-button vjs-menu-button vjs-control',
    innerHTML: '<div><span class="vjs-control-text">Mute</span></div>'
  });
};
vjs.VolumeMenuButton.prototype.update = vjs.MuteToggle.prototype.update;
/* Poster Image
================================================================================ */
/**
 * Poster image. Shows before the video plays.
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.PosterImage = vjs.Button.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Button.call(this, player, options);

    if (!player.poster() || !player.controls()) {
      this.hide();
    }

    player.on('play', vjs.bind(this, this.hide));
  }
});

vjs.PosterImage.prototype.createEl = function(){
  var el = vjs.createEl('div', {
        className: 'vjs-poster',

        // Don't want poster to be tabbable.
        tabIndex: -1
      }),
      poster = this.player_.poster();

  if (poster) {
    if ('backgroundSize' in el.style) {
      el.style.backgroundImage = 'url("' + poster + '")';
    } else {
      el.appendChild(vjs.createEl('img', { src: poster }));
    }
  }

  return el;
};

vjs.PosterImage.prototype.onClick = function(){
  // Only accept clicks when controls are enabled
  if (this.player().controls()) {
    this.player_.play();
  }
};
/* Loading Spinner
================================================================================ */
/**
 * Loading spinner for waiting events
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.LoadingSpinner = vjs.Component.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Component.call(this, player, options);

    player.on('canplay', vjs.bind(this, this.hide));
    player.on('canplaythrough', vjs.bind(this, this.hide));
    player.on('playing', vjs.bind(this, this.hide));
    player.on('seeked', vjs.bind(this, this.hide));

    player.on('seeking', vjs.bind(this, this.show));

    // in some browsers seeking does not trigger the 'playing' event,
    // so we also need to trap 'seeked' if we are going to set a
    // 'seeking' event
    player.on('seeked', vjs.bind(this, this.hide));

    player.on('error', vjs.bind(this, this.show));

    // Not showing spinner on stalled any more. Browsers may stall and then not trigger any events that would remove the spinner.
    // Checked in Chrome 16 and Safari 5.1.2. http://help.videojs.com/discussions/problems/883-why-is-the-download-progress-showing
    // player.on('stalled', vjs.bind(this, this.show));

    player.on('waiting', vjs.bind(this, this.show));
  }
});

vjs.LoadingSpinner.prototype.createEl = function(){
  return vjs.Component.prototype.createEl.call(this, 'div', {
    className: 'vjs-loading-spinner'
  });
};
/* Big Play Button
================================================================================ */
/**
 * Initial play button. Shows before the video has played. The hiding of the
 * big play button is done via CSS and player states.
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.BigPlayButton = vjs.Button.extend();

vjs.BigPlayButton.prototype.createEl = function(){
  return vjs.Button.prototype.createEl.call(this, 'div', {
    className: 'vjs-big-play-button',
    innerHTML: '<span></span>',
    'aria-label': 'play video'
  });
};

vjs.BigPlayButton.prototype.onClick = function(){
  this.player_.play();
};
/**
 * @fileoverview Media Technology Controller - Base class for media playback
 * technology controllers like Flash and HTML5
 */

/**
 * Base class for media (HTML5 Video, Flash) controllers
 * @param {vjs.Player|Object} player  Central player instance
 * @param {Object=} options Options object
 * @constructor
 */
vjs.MediaTechController = vjs.Component.extend({
  /** @constructor */
  init: function(player, options, ready){
    vjs.Component.call(this, player, options, ready);

    this.initControlsListeners();
  }
});

/**
 * Set up click and touch listeners for the playback element
 * On desktops, a click on the video itself will toggle playback,
 * on a mobile device a click on the video toggles controls.
 * (toggling controls is done by toggling the user state between active and
 * inactive)
 *
 * A tap can signal that a user has become active, or has become inactive
 * e.g. a quick tap on an iPhone movie should reveal the controls. Another
 * quick tap should hide them again (signaling the user is in an inactive
 * viewing state)
 *
 * In addition to this, we still want the user to be considered inactive after
 * a few seconds of inactivity.
 *
 * Note: the only part of iOS interaction we can't mimic with this setup
 * is a touch and hold on the video element counting as activity in order to
 * keep the controls showing, but that shouldn't be an issue. A touch and hold on
 * any controls will still keep the user active
 */
vjs.MediaTechController.prototype.initControlsListeners = function(){
  var player, tech, activateControls, deactivateControls;

  tech = this;
  player = this.player();

  var activateControls = function(){
    if (player.controls() && !player.usingNativeControls()) {
      tech.addControlsListeners();
    }
  };

  deactivateControls = vjs.bind(tech, tech.removeControlsListeners);

  // Set up event listeners once the tech is ready and has an element to apply
  // listeners to
  this.ready(activateControls);
  player.on('controlsenabled', activateControls);
  player.on('controlsdisabled', deactivateControls);
};

vjs.MediaTechController.prototype.addControlsListeners = function(){
  var preventBubble, userWasActive;

  // Some browsers (Chrome & IE) don't trigger a click on a flash swf, but do
  // trigger mousedown/up.
  // http://stackoverflow.com/questions/1444562/javascript-onclick-event-over-flash-object
  // Any touch events are set to block the mousedown event from happening
  this.on('mousedown', this.onClick);

  // We need to block touch events on the video element from bubbling up,
  // otherwise they'll signal activity prematurely. The specific use case is
  // when the video is playing and the controls have faded out. In this case
  // only a tap (fast touch) should toggle the user active state and turn the
  // controls back on. A touch and move or touch and hold should not trigger
  // the controls (per iOS as an example at least)
  //
  // We always want to stop propagation on touchstart because touchstart
  // at the player level starts the touchInProgress interval. We can still
  // report activity on the other events, but won't let them bubble for
  // consistency. We don't want to bubble a touchend without a touchstart.
  this.on('touchstart', function(event) {
    // Stop the mouse events from also happening
    event.preventDefault();
    event.stopPropagation();
    // Record if the user was active now so we don't have to keep polling it
    userWasActive = this.player_.userActive();
  });

  preventBubble = function(event){
    event.stopPropagation();
    if (userWasActive) {
      this.player_.reportUserActivity();
    }
  };

  // Treat all touch events the same for consistency
  this.on('touchmove', preventBubble);
  this.on('touchleave', preventBubble);
  this.on('touchcancel', preventBubble);
  this.on('touchend', preventBubble);

  // Turn on component tap events
  this.emitTapEvents();

  // The tap listener needs to come after the touchend listener because the tap
  // listener cancels out any reportedUserActivity when setting userActive(false)
  this.on('tap', this.onTap);
};

/**
 * Remove the listeners used for click and tap controls. This is needed for
 * toggling to controls disabled, where a tap/touch should do nothing.
 */
vjs.MediaTechController.prototype.removeControlsListeners = function(){
  // We don't want to just use `this.off()` because there might be other needed
  // listeners added by techs that extend this.
  this.off('tap');
  this.off('touchstart');
  this.off('touchmove');
  this.off('touchleave');
  this.off('touchcancel');
  this.off('touchend');
  this.off('click');
  this.off('mousedown');
};

/**
 * Handle a click on the media element. By default will play/pause the media.
 */
vjs.MediaTechController.prototype.onClick = function(event){
  // We're using mousedown to detect clicks thanks to Flash, but mousedown
  // will also be triggered with right-clicks, so we need to prevent that
  if (event.button !== 0) return;

  // When controls are disabled a click should not toggle playback because
  // the click is considered a control
  if (this.player().controls()) {
    if (this.player().paused()) {
      this.player().play();
    } else {
      this.player().pause();
    }
  }
};

/**
 * Handle a tap on the media element. By default it will toggle the user
 * activity state, which hides and shows the controls.
 */

vjs.MediaTechController.prototype.onTap = function(){
  this.player().userActive(!this.player().userActive());
};

vjs.MediaTechController.prototype.features = {
  'volumeControl': true,

  // Resizing plugins using request fullscreen reloads the plugin
  'fullscreenResize': false,

  // Optional events that we can manually mimic with timers
  // currently not triggered by video-js-swf
  'progressEvents': false,
  'timeupdateEvents': false
};

vjs.media = {};

/**
 * List of default API methods for any MediaTechController
 * @type {String}
 */
vjs.media.ApiMethods = 'play,pause,paused,currentTime,setCurrentTime,duration,buffered,volume,setVolume,muted,setMuted,width,height,supportsFullScreen,enterFullScreen,src,load,currentSrc,preload,setPreload,autoplay,setAutoplay,loop,setLoop,error,networkState,readyState,seeking,initialTime,startOffsetTime,played,seekable,ended,videoTracks,audioTracks,videoWidth,videoHeight,textTracks,defaultPlaybackRate,playbackRate,mediaGroup,controller,controls,defaultMuted'.split(',');
// Create placeholder methods for each that warn when a method isn't supported by the current playback technology

function createMethod(methodName){
  return function(){
    throw new Error('The "'+methodName+'" method is not available on the playback technology\'s API');
  };
}

for (var i = vjs.media.ApiMethods.length - 1; i >= 0; i--) {
  var methodName = vjs.media.ApiMethods[i];
  vjs.MediaTechController.prototype[vjs.media.ApiMethods[i]] = createMethod(methodName);
}
/**
 * @fileoverview HTML5 Media Controller - Wrapper for HTML5 Media API
 */

/**
 * HTML5 Media Controller - Wrapper for HTML5 Media API
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @param {Function=} ready
 * @constructor
 */
vjs.Html5 = vjs.MediaTechController.extend({
  /** @constructor */
  init: function(player, options, ready){
    // volume cannot be changed from 1 on iOS
    this.features['volumeControl'] = vjs.Html5.canControlVolume();

    // In iOS, if you move a video element in the DOM, it breaks video playback.
    this.features['movingMediaElementInDOM'] = !vjs.IS_IOS;

    // HTML video is able to automatically resize when going to fullscreen
    this.features['fullscreenResize'] = true;

    vjs.MediaTechController.call(this, player, options, ready);

    var source = options['source'];

    // If the element source is already set, we may have missed the loadstart event, and want to trigger it.
    // We don't want to set the source again and interrupt playback.
    if (source && this.el_.currentSrc == source.src) {
      player.trigger('loadstart');

    // Otherwise set the source if one was provided.
    } else if (source) {
      this.el_.src = source.src;
    }

    // Determine if native controls should be used
    // Our goal should be to get the custom controls on mobile solid everywhere
    // so we can remove this all together. Right now this will block custom
    // controls on touch enabled laptops like the Chrome Pixel
    if (vjs.TOUCH_ENABLED && player.options()['nativeControlsForTouch'] !== false) {
      this.useNativeControls();
    }

    // Chrome and Safari both have issues with autoplay.
    // In Safari (5.1.1), when we move the video element into the container div, autoplay doesn't work.
    // In Chrome (15), if you have autoplay + a poster + no controls, the video gets hidden (but audio plays)
    // This fixes both issues. Need to wait for API, so it updates displays correctly
    player.ready(function(){
      if (this.tag && this.options_['autoplay'] && this.paused()) {
        delete this.tag['poster']; // Chrome Fix. Fixed in Chrome v16.
        this.play();
      }
    });

    this.setupTriggers();
    this.triggerReady();
  }
});

vjs.Html5.prototype.dispose = function(){
  vjs.MediaTechController.prototype.dispose.call(this);
};

vjs.Html5.prototype.createEl = function(){
  var player = this.player_,
      // If possible, reuse original tag for HTML5 playback technology element
      el = player.tag,
      newEl;

  // Check if this browser supports moving the element into the box.
  // On the iPhone video will break if you move the element,
  // So we have to create a brand new element.
  if (!el || this.features['movingMediaElementInDOM'] === false) {

    // If the original tag is still there, remove it.
    if (el) {
      el['player'] = null;
      player.tag = null;
      player.el().removeChild(el);
      el = el.cloneNode(false);
    } else {
      el = vjs.createEl('video', {
        id:player.id() + '_html5_api',
        className:'vjs-tech'
      });
    }
    // associate the player with the new tag
    el['player'] = player;

    vjs.insertFirst(el, player.el());
  }

  // Update specific tag settings, in case they were overridden
  var attrs = ['autoplay','preload','loop','muted'];
  for (var i = attrs.length - 1; i >= 0; i--) {
    var attr = attrs[i];
    if (player.options_[attr] !== null) {
      el[attr] = player.options_[attr];
    }
  }

  return el;
  // jenniisawesome = true;
};

// Make video events trigger player events
// May seem verbose here, but makes other APIs possible.
vjs.Html5.prototype.setupTriggers = function(){
  for (var i = vjs.Html5.Events.length - 1; i >= 0; i--) {
    vjs.on(this.el_, vjs.Html5.Events[i], vjs.bind(this.player_, this.eventHandler));
  }
};
// Triggers removed using this.off when disposed

vjs.Html5.prototype.eventHandler = function(e){
  this.trigger(e);

  // No need for media events to bubble up.
  e.stopPropagation();
};

vjs.Html5.prototype.useNativeControls = function(){
  var tech, player, controlsOn, controlsOff, cleanUp;

  tech = this;
  player = this.player();

  // If the player controls are enabled turn on the native controls
  tech.setControls(player.controls());

  // Update the native controls when player controls state is updated
  controlsOn = function(){
    tech.setControls(true);
  };
  controlsOff = function(){
    tech.setControls(false);
  };
  player.on('controlsenabled', controlsOn);
  player.on('controlsdisabled', controlsOff);

  // Clean up when not using native controls anymore
  cleanUp = function(){
    player.off('controlsenabled', controlsOn);
    player.off('controlsdisabled', controlsOff);
  };
  tech.on('dispose', cleanUp);
  player.on('usingcustomcontrols', cleanUp);

  // Update the state of the player to using native controls
  player.usingNativeControls(true);
};


vjs.Html5.prototype.play = function(){ this.el_.play(); };
vjs.Html5.prototype.pause = function(){ this.el_.pause(); };
vjs.Html5.prototype.paused = function(){ return this.el_.paused; };

vjs.Html5.prototype.currentTime = function(){ return this.el_.currentTime; };
vjs.Html5.prototype.setCurrentTime = function(seconds){
  try {
    this.el_.currentTime = seconds;
  } catch(e) {
    vjs.log(e, 'Video is not ready. (Video.js)');
    // this.warning(VideoJS.warnings.videoNotReady);
  }
};

vjs.Html5.prototype.duration = function(){ return this.el_.duration || 0; };
vjs.Html5.prototype.buffered = function(){ return this.el_.buffered; };

vjs.Html5.prototype.volume = function(){ return this.el_.volume; };
vjs.Html5.prototype.setVolume = function(percentAsDecimal){ this.el_.volume = percentAsDecimal; };
vjs.Html5.prototype.muted = function(){ return this.el_.muted; };
vjs.Html5.prototype.setMuted = function(muted){ this.el_.muted = muted; };

vjs.Html5.prototype.width = function(){ return this.el_.offsetWidth; };
vjs.Html5.prototype.height = function(){ return this.el_.offsetHeight; };

vjs.Html5.prototype.supportsFullScreen = function(){
  if (typeof this.el_.webkitEnterFullScreen == 'function') {

    // Seems to be broken in Chromium/Chrome && Safari in Leopard
    if (/Android/.test(vjs.USER_AGENT) || !/Chrome|Mac OS X 10.5/.test(vjs.USER_AGENT)) {
      return true;
    }
  }
  return false;
};

vjs.Html5.prototype.enterFullScreen = function(){
  var video = this.el_;
  if (video.paused && video.networkState <= video.HAVE_METADATA) {
    // attempt to prime the video element for programmatic access
    // this isn't necessary on the desktop but shouldn't hurt
    this.el_.play();

    // playing and pausing synchronously during the transition to fullscreen
    // can get iOS ~6.1 devices into a play/pause loop
    setTimeout(function(){
      video.pause();
      video.webkitEnterFullScreen();
    }, 0);
  } else {
    video.webkitEnterFullScreen();
  }
};
vjs.Html5.prototype.exitFullScreen = function(){
  this.el_.webkitExitFullScreen();
};
vjs.Html5.prototype.src = function(src){ this.el_.src = src; };
vjs.Html5.prototype.load = function(){ this.el_.load(); };
vjs.Html5.prototype.currentSrc = function(){ return this.el_.currentSrc; };

vjs.Html5.prototype.preload = function(){ return this.el_.preload; };
vjs.Html5.prototype.setPreload = function(val){ this.el_.preload = val; };

vjs.Html5.prototype.autoplay = function(){ return this.el_.autoplay; };
vjs.Html5.prototype.setAutoplay = function(val){ this.el_.autoplay = val; };

vjs.Html5.prototype.controls = function(){ return this.el_.controls; }
vjs.Html5.prototype.setControls = function(val){ this.el_.controls = !!val; }

vjs.Html5.prototype.loop = function(){ return this.el_.loop; };
vjs.Html5.prototype.setLoop = function(val){ this.el_.loop = val; };

vjs.Html5.prototype.error = function(){ return this.el_.error; };
vjs.Html5.prototype.seeking = function(){ return this.el_.seeking; };
vjs.Html5.prototype.ended = function(){ return this.el_.ended; };
vjs.Html5.prototype.defaultMuted = function(){ return this.el_.defaultMuted; };

/* HTML5 Support Testing ---------------------------------------------------- */

vjs.Html5.isSupported = function(){
  return !!vjs.TEST_VID.canPlayType;
};

vjs.Html5.canPlaySource = function(srcObj){
  // IE9 on Windows 7 without MediaPlayer throws an error here
  // https://github.com/videojs/video.js/issues/519
  try {
    return !!vjs.TEST_VID.canPlayType(srcObj.type);
  } catch(e) {
    return '';
  }
  // TODO: Check Type
  // If no Type, check ext
  // Check Media Type
};

vjs.Html5.canControlVolume = function(){
  var volume =  vjs.TEST_VID.volume;
  vjs.TEST_VID.volume = (volume / 2) + 0.1;
  return volume !== vjs.TEST_VID.volume;
};

// List of all HTML5 events (various uses).
vjs.Html5.Events = 'loadstart,suspend,abort,error,emptied,stalled,loadedmetadata,loadeddata,canplay,canplaythrough,playing,waiting,seeking,seeked,ended,durationchange,timeupdate,progress,play,pause,ratechange,volumechange'.split(',');


// HTML5 Feature detection and Device Fixes --------------------------------- //

  // Override Android 2.2 and less canPlayType method which is broken
if (vjs.IS_OLD_ANDROID) {
  document.createElement('video').constructor.prototype.canPlayType = function(type){
    return (type && type.toLowerCase().indexOf('video/mp4') != -1) ? 'maybe' : '';
  };
}
/**
 * @fileoverview VideoJS-SWF - Custom Flash Player with HTML5-ish API
 * https://github.com/zencoder/video-js-swf
 * Not using setupTriggers. Using global onEvent func to distribute events
 */

/**
 * HTML5 Media Controller - Wrapper for HTML5 Media API
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @param {Function=} ready
 * @constructor
 */
vjs.Flash = vjs.MediaTechController.extend({
  /** @constructor */
  init: function(player, options, ready){
    vjs.MediaTechController.call(this, player, options, ready);

    var source = options['source'],

        // Which element to embed in
        parentEl = options['parentEl'],

        // Create a temporary element to be replaced by swf object
        placeHolder = this.el_ = vjs.createEl('div', { id: player.id() + '_temp_flash' }),

        // Generate ID for swf object
        objId = player.id()+'_flash_api',

        // Store player options in local var for optimization
        // TODO: switch to using player methods instead of options
        // e.g. player.autoplay();
        playerOptions = player.options_,

        // Merge default flashvars with ones passed in to init
        flashVars = vjs.obj.merge({

          // SWF Callback Functions
          'readyFunction': 'videojs.Flash.onReady',
          'eventProxyFunction': 'videojs.Flash.onEvent',
          'errorEventProxyFunction': 'videojs.Flash.onError',

          // Player Settings
          'autoplay': playerOptions.autoplay,
          'preload': playerOptions.preload,
          'loop': playerOptions.loop,
          'muted': playerOptions.muted

        }, options['flashVars']),

        // Merge default parames with ones passed in
        params = vjs.obj.merge({
          'wmode': 'opaque', // Opaque is needed to overlay controls, but can affect playback performance
          'bgcolor': '#000000' // Using bgcolor prevents a white flash when the object is loading
        }, options['params']),

        // Merge default attributes with ones passed in
        attributes = vjs.obj.merge({
          'id': objId,
          'name': objId, // Both ID and Name needed or swf to identifty itself
          'class': 'vjs-tech'
        }, options['attributes'])
    ;

    // If source was supplied pass as a flash var.
    if (source) {
      if (source.type && vjs.Flash.isStreamingType(source.type)) {
        var parts = vjs.Flash.streamToParts(source.src);
        flashVars['rtmpConnection'] = encodeURIComponent(parts.connection);
        flashVars['rtmpStream'] = encodeURIComponent(parts.stream);
      }
      else {
        flashVars['src'] = encodeURIComponent(vjs.getAbsoluteURL(source.src));
      }
    }

    // Add placeholder to player div
    vjs.insertFirst(placeHolder, parentEl);

    // Having issues with Flash reloading on certain page actions (hide/resize/fullscreen) in certain browsers
    // This allows resetting the playhead when we catch the reload
    if (options['startTime']) {
      this.ready(function(){
        this.load();
        this.play();
        this.currentTime(options['startTime']);
      });
    }

    // Flash iFrame Mode
    // In web browsers there are multiple instances where changing the parent element or visibility of a plugin causes the plugin to reload.
    // - Firefox just about always. https://bugzilla.mozilla.org/show_bug.cgi?id=90268 (might be fixed by version 13)
    // - Webkit when hiding the plugin
    // - Webkit and Firefox when using requestFullScreen on a parent element
    // Loading the flash plugin into a dynamically generated iFrame gets around most of these issues.
    // Issues that remain include hiding the element and requestFullScreen in Firefox specifically

    // There's on particularly annoying issue with this method which is that Firefox throws a security error on an offsite Flash object loaded into a dynamically created iFrame.
    // Even though the iframe was inserted into a page on the web, Firefox + Flash considers it a local app trying to access an internet file.
    // I tried mulitple ways of setting the iframe src attribute but couldn't find a src that worked well. Tried a real/fake source, in/out of domain.
    // Also tried a method from stackoverflow that caused a security error in all browsers. http://stackoverflow.com/questions/2486901/how-to-set-document-domain-for-a-dynamically-generated-iframe
    // In the end the solution I found to work was setting the iframe window.location.href right before doing a document.write of the Flash object.
    // The only downside of this it seems to trigger another http request to the original page (no matter what's put in the href). Not sure why that is.

    // NOTE (2012-01-29): Cannot get Firefox to load the remote hosted SWF into a dynamically created iFrame
    // Firefox 9 throws a security error, unleess you call location.href right before doc.write.
    //    Not sure why that even works, but it causes the browser to look like it's continuously trying to load the page.
    // Firefox 3.6 keeps calling the iframe onload function anytime I write to it, causing an endless loop.

    if (options['iFrameMode'] === true && !vjs.IS_FIREFOX) {

      // Create iFrame with vjs-tech class so it's 100% width/height
      var iFrm = vjs.createEl('iframe', {
        'id': objId + '_iframe',
        'name': objId + '_iframe',
        'className': 'vjs-tech',
        'scrolling': 'no',
        'marginWidth': 0,
        'marginHeight': 0,
        'frameBorder': 0
      });

      // Update ready function names in flash vars for iframe window
      flashVars['readyFunction'] = 'ready';
      flashVars['eventProxyFunction'] = 'events';
      flashVars['errorEventProxyFunction'] = 'errors';

      // Tried multiple methods to get this to work in all browsers

      // Tried embedding the flash object in the page first, and then adding a place holder to the iframe, then replacing the placeholder with the page object.
      // The goal here was to try to load the swf URL in the parent page first and hope that got around the firefox security error
      // var newObj = vjs.Flash.embed(options['swf'], placeHolder, flashVars, params, attributes);
      // (in onload)
      //  var temp = vjs.createEl('a', { id:'asdf', innerHTML: 'asdf' } );
      //  iDoc.body.appendChild(temp);

      // Tried embedding the flash object through javascript in the iframe source.
      // This works in webkit but still triggers the firefox security error
      // iFrm.src = 'javascript: document.write('"+vjs.Flash.getEmbedCode(options['swf'], flashVars, params, attributes)+"');";

      // Tried an actual local iframe just to make sure that works, but it kills the easiness of the CDN version if you require the user to host an iframe
      // We should add an option to host the iframe locally though, because it could help a lot of issues.
      // iFrm.src = "iframe.html";

      // Wait until iFrame has loaded to write into it.
      vjs.on(iFrm, 'load', vjs.bind(this, function(){

        var iDoc,
            iWin = iFrm.contentWindow;

        // The one working method I found was to use the iframe's document.write() to create the swf object
        // This got around the security issue in all browsers except firefox.
        // I did find a hack where if I call the iframe's window.location.href='', it would get around the security error
        // However, the main page would look like it was loading indefinitely (URL bar loading spinner would never stop)
        // Plus Firefox 3.6 didn't work no matter what I tried.
        // if (vjs.USER_AGENT.match('Firefox')) {
        //   iWin.location.href = '';
        // }

        // Get the iFrame's document depending on what the browser supports
        iDoc = iFrm.contentDocument ? iFrm.contentDocument : iFrm.contentWindow.document;

        // Tried ensuring both document domains were the same, but they already were, so that wasn't the issue.
        // Even tried adding /. that was mentioned in a browser security writeup
        // document.domain = document.domain+'/.';
        // iDoc.domain = document.domain+'/.';

        // Tried adding the object to the iframe doc's innerHTML. Security error in all browsers.
        // iDoc.body.innerHTML = swfObjectHTML;

        // Tried appending the object to the iframe doc's body. Security error in all browsers.
        // iDoc.body.appendChild(swfObject);

        // Using document.write actually got around the security error that browsers were throwing.
        // Again, it's a dynamically generated (same domain) iframe, loading an external Flash swf.
        // Not sure why that's a security issue, but apparently it is.
        iDoc.write(vjs.Flash.getEmbedCode(options['swf'], flashVars, params, attributes));

        // Setting variables on the window needs to come after the doc write because otherwise they can get reset in some browsers
        // So far no issues with swf ready event being called before it's set on the window.
        iWin['player'] = this.player_;

        // Create swf ready function for iFrame window
        iWin['ready'] = vjs.bind(this.player_, function(currSwf){
          var el = iDoc.getElementById(currSwf),
              player = this,
              tech = player.tech;

          // Update reference to playback technology element
          tech.el_ = el;

          // Make sure swf is actually ready. Sometimes the API isn't actually yet.
          vjs.Flash.checkReady(tech);
        });

        // Create event listener for all swf events
        iWin['events'] = vjs.bind(this.player_, function(swfID, eventName){
          var player = this;
          if (player && player.techName === 'flash') {
            player.trigger(eventName);
          }
        });

        // Create error listener for all swf errors
        iWin['errors'] = vjs.bind(this.player_, function(swfID, eventName){
          vjs.log('Flash Error', eventName);
        });

      }));

      // Replace placeholder with iFrame (it will load now)
      placeHolder.parentNode.replaceChild(iFrm, placeHolder);

    // If not using iFrame mode, embed as normal object
    } else {
      vjs.Flash.embed(options['swf'], placeHolder, flashVars, params, attributes);
    }
  }
});

vjs.Flash.prototype.dispose = function(){
  vjs.MediaTechController.prototype.dispose.call(this);
};

vjs.Flash.prototype.play = function(){
  this.el_.vjs_play();
};

vjs.Flash.prototype.pause = function(){
  this.el_.vjs_pause();
};

vjs.Flash.prototype.src = function(src){
  if (vjs.Flash.isStreamingSrc(src)) {
    src = vjs.Flash.streamToParts(src);
    this.setRtmpConnection(src.connection);
    this.setRtmpStream(src.stream);
  }
  else {
    // Make sure source URL is abosolute.
    src = vjs.getAbsoluteURL(src);
    this.el_.vjs_src(src);
  }

  // Currently the SWF doesn't autoplay if you load a source later.
  // e.g. Load player w/ no source, wait 2s, set src.
  if (this.player_.autoplay()) {
    var tech = this;
    setTimeout(function(){ tech.play(); }, 0);
  }
};

vjs.Flash.prototype.currentSrc = function(){
  var src = this.el_.vjs_getProperty('currentSrc');
  // no src, check and see if RTMP
  if (src == null) {
    var connection = this.rtmpConnection(),
        stream = this.rtmpStream();

    if (connection && stream) {
      src = vjs.Flash.streamFromParts(connection, stream);
    }
  }
  return src;
};

vjs.Flash.prototype.load = function(){
  this.el_.vjs_load();
};

vjs.Flash.prototype.poster = function(){
  this.el_.vjs_getProperty('poster');
};

vjs.Flash.prototype.buffered = function(){
  return vjs.createTimeRange(0, this.el_.vjs_getProperty('buffered'));
};

vjs.Flash.prototype.supportsFullScreen = function(){
  return false; // Flash does not allow fullscreen through javascript
};

vjs.Flash.prototype.enterFullScreen = function(){
  return false;
};


// Create setters and getters for attributes
var api = vjs.Flash.prototype,
    readWrite = 'rtmpConnection,rtmpStream,preload,currentTime,defaultPlaybackRate,playbackRate,autoplay,loop,mediaGroup,controller,controls,volume,muted,defaultMuted'.split(','),
    readOnly = 'error,currentSrc,networkState,readyState,seeking,initialTime,duration,startOffsetTime,paused,played,seekable,ended,videoTracks,audioTracks,videoWidth,videoHeight,textTracks'.split(',');
    // Overridden: buffered

/**
 * @this {*}
 */
var createSetter = function(attr){
  var attrUpper = attr.charAt(0).toUpperCase() + attr.slice(1);
  api['set'+attrUpper] = function(val){ return this.el_.vjs_setProperty(attr, val); };
};

/**
 * @this {*}
 */
var createGetter = function(attr){
  api[attr] = function(){ return this.el_.vjs_getProperty(attr); };
};

(function(){
  var i;
  // Create getter and setters for all read/write attributes
  for (i = 0; i < readWrite.length; i++) {
    createGetter(readWrite[i]);
    createSetter(readWrite[i]);
  }

  // Create getters for read-only attributes
  for (i = 0; i < readOnly.length; i++) {
    createGetter(readOnly[i]);
  }
})();

/* Flash Support Testing -------------------------------------------------------- */

vjs.Flash.isSupported = function(){
  return vjs.Flash.version()[0] >= 10;
  // return swfobject.hasFlashPlayerVersion('10');
};

vjs.Flash.canPlaySource = function(srcObj){
  if (srcObj.type in vjs.Flash.formats || srcObj.type in vjs.Flash.streamingFormats) { return 'maybe'; }
};

vjs.Flash.formats = {
  'video/flv': 'FLV',
  'video/x-flv': 'FLV',
  'video/mp4': 'MP4',
  'video/m4v': 'MP4'
};

vjs.Flash.streamingFormats = {
  'rtmp/mp4': 'MP4',
  'rtmp/flv': 'FLV'
};

vjs.Flash['onReady'] = function(currSwf){
  var el = vjs.el(currSwf);

  // Get player from box
  // On firefox reloads, el might already have a player
  var player = el['player'] || el.parentNode['player'],
      tech = player.tech;

  // Reference player on tech element
  el['player'] = player;

  // Update reference to playback technology element
  tech.el_ = el;

  vjs.Flash.checkReady(tech);
};

// The SWF isn't alwasy ready when it says it is. Sometimes the API functions still need to be added to the object.
// If it's not ready, we set a timeout to check again shortly.
vjs.Flash.checkReady = function(tech){

  // Check if API property exists
  if (tech.el().vjs_getProperty) {

    // If so, tell tech it's ready
    tech.triggerReady();

  // Otherwise wait longer.
  } else {

    setTimeout(function(){
      vjs.Flash.checkReady(tech);
    }, 50);

  }
};

// Trigger events from the swf on the player
vjs.Flash['onEvent'] = function(swfID, eventName){
  var player = vjs.el(swfID)['player'];
  player.trigger(eventName);
};

// Log errors from the swf
vjs.Flash['onError'] = function(swfID, err){
  var player = vjs.el(swfID)['player'];
  player.trigger('error');
  vjs.log('Flash Error', err, swfID);
};

// Flash Version Check
vjs.Flash.version = function(){
  var version = '0,0,0';

  // IE
  try {
    version = new window.ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/\D+/g, ',').match(/^,?(.+),?$/)[1];

  // other browsers
  } catch(e) {
    try {
      if (navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin){
        version = (navigator.plugins['Shockwave Flash 2.0'] || navigator.plugins['Shockwave Flash']).description.replace(/\D+/g, ',').match(/^,?(.+),?$/)[1];
      }
    } catch(err) {}
  }
  return version.split(',');
};

// Flash embedding method. Only used in non-iframe mode
vjs.Flash.embed = function(swf, placeHolder, flashVars, params, attributes){
  var code = vjs.Flash.getEmbedCode(swf, flashVars, params, attributes),

      // Get element by embedding code and retrieving created element
      obj = vjs.createEl('div', { innerHTML: code }).childNodes[0],

      par = placeHolder.parentNode
  ;

  placeHolder.parentNode.replaceChild(obj, placeHolder);

  // IE6 seems to have an issue where it won't initialize the swf object after injecting it.
  // This is a dumb fix
  var newObj = par.childNodes[0];
  setTimeout(function(){
    newObj.style.display = 'block';
  }, 1000);

  return obj;

};

vjs.Flash.getEmbedCode = function(swf, flashVars, params, attributes){

  var objTag = '<object type="application/x-shockwave-flash"',
      flashVarsString = '',
      paramsString = '',
      attrsString = '';

  // Convert flash vars to string
  if (flashVars) {
    vjs.obj.each(flashVars, function(key, val){
      flashVarsString += (key + '=' + val + '&amp;');
    });
  }

  // Add swf, flashVars, and other default params
  params = vjs.obj.merge({
    'movie': swf,
    'flashvars': flashVarsString,
    'allowScriptAccess': 'always', // Required to talk to swf
    'allowNetworking': 'all' // All should be default, but having security issues.
  }, params);

  // Create param tags string
  vjs.obj.each(params, function(key, val){
    paramsString += '<param name="'+key+'" value="'+val+'" />';
  });

  attributes = vjs.obj.merge({
    // Add swf to attributes (need both for IE and Others to work)
    'data': swf,

    // Default to 100% width/height
    'width': '100%',
    'height': '100%'

  }, attributes);

  // Create Attributes string
  vjs.obj.each(attributes, function(key, val){
    attrsString += (key + '="' + val + '" ');
  });

  return objTag + attrsString + '>' + paramsString + '</object>';
};

vjs.Flash.streamFromParts = function(connection, stream) {
  return connection + '&' + stream;
};

vjs.Flash.streamToParts = function(src) {
  var parts = {
    connection: '',
    stream: ''
  };

  if (! src) {
    return parts;
  }

  // Look for the normal URL separator we expect, '&'.
  // If found, we split the URL into two pieces around the
  // first '&'.
  var connEnd = src.indexOf('&');
  var streamBegin;
  if (connEnd !== -1) {
    streamBegin = connEnd + 1;
  }
  else {
    // If there's not a '&', we use the last '/' as the delimiter.
    connEnd = streamBegin = src.lastIndexOf('/') + 1;
    if (connEnd === 0) {
      // really, there's not a '/'?
      connEnd = streamBegin = src.length;
    }
  }
  parts.connection = src.substring(0, connEnd);
  parts.stream = src.substring(streamBegin, src.length);

  return parts;
};

vjs.Flash.isStreamingType = function(srcType) {
  return srcType in vjs.Flash.streamingFormats;
};

// RTMP has four variations, any string starting
// with one of these protocols should be valid
vjs.Flash.RTMP_RE = /^rtmp[set]?:\/\//i;

vjs.Flash.isStreamingSrc = function(src) {
  return vjs.Flash.RTMP_RE.test(src);
};
/**
 * @constructor
 */
vjs.MediaLoader = vjs.Component.extend({
  /** @constructor */
  init: function(player, options, ready){
    vjs.Component.call(this, player, options, ready);

    // If there are no sources when the player is initialized,
    // load the first supported playback technology.
    if (!player.options_['sources'] || player.options_['sources'].length === 0) {
      for (var i=0,j=player.options_['techOrder']; i<j.length; i++) {
        var techName = vjs.capitalize(j[i]),
            tech = window['videojs'][techName];

        // Check if the browser supports this technology
        if (tech && tech.isSupported()) {
          player.loadTech(techName);
          break;
        }
      }
    } else {
      // // Loop through playback technologies (HTML5, Flash) and check for support.
      // // Then load the best source.
      // // A few assumptions here:
      // //   All playback technologies respect preload false.
      player.src(player.options_['sources']);
    }
  }
});/**
 * @fileoverview Text Tracks
 * Text tracks are tracks of timed text events.
 * Captions - text displayed over the video for the hearing impared
 * Subtitles - text displayed over the video for those who don't understand langauge in the video
 * Chapters - text displayed in a menu allowing the user to jump to particular points (chapters) in the video
 * Descriptions (not supported yet) - audio descriptions that are read back to the user by a screen reading device
 */

// Player Additions - Functions add to the player object for easier access to tracks

/**
 * List of associated text tracks
 * @type {Array}
 * @private
 */
vjs.Player.prototype.textTracks_;

/**
 * Get an array of associated text tracks. captions, subtitles, chapters, descriptions
 * http://www.w3.org/html/wg/drafts/html/master/embedded-content-0.html#dom-media-texttracks
 * @return {Array}           Array of track objects
 */
vjs.Player.prototype.textTracks = function(){
  this.textTracks_ = this.textTracks_ || [];
  return this.textTracks_;
};

/**
 * Add a text track
 * In addition to the W3C settings we allow adding additional info through options.
 * http://www.w3.org/html/wg/drafts/html/master/embedded-content-0.html#dom-media-addtexttrack
 * @param {String}  kind        Captions, subtitles, chapters, descriptions, or metadata
 * @param {String=} label       Optional label
 * @param {String=} language    Optional language
 * @param {Object=} options     Additional track options, like src
 */
vjs.Player.prototype.addTextTrack = function(kind, label, language, options){
  var tracks = this.textTracks_ = this.textTracks_ || [];
  options = options || {};

  options['kind'] = kind;
  options['label'] = label;
  options['language'] = language;

  // HTML5 Spec says default to subtitles.
  // Uppercase first letter to match class names
  var Kind = vjs.capitalize(kind || 'subtitles');

  // Create correct texttrack class. CaptionsTrack, etc.
  var track = new window['videojs'][Kind + 'Track'](this, options);

  tracks.push(track);

  // If track.dflt() is set, start showing immediately
  // TODO: Add a process to deterime the best track to show for the specific kind
  // Incase there are mulitple defaulted tracks of the same kind
  // Or the user has a set preference of a specific language that should override the default
  // if (track.dflt()) {
  //   this.ready(vjs.bind(track, track.show));
  // }

  return track;
};

/**
 * Add an array of text tracks. captions, subtitles, chapters, descriptions
 * Track objects will be stored in the player.textTracks() array
 * @param {Array} trackList Array of track elements or objects (fake track elements)
 */
vjs.Player.prototype.addTextTracks = function(trackList){
  var trackObj;

  for (var i = 0; i < trackList.length; i++) {
    trackObj = trackList[i];
    this.addTextTrack(trackObj['kind'], trackObj['label'], trackObj['language'], trackObj);
  }

  return this;
};

// Show a text track
// disableSameKind: disable all other tracks of the same kind. Value should be a track kind (captions, etc.)
vjs.Player.prototype.showTextTrack = function(id, disableSameKind){
  var tracks = this.textTracks_,
      i = 0,
      j = tracks.length,
      track, showTrack, kind;

  // Find Track with same ID
  for (;i<j;i++) {
    track = tracks[i];
    if (track.id() === id) {
      track.show();
      showTrack = track;

    // Disable tracks of the same kind
    } else if (disableSameKind && track.kind() == disableSameKind && track.mode() > 0) {
      track.disable();
    }
  }

  // Get track kind from shown track or disableSameKind
  kind = (showTrack) ? showTrack.kind() : ((disableSameKind) ? disableSameKind : false);

  // Trigger trackchange event, captionstrackchange, subtitlestrackchange, etc.
  if (kind) {
    this.trigger(kind+'trackchange');
  }

  return this;
};

/**
 * Track Class
 * Contains track methods for loading, showing, parsing cues of tracks
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.TextTrack = vjs.Component.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Component.call(this, player, options);

    // Apply track info to track object
    // Options will often be a track element

    // Build ID if one doesn't exist
    this.id_ = options['id'] || ('vjs_' + options['kind'] + '_' + options['language'] + '_' + vjs.guid++);
    this.src_ = options['src'];
    // 'default' is a reserved keyword in js so we use an abbreviated version
    this.dflt_ = options['default'] || options['dflt'];
    this.title_ = options['title'];
    this.language_ = options['srclang'];
    this.label_ = options['label'];
    this.cues_ = [];
    this.activeCues_ = [];
    this.readyState_ = 0;
    this.mode_ = 0;

    this.player_.on('fullscreenchange', vjs.bind(this, this.adjustFontSize));
  }
});

/**
 * Track kind value. Captions, subtitles, etc.
 * @private
 */
vjs.TextTrack.prototype.kind_;

/**
 * Get the track kind value
 * @return {String}
 */
vjs.TextTrack.prototype.kind = function(){
  return this.kind_;
};

/**
 * Track src value
 * @private
 */
vjs.TextTrack.prototype.src_;

/**
 * Get the track src value
 * @return {String}
 */
vjs.TextTrack.prototype.src = function(){
  return this.src_;
};

/**
 * Track default value
 * If default is used, subtitles/captions to start showing
 * @private
 */
vjs.TextTrack.prototype.dflt_;

/**
 * Get the track default value
 * 'default' is a reserved keyword
 * @return {Boolean}
 */
vjs.TextTrack.prototype.dflt = function(){
  return this.dflt_;
};

/**
 * Track title value
 * @private
 */
vjs.TextTrack.prototype.title_;

/**
 * Get the track title value
 * @return {String}
 */
vjs.TextTrack.prototype.title = function(){
  return this.title_;
};

/**
 * Language - two letter string to represent track language, e.g. 'en' for English
 * Spec def: readonly attribute DOMString language;
 * @private
 */
vjs.TextTrack.prototype.language_;

/**
 * Get the track language value
 * @return {String}
 */
vjs.TextTrack.prototype.language = function(){
  return this.language_;
};

/**
 * Track label e.g. 'English'
 * Spec def: readonly attribute DOMString label;
 * @private
 */
vjs.TextTrack.prototype.label_;

/**
 * Get the track label value
 * @return {String}
 */
vjs.TextTrack.prototype.label = function(){
  return this.label_;
};

/**
 * All cues of the track. Cues have a startTime, endTime, text, and other properties.
 * Spec def: readonly attribute TextTrackCueList cues;
 * @private
 */
vjs.TextTrack.prototype.cues_;

/**
 * Get the track cues
 * @return {Array}
 */
vjs.TextTrack.prototype.cues = function(){
  return this.cues_;
};

/**
 * ActiveCues is all cues that are currently showing
 * Spec def: readonly attribute TextTrackCueList activeCues;
 * @private
 */
vjs.TextTrack.prototype.activeCues_;

/**
 * Get the track active cues
 * @return {Array}
 */
vjs.TextTrack.prototype.activeCues = function(){
  return this.activeCues_;
};

/**
 * ReadyState describes if the text file has been loaded
 * const unsigned short NONE = 0;
 * const unsigned short LOADING = 1;
 * const unsigned short LOADED = 2;
 * const unsigned short ERROR = 3;
 * readonly attribute unsigned short readyState;
 * @private
 */
vjs.TextTrack.prototype.readyState_;

/**
 * Get the track readyState
 * @return {Number}
 */
vjs.TextTrack.prototype.readyState = function(){
  return this.readyState_;
};

/**
 * Mode describes if the track is showing, hidden, or disabled
 * const unsigned short OFF = 0;
 * const unsigned short HIDDEN = 1; (still triggering cuechange events, but not visible)
 * const unsigned short SHOWING = 2;
 * attribute unsigned short mode;
 * @private
 */
vjs.TextTrack.prototype.mode_;

/**
 * Get the track mode
 * @return {Number}
 */
vjs.TextTrack.prototype.mode = function(){
  return this.mode_;
};

/**
 * Change the font size of the text track to make it larger when playing in fullscreen mode
 * and restore it to its normal size when not in fullscreen mode.
 */
vjs.TextTrack.prototype.adjustFontSize = function(){
    if (this.player_.isFullScreen) {
        // Scale the font by the same factor as increasing the video width to the full screen window width.
        // Additionally, multiply that factor by 1.4, which is the default font size for
        // the caption track (from the CSS)
        this.el_.style.fontSize = screen.width / this.player_.width() * 1.4 * 100 + '%';
    } else {
        // Change the font size of the text track back to its original non-fullscreen size
        this.el_.style.fontSize = '';
    }
};

/**
 * Create basic div to hold cue text
 * @return {Element}
 */
vjs.TextTrack.prototype.createEl = function(){
  return vjs.Component.prototype.createEl.call(this, 'div', {
    className: 'vjs-' + this.kind_ + ' vjs-text-track'
  });
};

/**
 * Show: Mode Showing (2)
 * Indicates that the text track is active. If no attempt has yet been made to obtain the track's cues, the user agent will perform such an attempt momentarily.
 * The user agent is maintaining a list of which cues are active, and events are being fired accordingly.
 * In addition, for text tracks whose kind is subtitles or captions, the cues are being displayed over the video as appropriate;
 * for text tracks whose kind is descriptions, the user agent is making the cues available to the user in a non-visual fashion;
 * and for text tracks whose kind is chapters, the user agent is making available to the user a mechanism by which the user can navigate to any point in the media resource by selecting a cue.
 * The showing by default state is used in conjunction with the default attribute on track elements to indicate that the text track was enabled due to that attribute.
 * This allows the user agent to override the state if a later track is discovered that is more appropriate per the user's preferences.
 */
vjs.TextTrack.prototype.show = function(){
  this.activate();

  this.mode_ = 2;

  // Show element.
  vjs.Component.prototype.show.call(this);
};

/**
 * Hide: Mode Hidden (1)
 * Indicates that the text track is active, but that the user agent is not actively displaying the cues.
 * If no attempt has yet been made to obtain the track's cues, the user agent will perform such an attempt momentarily.
 * The user agent is maintaining a list of which cues are active, and events are being fired accordingly.
 */
vjs.TextTrack.prototype.hide = function(){
  // When hidden, cues are still triggered. Disable to stop triggering.
  this.activate();

  this.mode_ = 1;

  // Hide element.
  vjs.Component.prototype.hide.call(this);
};

/**
 * Disable: Mode Off/Disable (0)
 * Indicates that the text track is not active. Other than for the purposes of exposing the track in the DOM, the user agent is ignoring the text track.
 * No cues are active, no events are fired, and the user agent will not attempt to obtain the track's cues.
 */
vjs.TextTrack.prototype.disable = function(){
  // If showing, hide.
  if (this.mode_ == 2) { this.hide(); }

  // Stop triggering cues
  this.deactivate();

  // Switch Mode to Off
  this.mode_ = 0;
};

/**
 * Turn on cue tracking. Tracks that are showing OR hidden are active.
 */
vjs.TextTrack.prototype.activate = function(){
  // Load text file if it hasn't been yet.
  if (this.readyState_ === 0) { this.load(); }

  // Only activate if not already active.
  if (this.mode_ === 0) {
    // Update current cue on timeupdate
    // Using unique ID for bind function so other tracks don't remove listener
    this.player_.on('timeupdate', vjs.bind(this, this.update, this.id_));

    // Reset cue time on media end
    this.player_.on('ended', vjs.bind(this, this.reset, this.id_));

    // Add to display
    if (this.kind_ === 'captions' || this.kind_ === 'subtitles') {
      this.player_.getChild('textTrackDisplay').addChild(this);
    }
  }
};

/**
 * Turn off cue tracking.
 */
vjs.TextTrack.prototype.deactivate = function(){
  // Using unique ID for bind function so other tracks don't remove listener
  this.player_.off('timeupdate', vjs.bind(this, this.update, this.id_));
  this.player_.off('ended', vjs.bind(this, this.reset, this.id_));
  this.reset(); // Reset

  // Remove from display
  this.player_.getChild('textTrackDisplay').removeChild(this);
};

// A readiness state
// One of the following:
//
// Not loaded
// Indicates that the text track is known to exist (e.g. it has been declared with a track element), but its cues have not been obtained.
//
// Loading
// Indicates that the text track is loading and there have been no fatal errors encountered so far. Further cues might still be added to the track.
//
// Loaded
// Indicates that the text track has been loaded with no fatal errors. No new cues will be added to the track except if the text track corresponds to a MutableTextTrack object.
//
// Failed to load
// Indicates that the text track was enabled, but when the user agent attempted to obtain it, this failed in some way (e.g. URL could not be resolved, network error, unknown text track format). Some or all of the cues are likely missing and will not be obtained.
vjs.TextTrack.prototype.load = function(){

  // Only load if not loaded yet.
  if (this.readyState_ === 0) {
    this.readyState_ = 1;
    vjs.get(this.src_, vjs.bind(this, this.parseCues), vjs.bind(this, this.onError));
  }

};

vjs.TextTrack.prototype.onError = function(err){
  this.error = err;
  this.readyState_ = 3;
  this.trigger('error');
};

// Parse the WebVTT text format for cue times.
// TODO: Separate parser into own class so alternative timed text formats can be used. (TTML, DFXP)
vjs.TextTrack.prototype.parseCues = function(srcContent) {
  var cue, time, text,
      lines = srcContent.split('\n'),
      line = '', id;

  for (var i=1, j=lines.length; i<j; i++) {
    // Line 0 should be 'WEBVTT', so skipping i=0

    line = vjs.trim(lines[i]); // Trim whitespace and linebreaks

    if (line) { // Loop until a line with content

      // First line could be an optional cue ID
      // Check if line has the time separator
      if (line.indexOf('-->') == -1) {
        id = line;
        // Advance to next line for timing.
        line = vjs.trim(lines[++i]);
      } else {
        id = this.cues_.length;
      }

      // First line - Number
      cue = {
        id: id, // Cue Number
        index: this.cues_.length // Position in Array
      };

      // Timing line
      time = line.split(' --> ');
      cue.startTime = this.parseCueTime(time[0]);
      cue.endTime = this.parseCueTime(time[1]);

      // Additional lines - Cue Text
      text = [];

      // Loop until a blank line or end of lines
      // Assumeing trim('') returns false for blank lines
      while (lines[++i] && (line = vjs.trim(lines[i]))) {
        text.push(line);
      }

      cue.text = text.join('<br/>');

      // Add this cue
      this.cues_.push(cue);
    }
  }

  this.readyState_ = 2;
  this.trigger('loaded');
};


vjs.TextTrack.prototype.parseCueTime = function(timeText) {
  var parts = timeText.split(':'),
      time = 0,
      hours, minutes, other, seconds, ms;

  // Check if optional hours place is included
  // 00:00:00.000 vs. 00:00.000
  if (parts.length == 3) {
    hours = parts[0];
    minutes = parts[1];
    other = parts[2];
  } else {
    hours = 0;
    minutes = parts[0];
    other = parts[1];
  }

  // Break other (seconds, milliseconds, and flags) by spaces
  // TODO: Make additional cue layout settings work with flags
  other = other.split(/\s+/);
  // Remove seconds. Seconds is the first part before any spaces.
  seconds = other.splice(0,1)[0];
  // Could use either . or , for decimal
  seconds = seconds.split(/\.|,/);
  // Get milliseconds
  ms = parseFloat(seconds[1]);
  seconds = seconds[0];

  // hours => seconds
  time += parseFloat(hours) * 3600;
  // minutes => seconds
  time += parseFloat(minutes) * 60;
  // Add seconds
  time += parseFloat(seconds);
  // Add milliseconds
  if (ms) { time += ms/1000; }

  return time;
};

// Update active cues whenever timeupdate events are triggered on the player.
vjs.TextTrack.prototype.update = function(){
  if (this.cues_.length > 0) {

    // Get curent player time
    var time = this.player_.currentTime();

    // Check if the new time is outside the time box created by the the last update.
    if (this.prevChange === undefined || time < this.prevChange || this.nextChange <= time) {
      var cues = this.cues_,

          // Create a new time box for this state.
          newNextChange = this.player_.duration(), // Start at beginning of the timeline
          newPrevChange = 0, // Start at end

          reverse = false, // Set the direction of the loop through the cues. Optimized the cue check.
          newCues = [], // Store new active cues.

          // Store where in the loop the current active cues are, to provide a smart starting point for the next loop.
          firstActiveIndex, lastActiveIndex,
          cue, i; // Loop vars

      // Check if time is going forwards or backwards (scrubbing/rewinding)
      // If we know the direction we can optimize the starting position and direction of the loop through the cues array.
      if (time >= this.nextChange || this.nextChange === undefined) { // NextChange should happen
        // Forwards, so start at the index of the first active cue and loop forward
        i = (this.firstActiveIndex !== undefined) ? this.firstActiveIndex : 0;
      } else {
        // Backwards, so start at the index of the last active cue and loop backward
        reverse = true;
        i = (this.lastActiveIndex !== undefined) ? this.lastActiveIndex : cues.length - 1;
      }

      while (true) { // Loop until broken
        cue = cues[i];

        // Cue ended at this point
        if (cue.endTime <= time) {
          newPrevChange = Math.max(newPrevChange, cue.endTime);

          if (cue.active) {
            cue.active = false;
          }

          // No earlier cues should have an active start time.
          // Nevermind. Assume first cue could have a duration the same as the video.
          // In that case we need to loop all the way back to the beginning.
          // if (reverse && cue.startTime) { break; }

        // Cue hasn't started
        } else if (time < cue.startTime) {
          newNextChange = Math.min(newNextChange, cue.startTime);

          if (cue.active) {
            cue.active = false;
          }

          // No later cues should have an active start time.
          if (!reverse) { break; }

        // Cue is current
        } else {

          if (reverse) {
            // Add cue to front of array to keep in time order
            newCues.splice(0,0,cue);

            // If in reverse, the first current cue is our lastActiveCue
            if (lastActiveIndex === undefined) { lastActiveIndex = i; }
            firstActiveIndex = i;
          } else {
            // Add cue to end of array
            newCues.push(cue);

            // If forward, the first current cue is our firstActiveIndex
            if (firstActiveIndex === undefined) { firstActiveIndex = i; }
            lastActiveIndex = i;
          }

          newNextChange = Math.min(newNextChange, cue.endTime);
          newPrevChange = Math.max(newPrevChange, cue.startTime);

          cue.active = true;
        }

        if (reverse) {
          // Reverse down the array of cues, break if at first
          if (i === 0) { break; } else { i--; }
        } else {
          // Walk up the array fo cues, break if at last
          if (i === cues.length - 1) { break; } else { i++; }
        }

      }

      this.activeCues_ = newCues;
      this.nextChange = newNextChange;
      this.prevChange = newPrevChange;
      this.firstActiveIndex = firstActiveIndex;
      this.lastActiveIndex = lastActiveIndex;

      this.updateDisplay();

      this.trigger('cuechange');
    }
  }
};

// Add cue HTML to display
vjs.TextTrack.prototype.updateDisplay = function(){
  var cues = this.activeCues_,
      html = '',
      i=0,j=cues.length;

  for (;i<j;i++) {
    html += '<span class="vjs-tt-cue">'+cues[i].text+'</span>';
  }

  this.el_.innerHTML = html;
};

// Set all loop helper values back
vjs.TextTrack.prototype.reset = function(){
  this.nextChange = 0;
  this.prevChange = this.player_.duration();
  this.firstActiveIndex = 0;
  this.lastActiveIndex = 0;
};

// Create specific track types
/**
 * @constructor
 */
vjs.CaptionsTrack = vjs.TextTrack.extend();
vjs.CaptionsTrack.prototype.kind_ = 'captions';
// Exporting here because Track creation requires the track kind
// to be available on global object. e.g. new window['videojs'][Kind + 'Track']

/**
 * @constructor
 */
vjs.SubtitlesTrack = vjs.TextTrack.extend();
vjs.SubtitlesTrack.prototype.kind_ = 'subtitles';

/**
 * @constructor
 */
vjs.ChaptersTrack = vjs.TextTrack.extend();
vjs.ChaptersTrack.prototype.kind_ = 'chapters';


/* Text Track Display
============================================================================= */
// Global container for both subtitle and captions text. Simple div container.

/**
 * @constructor
 */
vjs.TextTrackDisplay = vjs.Component.extend({
  /** @constructor */
  init: function(player, options, ready){
    vjs.Component.call(this, player, options, ready);

    // This used to be called during player init, but was causing an error
    // if a track should show by default and the display hadn't loaded yet.
    // Should probably be moved to an external track loader when we support
    // tracks that don't need a display.
    if (player.options_['tracks'] && player.options_['tracks'].length > 0) {
      this.player_.addTextTracks(player.options_['tracks']);
    }
  }
});

vjs.TextTrackDisplay.prototype.createEl = function(){
  return vjs.Component.prototype.createEl.call(this, 'div', {
    className: 'vjs-text-track-display'
  });
};


/* Text Track Menu Items
============================================================================= */
/**
 * @constructor
 */
vjs.TextTrackMenuItem = vjs.MenuItem.extend({
  /** @constructor */
  init: function(player, options){
    var track = this.track = options['track'];

    // Modify options for parent MenuItem class's init.
    options['label'] = track.label();
    options['selected'] = track.dflt();
    vjs.MenuItem.call(this, player, options);

    this.player_.on(track.kind() + 'trackchange', vjs.bind(this, this.update));
  }
});

vjs.TextTrackMenuItem.prototype.onClick = function(){
  vjs.MenuItem.prototype.onClick.call(this);
  this.player_.showTextTrack(this.track.id_, this.track.kind());
};

vjs.TextTrackMenuItem.prototype.update = function(){
  this.selected(this.track.mode() == 2);
};

/**
 * @constructor
 */
vjs.OffTextTrackMenuItem = vjs.TextTrackMenuItem.extend({
  /** @constructor */
  init: function(player, options){
    // Create pseudo track info
    // Requires options['kind']
    options['track'] = {
      kind: function() { return options['kind']; },
      player: player,
      label: function(){ return options['kind'] + ' off'; },
      dflt: function(){ return false; },
      mode: function(){ return false; }
    };
    vjs.TextTrackMenuItem.call(this, player, options);
    this.selected(true);
  }
});

vjs.OffTextTrackMenuItem.prototype.onClick = function(){
  vjs.TextTrackMenuItem.prototype.onClick.call(this);
  this.player_.showTextTrack(this.track.id_, this.track.kind());
};

vjs.OffTextTrackMenuItem.prototype.update = function(){
  var tracks = this.player_.textTracks(),
      i=0, j=tracks.length, track,
      off = true;

  for (;i<j;i++) {
    track = tracks[i];
    if (track.kind() == this.track.kind() && track.mode() == 2) {
      off = false;
    }
  }

  this.selected(off);
};

/* Captions Button
================================================================================ */
/**
 * @constructor
 */
vjs.TextTrackButton = vjs.MenuButton.extend({
  /** @constructor */
  init: function(player, options){
    vjs.MenuButton.call(this, player, options);

    if (this.items.length <= 1) {
      this.hide();
    }
  }
});

// vjs.TextTrackButton.prototype.buttonPressed = false;

// vjs.TextTrackButton.prototype.createMenu = function(){
//   var menu = new vjs.Menu(this.player_);

//   // Add a title list item to the top
//   // menu.el().appendChild(vjs.createEl('li', {
//   //   className: 'vjs-menu-title',
//   //   innerHTML: vjs.capitalize(this.kind_),
//   //   tabindex: -1
//   // }));

//   this.items = this.createItems();

//   // Add menu items to the menu
//   for (var i = 0; i < this.items.length; i++) {
//     menu.addItem(this.items[i]);
//   }

//   // Add list to element
//   this.addChild(menu);

//   return menu;
// };

// Create a menu item for each text track
vjs.TextTrackButton.prototype.createItems = function(){
  var items = [], track;

  // Add an OFF menu item to turn all tracks off
  items.push(new vjs.OffTextTrackMenuItem(this.player_, { 'kind': this.kind_ }));

  for (var i = 0; i < this.player_.textTracks().length; i++) {
    track = this.player_.textTracks()[i];
    if (track.kind() === this.kind_) {
      items.push(new vjs.TextTrackMenuItem(this.player_, {
        'track': track
      }));
    }
  }

  return items;
};

/**
 * @constructor
 */
vjs.CaptionsButton = vjs.TextTrackButton.extend({
  /** @constructor */
  init: function(player, options, ready){
    vjs.TextTrackButton.call(this, player, options, ready);
    this.el_.setAttribute('aria-label','Captions Menu');
  }
});
vjs.CaptionsButton.prototype.kind_ = 'captions';
vjs.CaptionsButton.prototype.buttonText = 'Captions';
vjs.CaptionsButton.prototype.className = 'vjs-captions-button';

/**
 * @constructor
 */
vjs.SubtitlesButton = vjs.TextTrackButton.extend({
  /** @constructor */
  init: function(player, options, ready){
    vjs.TextTrackButton.call(this, player, options, ready);
    this.el_.setAttribute('aria-label','Subtitles Menu');
  }
});
vjs.SubtitlesButton.prototype.kind_ = 'subtitles';
vjs.SubtitlesButton.prototype.buttonText = 'Subtitles';
vjs.SubtitlesButton.prototype.className = 'vjs-subtitles-button';

// Chapters act much differently than other text tracks
// Cues are navigation vs. other tracks of alternative languages
/**
 * @constructor
 */
vjs.ChaptersButton = vjs.TextTrackButton.extend({
  /** @constructor */
  init: function(player, options, ready){
    vjs.TextTrackButton.call(this, player, options, ready);
    this.el_.setAttribute('aria-label','Chapters Menu');
  }
});
vjs.ChaptersButton.prototype.kind_ = 'chapters';
vjs.ChaptersButton.prototype.buttonText = 'Chapters';
vjs.ChaptersButton.prototype.className = 'vjs-chapters-button';

// Create a menu item for each text track
vjs.ChaptersButton.prototype.createItems = function(){
  var items = [], track;

  for (var i = 0; i < this.player_.textTracks().length; i++) {
    track = this.player_.textTracks()[i];
    if (track.kind() === this.kind_) {
      items.push(new vjs.TextTrackMenuItem(this.player_, {
        'track': track
      }));
    }
  }

  return items;
};

vjs.ChaptersButton.prototype.createMenu = function(){
  var tracks = this.player_.textTracks(),
      i = 0,
      j = tracks.length,
      track, chaptersTrack,
      items = this.items = [];

  for (;i<j;i++) {
    track = tracks[i];
    if (track.kind() == this.kind_ && track.dflt()) {
      if (track.readyState() < 2) {
        this.chaptersTrack = track;
        track.on('loaded', vjs.bind(this, this.createMenu));
        return;
      } else {
        chaptersTrack = track;
        break;
      }
    }
  }

  var menu = this.menu = new vjs.Menu(this.player_);

  menu.el_.appendChild(vjs.createEl('li', {
    className: 'vjs-menu-title',
    innerHTML: vjs.capitalize(this.kind_),
    tabindex: -1
  }));

  if (chaptersTrack) {
    var cues = chaptersTrack.cues_, cue, mi;
    i = 0;
    j = cues.length;

    for (;i<j;i++) {
      cue = cues[i];

      mi = new vjs.ChaptersTrackMenuItem(this.player_, {
        'track': chaptersTrack,
        'cue': cue
      });

      items.push(mi);

      menu.addChild(mi);
    }
  }

  if (this.items.length > 0) {
    this.show();
  }

  return menu;
};


/**
 * @constructor
 */
vjs.ChaptersTrackMenuItem = vjs.MenuItem.extend({
  /** @constructor */
  init: function(player, options){
    var track = this.track = options['track'],
        cue = this.cue = options['cue'],
        currentTime = player.currentTime();

    // Modify options for parent MenuItem class's init.
    options['label'] = cue.text;
    options['selected'] = (cue.startTime <= currentTime && currentTime < cue.endTime);
    vjs.MenuItem.call(this, player, options);

    track.on('cuechange', vjs.bind(this, this.update));
  }
});

vjs.ChaptersTrackMenuItem.prototype.onClick = function(){
  vjs.MenuItem.prototype.onClick.call(this);
  this.player_.currentTime(this.cue.startTime);
  this.update(this.cue.startTime);
};

vjs.ChaptersTrackMenuItem.prototype.update = function(){
  var cue = this.cue,
      currentTime = this.player_.currentTime();

  // vjs.log(currentTime, cue.startTime);
  this.selected(cue.startTime <= currentTime && currentTime < cue.endTime);
};

// Add Buttons to controlBar
vjs.obj.merge(vjs.ControlBar.prototype.options_['children'], {
  'subtitlesButton': {},
  'captionsButton': {},
  'chaptersButton': {}
});

// vjs.Cue = vjs.Component.extend({
//   /** @constructor */
//   init: function(player, options){
//     vjs.Component.call(this, player, options);
//   }
// });
/**
 * @fileoverview Add JSON support
 * @suppress {undefinedVars}
 * (Compiler doesn't like JSON not being declared)
 */

/**
 * Javascript JSON implementation
 * (Parse Method Only)
 * https://github.com/douglascrockford/JSON-js/blob/master/json2.js
 * Only using for parse method when parsing data-setup attribute JSON.
 * @type {Object}
 * @suppress {undefinedVars}
 */
vjs.JSON;

/**
 * @suppress {undefinedVars}
 */
if (typeof window.JSON !== 'undefined' && window.JSON.parse === 'function') {
  vjs.JSON = window.JSON;

} else {
  vjs.JSON = {};

  var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

  vjs.JSON.parse = function (text, reviver) {
      var j;

      function walk(holder, key) {
          var k, v, value = holder[key];
          if (value && typeof value === 'object') {
              for (k in value) {
                  if (Object.prototype.hasOwnProperty.call(value, k)) {
                      v = walk(value, k);
                      if (v !== undefined) {
                          value[k] = v;
                      } else {
                          delete value[k];
                      }
                  }
              }
          }
          return reviver.call(holder, key, value);
      }
      text = String(text);
      cx.lastIndex = 0;
      if (cx.test(text)) {
          text = text.replace(cx, function (a) {
              return '\\u' +
                  ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
          });
      }

      if (/^[\],:{}\s]*$/
              .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                  .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                  .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

          j = eval('(' + text + ')');

          return typeof reviver === 'function' ?
              walk({'': j}, '') : j;
      }

      throw new SyntaxError('JSON.parse(): invalid or malformed JSON data');
  };
}
/**
 * @fileoverview Functions for automatically setting up a player
 * based on the data-setup attribute of the video tag
 */

// Automatically set up any tags that have a data-setup attribute
vjs.autoSetup = function(){
  var options, vid, player,
      vids = document.getElementsByTagName('video');

  // Check if any media elements exist
  if (vids && vids.length > 0) {

    for (var i=0,j=vids.length; i<j; i++) {
      vid = vids[i];

      // Check if element exists, has getAttribute func.
      // IE seems to consider typeof el.getAttribute == 'object' instead of 'function' like expected, at least when loading the player immediately.
      if (vid && vid.getAttribute) {

        // Make sure this player hasn't already been set up.
        if (vid['player'] === undefined) {
          options = vid.getAttribute('data-setup');

          // Check if data-setup attr exists.
          // We only auto-setup if they've added the data-setup attr.
          if (options !== null) {

            // Parse options JSON
            // If empty string, make it a parsable json object.
            options = vjs.JSON.parse(options || '{}');

            // Create new video.js instance.
            player = videojs(vid, options);
          }
        }

      // If getAttribute isn't defined, we need to wait for the DOM.
      } else {
        vjs.autoSetupTimeout(1);
        break;
      }
    }

  // No videos were found, so keep looping unless page is finisehd loading.
  } else if (!vjs.windowLoaded) {
    vjs.autoSetupTimeout(1);
  }
};

// Pause to let the DOM keep processing
vjs.autoSetupTimeout = function(wait){
  setTimeout(vjs.autoSetup, wait);
};

if (document.readyState === 'complete') {
  vjs.windowLoaded = true;
} else {
  vjs.one(window, 'load', function(){
    vjs.windowLoaded = true;
  });
}

// Run Auto-load players
// You have to wait at least once in case this script is loaded after your video in the DOM (weird behavior only with minified version)
vjs.autoSetupTimeout(1);
vjs.plugin = function(name, init){
  vjs.Player.prototype[name] = init;
};
