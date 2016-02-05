(function() {
	"use strict";
	angular.module("watgAutocompleteApp").controller("testController", ['$scope', testController]);

	function testController($scope) {
		$scope.staffAutoCompleteRemoteUrl = "http://irv9909zdqzq1/watgxapirest/api/Staff/AutoCompleteStaff";
		$scope.countryAutoCompleteRemoteUrl = "http://irv9909zdqzq1/watgxapirest/api/Common/AutoCompleteWatgCountries";
		$scope.minLength = 1;
		$scope.staff = {};
		$scope.country = {};
	}
})();
