import { Link } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
//import { Helmet } from 'react-helmet';


import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createBlog, createBlogSuccess, createBlogFailure } from '../actions/blogs';

const ROOT_URL = '/api';


function Submit(values, dispatch) {
  let newForm = values;
  newForm.text = demo.executeSummernote("text");
  newForm.author = {
    image: "/img/team-1.jpg",
    name: "Harvard milan",
    description: "Second divided from form fish beast made. Every of seas all gathered use saying you're"
  };
  let dt = new Date();
  newForm.postedTime = dt.toISOString();
  console.log('newForm', newForm);
  dispatch(createBlog(newForm)).then((response) => {
    console.log('newBlogResponse: ', response.payload);
    !response.error ? dispatch(createBlogSuccess(response.payload)) : dispatch(createBlogFailure(response.payload));
  });
}

const renderField = ({ input, label, type }) => {
  if (type == "textarea") {
    return (
      <div className={"form-group " + input.name}>
        <textarea className="form-control summernote"/>
      </div>
    );
  } else {
    return (
      <div className="form-group">
        <input {...input} type={type} placeholder={label} className="form-control"/>
      </div>
    );
  }
}

class SendUsMessage extends React.Component {
  render() {
    const {
      handleSubmit,
      submitting,
      placeholderSlug,
      placeholderTitleHtml,
      placeholderDescHtml,
      placeholderTitle,
      placeholderImage,
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
        <Field name="text" type="textarea" component={renderField} />
        <Field name="type" type="text" label={placeholderType} component={renderField} />
        <button type="submit" disabled={ submitting }>{formButton}</button>
      </form>
    )
  }
}

const SendUsMessageForm = reduxForm({
  form: "SendUsMessage"
})(SendUsMessage);


export default class BlogPage extends React.Component {
  
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
        
    return (
        <div className="form">
          
          <h4>FormHead</h4>
          <p>Form Description</p>
          <SendUsMessageForm
            placeholderSlug="slug param in url"
            placeholderTitleHtml="title for SEO"
            placeholderDescHtml="description for SEO"
            placeholderTitle="title of blog"
            placeholderImage="src of blog cover"
            placeholderType="type of blog"
            formButton="Confirm"
          />
        </div>
    )
  }
}
