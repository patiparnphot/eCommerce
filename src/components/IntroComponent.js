import React from 'react';
import Loader from './loader';


export default function Intro({intro}) {
  
  React.useEffect(() =>{
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
  }, []);
  
    
  if (!intro) {
    return <Loader/>
  } else {
    return (
      <section id="intro">
        <div className="container-fluid" style={{backgroundImage: intro.background}}>
          <div className="row">
            <div className="clearfix">
              <div className="owl-carousel slideshow">

                <Slideshow items={intro.slideshows}/>

              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

function Slideshow({items}) {
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
                  {
                    (
                      !item.btnLink || (item.btnLink == "")
                    ) ? (
                      <span></span>
                    ) : (
                      <a href={item.link} className="sdw-hover btn btn-lg btn-material btn-default">
                        <span className="body">{item.btnLink}</span>
                      </a>
                    )
                  }
                </span>
              </span>
            </div>
            <div className="col-xs-10 col-xs-offset-1 col-md-7 col-md-offset-0">
              {
                (
                  !item.image || (item.image == "")
                ) ? (
                  <div></div>
                ) : (
                  <div className="img">
                    <img src={item.image} alt=""/>
                  </div>
                )
              }
              {
                (
                  !item.campaign || (item.campaign == "")
                ) ? (
                  <span></span>
                ) : (
                  <span className="sale-badge bg-green text-uppercase">
                    {item.campaign}
                  </span>
                )
              }
              <span className="price hidden-xs">
                {
                  (
                    !item.tag || (item.tag == "")
                  ) ? (
                    <span></span>
                  ) : (
                    <span className="wrap text-red">
                      {item.tag}
                    </span>
                  )
                }
              </span>
              <span className="text-center visible-xs">
                {
                  (
                    !item.tag || (item.tag == "")
                  ) ? (
                    <span></span>
                  ) : (
                    <span className="sdw-wrap">
                      <a href={item.link} className="sdw-hover btn btn-lg btn-material btn-primary">
                        <i className="icon icofont icofont-basket"></i>
                        <span className="body">
                          {item.tag}
                        </span>
                      </a>
                    </span> 
                  )
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  });
}
