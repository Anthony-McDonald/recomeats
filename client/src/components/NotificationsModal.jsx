import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../css/edit-info-modal.css';
import NotificationBox from './NotificationBox';

const NotificationsModal = () => {
    const [notifications, setNotifications] = useState(null);

    useEffect(() => {
        getNotifs();
    }, []);

    async function getNotifs() {
        try {
            const response = await fetch("http://localhost:5000/forum/getusernotifs/", {
                method: "GET",
                headers: { token: localStorage.getItem("token") }
            });

            const parseRes = await response.json();
            setNotifications(parseRes);
        } catch (error) {
            console.log("issues in notification retrieval", error);
        }
    }

    const notificationCount = notifications ? notifications.length : 0;

    return (
        <>
            <button type="button" className="header-button btn btn-primary log-button" data-bs-toggle="modal" data-bs-target="#Modal">
                View Notifications [{notificationCount}]
            </button>

            <div className="modal fade modal-cover" id="NotifModal" tabIndex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ModalLabel">Notifications</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {notifications ? (
                                notifications.map((notification) => (
                                    <div key={notification.notif_id} className="notification">
                                        <NotificationBox 
                                            notif_id={notification.notif_id} 
                                            post_id={notification.post_id} 
                                            notif_type={notification.notif_type} 
                                            getNotifs={getNotifs}
                                        />
                                    </div>
                                ))
                            ) : (
                                <p>Loading notifications...</p>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" id="closeBtn" className="header-button btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotificationsModal;
