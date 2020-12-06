import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Icon } from 'react-icons-kit'
import { ic_close } from 'react-icons-kit/md'
import { useForm } from 'react-hook-form'

const CreateBook = (props) => {
    const { register, handleSubmit, errors } = useForm()
    const [selectedFile, setSelectedFile] = useState(null)
    const [previewURL, setPreviewURL] = useState(null)

    // Handle Image
    const handleImage = (event) => {
        let file = event.target.files[0]
        if (file) {
            setSelectedFile(file)
            setPreviewURL(URL.createObjectURL(event.target.files[0]))
        }
    }

    const onSubmit = (data) => {

        let formData = new FormData()
        formData.append('bookName', data.bookName)
        formData.append('author', data.author)
        formData.append('genre', data.genre)
        formData.append('releaseDate', data.releaseDate)
        formData.append('status', data.status)
        formData.append('bookImage', selectedFile || props.data.bookImage)
        props.updatedata({ formData })
        setPreviewURL(null)
    }

    return (
        <div>
            <Modal
                show={props.show}
                onHide={props.onHide}
                size="md"
                centered
                backdrop="static"
            >
                {props.loading ? null :
                    <Modal.Header>
                        <button
                            type="button"
                            className="btn btn-sm rounded-circle shadow-none btn-light ml-auto"
                            onClick={props.onHide}
                            style={styles.closeBtn}
                        >
                            <Icon icon={ic_close} size={25} />
                        </button>

                    </Modal.Header>
                }
                <Modal.Body style={styles.modalBody}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Name */}
                        <div className="form-group mb-3">
                            {errors.bookName && errors.bookName.message ? (
                                <small className="text-danger">{errors.bookName && errors.bookName.message}</small>
                            ) : <small>Book name</small>
                            }

                            <input
                                type="text"
                                name="bookName"
                                style={styles.formControl}
                                className="form-control shadow-none"
                                placeholder="Enter book name"
                                defaultValue={props.data.bookName}
                                ref={register({
                                    required: "Book name is required"
                                })}
                            />
                        </div>

                        {/* Author */}
                        <div className="form-group mb-3">
                            {errors.author && errors.author.message ? (
                                <small className="text-danger">{errors.author && errors.author.message}</small>
                            ) : <small>Author</small>
                            }

                            <input
                                type="text"
                                name="author"
                                style={styles.formControl}
                                className="form-control shadow-none"
                                placeholder="Enter author name"
                                defaultValue={props.data.author}
                                ref={register({
                                    required: "Author name is required"
                                })}
                            />
                        </div>

                        {/* Genre */}
                        <div className="form-group mb-3">
                            {errors.genre && errors.genre.message ? (
                                <small className="text-danger">{errors.genre && errors.genre.message}</small>
                            ) : <small>Genre</small>
                            }

                            <input
                                type="text"
                                name="genre"
                                style={styles.formControl}
                                className="form-control shadow-none"
                                placeholder="Enter genre"
                                defaultValue={props.data.genre}
                                ref={register({
                                    required: "Genre is required"
                                })}
                            />
                        </div>

                        {/* status */}
                        <div className="form-group mb-3">
                            {errors.status && errors.status.message ? (
                                <small className="text-danger">{errors.status && errors.status.message}</small>
                            ) : <small>Status</small>
                            }

                            <select
                                name="status"
                                style={styles.formControl}
                                className="form-control shadow-none"
                                defaultValue={props.data.status}
                                ref={register({
                                    required: "Genre is required"
                                })}
                            >
                                <option value="activate">Activate</option>
                                <option value="deactivate">Deactivate</option>
                            </select>
                        </div>

                        {/* Release date */}
                        <div className="form-group mb-3">
                            {errors.releaseDate && errors.releaseDate.message ? (
                                <small className="text-danger">{errors.releaseDate && errors.releaseDate.message}</small>
                            ) : <small>Release date</small>
                            }

                            <input
                                type="date"
                                name="releaseDate"
                                style={styles.formControl}
                                className="form-control shadow-none"
                                format="yyyy-MM-dd"
                                ref={register({
                                    required: "Release date is required"
                                })}
                            />

                        </div>

                        {/* Image */}
                        <div className="form-group mb-3">
                            <small>Image</small>
                            {previewURL ?
                                <div>
                                    <img src={previewURL} style={styles.image} className="img-fluid" alt="..." />
                                </div>
                                : props.data.bookImage ?
                                    <div>
                                        <img src={props.data.bookImage} style={styles.image} className="img-fluid" alt="..." />
                                    </div>
                                    : null}
                            <br />
                            <input
                                type="file"
                                onChange={handleImage}
                            />
                        </div>


                        <div className="text-right">
                            <button
                                type="submit"
                                className="btn shadow-none"
                                style={styles.btn}
                                disabled={props.loading}
                            >
                                {props.loading ? <span>Uploading...</span> : <span>Submit</span>}
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CreateBook;


const styles = {
    modalBody: {
        paddingBottom: 40,
    },
    formControl: {
        fontSize: 14,
    },
    image: {
        height: 100
    },
    btn: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
        background: '#14b3fd',
        padding: '8px 25px'
    },
    closeBtn: {
        padding: 5
    }
}