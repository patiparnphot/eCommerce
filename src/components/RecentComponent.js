import React from 'react';
import { Link } from 'react-router-dom';


export default function Recent ({recent, recentGoods, fetchGoods}) {

  const [numberOfStars, setNumberOfStars] = React.useState(5);
  const [alreadyFetch, setAlreadyFetch] = React.useState(false);
  
  React.useEffect(() => {
    fetchGoods(setAlreadyFetch);
  }, []);

  React.useEffect(() => {
    if(alreadyFetch && (recentGoods.goods.length > 0)) {
      console.log("recentGoodLog: ", recentGoods.goods);
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
  }, [alreadyFetch]);
   
  function getHTML(htmlCode) {
    return { __html: htmlCode };
  }

  function renderCost(options) {
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

  function renderStars(rating) {
    let ratingNum = parseFloat(rating)
    let ratingRounded = Math.round(ratingNum);
    let array = [...Array(+numberOfStars).keys()];
    return array.map(n => {
      if (n < ratingRounded) {
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

  function renderGoods(goods){
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
                    {renderStars(good.rating)}
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
              <Link to={ '/goods/' + good.category + '/' + good.slug } className="btn-material btn-price">
                <span className="price">
                  <span className="price">
                    ฿ {good.options[0].cost}<small>.00</small>
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }
  
  
    // const { goods, loading, error } = recentGoods;
    
    if (!recent || !recentGoods.goods) {
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

        {renderGoods(recentGoods.goods)}
      
      </div>
    </div>
  </div>

</div>

</section>
    )

}

