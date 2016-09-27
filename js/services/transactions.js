/*global Firebase, console, angular */
angular.module('stellar-wallet.services.transactions', [])

    .service('Balance', function ($http, API) {
        'use strict';
        var self = this;
        self.get = function () {
            return $http.post(API + '/accounts/balance/');
        }
    })

    .service('Transaction', function ($http, API, CurrencyAccounts) {
        'use strict';
        var self = this;

        self.list = function () {
            return $http.get(API + '/transactions/');
        };

        self.get = function (txId) {
            return $http.get(API + '/transactions/' + txId + '/');
        };

        self.create = function (amount, note, to) {

            var issuer = '';
            var account = '';
            var metadata = {};

            return $http.post(API + '/transactions/send/', {
                amount: amount,
                note: note,
                recipient: to,
                issuer: issuer,
                account: account,
                metadata: metadata
            });
        };
    })


    .service('Withdrawal', function ($http, API) {
        'use strict';
        var self = this;

        self.create = function (amount, reference) {
            return $http.post(API + '/transactions/withdraw/', {
                amount: amount,
                currency: '',
                account: '',
                note: '',
                reference: reference
            });
        };
    })


    .service('DepositDetails', function ($http, API) {
        'use strict';
        var self = this;

        self.get = function () {
            return $http.get(API + '/transactions/deposit_details/');
        };
    })


    .service('Conversions', function ($window) {
        'use strict';
        var self = this;

        self.from_cents = function (amount) {
            var currency = JSON.parse($window.localStorage.myCurrency);
            return parseFloat(amount/Math.pow(10, currency.divisibility)).toFixed(currency.divisibility);
        };

        self.to_cents = function (amount) {
            var currency = JSON.parse($window.localStorage.myCurrency);
            return parseFloat(amount*Math.pow(10, currency.divisibility)).toFixed(currency.divisibility);
        };
    });