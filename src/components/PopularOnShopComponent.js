import React from 'react';
import { Link } from 'react-router-dom';


export default class PopularOnShop extends React.Component {

  constructor(props) {
    super(props);
    this.selectOption = this.selectOption.bind(this);
    this.state = {
      alreadyFetch: false,
      option: "size M",
      checkSizeS: false,
      checkSizeM: true,
      checkSizeL: false,
      checkSizeXL: false,
      numberOfStars: 5,
      aroma: {
        first: 1,
        last: 4,
        max: 5,
        min: 0
      },
      acidity: {
        first: 1,
        last: 4,
        max: 5,
        min: 0
      },
      fruity: {
        first: 1,
        last: 4,
        max: 5,
        min: 0
      }
    };
  }
  
  componentDidMount() {
    this.props.fetchGoods((arg) => this.setState({alreadyFetch: arg}));
    let _this = this;

    $('#aroma-slider').each(function() {
      var $block   = $(this),
          $range   = $block.find('.range'),
          data     = $block.data();
      $range.slider({
        range: true,
        min: _this.state.aroma.min,
        max: _this.state.aroma.max,
        values: [_this.state.aroma.first, _this.state.aroma.last],
        slide: function(event, ui) {
          _this.setState({
            aroma: {
              first: ui.values[0],
              last: ui.values[1]
            }
          });
        }
      });
    });

    $('#acidity-slider').each(function() {
      var $block   = $(this),
          $range   = $block.find('.range'),
          data     = $block.data();
      $range.slider({
        range: true,
        min: _this.state.acidity.min,
        max: _this.state.acidity.max,
        values: [_this.state.acidity.first, _this.state.acidity.last],
        slide: function(event, ui) {
          _this.setState({
            acidity: {
              first: ui.values[0],
              last: ui.values[1]
            }
          });
        }
      });
    });

    $('#fruity-slider').each(function() {
      var $block   = $(this),
          $range   = $block.find('.range'),
          data     = $block.data();
      $range.slider({
        range: true,
        min: _this.state.fruity.min,
        max: _this.state.fruity.max,
        values: [_this.state.fruity.first, _this.state.fruity.last],
        slide: function(event, ui) {
          _this.setState({
            fruity: {
              first: ui.values[0],
              last: ui.values[1]
            }
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
    if(this.state.alreadyFetch && this.props.popularGoods.goods && this.props.popularGoods.goods.length > 0) {
      this.setState({alreadyFetch: false});
      this.props.resetGoods(this.props.popularGoods.goods)
    }
    // console.log("first: ", this.state.first);
    // console.log("last: ", this.state.last);
  }

  selectOption(option) {
    this.setState({
      option: option
    });
    if(option == "size S") {
      this.setState({
        checkSizeS: true,
        checkSizeM: false,
        checkSizeL: false,
        checkSizeXL: false
      })
    } else if(option == "size M") {
      this.setState({
        checkSizeS: false,
        checkSizeM: true,
        checkSizeL: false,
        checkSizeXL: false
      })
    } else if(option == "size L") {
      this.setState({
        checkSizeS: false,
        checkSizeM: false,
        checkSizeL: true,
        checkSizeXL: false
      })
    } else if(option == "size XL") {
      this.setState({
        checkSizeS: false,
        checkSizeM: false,
        checkSizeL: false,
        checkSizeXL: true
      })
    }
  }

  renderFeatures(keys, features) {
    return keys.map((key) => {
      if(key != "key" && key != "cost" && key != "_id") {
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
      }
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
      let filteredOption = good.options.filter((option) => option.key == this.state.option);
      if(filteredOption.length == 1) {
        let optionKeys = Object.keys(filteredOption[0]);
        if(
          filteredOption[0].aroma &&
          filteredOption[0].aroma >= this.state.aroma.first &&
          filteredOption[0].aroma <= this.state.aroma.last &&
          filteredOption[0].acidity &&
          filteredOption[0].acidity >= this.state.acidity.first &&
          filteredOption[0].acidity <= this.state.acidity.last &&
          filteredOption[0].fruity &&
          filteredOption[0].fruity >= this.state.fruity.first &&
          filteredOption[0].fruity <= this.state.fruity.last
        ) {

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
                        !optionKeys
                      ) ? (
                        <span></span>
                      ) : (
                        this.renderFeatures(optionKeys, filteredOption[0])
                      )
                    }
                  </div>
                </div>
                <div className="info">
                  <Link to={ '/goods/' + good.category + '/' + good.slug } className="btn-material btn-price">
                    <span className="price">
                      <span className="price">
                        ฿ {filteredOption[0].cost}<small>.00 per Unit</small>
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          );
        }
      }
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

              <h3 className="header text-uppercase">AROMA</h3>
              <div id="aroma-slider" class="price-slider">

                <div class="range"></div>

                <div class="amoutn">
                  <input type="text" class="first" value={this.state.aroma.first} readOnly/>
                  <input type="text" class="last" value={this.state.aroma.last} readOnly/>
                </div>

              </div>
              
              <div className="divider"></div>

              <h3 className="header text-uppercase">ACIDITY</h3>
              <div id="acidity-slider" class="price-slider">

                <div class="range"></div>

                <div class="amoutn">
                  <input type="text" class="first" value={this.state.acidity.first} readOnly/>
                  <input type="text" class="last" value={this.state.acidity.last} readOnly/>
                </div>

              </div>

              <div className="divider"></div>

              <h3 className="header text-uppercase">FRUITY</h3>
              <div id="fruity-slider" class="price-slider">

                <div class="range"></div>

                <div class="amoutn">
                  <input type="text" class="first" value={this.state.fruity.first} readOnly/>
                  <input type="text" class="last" value={this.state.fruity.last} readOnly/>
                </div>

              </div>
              
              <div className="divider"></div>

              {(
                this.state.checkSizeS
              ) ? (
                <input type="radio" id="size S" name="option"
                  onClick={() => this.selectOption("size S")}
                  checked
                />
              ) : (
                <input type="radio" id="size S" name="option"
                  onClick={() => this.selectOption("size S")}
                />
              )}
              <label for="size S">Size S</label>
              <br/>
              {(
                this.state.checkSizeM
              ) ? (
                <input type="radio" id="size M" name="option"
                  onClick={() => this.selectOption("size M")}
                  checked
                />
              ) : (
                <input type="radio" id="size M" name="option"
                  onClick={() => this.selectOption("size M")}
                />
              )}
              <label for="size M">Size M</label>
              <br/>
              {(
                this.state.checkSizeL
              ) ? (
                <input type="radio" id="size L" name="option"
                  onClick={() => this.selectOption("size L")}
                  checked
                />
              ) : (
                <input type="radio" id="size L" name="option"
                  onClick={() => this.selectOption("size L")}
                />
              )}
              <label for="size L">Size L</label>
              <br/>
              {(
                this.state.checkSizeXL
              ) ? (
                <input type="radio" id="size XL" name="option"
                  onClick={() => this.selectOption("size XL")}
                  checked
                />
              ) : (
                <input type="radio" id="size XL" name="option"
                  onClick={() => this.selectOption("size XL")}
                />
              )}
              <label for="size XL">Size XL</label>

              <hr/>
              <button onClick={() => this.props.resetGoods(this.props.popularGoods.goods)}>
                Reset
              </button>
              <hr/>
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

