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
          <a className="simple-text logo-mini">
            OC
          </a>
          <a className="simple-text logo-normal">
            OCTORAX
          </a>
        </div>
        <div className="sidebar-wrapper" id="sidebar-wrapper">
          <ul className="nav">
            {/* <li className={pathname == "/admin/" ? "active" : ""}>
              <Link to="/admin/">
                <i className="now-ui-icons design_app"></i>
                <p>Orders</p>
              </Link>
            </li> */}
            <li className={pathname == "/admin/contents/index" ? "active" : ""}>
              <Link to="/admin/contents/index">
                <i className="now-ui-icons education_atom"></i>
                <p>Homepage</p>
              </Link>
            </li>
            <li className={pathname == "/admin/contents/template" ? "active" : ""}>
              <Link to="/admin/contents/template">
                <i className="now-ui-icons education_atom"></i>
                <p>Menu & Footer</p>
              </Link>
            </li>
            <li className={pathname == "/admin/goods" ? "active" : ""}>
              <Link to="/admin/goods">
                <i className="now-ui-icons education_atom"></i>
                <p>Products</p>
              </Link>
            </li>
            <li className={pathname == "/admin/goodCategories" ? "active" : ""}>
              <Link to="/admin/goodCategories">
                <i className="now-ui-icons education_atom"></i>
                <p>Product Categories</p>
              </Link>
            </li>
            <li className={pathname == "/admin/blogs" ? "active" : ""}>
              <Link to="/admin/blogs">
                <i className="now-ui-icons education_atom"></i>
                <p>Blogs</p>
              </Link>
            </li>
            {/* <li className={pathname == "/admin/author" ? "active" : ""}>
              <Link to="/admin/author">
                <i className="now-ui-icons education_atom"></i>
                <p>Author</p>
              </Link>
            </li> */}
            <li className={pathname == "/admin/contents/contactUs" ? "active" : ""}>
              <Link to="/admin/contents/contactUs">
                <i className="now-ui-icons education_atom"></i>
                <p>Contact</p>
              </Link>
            </li>
            <li>
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
