(function() {
    "use strict";
    angular.module("watgAutocompleteModule").directive("watgAutocomplete", watgAutocomplete);

    function watgAutocomplete() {
        return {
            restrict: "A",
            require: "ngModel",
            scope: {
                selectedItem: "=",
                config: "="
            },
            link: link
        };

        function link(scope, element) {
            console.log(scope.config);
            console.log(scope.selectedItem);
            $(function() {
                element.autocomplete({
                    source: function(request, response) {
                        $.get({
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
            });
        }
    }
}());
