import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/home';
import Login from './pages/login';
import Cadastrar from './pages/cadastrar';
import NaoEncontrada from './pages/naoencontrada';
import Eventos from './pages/eventos';
import DashBoard from './pages/admin/dashboard';
import CrudCategorias from './pages/admin/crudcategorias';
import CrudEventos from './pages/admin/crudeventos';

import jwt_decode from 'jwt-decode';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

const RotaPrivada = ({component : Component, ...rest}) => (
  <Route
    {...rest}
    render = {
      props => 
      localStorage.getItem('token-nyous-tarde') !== null ?
        <Component {...props} /> :
        <Redirect to={{pathname : '/login', state :{from : props.location}}} /> 
    }
  />
);

const RotaPrivadaAdmin = ({component : Component, ...rest}) => (
  <Route
    {...rest}
    render = {
      props => 
      localStorage.getItem('token-nyous-tarde') !== null && jwt_decode(localStorage.getItem('token-nyous-tarde')).role === 'Admin' ?
        <Component {...props} /> :
        <Redirect to={{pathname : '/login', state :{from : props.location}}} /> 
    }
  />
);

const routing = (
  <Router>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/login'  component={Login} />
      <Route path='/cadastrar' component={Cadastrar} />
      <RotaPrivada path='/eventos' component={Eventos} />
      <RotaPrivadaAdmin path='/admin/dashboard' component={DashBoard} />
      <RotaPrivadaAdmin path='/admin/categorias' component={CrudCategorias} />
      <RotaPrivadaAdmin path='/admin/eventos' component={CrudEventos} />
      <Route component={NaoEncontrada} />
    </Switch>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
