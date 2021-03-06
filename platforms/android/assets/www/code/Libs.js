function Libs(_lib_) {
	var self = this;
	this.lib = _lib_;
	
	if(window.jQuery == undefined) {
		console.log("Jquery is not loaded. It's mandatory to load JQuery");
	}else{
		this.loadFiles(this.getFiles(this.lib));
	}
};

Libs.prototype.constructor = Libs;

Libs.prototype.getFiles = function(_lib_) {
	var self = this;
	this.libraries = new Array(
		{
			"name"	: "app",
			"libs"	: [
				"css/checkbox.css",
				"css/waitView.css",
				"css/appMenu.css",
				"css/registrationFormView.css",
				"css/confirmationFormView.css",
				"css/legalsView.css",
				"css/lockView.css",
				"code/monkeyman/core/oop.js",
				"code/monkeyman/core/Snippet.js",
				"code/monkeyman/core/Monkeyman.js",
				"code/monkeyman/core/MonkeymanGlobals.js",
				"code/Utils.js",
				"code/Globals.js",
				"code/App.js",
				"code/monkeyman/core/widgets/GenericWidget.js",
				"code/monkeyman/core/widgets/GenericCheckbox.js",
				"code/monkeyman/core/snippets/GenericSnippet.js",
				"code/monkeyman/core/views/GenericView.js",
				"code/snippets/ItemCheckboxList.js",
				"code/snippets/CheckboxList.js",
				"code/snippets/GenderList.js",
				"code/views/AppMenu.js",
				"code/views/RegistrationFormView.js",
				"code/views/ConfirmationFormView.js",
				"code/views/LegalsView.js",
				"code/views/LockView.js"
			]
		}
	);
	var _libs_ = new Array();
	this.libraries.forEach(function(d){
		if(d.name == _lib_)
			_libs_ = d.libs;
	});
	return _libs_;
};

Libs.prototype.loadFiles = function(files) {
	var index,extension,file;
	files.forEach(function(f){
		index = f.lastIndexOf(".",f.length);
		extension = f.slice(index + 1,f.length);
		switch(extension)
		{
			case "css":
				$.ajax({
					async : false,
					url : f,
					success : function(result) {
						$("<style></style>").appendTo("head").html(result);
					},
					error : function(error) {
						console.log("No se pudo cargar " + f);
					}
				});
			break;
			case "js":
				$.ajax({
					async : false,
					url : f,
					dataType : "script",
					success : function(result) {
						console.log("Se cargo: " + f);
					},
					error : function(error) {
						console.log("No se pudo cargar " + f);
					}
				});

			break;
		}
	});
};