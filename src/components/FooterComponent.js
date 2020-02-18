import React from 'react';
import { Field, reduxForm} from 'redux-form';
import fetch from 'cross-fetch';

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost/api' : '/api';


function SubmitTest(values, dispatch) {
  console.log(values);
  fetch(`${ROOT_URL}/contents/message`, {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
  .then(response => response.json(), error => console.log('An error occurred.', error));
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
      <form onSubmit={handleSubmit(SubmitTest)}>
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
        <footer id="footer" className="section-bg">
        <div className="footer-top">
          <div className="container">
    
            <div className="row">
    
              <div className="col-lg-6">
    
                <div className="row">
    
                    <div className="col-sm-6">
    
                      <div className="footer-info">
                        <img src="/img/meatseoLogoMonotone.png" />
                        <p>{footerTag.info}</p>
                      </div>
    
                    </div>
    
                    <div className="col-sm-6">
                      <div className="footer-links">
                        <h4>{footerTag.linksHead}</h4>
                        <ul>{this.renderUsefulLinks(footerTag.links)}</ul>
                      </div>
    
                      <div className="footer-links">
                        <h4>{footerTag.contactUsHead}</h4>
                        <div dangerouslySetInnerHTML={this.getHTML(footerTag.contactUs)} />
                      </div>
    
                      <div className="social-links">
                        <a href={footerTag.twitter} className="twitter"><i className="fa fa-twitter"></i></a>
                        <a href={footerTag.facebook} className="facebook"><i className="fa fa-facebook"></i></a>
                        <a href={footerTag.linkedin} className="linkedin"><i className="fa fa-linkedin"></i></a>
                        <a href={footerTag.instagram} className="instagram"><i className="fa fa-instagram"></i></a>
                      </div>
    
                    </div>
    
                </div>
    
              </div>
    
              <div className="col-lg-6">
    
                <div className="form">
                  
                  <h4>{footerTag.formHead}</h4>
                  <p>{footerTag.form}</p>
                  <SendUsMessageForm
                    placeholderName={footerTag.placeholderName}
                    placeholderEmail={footerTag.placeholderEmail}
                    placeholderSubject={footerTag.placeholderSubject}
                    placeholderMessage={footerTag.placeholderMessage}
                    formButton={footerTag.formButton}
                  />
                </div>
    
              </div>
    
              
    
            </div>
    
          </div>
        </div>
    
        <div className="container">
          <div className="copyright">
            &copy; Copyright <strong>MEATSEO</strong>. All Rights Reserved
          </div>
          <div className="credits">
            
            Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
          </div>
        </div>
      </footer>
    )
  }
}

// <form action="" method="post" role="form" className="contactForm">
//                     <div className="form-group">
//                       <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
//                       <div className="validation"></div>
//                     </div>
//                     <div className="form-group">
//                       <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
//                       <div className="validation"></div>
//                     </div>
//                     <div className="form-group">
//                       <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
//                       <div className="validation"></div>
//                     </div>
//                     <div className="form-group">
//                       <textarea className="form-control" name="message" rows="5" data-rule="required" data-msg="Please write something for us" placeholder="Message"></textarea>
//                       <div className="validation"></div>
//                     </div>
    
//                     <div id="sendmessage">Your message has been sent. Thank you!</div>
//                     <div id="errormessage"></div>
    
//                     <div className="text-center"><button type="submit" title="Send Message">Send Message</button></div>
//                   </form>