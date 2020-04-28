(function () {
'use strict';

angular.module('MenuApp')
.controller('CatDetailController', CatDetailController);


CatDetailController.$inject = ['catDetailItems'];
function CatDetailController(items) {
  var catDetail = this;
  catDetail.detail = items;
  // console.log(itemId);
}

})();
