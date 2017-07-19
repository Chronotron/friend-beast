
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
                    return value * 100;
                });

                ngModelController.$parsers.unshift(function (value) {
                    return (parseInt(value, 10) || 0) / 100;
                });

                ngModelController.$validators.validMaxPercent = function (modelValue) {
                    return modelValue <= 1;
                };
            }
        }
    }


})();
