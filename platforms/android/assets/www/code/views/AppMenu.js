function AppMenu(config){
	GenericView.call(this,config);
}

inheritPrototype(AppMenu,GenericView);

AppMenu.prototype.constructor = AppMenu;

AppMenu.prototype.initializeParameters = function(){
	GenericView.prototype.initializeParameters.call(this);
	this.path = "views/appMenu.html";
	//this.show = false;
	this.marginLeftAppMenu = 10;
}

AppMenu.prototype.initialize = function(){
	GenericView.prototype.initialize.call(this);
	$(this.node).css({
		left:-($(this.node).outerWidth())
	});
}

AppMenu.prototype.addHandlers = function(){
	GenericView.prototype.addHandlers.call(this);
	//$(this.node).click({ context:this },this.onOpenHandler);
	//$(this.node).find(".btn-open").click({ context:this },this.onOpenHandler );
	$(this.node).find(".btn-close").click({ context:this },this.onCloseHandler );
	$(this.node).find(".btn-update-users-list").click({ context:this },this.updateUsersList );
	//$(this.node).find(".btn-download-users-list").click({ context:this },this.downloadUsersList );
}

AppMenu.prototype.onOpenHandler = function(e){
	var self = e.data.context;
	if(self.show) return;
	self.show = false;
	$(self.node).animate({
			left:0,
			opacity:1
		},300);
}


AppMenu.prototype.onCloseHandler = function(e){
	var self = e.data.context;
	self.show = false;
	self.showMenu(self.show);
}

AppMenu.prototype.updateUsersList = function(e){
	e.stopImmediatePropagation();
	$.ajax({
		context : e.data.context,
		async : false,
		url : "service/generateUsersFile.php",
		type : "POST",
		data : { users : JSON.stringify(Utils.getMain().usersDataBase.query("users")) },
		success : function(r){
			debugger;
		},
		error : function(error) {
			debugger;
		}
	});
}

/*AppMenu.prototype.downloadUsersList = function(e){
	
}*/

AppMenu.prototype.showMenu = function(show){
	if(show){
		$(this.node).animate({
			left:0,
			opacity:1
		},300);
	}else{
		$(this.node).animate({
			left:-($(this.node).outerWidth()) + this.marginLeftAppMenu,
			opacity:0
		},200);
	}	
}