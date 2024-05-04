app.controller("loginCtrl", function ($scope, $http, $window, $location, $timeout) {
  $scope.login = function () {
    if ($scope.myForm.$invalid) {
      // Nếu form không hợp lệ, không thực hiện hành động gửi
      return;
    } else {
      var userLoginData = {
        email: $scope.email,
        password: $scope.password,
      };

      // Kiểm tra xem người dùng đã tồn tại trong cơ sở dữ liệu hay chưa
      $http.get("http://localhost:3000/user?email=" + userLoginData.email).then(
        function (response) {
          var users = response.data;
          console.log(users);
          // console.log(userLoginData["password"]);
          // console.log(users[0]["password"]);

          if (users.length != 0) {
            var user = users[0];
            // Kiểm tra mật khẩu của người dùng
            if (user.password === userLoginData.password) {
              // Lưu thông tin người dùng vào sessionStorage
              sessionStorage.setItem("s_user", JSON.stringify(user));
              // console.log(sessionStorage.getItem("s_user"));
              $location.path("/home");

              $timeout(function () {
                $window.location.reload();
              });
              // $location.path("/home"); // Điều hướng đến trang chính
            } else {
              alert("Mật khẩu không đúng. Vui lòng thử lại.");
            }
          } else {
            alert("Người dùng không tồn tại. Vui lòng đăng ký trước khi đăng nhập.");
          }
        },
        function (error) {
          alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
        }
      );
    }
  };
});
