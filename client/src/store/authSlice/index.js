import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const storedUser = localStorage.getItem("user")
const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: storedUser ? JSON.parse(storedUser) : null,
}

export const registerUser = createAsyncThunk('auth/registerUser', async (formData) => {
    const res = await axios.post('http://localhost:5000/api/auth/register', formData, {
        withCredentials: true,
    })
    return res.data
})

export const loginUser = createAsyncThunk('auth/login', async (formData) => {
    const res = await axios.post('http://localhost:5000/api/auth/login', formData, {
        withCredentials: true
    })
    return res.data
})

export const logOutUser = createAsyncThunk('auth/logout', async () => {
    const res = await axios.get('http://localhost:5000/api/auth/logout', {
        withCredentials: true
    })
    return res.data
})

export const checkAuth = createAsyncThunk('auth/checkauth', async () => {
    const res = await axios.get('http://localhost:5000/api/auth/check-auth', {
        withCredentials: true,
        headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate', Expires: '0'
        }
    })
    return res.data
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {

        }
    },
    extraReducers: (builder) => {
        builder
            //register
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload
                state.isAuthenticated = true
            })
            .addCase(registerUser.rejected, (state) => {
                state.isLoading = false
                state.user = null
                state.isAuthenticated = false
            })


            //login
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log("check action:", action);

                state.isLoading = false
                if (action.payload.success) {
                    state.user = action.payload.user
                    state.isAuthenticated = true

                    // Lưu vào localStorage
                    localStorage.setItem("user", JSON.stringify(action.payload.user))
                } else {
                    state.user = null
                    state.isAuthenticated = false
                    localStorage.removeItem("user")
                }

            })
            .addCase(loginUser.rejected, (state) => {
                state.isLoading = false
                state.user = null
                state.isAuthenticated = false
            })


            //check authorization
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true
            })
            .addCase(checkAuth.fulfilled, (state, action) => {

                state.isLoading = false
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success

            })
            .addCase(checkAuth.rejected, (state) => {
                state.isLoading = false
                state.user = null
                state.isAuthenticated = false
            })
            .addCase(logOutUser.fulfilled, (state) => {
                state.user = null
                state.isAuthenticated = false
                state.isLoading = false
            })


    }
})

export const { setUser } = authSlice.actions
export default authSlice.reducer