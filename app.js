(function () {
  "use strict";

  if (typeof String.prototype.strip === "undefined") {
    String.prototype.strip = function () {
      return String(this).replace(/^\s+|\s+$/g, "");
    };
  }

  // Split a string (separator is default to ',') into an array
  // and strip elements
  const str2array = (str, sep = ",") =>
    str.split(sep).map((elt) => elt.strip());
  // Same but convert to a set (remove double elements)
  const str2set = (str, sep = ",") => new Set(str2array(str, sep));

  angular
    .module("LunchCheck", [])
    .controller("LunchCheckController", LunchCheckController);

  LunchCheckController.$inject = ["$scope"];

  function LunchCheckController($scope) {
    // this is the message to display
    const defaultCheckMessage = {
      text: "Please enter data first",
      style: {
        color: "red",
        "border-style": "outset",
        "border-color": "red",
      },
    };

    // set the default message
    $scope.LunchCheckMessage = defaultCheckMessage;

    $scope.lunchChecker = function () {
      // console.log(typeof $scope.lunchCheckElts !== 'undefined');
      if (typeof $scope.lunchCheckElts !== 'undefined' && $scope.lunchCheckElts !== "") {
        let lunchCheckElts = str2set($scope.lunchCheckElts);
        // remove empty value if present
        lunchCheckElts.delete("");
        // if less than 3 elements, "Enjoy!" else "too much!"
        $scope.LunchCheckMessage = {
          text: lunchCheckElts.size <= 3 ? "Enjoy!" : "Too much!",
          style: {
            color: "green",
            "border-style": "outset",
            "border-color": "green",
          },
        };
      } else {
        $scope.LunchCheckMessage = defaultCheckMessage;
      }
    };
  }
})();
