import { Link } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
//import { Helmet } from 'react-helmet';


import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import UploadPage from '../pages/UploadPage';
import { createContent, createContentSuccess, createContentFailure } from '../actions/contents';


function Submit(values, dispatch) {
  let contactUsContent = {
    locationHead: values.locationHead,
    locations: values.locations,
    telephoneHead: values.telephoneHead,
    telephones: values.telephones,
    emailHead: values.emailHead,
    emails: values.emails,
    latitude: values.latitude,
    longitude: values.longitude
  };
  console.log('contactUsContent form', contactUsContent);
  dispatch(createContent({contentType: "contactus", content: contactUsContent}, values.token)).then((response) => {
    // !response.error ? dispatch(createContentSuccess(response.payload)) : dispatch(createContentFailure(response.payload));
    if(!response.error) {
      console.log('new contactUsContent: ', response.payload);
      dispatch(createContentSuccess(response.payload));
      alert("new contactUsContent successful");
    } else {
      dispatch(createContentFailure(response.payload));
      alert(response.error);
    }
  });
}

const validate = values => {
  const errors = {}
  if (!values.locationHead) {
    errors.locationHead = 'Required'
  }
  if (!values.locations || !values.locations.length) {
    errors.locations = { _error: 'At least one location must be entered' }
  } else {
    const locationsArrayErrors = []
    values.locations.forEach((location, locationIndex) => {
      if (!location || !location.length) {
        locationsArrayErrors[locationIndex] = 'Required'
      }
    })
    if (locationsArrayErrors.length) {
      errors.locations = locationsArrayErrors
    }
  }
  if (!values.telephoneHead) {
    errors.telephoneHead = 'Required'
  }
  if (!values.telephones || !values.telephones.length) {
    errors.telephones = { _error: 'At least one telephone must be entered' }
  } else {
    const telephonesArrayErrors = []
    values.telephones.forEach((telephone, telephoneIndex) => {
      if (!telephone || !telephone.length) {
        telephonesArrayErrors[telephoneIndex] = 'Required'
      }
    })
    if (telephonesArrayErrors.length) {
      errors.telephones = telephonesArrayErrors
    }
  }
  if (!values.emailHead) {
    errors.emailHead = 'Required'
  }
  if (!values.emails || !values.emails.length) {
    errors.emails = { _error: 'At least one email must be entered' }
  } else {
    const emailsArrayErrors = []
    values.emails.forEach((email, emailIndex) => {
      if (!email || !email.length) {
        emailsArrayErrors[emailIndex] = 'Required'
      }
    })
    if (emailsArrayErrors.length) {
      errors.emails = emailsArrayErrors
    }
  }
  if (!values.latitude) {
    errors.latitude = 'Required'
  }
  if (!values.longitude) {
    errors.longitude = 'Required'
  }
  return errors
}

const renderField = ({ input, label, type, meta: { touched, error } }) => {
  return (
    <div className="row form-group" style={{backgroundColor: "lightblue", width: "90%", marginLeft: "10px"}}>
      <label className="col-sm-3">{label}</label>
      <input {...input} type={type} placeholder={label} className="form-ctrl col-sm-9"/>
      {touched && error && <span style={{color: "red"}}><b>{error}</b></span>}
    </div>
  );
}

const renderArray = ({fields, meta: {error, submitFailed}}) => (
  <ul>
    <li>
      <button type="button" style={{backgroundColor: "lightgreen"}} onClick={() => fields.push()}>
        Add Item
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((item, index) => (
      <li key={index}>
        <button type="button" style={{backgroundColor: "orange"}} title="Remove Item" onClick={() => fields.remove(index)}>X</button>
        <Field name={item} type="text" label={`ITEM #${index + 1}`} component={renderField}/>
      </li>
    ))}
    {error && <li className="error">{error}</li>}
  </ul>
);

class ContactUsContentClass extends React.Component {
  render() {
    const {
      handleSubmit,
      submitting,
      formButton
    } = this.props;
    return (
      <form onSubmit={handleSubmit(Submit)}>
        <div className="col-sm-12" style={{backgroundColor: "white", margin: "10px"}}>
          <h4>LOCATION</h4>
          <Field name="locationHead" type="text" label="HEADER" component={renderField} />
          <FieldArray name="locations" component={renderArray} />
        </div>
        <div className="col-sm-12" style={{backgroundColor: "white", margin: "10px"}}>
          <h4>CONTACT</h4>
          <Field name="telephoneHead" type="text" label="HEADER" component={renderField} />
          <FieldArray name="telephones" component={renderArray} />
        </div>
        <div className="col-sm-12" style={{backgroundColor: "white", margin: "10px"}}>
          <h4>EMAIL</h4>
          <Field name="emailHead" type="text" label="HEADER" component={renderField} />
          <FieldArray name="emails" component={renderArray} />
        </div>
        <div className="col-sm-12" style={{backgroundColor: "white", margin: "10px"}}>
          <h4>GOOGLE MAPS</h4>
          <Field name="latitude" type="text" label="LATITUDE" component={renderField} />
          <Field name="longitude" type="text" label="LONGITUDE" component={renderField} />
        </div>
        <button type="submit" style={{backgroundColor: "orange"}} disabled={ submitting }>{formButton}</button>
      </form>
    )
  }
}

const ContactUsContentForm = reduxForm({
  form: "ContactUsContentForm",
  validate
})(ContactUsContentClass);


export default class TemplateContentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alreadyFetch: false
    }
  }

  componentDidMount() {
    this.props.fetchContent("contactus", (e) => this.setState({alreadyFetch: e}));
  }

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetActiveContent();
    this.props.resetNewContent();
  }
  
  
  render() {
    
    const { content } = this.props.activeContent;
    const { token } = this.props.member;
    
    if (!content || !token || !this.state.alreadyFetch) {
      return <NotFoundPage/>
    } else {

      const initialContent = { ...content, token: token };
    
      return (
          <div className="form container">
            
            <h4>CONTACT</h4>
            <UploadPage/>
            <ContactUsContentForm
              initialValues={initialContent}
              formButton="Confirm"
            />
          </div>
      )

    }
  }
}
