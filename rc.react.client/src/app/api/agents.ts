import axios, { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'react-toastify';
import { historyX } from '../..';
import { Activity } from '../Models/activity';
import { User, UserFormValues } from '../Models/user';
import { store } from '../stores/store';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve,delay);
    })
}
axios.defaults.baseURL = "https://localhost:5001/api";

//Axios interceptors, add bearer to request header
axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token)
        config.headers!.Authorization! = `Bearer ${token}`;
    return config;

})

//Axios interceptors to handle response
axios.interceptors.response.use(async response => {
        await sleep(1000);
        return response;
},(error: AxiosError) => {
        const { data }: any = error.response!;
        const { status,config } = error.response!;
        switch (status) {
            case 400:
                if (typeof data === 'string')
                    toast.error(data);
                //If a getting a record send to not found. Is get and has an id.
                if (config.method === 'get' && data.errors.hasOwnProperty('id'))
                    historyX.push('/not-found');
                if (data.errors) {
                    const modalStateErrors = [];
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modalStateErrors.push(data.errors[key])
                        }
                    }
                    throw modalStateErrors.flat();
                } 
                break;
            case 401:
                toast.error("data.401");
                break;
            case 404: //not found
                historyX.push('/not-found');
                break;
            case 500:
                store.commonStore.setServerError(data);
                historyX.push('/server-error');
                break;
        }
        return Promise.reject(error);
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

const Account = {
    current: () => request.get<User>(`/account`),
    login: (user: UserFormValues) => request.post<User>(`/account/login`, user),
    register: (user: UserFormValues) => request.post<User>(`/account/register`, user)
}

const agent = {
    Activities,
    Account
}

export default agent;