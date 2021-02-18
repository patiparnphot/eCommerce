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
        <Field name={`${field}.name`} type="text" label="NAME" component={renderField}/>
        <Field name={`${field}.first`} type="number" label="FIRST" component={renderField}/>
        <Field name={`${field}.last`} type="number" label="LAST" component={renderField}/>
        <Field name={`${field}.min`} type="number" label="MIN" component={renderField}/>
        <Field name={`${field}.max`} type="number" label="MAX" component={renderField}/>
      </li>
    ))}
  </ul>
);

const renderOptions = ({fields, meta: {error, submitFailed}}) => (
  <ul>
    <li>
      <button type="button" style={{backgroundColor: "lightgreen"}} onClick={() => fields.push()}>
        Add Option
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((option, index) => (
      <li key={index}>
        <button type="button" style={{backgroundColor: "orange"}} title="Remove Option" onClick={() => fields.remove(index)}>X</button>
        <Field name={option} type="text" label={`OPTION #${index + 1}`} component={renderField}/>
      </li>
    ))}
    {error && <li className="error">{error}</li>}
  </ul>
);

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
          
          <h4>{`PRODUCT CATEGORY: ${this.props.goodCategoryTitle}`}</h4>
          <EditGoodForm
            placeholderTitleHtml="SEO Title"
            placeholderDescHtml="Meta Description"
            placeholderTitle="TITLE"
            placeholderText="DESCRIPTION"
            initialValues={initialGood}
            formButton="Confirm"
          />
        </div>
    )
  }
}
