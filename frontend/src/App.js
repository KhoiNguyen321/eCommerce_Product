import React from 'react'
import { Container } from 'react-bootstrap'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductsScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserRegisterScreen from './screens/UserRegisterScreen'

const App = () => {
  return (
    <Router>
      <Header/>
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<UserRegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/product/:id' element={<ProductsScreen />} />
            <Route path='/cart/:id' element={<CartScreen />} />
            {/* <Route path='/cart/:id?' element={<CartScreen />} /> */}
            <Route path='/cart' element={<CartScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer/>
    </Router>  
  );
}

export default App;
