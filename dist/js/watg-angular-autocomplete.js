(function() {
	"use strict";
	angular.module("watgAutocompleteModule", []);
})();

(function () {
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
                  source: function (request, response) {
                     var vm = {
                        namePart: request.term
                     };
                     if (scope.config.args) {
                        for (var propt in scope.config.args) {
                           vm[propt] = scope.config.args[propt];
                        }
                     }
                     $.ajax({
                        url: scope.config.url,
                        dataType: "json",
                        xhrFields: {
                           "withCredentials": true
                        },
                        data: vm,
                        success: function (data) {
                           if (data) {
                              if (data.length === 0) {
                                 scope.itemFound = false;
                                 scope.$apply();
                              }
                              if (scope.config.forceSelection && data.length === 0 && scope.selectedItem) {
                                 scope.selectedItem = {};
                                 scope.$apply();
                              }
                              response($.map(data, function (item) {
                                 if (scope.config.forceSelection && data.length === 1) {
                                    scope.selectedItem = item;
                                    scope.itemFound = true;
                                    scope.$apply();
                                 }
                                 var value = item[scope.config.displayValues[0]];
                                 var displayValueCounter = 0;
                                 var details = "";
                                 for (var i = 1; i < scope.config.displayValues.length; i++) {
                                    var displayValue = scope.config.displayValues[i];
                                    console.log(displayValue);
                                    var valuePart;
                                    if (displayValue.indexOf(".") >= 0) {
                                       var parts = displayValue.split(".");
                                       var currentItem = item;
                                       parts.forEach(function (part) {
                                          if (currentItem !== null) {
                                             currentItem = currentItem[part];
                                             if (typeof currentItem !== 'object') valuePart = currentItem;
                                          }
                                       });
                                    } else {
                                       valuePart = item[displayValue];
                                    }
                                    if (displayValueCounter > 0 && valuePart) details += ", ";
                                    if (valuePart !== undefined) details += valuePart;
                                    displayValueCounter++;
                                 }
                                 return {
                                    id: item.Id,
                                    value: value,
                                    details: details,
                                    item: item
                                 };
                              }));
                           }
                        },
                        error: function (data) {
                           console.log(data);
                        }
                     });
                  },
                  delay: scope.config.delay,
                  minLength: scope.config.minLength,
                  select: function (event, ui) {
                     scope.selectedItem = ui.item.item;
                     scope.itemFound = true;
                     scope.$apply();
                  },
                  open: function () {
                     $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
                  },
                  close: function () {
                     $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
                  }
               }).autocomplete("instance")._renderItem = function (ul, item) {
                  return $("<li>")
                     .append("<div>" + item.value + "</div><div style='color:gray; font-style:italic'>" + item.details + "</div>")
                     .appendTo(ul);
               };
            } else {
               console.error("watg-angular-autocomplete: No configuration found");
            }
         } catch (e) {
            console.error("watg-angular-autocomplete: error " + e);
         }
      }
   }
}());