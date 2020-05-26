import axios, { AxiosResponse } from "axios"
import { IActivity } from "../models/activity";

axios.defaults.baseURL = 'https://localhost:44395/api';

const respondBody = (response:AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(respondBody),
    post: (url:string, body: {}) => axios.post(url, body).then(respondBody),
    put: (url: string, body: {}) => axios.put(url, body).then(respondBody),
    delete:(url: string) => axios.delete(url).then(respondBody)
};

const Activities = {
    list: () => requests.get('/activities'),
    details: (id:string) => requests.get(`/activities/${id}`),
    create: (activity:IActivity) => requests.post('activities', activity),
    update: (activity:IActivity) => requests.put(`activities/${activity.id}`, activity),
    delete: (id: string) => requests.delete(`activities/${id}`);
}


export default {
    Activities
}