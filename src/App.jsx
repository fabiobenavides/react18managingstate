import React, { useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Routes, Route } from "react-router-dom"
import Detail from "./Detail";
import Cart from "./Cart";

export default function App() {

  const [cart, setCart] = useState([]);

  function addToCart(id, sku) {
    setCart((items) => {
      const itemInCart = items.find((ele) => ele.sku === sku);
      if (itemInCart) {
        // Return new array with quantity increased
        return items.map((i) => 
          i.sku === sku
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      // Return a new array with a new item appended
      return [...items, { id, sku, quantity: 1 }];
    })
  }

  function updateQuantity(sku, quantity) {
    setCart((items) => {
        // Return new array with quantity increased
        return items.map((i) => 
          i.sku === sku
            ? { ...i, quantity }
            : i
        );
      }
    )
  }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome home</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route path="/:category/:id" element={<Detail addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
