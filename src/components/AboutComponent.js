import React from 'react';


export default class About extends React.Component {
  
  // componentDidMount() {
  //   this.props.fetchBlogs();
  // }
   
  getHTML(htmlCode) {
    return { __html: htmlCode };
  }
  
  
  render() {
    
    const { about } = this.props;
    
    if (!about) {
      return <NotFoundPage/>
    }
    
    return (
        <section id="about">
    
          <div className="container">
            <div className="row">
    
              <div className="col-lg-5 col-md-6">
                <div className="about-img">
                  <img src={about.image} alt="" />
                </div>
              </div>
    
              <div className="col-lg-7 col-md-6">
                <div className="about-content">
                  <div dangerouslySetInnerHTML={this.getHTML(about.content)} />
                </div>
              </div>
            </div>
          </div>
    
        </section>
    )
  }
}