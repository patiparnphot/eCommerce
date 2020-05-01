import React from 'react';
//import './loader.js';
//import OwlCarousel from 'react-owl-carousel';
//require('../../static/lib/jquery/jquery.min.js');
//require('../../static/lib/jquery/jquery-migrate.min.js');
//require('../../static/lib/owlcarousel/owl.carousel.js');


export default class Clients extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      responsive: {
        0: { 
          items: 2
        },
        768: {
          items: 4
        },
        900: {
          items: 6
        }
      },
    };
  }
  
   componentDidMount() {
     var owlCarousel = require('../../static/lib/owlcarousel/owl.carousel.js');
     // Clients carousel (uses the Owl Carousel library)
     $(".clients-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        responsive: { 0: { items: 2 }, 768: { items: 4 }, 900: { items: 6 }}
     });
   }
   
  renderClients(clients) {
    
    let index = 0;
    
    return clients.map((client) => {
      
      index += 1;
      
      return (
        <img key={"clientImg" + index} src={client.image} alt="" />
      );
    });
  }
  
  getHTML(htmlCode) {
    return { __html: htmlCode };
  }
  
  
  render() {
    
    const { clients } = this.props;
    
    if (!clients) {
      return <div/>
    }
    
    return (
        <section id="clients" className="wow fadeInUp">
          <div className="container">
    
            <header className="section-header">
              <div dangerouslySetInnerHTML={this.getHTML(clients.header)} />
            </header>
    
            <div className="owl-carousel clients-carousel" >
              {this.renderClients(clients.carousel)}
            </div>
    
          </div>
        </section>
    )
  }

//<OwlCarousel className="owl-carousel clients-carousel" autoplay dots loop responsive={this.state.responsive} >

}
