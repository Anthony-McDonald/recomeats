import { useEffect } from "react";
import { useState } from "react";


const NotificationBox = ({user_sent_id, notif_type}) => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        setMessage(notif_type)
      }, [notif_type]);

    return (
        <div>
            {message}
        </div>
    );
};

export default NotificationBox
