import React from 'react';


export default class Features extends React.Component {
  
//   componentDidMount() {
//     this.props.fetchBlogs();
//   }
     
  renderFeatures(features) {
    let index = 1;
    
    return features.map((feature) => {
      
      index += 1;
      
      if (index % 2 === 1) {
        return (
          <div key={"feature" + index} className="row feature-item">
            <div className="col-lg-6 wow fadeInUp">
              <img src={feature.image} className="img-fluid" alt="" />
            </div>
            <div className="col-lg-6 wow fadeInUp pt-5 pt-lg-0">
              <div dangerouslySetInnerHTML={this.getHTML(feature.content)} />
            </div>
          </div>
        );
      } else if (index % 2 === 0) {
        return (
          <div key={"feature" + index} className="row feature-item mt-5 pt-5">
              <div className="col-lg-6 wow fadeInUp order-1 order-lg-2">
                <img src={feature.image} className="img-fluid" alt="" />
              </div>
    
              <div className="col-lg-6 wow fadeInUp pt-4 pt-lg-0 order-2 order-lg-1">
                <div dangerouslySetInnerHTML={this.getHTML(feature.content)} />
              </div>
              
            </div>
        );
      }
      
    });
  }
  
  getHTML(htmlCode) {
    return { __html: htmlCode };
  }
  
  
  render() {
    
    const { features } = this.props;
    
    if (!features) {
      return <div/>
    }
    
    return (
        <section id="features">
          <div className="container">
    
            {this.renderFeatures(features)}
    
          </div>
        </section>
    )
  }
}
