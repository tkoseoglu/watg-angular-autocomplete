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
