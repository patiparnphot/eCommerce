import { Link } from 'react-router-dom';
import Loader from './loader';
//import { Helmet } from 'react-helmet';


import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import UploadPage from '../pages/UploadPage';
import { createContent, createContentSuccess, createContentFailure } from '../actions/contents';


function Submit(values, dispatch) {
  let indexContent = {
    titleHtml: values.titleHtml,
    descriptionHtml: values.descriptionHtml,
    intro: {
      background: values.introBackground,
      slideshows: values.introSlideshows
    },
    recent: {
      parallaxText: values.recentParallaxText,
      header: values.recentHeader
    },
    campaign: {
      title: values.campaignTitle,
      features: values.campaignFeatures
    },
    popularOnShop: {
      sidebarImage: values.popularOnShopSidebarImage,
      categoryHead: values.popularOnShopCategoryHead,
      categories: values.popularOnShopCategories
    },
    blogs: {
      header: values.blogsHeader,
      subHeader: values.blogsSubHeader,
      parallaxText: values.blogsParallaxText,
      blogBtn: values.blogsBlogBtn
    },
    information: {
      title: values.informationTitle,
      text: values.informationText,
      btnText: values.informationBtnText,
      btnLink: values.informationBtnLink,
      parallaxImage: values.informationParallaxImage,
      background: values.informationBackground
    }
  };
  console.log('indexContent form', indexContent);
  dispatch(createContent({contentType: "index", content: indexContent}, values.token)).then((response) => {
    // !response.error ? dispatch(createContentSuccess(response.payload)) : dispatch(createContentFailure(response.payload));
    if(!response.error) {
      console.log('new indexContent: ', response.payload);
      dispatch(createContentSuccess(response.payload));
      alert("new indexContent successful");
    } else {
      dispatch(createContentFailure(response.payload));
      alert(response.error);
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
  // if (!values.introBackground) {
  //   errors.introBackground = 'Required'
  // }
  if (!values.introSlideshows || !values.introSlideshows.length) {
    errors.introSlideshows = { _error: 'At least one slideshow must be entered' }
  } else {
    const optionsArrayErrors = []
    values.introSlideshows.forEach((option, optionIndex) => {
      const optionErrors = {}
      if (!option || !option.header) {
        optionErrors.header = 'Required'
        optionsArrayErrors[optionIndex] = optionErrors
      }
      if (!option || !option.description) {
        optionErrors.description = 'Required'
        optionsArrayErrors[optionIndex] = optionErrors
      }
      if (!option || !option.link) {
        optionErrors.link = 'Required'
        optionsArrayErrors[optionIndex] = optionErrors
      }
      // if (!option || !option.btnLink) {
      //   optionErrors.btnLink = 'Required'
      //   optionsArrayErrors[optionIndex] = optionErrors
      // }
      // if (!option || !option.image) {
      //   optionErrors.image = 'Required'
      //   optionsArrayErrors[optionIndex] = optionErrors
      // }
      // if (!option || !option.campaign) {
      //   optionErrors.campaign = 'Required'
      //   optionsArrayErrors[optionIndex] = optionErrors
      // }
      // if (!option || !option.tag) {
      //   optionErrors.tag = 'Required'
      //   optionsArrayErrors[optionIndex] = optionErrors
      // }
    })
    if (optionsArrayErrors.length) {
      errors.introSlideshows = optionsArrayErrors
    }
  }
  if (!values.recentParallaxText) {
    errors.recentParallaxText = 'Required'
  }
  if (!values.recentHeader) {
    errors.recentHeader = 'Required'
  }
  // if (!values.campaignTitle) {
  //   errors.campaignTitle = 'Required'
  // }
  if (values.campaignFeatures && values.campaignFeatures.length) {
    const featuresArrayErrors = []
    values.campaignFeatures.forEach((feature, featureIndex) => {
      const featureErrors = {}
      if (!feature || !feature.image) {
        featureErrors.image = 'Required'
        featuresArrayErrors[featureIndex] = featureErrors
      }
      if (!feature || !feature.topic) {
        featureErrors.topic = 'Required'
        featuresArrayErrors[featureIndex] = featureErrors
      }
      if (!feature || !feature.content) {
        featureErrors.content = 'Required'
        featuresArrayErrors[featureIndex] = featureErrors
      }
    })
    if (featuresArrayErrors.length) {
      errors.campaignFeatures = featuresArrayErrors
    }
  }
  // if (!values.popularOnShopSidebarImage) {
  //   errors.popularOnShopSidebarImage = 'Required'
  // }
  if (!values.popularOnShopCategoryHead) {
    errors.popularOnShopCategoryHead = 'Required'
  }
  if (!values.popularOnShopCategories || !values.popularOnShopCategories.length) {
    errors.popularOnShopCategories = { _error: 'At least one category must be entered' }
  } else {
    const optionsArrayErrors = []
    values.popularOnShopCategories.forEach((option, optionIndex) => {
      const optionErrors = {}
      if (!option || !option.topic) {
        optionErrors.topic = 'Required'
        optionsArrayErrors[optionIndex] = optionErrors
      }
      if (!option || !option.link) {
        optionErrors.link = 'Required'
        optionsArrayErrors[optionIndex] = optionErrors
      }
    })
    if (optionsArrayErrors.length) {
      errors.popularOnShopCategories = optionsArrayErrors
    }
  }
  if (!values.blogsHeader) {
    errors.blogsHeader = 'Required'
  }
  if (!values.blogsSubHeader) {
    errors.blogsSubHeader = 'Required'
  }
  // if (!values.blogsParallaxText) {
  //   errors.blogsParallaxText = 'Required'
  // }
  // if (!values.informationTitle) {
  //   errors.informationTitle = 'Required'
  // }
  if (!values.informationText) {
    errors.informationText = 'Required'
  }
  // if (!values.informationBtnText) {
  //   errors.informationBtnText = 'Required'
  // }
  if (!values.informationBtnLink) {
    errors.informationBtnLink = 'Required'
  }
  if (!values.informationParallaxImage) {
    errors.informationParallaxImage = 'Required'
  }
  // if (!values.informationBackground) {
  //   errors.informationBackground = 'Required'
  // }
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

const renderSlideshows = ({fields, meta: {error, submitFailed}}) => (
  <ul>
    <li>
      <button type="button" style={{backgroundColor: "lightgreen"}} onClick={() => fields.push({})}>
        Add Slideshow*
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((slideshow, index) => (
      <li key={index}>
        <button type="button" style={{backgroundColor: "orange"}} title="Remove Slideshow" onClick={() => fields.remove(index)}>X</button>
        <h4>Slideshow #{index + 1}</h4>
        <Field name={`${slideshow}.header`} type="text" label="HEADER*" component={renderField}/>
        <Field name={`${slideshow}.description`} type="text" label="DESCRIPTION*" component={renderField}/>
        <Field name={`${slideshow}.link`} type="text" label="BUTTON TEXT*" component={renderField}/>
        <Field name={`${slideshow}.btnLink`} type="text" label="BUTTON LINK" component={renderField}/>
        <Field name={`${slideshow}.image`} type="text" label="IMAGE (560x400 px)" component={renderField}/>
      </li>
    ))}
  </ul>
);

const renderFeatures = ({fields, meta: {error, submitFailed}}) => (
  <ul>
    <li>
      <button type="button" style={{backgroundColor: "lightgreen"}} onClick={() => fields.push({})}>
        Add Feature
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((feature, index) => (
      <li key={index}>
        <button type="button" style={{backgroundColor: "orange"}} title="Remove Feature" onClick={() => fields.remove(index)}>X</button>
        <h4>Feature #{index + 1}</h4>
        <Field name={`${feature}.image`} type="text" label="IMAGE* (555x312 px)" component={renderField}/>
        <Field name={`${feature}.topic`} type="text" label="TOPIC*" component={renderField}/>
        <Field name={`${feature}.content`} type="text" label="CONTENT*" component={renderField} />
      </li>
    ))}
  </ul>
);

const renderCategories = ({fields, meta: {error, submitFailed}}) => (
  <ul>
    <li>
      <button type="button" style={{backgroundColor: "lightgreen"}} onClick={() => fields.push({})}>
        Add Category*
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((category, index) => (
      <li key={index}>
        <button type="button" style={{backgroundColor: "orange"}} title="Remove Category" onClick={() => fields.remove(index)}>X</button>
        <h4>Category #{index + 1}</h4>
        <Field name={`${category}.topic`} type="text" label="CATEGORY*" component={renderField}/>
        <Field name={`${category}.link`} type="text" label="LINK*" component={renderField}/>
      </li>
    ))}
  </ul>
);

class IndexContentClass extends React.Component {
  render() {
    const {
      handleSubmit,
      submitting,
      formButton
    } = this.props;
    return (
      <form onSubmit={handleSubmit(Submit)}>
        <div className="col-sm-12" style={{backgroundColor: "white", margin: "10px"}}>
          <h4>SEO</h4>
          <Field name="titleHtml" type="text" label="SEO title*" component={renderField} />
          <Field name="descriptionHtml" type="text" label="Meta Description*" component={renderField} />
        </div>
        <div className="col-sm-12" style={{backgroundColor: "white", margin: "10px"}}>
          <h4>INTRO SECTION</h4>
          <Field name="introBackground" type="text" label="BACKGROUND (1300x400 px)" component={renderField} />
          <FieldArray name="introSlideshows" component={renderSlideshows} />
        </div>
        <div className="col-sm-12" style={{backgroundColor: "white", margin: "10px"}}>
          <h4>CAMPAIGN</h4>
          <Field name="campaignTitle" type="text" label="HEADER" component={renderField} />
          <FieldArray name="campaignFeatures" component={renderFeatures} />
        </div>
        <div className="col-sm-12" style={{backgroundColor: "white", margin: "10px"}}>
          <h4>CATEGORY SECTION</h4>
          <Field name="popularOnShopCategoryHead" type="text" label="TITLE*" component={renderField} />
          <FieldArray name="popularOnShopCategories" component={renderCategories} />
        </div>
        <div className="col-sm-12" style={{backgroundColor: "white", margin: "10px"}}>
          <h4>BLOG</h4>
          <Field name="blogsHeader" type="text" label="TITLE*" component={renderField} />
          <Field name="blogsSubHeader" type="text" label="DESCRIPTION*" component={renderField} />
        </div>
        <div className="col-sm-12" style={{backgroundColor: "white", margin: "10px"}}>
          <h4>FOOTER BANNER</h4>
          <Field name="informationTitle" type="text" label="HEADER" component={renderField} />
          <Field name="informationText" type="text" label="DESCRIPTION*" component={renderField} />
          <Field name="informationBtnText" type="text" label="BUTTON TEXT" component={renderField} />
          <Field name="informationBtnLink" type="text" label="BUTTON LINK*" component={renderField} />
          <Field name="informationParallaxImage" type="text" label="IMAGE* (1300x800 px)" component={renderField} />
        </div>
        <button type="submit" style={{backgroundColor: "orange"}} disabled={ submitting }>{formButton}</button>
      </form>
    )
  }
}

const IndexContentForm = reduxForm({
  form: "IndexContentForm",
  validate
})(IndexContentClass);


export default class IndexContentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alreadyFetch: false
    }
  }

  componentDidMount() {
    this.props.fetchContent("index", (e) => this.setState({alreadyFetch: e}));
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
      return <Loader/>
    } else {

      const initialContent = {
        titleHtml: content.titleHtml,
        descriptionHtml: content.descriptionHtml,
        introBackground: content.intro.background,
        introSlideshows: content.intro.slideshows,
        recentParallaxText: content.recent.parallaxText,
        recentHeader: content.recent.header,
        campaignTitle: content.campaign.title,
        campaignFeatures: content.campaign.features,
        popularOnShopSidebarImage: content.popularOnShop.sidebarImage,
        popularOnShopCategoryHead: content.popularOnShop.categoryHead,
        popularOnShopCategories: content.popularOnShop.categories,
        blogsHeader: content.blogs.header,
        blogsSubHeader: content.blogs.subHeader,
        blogsParallaxText: content.blogs.parallaxText,
        blogsBlogBtn: content.blogs.blogBtn,
        informationTitle: content.information.title,
        informationText: content.information.text,
        informationParallaxImage: content.information.parallaxImage,
        informationBackground: content.information.background,
        informationBtnText: content.information.btnText,
        informationBtnLink: content.information.btnLink,
        token: token
      };
    
      return (
          <div className="form container">
            
            <h4>HOMEPAGE</h4>
            <UploadPage/>
            <span>( * = Required field )</span>
            <IndexContentForm
              initialValues={initialContent}
              formButton="Confirm"
            />
          </div>
      )

    }
  }
}
