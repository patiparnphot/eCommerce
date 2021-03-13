import React from 'react';
import Loader from './loader';
import { Link } from 'react-router-dom';


export default function Blog ({fetchBlogs, blogsList, content}) {

  const [alreadyFetch, setAlreadyFetch] = React.useState(false);
  
  React.useEffect(() => {
    fetchBlogs(setAlreadyFetch);
  }, []);

  React.useEffect(() => {
    if(alreadyFetch) {
      var owlCarousel = require('../../static/assets/js/owl.carousel.min.js');
      // Blogs carousel (uses the Owl Carousel library)
      $('.owl-carousel.latest-on-blog').owlCarousel({
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
            items: 3,
            dots : false
          },
          1200:{
            items: 3,
            nav  : true,
            dots : true
          }
        }
      });
      var parallax = require('../../static/assets/js/jquery.TDParallax.min.js');
      $('.parallax-block').TDParallax();
    }
  }, [alreadyFetch]);
  
    
  const { blogs, loading, error } = blogsList;

  if(loading) {
    return <Loader/>      
  } else if(error) {
    return <div className="alert alert-danger">Error: {error.message}</div>
  } else if(!content || !blogs) {
    return <div/>;
  } else {
    return (
      <section id="blogs">
        <div className="container-fluid">
          <div className="row">
            <div className="clearfix">
              <div className="substrate-wrap">
                <div className="substrate parallax-block"
                  data-speed-direction=".3"
                  data-default-pos="-400"
                  data-parallax-block="true">
                  <div className="text text-dark">
                    {content.parallaxText}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid block space-top">
          <div className="row">
            <div className="container">
              <div className="row">
      
                <div className="col-md-4 col-lg-3 asside">
                  <div className="inblock padding-none">
                    <div className="wrap">
                      <span className="comp-header st-16 text-uppercase">
                        {content.header}
                        <span className="text-grey">
                          {content.subHeader}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
      
                <div className="col-md-8 col-lg-9">
                  <div className="owl-carousel owl-default latest-on-blog nav-bottom-right">
                  
                    <Blogs blogs={blogs}/>
      
                  </div>
                </div>
      
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

function Blogs({blogs}) {
  return blogs.map((blog) => {
    return (
      <div className="blog-item">
        <div className="wrap">
          <div className="image">
            <img src={blog.image} alt=""/>
          </div>                            
          <div className="caption">
            <h3 className="header">
              <span className="text-uppercase">
                {blog.title}
              </span>
            </h3>
            <Link to={"/blogs/" + blog.slug} className="more-info">More info</Link>
          </div>
        </div>
      </div>
    );
  });
}
