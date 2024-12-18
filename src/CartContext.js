import React, { useContext, useEffect, useReducer } from 'react'
import cartReducer from './cartReducer';

const CartContext = React.createContext(null);

let initialCart;
try {
  initialCart = JSON.parse(localStorage.getItem("cart")) ?? [];
} catch {
  console.error("The cart could not be parsed into JSON");
  initialCart = [];
}

export function CartProdiver(props) {

    const [cart, dispatch] = useReducer(cartReducer, initialCart);

    useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

    return <CartContext.Provider value={ {cart, dispatch} }>
        {props.children}
    </CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider. Wrap a parent component in <CartProdiver></CartProdiver> to fix the error.");
    }
    return context;
}