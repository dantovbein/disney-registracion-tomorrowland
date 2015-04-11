function CheckboxList(config) {
	this.config = config;
	this.initializeParameters();
	this.initialize();
	this.addHandlers();
}

CheckboxList.prototype.constructor = CheckboxList;

CheckboxList.prototype.initializeParameters = function() {
	this.container = this.config.container;
}

CheckboxList.prototype.initialize = function() {}

CheckboxList.prototype.addHandlers = function() {}

CheckboxList.prototype.destroy = function() {
	$(this.node).remove();
}