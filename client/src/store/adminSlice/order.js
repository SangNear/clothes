import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    orderList: [],
    isLoading: false,
}

export const getAllOrderAdmin = createAsyncThunk('/order/getOrderAdmin', async () => {
    const res = await axios.get("http://localhost:5000/api/admin/order/getAllOrderAdmin")
    return res.data
})

export const updateStatusOrder = createAsyncThunk('/order/updateStatus', async ({ id, orderStatus }) => {
    const res = await axios.put(`http://localhost:5000/api/admin/order/updateStatusOrder/${id}`, {
        orderStatus
    })
    return res.data
})

const adminOrderSlice = createSlice({
    name: 'adminOrderSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrderAdmin.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllOrderAdmin.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.orderList = action.payload.data
            })
            .addCase(getAllOrderAdmin.rejected, (state, action) => {
                state.isLoading = false,
                    state.orderList = []
            })
    }
})

export default adminOrderSlice.reducer