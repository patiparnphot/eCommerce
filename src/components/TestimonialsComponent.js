import React from 'react';
import OwlCarousel from 'react-owl-carousel';


export default class Testimonials extends React.Component {
  
//   componentDidMount() {
//     this.props.fetchBlogs();
//   }
  
  renderTestimonials(testimonials) {
    return testimonials.map((testimonial) => {
      return (
        <div key={testimonial.name} className="testimonial-item">
          <img src={testimonial.image} className="testimonial-img" alt="" />
          <h3>{testimonial.name}</h3>
          <h4><div dangerouslySetInnerHTML={this.getHTML(testimonial.position)} /></h4>
          <p>{testimonial.text}</p>
        </div>
      );
    });
  }
  
  getHTML(htmlCode) {
    return { __html: htmlCode };
  }
  
  
  render() {
    
    const { testimonials } = this.props;
    
    if (!testimonials) {
      return <NotFoundPage/>
    }
    
    return (
        <section id="testimonials">
          <div className="container">
    
            <header className="section-header">
              <div dangerouslySetInnerHTML={this.getHTML(testimonials.header)} />
            </header>
    
            <div className="row justify-content-center">
              <div className="col-lg-8">
    
                <OwlCarousel className="owl-carousel testimonials-carousel wow fadeInUp" items={1} autoplay dots loop>
        
                  {this.renderTestimonials(testimonials.carousel)}
    
                </OwlCarousel>
    
              </div>
            </div>
    
    
          </div>
        </section>
    )
  }
}