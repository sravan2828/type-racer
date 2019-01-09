import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import "./App.css"
import Reducer from './redux/Reducer';
import TypeRacerContainer from "./container/TypeRacerContainer";
const store = createStore(Reducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <TypeRacerContainer/>
      </Provider>
    );
  }
}
