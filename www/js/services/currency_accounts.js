/*global Firebase, console, angular */
angular.module('stellar-wallet.services.currency_accounts', [])

    .service('CurrencyAccounts', function ($http, API) {
        'use strict';
        var self = this;

        self.list = function () {
            return $http.get(API + '/accounts/tokens/');
        };

        self.set = function (currency, account, issuer) {
            return $http.post(API + '/accounts/tokens/set/', {
                currency: currency,
                account: account,
                issuer: issuer
            });
        };

        self.create = function (code, issuer) {
            return $http.post(API + '/accounts/currencies/external/add', {
                code: code,
                issuer: issuer
            });
        };
    })