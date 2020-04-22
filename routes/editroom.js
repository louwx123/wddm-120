const express = require("express"); 
const router = express.Router();
const isAuth = require("../middleware/auth")
const isAdmin = require("../middleware/authorization")
const roomsModel= require("../models/rooms");

router.get('/',isAuth, (req,res)=>{
  roomsModel.find()
  .then((rooms)=>{


      //Filter out the information that you want from the array of documents that was returned into
      //a new array

      //Array 300 documents meaning that the array has 300 elements 


      const filteredTask =   rooms.map(rooms=>{

              return {

                  id: rooms._id,
                  title:rooms.title,
                  description:rooms.description,
                  price :rooms.price,
                  location : rooms.location,
                  roomPic: rooms.roomPic              }
      });


      res.render("editroom",{
         data : filteredTask
      });


  })
  .catch(err=>console.log(`Error happened when pulling from the database :${err}`));

  
})

router.get("/edit/:id",(req,res)=>{

  roomsModel.findById(req.params.id)
  .then((rooms)=>{

      const {_id,title,description,price,location} = rooms;
      res.render("roomListingUpdate",{
          _id,
          title,
          description,
          price,
          location
      })

  })
  .catch(err=>console.log(`Error happened when pulling from the database :${err}`));

})

router.post("/update/:id",(req,res)=>{

  const rooms =
  {
      title:req.body.title,
      description:req.body.description,
      price:req.body.price,
      location:req.body.location,
  }

  roomsModel.updateOne({_id:req.params.id},rooms)
  .then(()=>{
      res.redirect("/roomlisting");
  })
  .catch(err=>console.log(`Error happened when updating data from the database :${err}`));


});
module.exports = router;