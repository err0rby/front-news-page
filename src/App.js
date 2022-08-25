import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { fetchBlogs } from './features/blogSlice';
import Header from './pages/Header';
import Content from './pages/Content';
import Fullblog from './pages/Fullblog';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';



function App() {
  const dispatch = useDispatch();

  const token = useSelector(state => state.application.token);

  useEffect(() => {
    dispatch(fetchBlogs())
  }, [dispatch])



  if (token) {
    return (
      <>
        <Header />
        <Routes>
          <Route path='/login' element={<Navigate to='/' />} />
          <Route path='/auth' element={<SignUp />} />
          <Route path='/' element={<Content />} />
          <Route path='/news/:id' element={<Fullblog />} />
          <Route path='/category/:id' element={<Content />} />
        </Routes>
      </>
    );
  }
  return (
    <>
      <Header />
      <Routes>
        <Route path='/login' element={<SignIn />} />
        <Route path='/auth' element={<SignUp />} />
        <Route path='/' element={<Content />} />
        <Route path='/news/:id' element={<Fullblog />} />
        <Route path='/category/:id' element={<Content />} />
      </Routes>
    </>
  );
}

export default App;
