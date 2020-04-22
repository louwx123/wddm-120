const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//This indicates the shape of the documents that will be entering the database
  const roomsSchema = new Schema({
   
    title:
    {
      type:String,
      required:true
    },

    description: 
    {
        type:String,
        required:true
    },
    price :
    {
        type:Number,
        required:true
    },
    location :
    {
        type:String,
        required:true
    },
    roomPic:{
      type:String,
    },
  });


 const roomsModel = mongoose.model('rooms', roomsSchema);

 module.exports = roomsModel;