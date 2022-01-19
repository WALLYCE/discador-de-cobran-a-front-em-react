import axios from "axios";

const api = axios.create({
baseURL: 'http://localhost:3005',
headers: { 'content-type': 'application/x-www-form-urlencoded' }
});

api.defaults.headers.post['Content-Type'] = 'application/json';
export default api;