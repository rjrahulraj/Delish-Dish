import { useContext, useState } from 'react';
import './Signup.css';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {storeContext } from '../../context/storeContext'
const url=import.meta.env.VITE_BACKENED_URL;
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const {setToken, setUserDetails,setIsAdmin} =useContext(storeContext )
  const [signupDetails, setSignupDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();



  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSignupDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
 
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log("Form submitted with details:", signupDetails);
    
    if (!signupDetails.name || !signupDetails.email || !signupDetails.password ) {
      toast.error("Please fill all fields and upload a photo.");
      return;
    }

    // Add your submission logic here (e.g., API call)
    try {
      let response=await axios.post(`${url}/api/user/signup`, signupDetails,{
        headers:{
          "Context-Type":"application/json"
     }})
    //  console.log(response)

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
        toast.error("error ! try after sometime")
      }
    } catch (error) {
       console.log("Error in sign ::",error)
       toast.error(error.message);
    }

  };

  return (
    <div className="main-content">
            <div className="signup-container">
                <h2>Create an Account</h2>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" onChange={(e)=>handleChange(e)} placeholder='Enter your name' required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder='Enter your email'required  onChange={(e)=>handleChange(e)}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder='Enter your password' name="password" required onChange={(e)=>handleChange(e)}/>
                    </div>
                    <button type="submit" className="btn">Sign Up</button>
                </form>
                <div className="footer">
            <p>Already have an account? <Link to="/login" className="link">Log in</Link></p>
        </div>
            </div>
        </div>
  );
};

export default Signup;
