import React, { useEffect, useState } from 'react'
import { Icon } from 'react-icons-kit'
import { ic_search } from 'react-icons-kit/md'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { apiURL } from '../../../utils/apiURL'
import '../../../styles/student/style.scss'
import Skeleton from 'react-loading-skeleton'
import { useHistory } from 'react-router-dom'

import NavBar from '../../../components/student/Navbar/Index'
import ViewStatusModal from '../../../components/student/Modal/ViewStatus'

const Index = () => {
    const history = useHistory()
    const { register, handleSubmit, errors } = useForm()
    const [isLoading, setLoading] = useState(true)
    const [show, setShow] = useState(false)
    const [bookId, setBookId] = useState({})
    const [message, setMessage] = useState({})
    const [books, setBooks] = useState([])
    const [filteredBooks, setFilteredBooks] = useState(books)
    const [fakeArr] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    const [requestLoading, setRequestLoading] = useState(false)

    const header = {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    }


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`${apiURL}student/request/book`, header)
                if (response.status === 200) {
                    setLoading(false)
                    setBooks(response.data.results)
                    setFilteredBooks(response.data.results)
                }
            } catch (error) {
                if (error) {
                    console.log(error)
                }
            }
        }

        fetchBooks()
    }, [])

    // Submit Search
    const onSubmit = async (data) => {
        const query = data.query
        try {
            setLoading(true)
            const response = await axios.get(`${apiURL}student/request/book/search/${query}`)
            if (response.status === 200) {
                setFilteredBooks(response.data)
                setLoading(false)
                console.log(response.data)
            }
        } catch (error) {
            if (error) {
                setLoading(false)
                console.log(error)
            }
        }
    }

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
        <div className="home">
            <NavBar />

            {/* Header */}
            <div className="header">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h4>Welcome to SoftX library</h4>
                            <p>Search book by name</p>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="query"
                                        className={errors.query ? "form-control shadow-none danger-border" : "form-control shadow-none"}
                                        placeholder={"Type book name"}
                                        ref={register({ required: true })}
                                    />
                                    <Icon icon={ic_search} className={errors.query ? "icon danger-icon" : "icon"} size={25} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="content-body">
                <div className="container py-3">
                    <div className="row">
                        <div className="col-12">

                            {filteredBooks && filteredBooks.length > 0 && filteredBooks.map((item, i) =>
                                <div className="card rounded-0 border-0 book-card" key={i}>
                                    <div className="card-body text-center">
                                        <img src={item.bookImage} className="img-fluid" alt="..." />
                                        <p>{item.bookName.slice(0, 15)}</p>
                                        <button
                                            type="button"
                                            className="btn btn-light shadow-none"
                                            onClick={() => ViewBook(item.id)}
                                        >View</button>
                                    </div>
                                </div>
                            )}

                        </div>
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