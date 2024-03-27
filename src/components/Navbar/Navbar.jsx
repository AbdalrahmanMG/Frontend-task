import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { authContext } from './../../context/AuthContext';

export default function Navbar() {
    const { token, logout } = useContext(authContext)

    return (
        <div className="navbar sticky top-0 start-0 left-0 z-50  shadow-zinc-100 shadow-lg bg-zinc-50 px-6 py-3">
            <div className="m-auto lg:flex gap-2">
                <ul className=" flex flex-col sm:flex-row gap-2">
                    <li ><Link className='btn btn-outline ' to={'/dashboard'}>Dashboards</Link></li>
                    <li ><Link className='btn btn-outline ' to="/">Login </Link></li>
                    {token ?
                        <li className='btn btn-outline'><Link onClick={logout} to="/">Logout </Link></li>
                        : <></>
                    }
                </ul>
            </div>
        </div>
    )
}
