import axios, { AxiosResponse } from "axios"
import { IActivity } from "../models/activity";
import { resolve } from "dns";
import { error } from "console";

axios.defaults.baseURL = 'https://localhost:44395/api';

axios.interceptors.response.use(undefined, error => {
    if(error.response.status === 404){
        throw error.response;
    }
});

const respondBody = (response:AxiosResponse) => response.data;
const sleep = (ms: number) => (response:AxiosResponse) => new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(respondBody),
    post: (url:string, body: {}) => axios.post(url, body).then(sleep(1000)).then(respondBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(respondBody),
    delete:(url: string) => axios.delete(url).then(sleep(1000)).then(respondBody)
};

const Activities = {
    list: ():Promise<IActivity[]> => requests.get('/activities'),
    details: (id:string) => requests.get(`/activities/${id}`),
    create: (activity:IActivity) => requests.post('activities', activity),
    update: (activity:IActivity) => requests.put(`activities/${activity.id}`, activity),
    delete: (id: string) => requests.delete(`activities/${id}`)
}


export default {
    Activities
}