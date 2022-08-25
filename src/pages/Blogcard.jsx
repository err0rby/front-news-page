import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Blogcard = ({ blog }) => {
    return (
        <div className='main' key={blog._id}>
            <div className='blogImg'><img src={`http://localhost:3030/images/${blog.image}`} alt='' /></div>
            <div className='blogTitle'><h3>{blog.title}</h3></div>
            <div className='blogText'>{blog.text.substr(0, 100) + '...'}</div>
            <div className='btnBlog'>
                <Link to={`/news/${blog._id}`}><button>Подробнее</button></Link>
            </div>
        </div>
    );
};

Blogcard.propTypes = {
    blog: PropTypes.shape({
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
    }).isRequired,
};

export default Blogcard;