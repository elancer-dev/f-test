import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './utils/reducer';
import PathFinder from './containers/path-finder/path-finder';
import * as serviceWorker from './serviceWorker';

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(<Provider store={store}><PathFinder /></Provider>, document.getElementById('app'));

serviceWorker.unregister();