import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLogOut } from '../../actions/auth';

export const Sidebar = () => {

    const dispatch = useDispatch();

    const { name } = useSelector( state => state.auth );

    const handleLogOut = () => {
        dispatch( startLogOut() )
    }
    return (
        <aside className="app__sidebar">
            <div className="app__sidebar-navbar">
                <h3>
                    <i className="far fa-user"></i>
                    <span> Welcome {name}</span>
                </h3>
                <button className="btn" onClick={handleLogOut}>
                    Log Out
                </button>
            </div>
        </aside>
    )
}
