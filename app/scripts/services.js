angular.module('starter.services', [])

  .service('beerService', function ($http, $q, $log) {

    $log.log("Calling beerService...");

    var deferred = $q.defer();

    $http.get("http://52.24.62.254/beerstops")
      .then(function (data) {
        $log.log("Successfully retrieved list of beer stops...");
        $log.log(data);

        deferred.resolve(data);
      }, function (data) {
        $log.log(data);
        deferred.reject("Failed to get beerstops");
      });

    this.getBeerStops = function () {
      return deferred.promise;
    };

  });
