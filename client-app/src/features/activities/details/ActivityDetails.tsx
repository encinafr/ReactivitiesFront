import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityStore from '../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite';
import { RouteComponentProps, Link } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityDetailHeader from './ActivityDetailHeader';
import ActivityDetailsInfo from './ActivityDetailsInfo';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedSideBar from './ActivityDetailedSideBar';

interface DetailsParams {
    id: string
}

const ActivityDetails: React.FC<RouteComponentProps<DetailsParams>> = ({ match, history}) => {
    const activityStore = useContext(ActivityStore);
    const { activity, loadActivity, loadingInitial } = activityStore;

    useEffect(() => {
        loadActivity(match.params.id).catch( () => { 
                history.push('/notfound');
        })
    }, [loadActivity, match.params.id, history])

    if (loadingInitial || !activity) return <LoadingComponent content='Loading activity' />

    if(!activity)
    return <h2>Activity not found</h2>

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailHeader activity={activity}/>
                <ActivityDetailsInfo activity={activity}/>
                <ActivityDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSideBar />
            </Grid.Column>
        </Grid>
    );
};

export default observer(ActivityDetails);
