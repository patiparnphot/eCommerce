import React from 'react';


export default class CallToAction extends React.Component {
  
//   componentDidMount() {
//     this.props.fetchBlogs();
//   }
  
  
  render() {
    
    const { callToAction } = this.props;
    
    if (!callToAction) {
      return <NotFoundPage/>
    }
    
    return (
        <section id="call-to-action" className="wow fadeInUp">
          <div className="container">
            <div className="row">
              <div className="col-lg-9 text-center text-lg-left">
                <h3 className="cta-title">{callToAction.title}</h3>
                <p className="cta-text">{callToAction.text}</p>
              </div>
              <div className="col-lg-3 cta-btn-container text-center">
                <a className="cta-btn align-middle" href={callToAction.href}>{callToAction.button}</a>
              </div>
            </div>
    
          </div>
        </section>
    )
  }
}