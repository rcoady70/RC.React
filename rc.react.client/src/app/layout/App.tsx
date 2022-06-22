import React, { useEffect, useState } from 'react';
import { Container} from 'semantic-ui-react';
import { Activity } from '../Models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agents';
import LoadingComponents from './LoadingComponents';

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    //Set selected activity to undefined to start with.
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    //Edit
    const [editMode, setEditMode] = useState(false);
    //Loading
    const [loading, setLoading] = useState(true);
    //Submitting
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        agent.Activities.list().then(resposne => {
            let activities: Activity[] = [];
            resposne.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                activities.push(activity);
            })
            setActivities(activities)
            setLoading(false);
        });
        //axios.get<Activity[]>("https://localhost:5001/api/Activities")
        //     .then(response => {
        //        setActivities(response.data); // set state after response
        // })
    }, []);

    function handleSelectActivity(id: string) {
        setSelectedActivity(activities.find(x => x.id === id));
    }

    function handleCancelSelectActivity() {
        setSelectedActivity(undefined);
    }

    function handleFormOpen(id?: string) {
        console.log(id);
        id ? handleSelectActivity(id) : handleCancelSelectActivity();
        setEditMode(true);
    }
    function handleFormClose() {
        setEditMode(false);
    }

    function handleDeleteActivity(id: string) {
        setSubmitting(true);
        agent.Activities.delete(id).then(() => {
            setActivities([...activities.filter(x => x.id !== id)]);
            setSubmitting(false);
        });
    }

    function handleCreateOrEditActivity(activity: Activity) {
        setSubmitting(true);
        if (activity.id) {
            agent.Activities.update(activity).then(() => {
                setActivities([...activities.filter(x => x.id !== activity.id), activity]);
                setSelectedActivity(activity);
                setEditMode(false);
                setSubmitting(false);
            });
        }
        else
        {
            activity.id = uuid();
            agent.Activities.create(activity).then(() => {
                setActivities([...activities, activity])
                setSelectedActivity(activity);
                setEditMode(false);
                setSubmitting(false);
            });
        }
    }

    if (loading) return <LoadingComponents content='Loading app...... ' />

    return (
      <>
          <NavBar openForm={handleFormOpen} />
          <Container style={{marginTop:'7em'} }>
              <ActivityDashboard
                    activities={activities}
                    selectedActivity={selectedActivity}
                    selectActivity={handleSelectActivity}
                    cancelActivity={handleCancelSelectActivity}
                    editMode={editMode}
                    openForm={handleFormOpen}
                    closeForm={handleFormClose}
                    createOrEdit={handleCreateOrEditActivity}
                    deleteActivity={handleDeleteActivity}
                    submitting={submitting}
              />
          </Container>
      </>
  );
}

export default App;

