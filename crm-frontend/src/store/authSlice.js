// redux/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
    const response = await fetch('http://127.0.0.1:8000/api/authUser', {
        credentials: 'include'  // To send cookies along with the request if using session-based authentication
    });
    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }
    const data = await response.json();
    console.log(data);
    return data.user; // Assuming 'user' is the key in your response containing user details
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null, // or user: {}
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchUser.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default authSlice.reducer;
