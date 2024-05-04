app.controller("productCtrl", function ($scope, $routeParams, $location) {
  if ($routeParams.idCatalog == "all") {
    $scope.idCata = "";
  } else if ($routeParams.idCatalog.indexOf("keyword-") !== -1) {
    // Nếu idCatalog chứa chuỗi "keyword-"
    $scope.idCata = "";
    $scope.keyword = $routeParams.idCatalog.substring("keyword-".length);
  } else {
    $scope.idCata = $routeParams.idCatalog;
  }

  $scope.deleKeyword = function () {
    return ($scope.keyword = null);
  };
  // Pagination
  $scope.limit = 4;
  $scope.page = 1;
  // page 1 begin 0
  // page 2 begin 4
  $scope.begin = ($scope.page - 1) * $scope.limit;
  console.log($scope.begin);
  $scope.chuyentrang = function (pageClick) {
    $scope.page = pageClick;
    $scope.begin = ($scope.page - 1) * $scope.limit;
    console.log($scope.begin);
  };

  $scope.totalPage = Math.ceil($scope.dssp.length / $scope.limit);
  $scope.listPanigation = [];
  for (let index = 1; index <= $scope.totalPage; index++) {
    $scope.listPanigation.push(index);
  }
});

// filter search

// app.filter("search", function () {
//   return function (input, keyword, attr) {
//     let kq = [];
//     if (keyword) {
//       attr.forEach((thuoctinh) => {
//         keyword = keyword.toLowerCase();
//         let tmp = input.filter((item) => {
//           return item[thuoctinh].toString().toLowerCase().indexOf(keyword) >= 0;
//         });
//         kq.push(...tmp);
//       });
//     } else {
//       kq = input;
//     }
//     return kq;
//   };
// });

app.filter("customFilterSearch", function () {
  return function (arr, input, idCatalog) {
    if (input) {
      return arr.filter((e) => e.name.toLowerCase().includes(input.toLowerCase()) && (e.id_catalog == idCatalog || idCatalog == ""));
    } else {
      return arr.filter((e) => e.id_catalog == idCatalog || idCatalog == "");
    }
  };
});
