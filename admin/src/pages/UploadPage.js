import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetch from 'cross-fetch';
import { useParams, useHistory } from 'react-router-dom';

import Navbar from '../containers/NavbarContainer';
import NotFoundPage from '../components/NotFoundPage.js';

function UploadPage ({member}) {

  const [selectedFile, setSelectedFile] = React.useState("");
  const [imagePath, setImagePath] = React.useState("");
      
  //const { content, loading, error } = this.props.indexContent;
  // const history = useHistory();

  // React.useEffect(() => {
  //   if(editGood.good) {
  //     console.log("editGood change!!!");
  //     history.push("/admin/goods/");
  //   }
  // }, [editGood]);

  //if(!invoiceId) {
  //  return <div className="container"><h1>MeatSEO</h1><h3>Loading...</h3></div>      
  //} else if(error) {
  //  return <div className="alert alert-danger">Error: {error.message}</div>
  //} else if(!content) {
  //  return <NotFoundPage/>
  // }

  function onChangeHandler (event) {
    setSelectedFile(event.target.files[0]);
    // console.log(event.target.files[0]);
  }

  function onClickHandler () {
    const data = new FormData() ;
    data.append('image', selectedFile);
    if(selectedFile != "") {
      fetch('/upload', {
        method: 'POST',
        headers: {
          // 'Accept': 'application/json',
          // 'Content-Type': 'application/json',
          'Authorization': `Bearer ${member.token}`
        },
        body: data
      })
      .then(
        (response) => {
          if (response.status >= 400) {
            return response.text();
          } else {
            return response.json();
          }
        },
        error => console.log('An error occurred.', error)
      )
      .then(
        (json) => {
          if (json.originalname && (json.originalname == selectedFile.name)) {
            setImagePath("/upload/" + json.filename);
          } else {
            console.log(json);
          }
        }
      );
    }
  }
  

  return (
    <div className="container">
      <Navbar pagename="UPLOAD IMAGE" />
      <hr/>
      <div className="row">
        <div className="offset-md-3 col-md-6">
          <label>Upload your Image File</label>
          <input className="form-control" type="file" name="file" onChange={onChangeHandler}/>
          <button type="button" class="btn btn-success btn-block" onClick={onClickHandler}>Upload</button>
        </div>
        <hr/>
        {
          (
            imagePath != ""
          ) ? (
            <div className="col-sm-12">
              <img src={imagePath}/>
              <div>{imagePath}</div>
            </div>
          ) : (
            <div/>
          )}
      </div>
    </div>
  );
}


const mapDispatchToProps = (dispatch) => {
  return {};
}


function mapStateToProps(state, ownProps) {
  return {
    member: state.member
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadPage);