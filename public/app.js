var app = angular.module('flapperNews', []);

app.controller('MainCtrl',[
    '$scope',
    function($scope){
        $scope.test = 'Hello world!';
        $scope.posts = [
            {title: 'post 1', upvotes: 5},
            {title: 'post 2', upvotes: 4},
            {title: 'post 3', upvotes: 10},
            {title: 'post 4', upvotes: 12},
            {title: 'post 5', upvotes: 6}
        ];
    }]);

