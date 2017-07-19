describe('expPercentageConverterInput Directive', function () {
    var component;
    var label;
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
        component = $compile('<form name="percentageForm"><exp-percentage-converter-input name="percentageModelController" percentage="percentage"></exp-percentage-converter-input></form>')($scope);
        $scope.$apply();

        // post-conditions
        label = component.find('label');
        input = component.find('input');
        expect(label.text()).toBe('10%');
        expect(input.val()).toBe('0.1');
    }));

    it('should format values', function () {
        $scope.percentage = 1;
        $scope.$apply();
        expect(label.text()).toBe('100%');
        expect(input.val()).toBe('1');

        $scope.percentage = 0.5;
        $scope.$apply();
        expect(label.text()).toBe('50%');
        expect(input.val()).toBe('0.5');

        $scope.percentage = 0.22;
        $scope.$apply();
        expect(label.text()).toBe('22%');
        expect(input.val()).toBe('0.22');
    });

    it('should validate min', function () {
        // pre-conditions
        expect(input.hasClass('ng-invalid')).toBeFalsy();
        expect(input.hasClass('ng-invalid-min')).toBeFalsy();

        // execute
        $scope.percentage = -0.1;
        $scope.$apply();

        // post-conditions
        expect(input.hasClass('ng-invalid')).toBeTruthy();
        expect(input.hasClass('ng-invalid-min')).toBeTruthy();
    });

    it('should validate min', function () {
        // pre-conditions
        expect(input.hasClass('ng-invalid')).toBeFalsy();
        expect(input.hasClass('ng-invalid-max')).toBeFalsy();

        // execute
        $scope.percentage = 1.1;
        $scope.$apply();

        // post-conditions
        expect(input.hasClass('ng-invalid')).toBeTruthy();
        expect(input.hasClass('ng-invalid-max')).toBeTruthy();
    });

});