import React from "react"
import { Toast } from "react-bootstrap"

const Message: React.FC<{ messageText: string; username: string }> = ({
    messageText,
    username,
}) => {
    return (
        <Toast className="m-2">
            <Toast.Header>
                <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                />
                <strong className="me-auto">username</strong>
            </Toast.Header>
            <Toast.Body>{messageText}</Toast.Body>
        </Toast>
    )
}

export default Message
