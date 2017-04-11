(function() {
    "use strict";
    angular.module("watgAutocompleteModule").controller("testController", ['$scope', testController]);

    function testController($scope) {

        $scope.staff = {};
        $scope.country = {};
        $scope.company = {};


        $scope.autoCompleteConfigStaff = {
            url: "http://192.168.0.7/watgApi/api/Staff/AutoCompleteStaff",
            displayValues: ['FullName', 'WatgOffice.OfficeName'],
            delay: 200,
            minLength: 1,
            args: {
                InActive: false,
                Deleted: false
            }
        };
        $scope.autoCompleteConfigCountry = {
            url: "http://192.168.0.7/watgApi/api/Common/AutoCompleteWatgCountries",
            displayValues: ['Name'],
            delay: 200,
            minLength: 1
        };
        $scope.autoCompleteConfigCompany = {
            url: "http://localhost:63181/Util/AutoCompleteAccountsWithAddress",
            displayValues: ['Name'],
            delay: 200,
            minLength: 1
        };
        $scope.autoCompleteConfigExternalSource = {
            url: "https://api.data.gov/ed/collegescorecard/v1/schools",
            displayValues: ['results', 'school', 'name'],
            delay: 200,
            minLength: 2
        };
        $scope.selectedExternalItem = "Test";

        // //external
        // //https://www.nearbycolleges.info/api/autocomplete?q=texas&limit=10
        // //$scope.externalBaseUrl = "https://www.nearbycolleges.info/api/autocomplete";
        // $scope.externalBaseUrl = "https://api.data.gov/ed/collegescorecard/v1/schools";
        // $scope.dataPath = "results";

    }
})();