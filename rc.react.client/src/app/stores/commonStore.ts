import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../Models/serverError";

export default class CommonStore {
    error: ServerError | null = null;
    token: string | null = window.localStorage.getItem('jwt');
    appLoaded: boolean = false;

    constructor() {
        makeAutoObservable(this);

        //Run mobx reaction when token changes. Only runs when token changes not on init.
        reaction(
            () => this.token,
            token => {
                if (token)
                    window.localStorage.setItem('jwt', token);
                else
                    window.localStorage.removeItem('jwt');
            }
        )
    }

    setServerError = (error: ServerError) => {
        this.error = error;
    }

    setToken = (token: string | null) => {
        if (token)
            window.localStorage.setItem('jwt', token);
        this.token = token;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}