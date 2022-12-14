import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/img/logo.svg'
import './index.css'

const Header = () => {
    return (
        <header className='header'>
            <div className="container">
                <div className="header__wrap">
                    <Link to={'/'}>
                        <img src={logo} width="80" height="80"/>
                    </Link>
                    
                    <ul className="header__list">
                        <li className="header__li"><NavLink to='/'>Персонажи</NavLink></li>
                        <li className="header__li"><NavLink to='/favourite'>Мое любимое</NavLink></li>
                        <li className="header__li"><NavLink to='/films'>Фильмы</NavLink></li>
                    </ul>
                </div>
            </div>
        </header>
    )
}
export default Header