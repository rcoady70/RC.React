import { observer } from 'mobx-react-lite';
import react, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';


export default observer(function ActivityDetails() {
    const { activityStore } = useStore();
    //de-construct selectedActivity and alias as activity 
    const { selectedActivity: activity,loadActivity, loadingInital} = activityStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        //Load and set activity
        if (id) loadActivity(id);
        //Depends on and id and loadActivity
    },[id,loadActivity])

    if (!activity || loadingInital) return <LoadingComponents content={''}/>;

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button as={Link} to={`/createActivity/${activity.id}`} basic color='blue' content='Edit' />
                    <Button as={Link} to={`/activities`} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    );
})