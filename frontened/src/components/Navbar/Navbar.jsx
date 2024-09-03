
import styles from './Navbar.module.css'
import { assets } from '../../assets/assets'
import { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {storeContext } from '../../context/storeContext'
import AvatarMenu from '../AvatarMenu/AvatarMenu';
import { SlOptionsVertical } from "react-icons/sl";


const navbar = () => {
     const {isLogin}=useContext(storeContext);
     const [menu,setMenu]=useState("home");
     const [auth,setAuth]=useState("login");
     const navRef=useRef();

     const showMenuNav=()=>{
          navRef.current.classList.toggle(styles.responsive_navbar);
     } 
     const removeMenuNav=()=>{
          navRef.current.classList.remove(styles.responsive_navbar);
     }


  return (
     <div className={styles.navbar}>
     <Link to='/'>
      <h2 onClick={()=>{setMenu("home")}}>Delish Dish</h2>
     </Link>
    
     <ul ref={navRef} className={styles.navbarMenu}>
         <li onClick={()=>{setMenu("home") ; removeMenuNav()}}  className={menu==="home"?`${styles.active}`:""}> <Link to="/">Home</Link> </li>
         <li  onClick={()=>{ window.scrollTo({ top: 1000, behavior: "smooth" })
          setMenu("menu")  ; removeMenuNav()}} className={menu==="menu"?`${styles.active}`:""}><Link to="/">Menu</Link></li>
         
         <li onClick={()=>{setMenu("contact") ; removeMenuNav()}} className={menu==="contact"?`${styles.active}`:""}> <Link to="/contact">Contact Us</Link></li>
     </ul>
    
     <div onClick={()=>{setMenu("") }} className={styles.navbarRight}>
          <div className={styles.res_menu} onClick={showMenuNav}><SlOptionsVertical /></div>
          <div onClick={removeMenuNav} className={styles.navbarSearchIcons}>
               <Link  to="/cart">
               <img src={assets.basket_icon} alt="" />
               <div className={styles.dot}></div>
               </Link>
          </div>
          <div  onClick={removeMenuNav}>

          {isLogin? <AvatarMenu></AvatarMenu> :auth==="login"?<button onClick={()=>setAuth("signup")} > <Link to='/login'>Log in</Link></button>:<button onClick={()=>setAuth("login")} > <Link to='/signup'>Sign up</Link></button> }
          </div>
     </div>
   </div>
  )
}

export default navbar
