import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import './App.css';

import Landing from './components/Projects/Landing';
import Singlesale from './components/Research/Singlesale';
import Create from './components/Create/Create';
import Comingsoon from './components/Staking/Comingsoon';
import NotFound from './components/NotFound';

import Request from './components/Adminpanel/Request';
import Requestdetail from './components/Adminpanel/Requestdetail';



function App() {
  return (
    <div>  
    <div><Toaster/></div>
    <Router >	   
      <Switch>
      <Route exact path='/' component={Landing} />
    <Route exact path='/projects' component={Landing} />
    <Route exact path='/sale/:id' component={Singlesale} />
    <Route exact path='/create' component={Create} />

    <Route exact path='/requests' component={Request} />
    <Route exact path='/profile/:id' component={Requestdetail} />

    {/* <Route  path='/*' component={Comingsoon} > <Redirect to={Comingsoon} /> </Route> */}
    {/* <Route path='/:id' component={NotFound} /> */}

    <Route component={Comingsoon} />    
      </Switch>  
   
    </Router>
    </div>
  );
}

export default App;
