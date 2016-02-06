# watg-angular-autocomplete
WATG auto-complete directrive for angularjs web applications. Based on jquery-ui autocomplete API.

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

```js
angular.module('myApp', ['...','watgAutocompleteModule']);
```

## Example

### Step 1. Directive Set-up

```html
<input
type="text"
class="form-control"
watg-autocomplete
config="appConfig.autoCompleteStaffConfig"
ng-model="absentee.StaffExt.FullName"
selected-item="absentee.StaffExt"
placeholder="type to find staff"
/>
```

### Step 2. Configuration

```js
$scope.autoCompleteStaffConfig: {
    url: "http://...to your source of data",
    displayValue: 'FullName', //the piece of data in your source that shows
    delay: 200,  //jqueryUI API
    minLength: 1 //jqueryUI API
};
$scope.selectedItem={};
```