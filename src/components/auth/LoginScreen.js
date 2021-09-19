import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const { loading } = useSelector( state => state.ui );

    const [ formValues, handleInputChange ] = useForm({
        email: '',
        password: '',
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch( startLoginEmailPassword(email, password) );
    }

    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() );
    }


    return (
        <>
            <h3 className="auth__title">Login</h3>
            <form onSubmit={ handleLogin } autoComplete="off">
                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    value={email}
                    onChange={handleInputChange}
                />
                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />

                <button 
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={handleLogin}
                    disabled={loading}
                >
                    Login
                </button>


                <div className="auth__social-network">
                    <p>Login with social network</p>

                        <div className="google-btn" onClick={ handleGoogleLogin }>
                            <p className="btn-text">
                                Sign in with Google
                            </p>
                        </div>
                </div>

                <Link to="/auth/register" className="link">Create new account </Link>

            </form>
        </>
    )
}
