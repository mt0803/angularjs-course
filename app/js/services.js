'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var services = angular.module('myApp.financeService', [])
    .factory('currencyConverter', function() {
        var currencies = ['USD', 'EUR', 'CNY'];
        var usdToForeignRates = {
            USD: 1,
            EUR: 0.74,
            CNY: 6.09
        };
        var convert = function (amount, inCurr, outCurr) {
            return amount * usdToForeignRates[outCurr] / usdToForeignRates[inCurr];
        };
        return {
            currencies: currencies,
            convert: convert
        };
    });
