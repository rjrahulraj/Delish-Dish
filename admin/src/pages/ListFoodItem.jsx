import axios from "axios";
import { useEffect, useState } from "react";
const url=import.meta.env.VITE_BACKENED_URL;
import {toast} from 'react-toastify';
import '../style/ListFoodItem.css'


const ListFoodItem = () => {


  const [list,setFood]=useState([]);
  const fetchFoodList=async()=>{
    try {
      let res=await axios.get(`${url}/api/food/list`);
    // console.log(res.data.data);
    if(res.data.success)
    {
      setFood(res.data.data)
    }
    } catch (error) {
      console.log('Error in getting food list :: ', error);
    }
  }

  const removeFoodItem = async (_id) => {
    try {
      console.log(_id);
      const res = await axios.delete(`${url}/api/food/remove`, {
        data: { _id },  
        headers: {
          'Content-Type': 'application/json',  
        },
      });
  
      if (res.data.success) {
        toast.success('Food Item successfully remove', {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          theme: "light",
          });
        await fetchFoodList();
      } else {
        console.log('Error in removing food item');
        toast.error('error !!!', {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          theme: "dark",
          });
      }
      console.log(res);
    } catch (error) {
      // console.error('Error in removing food item:', error);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "dark",
        });
    }
  };
  



  useEffect(()=>{
      fetchFoodList();
  }, [])
  return (
    <div className="list-food-item">
        <p>All Food Items</p>
        <div className="list-table format">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
        </div>
        <div className="Food Item">
            {list.length>=1 ? list.map((item, idx)=>{
              return (
              <div className="foodItem" key={idx}>
                  <img className="food-image" src={`${url}/images/${item.image}`}/>
                  <b className="food-name">{item.name}</b>
                  <b className="food-category">{item.category}</b>
                  <b className="food-price">{item.price}</b>
                  <b onClick={()=>removeFoodItem(item._id)} className="food-action"> X</b>
              </div>)
            }):<p>There is no Food Item</p>}
        </div>
    </div>
  )
}

export default ListFoodItem
