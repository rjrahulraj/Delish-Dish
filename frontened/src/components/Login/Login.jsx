import {  useState,useContext } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {storeContext } from '../../context/storeContext'
const url=import.meta.env.VITE_BACKENED_URL;
import { useNavigate } from 'react-router-dom';


const Login = () => {

     const {setUserDetails ,setToken,setIsAdmin}=useContext(storeContext )
     const navigate = useNavigate();
    
     const [loginDetails, setLoginDetails]=useState({
          email:"",
          password:"",
     })

     const handleChange=(e)=>{
          let name=e.target.name;
          let value=e.target.value;
          setLoginDetails((data)=>({...data, [name]:value}))
     }

     const handleLogin=async(e)=>{
          e.preventDefault();
          try {
               let response=await axios.post(`${url}/api/user/login`,loginDetails, {
                    headers:{
                         "Context-Type":"application/json"
                    }
               })

               if(response.data.success===true)
               {
                    toast.success(response.data.message, {
                         position: "top-right",
                         autoClose: 3000,
                         closeOnClick: true,
                         theme: "light",
                         });
                         setToken(response.data.token);
                         setUserDetails({
                              _id:response.data._id,
                              name:response.data.name,
                              email:response.data.email,
                              image:response.data.image,
                              cartData:response.data.cartData,
                            })
                         setIsAdmin(response.data.isAdmin);
                         localStorage.setItem("token",response.data.token)
                         navigate('/');
               }
               else{
                    toast.error(response.data.message);
               }
          } catch (error) {
               console.log("Error in login ::",error)
               toast.error(error.message);
          }
     }
    

  return (
    <div className="login-container">
      <div className="login-content">
        <h2 className="title">Login to Your Account</h2>
        <form className="login-form" onSubmit={(e)=>handleLogin(e)}>
          <label className="label">Email:</label>
          <input type="email" name="email" className="input" onChange={(e)=>handleChange(e)} placeholder="Enter your email" />

          <label className="label">Password:</label>
          <input type="password" name="password" className="input" onChange={(e)=>handleChange(e)} placeholder="Enter your password" />

          <button type="submit" className="button">Login</button>
        </form>
        <div className="footer">
          <p>Don't have an account? <Link to="/signup" className="link">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
