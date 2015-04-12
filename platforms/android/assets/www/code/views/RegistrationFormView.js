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

RegistrationFormView.prototype.addHandlers = function(){
	GenericView.prototype.addHandlers.call(this);
	$(this.node).find(".btn-cancel").click({ context:this }, this.onCancel );
	$(this.node).find(".btn-save").click({ context:this }, this.onSave );
	$(this.node).find(".btn-legals").click({ context:this }, this.showLegals );
}

RegistrationFormView.prototype.onCancel = function(e){
	e.stopImmediatePropagation();
	e.data.context.reset();
}

RegistrationFormView.prototype.onSave = function(e){
	e.stopImmediatePropagation();
	var self = e.data.context;
	var data = self.getData();
	if(self.validateData(data)){
		self.saveData(data);
	}
}

RegistrationFormView.prototype.showLegals = function(e){
	e.stopImmediatePropagation();
	Utils.getOverlay();
	var legalsView = new LegalsView({ container:$("body"),_parent:e.data.context });
	$(legalsView).bind( Globals.STATUS_LEGALS,function(e){
		e.stopImmediatePropagation();
		e.data.context.legalsCheckbox.setState(e.data.state);
	},{ context:this },false );
}

RegistrationFormView.prototype.getStatusLegals = function(value){
	debugger;
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

RegistrationFormView.prototype.validateData = function(data){
	var isValid = true;
	if(data.name == ""){
		Utils.showErrorMessage("Falta completar el nombre");
		return false;
	}
	if(data.lastName == ""){
		Utils.showErrorMessage("Falta completar el apellido");
		return false;
	}
	if(data.birhDate == ""){
		Utils.showErrorMessage("Falta completar la fecha de nacimiento");
		return false;
	}
	if(data.gender == ""){
		Utils.showErrorMessage("Falta seleccionar el sexo");
		return false;
	}
	if(data.confirmLegals == 0){
		Utils.showErrorMessage("No aceptaste las bases y condiciones");
		return false;
	}
	return isValid;
}

RegistrationFormView.prototype.getData = function(){
	return {
		"name" : $(this.node).find("#input-registration-form-name").val(),
		"lastName" : $(this.node).find("#input-registration-form-last-name").val(),
		"birhDate" : $(this.node).find("#input-registration-form-birth-date").val(),
		"gender" : this.genderList.getState(),
		"confirmDisneyNews" : this.disneyNewsCheckbox.getState(),
		"confirmLegals" : this.legalsCheckbox.getState()
	}
}

RegistrationFormView.prototype.saveData = function(data) {
	Utils.getMain().usersDataBase.insert("users",{  "USER_NAME" : data.name,
													"USER_LAST_NAME" : data.lastName,
													"USER_BIRTH_DATE" : data.birhDate,
													"USER_GENDER" : data.gender,
													"USER_CONNECTED_DISNEY" : data.confirmDisneyNews,
													"USER_CONFIRM_LEGALS" : data.confirmLegals
												});
	Utils.getMain().usersDataBase.commit();
	this.reset();
	Utils.showMessage("La informacion se guardo correctamente");
	
	setTimeout(function(e){
		$(e.context).trigger({ type:MonkeymanGlobals.GO_TO_NEXT_VIEW,view:Globals.CONFIRMATION_FORM_VIEW });
	},2600,{ context:this });
}


RegistrationFormView.prototype.reset = function() {
	GenericView.prototype.reset.call(this);
	$(this.node).find("#input-registration-form-name").val("");
	$(this.node).find("#input-registration-form-last-name").val("");
	$(this.node).find("#input-registration-form-birth-date").val("");
	this.genderList.setState("");
	this.disneyNewsCheckbox.setState(0);
	this.legalsCheckbox.setState(0);
}