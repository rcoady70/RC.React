import react from 'react'
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';


export default function ActivityDetails() {
    const { activityStore } = useStore();
    //de-construct selectedActivity and alias as activity 
    const { selectedActivity: activity,openForm,cancelSelectActivity } = activityStore;

    if (!activity) return <LoadingComponents content={''}/>;

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
                    <Button basic color='blue' onClick={() => openForm(activity.id) } content='Edit' />
                    <Button basic color='grey' onClick={() => cancelSelectActivity()} content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    );
}