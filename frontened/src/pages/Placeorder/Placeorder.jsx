
import { useContext,useEffect,useState } from 'react';
import './Placeorder.css';
import {storeContext} from '../../context/storeContext'; 
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
const url=import.meta.env.VITE_BACKENED_URL;

const Placeorder = () => {
  const {getTotalCartAmount, token, food_list, cartItem}=useContext(storeContext);
  const navigate=useNavigate();
  const [details, setDetails]=useState({
    firstname:"",
    lastname:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:"",
  });

 

  const handleChange=(e)=>{
      let name=e.target.name;
      let value=e.target.value;
    setDetails((prev)=>({...prev, [name]:value}))
  }

  const placeOrder=async(event)=>{
     event.preventDefault(); 
     try {
          let orderItem=[];
          food_list.map((item)=>{
               if(cartItem[item._id]>0)
               {
                    let itemInfo=item;
                    itemInfo["quantity"]=cartItem[item._id];    
                    orderItem.push(itemInfo);
               }
          })
          // console.log(details,orderItem);

          let orderData={
               address:details,
               items:orderItem,
               amount:getTotalCartAmount()+2,
          }

          let response=await axios.post(`${url}/api/order/placeorder`, orderData, {
               headers: {
                    Authorization: `${token}`, 
                }
          })

          if(response.data.success===true)
          {
               const {session_url}=response.data;
               window.location.replace(session_url);
          }
          else{
               alert("Error !!!")
               navigate('/cart')
          }
     } catch (error) {
          console.log('error')
     }    
  }
 

  return (
    <div className='placeorder'>
      <div className='del-info'>
          <h2 className='h2'> Delivery Information</h2>
          <form  >
               <div className='flex-row'>
                    <input required className='inp' type="text" name='firstname' placeholder='First Name' onChange={(e)=>handleChange(e)} value={details.firstname}/>
                    <input required className='inp half' type="text" name='lastname' placeholder='Last Name' onChange={(e)=>handleChange(e)} value={details.lastname}/>
               </div>
               <div className='email'>
                    <input required className='inp' type="text" name='email' placeholder='email' onChange={(e)=>handleChange(e)} value={details.email}/>
               </div>

               <div className='street'>
                    <input required className='inp' type="text" name='street' placeholder='Street' onChange={(e)=>handleChange(e)} value={details.street}/>
               </div>
               <div className='flex-row'>
                    <input required className='inp' type="text" name='city' placeholder='City' onChange={(e)=>handleChange(e)} value={details.city}/>
                    <input required className='inp half' type="text" name='state' placeholder='State' onChange={(e)=>handleChange(e)}  value={details.state}/>
               </div>
               <div className='flex-row'> 
                    <input required className='inp' type="text" name='zipcode' placeholder='Zip code' onChange={(e)=>handleChange(e)} value={details.zipcode}/>
                    <input required className='inp half' type="text" name='country' placeholder='Country' onChange={(e)=>handleChange(e)} value={details.country}/>
               </div>
               <div className='phone'>
                    <input required className='inp' type="text" name="phone" placeholder='Phone' onChange={(e)=>handleChange(e)} value={details.phone}/>
               </div>
          </form>
          
      </div>
      <div className='cartDetails'>
          <h2 className='h2'>Cart Totals</h2>
          <div className='bottom-border flex-row'> 
               <p>SubTotal</p>
               <p>{getTotalCartAmount()}</p>
          </div>
          <div className='bottom-border flex-row'> 
               <p>Delivery Fee</p>
               <p>$2</p>
          </div>
          <div className='bottom-border flex-row'> 
               <p><b>Total</b></p>
               <p>{getTotalCartAmount()+2}</p>
          </div>
          <button className='btn-submit' onClick={(e)=>placeOrder(e)} type='submit'>Proceed to Payment</button>
      </div>
    </div>
  )
}
export default Placeorder
