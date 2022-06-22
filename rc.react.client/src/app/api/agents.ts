import axios, { AxiosResponse } from 'axios'
import { Activity } from '../Models/activity';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve,delay);
    })
}
axios.defaults.baseURL = "https://localhost:5001/api";
axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    }
    catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
    //return sleep(1000).then(() => {
    //    return response
    //}).catch((error) => {
    //    console.log(error);
    //    return Promise.reject(error);
    //})
});

//Takes response from axios and returns the data property
const responseBody = <T> (response:AxiosResponse<T>) => response.data;

//Setup requests {} means type of object
const request = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url,body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url,body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody)
}

const Activities = {
    list: () => request.get<Activity[]>('/activities'),
    details: (id?: string) => request.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => request.post<void>('/activities', activity),
    update: (activity: Activity) => request.put<void>(`/activities/${activity.id}`, activity),
    delete: (id:string) => request.del<void>(`/activities/${id}`)
}

const agent = {
    Activities
}

export default agent;