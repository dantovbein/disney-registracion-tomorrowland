function ItemCheckboxList(config){
	GenericSnippet.call(this,config);
}

inheritPrototype(ItemCheckboxList,GenericSnippet);

ItemCheckboxList.prototype.initializeParameters = function(){
	GenericSnippet.prototype.initializeParameters.call(this);
	this.path = "snippets/itemCheckboxList.html";
	//this.val = this.config.data.value;
	this.dataSnippet = [this.config.data.title];
}

ItemCheckboxList.prototype.initialize = function(){
	GenericSnippet.prototype.initialize.call(this);
	this.checkbox = new GenericCheckbox({ container:$(this.node).find(".wrapper-checkbox"), path:"widgets/checkbox.html" });
	$(this.checkbox).bind(MonkeymanGlobals.GET_CHECKBOX_VALUE,{ context:this }, this.getOnCheckboxValue );
}

ItemCheckboxList.prototype.getOnCheckboxValue = function(e){
	e.stopImmediatePropagation();
	$(e.data.context).trigger({ type:MonkeymanGlobals.GET_CHECKBOX_VALUE, item:e.data.context, checkbox:e.checkbox });
}

ItemCheckboxList.prototype.setState = function(value){
	this.state = value;
	this.checkbox.setState(this.state); 
}