ko.components.register('multicheck-combobox', {
	viewModel: function(params){
		var self = this;

		self.searchTerm = ko.observable("");
		self.availableOptions = ko.observableArray(new Array());

		//This computes searches
		self.filteredItems = ko.computed(function(){
			var filter = self.searchTerm().toLowerCase();

			if(!filter){
				return self.availableOptions();
			}
			else{
				return ko.utils.arrayFilter(self.availableOptions(), function(item){
					return item.toLowerCase().indexOf(filter) !== -1;
				});
			}
		});

		self.loadAvailableOptions = function(){
			self.availableOptions.push("Test 1");
			self.availableOptions.push("Test 2");
			self.availableOptions.push("Test 3");
			self.availableOptions.push("Test 4");
		};

		self.add = function(){
			alert("Add!");
		};

		self.cancel = function(){
			alert("Cancel!");
		};

		self.clearChecks = function(){
			alert("Clear!");
		};

		self.loadAvailableOptions();
	},
	template: 
			'<div>' +
				'<input type="text" placeholder="Search" data-bind="textInput: searchTerm"/>' +
			'</div>' + 
			'<ul data-bind="foreach: filteredItems">' +
					'<li>' +
						'<div>' +
							'<input type="checkbox" id="id_test"/>' +
							'<label for="id_test" data-bind="text: $data"></label>' +
						'</div>' +
					'</li>' +
			  '</ul>' +
			  '<div>' +
			  	'<span>' +
			  		'<a href="#" data-bind="click: add">Add</a>' + 
			  		'<a href="#" data-bind="click: cancel">Cancel</a>' +
			  	'</span>' +
			  '</div>'
});

ko.applyBindings();