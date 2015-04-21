(function () {

    var app = angular.module('wedding', []);

    app.factory('instagram', ['$http', function ($http) {

        var client_id = '7dd75e008c7941d98c00647bea73f7c3';

        return {

            fetchPopular: function (callback) {

                var endpoint = 'https://api.instagram.com/v1/tags/stepanminchey2015/media/recent?client_id=' + client_id + '&callback=JSON_CALLBACK&count=1000';

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

$(function () {
    $('#counter').countdown({
        date: new Date('05/30/15 19:00:00')
    });
});

$(document).ready(
    function () {
        $('#rsvp').click(function () {

            var name = $('#rsvp-name').val();

            // Send values to server
            $.ajax(
                {
                    type: 'POST',
                    url: 'rsvp.php',
                    data: {
                        name: name
                    },
                    success: function (data) {
                        alert(name);
                    },
                    error: function (data) {
                        alert('boo');
                    }
                }
            );

        });

        $('#open-rsvp').click(function () {

            // build the modal window
            var background = $('<div class="rsvp-modal-background"></div>');
            var content = $('<div class="rsvp-modal-content"><div class="header"><h3>RSVP</h3></div></div>');
            var name = $('<input type="text" id="rsvp-name" class="form-control rsvp-input" placeholder="Enter your name...">');
            var email = $('<input type="text" id="rsvp-name" class="form-control rsvp-input" placeholder="Email">');
            var rsvpButton = $('<div><button id="rsvp" type="button" class="btn btn-default btn-lg">RSVP</button></div>');
            var cancel = $('<div class="rsvp-modal-cancel"><span id="cancel">CANCEL</span></div>');

            $(content).append(name);
            $(content).append(email);
            $(content).append(rsvpButton);
            $(content).append(cancel);
            $(background).append(content);

            $('body').append(background);

        });

        $(document).on('click', '#cancel', function () {

            $('.rsvp-modal-background').remove();

        });
    }
);