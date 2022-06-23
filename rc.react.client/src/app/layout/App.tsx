import React, { useEffect, useState } from 'react';
import { Container} from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponents from './LoadingComponents';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';


function App() {
    //useStore hook. De-structure to get activityStore
    const { activityStore } = useStore();

    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore]);

    if (activityStore.loadingInital) return <LoadingComponents content='Loading app...... ' />

    return (
      <>
          <NavBar/>
            <Container style={{ marginTop: '7em' }}>
              <ActivityDashboard/>
          </Container>
      </>
  );
}

//Wrap in observer to to grant additional mobx-lite powers to observer the observeable in the store
export default observer(App);

