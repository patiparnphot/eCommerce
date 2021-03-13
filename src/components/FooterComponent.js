import React from 'react';
import { Link } from 'react-router-dom';
import Loader from './loader';
// import { sendMessage } from '../actions/contents';

const ROOT_URL = '/api';


// function Submit(values, dispatch) {
//   console.log('contactUs', values);
//   dispatch(sendMessage(values)).then((response) => {
//      console.log('sendMessageResponse: ', response);
//   });
// }

// const renderField = ({ input, label, type }) => {
//   if (type == "textarea") {
//     return (
//       <div className="form-group">
//         <textarea {...input} rows="5" placeholder={label} className="form-control"/>
//       </div>
//     );
//   } else {
//     return (
//       <div className="form-group">
//         <input {...input} type={type} placeholder={label} className="form-control"/>
//       </div>
//     );
//   }
// }

// class SendUsMessage extends React.Component {
//   render() {
//     const {
//       handleSubmit,
//       submitting,
//       placeholderName,
//       placeholderEmail,
//       placeholderSubject,
//       placeholderMessage,
//       formButton
//     } = this.props;
//     return (
//       <form onSubmit={handleSubmit(Submit)}>
//         <Field name="name" type="text" label={placeholderName} component={renderField} />
//         <Field name="email" type="email" label={placeholderEmail} component={renderField} />
//         <Field name="subject" type="text" label={placeholderSubject} component={renderField} />
//         <Field name="message" type="textarea" label={placeholderMessage} component={renderField} />
//         <button type="submit" disabled={ submitting }>{formButton}</button>
//       </form>
//     )
//   }
// }

// const SendUsMessageForm = reduxForm({
//   form: "SendUsMessage"
// })(SendUsMessage);


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
      return <Loader/>
    } else {
    
      return (
        <footer id="footer">
          <div className="container-fluid bg-blue footer text-white">
            <div className="row">
              <div className="container">
                <div className="row">

                  <div className="col-sm-6 col-md-3">
                    <h3 className="header text-uppercase">
                      {footerTag.informationHead}
                    </h3>
                    <ul className="nav-vrt white opc none-padding">
                      {footerTag.informations.map((information) => {
                        if( information.pathname.slice(0, 4) == 'http' ) {
                          return (
                            <li>
                              <a href={information.pathname} className="btn-material">
                                {information.text}
                              </a>
                            </li>
                          );
                        } else {
                          return (
                            <li>
                              <Link 
                                to={{
                                  pathname: information.pathname,
                                  state:{from: this.props.location.pathname}
                                }}
                                className="btn-material"
                              >
                                {information.text}
                              </Link>
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </div>

                  <div className="col-sm-6 col-md-3">
                    <h3 className="header text-uppercase">
                      {footerTag.serviceHead}
                    </h3>
                    <ul className="nav-vrt white opc none-padding">
                      {footerTag.services.map((service) => {
                        if( service.pathname.slice(0, 4) == 'http' ) {
                          return (
                            <li>
                              <a href={service.pathname} className="btn-material">
                                {service.text}
                              </a>
                            </li>
                          );
                        } else {
                          return (
                            <li>
                              <Link 
                                to={{
                                  pathname: service.pathname,
                                  state:{from: this.props.location.pathname}
                                }}
                                className="btn-material"
                              >
                                {service.text}
                              </Link>
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </div>

                  <div className="col-sm-12 col-md-6">

                    <div className="row">

                      <div className="col-md-6">
                        <h3 className="header text-uppercase">
                          {footerTag.contactHead}
                        </h3>
                        <ul className="list-icon white ">
                          <li>
                            <i className="icon icofont icofont-location-pin"></i>
                            {footerTag.contact}
                          </li>
                          <li>
                            <a href={`mailto:${footerTag.email}`}>
                              <i className="icon icofont icofont-email"></i>
                              {footerTag.email}
                            </a>
                          </li>
                          <li>
                            <i className="icon icofont icofont-phone-circle"></i>
                            {footerTag.telephone}
                          </li>
                          <li>
                            <i className="icon icofont icofont-clock-time"></i>
                            {footerTag.workingtimeHead}<br/>
                            {footerTag.workingtimes.map((workingTime) => {
                              return (<div>{workingTime}<br/></div>);
                            })}
                          </li>
                        </ul>
                      </div>

                      <div className="col-md-6">
                        <div className="footer-brand">
                          <img src={footerTag.brandImage} alt=""/>
                        </div>
                        <span className="comp-header st-12 text-uppercase">
                          {footerTag.brandName}
                        </span>
                        <p>
                          {footerTag.brandDesc}
                        </p>
                      </div>

                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <ul className="social ">
                          {
                            (
                              footerTag.facebook
                            ) ? (
                              <li>
                                <a href={footerTag.facebook}>
                                  <i className="icofont icofont-social-facebook"></i>
                                </a>
                              </li>
                            ) : (
                              ""
                            )
                          }
                          {
                            (
                              footerTag.twitter
                            ) ? (
                              <li>
                                <a href={footerTag.twitter}>
                                  <i className="icofont icofont-social-twitter"></i>
                                </a>
                              </li>
                            ) : (
                              ""
                            )
                          }
                          {
                            (
                              footerTag.instagram
                            ) ? (
                              <li>
                                <a href={footerTag.instagram}>
                                  <i className="icofont icofont-social-instagram"></i>
                                </a>
                              </li>
                            ) : (
                              ""
                            )
                          }
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
      );
    }
  }
}


