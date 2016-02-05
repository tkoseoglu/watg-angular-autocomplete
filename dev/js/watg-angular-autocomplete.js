(function() {
	"use strict";
	angular.module("watgAutocompleteApp", [
    	"ngRoute",
        "ngSanitize"
    ]);
})();

(function() {
	var app = angular.module('watgAutocompleteApp');
	app.config(appConfig);
	app.run(appRun);

	function appConfig($httpProvider, $routeProvider) {
		//this is for CORS operations
		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
		if (!$httpProvider.defaults.headers.get) {
			$httpProvider.defaults.headers.get = {};
		}
		//disable IE ajax request caching
		$httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
		//routes
		$routeProvider
		.when('/test', {
			templateUrl: 'src/app/tests/testView.html',
			controller: 'testController'
		}).otherwise({
			redirectTo: '/test'
		});
	}

	function appRun() {

	}


})();

(function() {
    "use strict";
    angular.module("watgAutocompleteApp").directive("watgAutocomplete", ['$rootScope', watgAutocomplete]);

    function watgAutocomplete($rootScope) {
        return {
            restrict: "A",
            require: "ngModel",
            scope: {
                selectedItem: "=",
                itemDisplayPropertyName: "=",
                delay: "=",
                remoteUrl: "=",
                minLength: "="
            },
            link: link
        };

        function link(scope, element) {
            $(function() {
                element.autocomplete({
                    source: function(request, response) {
                        $.get({
                            url: scope.remoteUrl,
                            dataType: "json",
                            xhrFields: {
                                "withCredentials": true
                            },
                            data: {
                                namePart: request.term
                            },
                            success: function(data) {
                                if (data) {
                                    if (data.length === 0 && scope.selectedItem) {
                                        scope.selectedItem = {};
                                        scope.$apply();
                                    }
                                    response($.map(data, function(item) {
                                        if (data.length === 1) {
                                            scope.selectedItem = item;
                                            scope.$apply();
                                        }
                                        return {
                                            id: item.Id,
                                            value: item[scope.itemDisplayPropertyName],
                                            item: item
                                        };
                                    }));
                                }
                            },
                            error: function(data) {
                                console.log(data);
                            }
                        });
                    },
                    delay: scope.delay,
                    minLength: scope.minLength,
                    select: function(event, ui) {
                        scope.selectedItem = ui.item.item;
                        scope.$apply();
                    },
                    open: function() {
                        $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
                    },
                    close: function() {
                        $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
                    }
                });
            });
        }
    }
}());

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
