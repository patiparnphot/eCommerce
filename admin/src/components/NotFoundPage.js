import React from 'react';
import { Link } from 'react-router-dom';

export default class NotFoundPage extends React.Component {
  render() {
    return (
      <div className="not-found">
        <h1>404</h1>
        <h2>Page not found!</h2>
        <p>
          <a href="/">Go back to the main page</a>
        </p>
      </div>
    );
  }
}