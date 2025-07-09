import axios from "axios";

const REST_API_URL = 'http://localhost:8080/api/estado';

export const listaEstados = () => {
    return axios.get(REST_API_URL)
    .then(response => response.data)
    .catch(error => {
        console.error("Error fetching estados:", error);
        throw error;
    });
}