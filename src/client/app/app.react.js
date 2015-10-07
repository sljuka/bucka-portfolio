import '../../../assets/css/app.sass';
import Component from '../components/component.react';
import Footer from './footer.react';
import Header from './header.react';
import React from 'react';
import {RouteHandler} from 'react-router';
import {appState} from '../state';
import {measureRender} from '../console';

// All stores must be imported here.
import '../auth/store';
import '../examples/store';
import '../todos/store';
import '../users/store';
import '../menu/store';
import '../processPanel/store';

class App extends Component {

  render() {
    return (
      <div className="page container-fluid">
        <Header />
        <RouteHandler />
        <Footer />
      </div>
    );
  }

}

export default App;
