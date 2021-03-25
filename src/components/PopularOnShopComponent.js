import React from 'react';
import Loader from './loader';
import { Link } from 'react-router-dom';


export default function PopularOnShop({fetchGoods, resetGoods, filteringGoods, popularGoods, filterGoods, popularOnShop, memberRate, memberLike}) {
    
  const [alreadyFetch, setAlreadyFetch] = React.useState(false);
  
  React.useEffect(() => {
    fetchGoods(setAlreadyFetch);

    $('.mobile-category').each(function() {
      var $this = $(this),
          $btn  = $this.find('.btn-swither');
      $btn.on('click', function() {
        if($this.hasClass('nav-close')) {
          $this.removeClass('nav-close')
        } else {
          $this.addClass('nav-close')
        }
      })
    });
  }, []);

  React.useEffect(() => {
    if(alreadyFetch && popularGoods.goods && popularGoods.goods.length > 0) {
      resetGoods(popularGoods.goods)
    }
  }, [alreadyFetch]);
  
    
  const { goods, loading, error } = filterGoods;
  
  if (!popularOnShop || !goods || loading) {
    return <Loader/>
  } else {
    return (
      <section id="popularOnShop">
        <div className="container-fluid block bg-grey-lightness">
          <div className="row">
            <div className="container space-top">

              <div className="row hidden-xs">
                <div className="col-xs-12 img-on-bg">
                  {
                    (
                      !popularOnShop.sidebarImage || (popularOnShop.sidebarImage == "")
                    ) ? (
                      <div/>
                    ) : (
                      <img src={popularOnShop.sidebarImage} alt=""/>
                    )
                  }
                </div>
              </div>
              
              <div className="row">

                <div className="col-md-4 col-lg-3 asside">

                  <div className="asside-nav bg-white hidden-xs">
                    <div className="header text-uppercase text-white bg-blue">
                      {popularOnShop.categoryHead}
                    </div>
                    <ul className="nav-vrt bg-white">
                      <Categories categories={popularOnShop.categories}/>
                    </ul>
                  </div>

                  <div className="inblock padding-none visible-xs">
                    <div className="mobile-category nav-close">
                      <div className="header bg-blue">
                        <span className="head">{popularOnShop.categoryHead}</span>
                        <span className="btn-swither" >
                          <span></span>
                          <span></span>
                          <span></span>
                        </span>
                      </div>
                      <ul className="nav-vrt bg-white">
                        <Categories categories={popularOnShop.categories}/>
                      </ul>
                    </div>
                  </div>

                </div>

                <div className="col-md-8 col-lg-9 shop-items-set shop-items-full">
                                        
                  <div className="row item-wrapper">

                    <Goods goods={goods} memberRate={memberRate} memberLike={memberLike} />

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

function Features({keys, features}) {
  return keys.map((key) => {
    if(key != "key" && key != "cost" && key != "_id" && key != "isAvailable") {
      return (
        <ul className="features" style={{marginBottom: '0px'}}>
          <li style={{width: 'auto'}}>
            <i className="icofont icofont-shield"></i>
            <span>{key}</span>
          </li>
          <li style={{width: 'auto'}}>
            <div className="rate" style={{paddingLeft: '70px', marginTop: '15px', marginBottom: '10px'}}>
              <ul className="stars">
                <Stars rating={features[key]} option='feature'/>
              </ul>
            </div>
          </li>
        </ul>
      )
    }
  })
}

function Cost({options}) {
  return options.map((option, index) => {
    if (index == 0) {
      return (
        <span className="price">
          <small>{option.key}</small>: {option.cost}<small>.00</small>
        </span>
      );
    } else {
      return (
        <span className="price" style={{paddingLeft: '5px'}}>
          <small>{option.key}</small>: {option.cost}<small>.00</small>
        </span>
      );
    }
  });
}

function Stars({rating, option, numberOfStars=5}) {
  let ratingNum = parseFloat(rating)
  let ratingRounded = Math.round(ratingNum);
  let array = [...Array(+numberOfStars).keys()];
  if (option && option == "feature") {
    return array.map(n => {
      if (n < ratingRounded) {
        return (
          <li className='active' style={{width: 'auto'}}>
            <i className="icofont icofont-sun"></i>
          </li>
        );
      } else {
        return (
          <li style={{width: 'auto'}}>
            <i className="icofont icofont-sun"></i>
          </li>
        );
      }
    });  
  } else {
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
}

function Goods({goods, memberRate, memberLike}) {
  return goods.map((good) => {
    let filteredOption = good.options[0];
    let optionKeys = Object.keys(filteredOption);
    return (
      <div className="col-xs-6 col-sm-4 col-md-6 col-lg-4 shop-item hover-sdw">
        <div className="wrap">
          <div className="body">
            <div className="comp-header st-4 text-uppercase">
              {good.title}
              <span>
                {good.brand}
              </span>
              <div className="rate">
                <ul className="stars">
                  <Stars rating={good.rating}/>
                </ul>
                <div className="rate-info">
                  {`${good.raterAmount} ${memberRate}`}
                </div>
              </div>
              {
                (
                  !good.campaign || (good.campaign == "")
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
            <div className="caption">
              <div className="rate">
                <ul className="stars">
                  <Stars rating={good.rating}/>
                </ul>
                <div className="rate-info">
                  {`${good.raterAmount} ${memberLike}`}
                </div>
              </div>
              {
                (
                  !optionKeys || optionKeys.length <= 2
                ) ? (
                  <ul class="features"><li><span></span></li><li><div class="rate"></div></li></ul>
                ) : (
                  <Features keys={optionKeys} features={filteredOption}/>
                )
              }
            </div>
          </div>
          <div className="info">
            <Link to={ '/goods/' + good.category + '/' + good.slug } className="btn-material btn-price">
              <span className="price">
                <span className="price">
                  ฿ {filteredOption.cost}<small>.00</small>
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    );
  });
}

function Categories({categories}) {
  return categories.map((category) => {
    return (
      <li>
        <a href={category.link} className="btn-material">
          {category.topic}
        </a>
      </li>
    )
  })
}
