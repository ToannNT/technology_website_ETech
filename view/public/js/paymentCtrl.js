app.controller("paymentCtrl", function ($scope, $http, $window, $location, $timeout, $scope) {
  // console.log($scope.dsCartsAll);
  $scope.userData = sessionStorage.getItem("s_user");
  if ($scope.userData) {
    $scope.userObj = JSON.parse($scope.userData);
  } else {
    $scope.userObj = [];
  }

  $scope.getAmount = function () {
    var amount = 0;
    for (var i = 0; i < $scope.dsCartsAll.length; i++) {
      if ($scope.dsCartsAll[i].buy) {
        const priceToUse = $scope.dsCartsAll[i].reducedPrice !== null ? $scope.dsCartsAll[i].reducedPrice : $scope.dsCartsAll[i].price;

        amount += priceToUse * $scope.dsCartsAll[i].quantity;
      }
    }
    return amount;
  };

  $scope.buyProduct = function () {
    if ($scope.myForm.$invalid) {
      // alert("lỗi");
      return;
    } else {
      // Lưu lại các sản phẩm đã mua
      var productsToOrder = [];

      // Lặp qua các sản phẩm trong giỏ hàng
      for (var i = 0; i < $scope.dsCartsAll.length; i++) {
        // Nếu sản phẩm có trạng thái mua là true
        if ($scope.dsCartsAll[i].buy === true) {
          productsToOrder.push($scope.dsCartsAll[i]);
        }
      }

      // Lấy ngày giờ hiện tại
      const now = new Date();
      const randomNum = Math.floor(Math.random() * 9000) + 1000; // Tạo số từ 1000 đến 9999

      // Tạo đối tượng order từ dữ liệu form
      var orderData = {
        id_user: $scope.userObj.id,
        ma_donhang: "etech" + randomNum,
        fullname: $scope.userObj.name,
        phone: $scope.userObj.phone,
        birthday: $scope.userObj.birthday,
        date: now,
        gender: $scope.userObj.gender,
        email: $scope.userObj.email,
        address: $scope.userObj.address,
        pttt: $scope.userObj.pttt,
        note: $scope.userObj.note,
        status: 1,
        products_order: productsToOrder,
      };
      // console.log(orderData);
      // Gửi dữ liệu order lên server để lưu trữ
      $http
        .post("http://localhost:3000/order", orderData)
        .then(function (response) {
          // Xóa các sản phẩm đã thanh toán khỏi giỏ hàng
          // $scope.dsCartsAll = $scope.dsCartsAll.filter(function (product) {
          //   return product.buy !== true;
          // });
          // Reset dữ liệu form
          // $scope.fullname = "";
          // $scope.phone = "";
          // $scope.date = "";
          // $scope.male = "male";
          // $scope.email = "";
          // $scope.address = "";
          // $scope.noteOrder = "";
          // Thông báo thành công
          // Xóa các sản phẩm đã mua khỏi dữ liệu trong tệp JSON
          var temp = 0;
          for (var i = 0; i < productsToOrder.length; i++) {
            $http
              .delete("http://localhost:3000/cart/" + productsToOrder[i].id)
              .then(function (response) {
                temp++;
                if (temp == productsToOrder.length) {
                  $scope.loadCarts();
                }
                // Xóa thành công, có thể thực hiện các thao tác tiếp theo nếu cần
              })
              .catch(function (error) {
                // Xử lý lỗi nếu có
                alert("Đã có lỗi xảy ra khi xóa sản phẩm.");
              });
          }

          alert("Thanh toán thành công");
          $location.path("/success_order/" + orderData.ma_donhang);
        })
        .catch(function (error) {
          // Xử lý lỗi nếu có
          console.error("Error:", error);
          alert("Đã có lỗi xảy ra khi thanh toán.");
        });
    }
  };
});
