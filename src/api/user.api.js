import axios from 'axios'

const userApi = axios.create({
    baseURL: "http://localhost:8000/event_expenses/api/v1/usuario/",
});

export const createUser = (user) => {
    console.log("User data to be sent:", user);
    return userApi.post("/", user);
};
