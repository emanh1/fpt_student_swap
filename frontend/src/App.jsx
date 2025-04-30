import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SwapRequestList from "./pages/SwapRequestList";
import AddSwapRequest from "./pages/AddSwapRequest";
import SwapRequest from "./pages/SwapRequest";
 
function App() {
    return (
        <BrowserRouter>
            <div>
                {/* NAVBAR */}
                <nav className="bg-blue-600 p-4 text-white">
                    <div className="flex space-x-4">
                        <Link to="/swap-requests" className="hover:text-gray-300 font-bold">
                            Swap Requests
                        </Link>
                        <Link to="/add" className="hover:text-gray-300">
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
