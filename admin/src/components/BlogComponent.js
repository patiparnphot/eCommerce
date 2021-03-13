import { Link } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import Loader from './loader';


import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import UploadPage from '../pages/UploadPage';
import { editBlog, editBlogSuccess, editBlogFailure } from '../actions/blogs';


function Submit(values, dispatch) {
  let editedForm = { ...values };
  editedForm.text = demo.executeSummernote("text");
  console.log('editedForm', editedForm);
  dispatch(editBlog(editedForm._id, editedForm, editedForm.token)).then((response) => {
    if(response.payload.slug && (response.payload.slug == editedForm.slug)) {
      console.log('editBlogResponse: ', response.payload);
      dispatch(editBlogSuccess(response.payload));
      alert("edited blog successful");
    } else if(response.error) {
      dispatch(editBlogFailure(response.payload));
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

class EditBlogClass extends React.Component {
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

const EditBlogForm = reduxForm({
  form: "EditBlogForm",
  validate
})(EditBlogClass);


export default class BlogPage extends React.Component {
  
  componentDidMount() {
    this.props.fetchBlog(this.props.blogSlug);
  }

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetActiveBlog();
    this.props.resetEditedBlog();
  }
  
  
  render() {
    
    const { blog, loading } = this.props.activeBlog;
    const { token } = this.props.member;
    const initialBlog = { ...blog, token: token };
    
    if (loading || !token) {
      return <Loader/>
    } else if (!blog) {
      return <NotFoundPage/>
    } else if (blog) {
      $(document).ready(function() {
        // Summernote editor
        demo.initSummernote("text", blog.text);
      });
    
      return (
        <div className="form container">
          
          <h4>{`Blog: ${this.props.blogSlug}`}</h4>
          <UploadPage/>
          <span>( * = Required field )</span>
          <EditBlogForm
            placeholderSlug="SLUG* (no spacebar and /)"
            placeholderTitleHtml="SEO Title*"
            placeholderDescHtml="Meta Description*"
            placeholderTitle="TITLE*"
            placeholderImage="BLOG COVER IMG* (850x950 px)"
            placeholderText="BLOG CONTENT*"
            placeholderType="CATEGORY*"
            initialValues={initialBlog}
            formButton="Confirm"
          />
        </div>
      );
    }
  }
}
