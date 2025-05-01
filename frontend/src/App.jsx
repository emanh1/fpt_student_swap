import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SwapRequestList from "./pages/SwapRequestList";
import AddSwapRequest from "./pages/AddSwapRequest";
import SwapRequest from "./pages/SwapRequest";
 
function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-gray-900 text-gray-100">
                {/* NAVBAR */}
                <nav className="bg-gray-800 p-4 shadow-lg border-b border-gray-700">
                    <div className="flex space-x-4">
                        <Link 
                            to="/swap-requests" 
                            className="hover:text-blue-400 font-bold transition-colors duration-200"
                        >
                            Swap Requests
                        </Link>
                        <Link 
                            to="/add" 
                            className="hover:text-blue-400 transition-colors duration-200"
                        >
                            Add Request
                        </Link>
                    </div>
                </nav>
 
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
