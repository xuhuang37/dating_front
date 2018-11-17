import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './App';
import * as allStores from './stores';
import './index.css';
import registerServiceWorker from './utils/registerServiceWorker';

ReactDOM.render(
  <Provider {...allStores}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
