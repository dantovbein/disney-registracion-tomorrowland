function RegistrationFormView(config){
	GenericView.call(this,config);
}

inheritPrototype(RegistrationFormView,GenericView);

RegistrationFormView.prototype.constructor = RegistrationFormView;

RegistrationFormView.prototype.initializeParameters = function(){
	GenericView.prototype.initializeParameters.call(this);
	this.path = "views/registrationFormView.html";
}

RegistrationFormView.prototype.initialize = function(){
	GenericView.prototype.initialize.call(this);
	this.addGenderList();
	this.addDisneyCheckbox();
	this.addLegalsCheckbox();
}

RegistrationFormView.prototype.addGenderList = function(){
	this.genderList = new GenderList({ container:$(this.node).find(".gender-list") });
}

RegistrationFormView.prototype.addDisneyCheckbox = function(){
	this.disneyNewsCheckbox = new GenericCheckbox({ container:$(this.node).find(".disney-news-checkbox") , path:"widgets/checkbox.html" });
}

RegistrationFormView.prototype.addLegalsCheckbox = function(){
	this.legalsCheckbox = new GenericCheckbox({ container:$(this.node).find(".legals-checkbox") , path:"widgets/checkbox.html" });
}

RegistrationFormView.prototype.reset = function() {
	GenericView.prototype.reset.call(this);
}