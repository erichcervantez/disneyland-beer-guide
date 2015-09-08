angular.module('starter.controllers', [])

  .controller('MapCtrl', function ($scope) {
    $scope.map = {center: {latitude: 33.805403, longitude: -117.919988}, zoom: 16};
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
