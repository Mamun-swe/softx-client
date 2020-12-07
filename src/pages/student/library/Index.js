import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { apiURL } from '../../../utils/apiURL'
import '../../../styles/student/style.scss'
import Skeleton from 'react-loading-skeleton'

import NavBar from '../../../components/student/Navbar/Index'
import ViewStatusModal from '../../../components/student/Modal/ViewStatus'

const Index = () => {
    const history = useHistory()
    const [show, setShow] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const [requestLoading, setRequestLoading] = useState(false)
    const [books, setBooks] = useState([])
    const [fakeArr] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    const [bookId, setBookId] = useState({})
    const [message, setMessage] = useState({})


    const header = {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    }

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`${apiURL}student/request/approved`, header)
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

        fetchBooks()
    }, [])

    // View Book
    const ViewBook = async (id) => {
        try {
            setBookId(id)
            const response = await axios.get(`${apiURL}student/request/${id}/view`, header)
            if (response.status === 200) {
                history.push(`/student/book/${id}/show`)
            }
        } catch (error) {
            if (error) {
                setMessage(error.response.data.message)
                setShow(true)
            }
        }
    }

    // Sent Access Request
    const sendAccessRequest = async () => {
        const data = {
            bookId: bookId
        }
        try {
            setRequestLoading(true)
            const response = await axios.post(`${apiURL}student/request/book`, data, header)

            if (response.status === 200) {
                setRequestLoading(false)
            }
            if (response.status === 209) {
                setRequestLoading(false)
                setMessage(response.data.message)
            }
        } catch (error) {
            if (error) {
                console.log(error)
            }
        }
    }

    if (isLoading) {
        return (
            <div>
                <NavBar />
                <div className="container py-3">
                    <div className="row">
                        <div className="col-12">
                            {fakeArr.map((i) =>
                                <div className="card rounded-0 border-0 book-card" key={i}>
                                    <div className="card-body text-center border">
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
                                    <button
                                        type="button"
                                        className="btn btn-light shadow-none"
                                        onClick={() => ViewBook(item.book.id)}
                                    >View</button>
                                </div>
                            </div>
                        ) :
                            <div className="text-center py-5">
                                <h5>Opps ! No books found in your library.</h5>
                            </div>
                        }

                    </div>
                </div>
            </div>

            {/* Status Modal */}
            {show ?
                <ViewStatusModal
                    show={show}
                    message={message}
                    loading={requestLoading}
                    sendAccessRequest={sendAccessRequest}
                    onHide={() => setShow(false)}
                />
                : null}

        </div>
    );
};

export default Index;