import React from 'react';


export default class Intro extends React.Component {
  
  componentDidMount() {
    var owlCarousel = require('../../static/assets/js/owl.carousel.min.js');
    // Slideshow carousel (uses the Owl Carousel library)
    $(".owl-carousel.slideshow").owlCarousel({
      loop       : true,
      center     : true,
      smartSpeed : 1000,
      items      : true,
      nav        : true,
      navText    : ['<span class="arrow-left icofont icofont-curved-left">', '<span class="arrow-right icofont icofont-curved-right">'],
      responsive: {
        0:{
          dots : false
        },
        992:{
          dots : true
        }
      }
    });
  }
  
  getHTML(htmlCode) {
    return { __html: htmlCode };
  }

  renderSlideshow(items){
    return items.map((item) => {
      return (
        <div className="item">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-5 hidden-xs hidden-sm">
                <h2 className="header text-uppercase text-blue">{item.header}</h2>
                <p>{item.description}</p>
                <span className="btn-panel">
                  <span className="sdw-wrap">
                    <a href={item.link} className="sdw-hover btn btn-lg btn-material btn-default">
                      <span className="body">{item.btnLink}</span>
                    </a>
                  </span>
                </span>
              </div>
              <div className="col-xs-10 col-xs-offset-1 col-md-7 col-md-offset-0">
                <div className="img">
                  <img src={item.image} alt=""/>
                </div>
                {
                  (
                    !item.campaign
                  ) ? (
                    <span></span>
                  ) : (
                    <span className="sale-badge bg-green text-uppercase">
                      {item.campaign}
                    </span>
                  )
                }
                <span className="price hidden-xs">
                  <span className="wrap text-red">
                    {item.tag}
                  </span>
                </span>
                <span className="text-center visible-xs">
                  <span className="sdw-wrap">
                    <a href={item.link} className="sdw-hover btn btn-lg btn-material btn-primary">
                      <i className="icon icofont icofont-basket"></i>
                      <span className="body">
                        {item.tag}
                      </span>
                    </a>
                  </span> 
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
  
  
  render() {
    
    const items = [
      {
        header: "Sneakers",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et maxime vero amet, quisquam nihil! Odit, hic fugiat!",
        link: "#",
        btnLink: "More Info",
        image: "/images/slideshow/img-01.png",
        campaign: "New",
        tag: "JustDoIt!!!"
      },
      {
        header: "Belt",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et maxime vero amet, quisquam nihil! Odit, hic fugiat!",
        link: "#",
        btnLink: "More Info",
        image: "/images/slideshow/img-02.png",
        campaign: "Hot",
        tag: "BeltYourWaist"
      },
      {
        header: "Camera",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et maxime vero amet, quisquam nihil! Odit, hic fugiat!",
        link: "#",
        btnLink: "More Info",
        image: "/images/slideshow/img-03.png",
        tag: "ShootYourBaby"
      }
    ];

    const { intro } = this.props;
    
    if (!intro) {
      return <div/>
    }
    
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="clearfix">
            <div className="owl-carousel slideshow">

              {this.renderSlideshow(intro.slideshows)}

            </div>
          </div>
        </div>
      </div>
    )
  }
}


