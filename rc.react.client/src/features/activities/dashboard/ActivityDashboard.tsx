import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Activity } from '../../../app/Models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';
//Props parameters
//
interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelActivity: () => void;
    editMode: boolean,
    openForm: (id?: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}
//De-structure props. Otherwise use props:Props then props.activities...
//
export default function ActivityDashboard({ activities, selectedActivity, selectActivity,
                                            cancelActivity, editMode, openForm,
                                            closeForm, createOrEdit, deleteActivity,
                                            submitting }: Props) {
     return (
        <Grid>
            <Grid.Column width='10'>
                 <ActivityList
                     activities={activities}
                     selectActvity={selectActivity}
                     deleteActivity={deleteActivity}
                     submitting={submitting}
                 />
            </Grid.Column>
            <Grid.Column width='6'>
                {/*Only run if activities is loaded*/}
                 {!editMode && selectedActivity &&
                     <ActivityDetails
                        activity={selectedActivity}
                        cancelSelectActivity={cancelActivity}
                        openForm={openForm}
                        
                     />
                }
                {/*Only run if edit mode*/}
                 {editMode &&
                     <ActivityForm
                     activity={selectedActivity}
                     closeForm={closeForm}
                     createOrEdit={createOrEdit}
                     submitting={submitting}
                     />
                }
            </Grid.Column>
        </Grid>
    );
}
