
import styles from './ExploreMenu.module.css'
import { menu_list } from '../../assets/assets' 

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className={styles.exploreMenu} >
          <h1>Explore our Menu</h1>
          <p className={styles.exploreMenuText}> Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Out mission is to satisfy your cravings
          and elevate your dinner experience, one delicious meal at the time.</p>
          <div className={styles.exploreMenuList}>
               {menu_list.map((item, index)=>{
                         return(
                              <div  key={index} className={styles.exploreListItem} onClick={()=>{
                                   setCategory(prev=>prev===item.menu_name?"All":item.menu_name)
                              }}>
                                   <img className={category===item.menu_name?`${styles.active}`:""} src={item.menu_image} alt="" />
                                   <p>{item.menu_name}</p>
                              </div>
                         )

               })}
          </div>
          <hr/> 
    </div>
  )
}

export default ExploreMenu
