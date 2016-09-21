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
            $scope.refreshData();
            if (res.data.data.external_account.account_id) {
                $scope.account = res.data.data.external_account.account_id
            } else {
                $state.go('app.username');
            }

        });

        $scope.refreshData = function () {
            var myAddress = 'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=' + $scope.account + '&choe=UTF-8';
            $scope.myAddress = myAddress;
            $window.localStorage.setItem('myAddress', JSON.stringify(myAddress));
        };

    });