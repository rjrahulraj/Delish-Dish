
import styles from './FoodItems.module.css';
import { assets } from '../../assets/assets';
import { useContext } from 'react';
import { storeContext } from '../../context/storeContext';
const url=import.meta.env.VITE_BACKENED_URL;

const FoodItems = ({id, name, description,price,image}) => {


     const {cartItem, addToCart,removeFromCart}=useContext(storeContext);

  return (
    <div className={styles.foodItem}>
          <div className={styles.foodItemImg}>
               <img className={styles.foodimage} src={`${url}/images/${image}`} alt="" />
               {!cartItem[id]
                    ? <img className={styles.add} onClick={()=>{addToCart(id)}} src={assets.add_icon_white}></img>
                    : <div className={styles.fooditemCounter}>
                         <img onClick={()=>{removeFromCart(id)}} src={assets.remove_icon_red} alt="" />
                         <p>{cartItem[id]}</p>
                         <img onClick={()=>{addToCart(id)}} src={assets.add_icon_green}></img>
                    </div>
               }

          </div>
          <div className={styles.foodItemInfo}>
               <div className={styles.NameRating}>
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="" />
               </div>
               <p className={styles.description}>{description}</p>
               <p className={styles.price}>${price}</p>
          </div>
    </div>
  )
}

export default FoodItems
