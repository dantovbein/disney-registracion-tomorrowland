function ConfirmationFormView(config){
	GenericView.call(this,config);
}

inheritPrototype(ConfirmationFormView,GenericView);

ConfirmationFormView.prototype.constructor = ConfirmationFormView;

ConfirmationFormView.prototype.initializeParameters = function(){
	GenericView.prototype.initializeParameters.call(this);
	this.path = "views/confirmationFormView.html";
}

ConfirmationFormView.prototype.initialize = function(){
	GenericView.prototype.initialize.call(this);
}