import React from 'react';


export default class Intro extends React.Component {
  
  // componentDidMount() {
  //   this.props.fetchBlogs();
  // }
  
  getHTML(htmlCode) {
    return { __html: htmlCode };
  }
  
  
  render() {
    
    const { intro } = this.props;
    
    if (!intro) {
      return <div></div>
    }
    
    return (
        <section id="intro" className="clearfix">
            <div className="container d-flex h-100">
              <div className="row justify-content-center align-self-center">
                <div className="col-md-6 intro-info order-md-first order-last">
                  <div dangerouslySetInnerHTML={this.getHTML(intro.slogan)} />
                  <div>
                    <a href={intro.href} className="btn-get-started scrollto">{intro.button}</a>
                  </div>
                </div>
          
                <div className="col-md-6 intro-img order-md-last order-first">
                  <img src={intro.image} alt="" className="img-fluid" />
                </div>
              </div>
        
            </div>
        </section>
    )
  }
}


