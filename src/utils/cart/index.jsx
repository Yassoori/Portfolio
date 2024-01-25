import axios from "axios";
// import { getSession, storeSession } from "./Session";
// import { getAddOrViewCartConfig } from "./api";

// import IsEmpty from "../../validators/IsEmpty";


const cartUrl = import.meta.env.CART_ENDPOINT;

export const addToCart = ( productId, qty = 1) => {

    // const storeSession = getSession();
    // const addOrViewCartConfig = getAddOrViewCartConfig();

    axios.post (cartUrl, { product_id: productId, quantity: qty,},
    // addOrViewCartConfig,
    )
    // .then( (res) => {
    //     if (IsEmpty(storeSession)) {
    //         storeSession(res?.headers?.["x-wc-session"]);
    //     }
    //     viewCart();
    // })
    .catch(err => {
        console.log(('err', err));
    });
}

// export const viewCart = () => {
//     const addOrViewCartConfig = getAddOrViewCartConfig();

//     axios.get( cartUrl, addOrViewCartConfig )
//     .then ((res)=>{
//         console.log("res",res);
//     })
//     .catch ((err)=>{
//         console.log("err",err);
//     })
// }