import { makeAutoObservable, runInAction } from "mobx";
import { historyX } from "../..";
import agent from "../api/agents";
import { User, UserFormValues } from "../Models/user";
import { store } from "./store";

export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            //Modifying an observable it must be inside an action. Cannot set directly
            runInAction(() => this.user = user)
            store.modalStore.closeModal();
            historyX.push('/activities');
        }
        catch (error) {
            throw error;
        }
    }

    register = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            //Modifying an observable it must be inside an action. Cannot set directly
            runInAction(() => this.user = user)
            store.modalStore.closeModal();
            historyX.push('/activities');
        }
        catch (error) {
            throw error;
        }
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            //Modifying an observable it must be inside an action. Cannot set directly
            runInAction(() => this.user = user)
        }
        catch (error) {
            console.log(error);
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        historyX.push('/');
    }
}