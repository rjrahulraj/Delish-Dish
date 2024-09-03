const Food = require('../models/foodModels');
const fs=require('fs');

//add food items;
const addFootItem = async (req, res) => {

     const image_filename = req.file.filename;

     const { name, description, price, category, } = req.body;
     if (!name || !description || !price || !category || !image_filename) {
          res.status(400).json({
               success: false,
               message: "Fill All the credentials"
          })
          return;
     }

     const food = new Food({
          name,
          description,
          price,
          category,
          image: image_filename,
     })


     try {
          await food.save().then(() => {
               res.json({
                    success: true,
                    message: "Food succcesfully added"
               })
          }, (err) => {
               res.json({
                    success: false,
                    message: "error in adding fooded"
               })
          })
     }
     catch (error) {
          console.log('error in addFood ', error)
     }
}

// list all the foodItems;

const listFoodItem = async (req, res) => {
     try {
          let allFooditem = await Food.find({});
     res.status(200).json({
          success: true,
          data: allFooditem
     });
     } catch (error) {
          console.log('error in list Food', error)
          res.status(200).json({
               success: false,
               data: error.message
          });
     }
}

const removeFood=async(req,res)=>{
     const _id=req.body._id;
     
     if(!_id)
     {
          return res.status(400).json({
               success: false,
               data: "Fill all the credentials"
          });
     }

     try {
          const food=await Food.findOne({_id});
     if(!food){
          return res.status(400).json({
               success: false,
               data: "Food item does not exist in List"
          });
     }
     fs.unlink(`uploads/${food.image}`, ()=>{})
     await Food.deleteOne({_id});

     res.status(200).json({
          success: true,
          message:"Food Item successfully delete"
     });
     } catch (error) {
          console.log('error in delete  Food', error)
          res.status(400).json({
               success: false,
               data: error.message
          });    
     }
}


module.exports = { addFootItem, listFoodItem, removeFood };