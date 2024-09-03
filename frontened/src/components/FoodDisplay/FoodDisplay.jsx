
import { useContext } from "react"
import styles from "./FoodDisplay.module.css"
import { storeContext } from "../../context/storeContext"
import FoodItems from "../FoodItems/FoodItems";

const FoodDisplay = ({category}) => {
     const {food_list}=useContext(storeContext);
  return (
    <div className={styles.foodDisplay}>
          <h2>Top Dishes near you</h2>
          <div className={styles.foodDisplayList}>
               {food_list.map((item, index)=>{

                    if(category==="All" || category===item.category)
                    {
                         return <FoodItems key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} ></FoodItems>
               
                    }
                     })}

          </div>
    </div>
  )
}

export default FoodDisplay
