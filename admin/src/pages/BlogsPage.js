import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Navbar from '../containers/NavbarContainer';
import Blogs from '../containers/BlogsContainer';
import NotFoundPage from '../components/NotFoundPage.js';

class BlogsPage extends Component {
  
  componentDidMount() {
    //this.props.fetchIndexcontent();
  }
  
  render() {
    
    //const { content, loading, error } = this.props.indexContent;

    const { blogAmount } = this.props;

    if(!blogAmount) {
      return <div className="container"><h1>MeatSEO</h1><h3>Loading...</h3></div>      
    //} else if(error) {
    //  return <div className="alert alert-danger">Error: {error.message}</div>
    //} else if(!content) {
    //  return <NotFoundPage/>
    }
    
    // console.log('enter indexPage: ', this.props);
    
    return (
      <div>
        <Navbar pagename="ALL BLOGS" />
        <p>


        </p>
        <Link to="/admin/blogs/create/">Create New Blog</Link>
        <Blogs blogAmount={blogAmount} />
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {};
}


function mapStateToProps(state, ownProps) {
  return {
    blogAmount: ownProps.blogAmount
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogsPage);