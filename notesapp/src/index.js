import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './AppTest';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css'

import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
