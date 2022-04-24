import React, { useState, useEffect } from "react"
import { Form, Container, Card, Button, Toast, Row } from "react-bootstrap"
import { Autocomplete, TextField } from "@mui/material"
import Message from "../Message/Message.tsx"
import axios from "axios"

const MessagePage = () => {
    const [recipients, setRecipients] = useState([])
    const [selectedRecipient, setSelectedRecipient] = useState("")
    const [messages, setMessages] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:9000/users")
            .then((r) =>
                setRecipients(
                    r.data.users.map((u) => {
                        return u.username
                    })
                )
            )
            .catch()
    }, [])

    const getMessages = () => {
        axios
            .get(
                `http://localhost:9000/messages?username=${localStorage.getItem(
                    "username"
                )}`
            )
            .then((r) => setMessages(r.data.messages))
    }

    useEffect(() => {
        getMessages()

        const interval = setInterval(() => {
            getMessages()
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    const handleFormSubmit = (e) => {
        axios
            .post("http://localhost:9000/message", {
                sender: localStorage.getItem("username"),
                receipient: selectedRecipient,
                message: e.target[0].value,
            })
            .then()
            .catch((e) => {
                new Error(e)
            })

        e.preventDefault()
    }

    return (
        <Container>
            <Container fluid className="d-flex justify-content-center my-3">
                <Row>
                    <h4>Logged as: {localStorage.getItem("username")}</h4>
                </Row>
            </Container>
            <Container className="d-flex m-5 mx-auto">
                <Card
                    className="text-center py-4 px-5 mx-auto"
                    style={{ width: "40vw" }}
                >
                    <Form.Label className="m-3">Recipient</Form.Label>
                    <Autocomplete
                        disablePortal
                        options={recipients}
                        renderInput={(params) => (
                            <TextField {...params} label="Recipient" />
                        )}
                        value={selectedRecipient}
                        onChange={(e, newValue) => {
                            setSelectedRecipient(newValue)
                        }}
                    />
                    <Form onSubmit={(e) => handleFormSubmit(e)}>
                        <Form.Label className="m-3">Send Message</Form.Label>
                        <Form.Control type="text" as="textarea" rows={3} />
                        <Button
                            variant="primary"
                            type="submit"
                            className="w-50 mx-auto m-3"
                        >
                            Submit
                        </Button>
                    </Form>
                </Card>
            </Container>
            <Container fluid className="d-flex justify-content-center">
                <Row>
                    <h3>Messages</h3>
                </Row>
            </Container>
            <Container
                fluid
                className="d-flex mx-auto justify-content-center vh-30"
            >
                <Row className="justify-content-center  ">
                    {messages.map((m, index) => (
                        <Message
                            key={index}
                            username={m.sender}
                            messageText={m.message}
                        />
                    ))}
                </Row>
            </Container>
        </Container>
    )
}

export default MessagePage
