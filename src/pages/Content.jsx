import React from 'react';
import '../App.css'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Blogcard from './Blogcard';

const Content = () => {
  const { id } = useParams();
  const loading = useSelector(state => state.blogs.loading);

  const blogs = useSelector((state) =>
    state.blogs.blogs.filter((blog) => {
      if (!id) return true;
      return blog.category === id;
    })
  );

  if(loading){
    return <div>loading///////</div>
  }

  return (
    <div className='cardMain'>
      {blogs.map((blog) => {
        return <Blogcard key={blog._id} blog={blog}/>
      })
      }
    </div>
  );
};

export default Content;