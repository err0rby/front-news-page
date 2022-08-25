import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    comments: [],
}

export const fetchComments = createAsyncThunk('comments/fetch', async (_, thunkAPI) => {
    try {
        const res = await fetch('http://localhost:3030/comments')
        const data = await res.json();
        if (data.error) {
            return thunkAPI.rejectWithValue(data.error);
        }
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const addComments = createAsyncThunk('comments/add', async ({ user, text, id }, thunkAPI) => {
    try {
        const res = await fetch('http://localhost:3030/comments', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().application.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user, text, blogs: id }),
        })
        const data = await res.json();
        if (data.error) {
            return thunkAPI.rejectWithValue(data.error)
        }
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const deleteComment = createAsyncThunk('comments/delete', async (id, thunkAPI) => {
    try {
        const res = await fetch(`http://localhost:3030/comments/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().application.token}`,
                'Content-Type': 'application/json',
            },
        });
        const data = res.json();
        if (data.error) {
            return thunkAPI.rejectWithValue(data.error);
        }
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})


const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.comments = action.payload;
            })
            .addCase(addComments.fulfilled, (state, action) => {
                state.comments.unshift(action.payload)
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.comments = state.comments.filter((comm) => comm._id !== action.payload)
            })
    }
});

export default commentSlice.reducer;