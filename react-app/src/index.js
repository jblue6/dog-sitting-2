import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

import { InformationProvider } from './context/InformationContext'

ReactDOM.render(<InformationProvider><App /></InformationProvider>, document.getElementById('root'));
