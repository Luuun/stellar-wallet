angular.module('stellar-wallet.controllers.currency_accounts', [])

    .controller('CurrencyAccountsCtrl', function ($scope, $window, $ionicPopup, $ionicModal, $state, $stateParams, $ionicLoading, CurrencyAccounts, Conversions) {
        'use strict';

        $scope.listData = function () {
            CurrencyAccounts.list().success(
                function (res) {
                    var items = [];

                    for (var i = 0; i < res.data.length; i++) {
                        res.data[i].balance = Conversions.from_cents(res.data[i].balance);
                        items.push(res.data[i]);
                        console.log(res.data[i])
                    }

                    $scope.items = items;
                    $window.localStorage.setItem('myAccountTokens', JSON.stringify(items));
                    $scope.$broadcast('scroll.refreshComplete');
                }
            );
        };

        $scope.setToken = function (account_reference, account_currency) {
            $ionicLoading.show({
                template: 'Switching Account Token...'
            });

            CurrencyAccounts.set(account_reference, account_currency).then(function (res) {
                if (res.status === 200) {
                    $ionicLoading.hide();
                    $scope.listData();
                } else {
                    $ionicLoading.hide();
                    $ionicPopup.alert({title: "Error", template: res.message});
                }
            }).catch(function (error) {
                $ionicPopup.alert({title: 'Authentication failed', template: error.message});
                $ionicLoading.hide();
            });

        };

        $scope.listData();
    })

    .controller('AddCurrencyCtrl', function ($scope, $window, $ionicPopup, $ionicModal, $state, $stateParams, $ionicLoading, CurrencyAccounts, Conversions) {
        'use strict';

        $scope.submit = function (form) {
            if (form.$valid) {
                $state.go('app.add_currency_confirm', {
                    code: form.code.$viewValue,
                    issuer: form.issuer.$viewValue
                });
            }
        };
    })

    .controller('AddCurrencyConfirmCtrl', function ($scope, $window, $ionicPopup, $ionicModal, $state, $stateParams, $ionicLoading, CurrencyAccounts, Conversions) {
        'use strict';

        $scope.code = $stateParams.code;
        $scope.issuer = $stateParams.issuer;

        $scope.submit = function (code, issuer) {
            $ionicLoading.show({
                template: 'Adding...'
            });

            CurrencyAccounts.create(code, issuer).then(function (res) {
                if (res.status === 200 || res.status === 201) {
                    $ionicLoading.hide();
                    $state.go('app.currency_accounts');
                } else {
                    $ionicLoading.hide();
                    $ionicPopup.alert({title: "Error", template: res.data.message});
                }
            }).catch(function (error) {
                $ionicPopup.alert({title: 'Authentication failed', template: error.message});
                $ionicLoading.hide();
            });
        };
    });