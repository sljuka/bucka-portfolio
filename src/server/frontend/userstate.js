import config from '../config';
import Promise from 'bluebird';
import Immutable from 'immutable';
import {get} from '../../lib/api'

// Example how initialState, which is the same for all users, is enriched with
// user state. With state-less Flux, we don't need instances.
export default function userState() {

  return (req, res, next) => {
    loadUserData(req).then(loadedData => {
      req.userState = Immutable.Map().merge(...loadedData);
      next();
    });
  };

}

// Gracefully settle all promises, ignore failed.
function loadUserData(req) {
  const dataSources = [
    acceptLanguages(req),
    loadProcesses()
  ];

  return Promise.settle(dataSources).then(receivedData =>
    receivedData
      .filter(promise => promise.isFulfilled())
      .map(promise => promise.value())
  );
}

function acceptLanguages(req) {
  const acceptsLanguages = req.acceptsLanguages(config.appLocales);

  return {
    i18n: {
      locales: acceptsLanguages || config.defaultLocale
    }
  };
}

// Simulate async action.
function loadProcesses() {
  return new Promise((resolve, reject) => {
    get('http://localhost:8000/api/v1/processes')
      .then(response => resolve(response.json()))
      .catch(ex => console.error(`GET is not working ${ex}`))
  })
}
