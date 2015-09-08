//import ObjectID function from MongoDB
var ObjectID = require('mongodb').ObjectID;

//store a MongoDB client instance for later use
CollectionDriver = function (db) {
  this.db = db;
};

CollectionDriver.prototype.getCollection = function (collectionName, callback) {
  this.db.collection(collectionName, function (error, the_collection) {
    if (error) callback(error);
    else callback(null, the_collection);
  });
};

CollectionDriver.prototype.findAll = function (collectionName, callback) {
  this.getCollection(collectionName, function (error, the_collection) { //A
    if (error) callback(error);
    else {
      the_collection.find().toArray(function (error, results) { //B
        if (error) callback(error);
        else callback(null, results);
      });
    }
  });
};


//save new object
CollectionDriver.prototype.save = function (collectionName, obj, callback) {
  this.getCollection(collectionName, function (error, the_collection) { //A
    if (error) callback(error)
    else {
      obj.created_at = new Date(); //B
      the_collection.insert(obj, function () { //C
        callback(null, obj);
      });
    }
  });
};


exports.CollectionDriver = CollectionDriver;
