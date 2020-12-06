import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import Icon from 'react-icons-kit'
import { ic_dehaze } from 'react-icons-kit/md'
import '../../styles/librarian/style.scss'
import axios from 'axios'
import { apiURL } from '../../utils/apiURL'

import SideMenu from '../../components/librarian/SideMenu/Index'
import DashboardIndex from './Dashboard/Index'
import BookIndex from './Book/Index'
import RequestIndex from './Requests/Index'

const Master = () => {
    const [show, setShow] = useState(false)
    const [user, setUser] = useState({})


    useEffect(() => {
        const header = {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        }

        // Fetch my information
        const fetchMe = async () => {
            try {
                const response = await axios.get(`${apiURL}auth/me`, header)
                setUser(response.data.result)
            } catch (error) {
                if (error) {
                    console.log(error.response)
                }
            }
        }

        fetchMe()
    }, [])

    return (
        <div className="master">
            {/* Mobile Navbar */}
            <div className="mobile-navbar d-lg-none p-3">
                <div className="d-flex">
                    <div><p>{user.name}</p></div>
                    <div className="ml-auto">
                        <button
                            type="button"
                            className="btn btn-light rounded-circle shadow-none"
                            onClick={() => setShow(true)}
                        >
                            <Icon icon={ic_dehaze} size={25} />
                        </button>
                    </div>
                </div>
            </div>
            <div className="d-flex">

                {/* Sidebar */}
                <div className="sidebar">
                    <div
                        className={show ? "backdrop open-backdrop" : "backdrop"}
                        onClick={() => setShow(false)}
                    ></div>
                    <div className={show ? "main-sidebar open-main-sidebar" : "main-sidebar"}>
                        <SideMenu user={user} />
                    </div>
                </div>

                {/* Main */}
                <div className="main flex-fill">
                    <Switch>
                        <Route exact path="/librarian/" component={DashboardIndex} />
                        <Route exact path="/librarian/books" component={BookIndex} />
                        <Route exact path="/librarian/requests" component={RequestIndex} />
                    </Switch>
                </div>
            </div>

        </div>
    );
};

export default Master;