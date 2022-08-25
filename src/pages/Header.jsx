import React, { useEffect } from 'react';
import head from '../styles/header.module.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { fetchCats } from '../features/catSlice';

const Header = () => {
    const dispatch = useDispatch()
    const cats = useSelector(state => state.cats.categories)

    const token = useSelector(state => state.application.token)

    useEffect(() => {
        dispatch(fetchCats());
    }, [dispatch]);

    const handleOut = () => {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <div className={head.mainHead}>
            <div className={head.leftName}>
                <Link className={head.lin} to='/'><p>NewsWorld</p></Link>
            </div>
            <div className={head.rightList}>
                <ul>
                    {cats.map((cat) => {
                        return <li key={cat._id}><div className={head.nav}><Link className={head.lin} to={`/category/${cat._id}`}>{cat.name}</Link></div></li>
                    })}
                </ul>
            </div>
            <div className={head.rightList}>
                {token ? <div onClick={() => handleOut()}><Link className={head.lin} to='/login'>Выход</Link></div> : <>
                    <div><Link className={head.lin} to='/login'>Вход</Link></div>
                    <div className={head.prost}><Link className={head.lin} to='/auth'>Регистрация</Link></div>
                </>
                }
            </div>
        </div>
    );
};

export default Header;