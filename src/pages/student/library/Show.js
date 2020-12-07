import React, { useState, useRef, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import NavBar from '../../../components/student/Navbar/Index'
import axios from 'axios'
import { apiURL } from '../../../utils/apiURL'
import { useHistory, useParams } from 'react-router-dom'

const Show = () => {
    const contentBox = useRef()
    const { id } = useParams()
    const history = useHistory()
    const [isLoading, setLoading] = useState(true)
    const [book, setBook] = useState()

    useEffect(() => {
        const header = {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        }

        // View Book
        const ViewBook = async () => {
            try {
                const response = await axios.get(`${apiURL}student/request/${id}/view`, header)
                if (response.status === 200) {
                    setBook(response.data.response)
                    setLoading(false)
                }
            } catch (error) {
                if (error) {
                    history.push('/student/library')
                }
            }
        }

        ViewBook()
    }, [id])

    if (isLoading) {
        return (
            <div>
                <NavBar />
                <div className="container py-3 py-lg-5">
                    <div className="row">
                        <div className="col-12 col-lg-5 text-center">
                            <Skeleton animation={true} count={1} width={250} height={350} />
                        </div>

                        <div className="col-12 col-lg-7 py-3 py-lg-0" ref={contentBox}>
                            <Skeleton animation={true} count={1} width={contentBox.width} height={30} />

                            <div className="pt-3">
                                <Skeleton animation={true} count={1} width={contentBox.width} height={20} />
                                <br />
                                <Skeleton animation={true} count={1} width={contentBox.width} height={20} />
                                <br />
                                <Skeleton animation={true} count={1} width={contentBox.width} height={20} />
                                <br />
                                <Skeleton animation={true} count={1} width={contentBox.width} height={20} />
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="show-book">
            <NavBar />

            <div className="container py-3 py-lg-5">
                <div className="row">
                    <div className="col-12 col-lg-5 text-center">
                        <img src={book.bookImage} style={styles.image} className="img-fluid" alt="..." />
                    </div>

                    <div className="col-12 col-lg-7 py-3 py-lg-0">
                        <h4>gggggg</h4>
                        <p style={styles.text}>{book.bookName}</p>
                        <p style={styles.text}>Author: {book.author}</p>
                        <p style={styles.text}>Genre: {book.genre}</p>
                        <p style={styles.text}>Release date: {book.releaseDate}</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Show;

const styles = {
    text: {
        fontSize: 15,
        marginBottom: 5
    },
    image: {
        width: 250,
        height: 350
    }
}