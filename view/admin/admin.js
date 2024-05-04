var app = angular.module("myapp", ["ngRoute"]);
app.config(function ($routeProvider) {
  $routeProvider
    .when("/addproduct", {
      templateUrl: "./view/partials/addproduct.html?" + Math.random(),
      controller: "addproductCtrl",
    })
    .when("/dsproduct", {
      templateUrl: "./view/partials/dsproduct.html?" + Math.random(),
      controller: "dsproductCtrl",
    })
    .when("/editproduct/:id", {
      templateUrl: "./view/partials/editproduct.html?" + Math.random(),
      controller: "editproductCtrl",
    })
    .otherwise({
      redirectTo: "/addproduct",
    });
});

app.controller("myCtrl", function ($scope, $http, $location, $window, $routeParams) {
  $scope.isBase64Image = function (str) {
    if (typeof str !== "string") return false;
    // Kiểm tra định dạng chuỗi Base64 (rất cơ bản)
    return str.startsWith("data:image");
  };
  // $scope.dssp = [];
  $scope.loadProducts = function () {
    $http.get("http://localhost:3000/listPro").then(
      //Đúngt thì khoe
      function (res) {
        $scope.dssp = res.data;
      }
    );
  };
  $http.get("http://localhost:3000/listPro").then(
    //Đúngt thì khoe
    function (res) {
      $scope.dssp = res.data;
    }
  );

  // Hàm xem trước ảnh
  function previewImage(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#preview").attr("src", e.target.result);
        $("#preview").css("display", "block");
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
});
app.controller("addproductCtrl", function ($scope, $http, $location, $window, $timeout, $routeParams) {
  $scope.numColors = "";
  $scope.colors = [];
  $scope.addColors = function () {
    $scope.colors = [];
    if ($scope.numColors > 0) {
      for (var i = 0; i < $scope.numColors; i++) {
        var newColor = prompt("Chọn màu thứ " + (i + 1) + ":");
        if (newColor) {
          $scope.colors.push(newColor);
        }
      }
      return $scope.colors;
    } else {
      alert("Vùi lòng chọn số màu của sản phẩm !");
    }
  };

  //add Product submit
  $scope.addProduct = function () {
    if ($scope.myForm.$invalid) {
      // Nếu form không hợp lệ, không thực hiện hành động gửi
      return;
    } else {
      var files = document.querySelectorAll(".image-input"); // Lấy danh sách tất cả các input file
      var imagesArray = []; // Mảng chứa các ảnh base64
      // var productName = $scope.productNamee; // Lấy giá trị tên sản phẩm từ $scope
      // console.log($scope.productName);

      // var productPrice = $scope.productPrice; // Lấy giá trị giá sản phẩm từ $scope
      // var productDescription = $scope.productDescription; // Lấy giá trị mô tả sản phẩm từ $scope
      // Xử lý từng input file trong danh sách
      files.forEach(function (fileInput) {
        var files = fileInput.files;

        // Xử lý từng file ảnh trong danh sách files
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          var reader = new FileReader();

          // Xử lý khi load ảnh thành công
          reader.onloadend = function () {
            // Push dữ liệu base64 của ảnh vào mảng imagesArray
            imagesArray.push(reader.result);

            // Nếu đã xử lý hết tất cả các file ảnh
            if (imagesArray.length === files.length) {
              // Khởi tạo đối tượng newProduct
              var newProduct = {
                name: $scope.nameproduct,
                img: imagesArray,
                id_catalog: $scope.catalog,
                price: $scope.price,
                reducedPrice: $scope.reducedPrice,
                color: $scope.colors,
                quantity: $scope.quantity,
                date: $scope.date,
                star: ["1", "2", "3", "4"],
                description: $scope.description, // Mô tả sản phẩm
              };
              console.log(newProduct);

              // Gửi yêu cầu POST đến backend để thêm sản phẩm mới
              $http
                .post("http://localhost:3000/listPro", newProduct)
                .then(function (response) {
                  // Thêm sản phẩm mới vào danh sách sản phẩm hiển thị
                  // $scope.products.push(response.data);
                  // Xóa dữ liệu trong form và ẩn hình xem trước

                  $scope.loadProducts();
                  alert("Thêm sản phẩm thành công");
                  $timeout(function () {
                    $window.location.reload();
                  });
                })
                .catch(function (error) {
                  console.error("Error adding product:", error);
                });
            }
          };

          // Nếu file tồn tại, đọc dữ liệu base64 của file
          if (file) {
            reader.readAsDataURL(file);
          }
        }
      });
    }
  };
});

//list Product
app.controller("dsproductCtrl", function ($scope, $http, $location, $window, $routeParams) {
  $scope.deleProduct = function (idProduct) {
    $http
      .delete("http://localhost:3000/listPro/" + idProduct)
      .then(function (response) {
        // Xóa thành công
        $scope.loadProducts();
        alert("Xóa thành công");
      })
      .catch(function (error) {
        // Xảy ra lỗi trong quá trình xóa
        console.error("Lỗi khi xóa:", error);
      });
  };
});

//list Product
app.controller("editproductCtrl", function ($scope, $http, $location, $window, $routeParams) {
  $scope.idPro = $routeParams.id;

  $http.get("http://localhost:3000/listPro?id=" + $scope.idPro).then(
    //Đúngt thì khoe
    function (res) {
      $scope.productEdit = res.data;
      // console.log($scope.orderInfor);
    }
  );
});
