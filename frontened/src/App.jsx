
import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Placeorder from './pages/Placeorder/Placeorder'
import Footer from './components/Footer/Footer'
import ContactPage from './pages/ContactPage.js/ContactPage'
import Login from './components/Login/Login'
import Signup from './components/signup/Signup'
import Orders from './pages/Orders/Orders'
import Verify from './pages/Verify/Verify'

function App() {

  return (
    <>
    <div className='app'>
        <Navbar ></Navbar> 
        <Routes>
          <Route path='/' element={<Home></Home>} />
          <Route path='/cart' element={<Cart></Cart>} />
          <Route path='/orders' element={<Orders></Orders>} />
          <Route path='/login' element={<Login></Login>} />
          <Route path='/signup' element={<Signup></Signup>} />
          <Route path='/contact' element={<ContactPage></ContactPage>} />
          <Route path='/placeorder' element={<Placeorder></Placeorder>} />
          <Route path='/verify' element={<Verify></Verify>} />
        </Routes>   
    </div>
        <Footer></Footer>
    </>
  )
}

export default App
