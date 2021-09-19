import React, { useEffect, useState } from 'react';
import { firebase } from '../firebase/firebase-config'

import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';

import { AppContainer } from '../components/principal/AppContainer';

import { AuthRouter } from './AuthRouter';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { Loading } from '../components/loading/Loading';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';


export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setCheking] = useState(true);

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        firebase.auth().onAuthStateChanged( (user) => {
            if ( user?.uid ) {
                dispatch( login(user.uid, user.displayName) );
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
            setCheking(false);
        })
    }, [dispatch, setCheking, setIsLoggedIn]);

    if (checking) {
        return (
            <Loading />
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute path="/auth" component={ AuthRouter } isAuthtenticated={isLoggedIn}/>
                    <PrivateRoute exact path="/" component={ AppContainer } isAuthenticated={isLoggedIn}/>
                    <Redirect to="/auth/login"/>
                </Switch>
            </div>
        </Router>
    )
}
