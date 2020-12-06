import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { apiURL } from '../../../utils/apiURL'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import RequestList from '../../../components/librarian/RequestList/Index'

const Index = () => {
    const [isLoading, setLoading] = useState(true)
    const [updateLoading, setUpdateLoading] = useState(null)
    const [serverMsg, setServerMsg] = useState()
    const [requests, setRequests] = useState([])

    const header = {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    }

    useEffect(() => {
        fetchRequests()
    }, [])

    // Fetch Requests
    const fetchRequests = async () => {
        try {
            const response = await axios.get(`${apiURL}librarian/request/index`, header)
            if (response.status === 200) {
                setRequests(response.data.requests)
                setLoading(false)
                setServerMsg(null)
            }
        } catch (error) {
            if (error) {
                setLoading(false)
                setServerMsg(error.response.data.message)
                console.log(error.response)
            }
        }
    }

    // Update status
    const updateStatus = async (data) => {
        try {
            setUpdateLoading(data.id)
            const response = await axios.post(`${apiURL}librarian/request/status/update`, data, header)
            if (response.status === 200) {
                fetchRequests()
                setUpdateLoading(null)
                toast.success(response.data.message)
            }
        } catch (error) {
            if (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className="index">
            <div className="container-fluid p-0 py-2 py-lg-0">
                <div className="col-12 pl-lg-0 mb-3">
                    <div className="card border-0 shadow">
                        <div className="card-body p-3">
                            <h5>All Requests</h5>
                        </div>
                    </div>
                </div>

                {isLoading ?
                    <div className="col-12 pl-lg-0 mb-3">
                        <div className="card border-0 shadow">
                            <div className="card-body">
                                <p>Loading...</p>
                            </div>
                        </div>
                    </div>
                    : null}

                {serverMsg ?
                    <div className="col-12 pl-lg-0 mb-3 text-center">
                        <div className="card border-0 shadow">
                            <div className="card-body">
                                <h6>{serverMsg}</h6>
                            </div>
                        </div>
                    </div>
                    : null}

                {/* Requests List */}
                {requests && requests.length > 0 ?
                    <div className="col-12 pl-lg-0 mb-3">
                        <div className="card border-0 shadow">
                            <div className="card-body">
                                <RequestList status={updateStatus} loading={updateLoading} requests={requests} />
                            </div>
                        </div>
                    </div>
                    : null}

            </div>
        </div>
    );
}

export default Index;