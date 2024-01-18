import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet";
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
      .get(`${productsUrl}?per_page=60`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [productsUrl]);

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

    // If the same filter is clicked again, clear the description
    if (filter === selectedFilter) {
      setDescriptionText(null);
    } else {
      // Set description text based on the selected filter
      switch (selectedFilter) {
        case "Text Experiments":
          setDescriptionText(
            "Digital artworks which explore the related geometries of character forms in different writing scripts that share historical links to ancient Phoenician, then layers, rearranges, subtracts and outlines them beyond legibility."
          );
          break;
        case "In Ruins":
          setDescriptionText(
            "An ongoing series of drawings, paintings and mixed media work, loosely related through inspirations from the histories of the greater Middle East. Some of the work reconstructs myths and mythologised histories by surrealising and dislocating spaces and structures lifted from ancient ruins. Others add to the new myths being built around the social and political movements of today, for example of the ongoing Sudanese Revolution."
          );
          break;
        case "Structure Alone":
          setDescriptionText(
            "A photography series exploring modernist architecture looking through its layers of glass, and closely to its steel structures, losing sense of the buildings as a whole, but finding the compositions within the reflections and geometries. Shot from 2018 to 2021 in Auckland, Berlin, Barcelona, Madrid, and London."
          );
          break;
        case "Other":
          setDescriptionText(
            "Work created either not in series, or prior to 2018."
          );
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
    <>
      <Helmet>
        <title>Art</title>
        <meta
          name="description"
          content="This is the Art portfolio and shop page"
        />
        <meta
          name="keywords"
          content="UX, Web Development, UX design, Web design, Portfolio"
        />
        Additional meta tags, e.g., social media share tags for Twitter, etc.
        <meta
          property="og:title"
          content="Facebook Open Graph Meta Tag example"
        />
      </Helmet>
      <div className="container full-container">
        <div className="filter">
          <a onClick={() => handleFilterClick("Text Experiments")}>
            Text Experiments
          </a>
          <a onClick={() => handleFilterClick("In Ruins")}>
            In Ruins
          </a>
          <a onClick={() => handleFilterClick("Structure Alone")}>
            Structure Alone
          </a>
          <a onClick={() => handleFilterClick("Other")}>
            Other
          </a>
        </div>
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
            <Products products={filteredProducts || products} />
            // filter && <Products products={filteredProducts} />
          )}
        </div>
      </div>
    </>
  );
};

export default Art;
