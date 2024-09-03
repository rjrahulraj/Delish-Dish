
import AppDownload from '../../components/AppDownload/AppDownload';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';

import Header from '../../components/Header/Header'
import { useState } from 'react';
// import styles from './Home.module.css'

const Home = () => {

  const [category, setCategory]=useState("All");
  return (
    <div>
        <Header/>
        <ExploreMenu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category}/>
        <AppDownload></AppDownload>
        
    </div>
  )
}

export default Home
