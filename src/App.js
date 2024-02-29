
import './App.css';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Product from './Pages/Product';
import Shop from './Pages/Shop';
import Item from './component/item/Item';
import Shopcategory from './Pages/Shopcategory';
import Footer from './component/Footer/Footer';
import Navbar from './component/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import men_banner from './component/Assets/banner_mens.png'
import women_banner from './component/Assets/banner_women.png'
import kid_banner from './component/Assets/banner_kids.png'

function App() {
  return (
    <div>
     <BrowserRouter>
     

      <Navbar/>
      <Routes>
      <Route path='/' element={<Shop/>}/>
      <Route path='/mens' element={<Shopcategory banner={men_banner} category="men" />}/>
      <Route path='/womens' element={<Shopcategory banner={women_banner} category="women"/>}/>
      <Route path='/kids' element={<Shopcategory banner={kid_banner} category="kid"/>}/>
      <Route path="/product" element={<Product/>}>
        <Route path=':productId' element={<Item/>}/>
      
      </Route>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/login' element={<LoginSignup/>}/>
      </Routes>
      <Footer/>

      </BrowserRouter>

    </div>
  );
}

export default App;
