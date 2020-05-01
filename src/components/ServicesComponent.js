import React from 'react';


export default class Services extends React.Component {
  
//   componentDidMount() {
//     this.props.fetchBlogs();
//   }

  renderBoxes(boxes) {
    return boxes.map((box) => {
      return (
        <div key={box.title} className="col-md-6 col-lg-4 wow bounceInUp" data-wow-duration="1.4s">
          <div className="box">
            <div className="icon" style={{background: box.bgColor}}><i className={box.icon} style={{color: box.iconColor}}></i></div>
            <h4 className="title"><a href={box.href}>{box.title}</a></h4>
            <p className="description">{box.description}</p>
          </div>
        </div>
      );
    });
  }
  
  getHTML(htmlCode) {
    return { __html: htmlCode };
  }
  
  
  render() {
    
    const { services } = this.props;
    
    if (!services) {
      return <div/>
    }
    
    return (
        <section id="services" className="section-bg">
          <div className="container">
    
            <header className="section-header">
              <div dangerouslySetInnerHTML={this.getHTML(services.header)} />
            </header>
    
            <div className="row">
    
              {this.renderBoxes(services.boxes)}
    
            </div>
    
          </div>
        </section>
    )
  }
}
