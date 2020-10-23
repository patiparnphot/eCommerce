import React from 'react';
//import OwlCarousel from 'react-owl-carousel';


export default class Testimonials extends React.Component {
  
   componentDidMount() {
     var owlCarousel = require('../../static/lib/owlcarousel/owl.carousel.js');
     // Testimonials carousel (uses the Owl Carousel library)
     $(".testimonials-carousel").owlCarousel({
       autoplay: true,
       dots: true,
       loop: true,
       items: 1
     });
   }
  
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
      return <div/>
    }
    
    return (
        <section id="testimonials">
          <div className="container">
    
            <header className="section-header">
              <div dangerouslySetInnerHTML={this.getHTML(testimonials.header)} />
            </header>
    
            <div className="row justify-content-center">
              <div className="col-lg-8">
    
                <div className="owl-carousel testimonials-carousel wow fadeInUp">
        
                  {this.renderTestimonials(testimonials.carousel)}
    
                </div>
    
              </div>
            </div>
    
    
          </div>
        </section>
    )
  }

//<OwlCarousel className="owl-carousel testimonials-carousel wow fadeInUp" items={1} autoplay dots loop>

}
