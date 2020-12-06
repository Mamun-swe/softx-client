import React from 'react'

const Index = ({ requests, status, loading }) => {

    // Submit Status
    const submitStatus = (data) => {
        status(data)
    }

    return (
        <div>
            <table className="table table-sm table-responsive-md table-bordered">
                <thead>
                    <tr>
                        <td style={styles.headText} className="text-center">SL</td>
                        <td style={styles.headText} className="text-center">Image</td>
                        <td style={styles.headText}>Book Name</td>
                        <td style={styles.headText}>Student Name</td>
                        <td style={styles.headText} className="text-center">Status</td>
                        <td style={styles.headText} className="text-center">Action</td>
                    </tr>
                </thead>
                <tbody>
                    {requests && requests.map((request, i) =>
                        <tr key={i}>
                            <td style={styles.bodyText} className="text-center">{i + 1}</td>
                            <td style={styles.bodyText} className="text-center">
                                <img src={request.bookImage} style={styles.image} className="img-fluid" alt="..." />
                            </td>
                            <td style={styles.bodyText}>{request.bookName}</td>
                            <td style={styles.bodyText}>{request.studentName}</td>
                            <td style={styles.bodyText} className="text-center">
                                {request.status === true ?
                                    <p className="text-success">Approved</p>
                                    : <p className="text-danger">Pending</p>
                                }
                            </td>
                            <td style={styles.bodyText} className="text-center">
                                {request.status === false ?
                                    <button
                                        type="button"
                                        className="btn shadow-none"
                                        style={styles.approveBtn}
                                        onClick={() => submitStatus({ id: request.requestId, status: true })}
                                        disabled={loading === request.requestId}
                                    >
                                        {loading && loading === request.requestId ? <span>Loading...</span> : <span>Approve</span>}
                                    </button>
                                    :
                                    <button
                                        type="button"
                                        className="btn shadow-none"
                                        style={styles.cancelBtn}
                                        onClick={() => submitStatus({ id: request.requestId, status: false })}
                                    >Cancel</button>
                                }
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Index;

const styles = {
    headText: {
        fontSize: 14,
        fontWeight: 500,
        color: '#000'
    },
    bodyText: {
        fontSize: 13,
        color: '#000',
        textTransform: 'capitalize'
    },
    image: {
        height: 60
    },
    approveBtn: {
        fontSize: 14,
        fontWeight: 500,
        padding: '3px 10px',
        marginRight: 5
    },
    cancelBtn: {
        fontSize: 14,
        fontWeight: 500,
        padding: '3px 10px',
        marginRight: 5,
        background: 'brown'
    }
}