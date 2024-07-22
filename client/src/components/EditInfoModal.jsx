import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../css/edit-info-modal.css'
const EditInfoModal = ({ updateUserProfileInfo, firstNameResult, lastNameResult, profileImageResult}) => {
    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        profileImage: "1",
    });

    const { firstName, lastName, profileImage } = inputs;

    useEffect(() => {
        setInputs({
            firstName: firstNameResult,
            lastName: lastNameResult,
            profileImage: profileImageResult
        });
    }, [firstNameResult, lastNameResult, profileImageResult]);

    const closePress = () => {
        setTimeout(() => {
            setInputs({
                firstName: firstNameResult,
                lastName: lastNameResult,
                profileImage: profileImageResult
            });
        }, 1000);
    };

    const imageOptions = [0,1,2,3,4,5,6,7,8,9,10,11]; // Add your image options here

    const onChange = (e) => {
        const updatedInputs = { ...inputs, [e.target.id]: e.target.value };
        setInputs(updatedInputs);
    };

    const onImageSelect = (image) => {
        setInputs({ ...inputs, profileImage: image });

    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        updateUserProfileInfo(firstName, lastName, profileImage);
    };

    return (
        <>
            <button type="button" className="header-button btn btn-primary log-button" data-bs-toggle="modal" data-bs-target="#Modal">
                Edit User Details
            </button>

            <div className="modal fade modal-cover" id="Modal" tabIndex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ModalLabel">Edit your details</h5>
                            <button type="button" className="header-button btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={onSubmitForm}>
                                <div className="mb-3">
                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                    <input value={firstName} onChange={onChange} type="text" className="form-control" id="firstName" aria-describedby="fnameHelp" />
                                </div>
                                <h1>fnr: {firstNameResult}</h1>
                                <div className="mb-3">
                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                    <input value={lastName} onChange={onChange} type="text" className="form-control" id="lastName" aria-describedby="lnameHelp" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Profile Image</label>
                                    <div className="image-selector">
                                        {imageOptions.map(image => (
                                            <img
                                                key={image}
                                                src={`./images/profile-images/${image}.png`}
                                                alt={`Profile ${image}`}
                                                className={`profile-img ${profileImage == image ? 'selected' : ''}`}
                                                onClick={() => onImageSelect(image)}
                                                style={{ cursor: 'pointer', width: '100px', height: '100px', margin: '5px' }}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="submit-register">
                                    <button type="submit" className="header-button btn btn-primary">Submit Changes</button>
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

export default EditInfoModal;
