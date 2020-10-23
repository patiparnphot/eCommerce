import React from 'react';


export default class Navbar extends React.Component {
  
  componentDidMount() {
     
  }
  
    
  render() {
    
    const { pagename } = this.props;
    
    //if (!intro) {
    //  return <div/>
    //}
    
    return (
      <nav className="navbar navbar-expand-lg navbar-transparent  bg-primary  navbar-absolute">
        <div className="container-fluid">
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button type="button" className="navbar-toggler">
                <span className="navbar-toggler-bar bar1"></span>
                <span className="navbar-toggler-bar bar2"></span>
                <span className="navbar-toggler-bar bar3"></span>
              </button>
            </div>
            <a className="navbar-brand" href="#">{pagename}</a>
          </div>
        </div>
      </nav>
    )
  }
}


