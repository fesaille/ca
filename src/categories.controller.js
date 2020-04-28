(function () {
  "use strict";

  angular
    .module("MenuApp")
    .controller("CatDetailController", CatDetailController);

  CatDetailController.$inject = ["$stateParams", "items"];
  function CatDetailController($stateParams, items) {
    var catDetail = this;
    var item = items[$stateParams.itemId][0];
    catDetail.name = item.name;
    catDetail.price_small = item.price_small;
    catDetail.description = item.description;
  }
})();
