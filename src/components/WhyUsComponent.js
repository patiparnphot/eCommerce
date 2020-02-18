import React from 'react';


export default class WhyUs extends React.Component {
  
//   componentDidMount() {
//     this.props.fetchBlogs();
//   }
  
  renderTopics(topics) {
    return topics.map((topic) => {
      return (
        <div key={topic.icon} className="features wow bounceInUp clearfix">
          <i className={topic.icon} style={{color: topic.iconColor}}></i>
          <div dangerouslySetInnerHTML={this.getHTML(topic.content)} />
        </div>
      );
    });
  }
   
  renderCounters(counters) {
    return counters.map((counter) => {
      return (
        <div key={counter.text} className="col-lg-3 col-6 text-center">
          <span data-toggle="counter-up">{counter.amount}</span>
          <p>{counter.text}</p>
        </div>
      );
    });
  }
  
  getHTML(htmlCode) {
    return { __html: htmlCode };
  }
  
  
  render() {
    
    const { whyUs } = this.props;
    
    if (!whyUs) {
      return <NotFoundPage/>
    }
    
    return (
        <section id="why-us" className="wow fadeIn">
          <div className="container-fluid">
            
            <header className="section-header">
              <div dangerouslySetInnerHTML={this.getHTML(whyUs.header)} />
            </header>
    
            <div className="row">
    
              <div className="col-lg-6">
                <div className="why-us-img">
                  <img src={whyUs.image} alt="" className="img-fluid" />
                </div>
              </div>
    
              <div className="col-lg-6">
                <div className="why-us-content">
                  <div dangerouslySetInnerHTML={this.getHTML(whyUs.content)} />
    
                  {this.renderTopics(whyUs.topics)}
                  
                </div>
    
              </div>
    
            </div>
    
          </div>
    
          <div className="container">
            <div className="row counters">
    
              {this.renderCounters(whyUs.counters)}
      
            </div>
    
          </div>
        </section>
    )
  }
}