import { observer } from 'mobx-react-lite';
import react, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button,  Header,  Segment } from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup'
import MyTextInput from '../../../app/common/form/MyTextinput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/CategoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Activity } from '../../../app/Models/activity';
import { v4 as uuid } from 'uuid'

//activity:selectedActivity reference activity as selected activity alias 
//in order to react to changes in mobx state function must be wrapped in observer()
export default observer(function ActivityForm() {
    const navigate = useNavigate();
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading, loadActivity, loadingInital } = activityStore;
    const { id } = useParams<{ id: string }>();
    //set activity to initial state will be empty if new or populated if update
    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        date: null,
        description: '',
        category: '',
        city: '',
        venue: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required(),
        date: Yup.string().required('The activity date is required').nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required(),
    })

    useEffect(() => {
        if (id)
            loadActivity(id).then(activity => setActivity(activity!));
        //Important to set dependencies so effect only runs if id changes or loadActivity changes. Infinite loop possible otherwise
    }, [id, loadActivity]);

    function handleFormSubmit(activity:Activity) {
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

    if (loadingInital) return <LoadingComponents content='Loading activity...' />

    return (
        <Segment clearing>
            <Header content='Activity Details' sub color='teal'/>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)}>
                {/*0. Alias values as activity 1. Formik has a Form element which clashes with samentic-ui so changed the imports manually*/}
                {({ handleSubmit,isValid,isSubmitting,dirty}) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                        {/*Use symantic-ui to format formik field*/}
                        <MyTextInput placeholder="Title" name='title' />
                        <MyTextArea placeholder="Description" name='description' rows={3} />
                        <MySelectInput options={categoryOptions} placeholder="Category" name='category' />
                        <MyDateInput
                            placeholderText="Date"
                            name='date'
                            showTimeSelect
                            timeCaption="time"
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <Header content='Location Details' sub color='teal' />
                        <MyTextInput placeholder="City" name='city' />
                        <MyTextInput placeholder="Venue" name='venue' />
                        <Button
                            disable={isSubmitting || !dirty || !isValid  }
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
                )
                }
            </Formik>

        </Segment>
    );
})
