import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    users: [],
}


export const fetchUsers = createAsyncThunk('users/fetch', async(_, thunkAPI) => {
    try {
        const res = await fetch('http://localhost:3030/users');
        const data = await res.json();
        if (data.error){
            return thunkAPI.rejectWithValue(data.error)
        }
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            })
    }
});

export default usersSlice.reducer;