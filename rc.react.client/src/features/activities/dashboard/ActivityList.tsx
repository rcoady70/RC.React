import { observer } from 'mobx-react-lite';
import react, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

//Wrap in observer so mobx is notified of changes to state
export default observer(function ActivityList() {

    const { activityStore } = useStore();
    const { deleteActivity,activitiesByDate ,loading } = activityStore;
    //Save the name or button clicked to ensure loading spinner shows for that button only
    const [target, setTarget] = useState('');
    //Handle delete
    //
    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }
    
   
    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city},{activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button
                                    as={Link} to={`/activities/${activity.id}`}
                                    floated='right'
                                    content="View"
                                    color="blue" />
                                <Button
                                    name={activity.id}
                                    loading={loading && target === activity.id}
                                    onClick={(e) =>  handleActivityDelete(e, activity.id)}
                                    floated='right'
                                    content="Delete"
                                    color="red" />
                                <Label basic content={ activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    );
})