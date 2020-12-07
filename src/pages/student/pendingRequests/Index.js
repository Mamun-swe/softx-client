import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { apiURL } from '../../../utils/apiURL'
import '../../../styles/student/style.scss'
import Skeleton from 'react-loading-skeleton'

import NavBar from '../../../components/student/Navbar/Index'

const Index = () => {
    const [isLoading, setLoading] = useState(true)
    const [books, setBooks] = useState([])
    const [fakeArr] = useState([1, 2, 3, 4, 5, 6, 7, 8])

    useEffect(() => {
        const header = {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        }

        const fetchPendingRequests = async () => {
            try {
                const response = await axios.get(`${apiURL}student/request/pending`, header)
                if (response.status === 200) {
                    setLoading(false)
                    setBooks(response.data.requests)
                }
            } catch (error) {
                if (error) {
                    setLoading(false)
                }
            }
        }

        fetchPendingRequests()
    }, [])

    // Check Loading
    if (isLoading) {
        return (
            <div>
                <NavBar />
                <div className="container py-3">
                    <div className="row">
                        <div className="col-12">
                            {fakeArr.map((i) =>
                                <div className="card rounded-0 border-0 book-card" key={i}>
                                    <div className="card-body text-center">
                                        <Skeleton animation={true} count={1} width={100} height={120} />
                                        <br />
                                        <Skeleton animation={true} count={1} width={100} height={20} />
                                        <br />
                                        <Skeleton animation={true} count={1} width={80} height={27} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <NavBar />

            <div className="container py-3">
                <div className="row">
                    <div className="col-12">

                        {books && books.length > 0 ? books.map((item, i) =>
                            <div className="card rounded-0 border-0 book-card" key={i}>
                                <div className="card-body text-center">
                                    <img src={item.book.bookImage} className="img-fluid" alt="..." />
                                    <p>{item.book.bookName.slice(0, 15)}</p>
                                    <button type="button" className="btn btn-light shadow-none" disabled>Pending</button>
                                </div>
                            </div>
                        ) :
                            <div className="text-center py-5">
                                <h5>No request found.</h5>
                            </div>
                        }

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Index;