var express = require('express');
var app = express();

var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/hexplore';

app.set('port', (process.env.PORT || 3030));

app.get('/api/objectives', function(req, res) {
  mongo.connect(url, function(err, db) {
    if (err) throw err;
    db.collection('objectives')
    .find()
    .toArray(function(err, documents) {
      if (err) throw err;
      console.log(documents);
      db.close();
      res.end(JSON.stringify(documents));
    });
  });
});

// Start the Express web server
app.listen(app.get('port'), function() {
  console.log('API server started: http://localhost:' + app.get('port') + '/');
});
