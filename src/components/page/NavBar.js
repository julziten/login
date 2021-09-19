import React from 'react'

export const NavBar = () => {
    return (
        <div className="navbar__container">
            <span>{ Date() }</span>
            <div>
                <button className="btn">
                    Home
                </button>
                <button className="btn">
                    Save
                </button>
            </div>
        </div>
    )
}
