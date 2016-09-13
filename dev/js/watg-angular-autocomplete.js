(function() {
	"use strict";
	angular.module("watgAutocompleteModule", [
    	"ngRoute",
        "ngSanitize"
    ]);
})();

(function() {
	var app = angular.module('watgAutocompleteModule');
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
		$routeProvider.when('/test', {
			templateUrl: 'src/app/tests/testView.html',
			controller: 'testController'
		}).otherwise({
			redirectTo: '/test'
		});
	}

	function appRun() {}
})();

(function() {
    "use strict";
    angular.module("watgAutocompleteModule").directive("watgAutocomplete", watgAutocomplete);

    function watgAutocomplete() {
        return {
            restrict: "E",
            require: "ngModel",
            template: "<input type='text' class='form-control' />",
            replace: "true",
            scope: {
                selectedItem: "=",
                config: "=",
                itemFound: "=?"
            },
            link: link
        };

        function link(scope, element) {
            try {
                if (scope.config !== null && scope.config !== undefined && scope.config.url !== undefined) {
                    if (scope.itemFound === undefined) scope.itemFound = true;
                    element.autocomplete({
                        source: function(request, response) {
                            var vm = {
                                namePart: request.term
                            };
                            if (scope.config.args) {
                                for (var propt in scope.config.args) {
                                    vm[propt] = scope.config.args[propt];
                                }
                            }
                            console.log(vm);
                            $.ajax({
                                url: scope.config.url,
                                dataType: "json",
                                xhrFields: {
                                    "withCredentials": true
                                },
                                data: vm,
                                success: function(data) {
                                    if (data) {
                                        if (data.length === 0) {
                                            scope.itemFound = false;
                                            scope.$apply();
                                        }
                                        if (scope.config.forceSelection && data.length === 0 && scope.selectedItem) {
                                            scope.selectedItem = {};
                                            scope.$apply();
                                        }
                                        response($.map(data, function(item) {
                                            if (scope.config.forceSelection && data.length === 1) {
                                                scope.selectedItem = item;
                                                scope.itemFound = true;
                                                scope.$apply();
                                            }
                                            var value = "";
                                            var displayValueCounter = 0;
                                            scope.config.displayValues.forEach(function(displayValue) {
                                                console.log(displayValue);
                                                var valuePart;
                                                if (displayValue.indexOf(".") >= 0) {
                                                    var parts = displayValue.split(".");
                                                    var currentItem = item;
                                                    parts.forEach(function(part) {
                                                        if (currentItem !== null) {
                                                            currentItem = currentItem[part];
                                                            if (typeof currentItem !== 'object') valuePart = currentItem;
                                                        }
                                                    });
                                                } else {
                                                    valuePart = item[displayValue];
                                                }
                                                if (displayValueCounter > 0 && valuePart) value += ", ";
                                                if (valuePart !== undefined) value += valuePart;
                                                displayValueCounter++;
                                            });
                                            return {
                                                id: item.Id,
                                                value: value,
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
                        delay: scope.config.delay,
                        minLength: scope.config.minLength,
                        select: function(event, ui) {
                            scope.selectedItem = ui.item.item;
                            scope.itemFound = true;
                            scope.$apply();
                        },
                        open: function() {
                            $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
                        },
                        close: function() {
                            $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
                        }
                    });
                } else {
                    console.error("watg-angular-autocomplete: No configuration found");
                }
            } catch (e) {
                console.error("watg-angular-autocomplete: error " + e);
            }
        }
    }
}());

(function() {
    "use strict";
    angular.module("watgAutocompleteModule").controller("testController", ['$scope', testController]);

    function testController($scope) {
        $scope.autoCompleteConfigStaff = {
            url: "http://irv9909zdqzq1/watgxapirest/api/Staff/AutoCompleteStaff",
            displayValues: ['FullName','WatgOffice.OfficeName'],
            delay: 200,
            minLength: 1,
            args: {
                InActive: false,
                Deleted: false
            }
        };
        $scope.autoCompleteConfigCountry = {
            url: "http://irv9909zdqzq1/watgxapirest/api/Common/AutoCompleteWatgCountries",
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
        $scope.staff = {};
        $scope.country = {};
        $scope.company = {};
    }
})();
