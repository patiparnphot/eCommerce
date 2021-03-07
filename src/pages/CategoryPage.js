import React, { Component } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import NotFoundPage from '../components/NotFoundPage'

import {
  fetchGoodcategorycontent,
  fetchGoodcategorycontentSuccess,
  fetchGoodcategorycontentFailure
} from '../actions/contents';

import {
  fetchFilterGoods,
  fetchFilterGoodsSuccess,
  fetchFilterGoodsFailure
} from '../actions/goods';


function CategoryPage({fetchCategoryContent, fetchFilterGoods, categoryContent, filterGoods}) {

  const { category } = useParams();

  const [alreadyFetch, setAlreadyFetch] = React.useState(false);
  const [renderSlide, setRenderSlide] = React.useState(false);
  const [optionState, setOptionState] = React.useState("");
  const [features, setFeatures] = React.useState([]);
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
    fetchCategoryContent(category, setAlreadyFetch);
    fetchFilterGoods({category: category});
  }, []);

  React.useEffect(() => {
    if(alreadyFetch && categoryContent.content && (categoryContent.content.title != "noTitle")) {
      setFeatures(categoryContent.content.features);
      setOptionState(categoryContent.content.options[0]);
      setRenderSlide(true);
      // console.log("content: ", categoryContent.content);
    }
  }, [alreadyFetch]);

  React.useEffect(() => {
    if(alreadyFetch && renderSlide && features) {
      features.forEach((feature) => {
        // console.log("feature: ", feature);
        $(`#${feature.name}-slider`).each(function() {
          var $block   = $(this),
              $range   = $block.find('.range'),
              data     = $block.data();
          $range.slider({
            range: true,
            min: +(feature.min),
            max: +(feature.max),
            values: [+(feature.first), +(feature.last)],
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
    }
  }, [renderSlide]);

  function selectOption(option) {
    setOptionState(option);
  }

  function getHTML(htmlCode) {
    return { __html: htmlCode };
  }
  
  
  const { content, loading, error } = categoryContent;
  const { goods } = filterGoods;

  if(loading) {
    return <div className="container"><h1>MeatSEO</h1><h3>Loading...</h3></div>      
  } else if(error) {
    return <div className="alert alert-danger">Error: {error.message}</div>
  } else if(!content || !goods || !alreadyFetch || !renderSlide) {
    return <div className="container"><h1>MeatSEO</h1><h3>Loading...</h3></div>
  } else if(content.title == "noTitle") {
    return <NotFoundPage/>
  } else {
    return (
      <div>
        <Helmet>
          <title>{content.titleHtml}</title>
          <meta name='description' content={content.descriptonHtml} />
        </Helmet>
        <div className="container block">

          <div className="row">
            <div className="col-xs-12">
              <div className="block-header text-uppercase">
                <h2 className="header">{content.title}</h2>
              </div>
            </div>
          </div>

          <div className="row">

            <div className="col-md-4 col-lg-3 col-sm-12 col-xs-12 cat-bar">
              <div className="inblock sdw">
                <div className="wrap bg-white">

                  <Slider features={features}/>
                  
                  <Options options={content.options} optionState={optionState} selectOption={selectOption}/>
                
                </div>
              </div>
            </div>

            <div className="col-md-8 col-lg-9 col-sm-12 col-xs-12 cat-bar">

              <Goods goods={goods} optionState={optionState} features={features}/>

            </div>

          </div>

          <div className="row">
            <div className="col-xs-12">
              <div dangerouslySetInnerHTML={getHTML(content.text)} />
            </div>
          </div>

        </div>
      </div>
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

function Stars({rating, numberOfStars=5}) {
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

function Goods({goods, optionState, features}){
  return goods.map((good) => {
    let filteredOption = good.options.filter((option) => option.key == optionState);
    if(filteredOption.length == 1) {
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
            <div className="shop-item hover-sdw col-xs-6 col-sm-6 col-md-4 col-lg-4">
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
                    <img className="main" src={good.image} alt={good.descriptonHtml}/>
                  </div>
                </div>
                <div className="info">
                  <Link to={ '/goods/' + good.category + '/' + good.slug } className="btn-material btn-price">
                    <span className="price">
                      <span className="price">
                        ฿ {filteredOption[0].cost}<small>.00</small>
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


const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategoryContent: (category, setAlreadyFetch) => {
      dispatch(fetchGoodcategorycontent(category)).then((response) => {
        console.log('goodCategoryContent: ', response.payload);
        !response.error ? dispatch(fetchGoodcategorycontentSuccess(response.payload)) : dispatch(fetchGoodcategorycontentFailure(response.payload));
        setAlreadyFetch(true);
      });
    },
    fetchFilterGoods: (filter) => {
      dispatch(fetchFilterGoods(filter)).then((response) => {
        console.log('filtered good: ', response.payload);
        if(Array.isArray(response.payload)) {
          !response.error ? dispatch(fetchFilterGoodsSuccess(response.payload)) : dispatch(fetchFilterGoodsFailure(response.payload));
        }
      });
    }
  }
};


function mapStateToProps(state) {
  return {
    categoryContent: state.contents.goodCategory,
    filterGoods: state.goods.filterGoods
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);