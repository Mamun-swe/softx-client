import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { Icon } from 'react-icons-kit'
import { ic_close } from 'react-icons-kit/md'

const DeleteModal = (props) => {
    return (
        <div>
            <Modal
                show={props.show}
                onHide={props.onHide}
                size="md"
                centered
                backdrop={props.loading ? "static" : null}
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
                    <h5>Are you sure you want to delete ?</h5>
                    <button
                        type="submit"
                        className="btn shadow-none"
                        style={styles.btn}
                        disabled={props.loading}
                        onClick={props.dodelete}
                    >
                        {props.loading ? <span>Deleting...</span> : <span>Yes</span>}
                    </button>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default DeleteModal;

const styles = {
    modalBody: {
        padding: 30,
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