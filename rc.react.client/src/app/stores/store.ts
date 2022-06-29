import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";

///Store of stores
///
interface Store {
    activityStore: ActivityStore;
    commonStore: CommonStore;
}

export const store: Store = {
    activityStore: new ActivityStore(),
    commonStore: new CommonStore()
}

//Export store context
export const StoreContext = createContext(store)

//Use store hook
export function useStore() {
    return useContext(StoreContext);
}

