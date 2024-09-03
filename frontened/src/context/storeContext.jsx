import { createContext, useContext, useEffect, useState} from "react";
// import { food_list } from "../assets/assets";
import { toast } from "react-toastify";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const url=import.meta.env.VITE_BACKENED_URL;

export const storeContext  =createContext(null);

const StoreContextProvider=({children})=>{
     const [cartItem, setCartitems]=useState({})
     const [token, setToken]=useState("");
     const [userDetails, setUserDetails]=useState({})
     const [food_list, setfood_list]=useState([]);
     const [isAdmin, setIsAdmin]=useState(false);
     const Navigate=useNavigate();
     
     let isLogin=!! localStorage.getItem('token');

     const fetchFoodList=async()=>{
          try {
              let response=await axios.get(`${url}/api/food/list`);
              if(response.data.success)
              {
                setfood_list(response.data.data);
              }

          } catch (error) {
               console.log(`error i fetching the food List ::${error}`);
               toast.error(error.message)
          }
     }

     const fetchCartData=async(tkn)=>{
          
          if (tkn) {
               try {
                    // http://localhost:7999/api/cart/getcart
                   let response=await axios.get(`${url}/api/cart/getcart`, {
                       headers: {
                           Authorization: `${tkn}`, 
                       }
                   });

                //    console.log(response);
                   if(response.data.success===true)
                   {
                         setCartitems(response.data.cartData);
                   }
                   else
                   {
                    toast.error("Failed to get  cart item.");
                   }
               } catch (error) {
                   toast.error("Failed to get  cart item.");
               }
           }
     }

     


     useEffect(()=>{
          if(localStorage.getItem('token'))
               {
                    setToken(localStorage.getItem('token'));
               }
               fetchFoodList();
               fetchCartData(localStorage.getItem('token'));
               Navigate('/');
              
     },[token])

     console.log(`token ::${token}`);

     useEffect(()=>{
        if(!token)
        {
          Navigate('/login');
        }
        },[])


     const addToCart = async (itemId) => {
          if (!cartItem[itemId]) {
              setCartitems((prev) => ({ ...prev, [itemId]: 1 }));
          } else {
              setCartitems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
          }
  
          if (token) {
              try {
                  await axios.patch(`${url}/api/cart/add`, { foodId: itemId }, {
                      headers: {
                          Authorization: `${token}`, // Updated to include the token correctly
                      }
                  });
              } catch (error) {
               //    console.error(`Error adding to cart: ${error}`);
                  toast.error("Failed to add item to cart.");
              }
          }
      };
 
     const removeFromCart =async(itemId)=>{
          setCartitems((prev)=>({...prev, [itemId]:prev[itemId]-1}));
          if (token) {
               try {
                   await axios.patch(`${url}/api/cart/remove`, { foodId: itemId }, {
                       headers: {
                           Authorization: `${token}`, // Updated to include the token correctly
                       }
                   });
               } catch (error) {
                //    console.error(`Error adding to cart: ${error}`);
                   toast.error("Failed to add item to cart.");
               }
           }
     }

     const getTotalCartAmount=()=>{
          let TotalAmt=0;
          for(const item in cartItem)
          {
               if(cartItem[item]>0)
               {
                    let itemInfo=food_list.find((product)=>product._id===item);
                    TotalAmt+=itemInfo.price+cartItem[item];
               }
          }
          return TotalAmt;
     }

     const contextValue={
          food_list,
          cartItem,
          setCartitems,
          addToCart,
          removeFromCart,
          getTotalCartAmount,
          token, 
          setToken,
          isLogin,
          userDetails, 
          setUserDetails,
          isAdmin, 
          setIsAdmin
     }

     return (<storeContext.Provider value={contextValue}>
          {children}
     </storeContext.Provider>)
}


export default StoreContextProvider;