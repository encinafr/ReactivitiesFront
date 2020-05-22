import React, {Component} from 'react';
import { Header, Icon, List } from 'semantic-ui-react';
import axios from 'axios'
class App extends Component  {
  state = {
    values: []
  }

  componentDidMount()
  {
    axios.get('https://localhost:44395/api/values').then((values)=>{
      this.setState({
        values: values.data
      })
    });

  }

  render(){
    return (
      <div>
      <Header as='h2'>
          <Icon name='users' />
          <Header.Content>Reactivities</Header.Content>
      </Header>
      <List>
       { this.state.values.map((value: any) =>(
              <List.Item key={ value.id }>{value.name}</List.Item>
            ))}
      </List>
        
      </div>
    );
  }
  
}

export default App;
