'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)
.filter('toBuy', ToBuyFilter)
.filter('bought', BoughtFilter);

ToBuyController.$inject = ['ShoppingListCheckOffService'];

function ToBuyController (ShoppingListCheckOffService){
	var toBuyCtrl = this;

	toBuyCtrl.getItemsToBuy = function(){
		return ShoppingListCheckOffService.getItemsToBuy();
	};

	toBuyCtrl.buyItem = function(_id){
		ShoppingListCheckOffService.setIsBought(_id, true);
	};
};

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController (ShoppingListCheckOffService){
	var boughtCtrl = this;

	boughtCtrl.getBoughtItems  = function(){
		return ShoppingListCheckOffService.getBoughtItems();
	};
	boughtCtrl.notBoughtItem = function(_id){
		ShoppingListCheckOffService.setIsBought(_id, false);
	}
};

ShoppingListCheckOffService.$inject = ['toBuyFilter', 'boughtFilter'];
function ShoppingListCheckOffService(toBuyFilter, boughtFilter){

	var service = this;
	var items = [
	{"_id":1, "itemName" :'Cookies', "quantity":10, "isBought" :false},
	{"_id":2, "itemName" :'Milk', "quantity":2, "isBought" :false},
	{"_id":3, "itemName" :'Chocolate', "quantity":3, "isBought" : false},
	{"_id":4, "itemName" :'Candies', "quantity":1, "isBought" : true},
	];

	service.getBoughtItems = function(){
		return BoughtFilter()(items);
	};
	service.getItemsToBuy = function(){
		return ToBuyFilter()(items);
	};
	service.getAllItems = function(){
		return items;
	};
	service.setIsBought = function(_id, isBought){
		for(let i = 0; i<items.length;i++){
			if(items[i]._id === _id){
				items[i].isBought = isBought;
			}
		}
	};
	return service;
};

function BoughtFilter(){
	return function(items){
		let _items = [];
		if(items){
			_items = items;
		}
		return _items.filter(function(item){
			return item.isBought;
		});
	};
};

function ToBuyFilter(){
	return function(items){
		let _items = [];
		if(items){
			_items = items;
		}
		return _items.filter(function(item){
			return !item.isBought;
		});
	};
};