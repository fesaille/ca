(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://powerful-wildwood-52431.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
