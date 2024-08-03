import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../css/edit-info-modal.css'
import NotificationBox from './NotificationBox';
const NotificationsModal = ({ updateUserProfileInfo, firstNameResult, lastNameResult, profileImageResult}) => {
    const [notifications, setNotifications] = useState([
        {
            "notif_id": 2,
            "user_notifying_id": 14,
            "user_sent_id": 14,
            "notif_type": "upvote"
        },
        {
            "notif_id": 4,
            "user_notifying_id": 14,
            "user_sent_id": 14,
            "notif_type": "comment"
        }
    ]);

    return (
        <>
            <button type="button" className="header-button btn btn-primary log-button" data-bs-toggle="modal" data-bs-target="#Modal">
                View Notifications [1]
            </button>

            <div className="modal fade modal-cover" id="Modal" tabIndex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ModalLabel">Notifications</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        {notifications.map((notification) => (
                <div key={notification.notif_id} className="notification">
                    {/* <p>Notification ID: {notification.notif_id}</p>
                    <p>User Notifying ID: {notification.user_notifying_id}</p>
                    <p>Notification Type: {notification.notif_type}</p> */}
                    <NotificationBox user_sent_id={notification.user_sent_id} notif_type={notification.notif_type}/>
                </div>
            ))}
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

export default NotificationsModal;
