var Utils = {
	appName : "Registracion Disney",
	appVersion : "1.0.0",
	setMainInstance : function(instance) {
		this.mainInstance = instance;
	},
	getMainInstance : function() {
		return this.mainInstance;
	},
	getServices : function(){
		var url = "";
		return {}
	},
	setUserData : function(data) {
		/*localStorage.setItem("id_vendor", data[0].idVendor);
		localStorage.setItem("id_device", data[0].idDevice);
		localStorage.setItem("user", data[0].user);
		localStorage.setItem("password", data[0].password);
		localStorage.setItem("full_name", data[0].fullName);
		localStorage.setItem("unlock_app_code", data[0].unlockAppCode);
		localStorage.setItem("unlock_code", data[0].unlockCode);
		localStorage.setItem("connected_since", new Date());
		localStorage.setItem("expiration", this.getExpirationDate());
		localStorage.setItem("is_locked", 0);
		localStorage.setItem("is_temporary_locked", 0);
		localStorage.setItem("changed_time", 0);*/
	},
	getUserData : function() {
		return { 
			/*idVendor : localStorage.getItem("id_vendor") ,
			idDevice : localStorage.getItem("id_device") ,
			user : localStorage.getItem("user") ,
			password : localStorage.getItem("password") ,
			fullName : localStorage.getItem("full_name") ,
			code : localStorage.getItem("code") ,
			connectedSince : localStorage.getItem("connected_since") ,
			expiration : localStorage.getItem("expiration"),
			isLocked : localStorage.getItem("is_locked")*/
		}
	},
	showMessage : function(text) {
		$("body").append("<div class='app-message'><span class='app-message-desc'>" + text + "</span></div>");
		$(".app-message").width($(document).width());
		$(".app-message").height($(document).height());
	},
	removeMessage : function(){
		if($(".app-message").length > 0) $(".app-message").remove();
	},
	removeUserData : function() {
		if(this.getMainInstance().usersDataBase) {
			this.getMainInstance().usersDataBase.drop();
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
		$(".overlay").css( { height : $(window).height() } );
	},
	removeOverlay : function() {
		if($(".overlay").length > 0) $(".overlay").remove();
	},
	removeContent : function() {
		$("#main").empty();
	}
}