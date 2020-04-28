(function () {
  "use strict";

  angular.module("MenuApp").config(RoutesConfig);

  RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise("/");

    // *** Set up UI states ***
    $stateProvider
      // Home page
      .state("home", {
        url: "/",
        templateUrl: "src/menuApp/templates/home.template.html",
      })
      // categories list page
      .state("categories", {
        url: "/categories",
        templateUrl: "src/menuApp/templates/main-categories.template.html",
        controller: "MenuAppController as ctl",
        resolve: {
          catItems: [
            "MenuDataService",
            function (MenuData) {
              return MenuData.getAllCategories();
            },
          ],
        },
      })
      .state("categories.catDetail", {
        url: "/{shortName}",
        templateUrl: "src/menuApp/templates/main-items.template.html",
        controller: "CatDetailController as ctlDetail",
        params: { shortName: null },
        resolve: {
          catDetailItems: ["$stateParams", "MenuDataService",
            function ($stateParams, MenuData) {
              // console.log($stateParams);
              return MenuData.getItemsForCategory($stateParams.shortName);
            },
          ],
        }
      });
  };
})();
