import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/Store';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
