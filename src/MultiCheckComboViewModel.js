
//Custom Handler to Stop Bubbling up on Clicks (avoid click callback binding)
ko.bindingHandlers.stopBubble = {
	init: function(element){
		ko.utils.registerEventHandler(element, "click", function(event){
			event.cancelBubble = true;
			if(event.stopPropagation){
				event.stopPropagation();
			}
		});
	}
};

//Component
ko.components.register('multicheck-combobox', {
	viewModel: function(params){
		var self = this;

		self.searchTerm = ko.observable("");		
		self.availableOptions = ko.observableArray(new Array());
		self.chosenOptions = ko.observableArray();		
		self.isDisplayMenuSelected = ko.observable(false);

		//This computes searches
		self.filteredItems = ko.computed(function(){
			var filter = self.searchTerm().toLowerCase();

			if(!filter){
				return self.availableOptions();
			}
			else{
				return ko.utils.arrayFilter(self.availableOptions(), function(item){
					return item.itemName.toLowerCase().indexOf(filter) !== -1;
				});
			}
		});
		
		self.setupComponent = function(){
			self.availableOptions.push({ itemName: "Test 1" });
			self.availableOptions.push({ itemName: "Test 2" });
			self.availableOptions.push({ itemName: "Test 3" });
			self.availableOptions.push({ itemName: "Test 31" });			
			self.availableOptions.push({ itemName: "Test 54" });
			self.availableOptions.push({ itemName: "Test 55" });
			self.availableOptions.push({ itemName: "Test 1" });
			self.availableOptions.push({ itemName: "Test 2" });
			self.availableOptions.push({ itemName: "Test 3" });
			self.availableOptions.push({ itemName: "Test 31" });			
			self.availableOptions.push({ itemName: "Test 54" });
			self.availableOptions.push({ itemName: "Test 55" });

			//Handling hidden
			$(document).on("click", function(){
				self.hideMultiCheckMenuContainer();
			});
		};

		self.add = function(){
			console.log(ko.toJSON(self.chosenOptions()));
			
			if(self.chosenOptions().length > 0){
				self.chosenOptions([]);
				self.searchTerm("");
			}
			else{
				console.log("No Data Selected!");
			}

			self.hideMultiCheckMenuContainer();
		};

		self.cancel = function(){
			if(self.chosenOptions().length > 0){
				self.chosenOptions([]);
			}

			self.searchTerm("");
			self.hideMultiCheckMenuContainer();
		};

		self.onClickSearchTextBoxEventHandler = function(){
			self.isDisplayMenuSelected(true);
		};

		self.hideMultiCheckMenuContainer = function(){
			self.isDisplayMenuSelected(false);
		};

		self.setupComponent();
	},
	template: 
			'<div class="multicheck-component-container" data-bind="stopBubble: true">' +
				'<div>' +
					'<input type="text" placeholder="Search" data-bind="click: onClickSearchTextBoxEventHandler, textInput: searchTerm"/>' +
				'</div>' + 
				'<div class="multicheck-menu-container" data-bind="visible: isDisplayMenuSelected">' +
					'<div class="multicheck-list-container">' +
						'<ul class="multicheck-list" data-bind="foreach: filteredItems" >' +
								'<li>' +
									'<div>' +
										'<input type="checkbox" data-bind="checkedValue: $data, checked: $parent.chosenOptions"/>' +
										'<span data-bind="text: itemName"></span>' +
									'</div>' +
								'</li>' +
						  '</ul>' +
					  '</div>' +
					  '<div class="multicheck-btn-container">' +
					  	'<span>' +
					  		'<a href="#" class="multicheck-btn-add" data-bind="click: add">Add</a>' + 
					  		'<a href="#" class="multicheck-btn-cancel" data-bind="click: cancel">Cancel</a>' +
					  	'</span>' +
					  '</div>' +
					'</div>' +
			  '</div>'
});

ko.applyBindings();