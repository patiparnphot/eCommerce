import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

export default class SideBar extends React.Component {
  
  componentDidMount(){
    
  }
  
  render() {
    
    //const { headerTag } = this.props;
    
    //if (!headerTag) {
    //  return <div/>
    //}

    const { pathname } = this.props
    
    return (
      <div className="sidebar" data-color="orange">
        <div className="logo">
          <a href="http://www.creative-tim.com" className="simple-text logo-mini">
            CT
          </a>
          <a href="http://www.creative-tim.com" className="simple-text logo-normal">
            Creative Tim
          </a>
        </div>
        <div className="sidebar-wrapper" id="sidebar-wrapper">
          <ul className="nav">
            <li className={pathname == "/admin/" ? "active" : ""}>
              <Link to="/admin/">
                <i className="now-ui-icons design_app"></i>
                <p>Dashboard</p>
              </Link>
            </li>
            <li className={pathname == "/admin/blogs" ? "active" : ""}>
              <Link to="/admin/blogs">
                <i className="now-ui-icons education_atom"></i>
                <p>Blogs</p>
              </Link>
            </li>
            <li className="active-pro">
              <a href="/">
                <i className="now-ui-icons arrows-1_cloud-download-93"></i>
                <p>Back to your Site</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
      
    );
  }
}
