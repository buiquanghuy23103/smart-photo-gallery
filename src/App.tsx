
import './App.css';

import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import routes from './pages/route';
import HeaderComponent from './components/HeaderComponent';
import React, { useEffect, useState } from 'react';
import auth from 'firebase';
import { firebaseAuth } from './config/firebase';

export interface AppContextInterface {
  isLoggedIn: boolean,
  user: auth.User | null
}

export const appContext = React.createContext<AppContextInterface | null>(null);

function App(): JSX.Element {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<auth.User | null>(null);

  const initAppContext: AppContextInterface = {
    isLoggedIn: isLoggedIn,
    user: user
  };

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    })
  });

  return (
    <BrowserRouter>
      <appContext.Provider value={ initAppContext }>

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
      </appContext.Provider>
    </BrowserRouter>
  )

}

export default App;
