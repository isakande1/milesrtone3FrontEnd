import React from 'react';
import { Link } from 'react-router-dom';


export default function Navbar() {
    return (
        <div className='navbar'>
            <div className='storename'> <h1>MovieStore</h1></div>
            <div className='menuOption'>
                <ul className='menu'>
                    <li> <Link to='/'> Landinpage </Link></li>
                    <li> <Link to='/filmspage'> Filmpage </Link> </li>
                    <li> <Link to='./customerpage'>Customerspage </Link> </li>
                </ul>
            </div>
        </div>

    );
}