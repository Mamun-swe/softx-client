import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import '../../../styles/librarian/sidemenu/style.scss'
import { Icon } from 'react-icons-kit'
import {
    ic_apps,
    ic_info_outline,
    ic_lock,
    ic_library_books
} from 'react-icons-kit/md'

import ProfileImg from '../../../assets/static/Logo.png'

const Index = () => {
    const history = useHistory()
    const [isLoading, setLoading] = useState(false)

    const doLogout = () => {
        setLoading(true)
        // history.push('/')
    }

    return (
        <div className="side-menu">

            {/* Header */}
            <div className="header">
                <div className="d-flex">
                    <div className="img-box rounded-circle">
                        <img src={ProfileImg} className="img-fluid" alt="..." />
                    </div>
                    <div className="content">
                        <p>mamun</p>
                        <small>librarian</small>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="body">
                <NavLink
                    exact
                    activeClassName="is-Active"
                    className="btn btn-block shadow-none"
                    to="/librarian/">
                    <Icon icon={ic_apps} size={20} />
                    <span>dashboard</span>
                </NavLink>
                <NavLink
                    exact
                    activeClassName="is-Active"
                    className="btn btn-block shadow-none"
                    to="/librarian/books">
                    <Icon icon={ic_library_books} size={20} />
                    <span>books</span>
                </NavLink>
                <NavLink
                    exact
                    activeClassName="is-Active"
                    className="btn btn-block shadow-none"
                    to="/librarian/requests">
                    <Icon icon={ic_info_outline} size={20} />
                    <span>pending requests</span>
                </NavLink>

                <button
                    type="button"
                    className="btn btn-block shadow-none"
                    onClick={doLogout}
                    disabled={isLoading}
                >
                    <Icon icon={ic_lock} size={18} />
                    {isLoading ? <span>Logging out...</span> : <span>logout</span>}
                </button>
            </div>

        </div>
    );
};

export default Index;