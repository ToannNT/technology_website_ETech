var app = angular.module("myapp", ["ngRoute"]);
app.config(function ($routeProvider) {
  $routeProvider
    .when("/home", {
      templateUrl: "./view/partials/home.html?" + Math.random(),
      controller: "homeCtrl",
    })
    .when("/contact", {
      templateUrl: "./view/partials/contact.html?" + Math.random(),
      controller: "contactCtrl",
    })
    .when("/product/:idCatalog", {
      templateUrl: "./view/partials/product.html?" + Math.random(),
      controller: "productCtrl",
    })
    .when("/detailproduct/:id", {
      templateUrl: "./view/partials/detailproduct.html?" + Math.random(),
      controller: "detailProductCtrl",
    })
    .when("/news", {
      templateUrl: "./view/partials/news.html?" + Math.random(),
      controller: "newsCtrl",
    })
    .when("/payment", {
      templateUrl: "./view/partials/payment.html?" + Math.random(),
      controller: "paymentCtrl",
    })
    .when("/detailnews/:id", {
      templateUrl: "./view/partials/detailnews.html?" + Math.random(),
      controller: "detailnewsCtrl",
    })
    .when("/cart", {
      templateUrl: "./view/partials/cart.html?" + Math.random(),
      controller: "cartCtrl",
    })
    .when("/register", {
      templateUrl: "./view/partials/register.html?" + Math.random(),
      controller: "registerCtrl",
    })
    .when("/login", {
      templateUrl: "./view/partials/login.html?" + Math.random(),
      controller: "loginCtrl",
    })
    .when("/order/:id", {
      templateUrl: "./view/partials/order.html?" + Math.random(),
      controller: "orderCtrl",
    })
    .when("/myaccount/:id", {
      templateUrl: "./view/partials/myaccount.html?" + Math.random(),
      controller: "myaccountCtrl",
    })
    .when("/success_order/:madh", {
      templateUrl: "./view/partials/success_order.html?" + Math.random(),
      controller: "success_orderCtrl",
    })
    .when("/detailorder/:madh", {
      templateUrl: "./view/partials/detailorder.html?" + Math.random(),
      controller: "detailorderCtrl",
    })

    .when("/addproduct", {
      templateUrl: "./view/admin/view/partials/addproduct.html?" + Math.random(),
      controller: "addproductCtrl",
    })
    .otherwise({
      redirectTo: "/home",
    });
});

app.controller("myCtrl", function ($scope, $http, $location, $window, $routeParams) {
  // $scope.dssp = [];
  $http
    .get("http://localhost:3000/listPro")
    .then(
      //Đúngt thì khoe
      function (res) {
        $scope.dssp = res.data;
      }
    )
    .then(function (res) {
      alert("Lỗi không tải được dữ liệu json");
    });
  $http.get("http://localhost:3000/news").then(
    //Đúngt thì khoe
    function (res) {
      $scope.dsNews = res.data;
      // console.log($scope.dsNews);
    }
  );
  $http.get("http://localhost:3000/catalog").then(
    //Đúngt thì khoe
    function (res) {
      $scope.dsCatalog = res.data;
      // console.log($scope.dsNews);
    }
  );

  //search Product
  $scope.searchProduct = function (keyword) {
    $location.path("/product/keyword-" + keyword);
  };

  $scope.isBase64Image = function (str) {
    if (typeof str !== "string") return false;
    // Kiểm tra định dạng chuỗi Base64 (rất cơ bản)
    return str.startsWith("data:image");
  };

  $scope.loadCarts = function () {
    $http.get("http://localhost:3000/cart?id_user=" + JSON.parse(userData).id).then(
      //Đúngt thì khoe
      function (res) {
        $scope.dsCartsAll = res.data;
        // console.log($scope.dsCartAll);
        $scope.total = 0;
        $scope.countItemCart = 0;
        $scope.dsCartsAll.forEach((item) => {
          $scope.countItemCart++;
          const priceToUse = item.reducedPrice !== null ? item.reducedPrice : item.price;
          $scope.total += item.quantity * priceToUse;
        });
        // return $scope.total;
      }
    );
  };

  //Show tên user
  // Kiểm tra xem session có thông tin người dùng không
  var userData = sessionStorage.getItem("s_user");
  if (userData) {
    $scope.nameEmailUser = JSON.parse(userData).email;
    $scope.idEmailUser = JSON.parse(userData).id;

    $scope.loadCarts();
    // $http.get("http://localhost:3000/cart?id_user=" + JSON.parse(userData).id).then(
    //   //Đúngt thì khoe
    //   function (res) {
    //     $scope.dsCartsAll = res.data;
    //     // console.log($scope.dsCartAll);
    //     $scope.total = 0;
    //     $scope.countItemCart = 0;
    //     $scope.dsCartsAll.forEach((item) => {
    //       $scope.countItemCart++;
    //       const priceToUse = item.reducedPrice !== null ? item.reducedPrice : item.price;

    //       $scope.total += item.quantity * priceToUse;
    //     });
    //     // return $scope.total;
    //   }
    // );
    // console.log($scope.nameEmailUser);
  } else {
    $scope.nameEmailUser = null;
  }

  //logout
  $scope.logout = function () {
    sessionStorage.removeItem("s_user");
    $scope.nameEmailUser = null;
    // $scope.$apply();
    $location.path("/home");
    // $timeout(function () {
    $window.location.reload();
    // }, 1000);
  };

  //add Cart

  // 1 kiểm tra có đang đăng nhập không ?
  var nameEmail = JSON.parse(userData);
  $scope.addCart = function (product) {
    // 1. Kiểm tra xem session 's_user' đã tồn tại hay không
    var userData = sessionStorage.getItem("s_user");
    if (!userData) {
      // Nếu session không tồn tại, chuyển hướng đến trang đăng nhập hoặc đăng ký
      $location.path("/login"); // hoặc "/register"
      return;
    } else {
      // 2. Có đăng nhập thì thêm sản phẩm

      // console.log(nameEmail.id);
      var productData = {
        id_user: nameEmail.id,
        id_product: product.id,
        img: product.img[0],
        name: product.name,
        id_catalog: product.id_catalog,
        price: product.price,
        reducedPrice: product.reducedPrice,
        color: product.color[0],
        star: product.star.length,
        quantity: 1,
        status: 0,
        // 0 là chưa muốn mu mua 1 là mua
      };

      // Lấy danh sách sản phẩm trong giỏ hàng từ cơ sở dữ liệu
      $http
        .get("http://localhost:3000/cart?id_user=" + nameEmail.id)
        .then(function (response) {
          var cart = response.data;

          // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
          var existingProduct = cart.find(function (item) {
            return item.id_product === product.id;
          });
          // console.log(existingProduct);
          // console.log("http://localhost:3000/cart?id_user=" + existingProduct.id_user + "&&id=" + existingProduct.id);

          if (existingProduct) {
            // Nếu sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng sản phẩm
            existingProduct.quantity += 1;

            // Gửi yêu cầu PUT để cập nhật thông tin sản phẩm
            $http
              .patch("http://localhost:3000/cart/" + existingProduct.id, existingProduct)

              .then(function (response) {
                console.log("Quantity updated successfully!");
                $scope.loadCarts();
                $location.path("/cart");
              })
              .catch(function (error) {
                console.error("Error updating quantity:", error);
              });
          } else {
            // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm mới vào giỏ hàng
            $http
              .post("http://localhost:3000/cart", productData)
              .then(function (response) {
                console.log("Product added to cart successfully!");
                $scope.loadCarts();
                $location.path("/cart");
              })
              .catch(function (error) {
                console.error("Error adding product to cart:", error);
              });
          }
        })
        .catch(function (error) {
          console.error("Error fetching cart data:", error);
        });

      //end kiểm tra sản phẩm theo người dùng
    }
  };
  // $scope.buyNow = function (product) {
  //   // 1. Kiểm tra xem session 's_user' đã tồn tại hay không
  //   var userData = sessionStorage.getItem("s_user");
  //   if (!userData) {
  //     // Nếu session không tồn tại, chuyển hướng đến trang đăng nhập hoặc đăng ký
  //     $location.path("/login"); // hoặc "/register"
  //     return;
  //   } else {
  //     // 2. Có đăng nhập thì thêm sản phẩm

  //     $scope.productBuyNow = product;
  //     $location.path("/payment");
  //     console.log($scope.productBuyNow);

  //     //end kiểm tra sản phẩm theo người dùng
  //   }
  // };

  //START TĂNG GIẢM SỐ LƯỢNG
  $scope.giamSoLuongItem = function (product) {
    // $sope.valueQuantity++;
    if (product.quantity == 1) {
      // aler("Bạn có chắc sẽ xóa phẩm khỏi giỏ hàng");
      var confirmDelete = confirm("Bạn có chắc sẽ xóa sản phẩm khỏi giỏ hàng?");
      if (confirmDelete) {
        $http
          .delete("http://localhost:3000/cart/" + product.id)
          .then(function (response) {
            // Xóa thành công
            $scope.loadCarts();
            console.log("Xóa thành công");
          })
          .catch(function (error) {
            // Xảy ra lỗi trong quá trình xóa
            console.error("Lỗi khi xóa:", error);
          });
      } else {
        return;
      }
    } else {
      product.quantity += -1;
      $http
        .patch("http://localhost:3000/cart/" + product.id, product)

        .then(function (response) {
          console.log("Quantity updated successfully!");
          $location.path("/cart");
        })
        .catch(function (error) {
          console.error("Error updating quantity:", error);
        });
    }
  };
  $scope.tangSoLuongItem = function (product) {
    product.quantity += +1;
    $http
      .patch("http://localhost:3000/cart/" + product.id, product)

      .then(function (response) {
        console.log("Quantity updated successfully!");
        // $location.path("/cart");
      })
      .catch(function (error) {
        console.error("Error updating quantity:", error);
      });
  };
  $scope.deleItemCart = function (idPro) {
    $http
      .delete("http://localhost:3000/cart/" + idPro)
      .then(function (response) {
        // Xóa thành công
        $scope.loadCarts();
        console.log("Xóa thành công");
      })
      .catch(function (error) {
        // Xảy ra lỗi trong quá trình xóa
        console.error("Lỗi khi xóa:", error);
      });
  };

  //END CARTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
});

// tạo bộ lộc tùy ý
app.filter("hasReducedPrice", function () {
  return function (items) {
    return items.filter(function (item) {
      return item.reducedPrice !== undefined && item.reducedPrice !== null;
    });
  };
});

app.controller("homeCtrl", function ($scope) {
  // get bumber of catalog
  $scope.getNumberOfCatalog = function (idcatalog) {
    var count = 0;
    for (let index = 0; index < $scope.dssp.length; index++) {
      if ($scope.dssp[index].id_catalog == idcatalog) {
        count++;
      }
    }
    return count;
  };
  // END get bumber of catalog
  // Thêm thuộc tính starCount vào mỗi sản phẩm
  $scope.dssp.forEach(function (product) {
    product.starCount = product.star.length; // Giả sử 'star' là một mảng các sao
  });

  //hiển thị catalog
  $scope.catalogTypes = {
    1: "Điện thoại",
    2: "iPad",
    3: "Đồng hồ thông minh",
    4: "Tai nghe",
    5: "Máy ảnh",
    6: "Kính thực tế ảo",
  };
});
app.filter("trustHtml", function ($sce) {
  return function (htmlCode) {
    return $sce.trustAsHtml(htmlCode);
  };
});
app.controller("detailProductCtrl", function ($scope, $routeParams, $location, $http) {
  $scope.idPro = $routeParams.id;
  // $scope.dsDetailPro = $scope.dssp.filter(item=>item.id == $scope.id)[0];
  $scope.dsDetailPro = $scope.dssp.filter((i) => i.id == $scope.idPro)[0];

  //giá trị mặt định COLOR
  $scope.selectedColor = null;
  $scope.choseColor = $scope.dsDetailPro.color[0];
  $scope.selectColor = function (index, chosedColor) {
    $scope.selectedColor = index;
    $scope.choseColor = chosedColor;
    console.log(($scope.choseColor = chosedColor));
  };

  var dayNow = new Date(); // Tạo một ngày mới
  $scope.twodays = dayNow.setDate(dayNow.getDate() + 2);
  $scope.fivedays = dayNow.setDate(dayNow.getDate() + 5);

  //giá trị mặt định QUANTITY
  $scope.valueQuantity = 1;
  $scope.incrementQuantity = function () {
    $scope.valueQuantity++;
  };
  $scope.decrementQuantity = function () {
    if ($scope.valueQuantity > 1) {
      $scope.valueQuantity--;
    }
  };
  $scope.addCartDetail = function (product) {
    // alert($scope.choseColor + $scope.valueQuantity);

    var userData = sessionStorage.getItem("s_user");
    if (!userData) {
      // Nếu session không tồn tại, chuyển hướng đến trang đăng nhập hoặc đăng ký
      $location.path("/login"); // hoặc "/register"
      return;
    } else {
      // 2. Có đăng nhập thì thêm sản phẩm

      var nameEmail = JSON.parse(userData);
      // console.log(nameEmail.id);
      var productData = {
        id_user: nameEmail.id,
        id_product: product.id,
        img: product.img[0],
        name: product.name,
        id_catalog: product.id_catalog,
        price: product.price,
        reducedPrice: product.reducedPrice,
        color: $scope.choseColor,
        star: product.star.length,
        quantity: $scope.valueQuantity,
      };

      $http
        .get("http://localhost:3000/cart?id_user=" + nameEmail.id)
        .then(function (response) {
          var cart = response.data;

          // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
          var existingProduct = cart.find(function (item) {
            return item.id_product === product.id;
          });
          // console.log(existingProduct);
          // console.log("http://localhost:3000/cart?id_user=" + existingProduct.id_user + "&&id=" + existingProduct.id);

          if (existingProduct) {
            // Nếu sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng sản phẩm
            existingProduct.quantity += $scope.valueQuantity;

            // Gửi yêu cầu PUT để cập nhật thông tin sản phẩm
            $http
              .patch("http://localhost:3000/cart/" + existingProduct.id, existingProduct)

              .then(function (response) {
                console.log("Quantity updated successfully!");
                $scope.loadCarts();
                $location.path("/cart");
              })
              .catch(function (error) {
                console.error("Error updating quantity:", error);
              });
          } else {
            // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm mới vào giỏ hàng
            $http
              .post("http://localhost:3000/cart", productData)
              .then(function (response) {
                console.log("Product added to cart successfully!");
                $scope.loadCarts();
                $location.path("/cart");
              })
              .catch(function (error) {
                console.error("Error adding product to cart:", error);
              });
          }
        })
        .catch(function (error) {
          console.error("Error fetching cart data:", error);
        });

      //end kiểm tra sản phẩm theo người dùng
    }
  };
});

app.filter("checkBase64Image", function () {
  return function (input) {
    // Định nghĩa một Regular Expression để kiểm tra định dạng Base64
    var base64Pattern = /^data:image\/[a-zA-Z]*;base64,/;

    // Kiểm tra đầu vào có phù hợp với định dạng Base64 không
    if (base64Pattern.test(input)) {
      return input; // Trả về input nếu đúng là Base64
    } else {
      // Nối chuỗi đường dẫn nếu không phải là Base64
      return "./images/product/" + input;
    }
  };
});
