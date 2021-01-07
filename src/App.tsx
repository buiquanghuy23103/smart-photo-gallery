
import './App.css';

import {
  BrowserRouter,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import routes from './utils/hooks/routes/routes';
import HeaderComponent from './components/HeaderComponent';
import React, { useEffect, useState } from 'react';
import auth from 'firebase';
import { firebaseAuth } from './config/firebase';
import { AppContext, AppContextInterface } from './store/AppContext';
import AuthRoute from './utils/hooks/routes/AuthRoute';

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
      <AppContext.Provider value={ initAppContext }>

        <HeaderComponent />
        <Switch>
          { routes.map((route) => {

            if (route.path === "/login") {
              if (isLoggedIn) return <Redirect to="/" />
            }

            if (route.path === "/gallery") {
              return <AuthRoute
                key={ route.path }
                path={ route.path }
                exact={ route.exact }
                component={ route.component }
              />

            }

            return <Route
              key={ route.path }
              path={ route.path }
              exact={ route.exact }
              component={ route.component }
            />

          }) }
        </Switch>
      </AppContext.Provider>
    </BrowserRouter>
  )

}

export default App;
