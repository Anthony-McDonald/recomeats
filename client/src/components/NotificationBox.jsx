import { useState, useEffect } from "react";
import '../css/notification-box.css'

const NotificationBox = ({user_sent_id, notif_id, post_id, notif_type}) => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        setMessage(notif_type)
      }, [notif_type]);

      const goToThread = (path) => {

        window.location = "/forum/thread/" + path
    }

    async function deleteNotif(notif_id) {
        try {
            const body = {notif_id}
          await fetch("http://localhost:5000/forum/deletenotif/", {
            method: "DELETE",
            headers: { token: localStorage.getItem("token")},
            body: JSON.stringify(body)
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

    return (
        <div id="notif-box">
            <div id="notif-text">
            a user has x on your {message}
            </div>
            <div id="notif-interact">
            <button id="notif-path" className="btn-primary btn" onClick={() => goToThread(post_id)}><img id="notif-img" src="/images/svgs/goto-arrow.svg" alt="" /></button>
            <button id="notif-close" className="btn-close btn" onClick={() => deleteNotif(notif_id)}></button>
            </div>
        </div>
    );
};

export default NotificationBox
