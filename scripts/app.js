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

        $('#song-search').keyup(function() {
            $.ajax({});
        });

        $(document).on('click', '#rsvp', function () {

            var name = $('#rsvp-name').val();
            var email = $('#rsvp-email').val();
            var guests = $('#rsvp-guests').val();

            var missingName = false;
            var missingGuests = false;

            if (name === '') {
                missingName = true;

                // highlight input
                $('#rsvp-name').attr('style', 'border: 2px solid red');
            }

            if (email === '') {
                email = undefined;
            }

            if (guests === '') {
                missingGuests = true;

                // highlight input
                $('#rsvp-guests').attr('style', 'border: 2px solid red');
            }

            if (!missingName && !missingGuests) {
                // Send values to server
                $.ajax(
                    {
                        type: 'POST',
                        url: 'rsvp.php',
                        data: {
                            name: name,
                            email: email,
                            guests: guests
                        },
                        success: function (data) {
                            $('.rsvp-modal-background').remove();

                            var success = $('<div class="alert alert-success message" role="alert"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span>&nbsp;' + data + '</div>');

                            $('body').append(success);

                            setTimeout(function () {
                                $('.alert.message').remove();
                            }, 3000);
                        },
                        error: function (data) {
                            $('.alert.error').remove();

                            var errors = $('<div class="alert alert-danger error" role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;' + data + '</div>');

                            $('#errors').append(errors);
                        }
                    }
                );
            }
        });

        $('#open-rsvp').click(function () {

            // build the modal window
            var background = $('<div class="rsvp-modal-background"></div>');
            var content = $('<div class="rsvp-modal-content"><div id="errors"></div><div class="header"><h3>RSVP</h3></div></div>');
            var name = $('<input type="text" id="rsvp-name" class="form-control rsvp-input" placeholder="Enter your name...">');
            var email = $('<input type="text" id="rsvp-email" class="form-control rsvp-input" placeholder="Email (optional)">');
            var rsvpButton = $('<div><button id="rsvp" type="button" class="btn btn-default btn-lg">RSVP</button></div>');
            var cancel = $('<div class="rsvp-modal-cancel"><span id="cancel">CANCEL</span></div>');
            var guestSelect = $('<select id="rsvp-guests" class="form-control rsvp-input"><option value="">Number of Guests</option></option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option></select>');

            $(content).append(name);
            $(content).append(email);
            $(content).append(guestSelect);
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
