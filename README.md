# watg-angular-autocomplete
WATG auto-complete directrive for angularjs web applications. Based on jquery-ui autocomplete API

## Getting Started

```shell
bower install watg-angular-autocomplete --save
```

### Required Files

```js
bower_components/watg-angular-autocomplete/dist/js/watg-angular-autocomplete.min.js
```

```css
bower_components/watg-angular-autocomplete/dist/css/watg-angular-autocomplete.min.css
```

### Inject module in your app

ngSanitize is a required module.

```js
angular.module('myApp', ['...', 'ngSanitize','watgAutocompleteApp']);
```

## Example

### Step 1. Directive Set-up

```html
<input
   type="text"
   class="form-control"
   watg-autocomplete
   min-length="minLength"
   item-display-property-name="'Name'"
   ng-model="selectedItem.Name"
   remote-url="remoteAutoCompleteSourceUrl"
   selected-item="selectedItem"
   />
```

### Step 2. Configuration

$scope.remoteAutoCompleteSourceUrl = "http://...";
$scope.minLength = 1; //based on jquery-ui auto-complete API
$scope.selectedItem={};
