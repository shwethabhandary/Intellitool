// pages/_error.js
import React from 'react';

class ErrorPage extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
  }

  render() {
    // Check if the error is a hydration error
    if (this.props.statusCode === 500) {
      // Suppress the error message and return null
      return null;
    }

    // Render default error message for other errors
    return (
      <div>
        <h1>{this.props.statusCode || 'Error'}</h1>
        <p>An error occurred on the server.</p>
      </div>
    );
  }
}

export default ErrorPage;
