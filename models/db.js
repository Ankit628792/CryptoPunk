const mongoose = require('mongoose');

const dbUrl = process.env.MONGO_DB_URL || 'mongodb://localhost/cryptopunk-local';

mongoose.connect(dbUrl).then(()=>{
    console.log("Db connected");
  }).catch((e)=>{
    console.log(e.message);
  })
module.exports = mongoose;
