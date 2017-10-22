import * as React from 'react';
import './Docs.css';

const logo = require('./logo.svg');

class Docs extends React.Component {
  render() {
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
