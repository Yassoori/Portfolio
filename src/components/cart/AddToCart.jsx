import React from "react";
import { addToCart } from "../../utils/cart";

const AddToCart = ({product}) => {
  return (
    <div className="cart-container">
      <button id="add-to-cart" className="regular-button"
      onClick={ () => addToCart( product?.id?? 0) }
      >
        Add to Cart
        {/* Shop is out of order, sorry! */}
      </button>
    </div>
  );
};

export default AddToCart;
