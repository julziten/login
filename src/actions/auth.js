import { types } from '../types/types';
import { firebase, googleAuthProvider } from '../firebase/firebase-config'
import { finishLoading, startLoading } from './ui';

import Swal from 'sweetalert2'

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch( startLoading() );

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(({user}) => {
            dispatch(
                login( user.uid, user.displayName )
            );
            dispatch( finishLoading() );
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: 'Signed in successfully'
              })
        })
        .catch( error => {
            console.log(error);
            dispatch( finishLoading() );
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonColor: '#EDB5BF',
                confirmButtonText: 'Ok, try again!',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'btn btn-primary btn-block'
                }
              })
        })
    }
}

export const startRegisterWithCredentials = ( email, password, name ) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async({ user }) => {
                await user.updateProfile({displayName: name})
                console.log(user);
                dispatch(
                    login(user.uid, user.displayName)
                )
            })
            .catch( error => { 
                console.log(error.message);
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonColor: '#EDB5BF',
                    confirmButtonText: 'Ok, try again!',
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'btn btn-primary btn-block'
                    }
                  })
            })
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then( ({ user }) => {
                dispatch(
                    login(user.uid, user.displayName)
                )
            });
    }
}

export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}

export const startLogOut = () => {
    return async(dispatch) => {
        await firebase.auth().signOut();

        dispatch( logOut() );
    }
}

export const logOut = () => {
    return {
        type: types.logout
    }
}