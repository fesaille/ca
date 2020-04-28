(function () {
  "use strict";

  angular
    .module("data")
    .service("MenuDataService", MenuDataService);

  MenuDataService.$inject = ["$http", "ApiPath"];
  function MenuDataService($http, ApiPath) {
    var service = this;
     
    // The MenuDataService should have 2 methods:
    const categoriesUrl = ApiPath + "/" + "categories.json";
     
    // getAllCategories - this method should return a promise which is a result
    // of using the $http service, using the following REST API endpoint:
    // https://davids-restaurant.herokuapp.com/categories.json
    //
    service.getAllCategories = function () {
      let foundItems = $http.get(categoriesUrl, { timeout: 3000 }).then(
        (response) => response.data,
        (response) => console.log("Oops")
      );
      return foundItems;
    };

    service.getItemsForCategory = function (categoryShortName) { 
      let menuItemsUrl = ApiPath + "/" + "menu_items.json?category=" + categoryShortName;
      let foundItems = $http.get(menuItemsUrl, { timeout: 3000 }).then(
        (response) => response.data,
        (response) => console.log("Oops")
      );
      // console.log(foundItems);
      return foundItems;
    };

    };
})();
