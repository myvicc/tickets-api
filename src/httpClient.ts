import axios from "axios";

export const httpClient = axios.create({
    baseURL: 'https://my.laphil.com/en/rest-proxy',
});
