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
                config: "="
            },
            link: link
        };

        function link(scope, element) {
            try {
                if (scope.config !== null && scope.config !== undefined && scope.config.url !== undefined) {
                    element.autocomplete({
                        source: function(request, response) {
                            $.ajax({
                                url: scope.config.url,
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
                                                value: item[scope.config.displayValue],
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
