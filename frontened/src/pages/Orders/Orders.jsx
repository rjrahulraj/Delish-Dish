import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { storeContext } from '../../context/storeContext';
import './Orders.css'; 
import { toast } from 'react-toastify';

const url=import.meta.env.VITE_BACKENED_URL;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { token } = useContext(storeContext);

  const fetchOrder=async()=>{
    const response=await axios.get(`${url}/api/order/fetchorders`, {
      headers: {
          Authorization: `${token}`, // Updated to include the token correctly
      }
  })

  if(response.data.success)
  {
    setOrders(response.data.data);
  }
  else{
    toast.error('ERROR in getting your Orders!!! ')
  }
  }
  useEffect(()=>{
    fetchOrder();
  }, [])

  return (
    <div>
      {orders.length>=1 && <h1 className='order-heading'>Your Orders</h1>}
    
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
            <p><strong>Status:</strong> {order.status}</p>
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
  );
};

export default Orders;
