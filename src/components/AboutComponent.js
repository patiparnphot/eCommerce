import React from 'react';


export default class About extends React.Component {
  
  componentDidMount() {
    var owlCarousel = require('../../static/assets/js/owl.carousel.min.js');
    // Features carousel (uses the Owl Carousel library)
    $('.owl-carousel.features').owlCarousel({
      loop            : false,
      margin          : 0,
      responsiveClass : true,
      nav             : true,
      navText         : ['<span class="arrow-left icofont icofont-curved-left">', '<span class="arrow-right icofont icofont-curved-right">'],
      responsive: {
        0:{
          items: 2,
          dots : false
        },
        321:{
          items: 2,
          dots : false
        },
        767:{
          items: 3
        },
        1200:{
          items: 4
        }
      }
    });
  }
   
  getHTML(htmlCode) {
    return { __html: htmlCode };
  }
  
  
  render() {
    
    const { about } = this.props;
    
    if (!about) {
      return <div/>
    }
    
    return (
<section id="feature">

<div className="container-fluid">
  <div className="row">
    <div className="clearfix">
      <div className="substrate-wrap">

        <div className="substrate parallax-block"
          data-speed-direction=".3"
          data-default-pos="-600"
          data-parallax-block="true">
          <div className="text text-darkness">
            IN TREND
          </div>
        </div>

      </div>
    </div>
  </div>
</div>

<div className="container block">

  <div className="row">
    <div className="col-xs-12">
      <div className="block-header text-uppercase">
        <h2 className="header">Features</h2>
      </div>
    </div>
  </div>

  <div className="row">
    <div className="col-xs-12">
      <div className="owl-carousel owl-default features nav-top-left">

        <div className="shop-item hover-sdw">
          <div className="wrap">
            <div className="body">
              <div className="comp-header st-4 text-uppercase">
                T-shirt
                <span>
                  fake Brand
                </span>
                <div className="rate">
                  <ul className="stars">
                    <li className="active">
                      <i className="icofont icofont-star"></i>
                    </li>
                    <li className="active">
                      <i className="icofont icofont-star"></i>
                    </li>
                    <li className="active">
                      <i className="icofont icofont-star"></i>
                    </li>
                    <li className="active">
                      <i className="icofont icofont-star"></i>
                    </li>
                    <li>
                      <i className="icofont icofont-star"></i>
                    </li>
                  </ul>
                  <div className="rate-info">
                    24 members rate it
                  </div>
                </div>
                <span className="sale-badge item-badge text-uppercase bg-green">
                  New
                </span>
              </div>
              <div className="image">
                <img className="hover" src="images/shop/img-01-1.jpg" alt=""/>
                <img className="main" src="images/shop/img-01.jpg" alt=""/>
              </div>
            </div>
            <div className="info">
              <a href="shop-item.html" className="btn-material btn-price">
                <span className="price">
                  <span className="curr">
                    $
                  </span>
                  <span className="sale">
                    <span>234<small>.00</small></span>
                  </span>
                  <span className="price">
                    175<small>.50</small>
                  </span>
                </span>
                <span className="icon-card">
                  <i className="icofont icofont-cart-alt"></i>
                </span>
              </a>
            </div>
          </div>
        </div>                
      
      </div>
    </div>
  </div>

</div>

</section>
    )
  }
}

