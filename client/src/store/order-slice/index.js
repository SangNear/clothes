import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    approvalURL: null,
    isLoading: false,
    orderId: null,
    orderList: [],
    orderDetail: null
}

export const createNewOrder = createAsyncThunk('/order/createNewOrder', async (orderData) => {
    const res = await axios.post("http://localhost:5000/api/shop/order/create", orderData)
    return res.data
})
export const capturePayment = createAsyncThunk('/order/capturePayment', async ({ paymentId, payerId, orderId }) => {
    const res = await axios.post("http://localhost:5000/api/shop/order/capture", {
        paymentId,
        payerId,
        orderId

    })
    return res.data
})
export const getAllOrderByUser = createAsyncThunk('/order/getAllOrders', async (userId) => {
    const res = await axios.get(`http://localhost:5000/api/shop/order/getAllOrders/${userId}`,)
    return res.data
})
export const getOrderDetail = createAsyncThunk('/order/getOrderDetail', async (id) => {
    const res = await axios.get(`http://localhost:5000/api/shop/order/getOrderDetail/${id}`)
    return res.data
})

const shoppingOrderSlice = createSlice({
    name: 'shoppingOrderSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createNewOrder.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createNewOrder.fulfilled, (state, action) => {
                state.isLoading = true
                state.approvalURL = action.payload.approvalURL,
                    state.orderId = action.payload.orderId,
                    sessionStorage.setItem('currentOrderId', JSON.stringify(action.payload.orderId))
            })
            .addCase(createNewOrder.rejected, (state) => {
                state.isLoading = false,
                    state.approvalURL = null,
                    state.orderId = null
            })
            .addCase(capturePayment.pending, (state) => {
                state.isLoading = false
            })
            .addCase(getAllOrderByUser.pending, (state) => {
                state.isLoading = false
            })
            .addCase(getAllOrderByUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.orderList = action.payload
            })
            .addCase(getAllOrderByUser.rejected, (state) => {
                state.isLoading = false
                state.orderList = []
            })
            .addCase(getOrderDetail.pending, (state) => {
                state.isLoading = false
            })
            .addCase(getOrderDetail.fulfilled, (state, action) => {
                state.isLoading = false
                state.orderDetail = action.payload
            })
            .addCase(getOrderDetail.rejected, (state) => {
                state.isLoading = false
                state.orderDetail = null
            })

    }
})

export default shoppingOrderSlice.reducer