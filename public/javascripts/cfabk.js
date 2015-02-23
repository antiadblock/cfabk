// ###################################
// THIS FILE IS GENERATED, DO NOT EDIT
// ###################################

// Copyright (C) 2015 AntiAdblock.me
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

CloudFlare.define("cfabk", ["cfabk/config"], function(_config) {
	var id = makeid();
    if ('addEventListener' in window) {
      on  = function (obj,type,fn) { obj.addEventListener(type,fn,false)    };
      off = function (obj,type,fn) { obj.removeEventListener(type,fn,false) };
    }
    else {
      on  = function (obj,type,fn) { obj.attachEvent('on'+type,fn) };
      off = function (obj,type,fn) { obj.detachEvent('on'+type,fn) };
    }
    

    var Cfabk = function Cfabk(config) {
            this.cfabkEl = null;
            this.message_dismissed = "";
            this.animate_status = 0;
            this.config = config
            this.cookie = "__cfabkapp_dm"
        }
    var cfabk = new Cfabk(_config)

    Cfabk.prototype.activate = function() {

		detectAdBlock(this,function(active,ref){
			//console.log(ref);
			if (active) {
				ref.setup();
				//console.log(active);
			}
		});
		
    }

    Cfabk.prototype.setup = function() {
        var theme = document.createElement('style');
        theme.setAttribute("type", "text/css")
		var colorbackground = "#9b1111";
		var colortext = "#EEE";
		var colorlink = "#AAE";
        var style = "."+id+" {  position: fixed;  -moz-transition: all 0.6s ease-in-out;  -webkit-transition: all 0.6s ease-in-out;  -ms-transition: all 0.6s ease-in-out;  -o-transition: all 0.6s ease-in-out;  transition: all 0.6s ease-in-out;  z-index: -1;  font-family: Helvetica Neue, Helvetica, san-serif;  font-size: 22px;  top: -55px;  left: 0;  width: 100%;  color: "+colortext+";  padding: 12px 5px;  text-align: center;  background-color: "+colorbackground+";  -moz-box-shadow: 1px 1px 2px 3px #999;  -webkit-box-shadow: 1px 1px 2px 3px #999;  box-shadow:     1px 1px 2px 3px #999; } ."+id+":hover{  opacity: 0.7;  filter: progid:dximagetransform.microsoft.alpha(Opacity=70); } #"+id+"_message{  display: block;  padding-left: 120px;  padding-right: 65px; } ."+id+" a{  color: "+colorlink+"; } #"+id+"_logo{  position: absolute;  left: 10px;  height: 20px;  width: 65px; }  #"+id+"_logo div {  position: relative;  z-index: 1;  width: 35;  height: 22; }  #"+id+"_close{  position: absolute;  top: 12px;  right: 20px;  font-size: 15px;  font-weight:bold;  cursor:pointer;  opacity: 0.4;  filter: progid:dximagetransform.microsoft.alpha(Opacity=40); }  ."+id+"."+id+"-animate{  z-index: 100000;  top: 0px;  } ";
        if(theme.styleSheet){
            theme.styleSheet.cssText = style;
        }
        else{
            theme.innerHTML = style;
        }
        document.getElementsByTagName("head")[0].appendChild(theme);

        this.cfabkEl = document.createElement('div');
        this.cfabkEl.id = id;
        this.cfabkEl.className = id;
        document.getElementsByTagName("body")[0].appendChild(this.cfabkEl);
        var cfabk_logo = document.createElement('span');
        cfabk_logo.id = id+'_logo';
        if(this.config.branded=="true"){
            cfabk_logo.innerHTML="<a href='http://antiadblock.me' target='_blank' ><img src='public/images/small-logo.png' title='powered by AntiAdblock' width='126' height='30'></a>"    
        }
        this.cfabkEl.appendChild(cfabk_logo);
        var cfabk_message = document.createElement('span');
        cfabk_message.id = id+'_message';
        this.cfabkEl.appendChild(cfabk_message);
        var  cfabk_close = document.createElement('span');
        setTimeout(function() {cfabk.showMessage();},1000);
        

    }
    Cfabk.prototype.showMessage = function(self) {
			if(typeof this.config.message == 'undefined')
				this.config.message = "This site depends on advertisements to stay online. Please disable AdBlocker.";
			var message = this.config.message;
			if (this.config.link != "" && typeof this.config.link != 'undefined'){
				message = message + " <a href='"+this.config.link+"'>"+this.config.linktext+"</a>";
			}
            document.getElementById(id+"_message").innerHTML = message;
            this.animate(1);

    }
        

    Cfabk.prototype.animate = function(level) {
        this.animate_status = level;
        if (level === 1) {
            this.cfabkEl.className = id+" "+id+"-animate";
        } else {
            this.cfabkEl.className = this.cfabkEl.className.replace(" "+id+"-animate", "");
            this.end();
        }
    }



    Cfabk.prototype.end = function () {
        setTimeout(function(self) {
            self.cfabkEl.className = id;
            self.cfabkEl.innerHTML = "";
            self.config.message = "";

        }, 500,this);
    }

    Cfabk.prototype.createCookie = function(value) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + 1);
        var c_value = escape(value) + "; expires=" + exdate.toUTCString();
        document.cookie = this.cookie + "=" + c_value + "; path=/";
    }

    Cfabk.prototype.readCookie = function (name) {
        return null; //zzz
        var nameEQ = this.cookie + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
	
	function detectAdBlock(ref,callback) {
    var done = false;
    var adscript = document.createElement('script');
        adscript.type = 'text/javascript';
        adscript.async = false;
        adscript.src = '//ad.yieldmanager.com/imp';

        adscript.onload = loadHandler;
        adscript.onreadystatechange = readStateHandler;
        adscript.onerror = errorHandler;
    
    try { document.getElementsByTagName('head')[0].appendChild(adscript); }
    catch(err) { callback(true,ref); }

    function readStateHandler() {
        if (done) return;
        var state = adscript.readyState;
        if (state === "complete") loadHandler();
    }
    function loadHandler() {
        if (!done) {
            done = true;
            callback(false,ref);
        }
    }
    function errorHandler() {
        if (!done) {
            done = true;
            callback(true,ref);
        }
    }
}   

function makeid(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}


    if (!window.jasmine) {
        cfabk.activate();
    }

    return cfabk
});
