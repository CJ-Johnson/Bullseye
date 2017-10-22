import * as React from 'react';
import './Docs.css';
const logo = require('./logo.svg');

import Bullseye from '../..'


class Docs extends React.Component {
  render() {
    if (window) {
      return (
        <Bullseye
          target={(...args: any[]) => console.log('called target with ', {args})}
          width={500}
          height={500}
        />
      )
    }
    return (
      <div className="root">
        <div className="header">
          <img src={logo} className="logo" alt="logo" />
          <h2>Welcome to Docs</h2>
        </div>
      </div>
    );
  }
}

export default Docs;
