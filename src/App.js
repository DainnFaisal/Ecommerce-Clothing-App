import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Headers from './Components/Headers';
import Products from './Components/Products';
import ProductDetails from './Components/ProductDetails';
import Register from './Components/Register';
import Login from './Components/Login';
import LogoutButton from './Components/LogoutButton';
import Chat from './Components/Chat';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';
import { CartProvider } from './Components/CartContext';
import { auth } from './firebaseConfig';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="App">
        <CartProvider>

          <Router>
            <Headers />
            {currentUser && <LogoutButton />}

            <Routes>
              <Route path='/Products' element={
                <ProtectedRoute user={currentUser}>
                  <Products />
                </ProtectedRoute>
              } />

              <Route path="/product/:id" element={
                <ProtectedRoute user={currentUser}>
                  <ProductDetails />
                </ProtectedRoute>
              } />

              <Route path="/Register" element={<Register />} />

              <Route path="/Login" element={<Login />} />
              
              <Route path="/Chat" element={
                <ProtectedRoute user={currentUser}>
                  <Chat currentUser={currentUser} />
                </ProtectedRoute>
              } />

              <Route path="/Cart" element={
                <ProtectedRoute user={currentUser}>
                  <Cart />
                </ProtectedRoute>
              } />

              <Route path="/checkout" element={
                <ProtectedRoute user={currentUser}>
                  <Checkout />
                </ProtectedRoute>
              } />

            </Routes>

          </Router>
        </CartProvider>
      </div>
    </>
  );
}

export default App;
