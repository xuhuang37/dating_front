import * as React from "react";
import {isDev} from './utils/index';
import { Router,Route } from 'react-router';
import { observer, inject} from 'mobx-react';
import {createHashHistory} from 'history';
import {syncHistoryWithStore, RouterStore} from 'mobx-react-router';
import * as allStores from './stores';
import DevTools from 'mobx-react-devtools';

import "./App.css";

const hashHistory = createHashHistory();
const history = syncHistoryWithStore(hashHistory,allStores.routerStore)

interface AppProps {

}
const devtools = isDev ? <DevTools /> : null;
@inject('routerStore')
@observer
class App extends React.Component<AppProps> {
  render() {
    return (
      <Router history={history}>
        <div className="App">
        {devtools}
        <Route path="/" exact={true} component={}/>
      </div>
      </Router>
      
    );
  }
}
export default App;
