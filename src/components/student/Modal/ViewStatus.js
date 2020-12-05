import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { Icon } from 'react-icons-kit'
import { ic_close } from 'react-icons-kit/md'

const ViewStatus = (props) => {

    const submitRequest = () => {
        props.sendAccessRequest()
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
                <Modal.Body className="text-center" style={styles.modalBody}>
                    <p>{props.message}</p>
                    <button
                        type="button"
                        style={styles.btn}
                        className="btn shadow-none"
                        onClick={submitRequest}
                        disabled={props.loading}
                    >
                        {props.loading ?
                            <span>Sending...</span> :
                            <span>Sent Access Request</span>
                        }
                    </button>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ViewStatus;


const styles = {
    modalBody: {
        paddingTop: 40,
        paddingBottom: 40,
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