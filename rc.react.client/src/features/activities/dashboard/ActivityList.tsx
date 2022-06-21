import react from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/Models/activity';

interface Props {
    activities: Activity[];
    selectActvity: (id: string) => void;
    deleteActivity: (id: string) => void;
}

export default function ActivityList({ activities, selectActvity, deleteActivity }:Props) {

    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>sssss</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city},{activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectActvity(activity.id)} floated='right' content="View" color="blue" />
                                <Button onClick={() => deleteActivity(activity.id)} floated='right' content="Delete" color="red" />
                                <Label basic content={ activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    );
}