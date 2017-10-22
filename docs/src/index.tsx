import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Docs from './Docs';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <Docs />,
  document.getElementById('root') as HTMLElement,
);

registerServiceWorker();
