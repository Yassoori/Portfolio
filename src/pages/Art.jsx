import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

const productsUrl = import.meta.env.VITE_WC_PRODUCTS_URL;

const Art = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState(null);

  const [descriptionText, setDescriptionText] = useState(null);

  useEffect(() => {
    axios
      .get(`${productsUrl}`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!filter) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.categories.some((category) => category.name === filter)
      );
      setFilteredProducts(filtered);
    }
  }, [filter, products]);

  const handleFilterClick = (selectedFilter) => {
    setFilter((prevFilter) =>
      prevFilter === selectedFilter ? null : selectedFilter
    );
    console.log(`clicked ${selectedFilter}`);

    // If the same filter is clicked again, clear the description
    if (filter === selectedFilter) {
      setDescriptionText(null);
    } else {
      // Set description text based on the selected filter
      switch (selectedFilter) {
        case "Text Experiments":
          setDescriptionText("Text Experiments description goes here");
          break;
        case "In Ruins":
          setDescriptionText("In Ruins description goes here");
          break;
        case "Structure Alone":
          setDescriptionText("Structure Alone description goes here");
          break;
        case "Other":
          setDescriptionText("Other description goes here");
          break;
        default:
          setDescriptionText(null);
      }
    }
  };

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  const Products = ({ products }) => {
    const mappedProducts = products.map((product, index) => {
      return (
        <div key={product.slug + "_" + index} className="product-card">
          <Link className="product-link" to={`/product/${product.id}`}>
            <h2 className="title">{product.name}</h2>
            <h2 className="price">
              ${(parseFloat(product.prices.price) / 100).toFixed(2)}
              {/* {" "}
                  {product.prices.currency_code} */}
            </h2>
            <div
              className="short-description"
              dangerouslySetInnerHTML={{ __html: product.short_description }}
            />
            <img src={product.images[0].src} alt={product.name} />
          </Link>
        </div>
      );
    });

    return <>{mappedProducts}</>;
  };

  return (
    <div className="container full-container">
      <ul className="filter">
        <li onClick={() => handleFilterClick("Text Experiments")}>
          Text Experiments
        </li>
        <li onClick={() => handleFilterClick("In Ruins")}>In Ruins</li>
        <li onClick={() => handleFilterClick("Structure Alone")}>
          Structure Alone
        </li>
        <li onClick={() => handleFilterClick("Other")}>Other</li>
      </ul>
      {/* <div className="feature">
        <div className="text-experiments-feature"></div>
        <div className="in-ruins-feature"></div>
        <div className="structure-alone-feature"></div>
        <div className="other-feature"></div>
      </div> */}
      <div className="series-description">{descriptionText}</div>
      <div className="card-container">
        {loading ? (
          <Loading />
        ) : (
          //   <Products products={filteredProducts || products}  />
          filter && <Products products={filteredProducts} />
        )}
      </div>
    </div>
  );
};

export default Art;
