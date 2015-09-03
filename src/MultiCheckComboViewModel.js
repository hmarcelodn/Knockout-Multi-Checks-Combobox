
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
		self.selectAllSelected = ko.observable(false);

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
			self.availableOptions.push({ itemName: "Argentina" });
			self.availableOptions.push({ itemName: "Alemania" });
			self.availableOptions.push({ itemName: "Brazil" });
			self.availableOptions.push({ itemName: "México" });			
			self.availableOptions.push({ itemName: "Albania" });
			self.availableOptions.push({ itemName: "Australia" });
			self.availableOptions.push({ itemName: "Honduras" });
			self.availableOptions.push({ itemName: "Irlanda" });
			self.availableOptions.push({ itemName: "USA" });
			self.availableOptions.push({ itemName: "África" });			
			self.availableOptions.push({ itemName: "Jamaica" });
			self.availableOptions.push({ itemName: "Slovenia" });

			//Handling hidden (Depends on jquery unfortunatelly)
			//TODO: Find an elegant way to do this
			$(document).on("click", function(){
				self.hideMultiCheckMenuContainerButState();
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

		self.selectAllSelected.subscribe(function(){
			if(self.selectAllSelected() === false){
				self.chosenOptions([]);
			}
			else{
				//Clone everything available
				self.chosenOptions(self.availableOptions().slice(0));
			}
		});

		self.onClickSearchTextBoxEventHandler = function(){
			self.isDisplayMenuSelected(true);
		};

		self.hideMultiCheckMenuContainer = function(){
			self.isDisplayMenuSelected(false);
			self.selectAllSelected(false);
		};

		self.hideMultiCheckMenuContainerButState = function(){
			self.isDisplayMenuSelected(false);
		};

		self.setupComponent();
	},
	template: 
			'<div class="multicheck-component-container" data-bind="stopBubble: true">' +
				'<div>' +
					'<span>' +
						'<label>Country</label>' +
						'<input type="text" class="multicheck-search-input multicheck-arrow-down" placeholder="Search" data-bind="click: onClickSearchTextBoxEventHandler, textInput: searchTerm"/>' +
					'</span>'+
				'</div>' + 
				'<div class="multicheck-menu-container" data-bind="visible: isDisplayMenuSelected">' +
					'<div class="multicheck-list-container">' +
						'<span data-bind="visible: searchTerm().length === 0">' +
							'<input type="checkbox" data-bind="checked: selectAllSelected" />' +
							'<span>Select All</span>' +
						'</span>' +
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