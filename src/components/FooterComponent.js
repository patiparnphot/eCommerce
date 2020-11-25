import React from 'react';
import { Field, reduxForm} from 'redux-form';
import { sendMessage } from '../actions/contents';

const ROOT_URL = '/api';


function Submit(values, dispatch) {
  console.log('contactUs', values);
  dispatch(sendMessage(values)).then((response) => {
     console.log('sendMessageResponse: ', response);
  });
}

const renderField = ({ input, label, type }) => {
  if (type == "textarea") {
    return (
      <div className="form-group">
        <textarea {...input} rows="5" placeholder={label} className="form-control"/>
      </div>
    );
  } else {
    return (
      <div className="form-group">
        <input {...input} type={type} placeholder={label} className="form-control"/>
      </div>
    );
  }
}

class SendUsMessage extends React.Component {
  render() {
    const {
      handleSubmit,
      submitting,
      placeholderName,
      placeholderEmail,
      placeholderSubject,
      placeholderMessage,
      formButton
    } = this.props;
    return (
      <form onSubmit={handleSubmit(Submit)}>
        <Field name="name" type="text" label={placeholderName} component={renderField} />
        <Field name="email" type="email" label={placeholderEmail} component={renderField} />
        <Field name="subject" type="text" label={placeholderSubject} component={renderField} />
        <Field name="message" type="textarea" label={placeholderMessage} component={renderField} />
        <button type="submit" disabled={ submitting }>{formButton}</button>
      </form>
    )
  }
}

const SendUsMessageForm = reduxForm({
  form: "SendUsMessage"
})(SendUsMessage);


export default class Footer extends React.Component {
  
  componentDidMount() {
  }

  renderUsefulLinks(usefulLinks) {
    return usefulLinks.map((link) => {
      return (
        <li key={link.name}><a href={link.href}>{link.name}</a></li>
      );
    });
  }
  
  getHTML(htmlCode) {
    return { __html: htmlCode };
  }
  
  
  render() {
    
    const { footerTag } = this.props;
    
    if (!footerTag) {
      return <div/>
    }
    
    return (
      <footer>

  <div className="container-fluid bg-blue footer text-white">
    <div className="row">
      <div className="container">
        <div className="row">

          <div className="col-sm-6 col-md-3">
            <h3 className="header text-uppercase">
              Buyer information
            </h3>
            <ul className="nav-vrt white opc none-padding">
              <li>
                <a href="#" className="btn-material">Support service</a>
              </li>
              <li>
                <a href="#" className="btn-material">Technical proposals</a>
              </li>
              <li>
                <a href="#" className="btn-material">Affiliate program</a>
              </li>
            </ul>
          </div>

          <div className="col-sm-6 col-md-3">
            <h3 className="header text-uppercase">
              Service
            </h3>
            <ul className="nav-vrt white opc none-padding">
              <li>
                <a href="#" className="btn-material">About us</a>
              </li>
              <li>
                <a href="#" className="btn-material">Contact us</a>
              </li>
              <li>
                <a href="#" className="btn-material">My account</a>
              </li>
            </ul>
          </div>

          <div className="col-sm-12 col-md-6">

            <div className="row">

              <div className="col-md-6">
                <h3 className="header text-uppercase">
                  Our contacts
                </h3>
                <ul className="list-icon white ">
                  <li>
                    <i className="icon icofont icofont-location-pin"></i>
                    12A Questen, Mt Vernon, NY 10550, US
                  </li>
                  <li>
                    <a href="mailto:info@example.com">
                      <i className="icon icofont icofont-email"></i>
                      info@example.com
                    </a>
                  </li>
                  <li>
                    <i className="icon icofont icofont-phone-circle"></i>
                    +1 (234) 567-89-10
                  </li>
                  <li>
                    <i className="icon icofont icofont-clock-time"></i>
                    Working Days/Hours:
                    Mon - Sun / 9:00AM - 8:00PM
                  </li>
                </ul>
              </div>

              <div className="col-md-6">
                <div className="footer-brand">
                  <img src="images/main-brand.png" alt=""/>
                </div>
                <span className="comp-header st-12 text-uppercase">
                  Komotto
                  <span>
                    Bootstrap theme
                  </span>
                </span>
                <p>
                  Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor nisi elit consequat ipsum, nec sagittis sem nibh id elit.
                </p>
              </div>

            </div>

            <div className="row">
              <div className="col-md-12">
                <ul className="social ">
                  <li>
                    <a href="#">
                      <i className="icofont icofont-social-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="icofont icofont-social-google-plus"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="icofont icofont-social-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="icofont icofont-social-vk"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="icofont icofont-social-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="icofont icofont-social-youtube-play"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  </div>

  <div className="container-fluid copiright">
    <div className="row">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <span className="copy">
              © 2020 e-Commerce by MEATSEO. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

</footer>
    )
  }
}


