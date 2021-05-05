import ReactDOM from 'react-dom';
import { BrowserRouter, Switch,Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import store from './redux/store'
import { Provider } from 'react-redux' 


ReactDOM.render((
 
 <Provider store={store}>
  <BrowserRouter>
    <App />
    
  </BrowserRouter>
  </Provider>

 
), document.getElementById('root'));

serviceWorker.unregister();
