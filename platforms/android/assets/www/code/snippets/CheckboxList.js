function CheckboxList(config) {
	this.config = config;
	this.initializeParameters();
	this.initialize();
	this.addHandlers();
}

CheckboxList.prototype.constructor = CheckboxList;

CheckboxList.prototype.initializeParameters = function() {
	this.container = this.config.container;
	this.state = "";
}

CheckboxList.prototype.initialize = function(){
	this.d.forEach(function(d){
		var itemCheckboxList = new ItemCheckboxList({ container:this.container, data:d });
		$(itemCheckboxList).bind(MonkeymanGlobals.GET_CHECKBOX_VALUE, { context:this } ,this.onGetItemHandler );
		d.item = itemCheckboxList;
	},this);
}

CheckboxList.prototype.onGetItemHandler = function(e){
	e.stopImmediatePropagation();
	var self = e.data.context;
	self.currentItem = e.item;
	self.state = self.currentItem.config.data.value;
	self.currentItem.setState(1);
	self.d.forEach(function(d){
		if(d.item != this.currentItem){
			d.item.setState(0);
		}
	},self);
}

CheckboxList.prototype.addHandlers = function() {}

CheckboxList.prototype.setState = function(value) {
	this.d.forEach(function(d){
		d.item.setState(0);
		if(d.item.config.data.value == value){
			d.item.setState(1);
		}
	},this);
	this.state = value;
}

CheckboxList.prototype.getState = function() {
	return this.state;
}

CheckboxList.prototype.destroy = function() {
	$(this.node).remove();
}