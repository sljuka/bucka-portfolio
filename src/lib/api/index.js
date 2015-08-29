import 'isomorphic-fetch'
import {apiUrl} from './paths'

export function getJSON(path, params, options) {
  get(path, params, options)
}

export function get(path, params, options) {
  return fetch(path)
}

export function putJSON() {

}

export function put() {

}

export function postJSON() {

}

export function post() {

}
