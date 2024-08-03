import { useState, useEffect } from "react";
import '../css/notification-box.css';

const NotificationBox = ({ user_sent_id, notif_id, post_id, notif_type, getNotifs }) => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        let notificationMessage;
        switch (notif_type) {
            case "comment":
                notificationMessage = "commented on your post";
                break;
            case "reply":
                notificationMessage = "replied to your comment";
                break;
            case "upvote":
                notificationMessage = "upvoted your post";
                break;
            default:
                notificationMessage = "interacted with your post";
        }
        setMessage(notificationMessage);
    }, [notif_type]);

    const goToThread = (path) => {
        window.location = "/forum/thread/" + path;
    };

    async function deleteNotif(notif_id) {
        try {
            const body = { notif_id };
            await fetch("http://localhost:5000/forum/deletenotif/", {
                method: "DELETE",
                headers: { token: localStorage.getItem("token"),
                    'Content-Type': 'application/json', },
                body: JSON.stringify(body)
            });
            getNotifs()
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    return (
        <div id="notif-box">
            <div id="notif-text">
                A user has {message}.
            </div>
            <div id="notif-interact">
                <button id="notif-path" className="btn-primary btn" onClick={() => goToThread(post_id)}>
                    <img id="notif-img" src="/images/svgs/goto-arrow.svg" alt="" />
                </button>
                <button id="notif-close" className="btn-close btn" onClick={() => deleteNotif(notif_id)}></button>
            </div>
        </div>
    );
};

export default NotificationBox;
