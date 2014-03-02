var app = angular.module('tagExchange', ['ngRoute']).config(function ($routeProvider) {
    $routeProvider.when('/Create', {
        title: 'Create',
        templateUrl: 'Home/Create',
        controller: 'CreateController'
    });
    $routeProvider.when('/Search', {
        title: 'Discover',
        templateUrl: 'Home/Search',
        controller: 'SearchController'
    });

    $routeProvider.when('/Login', {
        templateUrl: 'Login',
        controller: 'LoginController'
    });

    $routeProvider.when('/CreateAccount', {
        templateUrl: 'CreateAccount',
        controller: 'CreateAccountController'
    });


    $routeProvider.otherwise({redirectTo: '/Search'});
});

app.run(['$location', '$rootScope', function ($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);

app.directive('contenteditable', function () {
    return {
        restrict: 'A', // only activate on element attribute
        require: '?ngModel', // get a hold of NgModelController
        link: function (scope, element, attrs, ngModel) {
            element = element.next();
            if (!ngModel) return; // do nothing if no ng-model

            // Specify how UI should be updated
            ngModel.$render = function () {
                element.html(ngModel.$viewValue || '');
            };

            // Listen for change events to enable binding
            element.on('blur keyup change', function () {
                scope.$apply(read);
            });
            read(); // initialize

            // Write data to the model
            function read() {
                var html = element.html();
                // When we clear the content editable the browser leaves a <br> behind
                // If strip-br attribute is provided then we strip this out
                if (attrs.stripBr && html == '<br>') {
                    html = '';
                }
                ngModel.$setViewValue(html);
            }
        }
    };
});

app.controller('CreateController', function ($scope, $location) {
    $scope.title = 'Create';

    $('[data-role="tagsinput"]').tagsinput({
        typeahead: {
            source: ['Amsterdam', 'Washington', 'Sydney', 'Beijing', 'Cairo'],
            freeInput: true
        }
    });

    $scope.createNewContent = function() {
        $location.path('/');
    };

    
});

app.controller('SearchController', function($scope) {
    $scope.title = 'Discover';

});
app.controller('LoginController', function ($scope) { });
app.controller('CreateAccountController', function ($scope) { });