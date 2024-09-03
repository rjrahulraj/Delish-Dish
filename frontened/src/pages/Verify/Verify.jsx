import { useSearchParams, useNavigate } from "react-router-dom"
import { Spinner } from '@chakra-ui/react'
import axios from "axios";
import { toast } from "react-toastify";
import { useContext, useEffect } from "react";
import { storeContext } from "../../context/storeContext";
import './Verify.css';
const url=import.meta.env.VITE_BACKENED_URL;

const Verify = () => {

     const [searchParams, setSearchParams]=useSearchParams();
     const {token}=useContext(storeContext);
     const success=searchParams.get("success");
     const orderId=searchParams.get("orderId");
    
     const navigate=useNavigate();

     



     const VerifyPayment = async () => {
          try {
            let response = await axios.post(`${url}/api/order/verify`, { success, orderId });
            // console.log(response);
            if (response.data.success === true) {
              toast.success("Payment successful");
              navigate('/orders');
            } else {
              toast.error("Payment Denied!!!");
              navigate('/');
            }
          } catch (error) {
            console.error('Error during payment verification:', error.response || error.message);
            toast.error('Error!!!');
            navigate('/');
          }
        }
        

     useEffect(()=>{
          VerifyPayment();
     console.log("token ::", token);
     }, [])


  return (
    <div className="spinner"> 
      <Spinner color="grey" size="xl" ></Spinner>
    </div>
  )
}

export default Verify
