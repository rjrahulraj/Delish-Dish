import { Avatar, Wrap, WrapItem } from '@chakra-ui/react'

import styles from '../style/Navbar.module.css'


const Navbar = () => {

     let image_url="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"


     return (
          <>
          <div className={styles.navbar}>
               <div className={styles.brandName}>
                    <h1>Delish Dish</h1>
                    <h6>Admin Panel</h6>
               </div>
               <div>
                    <Wrap>
                         <WrapItem>
                              <Avatar name='Dan Abrahmov' src={image_url} />
                         </WrapItem>

                    </Wrap>
               </div>
          </div>
               
               <hr className={styles.line} />
          </>
     )
}

export default Navbar
