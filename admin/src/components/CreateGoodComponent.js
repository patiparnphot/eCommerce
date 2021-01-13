import { Link } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
//import { Helmet } from 'react-helmet';


import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createGood, createGoodSuccess, createGoodFailure } from '../actions/goods';

const ROOT_URL = '/api';


function Submit(values, dispatch) {
  let newForm = values;
  newForm.rating = "0";
  newForm.ratingAmount = "0";
  newForm.raterAmount = "0";
  // let dt = new Date();
  // newForm.postedTime = dt.toISOString();
  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QzIiwiZmlyc3RuYW1lIjoiM3JkUGVvcGxlIiwibGFzdG5hbWUiOiJpc0hlcmUiLCJlbWFpbCI6IjNyZFBlb3BsZUBlbWFpbC5jb20iLCJhdmF0YXIiOiIzIHBhc3RlIGltZyBzcmMgaGVyZSIsImlzQWRtaW4iOmZhbHNlLCJhZGRyZXNzIjoiMTIzIHdvcnNoaW5ndG9uIG1hZGFnYXRnYSIsInBheXBhbCI6eyJ1c2VybmFtZSI6IjNyZHBheXBhbCJ9LCJjcmVkaXRDYXJkIjp7ImNhcmROdW1iZXIiOiIxMjM0NTY3ODkwMTIzNDU2IiwiZXhwaXJlZERhdGUiOiIxMi8yNCJ9LCJpYXQiOjE2MDUzNzMzMzd9.wfZxaBT6NWVjK6ydgVFmbLyQok2QjMZIDSeNo3rHE8E";
  console.log('newForm', newForm);
  dispatch(createGood(newForm, token)).then((response) => {
    if(response.payload.slug && (response.payload.slug == newForm.slug)) {
      console.log('newGoodResponse: ', response.payload);
      dispatch(createGoodSuccess(response.payload));
      alert("create good successful");
    } else if(response.error) {
      dispatch(createGoodFailure(response.payload));
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
  if (!values.description) {
    errors.description = 'Required'
  }
  if (!values.image) {
    errors.image = 'Required'
  }
  if (!values.category) {
    errors.category = 'Required'
  }
  if (!values.options || !values.options.length) {
    errors.options = { _error: 'At least one option must be entered' }
  } else {
    const optionsArrayErrors = []
    values.options.forEach((option, optionIndex) => {
      const optionErrors = {}
      if (!option || !option.key) {
        optionErrors.key = 'Required'
        optionsArrayErrors[optionIndex] = optionErrors
      }
      if (!option || !option.cost) {
        optionErrors.cost = 'Required'
        optionsArrayErrors[optionIndex] = optionErrors
      }
      if (!option || !option.aroma) {
        optionErrors.aroma = 'Required'
        optionsArrayErrors[optionIndex] = optionErrors
      }
      if (!option || !option.acidity) {
        optionErrors.acidity = 'Required'
        optionsArrayErrors[optionIndex] = optionErrors
      }
      if (!option || !option.fruity) {
        optionErrors.fruity = 'Required'
        optionsArrayErrors[optionIndex] = optionErrors
      }
    })
    if (optionsArrayErrors.length) {
      errors.options = optionsArrayErrors
    }
  }
  return errors
}

const renderField = ({ input, label, type, meta: { touched, error } }) => {
  return (
    <div className="row form-group">
      <label className="col-sm-2">{label}</label>
      <input {...input} type={type} placeholder={label} className="form-ctrl col-sm-6"/>
      {touched && error && <span>{error}</span>}
    </div>
  );
}

const renderOptions = ({fields, meta: {error, submitFailed}}) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Add Option
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((option, index) => (
      <li key={index}>
        <button type="button" title="Remove Option" onClick={() => fields.remove(index)}>X</button>
        <h4>Option #{index + 1}</h4>
        <Field name={`${option}.key`} type="text" label="option key" component={renderField}/>
        <Field name={`${option}.cost`} type="number" label="cost" component={renderField}/>
        <Field name={`${option}.aroma`} type="number" label="aroma score" component={renderField}/>
        <Field name={`${option}.acidity`} type="number" label="acidity score" component={renderField}/>
        <Field name={`${option}.fruity`} type="number" label="fruity score" component={renderField}/>
      </li>
    ))}
  </ul>
);

const renderSpecificOptions = ({fields, meta: {error, submitFailed}}) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>
        Add Specific Option
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((specificOption, index) => (
      <li key={index}>
        <button type="button" title="Remove Specific Option" onClick={() => fields.remove(index)}>X</button>
        <Field name={specificOption} type="text" label={`Specific Option #${index + 1}`} component={renderField}/>
      </li>
    ))}
    {error && <li className="error">{error}</li>}
  </ul>
);

class CreateGoodClass extends React.Component {
  render() {
    const {
      handleSubmit,
      submitting,
      placeholderSlug,
      placeholderTitleHtml,
      placeholderDescHtml,
      placeholderTitle,
      placeholderImage,
      placeholderDesc,
      placeholderCat,
      formButton
    } = this.props;
    return (
      <form onSubmit={handleSubmit(Submit)}>
        <Field name="slug" type="text" label={placeholderSlug} component={renderField} />
        <Field name="titleHtml" type="text" label={placeholderTitleHtml} component={renderField} />
        <Field name="descriptionHtml" type="text" label={placeholderDescHtml} component={renderField} />
        <Field name="title" type="text" label={placeholderTitle} component={renderField} />
        <Field name="image" type="text" label={placeholderImage} component={renderField} />
        <Field name="description" type="text" label={placeholderDesc} component={renderField} />
        <Field name="category" type="text" label={placeholderCat} component={renderField} />
        <FieldArray name="options" component={renderOptions} />
        <FieldArray name="specificOptions" component={renderSpecificOptions} />
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
  }

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetNewGood();
  }
  
  
  render() {
        
    return (
        <div className="form container">
          
          <h4>FormHead</h4>
          <p>Form Description</p>
          <CreateGoodForm
            placeholderSlug="slug param in url"
            placeholderTitleHtml="title for SEO"
            placeholderDescHtml="description for SEO"
            placeholderTitle="title of good"
            placeholderImage="src of good cover"
            placeholderDesc="description of good"
            placeholderCat="category of good"
            formButton="Confirm"
          />
        </div>
    )
  }
}