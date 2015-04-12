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
	this.timerGoToNextView = setTimeout(this.onCompleteTimerGoToNextView,1000*10,{context:this});
}

ConfirmationFormView.prototype.addHandlers = function(){
	GenericView.prototype.addHandlers.call(this);
	$(this.node).find(".btn-back").click({ context:this },this.onBack );
}

ConfirmationFormView.prototype.onBack = function(e){
	e.stopImmediatePropagation();
	var self = e.data.context;
	clearTimeout(self.timerGoToNextView);
	$(self).trigger({ type:MonkeymanGlobals.GO_TO_NEXT_VIEW,view:Globals.REGISTRATION_FORM_VIEW });
}

ConfirmationFormView.prototype.onCompleteTimerGoToNextView = function(e){
	e.stopImmediatePropagation();
	e.context.goToNextView();
}

ConfirmationFormView.prototype.goToNextView = function(){
	$(this).trigger({ type:MonkeymanGlobals.GO_TO_NEXT_VIEW,view:Globals.REGISTRATION_FORM_VIEW });	
}

