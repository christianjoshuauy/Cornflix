import './NavBar.scss'
import React from 'react'
import NetflixLogo from '../../imgs/Cornflix.png'
import PROFILE_PIC from '../../imgs/profile.png'
import Profile2 from '../../imgs/profile2.png'
import Profile3 from '../../imgs/profile3.png'
import Profile4 from '../../imgs/profile4.png'
import { FaRegBell, FaCaretDown } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { useState, useRef } from 'react'
import Searchbar from '../Searchbar/Searchbar'
import useViewport from '../../hooks/useViewport'
import useScroll from '../../hooks/useScroll'

export default function NavBar() {
    const { width } = useViewport()
    const isScrolled = useScroll(70)
    const [profileNav, setProfileNav] = useState(false)
    const [genresNav, setGenresNav] = useState(false)
    const [delay, setDelay] = useState(null)
    const profileNavRef = useRef()
    const genresNavRef = useRef()

    async function handleMouseLeave() {
        setDelay(setTimeout(() => {
            setProfileNav(!profileNav)
        }, 300))
    }

    function handleMouseEnter() {
        clearTimeout(delay)
        setProfileNav(true)
    }
  return (
    <nav className={`Navbar ${isScrolled && `Navbar__fixed`}`}>
        <NavLink to="/browse">
            <img src={NetflixLogo} alt="NETFLIX" className='Navbar__logo' />
        </NavLink>
        {width >= 1024 ? (
            <ul className="Navbar__primarynav Navbar__navlinks">
                <li className="Navbar__navlinks--link">
                    <NavLink to="/browse" activeClassName="activeNavLink">
                        Home
                    </NavLink>
                </li>
                <li className="Navbar__navlinks--link">
                    <NavLink to="/browse/series" activeClassName="activeNavLink">
                        TV Series
                    </NavLink>
                </li>
                <li className="Navbar__navlinks--link">
                    <NavLink to="/browse/movies" activeClassName="activeNavLink">
                        Movies
                    </NavLink>
                </li>
                <li className="Navbar__navlinks--link">
                    <NavLink to="/browse/latest" activeClassName="activeNavLink">
                        New & Popular
                    </NavLink>
                </li>
                <li className="Navbar__navlinks--link">
                    <NavLink to="/my-list" activeClassName="activeNavLink">
                        My List
                    </NavLink>
                </li>
            </ul>
        ) : (
            <div 
                className={`Navbar__primarynav Navbar__navlinks ${isScrolled && `Navbar__primarynav--scrolled`}`}
                onClick={() => setGenresNav(!genresNav)}
            >
                <span className='Navbar__navlinks--link'>Browse</span>
                <FaCaretDown className='Navbar__primarynav--toggler Navbar__primarynav--caret' />
                <div className={`Navbar__primarynav--content ${genresNav ? 'active': ''}`}>
                    {genresNav && (
                        <ul
                            className='Navbar__primarynav--content-wrp'
                            ref={genresNavRef}
                        >
                            <li className="Navbar__navlinks--link">
                                <NavLink to="/browse" activeClassName="activeNavLink">
                                    Home
                                </NavLink>
                            </li>
                            <li className="Navbar__navlinks--link">
                                <NavLink to="/browse/series" activeClassName="activeNavLink">
                                    TV Series
                                </NavLink>
                            </li>
                            <li className="Navbar__navlinks--link">
                                <NavLink to="/browse/movies" activeClassName="activeNavLink">
                                    Movies
                                </NavLink>
                            </li>
                            <li className="Navbar__navlinks--link">
                                <NavLink to="/browse/latest" activeClassName="activeNavLink">
                                    New & Popular
                                </NavLink>
                            </li>
                            <li className="Navbar__navlinks--link">
                                <NavLink to="/my-list" activeClassName="activeNavLink">
                                    My List
                                </NavLink>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        )}
        <div className="Navbar__secondarynav">
            <Searchbar />
            <FaRegBell size="1.5em" />
            <div className="Navbar__navitem">
                <div
                    className={`Navbar__navprofile ${profileNav && "active"}`}
                    onMouseEnter={() => setProfileNav(!profileNav)}
                    onMouseLeave={() => setProfileNav(handleMouseLeave)}
                >
                    <img
                        className="Navbar__navprofile--avatar Navbar__navprofile--toggler"
                        src={PROFILE_PIC}
                        alt="Profile Avatar"
                    />
                    <FaCaretDown className="Navbar__navprofile--toggler Navbar__navprofile--caret" />
                    <div className={`Navbar__navprofile--content ${profileNav ? "active" : ""}`} 
                         onMouseEnter={() => setProfileNav(handleMouseEnter)}
                         onMouseLeave={() => setProfileNav(handleMouseLeave)}>
                        {profileNav && (
                            <ul
                                className="Navbar__navprofile--content-wrp"
                                ref={profileNavRef}
                            >
                                {(
                                    <>
                                        <li className="Navbar__navlinks--profile">
                                            <img src={Profile2} alt="Profile2" />
                                            <span>Max</span>
                                        </li>
                                        <li className="Navbar__navlinks--profile">
                                            <img src={Profile3} alt="Profile3" />
                                            <span>Dustin</span>
                                        </li>
                                        <li className="Navbar__navlinks--profile">
                                            <img src={Profile4} alt="Profile4" />
                                            <span>Steve</span>
                                        </li>
                                        <li></li>
                                        <li className="Navbar__navlinks--link">
                                            Sign Out
                                        </li>
                                    </>
                                )}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </nav>
  )
}
