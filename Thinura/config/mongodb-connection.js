const MongoClient = require("mongodb").MongoClient;
const keys = require('./keys');

var _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( keys.mongodb.dbURI,  { useNewUrlParser: true }, function( err, client ) {
      _db  = client.db(keys.mongodb.db_name);
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
};