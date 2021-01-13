import { Link } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
//import { Helmet } from 'react-helmet';


import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { editBlog, editBlogSuccess, editBlogFailure } from '../actions/blogs';


function Submit(values, dispatch) {
  let editedForm = values;
  editedForm.text = demo.executeSummernote("text");
  console.log('editedForm', editedForm);
  dispatch(editBlog(editedForm._id, editedForm)).then((response) => {
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
      <div className="row form-group">
        <label className="col-sm-2">{label}</label>
        <input {...input} type={type} placeholder={label} className="form-ctrl col-sm-6"/>
        {touched && error && <span>{error}</span>}
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
        <Field name="slug" type="text" label={placeholderSlug} component={renderField} />
        <Field name="titleHtml" type="text" label={placeholderTitleHtml} component={renderField} />
        <Field name="descriptionHtml" type="text" label={placeholderDescHtml} component={renderField} />
        <Field name="title" type="text" label={placeholderTitle} component={renderField} />
        <Field name="image" type="text" label={placeholderImage} component={renderField} />
        <Field name="text" type="textarea" label={placeholderText} component={renderField} />
        <Field name="type" type="text" label={placeholderType} component={renderField} />
        <button type="submit" disabled={ submitting }>{formButton}</button>
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
    
    const { blog } = this.props.activeBlog;
    
    if (!blog) {
      return <NotFoundPage/>
    }

    if (blog) {
      $(document).ready(function() {
        // Summernote editor
        demo.initSummernote("text", blog.text);
      });
    }
    
    return (
        <div className="form container">
          
          <h4>FormHead</h4>
          <p>Form Description</p>
          <EditBlogForm
            placeholderSlug="slug param in url"
            placeholderTitleHtml="title for SEO"
            placeholderDescHtml="description for SEO"
            placeholderTitle="title of blog"
            placeholderImage="src of blog cover"
            placeholderText="blog content"
            placeholderType="type of blog"
            initialValues={blog}
            formButton="Confirm"
          />
        </div>
    )
  }
}
