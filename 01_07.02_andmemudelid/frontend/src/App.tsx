//SELLEKS ET LEHTEDE VAHEL LIIKUDA, VAJA REACTIS TEHA TERMINALIS INSTALL REACT-ROUTER-DOM ( npm install react-router-dom )!!!
//import { useEffect, useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'

// Bootstrap --> lehelt saab kõik kätte!!


import './App.css'
import { Route, Routes } from 'react-router-dom';  // vaja importida!!
import ManageProducts from './pages/ManageProducts.tsx';
import MainPage from './pages/MainPage.tsx';
import ManageCategories from './pages/ManageCategories.tsx';
import Orders from './pages/Orders.tsx';
import Cart from './pages/Cart.tsx';
import Arrayd from './pages/Arrayd.tsx';
import Menu from './components/Menu.tsx';
import Login from './pages/Login.tsx';
import SignUp from './pages/SignUp.tsx';
import EditProduct from './pages/EditProduct.tsx';
import SingleProduct from './pages/SingleProduct.tsx';
import Map from './pages/Map.tsx';

function App() {

  return (
    <>
      {/* localhost:5173/ --> <div>MainPage</div>
              localhost:5173/admin/products --> <div>ManageProducts</div>

              Routes-idest ülevad käib menüü
          */}
      <Menu />

      <Routes>
        <Route path='/' element={< MainPage />} />
        <Route path='/admin/products' element={< ManageProducts />} />
        <Route path='/admin/categories' element={< ManageCategories />} />
        <Route path='/admin/edit-product/:productId' element={< EditProduct />} />

        <Route path='/orders' element={< Orders />} />
        <Route path='/cart' element={< Cart />} />
        <Route path='/arrays' element={< Arrayd />} />
        <Route path='/login' element={< Login />} />
        <Route path='/signup' element={< SignUp />} />
        <Route path='/product/:productId' element={< SingleProduct />} />
        <Route path='/map' element={<Map />} />

        <Route path='/*' element={<div>Page Not Found</div>} /> {/* saab ka HTML-i otse kirjutada sisse. */}
      </Routes>

      {/*käib FOOTER*/}

    </>
  )
}

//key={}
//react soovib koodi mällu jätta. Kui toimuvad re-renderdamised, siis jätab kõib mällu, va tsükli sisud.
//sest pole aimu mille järgi meelde jätta.
//selle jaoks et saaks meelde jätta, lisame key={} !! kehtib tsüklite ja array-dega !!

export default App