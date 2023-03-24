import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider } from 'antd';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b',
        },
      }}  
    >
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </ConfigProvider>
  </>
);

