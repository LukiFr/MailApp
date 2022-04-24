import React from "react"
import { Form, Container, Card, Button } from "react-bootstrap"
import axios from "axios"

const LoginPage = () => {
    const handleFormSubmit = (e) => {
        axios
            .post("http://localhost:9000/login", {
                username: e.target[0].value,
            })
            .then((r) => localStorage.setItem("username", r.data.username))
            .then(() => (window.location.href = "/messages"))
            .catch((e) => {
                new Error(e)
            })

        e.preventDefault()
    }

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="text-center py-4 px-5 w-50">
                <Form onSubmit={(e) => handleFormSubmit(e)}>
                    <Form.Label className="m-3">Username</Form.Label>
                    <Form.Control type="text" required />
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
    )
}

export default LoginPage
