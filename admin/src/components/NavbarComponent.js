import React from 'react';
import fetch from 'cross-fetch';


export default class Navbar extends React.Component {
  
  componentDidMount() {}
  
  updateJsonFile (file) {
      fetch(`/api/${file}/updateJsonFile`)
      .then(response => console.log(response), error => console.log('An error occurred.', error));
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
              <button type="button" className="navbar-toggler" onClick={this.props.toggleNavbar} >
                <span className="navbar-toggler-bar bar1"></span>
                <span className="navbar-toggler-bar bar2"></span>
                <span className="navbar-toggler-bar bar3"></span>
              </button>
            </div>
            <a className="navbar-brand">{pagename}</a>
          </div>
          
          <button class="navbar-btn" onClick={() => this.updateJsonFile("goods/categories")}>
            Category
          </button>
          <button class="navbar-btn" onClick={() => this.updateJsonFile("blogs")}>
            Blog
          </button>
          <button class="navbar-btn" onClick={() => this.updateJsonFile("goods")}>
            Product
          </button>
          <button class="navbar-btn" onClick={() => this.updateJsonFile("contents")}>
            Content
          </button>

        </div>
      </nav>
    )
  }
}


