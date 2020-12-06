import React, { useState, useEffect } from 'react'
import { Icon } from 'react-icons-kit'
import { ic_add } from 'react-icons-kit/md/ic_add'
import axios from 'axios'
import { apiURL } from '../../../utils/apiURL'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import BookList from '../../../components/librarian/BookList/Index'
import CreateBookModal from '../../../components/librarian/Modal/CreateBook'
import EditBookModal from '../../../components/librarian/Modal/EditBook'
import DeleteBookModal from '../../../components/librarian/Modal/DeleteModal'

const Index = () => {
    const [show, setShow] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const [storeLoading, setStoreLoading] = useState(false)
    const [books, setBooks] = useState([])
    const [deleteShow, setDeleteShow] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false)
    const [bookId, setBookId] = useState({})

    const [editShow, setEditShow] = useState(false)
    const [editLoading, setEditLoading] = useState(false)
    const [editData, setEditData] = useState()

    const [serverMsg, setServerMsg] = useState()


    const header = {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    }

    useEffect(() => {
        fetchBooks()
    }, [])

    // Fetch Books
    const fetchBooks = async () => {
        try {
            const response = await axios.get(`${apiURL}librarian/book/index`, header)
            if (response.status === 200) {
                setBooks(response.data.results)
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

    // Store Books
    const storeBook = async (data) => {
        try {
            setStoreLoading(true)
            const response = await axios.post(`${apiURL}librarian/book/store`, data.formData, header)
            if (response.status === 201) {
                fetchBooks()
                toast.success(response.data.message)
                setStoreLoading(false)
                setShow(false)
            }
        } catch (error) {
            if (error) {
                setStoreLoading(false)
                console.log(error.response)
            }
        }
    }

    // Handle Edit 
    const handleEdit = (data) => {
        setEditData(data)
        setEditShow(true)
    }

    // Submit Update
    const submitUpdate = async (data) => {
        try {
            setEditLoading(true)
            const response = await axios.put(`${apiURL}librarian/book/${editData.id}/update`, data.formData, header)
            if (response.status === 200) {
                fetchBooks()
                toast.success(response.data.message)
                setEditLoading(false)
                setEditShow(false)
            }
        } catch (error) {
            if (error) {
                console.log(error.response)
            }
        }
    }

    // Handle Delete
    const handleDelete = (id) => {
        setBookId(id)
        setDeleteShow(true)
    }

    // Submit Delete 
    const submitDelete = async () => {
        try {
            setLoadingDelete(true)
            const response = await axios.delete(`${apiURL}librarian/book/${bookId}/delete`, header)
            if (response.status === 200) {
                fetchBooks()
                toast.success(response.data.message)
                setLoadingDelete(false)
                setDeleteShow(false)
            }
        } catch (error) {
            if (error) {
                setLoadingDelete(false)
                setDeleteShow(false)
                console.log(error.response)
            }
        }
    }


    return (
        <div className="index">
            <div className="container-fluid p-0 py-2 py-lg-0">
                <div className="col-12 pl-lg-0 mb-3">
                    <div className="card border-0 shadow">
                        <div className="card-body p-3">
                            <div className="d-flex">
                                <div><h5>All Books</h5></div>
                                <div className="ml-auto">
                                    <button
                                        type="button"
                                        className="btn shadow-none"
                                        onClick={() => setShow(true)}
                                    >
                                        <Icon icon={ic_add} size={22} />
                                    </button>
                                </div>
                            </div>
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

                {/* Book List */}
                {books && books.length > 0 ?
                    <div className="col-12 pl-lg-0 mb-3">
                        <div className="card border-0 shadow">
                            <div className="card-body">
                                <BookList
                                    books={books}
                                    isdelete={handleDelete}
                                    isedit={handleEdit}
                                />
                            </div>
                        </div>
                    </div>
                    : null}

            </div>

            {/* Add Modal */}
            <CreateBookModal
                show={show}
                bookdata={storeBook}
                loading={storeLoading}
                onHide={() => setShow(false)}
            />

            {/* Edit Modal */}
            {editShow ?
                <EditBookModal
                    show={editShow}
                    data={editData}
                    updatedata={submitUpdate}
                    loading={editLoading}
                    onHide={() => setEditShow(false)}
                />
                : null}

            {/* Delete Modal */}
            {deleteShow ?
                <DeleteBookModal
                    show={deleteShow}
                    dodelete={submitDelete}
                    loading={loadingDelete}
                    onHide={() => setDeleteShow(false)}
                />
                : null}

        </div>
    );
};

export default Index;