app.controller("cartCtrl", function ($scope, $http, $window, $location, $timeout, $scope) {
  // console.log($scope.dsCartsAll);

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
  $scope.updateBuyStatus = function (item) {
    console.log(item);
    // Gửi yêu cầu PATCH tới server để cập nhật trạng thái "buy"
    $http.patch("http://localhost:3000/cart/" + item.id, { buy: item.buy }).then(
      function (response) {
        // Xử lý phản hồi thành công
      },
      function (error) {
        // Xử lý lỗi
        alert("Lỗi chọn item mua ");
      }
    );
  };
  // $scope.updateStatus = function (id, currentStatus) {
  //   console.log(id);
  //   console.log(currentStatus);

  //   var updatedStatus = currentStatus == 0 ? 1 : 0; // Đảo trạng thái
  //   $http.patch("http://localhost:3000/cart?id=" + id, { status: updatedStatus }).then(
  //     function (response) {
  //       // Cập nhật thành công, cập nhật trạng thái trong view
  //       // var item = $scope.dsCartsAll.find(item => item.id === id);
  //       alert("Cập nhật trang thái thành công");
  //     },
  //     function (error) {
  //       console.error("Lỗi khi cập nhật trạng thái:", error);
  //     }
  //   );
  // };

  // $scope.checkItemBuy = function () {
  //   var selectedItems = $scope.dsCartsAll.filter(function (item) {
  //     // $dssp = item.buy;
  //     // console.log(item.buy);
  //     return item.buy;
  //   });
  //   // $window.location.href = "/thanhtoan?items=" + JSON.stringify(selectedItems);

  //   var itemsJSON = encodeURIComponent(JSON.stringify(selectedItems));
  //   // Chuyển thông tin sản phẩm được chọn qua trang thanh toán
  //   // $window.location.href = "/payment/" + itemsJSON;
  //   $location.path("/payment");
  // };

  //START TĂNG GIẢM SỐ LƯỢNG
  // $scope.giamSoLuongItem = function (product) {
  //   // $sope.valueQuantity++;
  //   if (product.quantity == 1) {
  //     $http
  //       .delete("http://localhost:3000/cart/" + product.id)
  //       .then(function (response) {
  //         // Xóa thành công
  //         console.log("Xóa thành công");
  //       })
  //       .catch(function (error) {
  //         // Xảy ra lỗi trong quá trình xóa
  //         console.error("Lỗi khi xóa:", error);
  //       });
  //   } else {
  //     product.quantity += -1;
  //     $http
  //       .patch("http://localhost:3000/cart/" + product.id, product)

  //       .then(function (response) {
  //         console.log("Quantity updated successfully!");
  //         $location.path("/cart");
  //       })
  //       .catch(function (error) {
  //         console.error("Error updating quantity:", error);
  //       });
  //   }
  // };
  // $scope.tangSoLuongItem = function (product) {
  //   product.quantity += +1;
  //   $http
  //     .patch("http://localhost:3000/cart/" + product.id, product)

  //     .then(function (response) {
  //       console.log("Quantity updated successfully!");
  //       // $location.path("/cart");
  //     })
  //     .catch(function (error) {
  //       console.error("Error updating quantity:", error);
  //     });
  // };
  // $scope.deleItemCart = function (idPro) {
  //   $http
  //     .delete("http://localhost:3000/cart/" + idPro)
  //     .then(function (response) {
  //       // Xóa thành công
  //       console.log("Xóa thành công");
  //     })
  //     .catch(function (error) {
  //       // Xảy ra lỗi trong quá trình xóa
  //       console.error("Lỗi khi xóa:", error);
  //     });
  // };
});
