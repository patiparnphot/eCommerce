import React from 'react';

export default class LoaderPage extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>LOADING . . .</h1>
        <div style={{margin: "auto"}}>
            <img src="/images/preloader.gif"/>
        </div>
      </div>
    );
  }
}
