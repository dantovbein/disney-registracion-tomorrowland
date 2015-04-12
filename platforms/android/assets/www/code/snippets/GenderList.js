function GenderList(config){
	CheckboxList.call(this,config);
}

inheritPrototype(GenderList,CheckboxList);

GenderList.prototype.initializeParameters = function(){
	CheckboxList.prototype.initializeParameters.call(this);
	this.d = [
		{ name:"maculino", value:"m", title:"Masculino" },
		{ name:"femenino", value:"f", title:"Femenino" }
	];
}

