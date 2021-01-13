import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import Navbar from '../containers/NavbarContainer';
import Blog from '../containers/BlogContainer';
import NotFoundPage from '../components/NotFoundPage.js';

function BlogPage ({editBlog}) {
      
  //const { content, loading, error } = this.props.indexContent;
  const history = useHistory();

  React.useEffect(() => {
    if(editBlog.blog) {
      console.log("editBlog change!!!");
      history.push("/admin/blogs/");
    }
  }, [editBlog]);

  const { slug } = useParams();

  if(!slug) {
    return <div className="container"><h1>MeatSEO</h1><h3>Loading...</h3></div>      
  //} else if(error) {
  //  return <div className="alert alert-danger">Error: {error.message}</div>
  //} else if(!content) {
  //  return <NotFoundPage/>
  }
  

  return (
    <div>
      <Navbar pagename="CURRENT BLOG" />
      <p>{slug}</p>
      <Blog slug={slug}/>
    </div>
  );
}


const mapDispatchToProps = (dispatch) => {
  return {};
}


function mapStateToProps(state, ownProps) {
  return {
    editBlog: state.blogs.editBlog
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage);