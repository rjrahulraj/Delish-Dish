const express=require('express');
const router=express.Router();
const {addFootItem, listFoodItem,removeFood}=require('../controllers/foodControllers');
const multer=require('multer');

const storage=multer.diskStorage({
     destination:"uploads",
     filename:(req,file, cb)=>{
          return cb(null, `${Date.now()}${file.originalname}`);
     }
})
const upload=multer({storage,});



router.route('/add').post(upload.single("image"),addFootItem);
router.get('/list',listFoodItem);
router.delete('/remove',removeFood);
module.exports=router;