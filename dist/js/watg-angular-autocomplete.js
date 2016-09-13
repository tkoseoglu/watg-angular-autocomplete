(function() {
	"use strict";
	angular.module("watgAutocompleteModule", []);
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
                                                if (displayValueCounter > 0) value += ", ";
                                                if (displayValue.indexOf(".") >= 0) {
                                                    var parts = displayValue.split(".");
                                                    //value += item[parts[0]][parts[1]];
                                                    var currentItem = item;
                                                    parts.forEach(function(part) {
                                                        currentItem = currentItem[part];
                                                        if (typeof currentItem !== 'object') value += currentItem;
                                                    });
                                                } else {
                                                    value += item[displayValue];
                                                }
                                                displayValueCounter++;
                                            });
                                            /*if (scope.config.displayValue2 && item[scope.config.displayValue2] !== undefined) {
                                                var value2 = item[scope.config.displayValue2];
                                                if (value2 !== null) {
                                                    if (scope.config.displayValue3 && value2[scope.config.displayValue3] !== undefined) {
                                                        var value3 = item[scope.config.displayValue2][scope.config.displayValue3]
                                                        value += " (" + value3 + ")";
                                                    } else {
                                                        value += " (" + value2 + ")";
                                                    }
                                                }
                                            }*/
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
