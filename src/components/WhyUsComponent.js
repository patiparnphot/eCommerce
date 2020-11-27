import React from 'react';


export default class WhyUs extends React.Component {
  
//   componentDidMount() {
//     this.props.fetchBlogs();
//   }
  
  renderTopics(topics) {
    return topics.map((topic) => {
      return (
        <div key={topic.icon} className="features wow bounceInUp clearfix">
          <i className={topic.icon} style={{color: topic.iconColor}}></i>
          <div dangerouslySetInnerHTML={this.getHTML(topic.content)} />
        </div>
      );
    });
  }
   
  renderCounters(counters) {
    return counters.map((counter) => {
      return (
        <div key={counter.text} className="col-lg-3 col-6 text-center">
          <span data-toggle="counter-up">{counter.amount}</span>
          <p>{counter.text}</p>
        </div>
      );
    });
  }
  
  getHTML(htmlCode) {
    return { __html: htmlCode };
  }
  
  
  render() {
    
    const { whyUs } = this.props;
    
    if (!whyUs) {
      return <div/>
    }
    
    return (
      <div className="container-fluid block bg-grey-lightness space-top">
  <div className="row">
    <div className="container space-top">

      <div className="row hidden-xs">
        <div className="col-xs-12 img-on-bg">
          <img src="images/blocks/parallax-bg-popular-on-shop.png" alt=""/>
        </div>
      </div>
      
      <div className="row">

        <div className="col-md-4 col-lg-3 asside">

          <div className="inblock sdw">
            <div className="wrap bg-white">
              <div className="sizer">
                <h3 className="header text-uppercase">Size</h3>
                <ul className="selecter">
                  <li data-sizer-id="1">M</li>
                  <li data-sizer-id="2">L</li>
                  <li data-sizer-id="3">SL</li>
                  <li className="active" data-sizer-id="4">XL</li>
                  <li data-sizer-id="5">XXL</li>
                </ul>
                <div className="range"></div>
                <div className="amoutn">
                  <span className="first">SL</span>
                  <span className="last">XXL</span>
                </div>
              </div>
              <div className="divider"></div>
              <h3 className="header text-uppercase">Color</h3>
              <div className="color-selecting">
                <ul className="selecter">
                  <li className="gray" data-color-id="1"></li>
                  <li className="black" data-color-id="2"></li>
                  <li className="red active" data-color-id="3"></li>
                  <li className="purp" data-color-id="4"></li>
                  <li className="blue" data-color-id="5"></li>
                  <li className="aqua" data-color-id="6"></li>
                  <li className="green" data-color-id="7"></li>
                  <li className="yellow" data-color-id="8"></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="asside-nav bg-white hidden-xs">
            <div className="header text-uppercase text-white bg-blue">
              Category
            </div>
            <ul className="nav-vrt bg-white">
              <li className="active">
                <a href="#" className="btn-material">
                  Man line
                </a>
              </li>
              <li>
                <a href="#" className="btn-material">
                  Woman
                </a>
              </li>
              <li>
                <a href="#" className="btn-material">
                  Jewerly
                </a>
              </li>
              <li>
                <a href="#" className="btn-material">
                  Electronics
                </a>
              </li>
            </ul>
          </div>

          <div className="inblock padding-none visible-xs">
            <div className="mobile-category nav-close">
              <div className="header bg-blue">
                <span className="head">Category</span>
                <span className="btn-swither" >
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
              <ul className="nav-vrt bg-white">
                <li className="active">
                  <a href="#" className="btn-material">
                    Man line
                  </a>
                </li>
                <li>
                  <a href="#" className="btn-material">
                    Woman
                  </a>
                </li>
                <li>
                  <a href="#" className="btn-material">
                    Jewerly
                  </a>
                </li>
                <li>
                  <a href="#" className="btn-material">
                    Electronics
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        <div className="col-md-8 col-lg-9 shop-items-set shop-items-full">
          
          <div className="row pagination-block hidden-xs">
            <div className="col-xs-12">
              <div className="wrap">
                <ul className="swither">
                  <li className="rows active">
                    <span></span>
                    <span></span>
                    <span></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
                                
          <div className="row item-wrapper">
                                    
            <div className="col-xs-6 col-sm-4 col-md-6 col-lg-4 shop-item hover-sdw">
              <div className="wrap">
                <div className="body">
                  <div className="comp-header st-4 text-uppercase">
                    T-shirt
                    <span>
                      fake Brand
                    </span>
                    <span className="sale-badge item-badge text-uppercase bg-green">
                      New
                    </span>
                  </div>
                  <div className="image">
                    <img className="hover" src="images/shop/img-01-1.jpg" alt=""/>
                    <img className="main" src="images/shop/img-01.jpg" alt=""/>
                  </div>
                  <div className="caption">
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
                        24 members
                        <span>like it</span>
                      </div>
                    </div>
                    <ul className="features">
                      <li>
                        <i className="icofont icofont-shield"></i>
                        <span>24 days. Money Back Guarantee</span>
                      </li>
                      <li>
                        <i className="icofont icofont-ship"></i>
                        <span>Free shipping</span>
                      </li>
                      <li>
                        <i className="icofont icofont-hand"></i>
                        <span>Free help and setup</span>
                      </li>
                    </ul>
                    <p className="text">
                      Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris.
                    </p>
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
  </div>
</div>
    )
  }
}

