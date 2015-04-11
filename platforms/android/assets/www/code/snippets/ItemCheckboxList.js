function ItemCheckboxList(config){
	GenericSnippet.call(this,config);
}

inheritPrototype(ItemCheckboxList,GenericSnippet);

ItemCheckboxList.prototype.initializeParameters = function(){
	GenericSnippet.prototype.initializeParameters.call(this);
}

ItemCheckboxList.prototype.initialize = function(){
	GenericSnippet.prototype.initialize.call(this);
	
	//var checkbox = new GenericCheckbox({ container:$(this.node) })
}