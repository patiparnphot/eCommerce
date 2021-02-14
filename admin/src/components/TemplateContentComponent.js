import { Link } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
//import { Helmet } from 'react-helmet';


import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import UploadPage from '../pages/UploadPage';
import { createContent, createContentSuccess, createContentFailure } from '../actions/contents';


function Submit(values, dispatch) {
  let templateContent = {
    headerTag: {
      brandImage: values.headerBrandImage,
      telephone: values.headerTelephone,
      signup: values.headerSignup,
      cartText: values.headerCartText,
      cartBtn: values.headerCartBtn,
      logout: values.headerLogout,
      login: values.headerLogin,
      navBar: values.headerNavBar
    },
    footerTag: {
      informationHead: values.footerInformationHead,
      informations: values.footerInformations,
      serviceHead: values.footerServiceHead,
      services: values.footerServices,
      contactHead: values.footerContactHead,
      contact: values.footerContact,
      email: values.footerEmail,
      telephone: values.footerTelephone,
      workingtimeHead: values.footerWorkingtimeHead,
      workingtimes: values.footerWorkingtimes,
      brandImage: values.footerBrandImage,
      brandName: values.footerBrandName,
      brandDesc: values.footerBrandDesc,
      facebook: values.footerFacebook,
      twitter: values.footerTwitter,
      instagram: values.footerInstagram
    }
  };
  console.log('templateContent form', templateContent);
  dispatch(createContent({contentType: "template", content: templateContent}, values.token)).then((response) => {
    // !response.error ? dispatch(createContentSuccess(response.payload)) : dispatch(createContentFailure(response.payload));
    if(!response.error) {
      console.log('new templateContent: ', response.payload);
      dispatch(createContentSuccess(response.payload));
      alert("new templateContent successful");
    } else {
      dispatch(createContentFailure(response.payload));
      alert(response.error);
    }
  });
}

const validate = values => {
  const errors = {}
  if (!values.headerBrandImage) {
    errors.headerBrandImage = 'Required'
  }
  if (!values.headerTelephone) {
    errors.headerTelephone = 'Required'
  }
  if (!values.headerSignup) {
    errors.headerSignup = 'Required'
  }
  if (!values.headerCartText) {
    errors.headerCartText = 'Required'
  }
  if (!values.headerCartBtn) {
    errors.headerCartBtn = 'Required'
  }
  if (!values.headerLogout) {
    errors.headerLogout = 'Required'
  }
  if (!values.headerLogin) {
    errors.headerLogin = 'Required'
  }
  if (!values.headerNavBar || !values.headerNavBar.length) {
    errors.headerNavBar = { _error: 'At least one navBar must be entered' }
  } else {
    const navBarsArrayErrors = []
    values.headerNavBar.forEach((navBar, navBarIndex) => {
      const navBarErrors = {}
      if (!navBar || !navBar.pathname) {
        navBarErrors.pathname = 'Required'
        navBarsArrayErrors[navBarIndex] = navBarErrors
      }
      if (!navBar || !navBar.text) {
        navBarErrors.text = 'Required'
        navBarsArrayErrors[navBarIndex] = navBarErrors
      }
    })
    if (navBarsArrayErrors.length) {
      errors.headerNavBar = navBarsArrayErrors
    }
  }
  if (!values.footerInformationHead) {
    errors.footerInformationHead = 'Required'
  }
  if (!values.footerInformations || !values.footerInformations.length) {
    errors.footerInformations = { _error: 'At least one information must be entered' }
  } else {
    const informationsArrayErrors = []
    values.footerInformations.forEach((information, informationIndex) => {
      const informationErrors = {}
      if (!information || !information.pathname) {
        informationErrors.pathname = 'Required'
        informationsArrayErrors[informationIndex] = informationErrors
      }
      if (!information || !information.text) {
        informationErrors.text = 'Required'
        informationsArrayErrors[informationIndex] = informationErrors
      }
    })
    if (informationsArrayErrors.length) {
      errors.footerInformations = informationsArrayErrors
    }
  }
  if (!values.footerServiceHead) {
    errors.footerServiceHead = 'Required'
  }
  if (!values.footerServices || !values.footerServices.length) {
    errors.footerServices = { _error: 'At least one service must be entered' }
  } else {
    const servicesArrayErrors = []
    values.footerServices.forEach((service, serviceIndex) => {
      const serviceErrors = {}
      if (!service || !service.pathname) {
        serviceErrors.pathname = 'Required'
        servicesArrayErrors[serviceIndex] = serviceErrors
      }
      if (!service || !service.text) {
        serviceErrors.text = 'Required'
        servicesArrayErrors[serviceIndex] = serviceErrors
      }
    })
    if (servicesArrayErrors.length) {
      errors.footerServices = servicesArrayErrors
    }
  }
  if (!values.footerContactHead) {
    errors.footerContactHead = 'Required'
  }
  if (!values.footerContact) {
    errors.footerContact = 'Required'
  }
  if (!values.footerEmail) {
    errors.footerEmail = 'Required'
  }
  if (!values.footerTelephone) {
    errors.footerTelephone = 'Required'
  }
  if (!values.footerWorkingtimeHead) {
    errors.footerWorkingtimeHead = 'Required'
  }
  if (!values.footerWorkingtimes || !values.footerWorkingtimes.length) {
    errors.footerWorkingtimes = { _error: 'At least one workingTime must be entered' }
  } else {
    const workingtimesArrayErrors = []
    values.footerWorkingtimes.forEach((workingTime, workingTimeIndex) => {
      if (!workingTime || !workingTime.length) {
        workingtimesArrayErrors[workingTimeIndex] = 'Required'
      }
    })
    if (workingtimesArrayErrors.length) {
      errors.footerWorkingtimes = workingtimesArrayErrors
    }
  }
  if (!values.footerBrandImage) {
    errors.footerBrandImage = 'Required'
  }
  if (!values.footerBrandName) {
    errors.footerBrandName = 'Required'
  }
  if (!values.footerBrandDesc) {
    errors.footerBrandDesc = 'Required'
  }
  // if (!values.footerFacebook) {
  //   errors.footerFacebook = 'Required'
  // }
  // if (!values.footerTwitter) {
  //   errors.footerTwitter = 'Required'
  // }
  // if (!values.footerInstagram) {
  //   errors.footerInstagram = 'Required'
  // }
  return errors
}

const renderField = ({ input, label, type, meta: { touched, error } }) => {
  return (
    <div className="row form-group">
      <label className="col-sm-3">{label}</label>
      <input {...input} type={type} placeholder={label} className="form-ctrl col-sm-6"/>
      {touched && error && <span>{error}</span>}
    </div>
  );
}

const renderNavBar = ({fields, meta: {error, submitFailed}}) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Add NavBar
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((navBar, index) => (
      <li key={index}>
        <button type="button" title="Remove NavBar" onClick={() => fields.remove(index)}>X</button>
        <h4>NavBar #{index + 1}</h4>
        <Field name={`${navBar}.pathname`} type="text" label="src of link" component={renderField}/>
        <Field name={`${navBar}.hash`} type="text" label="section in link" component={renderField}/>
        <Field name={`${navBar}.text`} type="text" label="text of link" component={renderField}/>
      </li>
    ))}
  </ul>
);

const renderFooterLink = ({fields, meta: {error, submitFailed}}) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Add Link
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((link, index) => (
      <li key={index}>
        <button type="button" title="Remove Link" onClick={() => fields.remove(index)}>X</button>
        <h4>Link #{index + 1}</h4>
        <Field name={`${link}.pathname`} type="text" label="src of link" component={renderField}/>
        <Field name={`${link}.text`} type="text" label="text of link" component={renderField}/>
      </li>
    ))}
  </ul>
);

const renderWorkingTime = ({fields, meta: {error, submitFailed}}) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>
        Add Working Time
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((workingTime, index) => (
      <li key={index}>
        <button type="button" title="Remove WorkingTime" onClick={() => fields.remove(index)}>X</button>
        <Field name={workingTime} type="text" label={`Working Time #${index + 1}`} component={renderField}/>
      </li>
    ))}
    {error && <li className="error">{error}</li>}
  </ul>
);

class TemplateContentClass extends React.Component {
  render() {
    const {
      handleSubmit,
      submitting,
      formButton
    } = this.props;
    return (
      <form onSubmit={handleSubmit(Submit)}>
        <Field name="headerBrandImage" type="text" label="brand image of header" component={renderField} />
        <Field name="headerTelephone" type="text" label="telephone image of header" component={renderField} />
        <Field name="headerSignup" type="text" label="signup text of header" component={renderField} />
        <Field name="headerCartText" type="text" label="cart head text of header" component={renderField} />
        <Field name="headerCartBtn" type="text" label="cart button text of header" component={renderField} />
        <Field name="headerLogout" type="text" label="logout text of header" component={renderField} />
        <Field name="headerLogin" type="text" label="login text of header" component={renderField} />
        <FieldArray name="headerNavBar" component={renderNavBar} />
        <Field name="footerInformationHead" type="text" label="information head text of footer" component={renderField} />
        <FieldArray name="footerInformations" component={renderFooterLink} />
        <Field name="footerServiceHead" type="text" label="service head text of footer" component={renderField} />
        <FieldArray name="footerServices" component={renderFooterLink} />
        <Field name="footerContactHead" type="text" label="contact head text of footer" component={renderField} />
        <Field name="footerContact" type="text" label="contact location of footer" component={renderField} />
        <Field name="footerEmail" type="text" label="contact email of footer" component={renderField} />
        <Field name="footerTelephone" type="text" label="contact telephone of footer" component={renderField} />
        <Field name="footerWorkingtimeHead" type="text" label="workingTime head text of footer" component={renderField} />
        <FieldArray name="footerWorkingtimes" component={renderWorkingTime} />
        <Field name="footerBrandImage" type="text" label="brand image of footer" component={renderField} />
        <Field name="footerBrandName" type="text" label="brand name of footer" component={renderField} />
        <Field name="footerBrandDesc" type="text" label="brand description of footer" component={renderField} />
        <Field name="footerFacebook" type="text" label="facebook link of footer" component={renderField} />
        <Field name="footerTwitter" type="text" label="twitter link of footer" component={renderField} />
        <Field name="footerInstagram" type="text" label="instagram link of footer" component={renderField} />
        <button type="submit" disabled={ submitting }>{formButton}</button>
      </form>
    )
  }
}

const TemplateContentForm = reduxForm({
  form: "TemplateContentForm",
  validate
})(TemplateContentClass);


export default class TemplateContentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alreadyFetch: false
    }
  }

  componentDidMount() {
    this.props.fetchContent("template", (e) => this.setState({alreadyFetch: e}));
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

      const initialContent = {
        headerBrandImage: content.headerTag.brandImage,
        headerTelephone: content.headerTag.telephone,
        headerSignup: content.headerTag.signup,
        headerCartText: content.headerTag.cartText,
        headerCartBtn: content.headerTag.cartBtn,
        headerLogout: content.headerTag.logout,
        headerLogin: content.headerTag.login,
        headerNavBar: content.headerTag.navBar,
        footerInformationHead: content.footerTag.informationHead,
        footerInformations: content.footerTag.informations,
        footerServiceHead: content.footerTag.serviceHead,
        footerServices: content.footerTag.services,
        footerContactHead: content.footerTag.contactHead,
        footerContact: content.footerTag.contact,
        footerEmail: content.footerTag.email,
        footerTelephone: content.footerTag.telephone,
        footerWorkingtimeHead: content.footerTag.workingtimeHead,
        footerWorkingtimes: content.footerTag.workingtimes,
        footerBrandImage: content.footerTag.brandImage,
        footerBrandName: content.footerTag.brandName,
        footerBrandDesc: content.footerTag.brandDesc,
        footerFacebook: content.footerTag.facebook,
        footerTwitter: content.footerTag.twitter,
        footerInstagram: content.footerTag.instagram,
        token: token
      };
    
      return (
          <div className="form container">
            
            <h4>FormHead</h4>
            <p>Form Description</p>
            <UploadPage/>
            <TemplateContentForm
              initialValues={initialContent}
              formButton="Confirm"
            />
          </div>
      )

    }
  }
}
