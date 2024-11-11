import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";

export default function Detail() {

    const { id } = useParams(); //Corrects with the placeholder at App.jsx
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
        <p>
            <button className="btn bt-primary"
                onClick={() => { navigate("/cart")}}>
                Add to cart
            </button>
        </p>
        <img src={`/images/${product.image}`} alt={product.category} />
        </div>
    );
}
