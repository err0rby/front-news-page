import { configureStore } from "@reduxjs/toolkit";
import blogs from "../features/blogSlice";
import cats from "../features/catSlice";
import application from "../features/applicationSlice";
import comments from "../features/commentSlice";
import users from "../features/usersSlice";

export const store = configureStore({
    reducer: {
        blogs,
        cats,
        application,
        comments,
        users,
    }
})