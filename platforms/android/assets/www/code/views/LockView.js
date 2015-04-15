function LockView(config){
	GenericView.call(this,config);
}

inheritPrototype(LockView,GenericView);

LockView.prototype.constructor = LockView;

LockView.prototype.initializeParameters = function(){
	GenericView.prototype.initializeParameters.call(this);
	this.path = "views/lockView.html";
}

LockView.prototype.initialize = function(){
	GenericView.prototype.initialize.call(this);
	this.timerGoToNextView = setTimeout(this.onCompleteTimerGoToNextView,1000*10,{context:this});
}

LockView.prototype.addHandlers = function(){
	GenericView.prototype.addHandlers.call(this);
	$(this.node).find(".btn-cancel").click({ context:this },this.onCancel );
	$(this.node).find(".btn-confirm").click({ context:this },this.onConfirm );
}


LockView.prototype.onCancel = function(e){
	e.stopImmediatePropagation();
	var self = e.data.context;
	$(self).trigger({ type:Globals.RESPONSE_LOCK_VIEW,response:0 });
	self.destroy();
}

LockView.prototype.onConfirm = function(e){
	e.stopImmediatePropagation();
	e.stopImmediatePropagation();
	var self = e.data.context;
	if($(self.node).find("#input-password").val()=="998877"){
		$(self).trigger({ type:Globals.RESPONSE_LOCK_VIEW,response:1 });
		self.destroy();
	}else{
		Utils.showErrorMessage("Clave incorrecta");
	}
}
