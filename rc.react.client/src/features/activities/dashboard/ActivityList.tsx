import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
import { Header} from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityListItem from './ActivityListItem';

//Wrap in observer so mobx is notified of changes to state
export default observer(function ActivityList() {

    const { activityStore } = useStore();
    const { groupedActivities } = activityStore;

   //Create grouped activities UI
    return (
        <>
            {groupedActivities.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header  sub color='teal'>
                        { group }
                    </Header>
                    
                    {activities.map(activity => (
                        <ActivityListItem key={activity.id} activity={activity}/>
                    ))}
                </Fragment>
            ))}
        </>
    )
})