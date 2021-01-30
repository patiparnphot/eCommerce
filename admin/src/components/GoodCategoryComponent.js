import { Link } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
//import { Helmet } from 'react-helmet';


import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
  editGoodCategory,
  editGoodCategorySuccess,
  editGoodCategoryFailure
} from '../actions/categories';


function Submit(values, dispatch) {
  let editedForm = { ...values };
  editedForm.text = demo.executeSummernote("text");
  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QzIiwiZmlyc3RuYW1lIjoiM3JkUGVvcGxlIiwibGFzdG5hbWUiOiJpc0hlcmUiLCJlbWFpbCI6IjNyZFBlb3BsZUBlbWFpbC5jb20iLCJhdmF0YXIiOiIzIHBhc3RlIGltZyBzcmMgaGVyZSIsImlzQWRtaW4iOmZhbHNlLCJhZGRyZXNzIjoiMTIzIHdvcnNoaW5ndG9uIG1hZGFnYXRnYSIsInBheXBhbCI6eyJ1c2VybmFtZSI6IjNyZHBheXBhbCJ9LCJjcmVkaXRDYXJkIjp7ImNhcmROdW1iZXIiOiIxMjM0NTY3ODkwMTIzNDU2IiwiZXhwaXJlZERhdGUiOiIxMi8yNCJ9LCJpYXQiOjE2MDUzNzMzMzd9.wfZxaBT6NWVjK6ydgVFmbLyQok2QjMZIDSeNo3rHE8E";
  console.log('editedForm', editedForm);
  dispatch(editGoodCategory(editedForm._id, editedForm, editedForm.token)).then((response) => {
    if(response.payload.title && (response.payload.title == editedForm.title)) {
      console.log('editGoodCategoryResponse: ', response.payload);
      dispatch(editGoodCategorySuccess(response.payload));
      alert("edited good category successful");
    } else if(response.error) {
      dispatch(editGoodCategoryFailure(response.payload));
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

class EditGoodClass extends React.Component {
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

const EditGoodForm = reduxForm({
  form: "EditGoodForm",
  validate
})(EditGoodClass);


export default class GoodPage extends React.Component {

  componentDidMount() {
    this.props.fetchGoodCategory(this.props.goodCategoryTitle);
  }

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetActiveGoodCategory();
    this.props.resetEditedGoodCategory();
  }
  
  
  render() {
    
    const { good } = this.props.activeCategory;
    const { token } = this.props.member;
    const initialGood = { ...good, token: token };
    
    if (!good || !token) {
      return <NotFoundPage/>
    }
    
    if (good) {
      $(document).ready(function() {
        // Summernote editor
        demo.initSummernote("text", good.text);
      });
    }
    
    return (
        <div className="form container">
          
          <h4>FormHead</h4>
          <p>Form Description</p>
          <EditGoodForm
            placeholderTitleHtml="title for SEO"
            placeholderDescHtml="description for SEO"
            placeholderTitle="title of good"
            placeholderText="Category Content"
            initialValues={initialGood}
            formButton="Confirm"
          />
        </div>
    )
  }
}
