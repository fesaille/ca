(function () {
  "use strict";

  angular.module("common").service("UserService", UserService);

  UserService.$inject = ["MenuService"];
  function UserService(MenuService) {
    var user = {};
    // user.aze = true;

    this.set = function (u) {
      user = u; 

      MenuService.getFavMenuItem(user.favMenuNumber)
        .then(function (response) {
          user.favMenuItem = response.data;
          // console.log(user.favMenuItem);
        })
        .catch(function (error) {
          console.log("Oups");
          console.log(error);
          return false;
        });
      return true;
    };

    this.get = function () {
      // console.log(user);
      return user;
    };
  }
})();
