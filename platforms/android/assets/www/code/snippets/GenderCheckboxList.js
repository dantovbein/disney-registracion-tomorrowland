function GenderCheckboxList(config){
	CheckboxList.call(this,config);
}

inheritPrototype(GenderCheckboxList,CheckboxList);

GenderCheckboxList.prototype.initializeParameters = function(){
	CheckboxList.prototype.initializeParameters.call(this);
	this.d = [
		{ name:"maculino", value:"m", title:"Masculino" },
		{ name:"femenino", value:"f", title:"Femenino" }
	];
}

GenderCheckboxList.prototype.initialize = function(){
	CheckboxList.prototype.initialize.call(this);
	this.d.forEach(function(d){
		var itemCheckboxList = new ItemCheckboxList({ container:this.container, data:d });
		//$(itemCheckboxList).bind(Globals.GET_CHECKBOX_VALUE, { context:this } ,this.getNewCheckboxValue );
		//d.item = checkboxItem;
		/*var checkboxItem = new GenericCheckbox({ container:this.container, data:d });
		$(checkboxItem).bind(Globals.GET_CHECKBOX_VALUE, { context:this } ,this.getNewCheckboxValue );
		d.item = checkboxItem;*/
	},this);
}

/*GenderCheckboxList.prototype.getNewCheckboxValue = function(e){
	debugger;
}*/