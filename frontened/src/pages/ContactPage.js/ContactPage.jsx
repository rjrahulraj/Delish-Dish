import  { useContext, useEffect, useState } from 'react';
import './ContactPage.css';
import axios from 'axios';
import {storeContext} from '../../context/storeContext'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const url=import.meta.env.VITE_BACKENED_URL;

const ContactPage = () => {
  const {token, userDetails}=useContext(storeContext);
  const navigate=useNavigate();
  const [details, setDetails]=useState({
    name:"",
    email:"",
    subject:"",
    message:"",
  });

  const handleChange=(e)=>{
    let name=e.target.name;
    let val=e.target.value;
    setDetails((prevState)=>({...prevState, [name]:val}))
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();

    let response=await axios.post(`${url}/api/contact/add`,details, {
      headers:{
        Authorization:token,
      }
    })
    setDetails({
      name:"",
      email:"",
      subject:"",
      message:"",
    })
    if(response.data.success===true)
    {
      toast.success(response.data.message);
      navigate('/');
    }
    else{
      toast.error("Some Error !!! try to contact after some times !!!");
      navigate('/');
    }


  }


  return (
    <div className="container">
      <h1>Contact Us</h1>
      <div className="content">
        
        <div className="formSection">
          
          <form className="form" onSubmit={(e)=>handleSubmit(e)}>
            <label className="label">Name:</label>
            <input type="text" name="name" className="input" onChange={(e)=>handleChange(e)} />

            <label className="label">Email:</label>
            <input type="email" name="email" className="input" onChange={(e)=>handleChange(e)}/>

            <label className="label">Subject:</label>
            <input type="text" name="subject" className="input" onChange={(e)=>handleChange(e)}/>

            <label className="label">Message:</label>
            <textarea name="message" className="textarea"  onChange={(e)=>handleChange(e)}/>

            <button type="submit" className="button">Send</button>
          </form>
        </div>
      </div>
     
    </div>
  );
};

export default ContactPage;
