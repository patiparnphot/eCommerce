import { Link } from 'react-router-dom';
import Loader from './loader';
//import { Helmet } from 'react-helmet';


import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import UploadPage from '../pages/UploadPage';
import { createBlog, createBlogSuccess, createBlogFailure } from '../actions/blogs';

const ROOT_URL = '/api';


function Submit(values, dispatch) {
  let newForm = { ...values };
  newForm.text = demo.executeSummernote("text");
  newForm.author = {
    image: "/img/team-1.jpg",
    name: "Harvard milan",
    description: "Second divided from form fish beast made. Every of seas all gathered use saying you're"
  };
  newForm.token = undefined;
  // let dt = new Date();
  // newForm.postedTime = dt.toISOString();
  console.log('newForm', newForm);
  dispatch(createBlog(newForm, values.token)).then((response) => {
    if(response.payload.slug && (response.payload.slug == newForm.slug)) {
      console.log('newBlogResponse: ', response.payload);
      dispatch(createBlogSuccess(response.payload));
      alert("create blog successful");
    } else if(response.error) {
      dispatch(createBlogFailure(response.payload));
      alert(response.error);
    } else {
      console.log("forDEV: ", response.payload);
      alert("please check slug field that it's duplicated or not");
    }
  });
}

const validate = values => {
  const errors = {}
  if (!values.slug) {
    errors.slug = 'Required'
  }
  if (!values.titleHtml) {
    errors.titleHtml = 'Required'
  }
  if (!values.descriptionHtml) {
    errors.descriptionHtml = 'Required'
  }
  if (!values.title) {
    errors.title = 'Required'
  }
  if (!values.image) {
    errors.image = 'Required'
  }
  if (!values.type) {
    errors.type = 'Required'
  }
  
  return errors
}

const renderField = ({ input, label, type, meta: { touched, error } }) => {
  if (type == "textarea") {
    return (
      <div>
        <label>{label}</label>
        <div className={"form-group " + input.name}>
          <textarea className="form-ctrl summernote"/>
        </div>
      </div>
    );
  } else {
    return (
      <div className="row form-group" style={{backgroundColor: "lightblue", width: "90%", marginLeft: "10px"}}>
        <label className="col-sm-3">{label}</label>
        <input {...input} type={type} placeholder={label} className="form-ctrl col-sm-9"/>
        {touched && error && <span style={{color: "red"}}><b>{error}</b></span>}
      </div>
    );
  }
}

class CreateBlogClass extends React.Component {
  render() {
    const {
      handleSubmit,
      submitting,
      placeholderSlug,
      placeholderTitleHtml,
      placeholderDescHtml,
      placeholderTitle,
      placeholderImage,
      placeholderText,
      placeholderType,
      formButton
    } = this.props;
    return (
      <form onSubmit={handleSubmit(Submit)}>
        <div className="col-sm-12" style={{backgroundColor: "white", margin: "10px"}}>
          <h4>SEO</h4>
          <Field name="titleHtml" type="text" label={placeholderTitleHtml} component={renderField} />
          <Field name="descriptionHtml" type="text" label={placeholderDescHtml} component={renderField} />
          <Field name="slug" type="text" label={placeholderSlug} component={renderField} />
        </div>
        <div className="col-sm-12" style={{backgroundColor: "white", margin: "10px"}}>
          <h4>BLOG INFO.</h4>
          <Field name="title" type="text" label={placeholderTitle} component={renderField} />
          <Field name="image" type="text" label={placeholderImage} component={renderField} />
          <Field name="text" type="textarea" label={placeholderText} component={renderField} />
          <Field name="type" type="text" label={placeholderType} component={renderField} />
        </div>
        <button type="submit" style={{backgroundColor: "orange"}} disabled={ submitting }>{formButton}</button>
      </form>
    )
  }
}

const CreateBlogForm = reduxForm({
  form: "CreateBlogForm",
  validate
})(CreateBlogClass);


export default class CreateBlog extends React.Component {
  
  componentDidMount() {
    $(document).ready(function() {
      // Summernote editor
      demo.initSummernote("text");
    });
  }

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetNewBlog();
  }
  
  
  render() {
    
    const { token } = this.props.member;

    if (!token) {
      return <Loader/>
    } else {
        
      return (
          <div className="form container">
            
            <h4>CREATE BLOG</h4>
            <UploadPage/>
            <span>( * = Required field )</span>
            <CreateBlogForm
              placeholderSlug="SLUG* (no spacebar and /)"
              placeholderTitleHtml="SEO Title*"
              placeholderDescHtml="Meta Description*"
              placeholderTitle="TITLE*"
              placeholderImage="BLOG COVER IMG* (850x950 px)"
              placeholderText="BLOG CONTENT*"
              placeholderType="CATEGORY*"
              initialValues={{token: token}}
              formButton="Confirm"
            />
          </div>
      );
    }
  }
}
