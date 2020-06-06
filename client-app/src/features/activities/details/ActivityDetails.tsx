import React, { useContext } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import ActivityStore from '../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite';

interface IProps {
    setSelectedActivity: (activity: IActivity | null) => void
}

const ActivityDetails: React.FC<IProps> = ({ setSelectedActivity}) => {
    const activityStore = useContext(ActivityStore);
    const {selectedActivity: activity} = activityStore;

    return (
        <div>
            <Card fluid>
                <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
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
                    <Button.Group widths={2}>
                        <Button onClick={ () => activityStore.editMode = true} basic color='blue' content='Edit' />
                        <Button onClick={ () => activityStore.selectActivity = Object()} basic color='grey' content='Cancel' />
                    </Button.Group>
                </Card.Content>
            </Card>
        </div>
    );
};

export default observer(ActivityDetails);

