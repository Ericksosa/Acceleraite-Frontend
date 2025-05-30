import axios from 'axios';

const REST_API_URL = 'http://localhost:8080/api/rol';

export const listaRoles = () => {
    return axios.get(REST_API_URL)
    .then(response => response.data)
    .catch(error => {
        console.error("Error fetching roles:", error);
        throw error;
    });
}