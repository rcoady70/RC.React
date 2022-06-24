import { observer } from 'mobx-react-lite';
import react, { ChangeEvent, useEffect, useState } from 'react'
import {  Link, useParams } from 'react-router-dom';
import { Button, Form,Segment } from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid'
import { useNavigate } from 'react-router-dom';

//activity:selectedActivity reference activity as selected activity alias 
//in order to react to changes in mobx state function must be wrapped in observer()
export default observer(function ActivityForm() {
    const navigate = useNavigate();
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading,loadActivity,loadingInital } = activityStore;
    const { id } = useParams<{ id: string }>();
    //set activity to initial state will be empty if new or populated if update
    const [activity, setActivity] = useState({
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (id)
            loadActivity(id).then(activity => setActivity(activity!));
        //Important to set dependencies so effect only runs if id changes or loadActivity changes. Infinite loop possible otherwise
    },[id,loadActivity]);

    function handleSubmit() {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            /* Create and re-direct */
            createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`));
        }
        else {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) {
        const { name, value } = event.target;
        //Update field value
        setActivity({ ...activity,[name]:value})
    }
    if (loadingInital) return <LoadingComponents content='Loading activity...' />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder="Title" value={activity.title} onChange={handleInputChange } name='title'/>
                <Form.TextArea placeholder="Description" value={activity.description} onChange={handleInputChange} name='description' />
                <Form.Input placeholder="Category" value={activity.category} onChange={handleInputChange} name='category' />
                <Form.Input type="date" placeholder="Date" value={activity.date} onChange={handleInputChange} name='date' />
                <Form.Input placeholder="City" value={activity.city} onChange={handleInputChange} name='city' />
                <Form.Input placeholder="Venue" value={activity.venue} onChange={handleInputChange} name='venue' />
                <Button
                    
                    loading={loading}
                    //onClick={() => handleSubmit()}
                    floated='right'
                    positive
                    type='submit'
                    content='Submit' />
                <Button
                    as={Link} to='/activities'
                    floated='right'
                    type='submit'
                    content='Cancel' />
            </Form>
        </Segment>
    );
})
