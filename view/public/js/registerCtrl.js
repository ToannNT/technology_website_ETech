app.controller("registerCtrl", function ($scope, $http, $location) {
  // Register
  // Hàm để kích hoạt toast
  // $scope.showToast = function () {
  //   var toastLiveExample = document.getElementById("liveToast");
  //   var toastBootstrap = new bootstrap.Toast(toastLiveExample);
  //   toastBootstrap.show();
  // };
  $scope.register = function () {
    if ($scope.myForm.$invalid) {
      // Nếu form không hợp lệ, không thực hiện hành động gửi
      return;
    } else {
      //Bắt đầu kiểm tra user
      $http.get("http://localhost:3000/user?email=" + $scope.email).then(function (response) {
        var userRegister = response.data;
        // console.log(userRegister);
        // console.log(userLoginData["password"]);
        // console.log(userRegister[0]["password"]);

        //NẾU TÊN EMAIL NGƯỜI DÙNG ĐÃ TỒN TẠI
        if (userRegister.length != 0) {
          alert("Tài khoản đã tồn tại, vui lòng sử dụng email khác.");
          return;
          // THÌ THÔNG BÁO LỖI KHÔNG CHO TẠO
        } else {
          //NẾU TÊN EMAIL CHƯA ĐƯỢC TẠO THÌ TẠO TÀI KHOẢN

          var userData = {
            email: $scope.email,
            password: $scope.password,
            fullname: null, // Hoặc bạn có thể cung cấp giá trị mặc định nếu muốn
            role: 0,
            img: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png",
            id_order: null,
            phone: null,
            address: null,
            gender: null,
            birthday: null,
            date: new Date().toISOString(),
          };
          console.log(userData);
          // Gửi dữ liệu đăng ký đến server
          $http.post("http://localhost:3000/user", userData).then(
            function (response) {
              alert("Chúc mừng đăng ký thành công!");
              $location.path("/login");
            },
            function (error) {
              alert("Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau.");
            }
          );
        }
      });
      //end kiểm tra user
    }
  };
});
