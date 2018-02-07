const mongoose = require('mongoose');
const {mongo, env} = require('./variables');

//set mongoose Promise to Bluebird
mongoose.Promise = Promise;

//exit application on error
mongoose.connection.on('error',(err) =>{
    console.error('mongoDB connection error : ${err}');
    process.exit(-1);
});

//print mongoose logs in dev env
if(env == 'development'){
    mongoose.set('debug', true);
}

//connect to mongodb
exports.connect = () => {
  mongoose.connect(mongo.uri, {
    keepAlive: 1,
    useMongoClient: true,
  });
  return mongoose.connection;
};
