angular.module('starter.controllers', [])

  .controller('MapCtrl', function ($scope, $log, beerService) {
    $scope.map = {center: {latitude: 33.805403, longitude: -117.919988}, zoom: 16};

    //get promise to return beerStops
    var promise = beerService.getBeerStops();

    promise.then(function (data) {
      var objects = eval(data);
      $scope.beerStops = objects;
      $scope.markers = [];

      $log.log("length: " + objects.data.length);

      for (var i = 0; i < objects.data.length; i++) {

        $log.log("i: " + i + ", latitude: " + objects.data[i].latitude + ", longitude: " + objects.data[i].longitude);

        $scope.markers.push({
          idKey: objects.data[i].id,
          coords: {
            latitude: objects.data[i].latitude,
            longitude: objects.data[i].longitude
          }
        });
      }


    });
  })

  .controller('BeerGuideCtrl', function ($scope) {

  })

  .controller('BeerGuideDetailCtrl', function ($scope, $log, beerService) {
    //get promise to return beerStops
    var promise = beerService.getBeerStops();

    promise.then(function (data) {
      $scope.beerStops = data;
    });
  })

  .controller('SettingsCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
