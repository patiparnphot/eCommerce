import React from 'react';


export default class Pricing extends React.Component {
  
//   componentDidMount() {
//     this.props.fetchBlogs();
//   }
     
  renderPackages(packages) {
    return packages.map((pack) => {
      return (
        <div key={pack.title} className="col-xs-12 col-lg-4">
          <div className="card">
            <div className="card-header">
              <h3><span className='currency'>{pack.currency}</span>{pack.price}<span className='period'>{pack.period}</span></h3>
            </div>
            <div className="card-block">
              <h4 className="card-title"> 
                {pack.title}
              </h4>
              <ul className="list-group">
                <div dangerouslySetInnerHTML={this.getHTML(pack.listGroup)} />
              </ul>
              <a href={pack.href} className="btn">{pack.button}</a>
            </div>
          </div>
        </div>
      );
    });
  }
  
  getHTML(htmlCode) {
    return { __html: htmlCode };
  }
  
  
  render() {
    
    const { pricing } = this.props;
    
    if (!pricing) {
      return <div/>
    }
    
    return (
        <section id="pricing" className="wow fadeInUp section-bg">
    
          <div className="container">
    
            <header className="section-header">
              <div dangerouslySetInnerHTML={this.getHTML(pricing.header)} />
            </header>
    
            <div className="row flex-items-xs-middle flex-items-xs-center">
          
              {this.renderPackages(pricing.packages)}
          
            </div>
          </div>
    
        </section>
    )
  }
}
