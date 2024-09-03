


import { assets } from '../../assets/assets'
import styles from './Footer.module.css'



const Footer = () => {
  return (
    <div className={styles.footer}>
          <div className={styles.footerContent}>
               <div className={styles.footerLeft}>
                    <h2 className={styles.companyName}>Delish Dish</h2>
                    <p>Discover flavors that awaken your senses, only on Tomato.</p>
                    <div className={styles.socialIcons}>
                         <img src={assets.facebook_icon} alt="" />
                         <img src={assets.twitter_icon} alt="" />
                         <img src={assets.linkedin_icon} alt="" />
                    </div>
               </div>
               <div className={styles.footerCenter}>
                    <h2>Company</h2>
                    <ul>
                         <li>Home</li>
                         <li>About Us</li>
                         <li>Delivery</li>
                         <li>Privacy Policy</li>
                    </ul>
               </div>
               <div className={styles.footerRight}>
                    <h2>GET IN TOUCH</h2>
                    <ul>
                         <li>+91 7090-456-798</li>
                         <li>delishdish_help@gmail.com</li>
                    </ul>
               </div>
          </div>
    
          <p className={styles.copyRight}>CopyRight 2024 © All Right Reserved </p>
     

    </div>
  )
}

export default Footer
