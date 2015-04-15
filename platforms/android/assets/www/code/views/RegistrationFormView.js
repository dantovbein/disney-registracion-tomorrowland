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
	this.legalsCheckbox.setState(value);
}

RegistrationFormView.prototype.addGenderList = function(){
	this.genderList = new GenderList({ container:$(this.node).find(".gender-list") });
}

RegistrationFormView.prototype.addDisneyCheckbox = function(){
	this.disneyNewsCheckbox = new GenericCheckbox({ container:$(this.node).find(".disney-news-checkbox") , path:"widgets/checkbox.html" });
	this.disneyNewsCheckbox.setState(1);
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
		"userName" : $(this.node).find("#input-registration-form-name").val(),
		"userLastName" : $(this.node).find("#input-registration-form-last-name").val(),
		"userBirhDate" : $(this.node).find("#input-registration-form-birth-date").val(),
		"userGender" : this.genderList.getState(),
		"userConfirmDisneyNews" : this.disneyNewsCheckbox.getState(),
		"userConfirmLegals" : this.legalsCheckbox.getState()
	}
}

RegistrationFormView.prototype.saveData = function(data) {
	Utils.getMain().usersDataBase.insert("users",{  "USER_TOMORROWLAND_NAME" : data.userName,
													"USER_TOMORROWLAND_LAST_NAME" : data.userLastName,
													"USER_TOMORROWLAND_BIRTH_DATE" : data.userBirhDate,
													"USER_TOMORROWLAND_GENDER" : data.userGender,
													"USER_TOMORROWLAND_CONNECTED_DISNEY" : data.userConfirmDisneyNews,
													"USER_TOMORROWLAND_CONFIRM_LEGALS" : data.userConfirmLegals,
													"USER_TOMORROWLAND_CREATED" : parseFloat(new Date().getFullYear()) + "-" + parseFloat(new Date().getMonth()+1) + "-" + parseFloat(new Date().getDate())
												});
	Utils.getMain().usersDataBase.commit();
	Utils.showMessage("La informacion se guardo correctamente");
	
	setTimeout(function(e){
		$(e.context).trigger({ type:MonkeymanGlobals.GO_TO_NEXT_VIEW,view:Globals.CONFIRMATION_FORM_VIEW });
		e.context.clean();
	},2600,{ context:this });
	//this.clean();	

	/*$.ajax({
		context : this,
		async : false,
		url : "service/overwriteUserFile.php",
		type : "POST",
		data : {  	
			"USER_NAME" : data.name,
			"USER_LAST_NAME" : data.lastName,
			"USER_BIRTH_DATE" : data.birhDate,
			"USER_GENDER" : data.gender,
			"USER_CONNECTED_DISNEY" : data.confirmDisneyNews,
			"USER_CONFIRM_LEGALS" : data.confirmLegals
		},
		success : function(r){
			Utils.showMessage("La informacion se guardo correctamente");
			setTimeout(function(e){
				$(e.context).trigger({ type:MonkeymanGlobals.GO_TO_NEXT_VIEW,view:Globals.CONFIRMATION_FORM_VIEW });
			},2600,{ context:this });
		},
		error : function(error) {
			debugger;
		}
	});*/
	
	
}


RegistrationFormView.prototype.clean = function() {
	$(this.node).find("#input-registration-form-name").val("");
	$(this.node).find("#input-registration-form-last-name").val("");
	$(this.node).find("#input-registration-form-birth-date").val("");
	this.genderList.setState("");
	this.disneyNewsCheckbox.setState(1);
	this.legalsCheckbox.setState(0);
}