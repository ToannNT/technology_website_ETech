app.controller("myaccountCtrl", function ($scope, $routeParams, $http, $window, $location, $timeout, $scope) {
  $scope.idUser = $routeParams.id;
  var userData = sessionStorage.getItem("s_user");
  console.log(userData);
  if (userData) {
    $scope.email = JSON.parse(userData).email;
    $scope.img = JSON.parse(userData).img;
    $scope.fullname = JSON.parse(userData).fullname;
    $scope.phone = JSON.parse(userData).phone;
    $scope.birthday = JSON.parse(userData).birthday;
    $scope.gender = JSON.parse(userData).gender;
    $scope.address = JSON.parse(userData).address;
  }
});
