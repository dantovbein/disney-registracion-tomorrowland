function AppMenu(config){
	GenericView.call(this,config);
}

inheritPrototype(AppMenu,GenericView);

AppMenu.prototype.constructor = AppMenu;

AppMenu.prototype.initializeParameters = function(){
	GenericView.prototype.initializeParameters.call(this);
	this.path = "views/appMenu.html";
}

AppMenu.prototype.initialize = function(){
	GenericView.prototype.initialize.call(this);
}

AppMenu.prototype.addHandlers = function(){
	GenericView.prototype.addHandlers.call(this);
}