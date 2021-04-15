import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import SignIn from './SignIn/SignIn';
import Home from './Home/Home';
import NotFound from './NotFound/NotFound';
import Header from '../Components/Header';

export default function App() {
  const isLoggedIn = useSelector(
    (state) => {
      const loggedInUser = JSON.parse(localStorage.getItem('redux'));

      return (
        (loggedInUser && !!loggedInUser.isLoggedIn) || state.user.isLoggedIn
      );
    }
    // && state.user.jwt !== null
  );

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect exact to='/' />
        )
      }
    />
  );

  return (
    <Container maxWidth='lg'>
      <Header isLoggedIn={isLoggedIn} />
      <Switch>
        <Route exact path='/' component={SignIn} />
        <PrivateRoute path='/Home' component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Container>
  );
}
