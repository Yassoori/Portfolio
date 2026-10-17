import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import { Helmet } from "react-helmet";

const productUrl = import.meta.env.VITE_WC_PRODUCTS_URL;

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const endpoint = `${productUrl}/${id}`;

  useEffect(() => {
    axios
      .get(`${endpoint}`)
      .then((res) => {
        // console.log(res.data);
        setProduct(res.data);
        const loading = setTimeout(() => setLoading(false), 1000);
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
    <>
      <Helmet>
        <title>{product.name} | Art | Yasser Saeed</title>
        <meta
          name="description"
          content={`Discover ${product.name}, artwork by Yasser Saeed.`}
        />
        <meta
          property="og:title"
          content={`${product.name} | Art | Yasser Saeed`}
        />
        <meta
          property="og:description"
          content={`Discover ${product.name}, artwork by Yasser Saeed.`}
        />
        <meta property="og:type" content="product" />
      </Helmet>
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
            {/* <h2 className="price"> */}
              {/* ${(parseFloat(product.prices.price) / 100).toFixed(2)} */}
              {/*{" "}*/}
              {/* {product.prices.currency_code} */}
            {/* </h2> */}
          </div>
          {/* <button id="add-to-cart" className="regular-button"> */}
            {/* Add to Cart */}
              {/* Shop is temporarily out of order, sorry! */}
            {/* </button> */}
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
        <Link to={"/art/"} className="back-button-container">
          <button className="back-button regular-button">
            Back to Art
          </button>
        </Link>
      </div>
    </>
  );
};

export default Product;
