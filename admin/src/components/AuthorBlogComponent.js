import { Link } from 'react-router-dom';
import Loader from './loader';
//import { Helmet } from 'react-helmet';


import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import UploadPage from '../pages/UploadPage';
import { createAuthor, createContentSuccess, createContentFailure } from '../actions/contents';


function Submit(values, dispatch) {
  let authorForm = {
    name: values.name,
    description: values.description,
    image: values.image
  };
  console.log('authorBlog form', authorForm);
  dispatch(createAuthor(authorForm, values.token)).then((response) => {
    // !response.error ? dispatch(createContentSuccess(response.payload)) : dispatch(createContentFailure(response.payload));
    if(!response.error) {
      console.log('new authorBlog: ', response.payload);
      dispatch(createContentSuccess(response.payload));
      alert("new authorBlog successful");
    } else {
      dispatch(createContentFailure(response.payload));
      alert(response.error);
    }
  });
}

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.description) {
    errors.description = 'Required'
  }
  if (!values.image) {
    errors.image = 'Required'
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
          <h4>DATA</h4>
          <Field name="name" type="text" label="NAME*" component={renderField} />
          <Field name="description" type="text" label="DESCRIPTION*" component={renderField} />
          <Field name="image" type="text" label="IMAGE* (90x90 px)" component={renderField} />
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
    this.props.fetchContent("authorblog", (e) => this.setState({alreadyFetch: e}));
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
    
    if (!content ||
      // !token ||
      !this.state.alreadyFetch
    ) {
      return <Loader/>
    } else {

      const initialContent = { ...content, token: token };
    
      return (
          <div className="form container">
            
            <h4>AUTHOR OF ALL BLOGS</h4>
            <UploadPage/>
            <span>( * = Required field )</span>
            <ContactUsContentForm
              initialValues={initialContent}
              formButton="Confirm"
            />
          </div>
      )

    }
  }
}
