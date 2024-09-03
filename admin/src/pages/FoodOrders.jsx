import {useState, useEffect} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
const url=import.meta.env.VITE_BACKENED_URL;
import '../style/FoodOrders.css'

const FoodOrders = () => {

  const [orders, setOrders] = useState([]);
  const [status,setStatus]=useState("");

  const fetchOrder=async()=>{
  try {
    const response=await axios.get(`${url}/api/order/allorders`)
    console.log(response);
  
    if(response.data.success)
    {
      setOrders(response.data.data);
    }
    else{
      toast.error('ERROR in getting your Orders!!! ')
    }
  } catch (error) {
    toast.error(`Error !!!  ${error.message}`);
  }
  }
  const updateOrder=async(event, orderId)=>{
  
   let response= await axios.patch(`${url}/api/order/updatestatus`, {status:event.target.value,orderId});

   if(response.data.success)
   {
     toast("status update successful")
      await fetchOrder();
   }
  }

 
  

  useEffect(()=>{
    fetchOrder()
  }, [])
  


  return (
    <div className='all-orders'>
      {orders.length>=1 && <h1 className='order-heading'>Orders</h1>}
    
    <div className="orders-page">
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="order-card">
            <h2>Order ID: {order._id}</h2>
            <p><strong> Order Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
            <p><strong>Order Time :</strong> {new Date(order.date).toLocaleTimeString()}</p>
            {/* <p><strong>Delivery Time :</strong> {new Date(order.date).toLocaleTimeString() }</p> */}
            <p><strong>Total Amount:</strong> ${order.amount.toFixed(2)}</p>
            <div>
              <label htmlFor="status  "> <strong>Status :</strong> </label>
             <select className='status' name="status" id="status"  onChange={(e)=>{updateOrder(e,order._id)}} value={order.status} >
              <option value="Food Processing">Food Processing</option>
              <option value="out for delivery">out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
            </div>
            
              <h3>Items:</h3>
            <div className="order-items">
              {order.items.map((item, idx) => (
                <div key={idx} className="order-item">
                  <p><strong>Name:</strong> {item.name}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                  <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
                  <p><strong>Total:</strong> ${item.quantity * item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
    </div>
  )
}

export default FoodOrders
