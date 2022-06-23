import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

///Store of stores
///
interface Store {
    activityStore:ActivityStore
}

export const store: Store = {
    activityStore: new ActivityStore()
}

//Export store context
export const StoreContext = createContext(store)

//Use store hook
export function useStore() {
    return useContext(StoreContext);
}