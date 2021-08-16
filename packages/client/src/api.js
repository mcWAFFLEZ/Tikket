import axios from 'axios';

const PORT = "4000";
const HOST_NAME = "http://localhost:";
const DATA = "/tickets";
const API_URI = HOST_NAME + PORT + DATA;

const createApiClient = () => {
    return {

        getData: async () => {
            return axios.get(API_URI).then((res) => res.data);
        },

        getPage: async (pageNumber) => {
            return axios.get(API_URI, {
                params: {
                    page: pageNumber,
                }
            }).then((res) => res.data);
        }
    }
}

export default createApiClient;