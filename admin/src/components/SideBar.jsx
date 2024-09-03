  import { Link } from 'react-router-dom'
import styles from '../style/Sidebar.module.css'
import assests from '../../admin_assets/assets'
import { FaList } from "react-icons/fa";
import { TbMessageUser } from "react-icons/tb";
import { IoIosHome } from "react-icons/io";
const frontened_url=import.meta.env.VITE_FRONTENED_URL;

function SideBar() {

  const handleRedirect=()=>{
    window.location.href = `${frontened_url}`;
  }
  return (
    <div className={styles.SideBar}> 
          <div onClick={handleRedirect} to="/add" className={styles.item}><p>Home</p><IoIosHome size={25} /></div>
          <Link to="/add" className={styles.item}><p>Add Item </p><img src={assests.add_icon} alt="add Icons" /></Link>
          <Link to="/list" className={styles.item}><p>List Item </p><FaList size={20}/></Link>
          <Link to="/orders" className={styles.item}><p>Orders</p><img src={assests.order_icon} alt="" /></Link>
          <Link to="/contact" className={styles.item}><p>Contact</p> <TbMessageUser size={30}></TbMessageUser> </Link>
    </div>
  )
}

export default SideBar
