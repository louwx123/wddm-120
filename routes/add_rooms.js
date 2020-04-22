const express = require("express"); 
const router = express.Router();
const roomsModel= require("../models/rooms");
const path = require("path");
const bodyParser = require('body-parser')
const isAuth = require("../middleware/auth")
const isAdmin = require("../middleware/authorization")

router.use(bodyParser.urlencoded({ extended: false }))


router.post("/", isAuth, isAdmin, (req,res)=>{
  const newRoom  = 
    {
      title:req.body.title,
      description:req.body.description,
      price:req.body.price,
      location:req.body.location
    }

    const room = new roomsModel(newRoom);
    room.save()
    .then((room)=>{
      req.files.roomPic.name = `room_pic_${room._id}${path.parse(req.files.roomPic.name).ext}`
      req.files.roomPic.mv(`public/uploads/${req.files.roomPic.name}`)
      .then(()=>{
        roomsModel.update({_id:room._id}, {
          roomPic: req.files.roomPic.name
        })
        .then(()=>{
          res.redirect('roomlisting');
        })
      })

    })
    .catch(err=>console.log(err))


});
module.exports = router ;
