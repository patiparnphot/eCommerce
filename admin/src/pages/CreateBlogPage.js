import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Navbar from '../containers/NavbarContainer';
import Create from '../containers/CreateBlogContainer';
import NotFoundPage from '../components/NotFoundPage.js';

function CreatePage ({newBlog}) {  

  const history = useHistory();

  React.useEffect(() => {
    if(newBlog.blog) {
      console.log("newBlog change!!!");
      history.push("/admin/blogs/");
    }
  }, [newBlog]);

  return (
    <div>
      <Create/>
    </div>
  );
}


const mapDispatchToProps = (dispatch) => {
  return {};
}


function mapStateToProps(state, ownProps) {
  return {
    newBlog: state.blogs.newBlog
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage);