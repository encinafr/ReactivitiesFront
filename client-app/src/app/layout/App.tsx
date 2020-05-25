import React, {useState, useEffect} from 'react';
import { Header, Icon, List } from 'semantic-ui-react';
import axios from 'axios'
import { IActivity } from '../models/activity';


const App = () => {

  const [activities, setActivities] = useState<IActivity[]>([])

  useEffect( () => {

    axios.get<IActivity[]>('https://localhost:44395/api/activities').then((values)=>{
      setActivities(values.data);
    });

  }, []);
  
  return (

      <div>
        <Header as='h2'>
            <Icon name='users' />
            <Header.Content>Reactivities</Header.Content>
        </Header>
        <List>
        { activities.map((activity) =>(
                <List.Item key={ activity.id }>{activity.title}</List.Item>
              ))}
        </List>
      </div>
  );
  
  
}

export default App;
