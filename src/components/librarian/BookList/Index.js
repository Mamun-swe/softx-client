import React from 'react';

const Index = ({ books, isedit, isdelete }) => {

    // Handle Edit 
    const handleEdit = (data) => {
        isedit(data)
    }

    // Handle Delete
    const handleDelete = (id) => {
        isdelete(id)
    }

    return (
        <div>
            <table className="table table-sm table-responsive-md table-bordered">
                <thead>
                    <tr>
                        <td style={styles.headText} className="text-center">SL</td>
                        <td style={styles.headText} className="text-center">Image</td>
                        <td style={styles.headText}>Name</td>
                        <td style={styles.headText}>Author</td>
                        <td style={styles.headText}>Genre</td>
                        <td style={styles.headText} className="text-center">Release Date</td>
                        <td style={styles.headText} className="text-center">Status</td>
                        <td style={styles.headText} className="text-center">Action</td>
                    </tr>
                </thead>
                <tbody>
                    {books && books.map((book, i) =>
                        <tr key={i}>
                            <td style={styles.bodyText} className="text-center">{i + 1}</td>
                            <td style={styles.bodyText} className="text-center">
                                <img
                                    style={styles.image}
                                    src={book.bookImage}
                                    className="img-fluid"
                                    alt="..."
                                />
                            </td>
                            <td style={styles.bodyText}>{book.bookName}</td>
                            <td style={styles.bodyText}>{book.author}</td>
                            <td style={styles.bodyText}>{book.genre}</td>
                            <td style={styles.bodyText} className="text-center">{book.releaseDate}</td>
                            <td style={styles.bodyText} className="text-center">{book.status}</td>
                            <td style={styles.bodyText} className="text-center">
                                <button
                                    type="button"
                                    className="btn shadow-none"
                                    style={styles.editBtn}
                                    onClick={() => handleEdit(book)}
                                >Edit</button>
                                <button
                                    type="button"
                                    className="btn shadow-none"
                                    style={styles.deleteBtn}
                                    onClick={() => handleDelete(book.id)}
                                >Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Index;

const styles = {
    headText: {
        fontSize: 14,
        fontWeight: 500,
        color: '#000'
    },
    bodyText: {
        fontSize: 13,
        color: '#000'
    },
    image: {
        height: 60
    },
    editBtn: {
        fontSize: 14,
        fontWeight: 500,
        padding: '3px 10px',
        marginRight: 5
    },
    deleteBtn: {
        fontSize: 14,
        fontWeight: 500,
        padding: '3px 10px',
        background: '#dc3545'
    }
}