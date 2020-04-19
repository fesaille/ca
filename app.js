(function () {
  "use strict";
  angular
    .module("NarrowItDownApp", [])
    .controller("NarrowItDownController", NarrowItDownController)
    .service("MenuSearchService", MenuSearchService)
    .constant("ApiPath", "https://davids-restaurant.herokuapp.com")
    .component("searchResult", {
      templateUrl: "searchResult.html",
      controller: SearchResultController,
      bindings: {
        items: "<",
        onRemove: "&",
      },
    });

  // .factory("MenuSearchFactory", MenuSearchFactory)
  SearchResultController.$inject = ["$element"];
  function SearchResultController($element) {
    var $ctrl = this;

    $ctrl.remove = function (eltIdx) {
      console.log(eltIdx);
      $ctrl.onRemove({ index: eltIdx });
    };
  }

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(MenuSearchService, baseUrl) {
    var menu = this;

    menu.getItems = function () {
      MenuSearchService.getMatchedMenuItems(this.searchTerm).then(
        (res) => (menu.found = res)
      );
    };

    menu.removeItem = function(idx) {
      menu.found.splice(idx, 1);
    }

  }

  MenuSearchService.$inject = ["$http", "ApiPath"];
  function MenuSearchService($http, ApiPath) {
    var service = this;
    var foundItems;

    service.getMatchedMenuItems = function (searchTerm) {
      // responsible for reaching out to the server (using the $http service) to
      // retrieve the list of all the menu items.
      // https://davids-restaurant.herokuapp.com/menu_items.json
      // console.log(searchTerm);
      foundItems = $http
        .get(ApiPath + "/menu_items.json", { timeout: 3000 })
        .then(
          (response) =>
            response.data.menu_items.filter((elt) =>
              elt.description.includes(searchTerm)
            ),
          (response) => console.log("Oops")
        );
      return foundItems;
    };

  }
})();
