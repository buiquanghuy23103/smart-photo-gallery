
import "./assets/css/style.css";

import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import React, { useEffect, useState } from 'react';
import auth from 'firebase';
import { firebaseAuth } from './config/firebase';
import { AppContext, AppContextInterface } from './store/AppContext';
import LoadingComponent from './components/LoadingComponent';
import NotFoundPageComponent from './pages/NotFoundPageComponent';
import { motion } from 'framer-motion';
import routes, { RouteType } from './utils/routes/routes';
import AuthRoute from './utils/routes/AuthRoute';
import GuestRoute from './utils/routes/GuestRoute';
import AnimatedRoute from './utils/routes/AnimatedRoute';

function App(): JSX.Element {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<auth.User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const initAppContext: AppContextInterface = {
    isLoggedIn: isLoggedIn,
    user: user
  };

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged(user => {
      setIsLoading(false);
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    })
  }, []);

  if (isLoading) return <LoadingComponent />

  return (
    <BrowserRouter>
      <AppContext.Provider value={ initAppContext }>

        <HeaderComponent />
        <Switch>
          { routes.map((route) => {

            switch (route.routeType) {

              case RouteType.auth:
                return (<AuthRoute
                  key={ route.path }
                  path={ route.path }
                  exact={ route.exact }
                >
                  <route.component />
                </AuthRoute>
                );

              case RouteType.guest:
                return (<GuestRoute
                  key={ route.path }
                  path={ route.path }
                  exact={ route.exact }
                >

                  <route.component />
                </GuestRoute>);

              case RouteType.default:
                return (<AnimatedRoute
                  key={ route.path }
                  path={ route.path }
                  exact={ route.exact }
                >

                  <route.component />

                </AnimatedRoute>);
              default:
                return (<Route
                  key={ route.path }
                  path={ route.path }
                  exact={ route.exact }
                  component={ route.component }
                >
                  <motion.div
                    initial={ { x: 200 } }
                    animate={ {
                      x: 0,
                      transition: { duration: 1 }
                    } }
                  >
                    <route.component />
                  </motion.div>
                </Route>);
            }
          }) }

          <Route path="*" component={ NotFoundPageComponent } />
        </Switch>
      </AppContext.Provider>
    </BrowserRouter>
  )

}

export default App;
