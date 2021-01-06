
import './App.css';

import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import routes from './pages/route';


function App(): JSX.Element {

  return (
    <BrowserRouter>
      <Switch>
        { routes.map((route) =>
        (<Route
          path={ route.path }
          exact={ route.exact }
          component={ route.component }
        />)) }
      </Switch>
    </BrowserRouter>
  )

}

export default App;
