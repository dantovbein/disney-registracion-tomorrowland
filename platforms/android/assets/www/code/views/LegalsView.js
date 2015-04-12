function LegalsView(config){
	GenericView.call(this,config);
}

inheritPrototype(LegalsView,GenericView);

LegalsView.prototype.constructor = LegalsView;

LegalsView.prototype.initializeParameters = function(){
	GenericView.prototype.initializeParameters.call(this);
	this.path = "views/legalsView.html";
	this._parent = this.config._parent;
}

LegalsView.prototype.initialize = function(){
	GenericView.prototype.initialize.call(this);
}

LegalsView.prototype.addHandlers = function(){
	GenericView.prototype.addHandlers.call(this);
	$(this.node).find(".btn-cancel").click({ context:this }, this.onCancel );
	$(this.node).find(".btn-confirm").click({ context:this }, this.onConfirm );
}

LegalsView.prototype.onCancel = function(e){
	e.stopImmediatePropagation();
	var self = e.data.context;
	self._parent.getStatusLegals(0);
	self.destroy();
	Utils.removeOverlay();
}

LegalsView.prototype.onConfirm = function(e){
	e.stopImmediatePropagation();
	var self = e.data.context;
	self._parent.getStatusLegals(1);
	self.destroy();
	Utils.removeOverlay();
}