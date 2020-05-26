import React, { useState, useEffect, Fragment } from 'react';
import { Header, Icon, List, Container } from 'semantic-ui-react';
import axios from 'axios'
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';


const App = () => {

  const [activities, setActivities] = useState<IActivity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id == id)[0])
    setEditMode(false);
  }

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true)
  }

  const handleCreateActitvity = (activity: IActivity) => {
    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleEditActivity = (activity: IActivity) => {
    setActivities([...activities.filter(a => a.id !== activity.id), activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  } 

  const handleDeleteActivity = (id:string) => {
    setActivities([...activities.filter(a => a.id !== id)])
  }

  useEffect(() => {

    axios.get<IActivity[]>('https://localhost:44395/api/activities').then((values) => {
      let activities: IActivity[] = [];
      values.data.forEach( activity => {
          activity.date = activity.date.split('.')[0];
          activities.push(activity);
      });
      setActivities(values.data);
    });

  }, []);

  return (

    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          setSelectedActivity={setSelectedActivity}
          editMode={editMode}
          setEditMode={setEditMode} 
          createActivity={ handleCreateActitvity }
          editActivity={handleEditActivity} 
          deleteActivity={handleDeleteActivity}/>
      </Container>
    </Fragment>
  );


}

export default App;
