import React from 'react';
import OwlCarousel from 'react-owl-carousel';


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
  
//   componentDidMount() {
//     this.props.fetchBlogs();
//   }
   
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
      return <NotFoundPage/>
    }
    
    return (
        <section id="clients" className="wow fadeInUp">
          <div className="container">
    
            <header className="section-header">
              <div dangerouslySetInnerHTML={this.getHTML(clients.header)} />
            </header>
    
            <OwlCarousel
              className="owl-carousel clients-carousel"
              autoplay
              dots
              loop
              responsive={this.state.responsive}
            >
              {this.renderClients(clients.carousel)}
            </OwlCarousel>
    
          </div>
        </section>
    )
  }
}