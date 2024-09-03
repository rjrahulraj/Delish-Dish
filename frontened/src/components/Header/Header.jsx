

import styles from './Header.module.css'
const Header = () => {
  const handleScroll=()=>{
    window.scrollTo({top:600,left:0,behavior:"smooth"});
  }
  return (
    <div className={styles.header}>
          <div className={styles.headerContents}>
               <h2>Order your favourite food Here</h2>
               <p>
                    Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Out mission is to satisfy your cravings
                    and elevate your dinner experience, one delicious meal at the time.
               </p>
               <button onClick={handleScroll}>view More</button>
          </div>
    </div>
  )
}

export default Header;
