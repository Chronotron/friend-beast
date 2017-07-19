(function () {
    angular.module('experimentModule', []);

    angular.module('experimentModule').directive('expPercentageInput', expPercentageInput);

    function expPercentageInput() {
        return {
            template: '<input type="number" min="0.0" max="100" step="1">',
            replace: true,
            require: 'ngModel',
            link: function (scope, element, attr, ngModelController) {
                ngModelController.$formatters.unshift(function (value) {
                    return Math.floor(value * 100);
                });

                ngModelController.$parsers.unshift(function (value) {
                    return (parseInt(value, 10) || 0) / 100;
                });

                ngModelController.$validators.validMaxPercent = function (modelValue) {
                    return modelValue <= 1;
                };

                element.after(angular.element('<span>%</span>'));
            }
        }
    }

    angular.module('experimentModule').directive('expPercentageConverterInput', expPercentageConverterInput);

    function expPercentageConverterInput() {
        return {
            template: '' +
            '<div>' +
            '<input type="number" ng-model="percentage" min="0.0" max="1" step="0.01">&nbsp;' +
            '<label ng-bind="getConvertedPercentage()"></label>' +
            '</div>',
            scope: {
                percentage: '='
            },
            link: function (scope) {
                scope.getConvertedPercentage = function () {
                  return (Math.floor(scope.percentage * 100) || 0) + ' %';
                };
            }
        }
    }

})();
