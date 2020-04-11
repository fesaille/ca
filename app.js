(function () {
  "use strict";

  angular
    .module("ShoppingListApp", [])
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

  /* inject $scope */
  // ToBuyController.$inject = ["$scope"];
  // function ToBuyController($scope) {
  //   $scope.hoppingList = ToBuyItemsList;
  // }

  ToBuyController.$inject = ["ShoppingListCheckOffService"];
  function ToBuyController(ShoppingListCheckOffService) {
    this.items = ShoppingListCheckOffService.getToBuyItemsList();
    this.buy = ShoppingListCheckOffService.buy;
  }

  AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    this.items = ShoppingListCheckOffService.getBoughtItemsList();
  }

  function ShoppingListCheckOffService() {

    var ToBuyItemsList = [
      { name: "cookies", quantity: 10 },
      { name: "brownies", quantity: 5 },
      { name: "marshmallows", quantity: 400 },
      { name: "pies", quantity: 5 },
      { name: "eggs", quantity: 20 },
    ];

    var BoughtItemsList = [];

    this.getBoughtItemsList = () => BoughtItemsList;
    this.getToBuyItemsList = () => ToBuyItemsList;

    this.buy = function(elt) {
      const index = ToBuyItemsList.indexOf(elt);
      ToBuyItemsList.splice(index, 1);
      BoughtItemsList.push(elt);
      console.log(elt);

    };
  }
})();
