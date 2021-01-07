
import './App.css';

import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import routes, { RouteType } from './utils/hooks/routes/routes';
import HeaderComponent from './components/HeaderComponent';
import React, { useEffect, useState } from 'react';
import auth from 'firebase';
import { firebaseAuth } from './config/firebase';
import { AppContext, AppContextInterface } from './store/AppContext';
import AuthRoute from './utils/hooks/routes/AuthRoute';
import GuestRoute from './utils/hooks/routes/GuestRoute';

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

            switch (route.routeType) {

              case RouteType.auth:
                return <AuthRoute
                  key={ route.path }
                  path={ route.path }
                  exact={ route.exact }
                  component={ route.component }
                />;

              case RouteType.guest:
                return <GuestRoute
                  key={ route.path }
                  path={ route.path }
                  exact={ route.exact }
                  component={ route.component }
                />;

              case RouteType.default:
                return <Route
                  key={ route.path }
                  path={ route.path }
                  exact={ route.exact }
                  component={ route.component }
                />

              default:
                return <Route
                  key={ route.path }
                  path={ route.path }
                  exact={ route.exact }
                  component={ route.component }
                />
            }
          }) }
        </Switch>
      </AppContext.Provider>
    </BrowserRouter>
  )

}

export default App;
