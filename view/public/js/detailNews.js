app.controller("detailnewsCtrl", function ($scope, $routeParams) {
  $scope.idNews = $routeParams.id;

  $scope.dsDetailNews = $scope.dsNews.filter((i) => i.id == $scope.idNews)[0];
  console.log($scope.dsDetailNews);

  $scope.getNumberOfCatalogNews = function (idcatalog) {
    var count = 0;
    for (let index = 0; index < $scope.dsNews.length; index++) {
      if ($scope.dsNews[index].id_catalog == idcatalog) {
        count++;
      }
    }
    return count;
  };
  $scope.catalogTypes = {
    1: "Điện thoại",
    2: "iPad",
    3: "Đồng hồ thông minh",
    4: "Tai nghe",
    5: "Máy ảnh",
    6: "Kính thực tế ảo",
  };
});

app.controller("contactCtrl", function ($scope, $http, $window) {
  $scope.sendContact = function () {
    if ($scope.myForm.$invalid) {
      // Nếu form không hợp lệ, không thực hiện hành động gửi
      return;
    } else {
      var userData = {
        fullname: $scope.fullname,
        email: $scope.email,
        phone: $scope.phone,
        topic: $scope.topic,
        content: document.getElementById("myTextarea").value,
        date: new Date().toISOString(),
      };
      console.log(userData);
      // Gửi dữ liệu đăng ký đến server
      $http.post("http://localhost:3000/contact", userData).then(
        function (response) {
          alert("Gửi thành công!");
        },
        function (error) {
          alert("Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau.");
        }
      );
    }
  };
});

app.controller("newsCtrl", function ($scope, $routeParams) {
  $scope.getNumberOfCatalogNews = function (idcatalog) {
    var count = 0;
    for (let index = 0; index < $scope.dsNews.length; index++) {
      if ($scope.dsNews[index].id_catalog == idcatalog) {
        count++;
      }
    }
    return count;
  };
});
