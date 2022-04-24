import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./components/LoginPage/LoginPage.tsx"
import MessagePage from "./components/MessagePage/MessagePage.tsx"
import "bootstrap/dist/css/bootstrap.min.css"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/messages" element={<MessagePage />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)
