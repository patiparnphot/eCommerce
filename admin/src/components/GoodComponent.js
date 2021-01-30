import { Link } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
//import { Helmet } from 'react-helmet';


import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { editGood, editGoodSuccess, editGoodFailure } from '../actions/goods';


function Submit(values, dispatch) {
  let editedForm = { ...values };
  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QzIiwiZmlyc3RuYW1lIjoiM3JkUGVvcGxlIiwibGFzdG5hbWUiOiJpc0hlcmUiLCJlbWFpbCI6IjNyZFBlb3BsZUBlbWFpbC5jb20iLCJhdmF0YXIiOiIzIHBhc3RlIGltZyBzcmMgaGVyZSIsImlzQWRtaW4iOmZhbHNlLCJhZGRyZXNzIjoiMTIzIHdvcnNoaW5ndG9uIG1hZGFnYXRnYSIsInBheXBhbCI6eyJ1c2VybmFtZSI6IjNyZHBheXBhbCJ9LCJjcmVkaXRDYXJkIjp7ImNhcmROdW1iZXIiOiIxMjM0NTY3ODkwMTIzNDU2IiwiZXhwaXJlZERhdGUiOiIxMi8yNCJ9LCJpYXQiOjE2MDUzNzMzMzd9.wfZxaBT6NWVjK6ydgVFmbLyQok2QjMZIDSeNo3rHE8E";
  console.log('editedForm', editedForm);
  dispatch(editGood(editedForm._id, editedForm, editedForm.token)).then((response) => {
    if(response.payload.slug && (response.payload.slug == editedForm.slug)) {
      console.log('editGoodResponse: ', response.payload);
      dispatch(editGoodSuccess(response.payload));
      alert("edited good successful");
    } else if(response.error) {
      dispatch(editGoodFailure(response.payload));
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

const renderField = ({ input, label, allCat, type, meta: { touched, error } }) => {
  if (type == "select") {
    return (
      <div className="row form-group">
        <label className="col-sm-2">{label}</label>
        <select {...input} className="form-ctrl col-sm-6">
          {allCat.map((cat) => {
            return (<option value={cat}>{cat}</option>);
          })}
        </select>
        {touched && error && <span>{error}</span>}
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

class EditGoodClass extends React.Component {
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
      placeholderAvai,
      allCat,
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
        <Field name="category" type="select" label={placeholderCat} allCat={allCat} component={renderField} />
        <FieldArray name="options" component={renderOptions} />
        <FieldArray name="specificOptions" component={renderSpecificOptions} />
        <Field name="isAvailable" type="checkbox" label={placeholderAvai} component={renderField} />
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
    this.props.fetchGood(this.props.goodSlug);
    this.props.fetchGoodCategoryTitles();
  }

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetActiveGood();
    this.props.resetEditedGood();
  }
  
  
  render() {
    
    const { good } = this.props.activeGood;
    const { token } = this.props.member;
    const initialGood = { ...good, token: token };
    const { data } = this.props.allCat;

    if (!good || !token || !data) {
      return <NotFoundPage/>
    }

    
    return (
        <div className="form container">
          
          <h4>FormHead</h4>
          <p>Form Description</p>
          <EditGoodForm
            placeholderSlug="slug param in url"
            placeholderTitleHtml="title for SEO"
            placeholderDescHtml="description for SEO"
            placeholderTitle="title of good"
            placeholderImage="src of good cover"
            placeholderDesc="description of good"
            placeholderCat="category of good"
            placeholderAvai="show this good"
            initialValues={initialGood}
            allCat={data}
            formButton="Confirm"
          />
        </div>
    )
  }
}
