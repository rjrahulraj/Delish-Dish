import { useState, useEffect } from 'react';
import '../style/contact.css'
import axios from "axios";
import { IoCloseSharp } from "react-icons/io5";
const url = import.meta.env.VITE_BACKENED_URL;
import { toast } from 'react-toastify';


const Contact = () => {

  const [contacts, setContacts] = useState([]);


  const fetchContact = async () => {
    try {
      let response = await axios.get(`${url}/api/contact/fetch`);

      if (response.data.success) {
        setContacts(response.data.data);
      }

    } catch (error) {
      toast.error("Error in loading contact. Try after Sometimes !!!")
    }
  }
  const removeContact = async (id) => {
    try {
      let response = await axios.delete(`${url}/api/contact/remove/${id}`);
      if (response.data.success) {

        let newContacts=contacts.filter((item, id) => {
          item._id !== id;
        })
        fetchContact()
        toast.success(response.data.message);
      }
      else {
        toast.error(response.data.message);
      }

    } catch (error) {
      toast.error("Error in loading contact. Try after Sometimes !!!")
    }
  }

  useEffect(() => {
    fetchContact()
  }, [])

  return (
    <div className='contact-page'>
      <h2>All Contacts</h2>

      {contacts && contacts.map((item, idx) => {
        return <>
          <div key={idx}>
            <div className='contact-details'>
              <div className='contact-name' ><p> <b>Name</b> :<b>{item.name}</b></p></div>
              <div className='contact-email'><p> <b>Email</b> : {item.email}</p></div>
              <div className='contact-subject'><p> <b>Subject</b> : {item.subject}</p></div>
              <div className='contact-msg'><p> <b>Message</b> : {item.message}</p></div>
              <div> <button onClick={()=>removeContact(item._id)}> <IoCloseSharp></IoCloseSharp> </button></div>
            </div>
          </div>


        </>
      })}


    </div>
  )
}

export default Contact
