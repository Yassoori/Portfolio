import { createContext, useState } from "react";

export const CartContext = createContext({
    item: [],
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {}
})

export function CartProvider({children}){

    // { id: x, quuantity: y }

    function getProdictQuantity(id) {
        cartProducts.find(product => product.id === id)?.quantity;

        if (quantity === undefined) {
            return 0;
        }

        return quantity;
    }

    const contextValue ={
        item: [],
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost


    }
    return (
        <CartContect.Provider value={contextValue}>
            {children}
        </CartContect.Provider>
    )
}

createContext