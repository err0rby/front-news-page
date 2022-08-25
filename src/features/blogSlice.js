import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    blogs: [],
    loading: false,
}

export const fetchBlogs = createAsyncThunk(
    'blogs/fetch',
    async (_, thunkAPI) => {
        try {
            const res = await fetch('http://localhost:3030/blogs');
            const blogs = await res.json();
            if (blogs.error) {
                return thunkAPI.rejectWithValue(blogs.error);
            }
            return blogs;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error + 'Ошибка' });
        }
    }
)



const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = action.payload;
            })
            .addCase(fetchBlogs.pending, (state, action) => {
                state.loading = true;
            })
    }
});

export default blogSlice.reducer;