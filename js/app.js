var app = angular.module('vji', []);

app.controller('global', ['$scope', '$timeout', '$http', '$rootScope', '$window', function ($scope, $timeout, $http, $rootScope, $window){
    $scope.load = function() {
        $scope.docLoad = true;
    };
    
    $scope.formVisble = function(){
      $scope.fsEvent = true;
    };
    
    $scope.formSubmit = function(form){
        //$scope.fsEvent = false;
        $scope.fsSub1 = true;
        
        $timeout(function(){
            $scope.fsEvent = false;
            $scope.fsSub1 = false;
            
        }, 1600);
    }
    
    $scope.pageClass = 'pkg1';
    $scope.toggleBtn = true;
    
    $scope.showPkg1 = function(){
        $scope.pageClass = 'pkg1';
        $scope.toggleBtn = true;
        $rootScope.opSelected1 = true;
        $rootScope.opSelected2 = false;
        $rootScope.opSelected3 = false;
        $rootScope.gender1 = true;
        $rootScope.gender2 = false;
    };
    $scope.showPkg2 = function(){
        $scope.pageClass = 'pkg2';
        $scope.toggleBtn = true;
        $rootScope.opSelected2 = true;
        $rootScope.opSelected1 = false;
        $rootScope.opSelected3 = false;
        $rootScope.gender1 = true;
        $rootScope.gender2 = false;
    };
    $scope.showPkg3 = function(){
        $scope.pageClass = 'pkg3'; 
        $scope.toggleBtn = true;
        $rootScope.opSelected3 = true;
        $rootScope.opSelected1 = false;
        $rootScope.opSelected2 = false;
        $rootScope.gender2 = true;
        $rootScope.gender1 = false;
    };
    
    
    $scope.mshowPkg = function($event, id){
        $scope.pageClass = 'pkg'+id;
        document.body.classList.toggle('mpkg'+id);
        $scope.toggleBtn = true;
    };
    
    
    $http.get('js/product.json').success(function(data){
        $scope.product = data.Packages;
		$scope.pck1 = $scope.product[0];
		$scope.pck2 = $scope.product[1];
		$scope.pck3 = $scope.product[2];
        $scope.$watch('toggleBtn', function(){ 
            $scope.quantity = $scope.toggleBtn ?  $window.outerWidth <= 740 ? 3 : 6 : $scope.pck1.Parameters.length;
            $scope.quantity = $scope.toggleBtn ?  $window.outerWidth <= 740 ? 3 : 6 : $scope.pck2.Parameters.length;
            $scope.quantity = $scope.toggleBtn ?  $window.outerWidth <= 740 ? 3 : 6 : $scope.pck3.Parameters.length;
            $scope.toggleText = $scope.toggleBtn ? 'Show All' : 'Show Less';
        });
    });

    
}]);

app.directive('popEvent', function() {
    return {
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                var others  = document.querySelectorAll('.pkgUl li');
                for (i = 0; i < others.length; i++){
                    others[i].classList.remove('popShow');
                }
                element.parent('li').addClass('popShow');
                if(window.outerWidth <= 740){
                   document.getElementById('overlay').classList.add('mOverlay');   
                }
            })
        },
    }
});
app.directive('popClose', function() {
    return {
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                element.parent().parent('li').removeClass('popShow');
                if(window.outerWidth <= 740){
                   document.getElementById('overlay').classList.remove('mOverlay');   
                }
            })
        },
    }
});






