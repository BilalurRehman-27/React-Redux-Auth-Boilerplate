import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import SignIn from './SignIn/SignIn';
import Home from './Home/Home';
import ViewOrders from './ViewOrders/ViewOrders';
import NotFound from './NotFound/NotFound';
import Header from '../Components/Header';

export default function App() {
  const isLoggedIn = useSelector(
    (state) => {
      const loggedInUser = JSON.parse(localStorage.getItem('redux'));
      return (
        (loggedInUser && !!loggedInUser.user.isLoggedIn) ||
        state.user.isLoggedIn
      );
    }
    // && state.user.jwt !== null
  );

  const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
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
  };

  return (
    <Container maxWidth='xl'>
      <Box style={{ marginBottom: '10px' }}>
        <Header isLoggedIn={isLoggedIn} />
      </Box>
      <Switch>
        <Route exact path='/' component={SignIn} />
        <PrivateRoute path='/Home' component={Home} />
        <PrivateRoute path='/ViewOrders' component={ViewOrders} />
        <Route component={NotFound} />
      </Switch>
    </Container>
  );
}
