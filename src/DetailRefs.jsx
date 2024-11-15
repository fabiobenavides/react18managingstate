import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";

export default function Detail({ addToCart }) {

    const skuRef = useRef(); // the html input holds the value and not react
    const { id } = useParams(); //Corresponds with the placeholder at App.jsx
    const navigate = useNavigate();
  
    const { data: product, loading, error } = useFetch(`products/${id}`);

    if (loading) return <Spinner />;
    if (!product) return <PageNotFound />;
    if (error) throw error;

    return (
        <div id="detail">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p id="price">${product.price}</p>
        <select id="size" ref={skuRef}>
            <option value="">What sizes?</option>
            { product.skus.map((item) => (
                <option key={item.sku} value={item.sku}>
                    {item.size}
                </option>
            ))}
        </select>
        <p>
            <button className="btn bt-primary" 
                onClick={() => { 
                    const sku = skuRef.current.value;
                    if (!sku) return alert("Select size.");
                    addToCart(id, sku);
                    navigate("/cart")
                }}>
                Add to cart
            </button>
        </p>
        <img src={`/images/${product.image}`} alt={product.category} />
        </div>
    );
}
