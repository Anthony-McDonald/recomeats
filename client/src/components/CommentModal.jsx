import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../css/edit-info-modal.css';

const CommentModal = ({ commentBodyResult, registerComment }) => {
    const [inputs, setInputs] = useState({
        commentBody: ''
    });

    const { commentBody } = inputs;

    useEffect(() => {
        setInputs({
            commentBody: commentBodyResult
        });
    }, [commentBodyResult]);

    const closePress = () => {
        setTimeout(() => {
            setInputs({
                commentBody: commentBodyResult
            });
        }, 1000);
    };

    const onChange = (e) => {
        const updatedInputs = { ...inputs, [e.target.id]: e.target.value };
        setInputs(updatedInputs);
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        registerComment(commentBody);
    };

    return (
        <>
            <button type="button" className="header-button btn btn-primary log-button" data-bs-toggle="modal" data-bs-target="#Modal">
                Add a comment
            </button>

            <div className="modal fade modal-cover" id="Modal" tabIndex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ModalLabel">Add your comment</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={onSubmitForm}>
                                <div className="mb-3">
                                    <label htmlFor="commentBody" className="form-label">Comment</label>
                                    <input
                                        value={commentBody}
                                        onChange={onChange}
                                        type="text"
                                        className="form-control"
                                        id="commentBody"  // Updated id to match the state property
                                        aria-describedby="commentHelp"
                                    />
                                </div>
                                <div className="submit-register">
                                    <button data-bs-dismiss="modal" type="submit" className="header-button btn btn-primary">Submit Changes</button>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button onClick={() => closePress()} type="button" id="closeBtn" className="header-button btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CommentModal;
