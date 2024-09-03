import { Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import SideBar from './components/SideBar'
import AddFoodItem from './pages/AddFoodItem'
import ListFoodItem from './pages/ListFoodItem'
import FoodOrders from './pages/FoodOrders'
import Contact from './pages/Contact'
function App() {

  return (
    <div className='app'>
      <Navbar></Navbar>
      <div className='subApp'>
        <SideBar></SideBar>
        <div className='routes'>
          <Routes>
            
            <Route path='/' element={<ListFoodItem></ListFoodItem>} ></Route>
            <Route path='/add' element={<AddFoodItem></AddFoodItem>} ></Route>
            <Route path='/list' element={<ListFoodItem></ListFoodItem>} ></Route>
            <Route path='/orders' element={<FoodOrders></FoodOrders>} ></Route>
            <Route path='/contact' element={<Contact></Contact>} ></Route>
          </Routes>
          {/* <Outlet></Outlet> */}

        </div>

      </div>

    </div>
  )
}

export default App
