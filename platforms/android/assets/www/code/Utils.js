var Utils = {
	appName : "Registracion Disney",
	appVersion : "1.0.12",
	setMain : function(instance) {
		this.mainInstance = instance;
	},
	getMain : function() {
		return this.mainInstance;
	},
	getServer : function(){
		//var server = "";
		var server = "http://deaene.com.ar/apps/RegistracionTomorrowland/";
		return server;
	},
	showMessage : function(text) {
		this.getOverlay();
		$("body").append("<div class='app-message'><span class='message-desc'>" + text + "</span></div>");
		setTimeout(function(e){
			$(".app-message").animate({
				"opacity":0
			},250,function(){
				$(this).remove();
			});
			e.context.removeOverlay();
		},2000,{ context:this });
	},
	showMessageLoading : function(text) {
		this.getOverlay();
		$("body").append("<div class='app-message loading-app-message'><span class='message-desc'>" + text + "</span></div>");
	},
	showErrorMessage : function(text) {
		this.getOverlay();
		$("body").append("<div class='error-message'><span class='message-desc'>" + text + "</span></div>");
		setTimeout(function(e){
			$(".error-message").animate({
				"opacity":0
			},250,function(){
				$(this).remove();
			});
			e.context.removeOverlay();
		},1000,{ context:this });
	},
	removeMessage : function(){
		if($(".app-message").length > 0) $(".app-message").remove();
		this.removeOverlay();
	},
	removeUserData : function() {
		if(this.getMain().usersDataBase) {
			this.getMain().usersDataBase.drop();
			localStorage.clear();
		}
	},
	getExpirationDate : function() {
		var now = new Date();
		return new Date(now.setDate(now.getDate() + 30));
	},
	checkConnection : function() {
	    var networkState = navigator.network.connection.type;

	    var states = {};
	    states[Connection.UNKNOWN]  = 'Unknown connection';
	    states[Connection.ETHERNET] = 'Ethernet connection';
	    states[Connection.WIFI]     = 'WiFi connection';
	    states[Connection.CELL_2G]  = 'Cell 2G connection';
	    states[Connection.CELL_3G]  = 'Cell 3G connection';
	    states[Connection.CELL_4G]  = 'Cell 4G connection';
	    states[Connection.NONE]     = 'No network connection';

	    alert('Connection type: ' + states[networkState]);
	},
	getOverlay : function() {
		$("body").append("<div class='overlay'></div>");
		$(".overlay").css( { 
								width : $(window).width(),
								height : $(window).height() 
							});
	},
	removeOverlay : function() {
		if($(".overlay").length > 0) $(".overlay").remove();
	},
	removeContent : function() {
		$("#wrapper-view").empty();
	}
}