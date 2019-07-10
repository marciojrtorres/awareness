/* eslint-disable */
const This = {};

This.createjs = This.createjs || {};

(function () {
	var s = This.createjs.SoundJS = This.createjs.SoundJS || {};
	s.version ="1.0.0"; 
	s.buildDate ="Thu, 14 Sep 2017 19:47:47 GMT"; 

})();

This.createjs = This.createjs||{};
This.createjs.extend = function(subclass, superclass) {
	"use strict";

	function o() { this.constructor = subclass; }
	o.prototype = superclass.prototype;
	return (subclass.prototype = new o());
};

This.createjs = This.createjs||{};
This.createjs.promote = function(subclass, prefix) {
	"use strict";

	var subP = subclass.prototype, supP = (Object.getPrototypeOf&&Object.getPrototypeOf(subP))||subP.__proto__;
	if (supP) {
		subP[(prefix+="_") + "constructor"] = supP.constructor; 
		for (var n in supP) {
			if (subP.hasOwnProperty(n) && (typeof supP[n] == "function")) { subP[prefix + n] = supP[n]; }
		}
	}
	return subclass;
};

This.createjs = This.createjs||{};
This.createjs.deprecate = function(fallbackMethod, name) {
	"use strict";
	return function() {
		var msg = "Deprecated property or method '"+name+"'. See docs for info.";
		console && (console.warn ? console.warn(msg) : console.log(msg));
		return fallbackMethod && fallbackMethod.apply(this, arguments);
	}
};

This.createjs = This.createjs||{};
This.createjs.indexOf = function (array, searchElement){
	"use strict";

	for (var i = 0,l=array.length; i < l; i++) {
		if (searchElement === array[i]) {
			return i;
		}
	}
	return -1;
};

This.createjs = This.createjs||{};

(function() {
	"use strict";
	This.createjs.proxy = function (method, scope) {
		var aArgs = Array.prototype.slice.call(arguments, 2);
		return function () {
			return method.apply(scope, Array.prototype.slice.call(arguments, 0).concat(aArgs));
		};
	}

}());

This.createjs = This.createjs||{};
(function() {
	"use strict";
	function BrowserDetect() {
		throw "BrowserDetect cannot be instantiated";
	};

	var agent = BrowserDetect.agent = navigator.userAgent;
	BrowserDetect.isWindowPhone = (agent.indexOf("IEMobile") > -1) || (agent.indexOf("Windows Phone") > -1);
	BrowserDetect.isFirefox = (agent.indexOf("Firefox") > -1);
	BrowserDetect.isOpera = false;
	BrowserDetect.isChrome = (agent.indexOf("Chrome") > -1);  
	BrowserDetect.isIOS = (agent.indexOf("iPod") > -1 || agent.indexOf("iPhone") > -1 || agent.indexOf("iPad") > -1) && !BrowserDetect.isWindowPhone;
	BrowserDetect.isAndroid = (agent.indexOf("Android") > -1) && !BrowserDetect.isWindowPhone;
	BrowserDetect.isBlackberry = (agent.indexOf("Blackberry") > -1);

	This.createjs.BrowserDetect = BrowserDetect;

}());

This.createjs = This.createjs||{};

(function() {
	"use strict";
	function EventDispatcher() {
		this._listeners = null;
		this._captureListeners = null;
	}
	var p = EventDispatcher.prototype;

	EventDispatcher.initialize = function(target) {
		target.addEventListener = p.addEventListener;
		target.on = p.on;
		target.removeEventListener = target.off =  p.removeEventListener;
		target.removeAllEventListeners = p.removeAllEventListeners;
		target.hasEventListener = p.hasEventListener;
		target.dispatchEvent = p.dispatchEvent;
		target._dispatchEvent = p._dispatchEvent;
		target.willTrigger = p.willTrigger;
	};
	

	p.addEventListener = function(type, listener, useCapture) {
		var listeners;
		if (useCapture) {
			listeners = this._captureListeners = this._captureListeners||{};
		} else {
			listeners = this._listeners = this._listeners||{};
		}
		var arr = listeners[type];
		if (arr) { this.removeEventListener(type, listener, useCapture); }
		arr = listeners[type]; 
		if (!arr) { listeners[type] = [listener];  }
		else { arr.push(listener); }
		return listener;
	};
	

	p.on = function(type, listener, scope, once, data, useCapture) {
		if (listener.handleEvent) {
			scope = scope||listener;
			listener = listener.handleEvent;
		}
		scope = scope||this;
		return this.addEventListener(type, function(evt) {
				listener.call(scope, evt, data);
				once&&evt.remove();
			}, useCapture);
	};
	p.removeEventListener = function(type, listener, useCapture) {
		var listeners = useCapture ? this._captureListeners : this._listeners;
		if (!listeners) { return; }
		var arr = listeners[type];
		if (!arr) { return; }
		for (var i=0,l=arr.length; i<l; i++) {
			if (arr[i] == listener) {
				if (l==1) { delete(listeners[type]); } 
				else { arr.splice(i,1); }
				break;
			}
		}
	};
	

	p.off = p.removeEventListener;
	p.removeAllEventListeners = function(type) {
		if (!type) { this._listeners = this._captureListeners = null; }
		else {
			if (this._listeners) { delete(this._listeners[type]); }
			if (this._captureListeners) { delete(this._captureListeners[type]); }
		}
	};
	p.dispatchEvent = function(eventObj, bubbles, cancelable) {
		if (typeof eventObj == "string") {
			
			var listeners = this._listeners;
			if (!bubbles && (!listeners || !listeners[eventObj])) { return true; }
			eventObj = new This.createjs.Event(eventObj, bubbles, cancelable);
		} else if (eventObj.target && eventObj.clone) {
			
			eventObj = eventObj.clone();
		}
		
		
		try { eventObj.target = this; } catch (e) {} 

		if (!eventObj.bubbles || !this.parent) {
			this._dispatchEvent(eventObj, 2);
		} else {
			var top=this, list=[top];
			while (top.parent) { list.push(top = top.parent); }
			var i, l=list.length;

			
			for (i=l-1; i>=0 && !eventObj.propagationStopped; i--) {
				list[i]._dispatchEvent(eventObj, 1+(i==0));
			}
			
			for (i=1; i<l && !eventObj.propagationStopped; i++) {
				list[i]._dispatchEvent(eventObj, 3);
			}
		}
		return !eventObj.defaultPrevented;
	};
	p.hasEventListener = function(type) {
		var listeners = this._listeners, captureListeners = this._captureListeners;
		return !!((listeners && listeners[type]) || (captureListeners && captureListeners[type]));
	};
	

	p.willTrigger = function(type) {
		var o = this;
		while (o) {
			if (o.hasEventListener(type)) { return true; }
			o = o.parent;
		}
		return false;
	};
	p.toString = function() {
		return "[EventDispatcher]";
	};
	p._dispatchEvent = function(eventObj, eventPhase) {
		var l, arr, listeners = (eventPhase <= 2) ? this._captureListeners : this._listeners;
		if (eventObj && listeners && (arr = listeners[eventObj.type]) && (l=arr.length)) {
			try { eventObj.currentTarget = this; } catch (e) {}
			try { eventObj.eventPhase = eventPhase|0; } catch (e) {}
			eventObj.removed = false;
			
			arr = arr.slice(); 
			for (var i=0; i<l && !eventObj.immediatePropagationStopped; i++) {
				var o = arr[i];
				if (o.handleEvent) { o.handleEvent(eventObj); }
				else { o(eventObj); }
				if (eventObj.removed) {
					this.off(eventObj.type, o, eventPhase==1);
					eventObj.removed = false;
				}
			}
		}
		if (eventPhase === 2) { this._dispatchEvent(eventObj, 2.1); }
	};
	This.createjs.EventDispatcher = EventDispatcher;
}());

This.createjs = This.createjs||{};

(function() {
	"use strict";

	function Event(type, bubbles, cancelable) {
		
	
	
	
		this.type = type;
	
	
		this.target = null;
	
	
		this.currentTarget = null;
	
	
		this.eventPhase = 0;
	
	
		this.bubbles = !!bubbles;
	
	
		this.cancelable = !!cancelable;
	
	
		this.timeStamp = (new Date()).getTime();
	
	
		this.defaultPrevented = false;
	
	
		this.propagationStopped = false;
	
	
		this.immediatePropagationStopped = false;
		
	
		this.removed = false;
	}
	var p = Event.prototype;

	p.preventDefault = function() {
		this.defaultPrevented = this.cancelable&&true;
	};
	p.stopPropagation = function() {
		this.propagationStopped = true;
	};
	p.stopImmediatePropagation = function() {
		this.immediatePropagationStopped = this.propagationStopped = true;
	};
	

	p.remove = function() {
		this.removed = true;
	};
	

	p.clone = function() {
		return new Event(this.type, this.bubbles, this.cancelable);
	};
	

	p.set = function(props) {
		for (var n in props) { this[n] = props[n]; }
		return this;
	};
	p.toString = function() {
		return "[Event (type="+this.type+")]";
	};

	This.createjs.Event = Event;
}());

This.createjs = This.createjs||{};

(function() {
	"use strict";
	function ErrorEvent(title, message, data) {
		this.Event_constructor("error");

	
		this.title = title;

	
		this.message = message;

	
		this.data = data;
	}

	var p = This.createjs.extend(ErrorEvent, This.createjs.Event);

	p.clone = function() {
		return new This.createjs.ErrorEvent(this.title, this.message, this.data);
	};

	This.createjs.ErrorEvent = This.createjs.promote(ErrorEvent, "Event");

}());

This.createjs = This.createjs || {};

(function (scope) {
	"use strict";

	

	function ProgressEvent(loaded, total) {
		this.Event_constructor("progress");

	
		this.loaded = loaded;

	
		this.total = (total == null) ? 1 : total;

	
		this.progress = (total == 0) ? 0 : this.loaded / this.total;
	};

	var p = This.createjs.extend(ProgressEvent, This.createjs.Event);
	p.clone = function() {
		return new This.createjs.ProgressEvent(this.loaded, this.total);
	};

	This.createjs.ProgressEvent = This.createjs.promote(ProgressEvent, "Event");

}(window));

This.createjs = This.createjs || {};

(function () {
	"use strict";
	function LoadItem() {
	
		this.src = null;

	
		this.type = null;

	
		this.id = null;

	
		this.maintainOrder = false;

	
		this.callback = null;

	
		this.data = null;

	
		this.method = This.createjs.Methods.GET;

	
		this.values = null;

	
		this.headers = null;

	
		this.withCredentials = false;

	
		this.mimeType = null;

	
		this.crossOrigin = null;

	
		this.loadTimeout = s.LOAD_TIMEOUT_DEFAULT;
	};

	var p = LoadItem.prototype = {};
	var s = LoadItem;
	s.LOAD_TIMEOUT_DEFAULT = 8000;
	s.create = function (value) {
		if (typeof value == "string") {
			var item = new LoadItem();
			item.src = value;
			return item;
		} else if (value instanceof s) {
			return value;
		} else if (value instanceof Object && value.src) {
			if (value.loadTimeout == null) {
				value.loadTimeout = s.LOAD_TIMEOUT_DEFAULT;
			}
			return value;
		} else {
			throw new Error("Type not recognized.");
		}
	};
	p.set = function(props) {
		for (var n in props) { this[n] = props[n]; }
		return this;
	};

	This.createjs.LoadItem = s;

}());

This.createjs = This.createjs || {};

(function() {
	var s = {};
	s.POST = "POST";
	s.GET = "GET";

	This.createjs.Methods = s;
}());

This.createjs = This.createjs || {};

(function() {
	var s = {};
	s.BINARY = "binary";
	s.CSS = "css";
	s.FONT = "font";
	s.FONTCSS = "fontcss";
	s.IMAGE = "image";
	s.JAVASCRIPT = "javascript";
	s.JSON = "json";
	s.JSONP = "jsonp";
	s.MANIFEST = "manifest";
	s.SOUND = "sound";
	s.VIDEO = "video";
	s.SPRITESHEET = "spritesheet";
	s.SVG = "svg";
	s.TEXT = "text";
	s.XML = "xml";

	This.createjs.Types = s;
}());

(function () {
	var s = {};

	s.a = function() {
		return s.el("a");
	}

	s.svg = function() {
		return s.el("svg");
	}

	s.object = function() {
		return s.el("object");
	}

	s.image = function() {
		return s.el("image");
	}

	s.img = function() {
		return s.el("img");
	}

	s.style = function() {
		return s.el("style");
	}

	s.link = function() {
		return s.el("link");
	}

	s.script = function() {
		return s.el("script");
	}

	s.audio = function() {
		return s.el("audio");
	}

	s.video = function() {
		return s.el("video");
	}

	s.text = function(value) {
		return document.createTextNode(value);
	}

	s.el = function(name) {
		return document.createElement(name);
	}

	This.createjs.Elements = s;

}());

(function () {
	var s = {
		container: null
	};

	s.appendToHead = function (el) {
		s.getHead().appendChild(el);
	}

	s.appendToBody = function (el) {
		if (s.container == null) {
			s.container = document.createElement("div");
			s.container.id = "preloadjs-container";
			var style = s.container.style;
			style.visibility = "hidden";
			style.position = "absolute";
			style.width = s.container.style.height = "10px";
			style.overflow = "hidden";
			style.transform = style.msTransform = style.webkitTransform = style.oTransform = "translate(-10px, -10px)"; 
			s.getBody().appendChild(s.container);
		}
		s.container.appendChild(el);
	}

	s.getHead = function () {
		return document.head || document.getElementsByTagName("head")[0];
	}

	s.getBody = function () {
		return document.body || document.getElementsByTagName("body")[0];
	}

	s.removeChild = function(el) {
		if (el.parent) {
			el.parent.removeChild(el);
		}
	}
	s.isImageTag = function(item) {
		return item instanceof HTMLImageElement;
	};
	s.isAudioTag = function(item) {
		return item instanceof HTMLAudioElement;
	};
	s.isVideoTag = function(item) {
		return item instanceof HTMLVideoElement;
	};

	This.createjs.DomUtils = s;

}());

(function () {
	var s = {};
	s.isBinary = function (type) {
		switch (type) {
			case This.createjs.Types.IMAGE:
			case This.createjs.Types.BINARY:
				return true;
			default:
				return false;
		}
	};
	s.isText = function (type) {
		switch (type) {
			case This.createjs.Types.TEXT:
			case This.createjs.Types.JSON:
			case This.createjs.Types.MANIFEST:
			case This.createjs.Types.XML:
			case This.createjs.Types.CSS:
			case This.createjs.Types.SVG:
			case This.createjs.Types.JAVASCRIPT:
			case This.createjs.Types.SPRITESHEET:
				return true;
			default:
				return false;
		}
	};
	s.getTypeByExtension = function (extension) {
		if (extension == null) {
			return This.createjs.Types.TEXT;
		}

		switch (extension.toLowerCase()) {
			case "jpeg":
			case "jpg":
			case "gif":
			case "png":
			case "webp":
			case "bmp":
				return This.createjs.Types.IMAGE;
			case "ogg":
			case "mp3":
			case "webm":
				return This.createjs.Types.SOUND;
			case "mp4":
			case "webm":
			case "ts":
				return This.createjs.Types.VIDEO;
			case "json":
				return This.createjs.Types.JSON;
			case "xml":
				return This.createjs.Types.XML;
			case "css":
				return This.createjs.Types.CSS;
			case "js":
				return This.createjs.Types.JAVASCRIPT;
			case 'svg':
				return This.createjs.Types.SVG;
			default:
				return This.createjs.Types.TEXT;
		}
	};

	This.createjs.RequestUtils = s;

}());

(function () {
	var s = {};
	s.ABSOLUTE_PATT = /^(?:\w+:)?\/{2}/i;
	s.RELATIVE_PATT = (/^[./]*?\//i);
	s.EXTENSION_PATT = /\/?[^/]+\.(\w{1,5})$/i;
	s.parseURI = function (path) {
		var info = {
			absolute: false,
			relative: false,
			protocol: null,
			hostname: null,
			port: null,
			pathname: null,
			search: null,
			hash: null,
			host: null
		};

		if (path == null) { return info; }

		
		var parser = This.createjs.Elements.a();
		parser.href = path;

		for (var n in info) {
			if (n in parser) {
				info[n] = parser[n];
			}
		}

		
		var queryIndex = path.indexOf("?");
		if (queryIndex > -1) {
			path = path.substr(0, queryIndex);
		}

		
		var match;
		if (s.ABSOLUTE_PATT.test(path)) {
			info.absolute = true;

			
		} else if (s.RELATIVE_PATT.test(path)) {
			info.relative = true;
		}

		
		if (match = path.match(s.EXTENSION_PATT)) {
			info.extension = match[1].toLowerCase();
		}

		return info;
	};
	s.formatQueryString = function (data, query) {
		if (data == null) {
			throw new Error("You must specify data.");
		}
		var params = [];
		for (var n in data) {
			params.push(n + "=" + escape(data[n]));
		}
		if (query) {
			params = params.concat(query);
		}
		return params.join("&");
	};
	s.buildURI = function (src, data) {
		if (data == null) {
			return src;
		}

		var query = [];
		var idx = src.indexOf("?");

		if (idx != -1) {
			var q = src.slice(idx + 1);
			query = query.concat(q.split("&"));
		}

		if (idx != -1) {
			return src.slice(0, idx) + "?" + this.formatQueryString(data, query);
		} else {
			return src + "?" + this.formatQueryString(data, query);
		}
	};
	s.isCrossDomain = function (item) {
		var target = This.createjs.Elements.a();
		target.href = item.src;

		var host = This.createjs.Elements.a();
		host.href = location.href;

		var crossdomain = (target.hostname != "") &&
			(target.port != host.port ||
			target.protocol != host.protocol ||
			target.hostname != host.hostname);
		return crossdomain;
	};
	s.isLocal = function (item) {
		var target = This.createjs.Elements.a();
		target.href = item.src;
		return target.hostname == "" && target.protocol == "file:";
	};

	This.createjs.URLUtils = s;

}());

This.createjs = This.createjs || {};

(function () {
	"use strict";

	function AbstractLoader(loadItem, preferXHR, type) {
		this.EventDispatcher_constructor();

		
	
		this.loaded = false;

	
		this.canceled = false;

	
		this.progress = 0;

	
		this.type = type;

	
		this.resultFormatter = null;

		
	
		if (loadItem) {
			this._item = This.createjs.LoadItem.create(loadItem);
		} else {
			this._item = null;
		}

	
		this._preferXHR = preferXHR;

	
		this._result = null;

	
		this._rawResult = null;

	
		this._loadedItems = null;

	
		this._tagSrcAttribute = null;

	
		this._tag = null;
	};

	var p = This.createjs.extend(AbstractLoader, This.createjs.EventDispatcher);
	var s = AbstractLoader;

	
	try {
		Object.defineProperties(s, {
			POST: { get: This.createjs.deprecate(function() { return This.createjs.Methods.POST; }, "AbstractLoader.POST") },
			GET: { get: This.createjs.deprecate(function() { return This.createjs.Methods.GET; }, "AbstractLoader.GET") },

			BINARY: { get: This.createjs.deprecate(function() { return This.createjs.Types.BINARY; }, "AbstractLoader.BINARY") },
			CSS: { get: This.createjs.deprecate(function() { return This.createjs.Types.CSS; }, "AbstractLoader.CSS") },
			FONT: { get: This.createjs.deprecate(function() { return This.createjs.Types.FONT; }, "AbstractLoader.FONT") },
			FONTCSS: { get: This.createjs.deprecate(function() { return This.createjs.Types.FONTCSS; }, "AbstractLoader.FONTCSS") },
			IMAGE: { get: This.createjs.deprecate(function() { return This.createjs.Types.IMAGE; }, "AbstractLoader.IMAGE") },
			JAVASCRIPT: { get: This.createjs.deprecate(function() { return This.createjs.Types.JAVASCRIPT; }, "AbstractLoader.JAVASCRIPT") },
			JSON: { get: This.createjs.deprecate(function() { return This.createjs.Types.JSON; }, "AbstractLoader.JSON") },
			JSONP: { get: This.createjs.deprecate(function() { return This.createjs.Types.JSONP; }, "AbstractLoader.JSONP") },
			MANIFEST: { get: This.createjs.deprecate(function() { return This.createjs.Types.MANIFEST; }, "AbstractLoader.MANIFEST") },
			SOUND: { get: This.createjs.deprecate(function() { return This.createjs.Types.SOUND; }, "AbstractLoader.SOUND") },
			VIDEO: { get: This.createjs.deprecate(function() { return This.createjs.Types.VIDEO; }, "AbstractLoader.VIDEO") },
			SPRITESHEET: { get: This.createjs.deprecate(function() { return This.createjs.Types.SPRITESHEET; }, "AbstractLoader.SPRITESHEET") },
			SVG: { get: This.createjs.deprecate(function() { return This.createjs.Types.SVG; }, "AbstractLoader.SVG") },
			TEXT: { get: This.createjs.deprecate(function() { return This.createjs.Types.TEXT; }, "AbstractLoader.TEXT") },
			XML: { get: This.createjs.deprecate(function() { return This.createjs.Types.XML; }, "AbstractLoader.XML") }
		});
	} catch (e) {}
	p.getItem = function () {
		return this._item;
	};
	p.getResult = function (raw) {
		return raw ? this._rawResult : this._result;
	};
	p.getTag = function () {
		return this._tag;
	};
	p.setTag = function(tag) {
	  this._tag = tag;
	};
	p.load = function () {
		this._createRequest();

		this._request.on("complete", this, this);
		this._request.on("progress", this, this);
		this._request.on("loadStart", this, this);
		this._request.on("abort", this, this);
		this._request.on("timeout", this, this);
		this._request.on("error", this, this);

		var evt = new This.createjs.Event("initialize");
		evt.loader = this._request;
		this.dispatchEvent(evt);

		this._request.load();
	};
	p.cancel = function () {
		this.canceled = true;
		this.destroy();
	};
	p.destroy = function() {
		if (this._request) {
			this._request.removeAllEventListeners();
			this._request.destroy();
		}

		this._request = null;

		this._item = null;
		this._rawResult = null;
		this._result = null;

		this._loadItems = null;

		this.removeAllEventListeners();
	};
	p.getLoadedItems = function () {
		return this._loadedItems;
	};
	

	p._createRequest = function() {
		if (!this._preferXHR) {
			this._request = new This.createjs.TagRequest(this._item, this._tag || this._createTag(), this._tagSrcAttribute);
		} else {
			this._request = new This.createjs.XHRRequest(this._item);
		}
	};
	p._createTag = function(src) { return null; };
	p._sendLoadStart = function () {
		if (this._isCanceled()) { return; }
		this.dispatchEvent("loadstart");
	};
	p._sendProgress = function (value) {
		if (this._isCanceled()) { return; }
		var event = null;
		if (typeof(value) == "number") {
			this.progress = value;
			event = new This.createjs.ProgressEvent(this.progress);
		} else {
			event = value;
			this.progress = value.loaded / value.total;
			event.progress = this.progress;
			if (isNaN(this.progress) || this.progress == Infinity) { this.progress = 0; }
		}
		this.hasEventListener("progress") && this.dispatchEvent(event);
	};
	p._sendComplete = function () {
		if (this._isCanceled()) { return; }

		this.loaded = true;

		var event = new This.createjs.Event("complete");
		event.rawResult = this._rawResult;

		if (this._result != null) {
			event.result = this._result;
		}

		this.dispatchEvent(event);
	};
	p._sendError = function (event) {
		if (this._isCanceled() || !this.hasEventListener("error")) { return; }
		if (event == null) {
			event = new This.createjs.ErrorEvent("PRELOAD_ERROR_EMPTY"); 
		}
		this.dispatchEvent(event);
	};
	p._isCanceled = function () {
		if (This.createjs == null || This.canceled) {
			return true;
		}
		return false;
	};
	p.resultFormatter = null;
	p.handleEvent = function (event) {
		switch (event.type) {
			case "complete":
				this._rawResult = event.target._response;
				var result = this.resultFormatter && this.resultFormatter(this);
				
				if (result instanceof Function) {
					result.call(this,
							This.createjs.proxy(this._resultFormatSuccess, this),
							This.createjs.proxy(this._resultFormatFailed, this)
					);
				
				} else {
					this._result =  result || this._rawResult;
					this._sendComplete();
				}
				break;
			case "progress":
				this._sendProgress(event);
				break;
			case "error":
				this._sendError(event);
				break;
			case "loadstart":
				this._sendLoadStart();
				break;
			case "abort":
			case "timeout":
				if (!this._isCanceled()) {
					this.dispatchEvent(new This.createjs.ErrorEvent("PRELOAD_" + event.type.toUpperCase() + "_ERROR"));
				}
				break;
		}
	};
	p._resultFormatSuccess = function (result) {
		this._result = result;
		this._sendComplete();
	};
	p._resultFormatFailed = function (event) {
		this._sendError(event);
	};
	p.toString = function () {
		return "[PreloadJS AbstractLoader]";
	};

	This.createjs.AbstractLoader = This.createjs.promote(AbstractLoader, "EventDispatcher");

}());

This.createjs = This.createjs || {};

(function () {
	"use strict";

	

	function AbstractMediaLoader(loadItem, preferXHR, type) {
		this.AbstractLoader_constructor(loadItem, preferXHR, type);

		
		this.resultFormatter = this._formatResult;

		
		this._tagSrcAttribute = "src";

        this.on("initialize", this._updateXHR, this);
	};

	var p = This.createjs.extend(AbstractMediaLoader, This.createjs.AbstractLoader);

	
	
	p.load = function () {
		
		if (!this._tag) {
			this._tag = this._createTag(this._item.src);
		}

		this._tag.preload = "auto";
		this._tag.load();

		this.AbstractLoader_load();
	};

	

	p._createTag = function () {};
	p._createRequest = function() {
		if (!this._preferXHR) {
			this._request = new This.createjs.MediaTagRequest(this._item, this._tag || this._createTag(), this._tagSrcAttribute);
		} else {
			this._request = new This.createjs.XHRRequest(this._item);
		}
	};

    
   
    p._updateXHR = function (event) {
        
        if (event.loader.setResponseType) {
            event.loader.setResponseType("blob");
        }
    };
	p._formatResult = function (loader) {
		this._tag.removeEventListener && this._tag.removeEventListener("canplaythrough", this._loadedHandler);
		this._tag.onstalled = null;
		if (this._preferXHR) {
            var result = loader.getResult(true);

			loader.getTag().src = URL.createObjectURL(result);
		}
		return loader.getTag();
	};

	This.createjs.AbstractMediaLoader = This.createjs.promote(AbstractMediaLoader, "AbstractLoader");

}());

This.createjs = This.createjs || {};

(function () {
	"use strict";
	var AbstractRequest = function (item) {
		this._item = item;
	};

	var p = This.createjs.extend(AbstractRequest, This.createjs.EventDispatcher);

	

	p.load =  function() {};
	p.destroy = function() {};
	p.cancel = function() {};

	This.createjs.AbstractRequest = This.createjs.promote(AbstractRequest, "EventDispatcher");

}());

This.createjs = This.createjs || {};

(function () {
	"use strict";

	

	function TagRequest(loadItem, tag, srcAttribute) {
		this.AbstractRequest_constructor(loadItem);

		
	
		this._tag = tag;

	
		this._tagSrcAttribute = srcAttribute;

	
		this._loadedHandler = This.createjs.proxy(this._handleTagComplete, this);

	
		this._addedToDOM = false;

	};

	var p = This.createjs.extend(TagRequest, This.createjs.AbstractRequest);

	
	p.load = function () {
		this._tag.onload = This.createjs.proxy(this._handleTagComplete, this);
		this._tag.onreadystatechange = This.createjs.proxy(this._handleReadyStateChange, this);
		this._tag.onerror = This.createjs.proxy(this._handleError, this);

		var evt = new This.createjs.Event("initialize");
		evt.loader = this._tag;

		this.dispatchEvent(evt);

		this._loadTimeout = setTimeout(This.createjs.proxy(this._handleTimeout, this), this._item.loadTimeout);

		this._tag[this._tagSrcAttribute] = this._item.src;

		
		if (this._tag.parentNode == null) {
			This.createjs.DomUtils.appendToBody(this._tag);
			this._addedToDOM = true;
		}
	};

	p.destroy = function() {
		this._clean();
		this._tag = null;

		this.AbstractRequest_destroy();
	};

	

	p._handleReadyStateChange = function () {
		clearTimeout(this._loadTimeout);
		
		var tag = this._tag;

		
		if (tag.readyState == "loaded" || tag.readyState == "complete") {
			this._handleTagComplete();
		}
	};
	p._handleError = function() {
		this._clean();
		this.dispatchEvent("error");
	};
	p._handleTagComplete = function () {
		this._rawResult = this._tag;
		this._result = this.resultFormatter && this.resultFormatter(this) || this._rawResult;

		this._clean();

		this.dispatchEvent("complete");
	};
	p._handleTimeout = function () {
		this._clean();
		this.dispatchEvent(new This.createjs.Event("timeout"));
	};
	p._clean = function() {
		this._tag.onload = null;
		this._tag.onreadystatechange = null;
		this._tag.onerror = null;
		if (this._addedToDOM && this._tag.parentNode != null) {
			this._tag.parentNode.removeChild(this._tag);
		}
		clearTimeout(this._loadTimeout);
	};
	p._handleStalled = function () {
		
	};

	This.createjs.TagRequest = This.createjs.promote(TagRequest, "AbstractRequest");

}());

This.createjs = This.createjs || {};

(function () {
	"use strict";

	

	function MediaTagRequest(loadItem, tag, srcAttribute) {
		this.AbstractRequest_constructor(loadItem);

		
		this._tag = tag;
		this._tagSrcAttribute = srcAttribute;
		this._loadedHandler = This.createjs.proxy(this._handleTagComplete, this);
	};

	var p = This.createjs.extend(MediaTagRequest, This.createjs.TagRequest);
	var s = MediaTagRequest;

	
	p.load = function () {
		var sc = This.createjs.proxy(this._handleStalled, this);
		this._stalledCallback = sc;

		var pc = This.createjs.proxy(this._handleProgress, this);
		this._handleProgress = pc;

		this._tag.addEventListener("stalled", sc);
		this._tag.addEventListener("progress", pc);

		
		
		this._tag.addEventListener && this._tag.addEventListener("canplaythrough", this._loadedHandler, false); 

		this.TagRequest_load();
	};

	
	p._handleReadyStateChange = function () {
		clearTimeout(this._loadTimeout);
		
		var tag = this._tag;

		
		if (tag.readyState == "loaded" || tag.readyState == "complete") {
			this._handleTagComplete();
		}
	};

	p._handleStalled = function () {
		
	};
	p._handleProgress = function (event) {
		if (!event || event.loaded > 0 && event.total == 0) {
			return; 
		}

		var newEvent = new This.createjs.ProgressEvent(event.loaded, event.total);
		this.dispatchEvent(newEvent);
	};

	
	p._clean = function () {
		this._tag.removeEventListener && this._tag.removeEventListener("canplaythrough", this._loadedHandler);
		this._tag.removeEventListener("stalled", this._stalledCallback);
		this._tag.removeEventListener("progress", this._progressCallback);

		this.TagRequest__clean();
	};

	This.createjs.MediaTagRequest = This.createjs.promote(MediaTagRequest, "TagRequest");

}());

This.createjs = This.createjs || {};

(function () {
	"use strict";

	function XHRRequest (item) {
		this.AbstractRequest_constructor(item);

		
	
		this._request = null;

	
		this._loadTimeout = null;

	
		this._xhrLevel = 1;

	
		this._response = null;

	
		this._rawResponse = null;

		this._canceled = false;

		
		this._handleLoadStartProxy = This.createjs.proxy(this._handleLoadStart, this);
		this._handleProgressProxy = This.createjs.proxy(this._handleProgress, this);
		this._handleAbortProxy = This.createjs.proxy(this._handleAbort, this);
		this._handleErrorProxy = This.createjs.proxy(this._handleError, this);
		this._handleTimeoutProxy = This.createjs.proxy(this._handleTimeout, this);
		this._handleLoadProxy = This.createjs.proxy(this._handleLoad, this);
		this._handleReadyStateChangeProxy = This.createjs.proxy(this._handleReadyStateChange, this);

		if (!this._createXHR(item)) {
			
		}
	};

	var p = This.createjs.extend(XHRRequest, This.createjs.AbstractRequest);

	XHRRequest.ACTIVEX_VERSIONS = [
		"Msxml2.XMLHTTP.6.0",
		"Msxml2.XMLHTTP.5.0",
		"Msxml2.XMLHTTP.4.0",
		"MSXML2.XMLHTTP.3.0",
		"MSXML2.XMLHTTP",
		"Microsoft.XMLHTTP"
	];

	p.getResult = function (raw) {
		if (raw && this._rawResponse) {
			return this._rawResponse;
		}
		return this._response;
	};

	
	p.cancel = function () {
		this.canceled = true;
		this._clean();
		this._request.abort();
	};

	
	p.load = function () {
		if (this._request == null) {
			this._handleError();
			return;
		}

		
		if (this._request.addEventListener != null) {
			this._request.addEventListener("loadstart", this._handleLoadStartProxy, false);
			this._request.addEventListener("progress", this._handleProgressProxy, false);
			this._request.addEventListener("abort", this._handleAbortProxy, false);
			this._request.addEventListener("error", this._handleErrorProxy, false);
			this._request.addEventListener("timeout", this._handleTimeoutProxy, false);

			
			this._request.addEventListener("load", this._handleLoadProxy, false);
			this._request.addEventListener("readystatechange", this._handleReadyStateChangeProxy, false);
		} else {
			
			this._request.onloadstart = this._handleLoadStartProxy;
			this._request.onprogress = this._handleProgressProxy;
			this._request.onabort = this._handleAbortProxy;
			this._request.onerror = this._handleErrorProxy;
			this._request.ontimeout = this._handleTimeoutProxy;

			
			this._request.onload = this._handleLoadProxy;
			this._request.onreadystatechange = this._handleReadyStateChangeProxy;
		}

		
		if (this._xhrLevel == 1) {
			this._loadTimeout = setTimeout(This.createjs.proxy(this._handleTimeout, this), this._item.loadTimeout);
		}

		
		try {
			if (!this._item.values) {
				this._request.send();
			} else {
				this._request.send(This.createjs.URLUtils.formatQueryString(this._item.values));
			}
		} catch (error) {
			this.dispatchEvent(new This.createjs.ErrorEvent("XHR_SEND", null, error));
		}
	};

	p.setResponseType = function (type) {
		
		if (type === 'blob') {
			type = URL ? 'blob' : 'arraybuffer';
			this._responseType = type;
		}
		this._request.responseType = type;
	};
	p.getAllResponseHeaders = function () {
		if (this._request.getAllResponseHeaders instanceof Function) {
			return this._request.getAllResponseHeaders();
		} else {
			return null;
		}
	};
	p.getResponseHeader = function (header) {
		if (this._request.getResponseHeader instanceof Function) {
			return this._request.getResponseHeader(header);
		} else {
			return null;
		}
	};

	p._handleProgress = function (event) {
		if (!event || event.loaded > 0 && event.total == 0) {
			return; 
		}

		var newEvent = new This.createjs.ProgressEvent(event.loaded, event.total);
		this.dispatchEvent(newEvent);
	};
	p._handleLoadStart = function (event) {
		clearTimeout(this._loadTimeout);
		this.dispatchEvent("loadstart");
	};
	p._handleAbort = function (event) {
		this._clean();
		this.dispatchEvent(new This.createjs.ErrorEvent("XHR_ABORTED", null, event));
	};
	p._handleError = function (event) {
		this._clean();
		this.dispatchEvent(new This.createjs.ErrorEvent(event.message));
	};
	p._handleReadyStateChange = function (event) {
		if (this._request.readyState == 4) {
			this._handleLoad();
		}
	};
	p._handleLoad = function (event) {
		if (this.loaded) {
			return;
		}
		this.loaded = true;

		var error = this._checkError();
		if (error) {
			this._handleError(error);
			return;
		}

		this._response = this._getResponse();
		
		if (this._responseType === 'arraybuffer') {
			try {
				this._response = new Blob([this._response]);
			} catch (e) {
				
				
				if (e.name === 'TypeError' && BlobBuilder) {
					var builder = new BlobBuilder();
					builder.append(this._response);
					this._response = builder.getBlob();
				}
			}
		}
		this._clean();

		this.dispatchEvent(new This.createjs.Event("complete"));
	};
	p._handleTimeout = function (event) {
		this._clean();
		this.dispatchEvent(new This.createjs.ErrorEvent("PRELOAD_TIMEOUT", null, event));
	};

	p._checkError = function () {
		var status = parseInt(this._request.status);
		if (status >= 400 && status <= 599) {
			return new Error(status);
		} else if (status == 0) {
			if ((/^https?:/).test(location.protocol)) { return new Error(0); }
			return null; 
		} else {
			return null;
		}
	};

	p._getResponse = function () {
		if (this._response != null) {
			return this._response;
		}

		if (this._request.response != null) {
			return this._request.response;
		}

		
		try {
			if (this._request.responseText != null) {
				return this._request.responseText;
			}
		} catch (e) {
		}

		
		try {
			if (this._request.responseXML != null) {
				return this._request.responseXML;
			}
		} catch (e) {
		}

		return null;
	};
	p._createXHR = function (item) {
		
		var crossdomain = This.createjs.URLUtils.isCrossDomain(item);
		var headers = {};

		
		var req = new XMLHttpRequest();
		
		
		if (item.mimeType == null && This.createjs.RequestUtils.isText(item.type)) {
			item.mimeType = "text/plain; charset=utf-8";
		}

		
		if (item.mimeType && req.overrideMimeType) {
			req.overrideMimeType(item.mimeType);
		}

		
		this._xhrLevel = (typeof req.responseType === "string") ? 2 : 1;

		var src = null;
		if (item.method == This.createjs.Methods.GET) {
			src = This.createjs.URLUtils.buildURI(item.src, item.values);
		} else {
			src = item.src;
		}

		
		req.open(item.method || This.createjs.Methods.GET, src, true);

		if (crossdomain && req instanceof XMLHttpRequest && this._xhrLevel == 1) {
			headers["Origin"] = location.origin;
		}

		
		if (item.values && item.method == This.createjs.Methods.POST) {
			headers["Content-Type"] = "application/x-www-form-urlencoded";
		}

		if (!crossdomain && !headers["X-Requested-With"]) {
			headers["X-Requested-With"] = "XMLHttpRequest";
		}

		if (item.headers) {
			for (var n in item.headers) {
				headers[n] = item.headers[n];
			}
		}

		for (n in headers) {
			req.setRequestHeader(n, headers[n])
		}

		if (req instanceof XMLHttpRequest && item.withCredentials !== undefined) {
			req.withCredentials = item.withCredentials;
		}

		this._request = req;

		return true;
	};
	p._clean = function () {
		clearTimeout(this._loadTimeout);

		if (this._request.removeEventListener != null) {
			this._request.removeEventListener("loadstart", this._handleLoadStartProxy);
			this._request.removeEventListener("progress", this._handleProgressProxy);
			this._request.removeEventListener("abort", this._handleAbortProxy);
			this._request.removeEventListener("error", this._handleErrorProxy);
			this._request.removeEventListener("timeout", this._handleTimeoutProxy);
			this._request.removeEventListener("load", this._handleLoadProxy);
			this._request.removeEventListener("readystatechange", this._handleReadyStateChangeProxy);
		} else {
			this._request.onloadstart = null;
			this._request.onprogress = null;
			this._request.onabort = null;
			this._request.onerror = null;
			this._request.ontimeout = null;
			this._request.onload = null;
			this._request.onreadystatechange = null;
		}
	};

	p.toString = function () {
		return "[PreloadJS XHRRequest]";
	};

	This.createjs.XHRRequest = This.createjs.promote(XHRRequest, "AbstractRequest");

}());

This.createjs = This.createjs || {};

(function () {
	"use strict";

	

	function SoundLoader(loadItem, preferXHR) {
		this.AbstractMediaLoader_constructor(loadItem, preferXHR, This.createjs.Types.SOUND);

		
		if (This.createjs.DomUtils.isAudioTag(loadItem)) {
			this._tag = loadItem;
		} else if (This.createjs.DomUtils.isAudioTag(loadItem.src)) {
			this._tag = loadItem;
		} else if (This.createjs.DomUtils.isAudioTag(loadItem.tag)) {
			this._tag = This.createjs.DomUtils.isAudioTag(loadItem) ? loadItem : loadItem.src;
		}

		if (this._tag != null) {
			this._preferXHR = false;
		}
	};

	var p = This.createjs.extend(SoundLoader, This.createjs.AbstractMediaLoader);
	var s = SoundLoader;

	

	s.canLoadItem = function (item) {
		return item.type == This.createjs.Types.SOUND;
	};

	
	p._createTag = function (src) {
		var tag = This.createjs.Elements.audio();
		tag.autoplay = false;
		tag.preload = "none";

		
		tag.src = src;
		return tag;
	};

	This.createjs.SoundLoader = This.createjs.promote(SoundLoader, "AbstractMediaLoader");

}());
This.createjs = This.createjs || {};

(function () {
	"use strict";

	
	var PlayPropsConfig = function () {

	
		this.interrupt = null;

	
		this.delay = null;

	
		this.offset = null;

	
		this.loop = null;

	
		this.volume = null;

	
		this.pan = null;

	
		this.startTime = null;

	
		this.duration = null;
	};
	var p = PlayPropsConfig.prototype = {};
	var s = PlayPropsConfig;
	s.create = function (value) {
		if (typeof(value) === "string") {
			
			console && (console.warn || console.log)("Deprecated behaviour. Sound.play takes a configuration object instead of individual arguments. See docs for info.");
			return new This.createjs.PlayPropsConfig().set({interrupt:value});
		} else if (value == null || value instanceof s || value instanceof Object) {
			return new This.createjs.PlayPropsConfig().set(value);
		} else if (value == null) {
			throw new Error("PlayProps configuration not recognized.");
		}
	};

	p.set = function(props) {
		if (props != null) {
			for (var n in props) { this[n] = props[n]; }
		}
		return this;
	};

	p.toString = function() {
		return "[PlayPropsConfig]";
	};

	This.createjs.PlayPropsConfig = s;

}());

This.createjs = This.createjs || {};

(function () {
	"use strict";
	function Sound() {
		throw "Sound cannot be instantiated";
	}

	var s = Sound;
	s.INTERRUPT_ANY = "any";
	s.INTERRUPT_EARLY = "early";
	s.INTERRUPT_LATE = "late";
	s.INTERRUPT_NONE = "none";
	s.PLAY_INITED = "playInited";
	s.PLAY_SUCCEEDED = "playSucceeded";
	s.PLAY_INTERRUPTED = "playInterrupted";
	s.PLAY_FINISHED = "playFinished";
	s.PLAY_FAILED = "playFailed";
	s.SUPPORTED_EXTENSIONS = ["mp3", "ogg", "opus", "mpeg", "wav", "m4a", "mp4", "aiff", "wma", "mid"];
	s.EXTENSION_MAP = {
		m4a:"mp4"
	};
	s.FILE_PATTERN = /^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?))?([/.]*?(?:[^?]+)?\/)?((?:[^/?]+)\.(\w+))(?:\?(\S+)?)?$/;
	s.defaultInterruptBehavior = s.INTERRUPT_NONE;  
	s.alternateExtensions = [];
    s.activePlugin = null;

	s._masterVolume = 1;
	s._getMasterVolume = function() {
		return this._masterVolume;
	};
	
	s.getVolume = This.createjs.deprecate(s._getMasterVolume, "Sound.getVolume");

	s._setMasterVolume = function(value) {
		if (Number(value) == null) { return; }
		value = Math.max(0, Math.min(1, value));
		s._masterVolume = value;
		if (!this.activePlugin || !this.activePlugin.setVolume || !this.activePlugin.setVolume(value)) {
			var instances = this._instances;
			for (var i = 0, l = instances.length; i < l; i++) {
				instances[i].setMasterVolume(value);
			}
		}
	};
	
	s.setVolume = This.createjs.deprecate(s._setMasterVolume, "Sound.setVolume");
	s._masterMute = false;
	s._getMute = function () {
		return this._masterMute;
	};
	
	s.getMute = This.createjs.deprecate(s._getMute, "Sound.getMute");
	s._setMute = function (value) {
		if (value == null) { return; }
		this._masterMute = value;
		if (!this.activePlugin || !this.activePlugin.setMute || !this.activePlugin.setMute(value)) {
			var instances = this._instances;
			for (var i = 0, l = instances.length; i < l; i++) {
				instances[i].setMasterMute(value);
			}
		}
	};
	
	s.setMute = This.createjs.deprecate(s._setMute, "Sound.setMute");
	s._getCapabilities = function() {
		if (s.activePlugin == null) { return null; }
		return s.activePlugin._capabilities;
	};
	
	s.getCapabilities = This.createjs.deprecate(s._getCapabilities, "Sound.getCapabilities");

	Object.defineProperties(s, {
		volume: { get: s._getMasterVolume, set: s._setMasterVolume },
		muted: { get: s._getMute, set: s._setMute },
		capabilities: { get: s._getCapabilities }
	});
	s._pluginsRegistered = false;
	s._lastID = 0;
	s._instances = [];
	s._idHash = {};
	s._preloadHash = {};
	s._defaultPlayPropsHash = {};

	s.addEventListener = null;
	s.removeEventListener = null;
	s.removeAllEventListeners = null;
	s.dispatchEvent = null;
	s.hasEventListener = null;
	s._listeners = null;

	This.createjs.EventDispatcher.initialize(s); 
	s.getPreloadHandlers = function () {
		return {
			callback:This.createjs.proxy(s.initLoad, s),
			types:["sound"],
			extensions:s.SUPPORTED_EXTENSIONS
		};
	};
	s._handleLoadComplete = function(event) {
		var src = event.target.getItem().src;
		if (!s._preloadHash[src]) {return;}

		for (var i = 0, l = s._preloadHash[src].length; i < l; i++) {
			var item = s._preloadHash[src][i];
			s._preloadHash[src][i] = true;

			if (!s.hasEventListener("fileload")) { continue; }

			var event = new This.createjs.Event("fileload");
			event.src = item.src;
			event.id = item.id;
			event.data = item.data;
			event.sprite = item.sprite;

			s.dispatchEvent(event);
		}
	};
	s._handleLoadError = function(event) {
		var src = event.target.getItem().src;
		if (!s._preloadHash[src]) {return;}

		for (var i = 0, l = s._preloadHash[src].length; i < l; i++) {
			var item = s._preloadHash[src][i];
			s._preloadHash[src][i] = false;

			if (!s.hasEventListener("fileerror")) { continue; }

			var event = new This.createjs.Event("fileerror");
			event.src = item.src;
			event.id = item.id;
			event.data = item.data;
			event.sprite = item.sprite;

			s.dispatchEvent(event);
		}
	};
	s._registerPlugin = function (plugin) {
		
		if (plugin.isSupported()) {
			s.activePlugin = new plugin();
			return true;
		}
		return false;
	};
	s.registerPlugins = function (plugins) {
		s._pluginsRegistered = true;
		for (var i = 0, l = plugins.length; i < l; i++) {
			if (s._registerPlugin(plugins[i])) {
				return true;
			}
		}
		return false;
	};
	s.initializeDefaultPlugins = function () {
		if (s.activePlugin != null) {return true;}
		if (s._pluginsRegistered) {return false;}
		if (s.registerPlugins([This.createjs.WebAudioPlugin, This.createjs.HTMLAudioPlugin])) {return true;}
		return false;
	};
	s.isReady = function () {
		return (s.activePlugin != null);
	};
	s.initLoad = function (loadItem) {
		if (loadItem.type == "video") { return true; } 
		return s._registerSound(loadItem);
	};

	s._registerSound = function (loadItem) {
		if (!s.initializeDefaultPlugins()) {return false;}

		var details;
		if (loadItem.src instanceof Object) {
			details = s._parseSrc(loadItem.src);
			details.src = loadItem.path + details.src;
		} else {
			details = s._parsePath(loadItem.src);
		}
		if (details == null) {return false;}
		loadItem.src = details.src;
		loadItem.type = "sound";

		var data = loadItem.data;
		var numChannels = null;
		if (data != null) {
			if (!isNaN(data.channels)) {
				numChannels = parseInt(data.channels);
			} else if (!isNaN(data)) {
				numChannels = parseInt(data);
			}

			if(data.audioSprite) {
				var sp;
				for(var i = data.audioSprite.length; i--; ) {
					sp = data.audioSprite[i];
					s._idHash[sp.id] = {src: loadItem.src, startTime: parseInt(sp.startTime), duration: parseInt(sp.duration)};

					if (sp.defaultPlayProps) {
						s._defaultPlayPropsHash[sp.id] = This.createjs.PlayPropsConfig.create(sp.defaultPlayProps);
					}
				}
			}
		}
		if (loadItem.id != null) {s._idHash[loadItem.id] = {src: loadItem.src}};
		var loader = s.activePlugin.register(loadItem);

		SoundChannel.create(loadItem.src, numChannels);

		
		if (data == null || !isNaN(data)) {
			loadItem.data = numChannels || SoundChannel.maxPerChannel();
		} else {
			loadItem.data.channels = numChannels || SoundChannel.maxPerChannel();
		}

		if (loader.type) {loadItem.type = loader.type;}

		if (loadItem.defaultPlayProps) {
			s._defaultPlayPropsHash[loadItem.src] = This.createjs.PlayPropsConfig.create(loadItem.defaultPlayProps);
		}
		return loader;
	};
	s.registerSound = function (src, id, data, basePath, defaultPlayProps) {
		var loadItem = {src: src, id: id, data:data, defaultPlayProps:defaultPlayProps};
		if (src instanceof Object && src.src) {
			basePath = id;
			loadItem = src;
		}
		loadItem = This.createjs.LoadItem.create(loadItem);
		loadItem.path = basePath;

		if (basePath != null && !(loadItem.src instanceof Object)) {loadItem.src = basePath + loadItem.src;}

		var loader = s._registerSound(loadItem);
		if(!loader) {return false;}

		if (!s._preloadHash[loadItem.src]) { s._preloadHash[loadItem.src] = [];}
		s._preloadHash[loadItem.src].push(loadItem);
		if (s._preloadHash[loadItem.src].length == 1) {
			
			loader.on("complete", this._handleLoadComplete, this);
			loader.on("error", this._handleLoadError, this);
			s.activePlugin.preload(loader);
		} else {
			if (s._preloadHash[loadItem.src][0] == true) {return true;}
		}

		return loadItem;
	};
	s.registerSounds = function (sounds, basePath) {
		var returnValues = [];
		if (sounds.path) {
			if (!basePath) {
				basePath = sounds.path;
			} else {
				basePath = basePath + sounds.path;
			}
			sounds = sounds.manifest;
			
		}
		for (var i = 0, l = sounds.length; i < l; i++) {
			returnValues[i] = This.createjs.Sound.registerSound(sounds[i].src, sounds[i].id, sounds[i].data, basePath, sounds[i].defaultPlayProps);
		}
		return returnValues;
	};
	s.removeSound = function(src, basePath) {
		if (s.activePlugin == null) {return false;}

		if (src instanceof Object && src.src) {src = src.src;}

		var details;
		if (src instanceof Object) {
			details = s._parseSrc(src);
		} else {
			src = s._getSrcById(src).src;
			details = s._parsePath(src);
		}
		if (details == null) {return false;}
		src = details.src;
		if (basePath != null) {src = basePath + src;}

		for(var prop in s._idHash){
			if(s._idHash[prop].src == src) {
				delete(s._idHash[prop]);
			}
		}

		
		SoundChannel.removeSrc(src);

		delete(s._preloadHash[src]);

		s.activePlugin.removeSound(src);

		return true;
	};
	s.removeSounds = function (sounds, basePath) {
		var returnValues = [];
		if (sounds.path) {
			if (!basePath) {
				basePath = sounds.path;
			} else {
				basePath = basePath + sounds.path;
			}
			sounds = sounds.manifest;
		}
		for (var i = 0, l = sounds.length; i < l; i++) {
			returnValues[i] = This.createjs.Sound.removeSound(sounds[i].src, basePath);
		}
		return returnValues;
	};
	s.removeAllSounds = function() {
		s._idHash = {};
		s._preloadHash = {};
		SoundChannel.removeAll();
		if (s.activePlugin) {s.activePlugin.removeAllSounds();}
	};
	s.loadComplete = function (src) {
		if (!s.isReady()) { return false; }
		var details = s._parsePath(src);
		if (details) {
			src = s._getSrcById(details.src).src;
		} else {
			src = s._getSrcById(src).src;
		}
		if(s._preloadHash[src] == undefined) {return false;}
		return (s._preloadHash[src][0] == true);  
	};
	s._parsePath = function (value) {
		if (typeof(value) != "string") {value = value.toString();}

		var match = value.match(s.FILE_PATTERN);
		if (match == null) {return false;}

		var name = match[4];
		var ext = match[5];
		var c = s.capabilities;
		var i = 0;
		while (!c[ext]) {
			ext = s.alternateExtensions[i++];
			if (i > s.alternateExtensions.length) { return null;}	
		}
		value = value.replace("."+match[5], "."+ext);

		var ret = {name:name, src:value, extension:ext};
		return ret;
	};
	s._parseSrc = function (value) {
		var ret = {name:undefined, src:undefined, extension:undefined};
		var c = s.capabilities;

		for (var prop in value) {
		  if(value.hasOwnProperty(prop) && c[prop]) {
				ret.src = value[prop];
				ret.extension = prop;
				break;
		  }
		}
		if (!ret.src) {return false;}	

		var i = ret.src.lastIndexOf("/");
		if (i != -1) {
			ret.name = ret.src.slice(i+1);
		} else {
			ret.name = ret.src;
		}

		return ret;
	};

	s.play = function (src, props) {
		var playProps = This.createjs.PlayPropsConfig.create(props);
		var instance = s.createInstance(src, playProps.startTime, playProps.duration);
		var ok = s._playInstance(instance, playProps);
		if (!ok) {instance._playFailed();}
		return instance;
	};
	s.createInstance = function (src, startTime, duration) {
		if (!s.initializeDefaultPlugins()) { return new This.createjs.DefaultSoundInstance(src, startTime, duration); }

		var defaultPlayProps = s._defaultPlayPropsHash[src];	
		src = s._getSrcById(src);

		var details = s._parsePath(src.src);

		var instance = null;
		if (details != null && details.src != null) {
			SoundChannel.create(details.src);
			if (startTime == null) { startTime = src.startTime; }
			instance = s.activePlugin.create(details.src, startTime, duration || src.duration);

			defaultPlayProps = defaultPlayProps || s._defaultPlayPropsHash[details.src];
			if (defaultPlayProps) {
				instance.applyPlayProps(defaultPlayProps);
			}
		} else {
			instance = new This.createjs.DefaultSoundInstance(src, startTime, duration);
		}

		instance.uniqueId = s._lastID++;

		return instance;
	};
	s.stop = function () {
		var instances = this._instances;
		for (var i = instances.length; i--; ) {
			instances[i].stop();  
		}
	};
	s.setDefaultPlayProps = function(src, playProps) {
		src = s._getSrcById(src);
		s._defaultPlayPropsHash[s._parsePath(src.src).src] = This.createjs.PlayPropsConfig.create(playProps);
	};
	s.getDefaultPlayProps = function(src) {
		src = s._getSrcById(src);
		return s._defaultPlayPropsHash[s._parsePath(src.src).src];
	};
	s._playInstance = function (instance, playProps) {
		var defaultPlayProps = s._defaultPlayPropsHash[instance.src] || {};
		if (playProps.interrupt == null) {playProps.interrupt = defaultPlayProps.interrupt || s.defaultInterruptBehavior};
		if (playProps.delay == null) {playProps.delay = defaultPlayProps.delay || 0;}
		if (playProps.offset == null) {playProps.offset = instance.position;}
		if (playProps.loop == null) {playProps.loop = instance.loop;}
		if (playProps.volume == null) {playProps.volume = instance.volume;}
		if (playProps.pan == null) {playProps.pan = instance.pan;}

		if (playProps.delay == 0) {
			var ok = s._beginPlaying(instance, playProps);
			if (!ok) {return false;}
		} else {
			
			
			var delayTimeoutId = setTimeout(function () {
				s._beginPlaying(instance, playProps);
			}, playProps.delay);
			instance.delayTimeoutId = delayTimeoutId;
		}

		this._instances.push(instance);

		return true;
	};
	s._beginPlaying = function (instance, playProps) {
		if (!SoundChannel.add(instance, playProps.interrupt)) {
			return false;
		}
		var result = instance._beginPlaying(playProps);
		if (!result) {
			var index = This.createjs.indexOf(this._instances, instance);
			if (index > -1) {this._instances.splice(index, 1);}
			return false;
		}
		return true;
	};
	s._getSrcById = function (value) {
		return s._idHash[value] || {src: value};
	};
	s._playFinished = function (instance) {
		SoundChannel.remove(instance);
		var index = This.createjs.indexOf(this._instances, instance);
		if (index > -1) {this._instances.splice(index, 1);}	
	};

	This.createjs.Sound = Sound;
	function SoundChannel(src, max) {
		this.init(src, max);
	}

	SoundChannel.channels = {};
	SoundChannel.create = function (src, max) {
		var channel = SoundChannel.get(src);
		if (channel == null) {
			SoundChannel.channels[src] = new SoundChannel(src, max);
			return true;
		}
		return false;
	};

	SoundChannel.removeSrc = function (src) {
		var channel = SoundChannel.get(src);
		if (channel == null) {return false;}
		channel._removeAll();	
		delete(SoundChannel.channels[src]);
		return true;
	};

	SoundChannel.removeAll = function () {
		for(var channel in SoundChannel.channels) {
			SoundChannel.channels[channel]._removeAll();	
		}
		SoundChannel.channels = {};
	};

	SoundChannel.add = function (instance, interrupt) {
		var channel = SoundChannel.get(instance.src);
		if (channel == null) {return false;}
		return channel._add(instance, interrupt);
	};

	SoundChannel.remove = function (instance) {
		var channel = SoundChannel.get(instance.src);
		if (channel == null) {return false;}
		channel._remove(instance);
		return true;
	};

	SoundChannel.maxPerChannel = function () {
		return p.maxDefault;
	};

	SoundChannel.get = function (src) {
		return SoundChannel.channels[src];
	};

	var p = SoundChannel.prototype;
	p.constructor = SoundChannel;
	p.src = null;
	p.max = null;
	p.maxDefault = 100;
	p.length = 0;
	p.init = function (src, max) {
		this.src = src;
		this.max = max || this.maxDefault;
		if (this.max == -1) {this.max = this.maxDefault;}
		this._instances = [];
	};
	p._get = function (index) {
		return this._instances[index];
	};
	p._add = function (instance, interrupt) {
		if (!this._getSlot(interrupt, instance)) {return false;}
		this._instances.push(instance);
		this.length++;
		return true;
	};
	p._remove = function (instance) {
		var index = This.createjs.indexOf(this._instances, instance);
		if (index == -1) {return false;}
		this._instances.splice(index, 1);
		this.length--;
		return true;
	};
	p._removeAll = function () {
		
		for (var i=this.length-1; i>=0; i--) {
			this._instances[i].stop();
		}
	};
	p._getSlot = function (interrupt, instance) {
		var target, replacement;

		if (interrupt != Sound.INTERRUPT_NONE) {
			
			replacement = this._get(0);
			if (replacement == null) {
				return true;
			}
		}

		for (var i = 0, l = this.max; i < l; i++) {
			target = this._get(i);

			
			if (target == null) {
				return true;
			}

			
			if (target.playState == Sound.PLAY_FINISHED ||
				target.playState == Sound.PLAY_INTERRUPTED ||
				target.playState == Sound.PLAY_FAILED) {
				replacement = target;
				break;
			}

			if (interrupt == Sound.INTERRUPT_NONE) {
				continue;
			}

			
			if ((interrupt == Sound.INTERRUPT_EARLY && target.position < replacement.position) ||
				(interrupt == Sound.INTERRUPT_LATE && target.position > replacement.position)) {
					replacement = target;
			}
		}

		if (replacement != null) {
			replacement._interrupt();
			this._remove(replacement);
			return true;
		}
		return false;
	};

	p.toString = function () {
		return "[Sound SoundChannel]";
	};
	

}());

This.createjs = This.createjs || {};

(function () {
	"use strict";

	var AbstractSoundInstance = function (src, startTime, duration, playbackResource) {
		this.EventDispatcher_constructor();
	
	
		this.src = src;

	
		this.uniqueId = -1;

	
		this.playState = null;

	
		this.delayTimeoutId = null;
		
	
	
		
	
		this._volume =  1;
		Object.defineProperty(this, "volume", {
			get: this._getVolume,
			set: this._setVolume
		});

	
		this._pan =  0;
		Object.defineProperty(this, "pan", {
			get: this._getPan,
			set: this._setPan
		});

	
		this._startTime = Math.max(0, startTime || 0);
		Object.defineProperty(this, "startTime", {
			get: this._getStartTime,
			set: this._setStartTime
		});

	
		this._duration = Math.max(0, duration || 0);
		Object.defineProperty(this, "duration", {
			get: this._getDuration,
			set: this._setDuration
		});

	
		this._playbackResource = null;
		Object.defineProperty(this, "playbackResource", {
			get: this._getPlaybackResource,
			set: this._setPlaybackResource
		});
		if(playbackResource !== false && playbackResource !== true) { this._setPlaybackResource(playbackResource); }

	
		this._position = 0;
		Object.defineProperty(this, "position", {
			get: this._getPosition,
			set: this._setPosition
		});

	
		this._loop = 0;
		Object.defineProperty(this, "loop", {
			get: this._getLoop,
			set: this._setLoop
		});

	
		this._muted = false;
		Object.defineProperty(this, "muted", {
			get: this._getMuted,
			set: this._setMuted
		});

	
		this._paused = false;
		Object.defineProperty(this, "paused", {
			get: this._getPaused,
			set: this._setPaused
		});
	
	

	

	

	

	
	};

	var p = This.createjs.extend(AbstractSoundInstance, This.createjs.EventDispatcher);

	p.play = function (props) {
		var playProps = This.createjs.PlayPropsConfig.create(props);
		if (this.playState == This.createjs.Sound.PLAY_SUCCEEDED) {
			this.applyPlayProps(playProps);
			if (this._paused) {	this._setPaused(false); }
			return;
		}
		this._cleanUp();
		This.createjs.Sound._playInstance(this, playProps);	
		return this;
	};
	p.stop = function () {
		this._position = 0;
		this._paused = false;
		this._handleStop();
		this._cleanUp();
		this.playState = This.createjs.Sound.PLAY_FINISHED;
		return this;
	};
	p.destroy = function() {
		this._cleanUp();
		this.src = null;
		this.playbackResource = null;

		this.removeAllEventListeners();
	};
	p.applyPlayProps = function(playProps) {
		if (playProps.offset != null) { this._setPosition(playProps.offset) }
		if (playProps.loop != null) { this._setLoop(playProps.loop); }
		if (playProps.volume != null) { this._setVolume(playProps.volume); }
		if (playProps.pan != null) { this._setPan(playProps.pan); }
		if (playProps.startTime != null) {
			this._setStartTime(playProps.startTime);
			this._setDuration(playProps.duration);
		}
		return this;
	};

	p.toString = function () {
		return "[AbstractSoundInstance]";
	};

	p._getPaused = function() {
		return this._paused;
	};
	p._setPaused = function (value) {
		if ((value !== true && value !== false) || this._paused == value) {return;}
		if (value == true && this.playState != This.createjs.Sound.PLAY_SUCCEEDED) {return;}
		this._paused = value;
		if(value) {
			this._pause();
		} else {
			this._resume();
		}
		clearTimeout(this.delayTimeoutId);
		return this;
	};
	p._setVolume = function (value) {
		if (value == this._volume) { return this; }
		this._volume = Math.max(0, Math.min(1, value));
		if (!this._muted) {
			this._updateVolume();
		}
		return this;
	};
	p._getVolume = function () {
		return this._volume;
	};
	p._setMuted = function (value) {
		if (value !== true && value !== false) {return;}
		this._muted = value;
		this._updateVolume();
		return this;
	};
	p._getMuted = function () {
		return this._muted;
	};
	p._setPan = function (value) {
		if(value == this._pan) { return this; }
		this._pan = Math.max(-1, Math.min(1, value));
		this._updatePan();
		return this;
	};
	p._getPan = function () {
		return this._pan;
	};
	p._getPosition = function () {
		if (!this._paused && this.playState == This.createjs.Sound.PLAY_SUCCEEDED) {
			this._position = this._calculateCurrentPosition();
		}
		return this._position;
	};
	p._setPosition = function (value) {
		this._position = Math.max(0, value);
		if (this.playState == This.createjs.Sound.PLAY_SUCCEEDED) {
			this._updatePosition();
		}
		return this;
	};
	p._getStartTime = function () {
		return this._startTime;
	};
	p._setStartTime = function (value) {
		if (value == this._startTime) { return this; }
		this._startTime = Math.max(0, value || 0);
		this._updateStartTime();
		return this;
	};
	p._getDuration = function () {
		return this._duration;
	};
	p._setDuration = function (value) {
		if (value == this._duration) { return this; }
		this._duration = Math.max(0, value || 0);
		this._updateDuration();
		return this;
	};
	p._setPlaybackResource = function (value) {
		this._playbackResource = value;
		if (this._duration == 0 && this._playbackResource) { this._setDurationFromSource(); }
		return this;
	};
	p._getPlaybackResource = function () {
		return this._playbackResource;
	};
	p._getLoop = function () {
		return this._loop;
	};
	p._setLoop = function (value) {
		if(this._playbackResource != null) {
			
			if (this._loop != 0 && value == 0) {
				this._removeLooping(value);
			}
			
			else if (this._loop == 0 && value != 0) {
				this._addLooping(value);
			}
		}
		this._loop = value;
	};
	p._sendEvent = function (type) {
		var event = new This.createjs.Event(type);
		this.dispatchEvent(event);
	};
	p._cleanUp = function () {
		clearTimeout(this.delayTimeoutId); 
		this._handleCleanUp();
		this._paused = false;

		This.createjs.Sound._playFinished(this);	
	};
	p._interrupt = function () {
		this._cleanUp();
		this.playState = This.createjs.Sound.PLAY_INTERRUPTED;
		this._sendEvent("interrupted");
	};
	
	p._beginPlaying = function (playProps) {
		this._setPosition(playProps.offset);
		this._setLoop(playProps.loop);
		this._setVolume(playProps.volume);
		this._setPan(playProps.pan);
		if (playProps.startTime != null) {
			this._setStartTime(playProps.startTime);
			this._setDuration(playProps.duration);
		}

		if (this._playbackResource != null && this._position < this._duration) {
			this._paused = false;
			this._handleSoundReady();
			this.playState = This.createjs.Sound.PLAY_SUCCEEDED;
			this._sendEvent("succeeded");
			return true;
		} else {
			this._playFailed();
			return false;
		}
	};
	p._playFailed = function () {
		this._cleanUp();
		this.playState = This.createjs.Sound.PLAY_FAILED;
		this._sendEvent("failed");
	};
	p._handleSoundComplete = function (event) {
		this._position = 0;  

		if (this._loop != 0) {
			this._loop--;  
			this._handleLoop();
			this._sendEvent("loop");
			return;
		}

		this._cleanUp();
		this.playState = This.createjs.Sound.PLAY_FINISHED;
		this._sendEvent("complete");
	};

	p._handleSoundReady = function () {
		
	};
	p._updateVolume = function () {
		
	};
	p._updatePan = function () {
		
	};
	p._updateStartTime = function () {
		
	};
	p._updateDuration = function () {
		
	};
	p._setDurationFromSource = function () {
		
	};
	p._calculateCurrentPosition = function () {
		
	};
	p._updatePosition = function () {
		
	};
	p._removeLooping = function (value) {
		
	};
	p._addLooping = function (value) {
		
	};
	p._pause = function () {
		
	};
	p._resume = function () {
		
	};
	p._handleStop = function() {
		
	};
	p._handleCleanUp = function() {
		
	};
	p._handleLoop = function () {
		
	};

	This.createjs.AbstractSoundInstance = This.createjs.promote(AbstractSoundInstance, "EventDispatcher");
	This.createjs.DefaultSoundInstance = This.createjs.AbstractSoundInstance;	
}());

This.createjs = This.createjs || {};

(function () {
	"use strict";

 

	var AbstractPlugin = function () {
	
	
		this._capabilities = null;

	
		this._loaders = {};

	
		this._audioSources = {};

	
		this._soundInstances = {};

	
		this._volume = 1;

	
		this._loaderClass;

	
		this._soundInstanceClass;
	};
	var p = AbstractPlugin.prototype;
	AbstractPlugin._capabilities = null;
	AbstractPlugin.isSupported = function () {
		return true;
	};
	p.register = function (loadItem) {
		var loader = this._loaders[loadItem.src];
		if(loader && !loader.canceled) {return this._loaders[loadItem.src];}	
		
		this._audioSources[loadItem.src] = true;
		this._soundInstances[loadItem.src] = [];
		loader = new this._loaderClass(loadItem);
		loader.on("complete", this._handlePreloadComplete, this);
		this._loaders[loadItem.src] = loader;
		return loader;
	};

	

	p.preload = function (loader) {
		loader.on("error", this._handlePreloadError, this);
		loader.load();
	};
	p.isPreloadStarted = function (src) {
		return (this._audioSources[src] != null);
	};
	p.isPreloadComplete = function (src) {
		return (!(this._audioSources[src] == null || this._audioSources[src] == true));
	};
	p.removeSound = function (src) {
		if (!this._soundInstances[src]) { return; }
		for (var i = this._soundInstances[src].length; i--; ) {
			var item = this._soundInstances[src][i];
			item.destroy();
		}
		delete(this._soundInstances[src]);
		delete(this._audioSources[src]);
		if(this._loaders[src]) { this._loaders[src].destroy(); }
		delete(this._loaders[src]);
	};
	p.removeAllSounds = function () {
		for(var key in this._audioSources) {
			this.removeSound(key);
		}
	};
	p.create = function (src, startTime, duration) {
		if (!this.isPreloadStarted(src)) {
			this.preload(this.register(src));
		}
		var si = new this._soundInstanceClass(src, startTime, duration, this._audioSources[src]);
		if(this._soundInstances[src]){
			this._soundInstances[src].push(si);
		}

		
		
		si.setMasterVolume && si.setMasterVolume(This.createjs.Sound.volume);
		si.setMasterMute && si.setMasterMute(This.createjs.Sound.muted);

		return si;
	};

	

	p.setVolume = function (value) {
		this._volume = value;
		this._updateVolume();
		return true;
	};
	p.getVolume = function () {
		return this._volume;
	};
	p.setMute = function (value) {
		this._updateVolume();
		return true;
	};

	
	p.toString = function () {
		return "[AbstractPlugin]";
	};
	p._handlePreloadComplete = function (event) {
		var src = event.target.getItem().src;
		this._audioSources[src] = event.result;
		for (var i = 0, l = this._soundInstances[src].length; i < l; i++) {
			var item = this._soundInstances[src][i];
			item.setPlaybackResource(this._audioSources[src]);
			
			this._soundInstances[src] = null;
		}
	};
	p._handlePreloadError = function(event) {
		
	};
	p._updateVolume = function () {
		
	};

	This.createjs.AbstractPlugin = AbstractPlugin;
}());

This.createjs = This.createjs || {};

(function () {
	"use strict";
	function Loader(loadItem) {
		this.AbstractLoader_constructor(loadItem, true, This.createjs.Types.SOUND);

	};
	var p = This.createjs.extend(Loader, This.createjs.AbstractLoader);
	Loader.context = null;

	p.toString = function () {
		return "[WebAudioLoader]";
	};

	p._createRequest = function() {
		this._request = new This.createjs.XHRRequest(this._item, false);
		this._request.setResponseType("arraybuffer");
	};

	p._sendComplete = function (event) {
		
		Loader.context.decodeAudioData(this._rawResult,
	         This.createjs.proxy(this._handleAudioDecoded, this),
	         This.createjs.proxy(this._sendError, this));
	};

	p._handleAudioDecoded = function (decodedAudio) {
		this._result = decodedAudio;
		this.AbstractLoader__sendComplete();
	};

	This.createjs.WebAudioLoader = This.createjs.promote(Loader, "AbstractLoader");
}());

This.createjs = This.createjs || {};
(function () {
	"use strict";

	function WebAudioSoundInstance(src, startTime, duration, playbackResource) {
		this.AbstractSoundInstance_constructor(src, startTime, duration, playbackResource);

	
		this.gainNode = s.context.createGain();

	
		this.panNode = s.context.createPanner();
		this.panNode.panningModel = s._panningModel;
		this.panNode.connect(this.gainNode);
		this._updatePan();

	
		this.sourceNode = null;

	
		this._soundCompleteTimeout = null;

	
		this._sourceNodeNext = null;

	
		this._playbackStartTime = 0;

		
		this._endedHandler = This.createjs.proxy(this._handleSoundComplete, this);
	};
	var p = This.createjs.extend(WebAudioSoundInstance, This.createjs.AbstractSoundInstance);
	var s = WebAudioSoundInstance;
	s.context = null;
	s._scratchBuffer = null;
	s.destinationNode = null;
	s._panningModel = "equalpower";

	p.destroy = function() {
		this.AbstractSoundInstance_destroy();

		this.panNode.disconnect(0);
		this.panNode = null;
		this.gainNode.disconnect(0);
		this.gainNode = null;
	};

	p.toString = function () {
		return "[WebAudioSoundInstance]";
	};

	p._updatePan = function() {
		this.panNode.setPosition(this._pan, 0, -0.5);
		
	};

	p._removeLooping = function(value) {
		this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext);
	};

	p._addLooping = function(value) {
		if (this.playState != This.createjs.Sound.PLAY_SUCCEEDED) { return; }
		this._sourceNodeNext = this._createAndPlayAudioNode(this._playbackStartTime, 0);
	};

	p._setDurationFromSource = function () {
		this._duration = this.playbackResource.duration * 1000;
	};

	p._handleCleanUp = function () {
		if (this.sourceNode && this.playState == This.createjs.Sound.PLAY_SUCCEEDED) {
			this.sourceNode = this._cleanUpAudioNode(this.sourceNode);
			this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext);
		}

		if (this.gainNode.numberOfOutputs != 0) {this.gainNode.disconnect(0);}
		

		clearTimeout(this._soundCompleteTimeout);

		this._playbackStartTime = 0;	
	};
	p._cleanUpAudioNode = function(audioNode) {
		if(audioNode) {
			audioNode.stop(0);
			audioNode.disconnect(0);
			
			
			if ( This.createjs.BrowserDetect.isIOS ) {
				try { audioNode.buffer = s._scratchBuffer; } catch(e) {}
			}
			audioNode = null;
		}
		return audioNode;
	};

	p._handleSoundReady = function (event) {
		this.gainNode.connect(s.destinationNode);  

		var dur = this._duration * 0.001,
			pos = Math.min(Math.max(0, this._position) * 0.001, dur);
		this.sourceNode = this._createAndPlayAudioNode((s.context.currentTime - dur), pos);
		this._playbackStartTime = this.sourceNode.startTime - pos;

		this._soundCompleteTimeout = setTimeout(this._endedHandler, (dur - pos) * 1000);

		if(this._loop != 0) {
			this._sourceNodeNext = this._createAndPlayAudioNode(this._playbackStartTime, 0);
		}
	};
	p._createAndPlayAudioNode = function(startTime, offset) {
		var audioNode = s.context.createBufferSource();
		audioNode.buffer = this.playbackResource;
		audioNode.connect(this.panNode);
		var dur = this._duration * 0.001;
		audioNode.startTime = startTime + dur;
		audioNode.start(audioNode.startTime, offset+(this._startTime*0.001), dur - offset);
		return audioNode;
	};

	p._pause = function () {
		this._position = (s.context.currentTime - this._playbackStartTime) * 1000;  
		this.sourceNode = this._cleanUpAudioNode(this.sourceNode);
		this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext);

		if (this.gainNode.numberOfOutputs != 0) {this.gainNode.disconnect(0);}

		clearTimeout(this._soundCompleteTimeout);
	};

	p._resume = function () {
		this._handleSoundReady();
	};

	p._updateVolume = function () {
		var newVolume = this._muted ? 0 : this._volume;
	  	if (newVolume != this.gainNode.gain.value) {
		  this.gainNode.gain.value = newVolume;
  		}
	};

	p._calculateCurrentPosition = function () {
		return ((s.context.currentTime - this._playbackStartTime) * 1000); 
	};

	p._updatePosition = function () {
		this.sourceNode = this._cleanUpAudioNode(this.sourceNode);
		this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext);
		clearTimeout(this._soundCompleteTimeout);

		if (!this._paused) {this._handleSoundReady();}
	};

	
	
	
	
	p._handleLoop = function () {
		this._cleanUpAudioNode(this.sourceNode);
		this.sourceNode = this._sourceNodeNext;
		this._playbackStartTime = this.sourceNode.startTime;
		this._sourceNodeNext = this._createAndPlayAudioNode(this._playbackStartTime, 0);
		this._soundCompleteTimeout = setTimeout(this._endedHandler, this._duration);
	};

	p._updateDuration = function () {
		if(this.playState == This.createjs.Sound.PLAY_SUCCEEDED) {
			this._pause();
			this._resume();
		}
	};

	This.createjs.WebAudioSoundInstance = This.createjs.promote(WebAudioSoundInstance, "AbstractSoundInstance");
}());

This.createjs = This.createjs || {};

(function () {

	"use strict";
	function WebAudioPlugin() {
		this.AbstractPlugin_constructor();

	
		this._panningModel = s._panningModel;;

	
		this.context = s.context;

	
		this.dynamicsCompressorNode = this.context.createDynamicsCompressor();
		this.dynamicsCompressorNode.connect(this.context.destination);

	
		this.gainNode = this.context.createGain();
		this.gainNode.connect(this.dynamicsCompressorNode);
		This.createjs.WebAudioSoundInstance.destinationNode = this.gainNode;

		this._capabilities = s._capabilities;

		this._loaderClass = This.createjs.WebAudioLoader;
		this._soundInstanceClass = This.createjs.WebAudioSoundInstance;

		this._addPropsToClasses();
	}
	var p = This.createjs.extend(WebAudioPlugin, This.createjs.AbstractPlugin);
	var s = WebAudioPlugin;

	s._capabilities = null;
	s._panningModel = "equalpower";
	s.context = null;
	 s._scratchBuffer = null;
	s._unlocked = false;
	s.DEFAULT_SAMPLE_RATE = 44100;

	s.isSupported = function () {
		
		var isMobilePhoneGap = This.createjs.BrowserDetect.isIOS || This.createjs.BrowserDetect.isAndroid || This.createjs.BrowserDetect.isBlackberry;
		
		if (location.protocol == "file:" && !isMobilePhoneGap && !this._isFileXHRSupported()) { return false; }  
		s._generateCapabilities();
		if (s.context == null) {return false;}
		return true;
	};
	s.playEmptySound = function() {
		if (s.context == null) {return;}
		var source = s.context.createBufferSource();
		source.buffer = s._scratchBuffer;
		source.connect(s.context.destination);
		source.start(0, 0, 0);
	};
	s._isFileXHRSupported = function() {
		
		var supported = true;

		var xhr = new XMLHttpRequest();
		try {
			xhr.open("GET", "WebAudioPluginTest.fail", false); 
		} catch (error) {
			
			supported = false;
			return supported;
		}
		xhr.onerror = function() { supported = false; }; 
		
		xhr.onload = function() { supported = this.status == 404 || (this.status == 200 || (this.status == 0 && this.response != "")); };
		try {
			xhr.send();
		} catch (error) {
			
			supported = false;
		}

		return supported;
	};
	s._generateCapabilities = function () {
		if (s._capabilities != null) {return;}
		
		var t = document.createElement("audio");
		if (t.canPlayType == null) {return null;}

		if (s.context == null) {
			s.context = s._createAudioContext();
			if (s.context == null) { return null; }
		}
		if (s._scratchBuffer == null) {
			s._scratchBuffer = s.context.createBuffer(1, 1, 22050);
		}

		s._compatibilitySetUp();

		
		if ("ontouchstart" in window && s.context.state != "running") {
			s._unlock(); 
			document.addEventListener("mousedown", s._unlock, true);
			document.addEventListener("touchstart", s._unlock, true);
			document.addEventListener("touchend", s._unlock, true);
		}

		s._capabilities = {
			panning:true,
			volume:true,
			tracks:-1
		};

		
		var supportedExtensions = This.createjs.Sound.SUPPORTED_EXTENSIONS;
		var extensionMap = This.createjs.Sound.EXTENSION_MAP;
		for (var i = 0, l = supportedExtensions.length; i < l; i++) {
			var ext = supportedExtensions[i];
			var playType = extensionMap[ext] || ext;
			s._capabilities[ext] = (t.canPlayType("audio/" + ext) != "no" && t.canPlayType("audio/" + ext) != "") || (t.canPlayType("audio/" + playType) != "no" && t.canPlayType("audio/" + playType) != "");
		}  

		
		
		if (s.context.destination.numberOfChannels < 2) {
			s._capabilities.panning = false;
		}
	};
	s._createAudioContext = function() {
		
		
		var context = new AudioContext();

		
		
		
		if (/(iPhone|iPad)/i.test(navigator.userAgent)
				&& context.sampleRate !== s.DEFAULT_SAMPLE_RATE) {
			var buffer = context.createBuffer(1, 1, s.DEFAULT_SAMPLE_RATE),
					dummy = context.createBufferSource();
			dummy.buffer = buffer;
			dummy.connect(context.destination);
			dummy.start(0);
			dummy.disconnect();
			context.close() 

			context = new AudioContext();
		}
		return context;
	}
	s._compatibilitySetUp = function() {
		s._panningModel = "equalpower";
		
		if (s.context.createGain) { return; }

		
		s.context.createGain = s.context.createGainNode;

		
		var audioNode = s.context.createBufferSource();
		audioNode.__proto__.start = audioNode.__proto__.noteGrainOn;	
		audioNode.__proto__.stop = audioNode.__proto__.noteOff;

		
		s._panningModel = 0;
	};
	s._unlock = function() {
		if (s._unlocked) { return; }
		s.playEmptySound();
		if (s.context.state == "running") {
			document.removeEventListener("mousedown", s._unlock, true);
			document.removeEventListener("touchend", s._unlock, true);
			document.removeEventListener("touchstart", s._unlock, true);
			s._unlocked = true;
		}
	};

	p.toString = function () {
		return "[WebAudioPlugin]";
	};
	p._addPropsToClasses = function() {
		var c = this._soundInstanceClass;
		c.context = this.context;
		c._scratchBuffer = s._scratchBuffer;
		c.destinationNode = this.gainNode;
		c._panningModel = this._panningModel;

		this._loaderClass.context = this.context;
	};

	p._updateVolume = function () {
		var newVolume = This.createjs.Sound._masterMute ? 0 : this._volume;
		if (newVolume != this.gainNode.gain.value) {
			this.gainNode.gain.value = newVolume;
		}
	};

	This.createjs.WebAudioPlugin = This.createjs.promote(WebAudioPlugin, "AbstractPlugin");
}());

This.createjs = This.createjs || {};

(function () {
	"use strict";
	function HTMLAudioTagPool() {
			throw "HTMLAudioTagPool cannot be instantiated";
	}

	var s = HTMLAudioTagPool;

	s._tags = {};
	s._tagPool = new TagPool();
	s._tagUsed = {};

	 s.get = function (src) {
		var t = s._tags[src];
		if (t == null) {
			
			t = s._tags[src] = s._tagPool.get();
			t.src = src;
		} else {
			
			if (s._tagUsed[src]) {
				t = s._tagPool.get();
				t.src = src;
			} else {
				s._tagUsed[src] = true;
			}
		}
		return t;
	 };

	
	 s.set = function (src, tag) {
		 
		 if(tag == s._tags[src]) {
			 s._tagUsed[src] = false;
		 } else {
			 s._tagPool.set(tag);
		 }
	 };
	s.remove = function (src) {
		var tag = s._tags[src];
		if (tag == null) {return false;}
		s._tagPool.set(tag);
		delete(s._tags[src]);
		delete(s._tagUsed[src]);
		return true;
	};
	s.getDuration= function (src) {
		var t = s._tags[src];
		if (t == null || !t.duration) {return 0;}	
		return t.duration * 1000;
	};

	This.createjs.HTMLAudioTagPool = HTMLAudioTagPool;
	function TagPool(src) {
	
		this._tags = [];
	};

	var p = TagPool.prototype;
	p.constructor = TagPool;
	p.get = function () {
		var tag;
		if (this._tags.length == 0) {
			tag = this._createTag();
		} else {
			tag = this._tags.pop();
		}
		if (tag.parentNode == null) {document.body.appendChild(tag);}
		return tag;
	};
	p.set = function (tag) {
		
		var index = This.createjs.indexOf(this._tags, tag);
		if (index == -1) {
			this._tags.src = null;
			this._tags.push(tag);
		}
	};

	p.toString = function () {
		return "[TagPool]";
	};
	p._createTag = function () {
		var tag = document.createElement("audio");
		tag.autoplay = false;
		tag.preload = "none";
		
		return tag;
	};

}());

This.createjs = This.createjs || {};

(function () {
	"use strict";
	function HTMLAudioSoundInstance(src, startTime, duration, playbackResource) {
		this.AbstractSoundInstance_constructor(src, startTime, duration, playbackResource);

		this._audioSpriteStopTime = null;
		this._delayTimeoutId = null;

		
		this._endedHandler = This.createjs.proxy(this._handleSoundComplete, this);
		this._readyHandler = This.createjs.proxy(this._handleTagReady, this);
		this._stalledHandler = This.createjs.proxy(this._playFailed, this);
		this._audioSpriteEndHandler = This.createjs.proxy(this._handleAudioSpriteLoop, this);
		this._loopHandler = This.createjs.proxy(this._handleSoundComplete, this);

		if (duration) {
			this._audioSpriteStopTime = (startTime + duration) * 0.001;
		} else {
			this._duration = This.createjs.HTMLAudioTagPool.getDuration(this.src);
		}
	}
	var p = This.createjs.extend(HTMLAudioSoundInstance, This.createjs.AbstractSoundInstance);

	p.setMasterVolume = function (value) {
		this._updateVolume();
	};
	p.setMasterMute = function (isMuted) {
		this._updateVolume();
	};

	p.toString = function () {
		return "[HTMLAudioSoundInstance]";
	};
	p._removeLooping = function() {
		if(this._playbackResource == null) {return;}
		this._playbackResource.loop = false;
		this._playbackResource.removeEventListener(This.createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, false);
	};

	p._addLooping = function() {
		if(this._playbackResource == null  || this._audioSpriteStopTime) {return;}
		this._playbackResource.addEventListener(This.createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, false);
		this._playbackResource.loop = true;
	};

	p._handleCleanUp = function () {
		var tag = this._playbackResource;
		if (tag != null) {
			tag.pause();
			tag.loop = false;
			tag.removeEventListener(This.createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, false);
			tag.removeEventListener(This.createjs.HTMLAudioPlugin._AUDIO_READY, this._readyHandler, false);
			tag.removeEventListener(This.createjs.HTMLAudioPlugin._AUDIO_STALLED, this._stalledHandler, false);
			tag.removeEventListener(This.createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, false);
			tag.removeEventListener(This.createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, false);

			try {
				tag.currentTime = this._startTime;
			} catch (e) {
			} 
			This.createjs.HTMLAudioTagPool.set(this.src, tag);
			this._playbackResource = null;
		}
	};

	p._beginPlaying = function (playProps) {
		this._playbackResource = This.createjs.HTMLAudioTagPool.get(this.src);
		return this.AbstractSoundInstance__beginPlaying(playProps);
	};

	p._handleSoundReady = function (event) {
		if (this._playbackResource.readyState !== 4) {
			var tag = this._playbackResource;
			tag.addEventListener(This.createjs.HTMLAudioPlugin._AUDIO_READY, this._readyHandler, false);
			tag.addEventListener(This.createjs.HTMLAudioPlugin._AUDIO_STALLED, this._stalledHandler, false);
			tag.preload = "auto"; 
			tag.load();
			return;
		}

		this._updateVolume();
		this._playbackResource.currentTime = (this._startTime + this._position) * 0.001;
		if (this._audioSpriteStopTime) {
			this._playbackResource.addEventListener(This.createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, false);
		} else {
			this._playbackResource.addEventListener(This.createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, false);
			if(this._loop != 0) {
				this._playbackResource.addEventListener(This.createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, false);
				this._playbackResource.loop = true;
			}
		}

		this._playbackResource.play();
	};
	p._handleTagReady = function (event) {
		this._playbackResource.removeEventListener(This.createjs.HTMLAudioPlugin._AUDIO_READY, this._readyHandler, false);
		this._playbackResource.removeEventListener(This.createjs.HTMLAudioPlugin._AUDIO_STALLED, this._stalledHandler, false);

		this._handleSoundReady();
	};

	p._pause = function () {
		this._playbackResource.pause();
	};

	p._resume = function () {
		this._playbackResource.play();
	};

	p._updateVolume = function () {
		if (this._playbackResource != null) {
			var newVolume = (this._muted || This.createjs.Sound._masterMute) ? 0 : this._volume * This.createjs.Sound._masterVolume;
			if (newVolume != this._playbackResource.volume) {this._playbackResource.volume = newVolume;}
		}
	};

	p._calculateCurrentPosition = function() {
		return (this._playbackResource.currentTime * 1000) - this._startTime;
	};

	p._updatePosition = function() {
		this._playbackResource.removeEventListener(This.createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, false);
		this._playbackResource.addEventListener(This.createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._handleSetPositionSeek, false);
		try {
			this._playbackResource.currentTime = (this._position + this._startTime) * 0.001;
		} catch (error) { 
			this._handleSetPositionSeek(null);
		}
	};
	p._handleSetPositionSeek = function(event) {
		if (this._playbackResource == null) { return; }
		this._playbackResource.removeEventListener(This.createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._handleSetPositionSeek, false);
		this._playbackResource.addEventListener(This.createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, false);
	};
	p._handleAudioSpriteLoop = function (event) {
		if(this._playbackResource.currentTime <= this._audioSpriteStopTime) {return;}
		this._playbackResource.pause();
		if(this._loop == 0) {
			this._handleSoundComplete(null);
		} else {
			this._position = 0;
			this._loop--;
			this._playbackResource.currentTime = this._startTime * 0.001;
			if(!this._paused) {this._playbackResource.play();}
			this._sendEvent("loop");
		}
	};

	
	
	p._handleLoop = function (event) {
		if(this._loop == 0) {
			this._playbackResource.loop = false;
			this._playbackResource.removeEventListener(This.createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, false);
		}
	};

	p._updateStartTime = function () {
		this._audioSpriteStopTime = (this._startTime + this._duration) * 0.001;

		if(this.playState == This.createjs.Sound.PLAY_SUCCEEDED) {
			this._playbackResource.removeEventListener(This.createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, false);
			this._playbackResource.addEventListener(This.createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, false);
		}
	};

	p._updateDuration = function () {
		this._audioSpriteStopTime = (this._startTime + this._duration) * 0.001;

		if(this.playState == This.createjs.Sound.PLAY_SUCCEEDED) {
			this._playbackResource.removeEventListener(This.createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, false);
			this._playbackResource.addEventListener(This.createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, false);
		}
	};

	p._setDurationFromSource = function () {
		this._duration = This.createjs.HTMLAudioTagPool.getDuration(this.src);
		this._playbackResource = null;
	};

	This.createjs.HTMLAudioSoundInstance = This.createjs.promote(HTMLAudioSoundInstance, "AbstractSoundInstance");
}());

This.createjs = This.createjs || {};

(function () {

	"use strict";
	function HTMLAudioPlugin() {
		this.AbstractPlugin_constructor();
	
		this._capabilities = s._capabilities;

		this._loaderClass = This.createjs.SoundLoader;
		this._soundInstanceClass = This.createjs.HTMLAudioSoundInstance;
	}

	var p = This.createjs.extend(HTMLAudioPlugin, This.createjs.AbstractPlugin);
	var s = HTMLAudioPlugin;

	s.MAX_INSTANCES = 30;
	s._AUDIO_READY = "canplaythrough";
	s._AUDIO_ENDED = "ended";
	s._AUDIO_SEEKED = "seeked";
	s._AUDIO_STALLED = "stalled";
	s._TIME_UPDATE = "timeupdate";
	s._capabilities = null;
	s.isSupported = function () {
		s._generateCapabilities();
		return (s._capabilities != null);
	};
	s._generateCapabilities = function () {
		if (s._capabilities != null) {return;}
		var t = document.createElement("audio");
		if (t.canPlayType == null) {return null;}

		s._capabilities = {
			panning:false,
			volume:true,
			tracks:-1
		};

		
		var supportedExtensions = This.createjs.Sound.SUPPORTED_EXTENSIONS;
		var extensionMap = This.createjs.Sound.EXTENSION_MAP;
		for (var i = 0, l = supportedExtensions.length; i < l; i++) {
			var ext = supportedExtensions[i];
			var playType = extensionMap[ext] || ext;
			s._capabilities[ext] = (t.canPlayType("audio/" + ext) != "no" && t.canPlayType("audio/" + ext) != "") || (t.canPlayType("audio/" + playType) != "no" && t.canPlayType("audio/" + playType) != "");
		}  
	};

	p.register = function (loadItem) {
		var tag = This.createjs.HTMLAudioTagPool.get(loadItem.src);
		var loader = this.AbstractPlugin_register(loadItem);
		loader.setTag(tag);

		return loader;
	};

	p.removeSound = function (src) {
		this.AbstractPlugin_removeSound(src);
		This.createjs.HTMLAudioTagPool.remove(src);
	};

	p.create = function (src, startTime, duration) {
		var si = this.AbstractPlugin_create(src, startTime, duration);
		si.playbackResource = null;
		return si;
	};

	p.toString = function () {
		return "[HTMLAudioPlugin]";
	};

	
	p.setVolume = p.getVolume = p.setMute = null;
	This.createjs.HTMLAudioPlugin = This.createjs.promote(HTMLAudioPlugin, "AbstractPlugin");
}());

export default This.createjs;
export const Sound = This.createjs.Sound;