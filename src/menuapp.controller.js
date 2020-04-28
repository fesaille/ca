(function () {
  "use strict";

  angular.module("MenuApp").controller("MenuAppController", MenuAppController);

  // MenuAppController.$inject = ["MenuDataService"];
  // function MainShoppingListController(ShoppingListService) {
  MenuAppController.$inject = ['catItems'];
  function MenuAppController(items) {
    var menu = this;
    menu.categories = items;

    // menu.$onInit = function () {
    //   MenuDataService.getAllCategories().then(function (result) {
    //     menu.categories = result;
    //   });
    // };
  }
})();
