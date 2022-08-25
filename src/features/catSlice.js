import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    categories: [],
}


export const fetchCats = createAsyncThunk('cats/fetch', async (_, thunkAPI) => {
    try {
        const res = await fetch('http://localhost:3030/category');
        const category = await res.json();
        if (category.error) {
            return thunkAPI.rejectWithValue(category.error);
        }
        return category
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error });
    }
});


const catSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCats.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
    }
});

export default catSlice.reducer;