import React from 'react';
import { Link } from 'react-router-dom';


export default class PopularOnShop extends React.Component {

  constructor(props) {
    super(props);
    // this.onFilterChange = this.onFilterChange.bind(this);
    this.state = {
      numberOfStars: 5,
      first: 1,
      last: 4,
      max: 5,
      min: 0
    };
  }
  
  componentDidMount() {
    this.props.fetchGoods();
    let _this = this;

    $('.price-slider').each(function() {
      var $block   = $(this),
          $range   = $block.find('.range'),
          data     = $block.data();
      $range.slider({
        range: true,
        min: _this.state.min,
        max: _this.state.max,
        values: [_this.state.first, _this.state.last],
        slide: function(event, ui) {
          _this.setState({
            first: ui.values[0],
            last: ui.values[1]
          });
        }
      });
    });

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
  }

  componentDidUpdate() {
    // console.log("first: ", this.state.first);
    // console.log("last: ", this.state.last);
  }

  renderFeatures(keys, features) {
    return keys.map((key) => {
      return (
        <ul className="features" style={{marginBottom: '0px'}}>
          <li style={{width: 'auto'}}>
            <i className="icofont icofont-shield"></i>
            <span>{key}</span>
          </li>
          <li style={{width: 'auto'}}>
            <div className="rate" style={{paddingLeft: '70px', marginTop: '15px', marginBottom: '10px'}}>
              <ul className="stars">
                {this.renderStars(features[key], 'feature')}
              </ul>
            </div>
          </li>
        </ul>
      )
    })
  }

  renderCost(options) {
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

  renderStars(rating, option) {
    let ratingNum = parseFloat(rating)
    let ratingRounded = Math.round(ratingNum);
    let array = [...Array(+this.state.numberOfStars).keys()];
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

  renderGoods(goods) {
    return goods.map((good) => {
      let specialFeatureKeys
      if (good.specialFeatures) {
        specialFeatureKeys = Object.keys(good.specialFeatures);
      }
      return (
        <div className="col-xs-6 col-sm-4 col-md-6 col-lg-4 shop-item hover-sdw">
          <div className="wrap">
            <div className="body">
              <div className="comp-header st-4 text-uppercase">
                {good.title}
                <span>
                  {good.brand}
                </span>
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
              <div className="caption">
                <div className="rate">
                  <ul className="stars">
                    {this.renderStars(good.rating)}
                  </ul>
                  <div className="rate-info">
                    {good.raterAmount} members
                    <span>like it</span>
                  </div>
                </div>
                {
                  (
                    !good.specialFeatures
                  ) ? (
                    <span></span>
                  ) : (
                    this.renderFeatures(specialFeatureKeys, good.specialFeatures)
                  )
                }
              </div>
            </div>
            <div className="info">
              <Link to={ '/goods/' + good.category + '/' + good.slug } className="btn-material btn-price">
                <span className="price">
                  <span className="price">
                    ฿ {good.options[0].cost}<small>.00 per Unit</small>
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }

  renderCategories(categories) {
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
  
  
  render() {
    
    const { popularOnShop } = this.props;
    const { goods, loading, error } = this.props.filterGoods;
    
    if (!popularOnShop || !goods) {
      return <div/>
    }
    
    return (
      <div className="container-fluid block bg-grey-lightness space-top">
  <div className="row">
    <div className="container space-top">

      <div className="row hidden-xs">
        <div className="col-xs-12 img-on-bg">
          <img src={popularOnShop.sidebarImage} alt=""/>
        </div>
      </div>
      
      <div className="row">

        <div className="col-md-4 col-lg-3 asside">

          <div className="inblock sdw">
            <div className="wrap bg-white">
              <h3 className="header text-uppercase">Aroma</h3>
              <div class="price-slider">

                <div class="range"></div>

                <div class="amoutn">
                  <input type="text" class="first" value={this.state.first} readonly/>
                  <input type="text" class="last" value={this.state.last} readonly/>
                </div>
              </div>
              <button onClick={() => this.props.test(this.props.popularGoods.goods, {key: "Aroma", first: this.state.first, last: this.state.last})}>
                filtering Aroma
              </button>
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
              <button onClick={() => this.props.resetGoods(this.props.popularGoods.goods)}>
                Reset
              </button>
              <button onClick={() => this.props.filteringGoods(this.props.popularGoods.goods, {category: "car"})}>
                filtering car
              </button>
              <button onClick={() => this.props.filteringGoods(this.props.popularGoods.goods, {category: "garbage"})}>
                filtering garbage
              </button>
              <button onClick={() => this.props.filteringGoods(this.props.popularGoods.goods, {category: "cloth"})}>
                filtering cloth
              </button>
              <button onClick={() => this.props.filteringGoods(this.props.popularGoods.goods, {category: "cock"})}>
                filtering cock
              </button>
            </div>
          </div>

          <div className="asside-nav bg-white hidden-xs">
            <div className="header text-uppercase text-white bg-blue">
              {popularOnShop.categoryHead}
            </div>
            <ul className="nav-vrt bg-white">
              {this.renderCategories(popularOnShop.categories)}
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
                {this.renderCategories(popularOnShop.categories)}
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

            {this.renderGoods(goods)}

          </div>

        </div>
        
      </div>

    </div>
  </div>
</div>
    )
  }
}

