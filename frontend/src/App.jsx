import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import SwapRequestList from "./components/SwapRequestList";
import AddSwapRequest from "./components/AddSwapRequest";
import SwapRequest from "./components/SwapRequest";
import Login from "./components/Login";
import NavBar from "./components/NavBar";

import { AuthContext } from "./contexts/AuthContext";
import { useContext } from "react";

function App() {

    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Login />;
    }

    return (
        <BrowserRouter>
            <div className="min-h-screen bg-gray-900 text-gray-100">
                {/* NAVBAR */}
                <NavBar/> 
 
                {/* ROUTES */}
                <div className="container mx-auto mt-8 px-4">
                    <Routes>
                        <Route path="/" element={<SwapRequestList />} />
                        <Route path="/swap-requests" element={<SwapRequestList />} />
                        <Route path="/add" element={<AddSwapRequest />} />
                        <Route path="/swap-requests/:id" element={<SwapRequest />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}
 
export default App;
