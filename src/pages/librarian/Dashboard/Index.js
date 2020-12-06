import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { apiURL } from '../../../utils/apiURL'

const Index = () => {
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState({})


    useEffect(() => {
        const header = {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        }

        // Fetch data
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiURL}librarian/dashboard`, header)
                if (response.status === 200) {
                    setLoading(false)
                    setData(response.data)
                }
            } catch (error) {
                if (error) {
                    console.log(error)
                }
            }
        }

        fetchData()
    }, [])


    if (isLoading) {
        return (
            <div className="py-4">
                <h6>Loading...</h6>
            </div>
        )
    }

    return (
        <div>
            <div className="container-fluid py-4 py-lg-0">
                <div className="row">

                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                        <div className="card border-0 shadow" style={styles.card}>
                            <div className="flex-center flex-column">
                                <h5 className="mb-0">{data.books}</h5>
                                <p className="mb-0">Books</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                        <div className="card border-0 shadow" style={styles.card}>
                            <div className="flex-center flex-column">
                                <h5 className="mb-0">{data.students}</h5>
                                <p className="mb-0">Students</p>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Index;


const styles = {
    card: {
        height: 150
    }
}