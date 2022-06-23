import { action, makeAutoObservable, makeObservable, runInAction } from "mobx";
import agent from "../api/agents";
import { Activity } from "../Models/activity";
import { v4 as uuid} from 'uuid'

export default class ActivityStore {
    activitieRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode: boolean = false;
    loading: boolean = false;
    loadingInital: boolean = true;


    constructor() {
        makeAutoObservable(this)
    }

    loadActivities = async () => {
        try {
                const activities = await agent.Activities.list();
                activities.forEach(activity => {
                     activity.date = activity.date.split('T')[0];
                    this.activitieRegistry.set(activity.id, activity);
            });
            this.setLoadingInital(false);
        }
        catch (error) {
            console.log(error);
            this.setLoadingInital(false);
        }
    }

    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
        try {
            await agent.Activities.create(activity);
            //Setting state in async method must run in action
            runInAction(() => {
                this.activitieRegistry.set(activity.id,activity);
                this.selectedActivity= activity;
                this.editMode = false;
                this.loading = false;
            });
        }
        catch (error) {
            console.log(error);
            //Setting state in async method must run in action
            runInAction(() => {
                this.editMode = false;
                this.loading = false;
            });
        }
    }
    updateActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
        try {
            await agent.Activities.update(activity);
            //Setting state in async method must run in action
            runInAction(() => {
                this.activitieRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        }
        catch (error) {
            console.log(error);
            //Setting state in async method must run in action
            runInAction(() => {
                this.editMode = false;
                this.loading = false;
            });
        }
    }

    deleteActivity = async (id: string) =>
    {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activitieRegistry.delete(id);
                this.loading = false
                if (this.selectedActivity?.id === id)
                    this.cancelSelectActivity();
            });
        }
        catch (error)
        {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    //Computed property
    get activitiesByDate() {
        return Array.from(this.activitieRegistry.values())
                                                          .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }

    //Must be wrapped in an action otherwise shows console warning in relation to async / await functions
    //Setting state in async await will cause error if not wrapped in an action.
    setLoadingInital = (state: boolean) => {
        this.loadingInital = state;
    }

    selectActivity = (id: string) => {
        this.selectedActivity = this.activitieRegistry.get(id);
    }

    cancelSelectActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectActivity();
        this.editMode = true; //shows from
    }

    closeForm = () => {
        this.editMode = false; //shows from
    }
}