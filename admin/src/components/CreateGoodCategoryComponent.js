import { Link } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
//import { Helmet } from 'react-helmet';


import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
  createGoodCategory,
  createGoodCategorySuccess,
  createGoodCategoryFailure
} from '../actions/categories';

const ROOT_URL = '/api';


function Submit(values, dispatch) {
  let newForm = { ...values };
  newForm.text = demo.executeSummernote("text");
  newForm.categoryType = "good";
  newForm.token = undefined;
  // let dt = new Date();
  // newForm.postedTime = dt.toISOString();
  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QzIiwiZmlyc3RuYW1lIjoiM3JkUGVvcGxlIiwibGFzdG5hbWUiOiJpc0hlcmUiLCJlbWFpbCI6IjNyZFBlb3BsZUBlbWFpbC5jb20iLCJhdmF0YXIiOiIzIHBhc3RlIGltZyBzcmMgaGVyZSIsImlzQWRtaW4iOmZhbHNlLCJhZGRyZXNzIjoiMTIzIHdvcnNoaW5ndG9uIG1hZGFnYXRnYSIsInBheXBhbCI6eyJ1c2VybmFtZSI6IjNyZHBheXBhbCJ9LCJjcmVkaXRDYXJkIjp7ImNhcmROdW1iZXIiOiIxMjM0NTY3ODkwMTIzNDU2IiwiZXhwaXJlZERhdGUiOiIxMi8yNCJ9LCJpYXQiOjE2MDUzNzMzMzd9.wfZxaBT6NWVjK6ydgVFmbLyQok2QjMZIDSeNo3rHE8E";
  console.log('newForm', newForm);
  dispatch(createGoodCategory(newForm, values.token)).then((response) => {
    if(response.payload.title && (response.payload.title == newForm.title)) {
      console.log('newCategoryResponse: ', response.payload);
      dispatch(createGoodCategorySuccess(response.payload));
      alert("create good category successful");
    } else if(response.error) {
      dispatch(createGoodCategoryFailure(response.payload));
      alert(response.error);
    } else {
      console.log("forDEV: ", response.payload);
      alert("please check title field that it's duplicated or not");
    }
  });
}

const validate = values => {
  const errors = {}
  if (!values.titleHtml) {
    errors.titleHtml = 'Required'
  }
  if (!values.descriptionHtml) {
    errors.descriptionHtml = 'Required'
  }
  if (!values.title) {
    errors.title = 'Required'
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

class CreateGoodClass extends React.Component {
  render() {
    const {
      handleSubmit,
      submitting,
      placeholderTitleHtml,
      placeholderDescHtml,
      placeholderTitle,
      placeholderText,
      formButton
    } = this.props;
    console.log(JSON.stringify(handleSubmit));
    return (
      <form onSubmit={handleSubmit(Submit)}>
        <Field name="titleHtml" type="text" label={placeholderTitleHtml} component={renderField} />
        <Field name="descriptionHtml" type="text" label={placeholderDescHtml} component={renderField} />
        <Field name="title" type="text" label={placeholderTitle} component={renderField} />
        <Field name="text" type="textarea" label={placeholderText} component={renderField} />
        <button type="submit" disabled={ submitting }>{formButton}</button>
      </form>
    )
  }
}

const CreateGoodForm = reduxForm({
  form: "CreateGoodForm",
  validate
})(CreateGoodClass);


export default class CreateGood extends React.Component {
  
  componentDidMount() {
    $(document).ready(function() {
      // Summernote editor
      demo.initSummernote("text");
    });
  }

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetNewGoodCategory();
  }
  
  
  render() {
        
    return (
        <div className="form container">
          
          <h4>FormHead</h4>
          <p>Form Description</p>
          <CreateGoodForm
            placeholderTitleHtml="title for SEO"
            placeholderDescHtml="description for SEO"
            placeholderTitle="title of good"
            placeholderText="Category content"
            initialValues={{token: this.props.member.token}}
            formButton="Confirm"
          />
        </div>
    )
  }
}
