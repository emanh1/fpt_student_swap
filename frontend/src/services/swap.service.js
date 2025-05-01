import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + "/api";

const http = axios.create({
    baseURL: baseURL, 
    headers: {
        "Content-Type": "application/json",
    },
});
 
const getAll = () => {
    return http.get("/swap-requests");
};
 
const get = (id) => {
    return http.get(`/swap-requests/${id}`);
};
 
const create = (data) => {
    return http.post("/swap-requests", data);
};
 
const update = (id, data) => {
    return http.put(`/swap-requests/${id}`, data);
};
 
const remove = (id) => {
    return http.delete(`/swap-requests/${id}`);
};
 
const removeAll = () => {
    return http.delete("/swap-requests");
};
 
const findBySubjectCode = (subjectCode) => {
    return http.get(`/swap-requests?subjectCode=${subjectCode}`);
};
 
export default {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findBySubjectCode,
};