import { makeAutoObservable,  runInAction } from "mobx";
import agent from "../api/agents";
import { Activity } from "../Models/activity";

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
            this.setLoadingInital(true);
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                this.setActivity(activity);
            });
            this.setLoadingInital(false);
        }
        catch (error) {
            console.log(error);
            this.setLoadingInital(false);
        }
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        }
        else {
            //If not already loaded make api call
            this.setLoadingInital(true);
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => {
                    this.selectedActivity = activity;
                });
                this.setLoadingInital(false);
                return activity;
            }
            catch (error) {
                console.log(error);
                this.setLoadingInital(false);
            }
        }
    }
    //Set selected activity and parse date
    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0];
        //Add activity to registry
        this.activitieRegistry.set(activity.id, activity);
    }
    private getActivity = (id:string) => {
        return this.activitieRegistry.get(id);
    }

    createActivity = async (activity: Activity) => {
        this.loading = true;
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

    //Group activities by date
    get groupedActivities() {
        return Object.entries(
            //Use array reduce function 
            this.activitiesByDate.reduce((activities, activity) =>
            {
                const date = activity.date;
                //Get activities which match the date
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as { [key: string]: Activity[]})
        )
    }

    //Must be wrapped in an action otherwise shows console warning in relation to async / await functions
    //Setting state in async await will cause error if not wrapped in an action.
    setLoadingInital = (state: boolean) => {
        this.loadingInital = state;
    }

}