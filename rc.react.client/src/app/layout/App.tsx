import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container} from 'semantic-ui-react';
import { Activity } from '../Models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    //Set selected activity to undefined to start with.
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    //Edit
    const [editMode, setEditMode] = useState(false);



    useEffect(() => {
        axios.get<Activity[]>("https://localhost:5001/api/Activities")
             .then(response => {
                setActivities(response.data); // set state after response
         })
    }, []);

    function handleSelectActivity(id: string) {
        console.log("handleSelectActivity");
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

    function handleDeleteActivity(id:string) {
        setActivities([...activities.filter(k => k.id !== id)]);
    }

    function handleCreateOrEditActivity(activity: Activity) {
        //Check if add or edit. If edit remove 
        activity.id
            ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
             // Add new activity to array. {...activity,id: uuid()} spread array and set id to new id.
            : setActivities([...activities, {...activity,id: uuid()}]);
        setEditMode(false);
        setSelectedActivity(activity);
    }

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
              />
          </Container>
      </>
  );
}

export default App;

