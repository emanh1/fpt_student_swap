import { useState } from "react";
import SwapService from "../services/swap.service.js";

function AddSwapRequest() {
    const [swapRequest, setSwapRequest] = useState({
        subjectCode: "",
        fromRollNumber: "",
        fromClass: "",
        currentSlot: "",
        desiredSlot: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSwapRequest({
            ...swapRequest,
            [name]: value,
        });
    };

    const saveSwapRequest = () => {
        SwapService.create(swapRequest)
            .then((response) => {
                console.log(response.data);
                setSubmitted(true);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const newSwapRequest = () => {
        setSwapRequest({
            subjectCode: "",
            fromRollNumber: "",
            fromClass: "",
            currentSlot: "",
            desiredSlot: "",
        });
        setSubmitted(false);
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
            {submitted ? (
                <div className="text-center">
                    <h4 className="font-bold text-green-600 mb-4">
                        Swap request submitted successfully!
                    </h4>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-200"
                        onClick={newSwapRequest}
                    >
                        Add Another Request
                    </button>
                </div>
            ) : (
                <div>
                    <h4 className="font-bold text-2xl mb-4 text-center">Create Swap Request</h4>

                    <div className="space-y-4">
                        <div>
                            <label className="block mb-1 font-medium">Subject Code</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="subjectCode"
                                value={swapRequest.subjectCode}
                                onChange={handleInputChange}
                                placeholder="e.g. CSD201"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Your Roll Number</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="fromRollNumber"
                                value={swapRequest.fromRollNumber}
                                onChange={handleInputChange}
                                placeholder="e.g. SE123456"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Your Class</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="fromClass"
                                value={swapRequest.fromClass}
                                onChange={handleInputChange}
                                placeholder="e.g. SE1703"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Current Slot</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="currentSlot"
                                value={swapRequest.currentSlot}
                                onChange={handleInputChange}
                                placeholder="e.g. M1"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Desired Slot</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="desiredSlot"
                                value={swapRequest.desiredSlot}
                                onChange={handleInputChange}
                                placeholder="e.g. M3"
                            />
                        </div>

                        <button
                            className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-200 mt-6"
                            onClick={saveSwapRequest}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddSwapRequest;