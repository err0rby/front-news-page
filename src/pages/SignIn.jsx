import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSignIn } from '../features/applicationSlice';
import styles from '../styles/signin.module.css'

const SignIn = () => {
    const error = useSelector(state => state.application.error)
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleSetName = (e) => {
        setLogin(e.target.value);
    }

    const handleSetPass = (e) => {
        setPassword(e.target.value);
    }

    const handleSignIn = (e) => {
        e.preventDefault();
        dispatch(authSignIn({ login, password }));
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <form className={styles.form} onSubmit={handleSignIn}>
            <h1>Вход</h1>
            <input
                type='text'
                value={login}
                placeholder='name'
                onChange={handleSetName}
            />
            <br />
            <input
                type='password'
                value={password}
                placeholder='password'
                onChange={handleSetPass}
            />
            <br />
            <button type="submit">login</button>
        </form>
    );
};

export default SignIn;