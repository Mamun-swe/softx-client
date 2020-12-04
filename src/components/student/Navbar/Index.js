import React, { useEffect, useState } from 'react'
import '../../../styles/student/navbar/style.scss'
import { Icon } from 'react-icons-kit'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { ic_dehaze, ic_keyboard_arrow_right } from 'react-icons-kit/md'
import axios from 'axios'
import { apiURL } from '../../../utils/apiURL'

import Logo from '../../../assets/static/Logo.png'

const Index = () => {
    const history = useHistory()
    const [isLoading, setLoading] = useState(false)
    const [isOpen, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(true)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            let isTop = window.scrollY < 150
            if (isTop !== true) {
                setScrolled(false);
            } else {
                setScrolled(true);
            }
        })
    }, [])

    // Header
    const header = {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    }

    // Logout
    const doLogout = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${apiURL}auth/logout`, header)
            if (response.status === 200) {
                setLoading(false)
                localStorage.clear()
                history.push('/')
            }
        } catch (error) {
            if (error) {
                setLoading(false)
                localStorage.clear()
                history.push('/')
            }
        }
    }


    return (
        <div>
            <div className={scrolled ? "custom-navbar border-bottom" : "custom-navbar scrolled shadow"}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex">
                                <div>
                                    <Link to="/">
                                        <img src={Logo} className="img-fluid" alt="..." />
                                    </Link>
                                </div>

                                {/* Desktop Menu Items */}
                                <div className="page-links d-none d-lg-block px-2 ml-auto">
                                    <ul>
                                        <li><NavLink exact activeClassName="is-Active" to="/student/">home</NavLink></li>
                                        <li><NavLink exact activeClassName="is-Active" to="/student/pending-requests">pending requests</NavLink></li>
                                        <li><NavLink exact activeClassName="is-Active" to="/student/library">library</NavLink></li>
                                        <li>
                                            <button type="button" className="btn shadow-none" onClick={doLogout} disabled={isLoading}>
                                                {isLoading ? <span>logging out...</span> : <span>logout</span>}
                                            </button>
                                        </li>
                                    </ul>
                                </div>

                                {/* Bar Button */}
                                <div className="d-lg-none ml-auto">
                                    <button
                                        type="button"
                                        className="btn rounded-circle shadow-none p-1 bar-btn"
                                        onClick={() => setOpen(true)}>
                                        <Icon icon={ic_dehaze} size={25} />
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            {/* Mobile Menu Items */}
            <div
                className={isOpen ? "backdrop d-lg-none show-backdrop" : "backdrop d-lg-none"}
                onClick={() => setOpen(!isOpen)}>
            </div>
            <div className={isOpen ? "mobile-menu d-lg-none open-mobile-menu" : "mobile-menu d-lg-none hide-mobile-menu"}>
                {/* Menu Body */}
                <div className="menu-body p-3">
                    <ul>
                        <li><NavLink exact activeClassName="is-Active" to="/student/">home<Icon icon={ic_keyboard_arrow_right} className="float-right" size={20} /></NavLink></li>
                        <li><NavLink exact activeClassName="is-Active" to="/student/pending-requests">pending requests<Icon icon={ic_keyboard_arrow_right} className="float-right" size={20} /></NavLink></li>
                        <li><NavLink exact activeClassName="is-Active" to="/student/library">library<Icon icon={ic_keyboard_arrow_right} className="float-right" size={20} /></NavLink></li>
                        <li>
                            <button type="button" className="btn shadow-none" onClick={doLogout} disabled={isLoading}>
                                {isLoading ? <span>logging out...<Icon icon={ic_keyboard_arrow_right} className="float-right" size={20} /></span> : <span>logout<Icon icon={ic_keyboard_arrow_right} className="float-right" size={20} /></span>}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default Index;