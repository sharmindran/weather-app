const {MongoClient} = require('mongodb');
const fs = MongoClient;

//const database = 'mongodb://localhost:27017';
const database = 'mongodb://<lab123>:<lab123>@ds245240.mlab.com:45240/weather-app'

const saveData = (newdata) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(database, {useNewUrlParser: true}, (err, client) => {
      if (err){
        reject('Unable to connect to MongoDB');
      }

      console.log('Connected to MongoDB Successfully');
      const db = client.db('WeatherApp');

      db.collection('weatherCollection').insertOne(newdata, (err, result) => {
        if (err){
          reject('Unable to insert');
        }

        resolve(result);
      })

      client.close();
    });
  });
};
//view data
const getAllData = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
      if (err){
        reject('Unable to connect to MongoDB');
      }

      console.log('Connected to MongoDB Successfully');
      const db = client.db('WeatherApp');

      db.collection('weatherCollection').find().toArray().then((docs) => {
        resolve(docs);
      }, (err) => {
          reject('Unable to fetch docs');
      });

      client.close();
    });
  });
};
//delete data
const deleteAll = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
      if (err){
        reject('Unable to connect to MongoDB');
      }

      console.log('Connected to MongoDB Successfully');
      const db = client.db('WeatherApp');

      db.collection('weatherCollection').remove({}).then((result) => {
        resolve(result);
      }, (err) => {
          reject('Unable to delete');
      });

      client.close();
    });
  });
};
module.exports = {
  saveData,
  getAllData,
  deleteAll,
}
