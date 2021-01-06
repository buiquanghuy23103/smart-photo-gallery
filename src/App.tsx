
import './App.css';

import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import routes from './pages/route';
import HeaderComponent from './components/HeaderComponent';
import React from 'react';


function App(): JSX.Element {

  return (
    <BrowserRouter>
      <HeaderComponent />
      <Switch>
        { routes.map((route) =>
        (<Route
          key={ route.path }
          path={ route.path }
          exact={ route.exact }
          component={ route.component }
        />)) }
      </Switch>
    </BrowserRouter>
  )

}

export default App;
