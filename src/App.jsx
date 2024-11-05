import React, { useEffect, useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import { getProducts } from "./services/productService";

export default function App() {

  const [size, setSize] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts("shoes")
      .then((Response) => setProducts(Response))
      .catch((e) => setError(e));
  }, []); // [] means the reason to re-render, empty means run only once

  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <a href="/">
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </a>
      </div>
    );
  }

  const filteredProducts = size 
    ? products.filter(pro => pro.skus.find(s => s.size === parseInt(size)))
    : products;

  if (error) throw error;

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <section id="filters">
            <label htmlFor="size">Filter by Size:</label>{" "}
            <select id="size" value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="">All sizes</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
          </section>
          {size && <h2>Found {filteredProducts.length} items</h2>}
          <section id="products">
            {filteredProducts.map(renderProduct)}
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
