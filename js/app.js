/**
 * Created by sergiy on 30.10.15.
 */

'use strict';


var addressBook = angular.module('addressBook', [
    'ngRoute',
    'ngDialog'
]);


addressBook.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.otherwise({
                redirectTo: '/listOfContacts'
            });
    }]);