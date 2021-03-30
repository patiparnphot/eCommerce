import { Link } from 'react-router-dom';
import Loader from './loader';
//import { Helmet } from 'react-helmet';


import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
  createGoodCategory,
  createGoodCategorySuccess,
  createGoodCategoryFailure
} from '../actions/categories';


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
  if (values.features && values.features.length) {
    const featuresArrayErrors = []
    values.features.forEach((feature, featureIndex) => {
      const featureErrors = {}
      if (!feature || !feature.name) {
        featureErrors.name = 'Required'
        featuresArrayErrors[featureIndex] = featureErrors
      }
      if (!feature || !feature.first) {
        featureErrors.first = 'Required'
        featuresArrayErrors[featureIndex] = featureErrors
      }
      if (!feature || !feature.last) {
        featureErrors.last = 'Required'
        featuresArrayErrors[featureIndex] = featureErrors
      }
      if (!feature || !feature.min) {
        featureErrors.min = 'Required'
        featuresArrayErrors[featureIndex] = featureErrors
      }
      if (!feature || !feature.max) {
        featureErrors.max = 'Required'
        featuresArrayErrors[featureIndex] = featureErrors
      }
    })
    if (featuresArrayErrors.length) {
      errors.features = featuresArrayErrors
    }
  }
  if (!values.options || !values.options.length) {
    errors.options = { _error: 'At least one option must be entered' }
  } else {
    const optionsArrayErrors = []
    values.options.forEach((option, optionIndex) => {
      if (!option || !option.length) {
        optionsArrayErrors[optionIndex] = 'Required'
      }
    })
    if (optionsArrayErrors.length) {
      errors.options = optionsArrayErrors
    }
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

const renderFeatures = ({fields, meta: {error, submitFailed}}) => (
  <ul>
    <li>
      <button type="button" style={{backgroundColor: "lightgreen"}} onClick={() => fields.push({})}>
        Add Feature
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((field, index) => (
      <li key={index}>
        <button type="button" style={{backgroundColor: "orange"}} title="Remove Feature" onClick={() => fields.remove(index)}>X</button>
        <h4>FEATURE #{index + 1}</h4>
        <Field name={`${field}.name`} type="text" label="NAME*(no spacebar or symbol)" component={renderField}/>
        <Field name={`${field}.first`} type="number" label="FIRST*" component={renderField}/>
        <Field name={`${field}.last`} type="number" label="LAST*" component={renderField}/>
        <Field name={`${field}.min`} type="number" label="MIN*" component={renderField}/>
        <Field name={`${field}.max`} type="number" label="MAX*" component={renderField}/>
      </li>
    ))}
  </ul>
);

const renderOptions = ({fields, meta: {error, submitFailed}}) => (
  <ul>
    <li>
      <button type="button" style={{backgroundColor: "lightgreen"}} onClick={() => fields.push()}>
        Add Option*
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((option, index) => (
      <li key={index}>
        <button type="button" style={{backgroundColor: "orange"}} title="Remove Option" onClick={() => fields.remove(index)}>X</button>
        <Field name={option} type="text" label={`OPTION #${index + 1}*`} component={renderField}/>
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
      placeholderTitleHtml,
      placeholderDescHtml,
      placeholderTitle,
      placeholderText,
      formButton
    } = this.props;
    return (
      <form onSubmit={handleSubmit(Submit)}>
        <div className="col-sm-12" style={{backgroundColor: "white", margin: "10px"}}>
          <h4>SEO</h4>
          <Field name="titleHtml" type="text" label={placeholderTitleHtml} component={renderField} />
          <Field name="descriptionHtml" type="text" label={placeholderDescHtml} component={renderField} />
        </div>
        <div className="col-sm-12" style={{backgroundColor: "white", margin: "10px"}}>
          <h4>PRODUCT CATEGORY INFO.</h4>
          <Field name="title" type="text" label={placeholderTitle} component={renderField} />
          <Field name="text" type="textarea" label={placeholderText} component={renderField} />
          <FieldArray name="options" component={renderOptions} />
          <FieldArray name="features" component={renderFeatures} />
        </div>
        <button type="submit" style={{backgroundColor: "orange"}} disabled={ submitting }>{formButton}</button>
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
    
    const { token } = this.props.member;

    if (!token) {
      return <Loader/>
    } else {
        
      return (
        <div className="form container">
          
          <h4>CREATE PRODUCT CATEGORY</h4>
          <span>( * = Required field )</span>
          <CreateGoodForm
            placeholderTitleHtml="SEO Title*"
            placeholderDescHtml="Meta Description*"
            placeholderTitle="TITLE* (no spacebar and /)"
            placeholderText="DESCRIPTION"
            initialValues={{token: token}}
            formButton="Confirm"
          />
        </div>
      );
    }
  }
}
