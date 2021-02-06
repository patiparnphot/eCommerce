import React from 'react';
import { Link } from 'react-router-dom';


let initialFeatures = [
  {
    name: "aroma",
    first: 1,
    last: 5,
    min: 0,
    max: 5
  },
  {
    name: "acidity",
    first: 1,
    last: 5,
    min: 0,
    max: 5
  },
  {
    name: "fruity",
    first: 1,
    last: 5,
    min: 0,
    max: 5
  }
];

let initialOptions = ["size S", "size M", "size L", "size XL"]

export default function PopularOnShop({fetchGoods, resetGoods, filteringGoods, popularGoods, filterGoods, popularOnShop}) {
    
  const [alreadyFetch, setAlreadyFetch] = React.useState(false);
  const [optionState, setOptionState] = React.useState("size M");
  const [features, setFeatures] = React.useState(initialFeatures);
  
  React.useEffect(() => {
    fetchGoods(setAlreadyFetch);

    features.forEach((feature) => {
      $(`#${feature.name}-slider`).each(function() {
        var $block   = $(this),
            $range   = $block.find('.range'),
            data     = $block.data();
        $range.slider({
          range: true,
          min: feature.min,
          max: feature.max,
          values: [feature.first, feature.last],
          slide: function(event, ui) {
            let tempFeatures = [...features];
            let targetIndex = tempFeatures.map((tempFeature, i) => [i, tempFeature])
              .filter(x => x[1].name == feature.name)[0][0];
            tempFeatures[targetIndex] = {...feature, first: ui.values[0], last: ui.values[1]};
            setFeatures(tempFeatures);
          }
        });
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
  }, []);

  React.useEffect(() => {
    if(alreadyFetch && popularGoods.goods && popularGoods.goods.length > 0) {
      resetGoods(popularGoods.goods)
    }
  }, [alreadyFetch]);

  function selectOption(option) {
    setOptionState(option);
  }
  
    
  const { goods, loading, error } = filterGoods;
  
  if (!popularOnShop || !goods) {
    return <div/>
  } else {
    return (
      <section id="popularOnShop">
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

                      <Slider features={features}/>

                      <Options options={initialOptions} optionState={optionState} selectOption={selectOption}/>

                      <hr/>
                      <button onClick={() => resetGoods(popularGoods.goods)}>
                        Reset
                      </button>
                      <hr/>
                      <button onClick={() => filteringGoods(popularGoods.goods, {category: "car"})}>
                        filtering car
                      </button>
                      <button onClick={() => filteringGoods(popularGoods.goods, {category: "garbage"})}>
                        filtering garbage
                      </button>
                      <button onClick={() => filteringGoods(popularGoods.goods, {category: "cloth"})}>
                        filtering cloth
                      </button>
                      <button onClick={() => filteringGoods(popularGoods.goods, {category: "cock"})}>
                        filtering cock
                      </button>
                    </div>
                  </div>

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

                    <Goods goods={goods} optionState={optionState} features={features}/>

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

function Options({options, optionState, selectOption}) {
  return options.map((option) => {
    if(optionState == option) {
      return (
        <div>
          <input type="radio" id={option} name="option"
            onClick={() => selectOption(option)}
            checked
          />
          <label for={option}>{option}</label>
          <br/>
        </div>
      );
    } else {
      return (
        <div>
          <input type="radio" id={option} name="option"
            onClick={() => selectOption(option)}
          />
          <label for={option}>{option}</label>
          <br/>
        </div>
      );
    }
  });
}

function Slider({features}) {
  return features.map((feature) => {
    return (
      <div>
        <h3 className="header text-uppercase">{feature.name}</h3>
        <div id={`${feature.name}-slider`} class="price-slider">

          <div class="range"></div>

          <div class="amoutn">
            <input type="text" class="first" value={feature.first} readOnly/>
            <input type="text" class="last" value={feature.last} readOnly/>
          </div>

        </div>
        
        <div className="divider"></div>
      </div>
    );
  });
}

function Features({keys, features}) {
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

function Goods({goods, optionState, features}) {
  return goods.map((good) => {
    let filteredOption = good.options.filter((option) => option.key == optionState);
    if(filteredOption.length == 1) {
      let optionKeys = Object.keys(filteredOption[0]);
      for(let i = 0; i <= features.length; i++) {
        if(i < features.length) {
          if(
            !filteredOption[0][features[i].name] ||
            +(filteredOption[0][features[i].name]) < +(features[i].first) ||
            +(filteredOption[0][features[i].name]) > +(features[i].last)
          ) {
            return <div/>
          }
        } else if(i == features.length) {
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
                        <Features keys={optionKeys} features={filteredOption[0]}/>
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
    }
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
