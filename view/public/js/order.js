app.controller("orderCtrl", function ($scope, $routeParams, $http, $window, $location, $timeout, $scope) {
  $scope.idUser = $routeParams.id;
  $scope.countItems = function (array) {
    return array.length;
  };
  $scope.totalAll = function (array) {
    let totalAmount = 0;
    array.forEach((item) => {
      const priceToUse = item.reducedPrice != null ? item.reducedPrice : item.price;
      // console.log(`Calculating for item: ${item.name}, Quantity: ${item.quantity}, Price to use: ${priceToUse}`);
      totalAmount += item.quantity * priceToUse;
    });
    return totalAmount;
  };
  var userData = sessionStorage.getItem("s_user");
  if (userData) {
    $scope.email = JSON.parse(userData).email;
    $http.get("http://localhost:3000/order?id_user=" + $scope.idUser).then(
      //Đúngt thì khoe
      function (res) {
        $scope.listOrder = res.data;
        // console.log($scope.listOrder);
      }
    );
  }
});

// success order
app.controller("success_orderCtrl", function ($scope, $routeParams, $http, $window, $location, $timeout, $scope) {
  $scope.madh = $routeParams.madh;
  if ($scope.madh) {
    $http.get("http://localhost:3000/order?ma_donhang=" + $scope.madh).then(
      //Đúngt thì khoe
      function (res) {
        $scope.orderInfor = res.data;
        // console.log($scope.orderInfor);
      }
    );
  } else {
    alert("Không có đơn hàng nào");
  }

  $scope.totalAll = function (array) {
    let totalAmount = 0;
    array.forEach((item) => {
      const priceToUse = item.reducedPrice != null ? item.reducedPrice : item.price;
      totalAmount += item.quantity * priceToUse;
    });
    return totalAmount;
  };
});

// detial order
app.controller("detailorderCtrl", function ($scope, $routeParams, $http, $window, $location, $timeout, $scope) {
  $scope.madh = $routeParams.madh;
  if ($scope.madh) {
    $http.get("http://localhost:3000/order?ma_donhang=" + $scope.madh).then(
      //Đúngt thì khoe
      function (res) {
        $scope.orderInfor = res.data;
        // console.log($scope.orderInfor);
      }
    );
  } else {
    alert("Không có đơn hàng nào");
  }

  $scope.totalAll = function (array) {
    let totalAmount = 0;
    array.forEach((item) => {
      const priceToUse = item.reducedPrice != null ? item.reducedPrice : item.price;
      totalAmount += item.quantity * priceToUse;
    });
    return totalAmount;
  };
});
