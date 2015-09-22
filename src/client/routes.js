import App from './app/app.react';
import Projects from './pages/projects.react';
import Home from './pages/home.react';
import Test from './pages/test.react';
import Me from './pages/me.react';
import NotFound from './pages/notfound.react';
import React from 'react';
import Todos from './pages/todos.react';
import {DefaultRoute, NotFoundRoute, Route} from 'react-router';

export default (
  <Route handler={App} path="/">
    <DefaultRoute handler={Home} name="home" />
    <NotFoundRoute handler={NotFound} name="not-found" />
    <Route handler={Projects} name="projects" />
    <Route handler={Test} name="test" />
  </Route>
);
