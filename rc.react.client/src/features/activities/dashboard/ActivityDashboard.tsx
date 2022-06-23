import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';
//Must be wrapped in observer to react to changes (mobx)
//
export default observer(function ActivityDashboard() {

                const { activityStore } = useStore();
                const { selectedActivity, editMode,createActivity } = activityStore;
                 return (
                    <Grid>
                        <Grid.Column width='10'>
                             <ActivityList/>
                        </Grid.Column>
                        <Grid.Column width='6'>
                            {/*Only run if activities is loaded*/}
                             {!editMode && selectedActivity &&
                                 <ActivityDetails/>
                            }
                            {/*Only run if edit mode*/}
                             {editMode &&
                                 <ActivityForm />
                            }
                        </Grid.Column>
                    </Grid>
                );
            }
    )
