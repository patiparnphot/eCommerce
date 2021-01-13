import { Link } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
//import { Helmet } from 'react-helmet';


import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createContent, createContentSuccess, createContentFailure } from '../actions/contents';


function Submit(values, dispatch) {
  let indexContent = {
    titleHtml: values.titleHtml,
    descriptionHtml: values.descriptionHtml,
    intro: {
      slideshows: values.introSlideshows
    },
    recent: {
      parallaxText: values.recentParallaxText,
      header: values.recentHeader
    },
    campaign: {
      title: values.campaignTitle,
      subTitle: values.campaignSubTitle,
      btnText: values.campaignBtnText,
      btnLink: values.campaignBtnLink,
      parallaxImage: values.campaignParallaxImage
    },
    popularOnShop: {
      sidebarImage: values.popularOnShopSidebarImage,
      categoryHead: values.popularOnShopCategoryHead,
      categories: values.popularOnShopCategories
    },
    blogs: {
      header: values.blogsHeader,
      subHeader: values.blogsSubHeader,
      parallaxText: values.blogsParallaxText
    },
    information: {
      title: values.informationTitle,
      text: values.informationText,
      parallaxImage: values.informationParallaxImage
    }
  };
  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QzIiwiZmlyc3RuYW1lIjoiM3JkUGVvcGxlIiwibGFzdG5hbWUiOiJpc0hlcmUiLCJlbWFpbCI6IjNyZFBlb3BsZUBlbWFpbC5jb20iLCJhdmF0YXIiOiIzIHBhc3RlIGltZyBzcmMgaGVyZSIsImlzQWRtaW4iOmZhbHNlLCJhZGRyZXNzIjoiMTIzIHdvcnNoaW5ndG9uIG1hZGFnYXRnYSIsInBheXBhbCI6eyJ1c2VybmFtZSI6IjNyZHBheXBhbCJ9LCJjcmVkaXRDYXJkIjp7ImNhcmROdW1iZXIiOiIxMjM0NTY3ODkwMTIzNDU2IiwiZXhwaXJlZERhdGUiOiIxMi8yNCJ9LCJpYXQiOjE2MDUzNzMzMzd9.wfZxaBT6NWVjK6ydgVFmbLyQok2QjMZIDSeNo3rHE8E";
  console.log('indexContent form', indexContent);
  dispatch(createContent({contentType: "index", content: indexContent}, token)).then((response) => {
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
      if (!option || !option.btnLink) {
        optionErrors.btnLink = 'Required'
        optionsArrayErrors[optionIndex] = optionErrors
      }
      if (!option || !option.image) {
        optionErrors.image = 'Required'
        optionsArrayErrors[optionIndex] = optionErrors
      }
      if (!option || !option.tag) {
        optionErrors.tag = 'Required'
        optionsArrayErrors[optionIndex] = optionErrors
      }
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
  if (!values.campaignTitle) {
    errors.campaignTitle = 'Required'
  }
  if (!values.campaignSubTitle) {
    errors.campaignSubTitle = 'Required'
  }
  if (!values.campaignBtnText) {
    errors.campaignBtnText = 'Required'
  }
  if (!values.campaignBtnLink) {
    errors.campaignBtnLink = 'Required'
  }
  if (!values.campaignParallaxImage) {
    errors.campaignParallaxImage = 'Required'
  }
  if (!values.popularOnShopSidebarImage) {
    errors.popularOnShopSidebarImage = 'Required'
  }
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
  if (!values.blogsParallaxText) {
    errors.blogsParallaxText = 'Required'
  }
  if (!values.informationTitle) {
    errors.informationTitle = 'Required'
  }
  if (!values.informationText) {
    errors.informationText = 'Required'
  }
  if (!values.informationParallaxImage) {
    errors.informationParallaxImage = 'Required'
  }
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

const renderSlideshows = ({fields, meta: {error, submitFailed}}) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Add Slideshow
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((slideshow, index) => (
      <li key={index}>
        <button type="button" title="Remove Option" onClick={() => fields.remove(index)}>X</button>
        <h4>Slideshow #{index + 1}</h4>
        <Field name={`${slideshow}.header`} type="text" label="header" component={renderField}/>
        <Field name={`${slideshow}.description`} type="text" label="description" component={renderField}/>
        <Field name={`${slideshow}.link`} type="text" label="link" component={renderField}/>
        <Field name={`${slideshow}.btnLink`} type="text" label="btnLink" component={renderField}/>
        <Field name={`${slideshow}.image`} type="text" label="image" component={renderField}/>
        <Field name={`${slideshow}.campaign`} type="text" label="campaign" component={renderField}/>
        <Field name={`${slideshow}.tag`} type="text" label="tag" component={renderField}/>
      </li>
    ))}
  </ul>
);

const renderCategories = ({fields, meta: {error, submitFailed}}) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Add Category
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((category, index) => (
      <li key={index}>
        <button type="button" title="Remove Option" onClick={() => fields.remove(index)}>X</button>
        <h4>Category #{index + 1}</h4>
        <Field name={`${category}.topic`} type="text" label="topic" component={renderField}/>
        <Field name={`${category}.link`} type="text" label="link" component={renderField}/>
      </li>
    ))}
  </ul>
);

class EditGoodClass extends React.Component {
  render() {
    const {
      handleSubmit,
      submitting,
      formButton
    } = this.props;
    return (
      <form onSubmit={handleSubmit(Submit)}>
        <Field name="titleHtml" type="text" label="title of index page for seo" component={renderField} />
        <Field name="descriptionHtml" type="text" label="desc of index page for seo" component={renderField} />
        <FieldArray name="introSlideshows" component={renderSlideshows} />
        <Field name="recentParallaxText" type="text" label="parallaxText of recent section" component={renderField} />
        <Field name="recentHeader" type="text" label="header of recent section" component={renderField} />
        <Field name="campaignTitle" type="text" label="title of campaign section" component={renderField} />
        <Field name="campaignSubTitle" type="text" label="subTitle of campaign section" component={renderField} />
        <Field name="campaignBtnText" type="text" label="btnText of campaign section" component={renderField} />
        <Field name="campaignBtnLink" type="text" label="btnLink of campaign section" component={renderField} />
        <Field name="campaignParallaxImage" type="text" label="parallaxImage of campaign section" component={renderField} />
        <Field name="popularOnShopSidebarImage" type="text" label="sidebarImage of popularOnShop section" component={renderField} />
        <Field name="popularOnShopCategoryHead" type="text" label="categoryHead of popularOnShop section" component={renderField} />
        <FieldArray name="popularOnShopCategories" component={renderCategories} />
        <Field name="blogsHeader" type="text" label="header of blogs section" component={renderField} />
        <Field name="blogsSubHeader" type="text" label="subHeader of blogs section" component={renderField} />
        <Field name="blogsParallaxText" type="text" label="parallaxText of blogs section" component={renderField} />
        <Field name="informationTitle" type="text" label="title of information section" component={renderField} />
        <Field name="informationText" type="text" label="text of information section" component={renderField} />
        <Field name="informationParallaxImage" type="text" label="parallaxImage of information section" component={renderField} />
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
    this.props.fetchContent("index");
  }

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetActiveContent();
    this.props.resetNewContent();
  }
  
  
  render() {
    
    const { content } = this.props.activeContent;
    
    if (!content) {
      return <NotFoundPage/>
    } else {

      const initialContent = {
        titleHtml: content.titleHtml,
        descriptionHtml: content.descriptionHtml,
        introSlideshows: content.intro.slideshows,
        recentParallaxText: content.recent.parallaxText,
        recentHeader: content.recent.header,
        campaignTitle: content.campaign.title,
        campaignSubTitle: content.campaign.subTitle,
        campaignBtnText: content.campaign.btnText,
        campaignBtnLink: content.campaign.btnLink,
        campaignParallaxImage: content.campaign.parallaxImage,
        popularOnShopSidebarImage: content.popularOnShop.sidebarImage,
        popularOnShopCategoryHead: content.popularOnShop.categoryHead,
        popularOnShopCategories: content.popularOnShop.categories,
        blogsHeader: content.blogs.header,
        blogsSubHeader: content.blogs.subHeader,
        blogsParallaxText: content.blogs.parallaxText,
        informationTitle: content.information.title,
        informationText: content.information.text,
        informationParallaxImage: content.information.parallaxImage
      };
    
      return (
          <div className="form container">
            
            <h4>FormHead</h4>
            <p>Form Description</p>
            <EditGoodForm
              initialValues={initialContent}
              formButton="Confirm"
            />
          </div>
      )

    }
  }
}
