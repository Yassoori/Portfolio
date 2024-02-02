import { useState, useEffect, Component } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

const productUrl = import.meta.env.VITE_WC_PRODUCTS_URL;

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  // const [productType, setProductType ] = useState(null)
  const [loading, setLoading] = useState(true);

  const endpoint = `${productUrl}/${id}`;

  useEffect(() => {
    axios
      .get(`${endpoint}`)
      .then((res) => {
        // console.log(res.data);
        setProduct(res.data);
        const loader = setTimeout(() => setLoading(false), 1000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [endpoint]);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div id="shop-page" className="container double-container">
      <div 
        className="left-container"
      >
        <img
          src={product.images[0].src}
          alt={product.name}
          className="product-image"
        />
      </div>
      <div className="right-container">
        <div className="product-heading">
          <h2 className="title">{product.name}</h2>
          <h2 className="price">
            ${(parseFloat(product.prices.price) / 100).toFixed(2)}
            {/*{" "}*/}
            {/* {product.prices.currency_code} */}
          </h2>
        </div>
        <button id="add-to-cart" className="regular-button">
          {/* Add to Cart */}
            Shop is temporarily out of order, sorry!
          </button>        
        <div
          dangerouslySetInnerHTML={{
            __html: product.short_description,
          }}
          className="short-description"
        />
      </div>
      <div className="lower-container">
        <div dangerouslySetInnerHTML={{ __html: product.description }} className="long-description"/>
      </div>
    </div>
  );
};

export default Product;
