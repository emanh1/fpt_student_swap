import { useState, useEffect } from "react";
import SwapService from "../services/swap.service.js";
import { Link } from "react-router-dom";

function SwapRequestList() {
    const [swapRequests, setSwapRequests] = useState([]);
    const [currentSwap, setCurrentSwap] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchSubject, setSearchSubject] = useState("");

    useEffect(() => {
        retrieveSwapRequests();
    }, []);

    const onChangeSearchSubject = (e) => {
        setSearchSubject(e.target.value);
    };

    const retrieveSwapRequests = () => {
        SwapService.getAll()
            .then((response) => {
                setSwapRequests(response.data);
                console.log(response.data);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const refreshList = () => {
        retrieveSwapRequests();
        setCurrentSwap(null);
        setCurrentIndex(-1);
    };

    const setActiveSwap = (swap, index) => {
        setCurrentSwap(swap);
        setCurrentIndex(index);
    };

    const removeAllSwaps = () => {
        SwapService.removeAll()
            .then((response) => {
                console.log(response.data);
                refreshList();
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const findBySubjectCode = () => {
        SwapService.findBySubjectCode(searchSubject)
            .then((response) => {
                setSwapRequests(response.data);
                setCurrentSwap(null);
                setCurrentIndex(-1);
                console.log(response.data);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* LEFT COLUMN: SEARCH + LIST */}
            <div className="flex-1">
                <div className="flex mb-4">
                    <input
                        type="text"
                        className="border border-gray-300 rounded-l px-2 py-1 w-full"
                        placeholder="Search by subject code"
                        value={searchSubject}
                        onChange={onChangeSearchSubject}
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-1 rounded-r"
                        onClick={findBySubjectCode}
                    >
                        Search
                    </button>
                </div>

                <h4 className="font-bold text-lg mb-2">Swap Requests</h4>
                <ul className="divide-y divide-gray-200 border border-gray-200 rounded">
                    {swapRequests &&
                        swapRequests.map((swap, index) => (
                            <li
                                className={
                                    "px-4 py-2 cursor-pointer " +
                                    (index === currentIndex ? "bg-gray-500" : "")
                                }
                                onClick={() => setActiveSwap(swap, index)}
                                key={index}
                            >
                                {swap.subjectCode} - {swap.fromClass} ({swap.currentSlot} → {swap.desiredSlot})
                            </li>
                        ))}
                </ul>

                <button
                    className="bg-red-500 text-white px-3 py-1 rounded mt-4"
                    onClick={removeAllSwaps}
                >
                    Remove All
                </button>
            </div>

            {/* RIGHT COLUMN: DETAILS */}
            <div className="flex-1">
                {currentSwap ? (
                    <div className="p-4 bg-gray-800 rounded shadow">
                        <h4 className="font-bold text-xl mb-2">Swap Request Details</h4>
                        <div className="mb-2">
                            <strong>Subject Code: </strong>
                            {currentSwap.subjectCode}
                        </div>
                        <div className="mb-2">
                            <strong>Student Roll Number: </strong>
                            {currentSwap.fromRollNumber}
                        </div>
                        <div className="mb-2">
                            <strong>Class: </strong>
                            {currentSwap.fromClass}
                        </div>
                        <div className="mb-2">
                            <strong>Current Slot: </strong>
                            {currentSwap.currentSlot}
                        </div>
                        <div className="mb-2">
                            <strong>Desired Slot: </strong>
                            {currentSwap.desiredSlot}
                        </div>
                        <div className="mb-2">
                            <strong>Status: </strong>
                            {currentSwap.status}
                        </div>
                        {currentSwap.matchWith && (
                            <div className="mb-2">
                                <strong>Matched With: </strong>
                                {currentSwap.matchWith}
                            </div>
                        )}

                        <Link
                            to={`/swap-requests/${currentSwap.id}`}
                            className="inline-block bg-yellow-400 text-black px-3 py-1 rounded"
                        >
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SwapRequestList;