import React from 'react';


export default class Recent extends React.Component {
  
  componentDidMount() {
    // this.props.fetchGoods();
  // }

  // componentDidUpdate(){
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
    var parallax = require('../../static/assets/js/jquery.TDParallax.min.js');
    $('.parallax-block').TDParallax();
  }
   
  getHTML(htmlCode) {
    return { __html: htmlCode };
  }

  renderCost(options) {
    return options.map((option) => {
      return (
        <span className="price">
          <span className="price">
            <small>{option.key}</small>: {option.cost}<small>.00</small>
          </span>
        </span>
      );
    });
  }

  renderStars(rating) {
    let ratingNum = parseFloat(rating)
    let ratingRounded = Math.round(ratingNum);
    let array = ['','','','',''];
    return array.map((list, index) => {
      if (index < ratingRounded) {
        return (
          <li className='active'>
            <i className="icofont icofont-star"></i>
          </li>
        );
      } else {
        return (
          <li>
            <i className="icofont icofont-star"></i>
          </li>
        );
      }
    });
  }

  renderGoods(goods){
    return goods.map((good) => {
      return (
        <div className="shop-item hover-sdw">
          <div className="wrap">
            <div className="body">
              <div className="comp-header st-4 text-uppercase">
                {good.title}
                <span>
                  {good.brand}
                </span>
                <div className="rate">
                  <ul className="stars">
                    {this.renderStars(good.rating)}
                  </ul>
                  <div className="rate-info">
                    {good.raterAmount} members rate it
                  </div>
                </div>
                {
                  (
                    !good.campaign
                  ) ? (
                    <span></span>
                  ) : (
                    <span className="sale-badge item-badge text-uppercase bg-green">
                      {good.campaign}
                    </span>
                  )
                }
              </div>
              <div className="image">
                <img className="main" src={good.image} alt=""/>
              </div>
            </div>
            <div className="info">
              <a href={ '/goods/' + good.slug } className="btn-material btn-price">
                {this.renderCost(good.options)}
              </a>
            </div>
          </div>
        </div>
      );
    });
  }
  
  
  render() {
    
    const { recent } = this.props;
    const { goods, loading, error } = this.props.recentGoods;
    
    if (!recent || !goods) {
      return <div/>
    }
    
    return (
<section id="recent">

<div className="container-fluid">
  <div className="row">
    <div className="clearfix">
      <div className="substrate-wrap">

        <div className="substrate parallax-block"
          data-speed-direction=".3"
          data-default-pos="-600"
          data-parallax-block="true">
          <div className="text text-darkness">
            {recent.parallaxText}
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
        <h2 className="header">{recent.header}</h2>
      </div>
    </div>
  </div>

  <div className="row">
    <div className="col-xs-12">
      <div className="owl-carousel owl-default features nav-top-left">

        {this.renderGoods(goods)}
      
      </div>
    </div>
  </div>

</div>

</section>
    )
  }
}
