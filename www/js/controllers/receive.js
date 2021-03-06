angular.module('stellar-wallet.controllers.receive', [])

    .controller('ReceiveCtrl', function ($scope) {
        'use strict';
        $scope.data = {};
    })

    .controller('ReceiveCtrl', function ($scope, $window, $state, User) {
        User.getInfo().then(function (res) {

            if ($window.localStorage.myAddress) {
                $scope.myAddress = JSON.parse($window.localStorage.myAddress);
            }

            if (res.data.data.username) {
                $scope.account = res.data.data.external_account.account_id;
                var myAddress = 'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=stellar:' + $scope.account + '&choe=UTF-8';
                $scope.myAddress = myAddress;
            } else {
                $state.go('app.username');
            }

        });
    });