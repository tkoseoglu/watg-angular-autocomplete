(function() {
    "use strict";
    angular.module("watgAutocompleteModule").controller("testController", ['$scope', testController]);

    function testController($scope) {
        $scope.autoCompleteConfigStaff = {
            url: "http://irv9909zdqzq1/watgxapirest/api/Staff/AutoCompleteStaff",
            displayValue: 'FullName',
            delay: 200,
            minLength: 1,
            args: {
                InActive: false,
                Deleted: false
            }
        };
        $scope.autoCompleteConfigCountry = {
            url: "http://irv9909zdqzq1/watgxapirest/api/Common/AutoCompleteWatgCountries",
            displayValue: 'Name',
            delay: 200,
            minLength: 1
        };
        $scope.staff = {};
        $scope.country = {};
    }
})();
