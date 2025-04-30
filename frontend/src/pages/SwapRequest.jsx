import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SwapService from "../services/swap.service.js";

function SwapRequest() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [currentSwap, setCurrentSwap] = useState({
        id: null,
        subjectCode: "",
        fromRollNumber: "",
        fromClass: "",
        currentSlot: "",
        desiredSlot: "",
        status: "",
        matchWith: ""
    });
    const [message, setMessage] = useState("");

    const getSwap = (id) => {
        SwapService.get(id)
            .then((response) => {
                setCurrentSwap(response.data);
                console.log(response.data);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    useEffect(() => {
        if (id) getSwap(id);
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentSwap({ ...currentSwap, [name]: value });
    };

    const updateStatus = (status) => {
        const data = {
            ...currentSwap,
            status: status
        };

        SwapService.update(currentSwap.id, data)
            .then((response) => {
                setCurrentSwap({ ...currentSwap, status: status });
                console.log(response.data);
                setMessage("Status updated successfully!");
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const updateSwap = () => {
        SwapService.update(currentSwap.id, currentSwap)
            .then((response) => {
                console.log(response.data);
                setMessage("Swap request updated successfully!");
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const deleteSwap = () => {
        SwapService.remove(currentSwap.id)
            .then((response) => {
                console.log(response.data);
                navigate("/swap-requests");
            })
            .catch((e) => {
                console.error(e);
            });
    };

    return (
        <div>
            {currentSwap ? (
                <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                    <h4 className="font-bold text-2xl mb-4">Edit Swap Request</h4>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block mb-1 font-medium">Subject Code</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded w-full px-3 py-2"
                                name="subjectCode"
                                value={currentSwap.subjectCode}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Roll Number</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded w-full px-3 py-2"
                                name="fromRollNumber"
                                value={currentSwap.fromRollNumber}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Class</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded w-full px-3 py-2"
                                name="fromClass"
                                value={currentSwap.fromClass}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Current Slot</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded w-full px-3 py-2"
                                name="currentSlot"
                                value={currentSwap.currentSlot}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Desired Slot</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded w-full px-3 py-2"
                                name="desiredSlot"
                                value={currentSwap.desiredSlot}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Status</label>
                            <div className="flex space-x-2">
                                <button
                                    className={`px-3 py-1 rounded ${
                                        currentSwap.status === "Pending"
                                            ? "bg-yellow-500 text-white"
                                            : "bg-gray-200"
                                    }`}
                                    onClick={() => updateStatus("Pending")}
                                >
                                    Pending
                                </button>
                                <button
                                    className={`px-3 py-1 rounded ${
                                        currentSwap.status === "Matched"
                                            ? "bg-green-500 text-white"
                                            : "bg-gray-200"
                                    }`}
                                    onClick={() => updateStatus("Matched")}
                                >
                                    Matched
                                </button>
                                <button
                                    className={`px-3 py-1 rounded ${
                                        currentSwap.status === "Cancelled"
                                            ? "bg-red-500 text-white"
                                            : "bg-gray-200"
                                    }`}
                                    onClick={() => updateStatus("Cancelled")}
                                >
                                    Cancelled
                                </button>
                            </div>
                        </div>

                        <div className="flex space-x-2 mt-6">
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                                onClick={updateSwap}
                            >
                                Update
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                onClick={deleteSwap}
                            >
                                Delete
                            </button>
                        </div>

                        {message && (
                            <div className="mt-4 p-2 bg-green-100 text-green-700 rounded">
                                {message}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="text-center p-4">
                    <p>Loading swap request...</p>
                </div>
            )}
        </div>
    );
}

export default SwapRequest;