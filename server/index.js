//suppress JSHint warnings
/*global require:false, res:false*/

var http = require('http'),
  express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser');


MongoClient = require('mongodb').MongoClient,
  Server = require('mongodb').Server,
  CollectionDriver = require('./collectionDriver').CollectionDriver;


//CORS headers
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');

  //call the next express middleware
  next();
};

//create express app and set port to 80
var app = express();
app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'views'));  //jade templates
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(allowCrossDomain);

var mongoHost = 'localHost';
var mongoPort = 27017;
var collectionDriver;

var mongoClient = new MongoClient(new Server(mongoHost, mongoPort));
mongoClient.open(function (err, mongoClient) {
  if (!mongoClient) {
    console.error("Error! Exiting... Must start MongoDB first");
    process.exit(1);
  }
  var db = mongoClient.db("MyDatabase");
  collectionDriver = new CollectionDriver(db);
});

app.use(express.static(path.join(__dirname, 'public')));


//create route handler for '/'
//app.get('/', function (req, res) {
//  res.send('<html><body><h1>Hello World</h1></body></html>');
//});


//app.get('/:a?/:b?/:c?', function (req,res) {
//      res.send(req.params.a + ' ' + req.params.b + ' ' + req.params.c);
//});


app.get('/:collection', function (req, res) {
  var params = req.params;
  collectionDriver.findAll(req.params.collection, function (error, objs) {
    if (error) {
      res.send(400, error);
    } //D
    else {
      if (req.accepts('html')) {
        res.render('data', {objects: objs, collection: req.params.collection});
      } else {
        res.set('Content-Type', 'application/json');
        res.send(200, objs);
      }
    }
  });
});


app.get('/:collection/:entity', function (req, res) {
  var params = req.params;
  var entity = params.entity;
  var collection = params.collection;
  if (entity) {
    collectionDriver.get(collection, entity, function (error, objs) {
      if (error) {
        res.send(400, error);
      }
      else {
        res.send(200, objs);
      } //K
    });
  } else {
    res.send(400, {error: 'bad url', url: req.url});
  }
});


app.post('/:collection', function (req, res) {
  var object = req.body;
  var collection = req.params.collection;
  collectionDriver.save(collection, object, function (err, docs) {
    if (err) {
      res.send(400, err);
    }
    else {
      res.send(201, docs);
    } //B
  });
});


//as the last "app" catch-all function, match all requests not caught by above functions
app.use(function (req, res) {
  res.render('404', {url: req.url});
});


//create our web server and listen on port 80
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

