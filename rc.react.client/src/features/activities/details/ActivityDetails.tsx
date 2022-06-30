import { observer } from 'mobx-react-lite';
import react, { useEffect } from 'react'
import {useParams } from 'react-router-dom';
import {Grid} from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedSideBar from './ActivityDetailedSideBar';


export default observer(function ActivityDetails() {
    const { activityStore } = useStore();
    //de-construct selectedActivity and alias as activity 
    const { selectedActivity: activity,loadActivity, loadingInital} = activityStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        //Load and set activity
        if (id) loadActivity(id);
        var m = '';
        //Depends on and id and loadActivity
    },[id,loadActivity])

    if (!activity || loadingInital) return <LoadingComponents content={'loading activity'}/>;

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity} />
                <ActivityDetailedInfo activity={activity} />
                <ActivityDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSideBar />
            </Grid.Column>
        </Grid>
    );
})

