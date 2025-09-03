import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/index.js";
import adminProductSlice from "./adminSlice/product.js"
import productSlice from "./productSlice/index.js"
import cartSlice from "./cartSlice/index.js"
import addressSlice from "./addressSlice/address.js"
import orderSlice from "./order-slice/index.js"
const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductSlice,
        product: productSlice,
        cart: cartSlice,
        address: addressSlice,
        order: orderSlice
    },
})

export default store;