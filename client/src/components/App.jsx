import React    from 'react';
import {Router} from "@reach/router";
//import Cake    from './Cake';
//import AddCake from './AddCake';
import AddPlace from './AddPlace';
import Place    from './Place';
import Places from './Places';
import navbar    from './navbar';

//<Cakes   path='/' />
//<Cake    path='/cake/:cakeID' />
//<AddCake path='/add-cake/' />

class App extends React.Component {

  render() {
    return (
      <Router>
      
        <Place    path='/place/:placeID' />
        <Places   path='/' />
        
        <AddPlace path='/add-place/' />
        <navbar path='/navbar/' />
      </Router>
    );
  }

}

export default App;
