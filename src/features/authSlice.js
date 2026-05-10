import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials,{rejectWithValue}) => {
        try{
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/login`,credentials);
            return response.data;
        }catch (error){
            return rejectWithValue(error.response.data || "Login Failed")
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null,
        loading: false,
        error: null
    },
    reducers:{
        logout: (state) => {
            state.user = null
            state.token = null
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }
    },
    extraReducers: (builder) => {
        builder.
            addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state,action) => {
                state.loading = false
                state.token = action.payload.token

                const userData = {
                    email: action.payload.email,
                    id: action.payload.id,
                    roles: action.payload.roles,
                    name: action.payload.name
            }
            state.user = userData

            localStorage.setItem('token',action.payload.token)
            localStorage.setItem('user',JSON.stringify(userData))
            })
            .addCase(loginUser.rejected, (state,action) => {
                state.loading = false
                state.error = action.payload
            })
           
    }
})

export default authSlice.reducer
export const {logout} = authSlice.actions