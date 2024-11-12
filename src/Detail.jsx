import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";

export default function Detail() {

    const [sku, setSku] = useState("");
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
        <select id="size" value={sku} onChange={(e) => setSku(e.target.value)}>
            <option value="">What sizes?</option>
            { product.skus.map((item) => (
                <option key={item.sku} value={item.sku}>
                    {item.size}
                </option>
            ))}
        </select>
        <p>
            <button className="btn bt-primary" 
                disabled={!sku}
                onClick={() => { navigate("/cart")}}>
                Add to cart
            </button>
        </p>
        <img src={`/images/${product.image}`} alt={product.category} />
        </div>
    );
}
