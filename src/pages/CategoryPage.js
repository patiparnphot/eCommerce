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

  const [numberOfStars, setNumberOfStars] = React.useState(5);
  
  React.useEffect(() => {
    fetchCategoryContent(category);
    fetchFilterGoods({category: category});
  }, []);

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
        <div className="shop-item hover-sdw col-md-3">
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

  function getHTML(htmlCode) {
    return { __html: htmlCode };
  }
  
  
  const { content, loading, error } = categoryContent;
  const { goods } = filterGoods;

  if(loading) {
    return <div className="container"><h1>MeatSEO</h1><h3>Loading...</h3></div>      
  } else if(error) {
    return <div className="alert alert-danger">Error: {error.message}</div>
  } else if(!content || !goods || (goods.title == "noTitle")) {
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
            <div className="col-xs-12">
              <div className="row">

                {renderGoods(goods)}
              
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12" style={{backgroundColor: "#bfbfbf", borderRadius: "5px"}}>
              <div dangerouslySetInnerHTML={getHTML(content.text)} />
            </div>
          </div>

        </div>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategoryContent: (category) => {
      dispatch(fetchGoodcategorycontent(category)).then((response) => {
        console.log('goodCategoryContent: ', response.payload);
        !response.error ? dispatch(fetchGoodcategorycontentSuccess(response.payload)) : dispatch(fetchGoodcategorycontentFailure(response.payload));
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