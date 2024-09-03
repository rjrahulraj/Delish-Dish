import {useState } from 'react';
import assests from '../../admin_assets/assets.js';
import '../style/AddFood.css'
import axios from 'axios';
const url=import.meta.env.VITE_BACKENED_URL;
import {toast} from 'react-toastify';
const AddFoodItem = () => {

  const [image, setImage]=useState(false);
  const [data ,setData]=useState({
    name:"",
    description:"",
    price:"",
    category:"Salad"
  })

  const handleChange=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setData(data=>({...data,[name]:value}));
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(); // Capitalize 'FormData'
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image); // Ensure 'image' is a valid File object
  
    try {
      const res = await axios.post(`${url}/api/food/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure correct content type
        },
      });
  
      if (res.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(null); // Set image to null or false
        toast.success('Food Item added Successfully', {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          theme: "light",
          });
        
      } else {
        console.log('Error in adding food item');
      }
    } catch (error) {
      console.log(`Error in adding food item: ${error}`);
      toast.warn('Error in adding the food bar ', {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  };
  

  return (
    <div>
      <form className='addFood' onSubmit={submitHandler}>
        <div className="img">
          <label htmlFor="image">Image</label>
          <img src={image?URL.createObjectURL(image):assests.upload_area} alt="" />
          <input type="file" name='img' onChange={(e)=>setImage(e.target.files[0])} />
        </div>
        <div className="name">
          <label htmlFor="name">Product Name</label>
          <input type="text" name='name' placeholder='Name of the Food item' onChange={(e)=>handleChange(e)} />
        </div>
        <div className="description">
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" rows={3} placeholder='Enter the description of food Item' onChange={(e)=>handleChange(e)} ></textarea>
        </div>
        <div className='ctgPrc'>
          <div className="category">
            <label htmlFor="category">Category</label>
            <select name="category" id="category" onChange={(e)=>handleChange(e)}> 
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
              <option value="other">other</option>
            </select>
          </div>
          <div className="price">
            <label htmlFor="price">Price</label>
            <input type='text' name="price" id="price" placeholder='$' onChange={(e)=>handleChange(e)}  ></input>
          </div>
        </div>
        <button type='submit'> Add</button>

      </form>
    </div>
  )
}

export default AddFoodItem
