import { Link } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
//import { Helmet } from 'react-helmet';


import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import UploadPage from '../pages/UploadPage';
import { createGood, createGoodSuccess, createGoodFailure } from '../actions/goods';


let category = "";

function Submit(values, dispatch) {
  let newForm = { ...values };
  newForm.description = demo.executeSummernote("description");
  newForm.category = category;
  newForm.rating = "0";
  newForm.ratingAmount = "0";
  newForm.raterAmount = "0";
  newForm.token = undefined;
  console.log('newForm', newForm);
  dispatch(createGood(newForm, values.token)).then((response) => {
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
  // if (!values.description) {
  //   errors.description = 'Required'
  // }
  if (!values.image) {
    errors.image = 'Required'
  }
  // if (!values.category) {
  //   errors.category = 'Required'
  // }
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
      // if (!option || !option.aroma) {
      //   optionErrors.aroma = 'Required'
      //   optionsArrayErrors[optionIndex] = optionErrors
      // }
      // if (!option || !option.acidity) {
      //   optionErrors.acidity = 'Required'
      //   optionsArrayErrors[optionIndex] = optionErrors
      // }
      // if (!option || !option.fruity) {
      //   optionErrors.fruity = 'Required'
      //   optionsArrayErrors[optionIndex] = optionErrors
      // }
    })
    if (optionsArrayErrors.length) {
      errors.options = optionsArrayErrors
    }
  }
  return errors
}

const renderField = ({ input, label, choices, type, meta: { touched, error } }) => {
  if (type == "textarea") {
    return (
      <div>
        <label>{label}</label>
        <div className={"form-group " + input.name}>
          <textarea className="form-ctrl summernote"/>
        </div>
      </div>
    );
  } else if (type == "select") {
    return (
      <div className="row form-group" style={{backgroundColor: "lightblue", width: "90%", marginLeft: "10px"}}>
        <label className="col-sm-3">{label}</label>
        <select {...input} className="form-ctrl col-sm-9">
          {choices.map((choice) => {
            return (<option value={choice}>{choice}</option>);
          })}
        </select>
        {touched && error && <span style={{color: "red"}}><b>{error}</b></span>}
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

const renderOptions = ({fields, allCat, cat, meta: {error, submitFailed}}) => {
  if(cat != "") {
    let targetIndex = allCat.map((cat, i) => [i, cat])
      .filter(x => x[1].title == cat)[0][0];
    let options = allCat[targetIndex].options;
    let features = allCat[targetIndex].features;
    return (
      <ul>
        <li>
          <button type="button" style={{backgroundColor: "lightgreen"}} onClick={() => fields.push({})}>
            Add Option
          </button>
          {submitFailed && error && <span>{error}</span>}
        </li>
        {fields.map((field, index) => (
          <li key={index}>
            <button type="button" style={{backgroundColor: "orange"}} title="Remove Option" onClick={() => fields.remove(index)}>X</button>
            <h4>OPTION #{index + 1}</h4>
            <Field name={`${field}.key`} type="select" choices={options} label="OPTION" component={renderField}/>
            <Field name={`${field}.cost`} type="number" label="COST" component={renderField}/>
            {features.map((feature) => {
              return (
                <Field name={`${field}.${feature.name}`} type="number" label={feature.name} component={renderField}/>
              );
            })}
          </li>
        ))}
      </ul>
    );
  }
}

const renderSpecificOptions = ({fields, meta: {error, submitFailed}}) => (
  <ul>
    <li>
      <button type="button" style={{backgroundColor: "lightgreen"}} onClick={() => fields.push()}>
        Add Specific Option
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((specificOption, index) => (
      <li key={index}>
        <button type="button" style={{backgroundColor: "orange"}} title="Remove Specific Option" onClick={() => fields.remove(index)}>X</button>
        <Field name={specificOption} type="text" label={`SPECIFIC OPTION #${index + 1}`} component={renderField}/>
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
      allCat,
      cat,
      formButton
    } = this.props;
    return (
      <form onSubmit={handleSubmit(Submit)}>
        <div className="col-sm-12" style={{backgroundColor: "white", margin: "10px"}}>
          <h4>SEO</h4>
          <Field name="titleHtml" type="text" label={placeholderTitleHtml} component={renderField} />
          <Field name="descriptionHtml" type="text" label={placeholderDescHtml} component={renderField} />
          <Field name="slug" type="text" label={placeholderSlug} component={renderField} />
        </div>
        <div className="col-sm-12" style={{backgroundColor: "white", margin: "10px"}}>
          <h4>PRODUCT INFO.</h4>
          <Field name="title" type="text" label={placeholderTitle} component={renderField} />
          <Field name="image" type="text" label={placeholderImage} component={renderField} />
          <Field name="description" type="textarea" label={placeholderDesc} component={renderField} />
          <FieldArray name="options" component={renderOptions} allCat={allCat} cat={cat} />
          <FieldArray name="specificOptions" component={renderSpecificOptions} />
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

  constructor(props) {
    super(props);
    this.state = {
      category: "",
      alreadySelect: false
    };
  }
  
  componentDidMount() {
    this.props.fetchGoodCategoryTitles();
  }

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetNewGood();
  }
  
  
  render() {

    const { data } = this.props.allCat;

    if (!data) {
      return <NotFoundPage/>
    } else if (data && (this.state.category == "")) {
      this.setState({category: data[0].title});
      return <NotFoundPage/>
    } else if (data && (this.state.category != "") && !this.state.alreadySelect) {
      return (
        <div className="form container">
          
          <h4>CREATE PRODUCT</h4>

          <div className="row form-group">
            <label className="col-sm-2">Category of good</label>
            <select
              className="form-ctrl col-sm-6"
              value={this.state.category}
              onChange={(e) => this.setState({category: e.target.value})}
            >
              {data.map((cat) => {
                return (<option value={cat.title}>{cat.title}</option>);
              })}
            </select>
          </div>
          {
            (
              data.length > 0
            ) ? (
              <button type="submit" onClick={() => this.setState({alreadySelect: true})}>Create Good</button>
            ) : (
              <div>Please create some category!!!</div>
            )
          }
        </div>
      );
    } else if (data && (this.state.category != "") && this.state.alreadySelect) {

      $(document).ready(function() {
        // Summernote editor
        demo.initSummernote("description");
      });

      category = this.state.category;
       
      return (
        <div className="form container">
          
          <h4>CREATE PRODUCT</h4>

          <UploadPage/>
          
          <button type="submit" onClick={() => this.setState({alreadySelect: false})}>Select Category</button>
          <br/>

          <CreateGoodForm
            placeholderSlug="SLUG"
            placeholderTitleHtml="SEO Title"
            placeholderDescHtml="Meta Description"
            placeholderTitle="TITLE"
            placeholderImage="IMAGE"
            placeholderDesc="DESCRIPTION"
            placeholderCat="category of good"
            initialValues={{token: this.props.member.token}}
            allCat={data}
            cat={category}
            formButton="Confirm"
          />
        </div>
      );
    }
  }
}
