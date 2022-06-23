import { observer } from 'mobx-react-lite';
import react, { ChangeEvent, useState } from 'react'
import { Button, Form,Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

//activity:selectedActivity reference activity as selected activity alias 
//in order to react to changes in mobx state function must be wrapped in observer()
export default observer( function ActivityForm() {
    const { activityStore } = useStore();
    const {selectedActivity,closeForm,createActivity,updateActivity,loading } = activityStore;
    const initalState = selectedActivity ?? {
        id: '',
        title:'',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    }
    //set activity to initial state will be empty if new or populated if update
    const [activity, setActivity] = useState(initalState);

    function handleSubmit() {
        activity.id ? updateActivity(activity) : createActivity(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) {
        const { name, value } = event.target;
        //Update field value
        setActivity({ ...activity,[name]:value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder="Title" value={activity.title} onChange={handleInputChange } name='title'/>
                <Form.TextArea placeholder="Description" value={activity.description} onChange={handleInputChange} name='description' />
                <Form.Input placeholder="Category" value={activity.category} onChange={handleInputChange} name='category' />
                <Form.Input type="date" placeholder="Date" value={activity.date} onChange={handleInputChange} name='date' />
                <Form.Input placeholder="City" value={activity.city} onChange={handleInputChange} name='city' />
                <Form.Input placeholder="Venue" value={activity.venue} onChange={handleInputChange} name='venue' />
                <Button loading={loading} onClick={() => handleSubmit() } floated='right' positive type='submit' content='Submit'/>
                <Button onClick={() => closeForm()} floated='right' type='submit' content='Cancel'/>
            </Form>
        </Segment>
    );
})
