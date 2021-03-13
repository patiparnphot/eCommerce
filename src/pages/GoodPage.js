import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import Loader from '../components/loader';
import NotFoundPage from '../components/NotFoundPage';
import RecentComponent from '../components/RecentComponent';
import {
  fetchGood,
  fetchGoodSuccess,
  fetchGoodFailure,
  fetchCartGoods,
  addCartGoods
} from '../actions/goods';
import {
  createComment,
  createCommentSuccess,
  createCommentFailure,
  resetNewComment
} from '../actions/comments';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';


function GoodPage ({
  activeGood,
  incartGoods,
  member,
  newComment,
  fetchGood,
  addGoodInCart,
  createComment,
  resetNewComment
}) {

  const { type, slug } = useParams();
  const location = useLocation();

  const ratingRef = React.useRef(null);
  const [goodSlugHistory, setGoodSlugHistory] = React.useState(slug);
  const [cost, setCost] = React.useState("");
  const [option, setOption] = React.useState("");
  const [available, setAvailable] = React.useState(true);
  const [specificOption, setSpecificOption] = React.useState("");
  const [amount, setAmount] = React.useState(1);
  const [numberOfStars, setNumberOfStars] = React.useState(5);
  const [currentRating, setCurrentRating] = React.useState(0);
  const [alreadyRate, setAlreadyRate] = React.useState(false);
  const [commentMessage, setCommentMessage] = React.useState('');
  const [initial, setInitial] = React.useState("initial");
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
    fetchGood(slug, setInitial);
  }, []);

  React.useEffect(() => {
    if(activeGood.good && (activeGood.good.title != "noSlug") && (initial == "loading")) {
      setCost(activeGood.good.options[0].cost);
      setOption(activeGood.good.options[0].key);
      setAvailable(activeGood.good.options[0].isAvailable);
      if(activeGood.good.specificOptions && activeGood.good.specificOptions.length) {
        setSpecificOption(activeGood.good.specificOptions[0]);
      }
      setInitial("alreadyFetch");
    }
  }, [initial]);

  React.useEffect(() => {
    console.log("good slug: ", slug);
    console.log("good hisslug: ", goodSlugHistory);
    
    if ( slug != goodSlugHistory ) {
      fetchGood(slug, setInitial);
      setGoodSlugHistory(slug);
    }
  }, [slug]);

  React.useEffect(() => {
    if( member && member.token ) {
      setRating();
    }
  }, [member]);

  React.useEffect(() => {
    if( newComment.comment ) {
      fetchGood(slug)
      resetNewComment();
    }
  }, [newComment]);

  function selectOption(event, options) {
    let key = event.target.value;
    let option = options.find((option) => option.key == key);
    if (option) {
      setOption(option.key);
      setCost(option.cost);
      setAvailable(option.isAvailable);
    }
  }

  function selectSpecificOption(event) {
    setSpecificOption(event.target.value);
  }

  function increaseAmount() {
    setAmount(amount + 1);
  }

  function decreaseAmount() {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  }

  function addToCart(good) {
    let goodOrder = {
      title: good.title,
      description: good.description,
      image: good.image,
      category: good.category,
      key: option,
      specificDetail: specificOption,
      amount: +amount,
      costPerUnit: +cost,
      cost: (+amount)*(+cost)
    }
    console.log("goodOrder: ", goodOrder);
    addGoodInCart([...incartGoods.goods, goodOrder]);
  }

  function addComment(event) {
    if(alreadyRate && member && member.token) {
      let currentComment = {
          text: commentMessage,
          rating: currentRating
      };
      createComment(slug, currentComment, member.token);
    }
  }

  function hoverHandler(event) {
    const stars = event.target.parentElement.getElementsByClassName('star');
    const hoverValue = event.target.dataset.value;
    Array.from(stars).forEach(star => {
      star.style.color = hoverValue >= star.dataset.value ? 'yellow' : 'gray';
    });
  };

  function setRating() {
    if(ratingRef && ratingRef.current && ratingRef.current.children) {
      const stars = ratingRef.current.children;
      [...stars].forEach(star => {
        star.style.color =
          currentRating >= star.dataset.value ? 'yellow' : 'gray';
      });
    }
  };

  function starClickHandler(event) {
    let rating = event.target.dataset.value;
    setCurrentRating(rating);
    setAlreadyRate(true);
  };

  function changeTextarea(event) {
    setCommentMessage(event.target.value);
  }

  if(!activeGood.good) {
    return <Loader/>
  } else if (activeGood.good.title == "noSlug") {
    return <NotFoundPage/>
  } else {
    return (
      <section id="goodPage">
        <Helmet>
          <title>{activeGood.good.titleHtml}</title>
          <meta name='description' content={activeGood.good.descriptionHtml} />
        </Helmet>
  
        <div class="container">
          <div class="row">
            <div class="col-xs-12">     
              <ol class="breadcrumb bg-blue">
                <li><Link to="/">Homepage</Link></li>
                <li><Link to={"/goods/" + type}>{type}</Link></li>
                <li class="active"><Link to={"/goods/" + type + "/" + slug}>{slug}</Link></li>
              </ol>
            </div>
          </div>
        </div>
  
        <div class="container-fluid ">
          <div class="row">
            <div class="container">
              <div class="row">
                <div class="col-xs-12">
  
                  <GoodDetail
                    good={activeGood.good}
                    cost={cost}
                    option={option}
                    available={available}
                    selectOption={selectOption}
                    specificOption={specificOption}
                    selectSpecificOption={selectSpecificOption}
                    member={member}
                    numberOfStars={numberOfStars}
                    amount={amount}
                    increaseAmount={increaseAmount}
                    decreaseAmount={decreaseAmount}
                    addToCart={addToCart}
                    location={location}
                  />

                  <GoodComment
                    member={member}
                    good={activeGood.good}
                    ratingRef={ratingRef}
                    currentRating={currentRating}
                    setRating={setRating}
                    numberOfStars={numberOfStars}
                    hoverHandler={hoverHandler}
                    starClickHandler={starClickHandler}
                    alreadyRate={alreadyRate}
                    commentMessage={commentMessage}
                    changeTextarea={changeTextarea}
                    addComment={addComment}
                    location={location}
                  />

                  <RecentComponent
                    recent={{header: "Recent", parallaxText: ""}}
                    recentGoods={activeGood.good.recentGoods}
                    initial={initial}
                  />
                  
                  <RecentComponent
                    recent={{header: "Popular", parallaxText: ""}}
                    recentGoods={activeGood.good.popularGoods}
                    initial={initial}
                  />
  
                </div>
              </div>
            </div>
          </div>
        </div>
  
      </section>
    );
  }
  
}

/* <RecentComponent
  recent={{header: "Same Category", parallaxText: ""}}
  recentGoods={activeGood.good.similarGoods}
  initial={initial}
/> */

function Stars({rating, numberOfStars = 5}) {
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

function Options({options}) {
  return options.map((option) => {
    return (
      <option value={option.key}>{option.key}</option>
    )
  })
}

function SpecificOptions({specificOptions}) {
  if (specificOptions && Array.isArray(specificOptions)) {
    return specificOptions.map((specificOption) => {
      return (
        <option value={specificOption}>{specificOption}</option>
      )
    })
  }
}

function GoodDetail({
  good,
  cost,
  option,
  available,
  selectOption,
  specificOption,
  selectSpecificOption,
  member,
  numberOfStars,
  amount,
  increaseAmount,
  decreaseAmount,
  addToCart,
  location
}) {

  React.useEffect(() => {
    var owlCarousel = require('../../static/assets/js/owl.carousel.min.js');

    $('.item-gallery').each(function() {
      var $this = $(this),
          $image = $this.find('.image'),
          $nav   = $this.find('.image-nav');
      
      $image
          .owlCarousel({
              items : 1,
              slideSpeed : 2000,
              nav: false,
              autoplay: false,
              dots: false,
              loop: true,
              responsiveRefreshRate : 200,
              navText: ['<span class="arrow-left icofont icofont-curved-left">', '<span class="arrow-right icofont icofont-curved-right">'],
          })
          .on('changed.owl.carousel', sync);
      
      $nav
          .on('initialized.owl.carousel', function() {
              $nav.find(".owl-item").eq(0).addClass("current");
          })
          .owlCarousel({
              items : 3,
              dots: false,
              nav: true,
              smartSpeed: 200,
              slideSpeed : 500,
              slideBy: 1,
              responsiveRefreshRate : 100,
              navText: ['<span class="arrow-left icofont icofont-curved-left">', '<span class="arrow-right icofont icofont-curved-right">']
          })
          .on('changed.owl.carousel', syncNav)
          .on("click", ".owl-item", function(e){
              e.preventDefault();
              var $this = $(this),
                  num   = $this.index();
          
              $image
                  .data('owl.carousel')
                  .to(num, 300, true)
          });
      
      function syncNav(e) {
          var num = e.item.index;
          $image
              .data('owl.carousel')
              .to(num, 100, true)
      }
      
      function sync(el) {
          var cnt = el.item.count - 1,
              cur = Math.round(el.item.index - (el.item.count/2) - .5);
          
          if(cur < 0) {
              cur = cnt;
          }
          
          if(cur > cnt) {
              cur = 0;
          }
          
          $nav
              .find(".owl-item")
              .removeClass("current")
              .eq(cur)
              .addClass("current");
          $nav
              .data('owl.carousel')
              .to(cur, 100, true);
      }
    });
  }, [good]);

  function getHTML(htmlCode) {
    return { __html: htmlCode };
  }

  return (
    <div class="row shop-item-page">

      <div class="col-sm-4 col-md-5 fix-height">
        <div class="item-gallery float-block">
          <div class="owl-carousel image">
            <div class="item">
              <img src={good.image} alt=""/>
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-8 col-md-7 get-height">
        <div class="row item-header">
          <div class="col-md-7">
            <h1 class="comp-header st-12 text-uppercase text-blue">
              {good.title}
              <span class="text-dark">
                {good.category}
              </span>
              <span class="text-dark">
                {good.brand}
              </span>
            </h1>
          </div>
        </div>
        <div class="divider-dotted"></div>
        <div class="row price-pan">
          <div class="col-md-12">
            <span class="head">Price</span>
            <span class="price">
              <span class="price">
                <span class="curr">$</span>
                {cost}<small>.00</small>
              </span>
            </span>
            {
              (
                !good.campaign
              ) ? (
                <span></span>
              ) : (
                <span className="sale-badge item-badge text-uppercase bg-green hidden-xs">
                  {good.campaign}
                </span>
              )
            }
          </div>
          <div class="col-md-12">
            <div class="rate">

              <div class="rate-info">
                <span class="head">Rating</span> 
                <span class="post-head"> {good.raterAmount} members rate it</span>
              </div>

              <ul class="stars">

                <Stars rating={good.rating} numberOfStars={numberOfStars}/>

              </ul>

            </div>
          </div>
        </div>
        <div class="divider-dotted"></div>
        <div class="row set-panel">
              
          <div class="col-md-6">
            <span class="head">options</span>
            <br/><br/>
            <select value={option} onChange={(e) => selectOption(e, good.options)}>
              <Options options={good.options}/>
            </select>
          </div>
              
          {
            (
              !good.specificOptions
            ) ? (
              <div class="col-md-6"></div>
            ) : (
              <div class="col-md-6">
                <span class="head">specific option</span>
                <br/><br/>
                <select value={specificOption} onChange={selectSpecificOption}>
                  <SpecificOptions specificOptions={good.specificOptions}/>
                </select>
              </div>
            )
          }

        </div>
        <div class="row">
          <div class="col-xs-12">
            <div class="buy-btn-panel bg-blue">
              <div class="cart-icon">
                <i class="icofont icofont-basket"></i>
              </div>
              {
                (
                  !available
                ) ? (
                  <div class="btns-wrap btn-material bg-white">
                    <b>
                      NOT AVAILABLE
                    </b>
                  </div>
                ) : (
                  (
                    member && member.token
                  ) ? (
                    <div class="btns-wrap btn-material bg-white">
                      <span class="qnt-select">
                        <span class="plus" onClick={increaseAmount}>
                          <i class="icofont icofont-plus"></i>
                        </span>
                        <span class="view-sum">
                          {amount}
                        </span>
                        <span class="minus" onClick={decreaseAmount}>
                          <i class="icofont icofont-minus"></i>
                        </span>
                      </span>
                      <a class="text-blue" href="#" onClick={() => addToCart(good)}>Put in cart</a>
                    </div>
                  ) : (
                    <div class="btns-wrap btn-material bg-white">
                      <Link to={{pathname:"/signin", state:{from: location.pathname}}}><b>
                        Please LogIn, Before buy this good.
                      </b></Link>
                    </div>
                  )
                )
              }
            </div>
          </div>
        </div>
        <div class="row description">
          <div class="col-xs-12">
            <h2 class="header">
              Description:
            </h2>
            <div dangerouslySetInnerHTML={getHTML(good.description)} />
          </div>
        </div>
          
      </div>

    </div>
  );
}

function Comments({comments, numberOfStars}) {
  if (comments && Array.isArray(comments)) {
    return comments.map((comment) => {
      return (
        <li class="media">
          <div class="media-left">
            <a href="#">
              <img class="media-object" src="/images/profile/profile-img.jpg" alt="..."/>
            </a>
          </div>
          <div class="media-body">
            <h4 class="media-heading">
              <a href="#">{comment.rater.username}</a>
            </h4>
            {comment.text}
            <span class="media-info rate">
              {comment.createdAt}
              <ul className="stars">
                <Stars rating={comment.rating} numberOfStars={numberOfStars}/>
              </ul>
            </span>
          </div>
        </li>
      )
    })
  }
}

function GoodComment({
  member,
  good,
  ratingRef,
  currentRating,
  setRating,
  numberOfStars = 5,
  hoverHandler,
  starClickHandler,
  alreadyRate,
  commentMessage,
  changeTextarea,
  addComment,
  location
}) {
  return (
    <div class="row shop-item-info">

      <div class="col-xs-12">

        <ul class="nav nav-tabs">
          <li className="active">
            <a>
              Comments <span className="glyphicon glyphicon-comment" aria-hidden="true"></span>
            </a>
          </li>
          <li className="text-right pull-right">
            <a className="pull-right" role="button" data-toggle="collapse" href="#collapseComment" aria-expanded="false" aria-controls="collapseComment">
              <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add new comment
            </a>
          </li>
        </ul>

        <div className="collapse" id="collapseComment">
          <div className="well">
            {
              (
                member && member.token
              ) ? (
                <div class="form-horizontal" >
                  <div class="form-group">
                    <label for="inputRate" class="col-sm-3 control-label">Rate this good</label>
                    <div class="col-sm-7">
                      <div className="rating" style={{fontSize: '2.25em'}} ref={ratingRef} data-rating={currentRating} onMouseOut={setRating}>
                        {[...Array(+numberOfStars).keys()].map(n => {
                          return (
                            <span className="star" key={n+1} data-value={n+1} onMouseOver={hoverHandler} onClick={starClickHandler}>
                              &#9733;
                            </span>
                          );
                        })}
                      </div>
                      { !alreadyRate && <div className="alert alert-danger">Rate is required</div> }
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="inputText" class="col-sm-3 control-label">Message (Optional)</label>
                    <div class="col-sm-7">
                      <textarea class="form-control" id="inputText" cols="30" rows="3" value={commentMessage} onChange={changeTextarea}/>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-offset-3 col-sm-7">
                      <button type="submit" class="btn btn-primary btn-material" onClick={(e) => addComment(e)}>
                        <span class="body">Send message</span>
                        <i class="icon icofont icofont-check-circled"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <br/><br/>
                  Please <Link to={{pathname:"/signin", state:{from: location.pathname}}}><b>LogIn</b></Link>, Before review this good.
                  <br/><br/>
                </div>
              )
            }
          </div>
        </div>

        <hr/>

        <div class="tab-content">
          <div role="tabpanel" class="tab-pane comments active" id="comments">

            <ul class="media-list">
              {good.comments ? <Comments comments={good.comments} numberOfStars={numberOfStars}/> : <li></li>}
            </ul>

          </div>
        </div>
                                  
      </div>

    </div>
  );
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchGood: (slug, setInitial) => {
      dispatch(fetchGood(slug)).then((response) => {
        console.log('good: ', response.payload);
        !response.error ? dispatch(fetchGoodSuccess(response.payload)) : dispatch(fetchGoodFailure(response.payload))
        if(setInitial) {
          setInitial("loading");
        }
      });
    },
    fetchGoodInCart: () => {
      dispatch(fetchCartGoods());
    },
    addGoodInCart: (goodsInCart) => {
      console.log('good in cart: ', goodsInCart);
      dispatch(addCartGoods(goodsInCart));
      localStorage.setItem('eCommerceIncart', JSON.stringify(goodsInCart));
    },
    createComment: (slug, comment, token) => {
      dispatch(createComment(slug, comment, token)).then((response) => {
        console.log('newComment: ', response.payload);
        !response.error ? dispatch(createCommentSuccess(response.payload)) : dispatch(createCommentFailure(response.payload));
      });
    },
    resetNewComment: () => {
      dispatch(resetNewComment());
    }
  };
};


function mapStateToProps(state) {
  return {
    activeGood: state.goods.activeGood,
    incartGoods: state.goods.incartGoods,
    member: state.member,
    newComment: state.comments.newComment
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodPage);