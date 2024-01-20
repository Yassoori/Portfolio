import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
// import AOS from "aos";
// import "aos/dist/aos.css";

const productsUrl = import.meta.env.VITE_WC_PRODUCTS_URL;

const Art = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState(null);
  const [series, setSeries] = useState(null);
  const [description, setDescription] = useState(null);

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
    // // ---- This version resets on reclick
    // // Reset filter if clicked again
    // setFilter((prevFilter) =>
    //   prevFilter === selectedFilter ? null : selectedFilter
    // );

    // // If the same filter is clicked again, clear the series and description
    // if (filter === selectedFilter) {
    // if (isSameFilter) {
    //   setSeries(null);
    //   setDescription(null);
    // } else {

    // ---- This version does nothing on reclick
    // Check if the filter is already set to the selected filter
    const isSameFilter = filter === selectedFilter;

    // Always update the filter to the selected filter
    setFilter(selectedFilter);

    // If the same filter is clicked again, clear the series and description
    if (!isSameFilter) {
      // ---- END
      // Set series and description  based on the selected filter
      switch (selectedFilter) {
        case "All":
          setFilter(null);
          setSeries(null);
          setDescription(null);
          break;
        case "Text Experiments":
          setSeries("Text Experiments");
          setDescription(
            "Digital artworks which explore the related geometries of character forms in different writing scripts that share historical links to ancient Phoenician, then layers, rearranges, subtracts and outlines them beyond legibility."
          );
          break;
        case "In Ruins":
          setSeries("In Ruins");
          setDescription(
            "An ongoing series of drawings, paintings and mixed media work, loosely related through inspirations from the histories of the greater Middle East. Some of the work reconstructs myths and mythologised histories by surrealising and dislocating spaces and structures lifted from ancient ruins. Others add to the new myths being built around the social and political movements of today, for example of the ongoing Sudanese Revolution."
          );
          break;
        case "Structure Alone":
          setSeries("Structure Alone");
          setDescription(
            "A photography series exploring modernist architecture looking through its layers of glass, and closely to its steel structures, losing sense of the buildings as a whole, but finding the compositions within the reflections and geometries. Shot from 2018 to 2021 in Auckland, Berlin, Barcelona, Madrid, and London."
          );
          break;
        case "Other":
          setSeries("Other");
          setDescription(
            "Work created either not in series, or prior to 2018."
          );
          break;
        default:
          setSeries(null);
          setDescription(null);
      }
    }

    // Reset styles for all filter buttons
    const filterButtons = document.querySelectorAll(".filter-button");
    filterButtons.forEach((button) => button.classList.remove("selected"));

    // Set styles for the selected filter button
    const selectedButton = document.getElementById(
      `filter-${selectedFilter.toLowerCase().replace(" ", "-")}`
    );
    if (selectedButton) {
      selectedButton.classList.add("selected");
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
      const isFiltered =
        filter &&
        product.categories.some((category) => category.name === filter);
      const productCardClasses = `product-card${isFiltered ? " filtered" : ""}`;

      return (
        <div
          key={product.slug + "_" + index}
          className={productCardClasses}
          data-aos="zoom-in"
          data-aos-offset="100"
          data-set-delay="1000"
        >
          <Link className="product-link" to={`/product/${product.id}`}>
            <img src={product.images[0].src} alt={product.name} />
            <div className="product-overlay">
              <div className="text-overlay">
                <h2 className="title">{product.name}</h2>
                <h2 className="price">
                  ${(parseFloat(product.prices.price) / 100).toFixed(2)}
                  {/* {" "}
                    {product.prices.currency_code} */}
                </h2>
                {/* <div
                  className="short-description"
                  dangerouslySetInnerHTML={{
                    __html: product.short_description,
                  }}
                /> */}
              </div>
            </div>
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
      <div className="container full-container" id="art-container">
        <div className="filter">
          <a
            onClick={() => handleFilterClick("All")}
            id="filter-all"
            className="filter-button selected"
          >
            All
          </a>
          <a
            onClick={() => handleFilterClick("Text Experiments")}
            id="filter-text-experiments"
            className="filter-button"
          >
            Text Experiments
          </a>
          <a
            onClick={() => handleFilterClick("In Ruins")}
            id="filter-in-ruins"
            className="filter-button"
          >
            In Ruins
          </a>
          <a
            onClick={() => handleFilterClick("Structure Alone")}
            id="filter-structure-alone"
            className="filter-button"
          >
            Structure Alone
          </a>
          {/* <a onClick={() => handleFilterClick("Other")}>
            Other
          </a> */}
        </div>
        {/* <div className="feature">
        <div className="text-experiments-feature"></div>
        <div className="in-ruins-feature"></div>
        <div className="structure-alone-feature"></div>
        <div className="other-feature"></div>
        </div> */}
        <div className={`series-description ${description ? "expanded" : ""}`}>
          <h2>{series}</h2>
          <p>{description}</p>
        </div>
        <div className="card-container">
          {loading ? (
            <Loading />
          ) : (
            <Products products={filteredProducts || products} />
            // {/* filter && <Products products={filteredProducts} /> */}
          )}
        </div>
      </div>
    </>
  );
};

export default Art;
