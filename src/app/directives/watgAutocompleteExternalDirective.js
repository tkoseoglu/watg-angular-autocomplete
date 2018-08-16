(function () {
   "use strict";
   angular.module("watgAutocompleteModule").directive("watgAutocompleteExternal", watgAutocompleteExternal);

   function watgAutocompleteExternal() {
      return {
         restrict: "E",
         require: "ngModel",
         template: "<input type='text' class='form-control' />",
         replace: "true",
         scope: {
            config: "=",
            selectedItem: "="
         },
         link: link
      };

      function link(scope, element) {
         try {
            if (scope.config.url !== null) {
               element.autocomplete({
                  source: function (request, response) {
                     $.ajax({
                        url: scope.config.url,
                        dataType: "json",
                        data: {
                           "school.name": request.term,
                           api_key: "tyAt6Kvkm030toXJY6ApfIJDDgu8uo0UKqwu6qNo"
                        },
                        success: function (data) {
                           var results = data[scope.config.displayValues[0]];
                           response($.map(results, function (result) {
                              var value = result["school"]["name"];
                              return {
                                 value: value,
                                 item: result
                              };
                           }));
                        },
                        error: function (response) {
                           console.log(response);
                        }
                     });
                  },
                  delay: scope.config.delay,
                  minLength: scope.config.minLength,
                  select: function (event, ui) {
                     // scope.selectedItem = ui.item.item;
                     // scope.itemFound = true;
                     // scope.$apply();
                  },
                  open: function () {
                     $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
                  },
                  close: function () {
                     $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
                  }
               });
            } else {
               console.error("watg-angular-autocomplete-external: No configuration found");
            }
         } catch (e) {
            console.error("watg-angular-autocomplete-external: error " + e);
         }
      }
   }
}());