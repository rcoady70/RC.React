import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid} from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import ActivityList from './ActivityList';
//Must be wrapped in observer to react to changes (mobx)
//
export default observer(function ActivityDashboard() {

    const { activityStore } = useStore();
    const { loadActivities, activitieRegistry } = activityStore;
    //
    useEffect(() => {
        if (activitieRegistry.size <= 1)
            loadActivities();
    }, [activityStore]);

    if (activityStore.loadingInital) return <LoadingComponents content='Loading app...... ' />

    return (
        <Grid>
            <Grid.Column width='10'>
                    <ActivityList/>
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Activity filter</h2>
            </Grid.Column>
        </Grid>
    );
})
