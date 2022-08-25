import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchBlogs } from '../features/blogSlice';
import { addComments, deleteComment, fetchComments } from '../features/commentSlice';
import { fetchUsers } from '../features/usersSlice';


const Fullblog = () => {
    const [error, setError] = useState(false);
    const [text, setText] = useState('');
    const { id } = useParams();
    const blogs = useSelector(state => state.blogs.blogs);
    const token = useSelector(state => state.application.token);
    const comments = useSelector(state => state.comments.comments);

    const users = useSelector(state => state.users.users);
    const dispatch = useDispatch();
    const user = useSelector(state => state.application.name)

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchBlogs())
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchComments())
    }, [dispatch])

    const deleteComm = (id) => {
        dispatch(deleteComment(id));
    }

    const handleRegul = (e) => {
        setText(e.target.value);
        setError(false);
    }


    const handleCom = () => {
        if (!token) {
            setError(true);
        }
        if (text.trim().length) {
            dispatch(addComments({ user, text, id }))
            setText("");
        }
    }
    return (
        <div className='fullBlogText'>
            {blogs.map((blog) => {
                if (id === blog._id) {
                    return <div key={blog._id}>
                        <div><h2>{blog.title}</h2></div>
                        <div>{blog.text}</div>
                        <p><textarea onChange={(e) => handleRegul(e)} value={text} rows='10' cols='50'></textarea></p>
                        {error ? <div>Ошибка. Необходима авторизация</div> : ''}
                        <p><button className='comBtn' onClick={handleCom}>Отправить</button></p>
                        <div className='comms'><h2>Комментарии</h2></div>
                        <div>
                        </div>
                    </div>
                }
                return false;
            })}
            {comments.map((comm) => {
                if (comm.blogs === id) {
                    return <div key={comm._id} className='comCard'>
                        {users.map((us) => {
                            if (us._id === comm.user) {
                                return <div key={us._id} className='deletCard'>
                                    <div className='userName'>{us.login}</div>
                                    {user === us._id ? <div className='delet'><button onClick={() => { deleteComm(comm._id) }}>X</button></div> : ''}
                                </div>
                            }
                            return false;
                        })}
                        <div className='commText'>{comm.text}</div>
                        <div className='time'><div>{`${Number(comm.watch.slice(11,13))+3}${comm.watch.slice(13,16)} ${comm.watch.slice(0,10)}`}</div></div>
                    </div>
                }
                return null;
            })}
        </div>
    );
};

export default Fullblog;