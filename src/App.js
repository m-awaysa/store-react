import React,{useState} from 'react'
import { Route, Routes } from 'react-router-dom'
import CategoryProduct from './Component/CategoryProduct/CategoryProduct'
import Footer from './Component/Footer/Footer'
import Home from './Component/Home/Home'
import Login from './Component/Login/Login'
import Navbar from './Component/Navbar/Navbar'
import PageNotFound from './Component/PageNotFound/PageNotFound'
import Product from './Component/Product/Product'
import Products from './Component/Products/Products'
import Register from './Component/Register/Register'

function App() {
  const [userData, setUserData] = useState(localStorage.getItem('token'));

  return (
    <div className='container'>

      <Navbar />
      <Routes >

        <Route path='/' element={<Home />}></Route>
        <Route path='home' element={<Home />}></Route>
        <Route path='product' element={<Products />}></Route>
        <Route path='category/:name' element={<CategoryProduct />}></Route>
        <Route path='products/:id' element={<Product />}></Route>
        <Route path='login' element={<Login setUserData ={setUserData}/>}></Route>
        <Route path='register' element={<Register />}></Route>
        <Route path='*' element={<PageNotFound />}></Route>
      </Routes>
      <Footer />


    </div>
  )
}

export default App