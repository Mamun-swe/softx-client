import React, { useEffect, useState } from 'react'
import { Icon } from 'react-icons-kit'
import { ic_search } from 'react-icons-kit/md'
import { useForm } from 'react-hook-form'
import axios from 'axios'
// import { apiURL } from '../../../utils/apiURL'
import '../../../styles/student/style.scss'
import Skeleton from 'react-loading-skeleton'

import NavBar from '../../../components/student/Navbar/Index'
import testImg from '../../../assets/static/node.jpg'

const Index = () => {
    const { register, handleSubmit, errors } = useForm()
    const [isLoading, setLoading] = useState(true)
    const [books, setBooks] = useState([])
    const [filteredBooks, setFilteredBooks] = useState(books)
    const [fakeArr] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])


    useEffect(() => {
        const header = {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        }

        const fetchBooks = async () => {
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/users`, header)
                if (response.status === 200) {
                    setLoading(false)
                    setBooks(response.data)
                    setFilteredBooks(response.data)
                }
            } catch (error) {
                if (error) {
                    console.log(error);
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
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${query}`)
            if (response.status === 200) {
                setFilteredBooks([response.data])
                setLoading(false)
            }
        } catch (error) {
            if (error) {
                setLoading(false)
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
                                        {/* <img src={item.book.bookImage} className="img-fluid" alt="..." /> */}
                                        <img src={testImg} className="img-fluid" alt="..." />
                                        {/* <p>{item.book.bookName.slice(0, 15)}</p> */}
                                        <p>{item.name.slice(0, 15)}</p>
                                        <button type="button" className="btn btn-light shadow-none">View</button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Index;