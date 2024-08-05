import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../css/edit-info-modal.css';

const CommentModal = ({ parent_id, type, commentBodyResult, registerComment, modalId, postReply }) => {
    // As typed, this updates
    const [inputs, setInputs] = useState({
        commentBody: commentBodyResult || ''
    });

    const { commentBody } = inputs;

    useEffect(() => {
        setInputs({
            commentBody: commentBodyResult || '' 
        });
    }, [commentBodyResult]);

    // When modal is closed, reset values
    const closePress = () => {
        setTimeout(() => {
            setInputs({
                commentBody: commentBodyResult || '' 
            });
        }, 1000);
    };

    const onChange = (e) => {
        const updatedInputs = { ...inputs, [e.target.id]: e.target.value };
        setInputs(updatedInputs);
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        if (type === "post") {
            registerComment(commentBody);
        } else {
            postReply(parent_id, type, commentBody);
        }
    };

    // Dependent on whether this comment is under a post or not, change the text within the button: either 'Add a comment' or 'Reply'
    const buttonText = type === "post" ? "Add a comment" : "Reply";
    // Change the button's classes also so that the button appears different
    const buttonClass = type === "post" ? "header-button btn btn-primary add-comment-button" : "header-button btn btn-success reply-button";

    return (
        <>
        {/* Generate button with variables above */}
            <button
                type="button"
                className={buttonClass}
                data-bs-toggle="modal"
                data-bs-target={`#${modalId}`}
            >
                {buttonText}
            </button>

            <div className="modal fade modal-cover" id={modalId} tabIndex="-1" aria-labelledby={`${modalId}Label`} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`${modalId}Label`}>Add your comment</h5>
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
                                        id="commentBody"
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
