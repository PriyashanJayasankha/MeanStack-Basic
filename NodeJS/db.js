const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/CrudDB', err => {
  if(err){
    console.log('Error in Database connection :' + JSON.stringify(err, undefined, 2));
  } else {
    console.log('MongoDB connection succeeded');
  }
});

module.exports = mongoose;
