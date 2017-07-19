describe('expPercentageInput Directive', function () {
    var input;
    var $scope;

    beforeEach(module('experimentModule'));

    beforeEach(inject(function ($compile, $rootScope) {
        // setup
        $scope = $rootScope.$new();
        $scope.percentage = 0.1;

        // pre-conditions
        expect($scope.percentage).toBe(0.1);

        // execute
        input = $compile('<form name="percentageForm"><exp-percentage-input name="percentageModelController" ng-model="percentage"></exp-percentage-input></form>')($scope).find('input');
        $scope.$apply();

        // post-conditions
        expect(input.val()).toBe('10');
        expect($scope.percentageForm.percentageModelController).toBeTruthy();
        expect($scope.percentageForm.percentageModelController.$modelValue).toBe(0.1);
        expect($scope.percentageForm.percentageModelController.$viewValue).toBe(10);
    }));

    it('should format values', function () {
        $scope.percentage = 1;
        $scope.$apply();
        expect($scope.percentageForm.percentageModelController.$viewValue).toBe(100);
        expect(input.val()).toBe('100');

        $scope.percentage = 0.5;
        $scope.$apply();
        expect($scope.percentageForm.percentageModelController.$viewValue).toBe(50);
        expect(input.val()).toBe('50');

        $scope.percentage = 0.22;
        $scope.$apply();
        expect($scope.percentageForm.percentageModelController.$viewValue).toBe(22);
        expect(input.val()).toBe('22');
    });

    it('should parse values', function () {
        $scope.percentageForm.percentageModelController.$setViewValue(100, 'input');
        expect($scope.percentageForm.percentageModelController.$modelValue).toBe(1);

        $scope.percentageForm.percentageModelController.$setViewValue(50, 'input');
        expect($scope.percentageForm.percentageModelController.$modelValue).toBe(0.5);

        $scope.percentageForm.percentageModelController.$setViewValue(22, 'input');
        expect($scope.percentageForm.percentageModelController.$modelValue).toBe(0.22);
    });

    it('should validate values - under min', function () {
        // pre-conditions
        expect($scope.percentageForm.percentageModelController.$invalid).toBeFalsy();
        expect($scope.percentageForm.percentageModelController.$error.validMin).toBeFalsy();

        // execute
        $scope.percentageForm.percentageModelController.$setViewValue(-1, 'input');

        // post-conditions
        expect($scope.percentageForm.percentageModelController.$invalid).toBeTruthy();
    });

    it('should validate values - over max', function () {
        // pre-conditions
        expect($scope.percentageForm.percentageModelController.$invalid).toBeFalsy();
        expect($scope.percentageForm.percentageModelController.$error.validMin).toBeFalsy();

        // execute
        $scope.percentageForm.percentageModelController.$setViewValue(101, 'input');

        // post-conditions
        expect($scope.percentageForm.percentageModelController.$invalid).toBeTruthy();
        expect($scope.percentageForm.percentageModelController.$error.validMaxPercent).toBeTruthy();
    });

});