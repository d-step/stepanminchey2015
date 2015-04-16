(function () {

    var app = angular.module('wedding', []);

    app.factory('instagram', ['$http', function ($http) {

        var client_id = '7dd75e008c7941d98c00647bea73f7c3';

        return {

            fetchPopular: function (callback) {

                var endpoint = 'https://api.instagram.com/v1/tags/stepanmincheywedding/media/recent?client_id=' + client_id + '&callback=JSON_CALLBACK&count=1000';

                $http.jsonp(endpoint).success(function (response) {

                    callback(response.data);

                });
            }
        };
    }]);

    app.controller('PhotosController', function ($scope, $http, instagram) {

        $scope.tag = '';
        $scope.viewFullSizePhotos = false;

        instagram.fetchPopular(function (data) {

            $scope.pics = data;

        });

    });

})();

var delay = (function () {

    var timer = 0;

    return function (callback, ms) {
        clearTimeout(timer);

        timer = setTimeout(callback, ms);
    };

})();