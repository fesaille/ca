(function () {
  "use strict";

  angular
    .module("public")
    .controller("SignUpController", SignUpController)
    .directive("validdish", validdish);

  SignUpController.$inject = ["UserService"];
  function SignUpController(UserService) {
    this.submit = function () {
      console.log("Submit form");
      console.log(this.user);
      this.completed = UserService.set(this.user);
      console.log(this.completed);
    };
  }

  validdish.$inject = ["MenuService", "$q"];
  function validdish(MenuService, $q) {
    // https://riptutorial.com/angularjs/example/18414/custom-form-validation
    // https://docs.angularjs.org/guide/forms
    return {
      require: "ngModel",
      link: function (scope, elm, attrs, ctrl) {
        ctrl.$asyncValidators.validdish = function (modelValue, viewValue) {
          // validate viewValue with your custom logic

          if (ctrl.$isEmpty(modelValue)) {
            // consider empty model non valid
            console.log("Empty model");
            return $q.reject();
          }

          var def = $q.defer();

          if (!modelValue && !viewValue) def.resolve();
          else {
            var promise = MenuService.getFavMenuItem(modelValue);
            promise
              .then(function (response) {
                console.log("dish short name ", modelValue);
                def.resolve();
              })
              .catch(function (error) {
                console.log("No dish with short name ", modelValue);
                def.reject();
              });
          }
          return def.promise;
        };
      },
    };
  }
})();
