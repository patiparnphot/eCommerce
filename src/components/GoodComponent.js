import React from 'react';
import { Link } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import { Helmet } from 'react-helmet';

var initialBlogState = require("../../initial_state/initialBlogState");


export default class GoodPage extends React.Component {
  
  constructor(props) {
    super(props);
    this.ratingRef = React.createRef();
    this.selectOption = this.selectOption.bind(this);
    this.selectSpecificOption = this.selectSpecificOption.bind(this);
    this.increaseAmount = this.increaseAmount.bind(this);
    this.decreaseAmount = this.decreaseAmount.bind(this);
    this.hoverHandler = this.hoverHandler.bind(this);
    this.setRating = this.setRating.bind(this);
    this.starClickHandler = this.starClickHandler.bind(this);
    this.changeTextarea = this.changeTextarea.bind(this);
    this.state = { 
      goodSlugHistory: '',
      cost: '',
      option: '',
      specificOption: '',
      amount: 1,
      numberOfStars: 5,
      currentRating: 0,
      alreadyRate: false,
      commentMessage: ''
    };
  }
  
  componentDidMount() {
    
    // this.props.fetchBlogdetailcontent();

    this.props.fetchGood(this.props.goodSlug);
    //this.props.activeBlog.blog = initialBlogState(this.props.blogTitle);
    this.setState({
        goodSlugHistory: this.props.goodSlug,
        cost: this.props.activeGood.good.options[0].cost,
        option: this.props.activeGood.good.options[0].key
    });
    if(this.props.activeGood.good.specificOptions) {
        this.setState({specificOption: this.props.activeGood.good.specificOptions[0]});
    }
    
  }
  
  componentDidUpdate() {

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
  
    console.log("good slug: ", this.props.goodSlug);
    console.log("good hisslug: ", this.state.goodSlugHistory);
    
    if ( this.state.goodSlugHistory != this.props.goodSlug ) {
      this.props.fetchGood(this.props.goodSlug);
      //this.props.activeBlog.blog = initialBlogState(this.props.blogTitle);
      //console.log("BlogState", initialBlogState(this.props.blogTitle));
      console.log("activeGoodSlug", this.props.activeGood.good);
      this.setState({
        goodSlugHistory: this.props.goodSlug,
        cost: this.props.activeGood.good.options[0].cost,
        option: this.props.activeGood.good.options[0].key
      });
      if(this.props.activeGood.good.specificOptions) {
        this.setState({specificOption: this.props.activeGood.good.specificOptions[0]});
      }
    }

    if ( this.props.member && this.props.member.token ) {
        this.setRating();
    }

    if ( this.props.newComment.comment ) {
      this.props.fetchGood(this.props.goodSlug);
      this.props.resetNewComment();
    }
    
  }

  selectOption(event, options) {
      let key = event.target.value;
      let option = options.find((option) => option.key == key);
      if (option) {
        this.setState({
            option: option.key,
            cost: option.cost
        })
      }
  }

  selectSpecificOption(event) {
    this.setState({
        specificOption: event.target.value
    })
  }

  increaseAmount() {
    this.setState({
        amount: this.state.amount + 1
    })
  }

  decreaseAmount() {
    if (this.state.amount > 1) {
        this.setState({
            amount: this.state.amount - 1
        })
    }
  }

  addToCart(good) {
    let goodOrder = {
        title: good.title,
        description: good.description,
        image: good.image,
        category: good.category,
        key: this.state.option,
        specificDetail: this.state.specificOption,
        amount: +this.state.amount,
        costPerUnit: +this.state.cost,
        cost: (+this.state.amount)*(+this.state.cost)
    }
    console.log("goodOrder: ", goodOrder);
    this.props.addGoodInCart([...this.props.incartGoods.goods, goodOrder]);
  }

  addComment(event) {
    if(this.state.alreadyRate && this.props.member && this.props.member.token) {
        let newComment = {
            text: this.state.commentMessage,
            rating: this.state.currentRating
        };
        this.props.createComment(this.props.goodSlug, newComment, this.props.member.token);
    }
  }

  hoverHandler(event) {
    const stars = event.target.parentElement.getElementsByClassName('star');
    const hoverValue = event.target.dataset.value;
    Array.from(stars).forEach(star => {
      star.style.color = hoverValue >= star.dataset.value ? 'yellow' : 'gray';
    });
  };

  setRating() {
    const stars = this.ratingRef.getElementsByClassName('star');
    Array.from(stars).forEach(star => {
      star.style.color =
        this.state.currentRating >= star.dataset.value ? 'yellow' : 'gray';
    });
  };

  starClickHandler(event) {
    let rating = event.target.dataset.value;
    this.setState({ 
        currentRating: rating,
        alreadyRate: true
    }); // set state so the rating stays highlighted
    // if(this.props.onClick){
    //   this.props.onClick(rating); // emit the event up to the parent
    // }
  };

  changeTextarea(event) {
    this.setState({
        commentMessage: event.target.value
    })
  }

  renderStars(rating) {
    let ratingNum = parseFloat(rating)
    let ratingRounded = Math.round(ratingNum);
    let array = [...Array(+this.state.numberOfStars).keys()];
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

  renderOptions(options) {
    return options.map((option) => {
        return (
          <option value={option.key}>{option.key}</option>
        )
    })
  }

  renderSpecificOptions(specificOptions) {
    return specificOptions.map((specificOption) => {
        return (
          <option value={specificOption}>{specificOption}</option>
        )
    })
  }

  renderComments(comments) {
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
                    <span class="media-info rate"> {comment.createdAt}
                        <ul className="stars">
                            {this.renderStars(comment.rating)}
                        </ul>
                    </span>
                </div>
            </li>
        )
    })
  }
  
  getHTML(htmlCode) {
    return { __html: htmlCode };
  }

  render() {
    // const { content } = this.props.blogdetailContent;
    // const contentLoading = this.props.blogdetailContent.loading;
    // const contentError = this.props.blogdetailContent.error;
    const { good } = this.props.activeGood;
    const goodLoading = this.props.activeGood.loading;
    const goodError = this.props.activeGood.error;
    
    // console.log("blog detail content: ", content);
    // console.log("good detail: ", good);
    
    if 
    // (contentLoading || goodLoading) {
    //   return <div className="container">Loading...</div>;
    // } else if(contentError) {
    //   return  <div className="alert alert-danger">{contentError.message}</div>
    // } else if(goodError) {
    //   return  <div className="alert alert-danger">{goodError.message}</div>
    // } else if(!content) {
    //   return <NotFoundPage/>
    // } else if
    (!good) {
      return <NotFoundPage/>
    } 

    return (
      <section id="good">
         <Helmet>
            <title>{good.titleHtml}</title>
            <meta name='description' content={good.descriptionHtml} />
         </Helmet>

         <div class="container">
            <div class="row">
                <div class="col-xs-12">     
                    <ol class="breadcrumb bg-blue">
                        <li><Link to="/">Homepage</Link></li>
                        <li><Link to={"/goods/" + this.props.goodTag}>{this.props.goodTag}</Link></li>
                        <li class="active">{this.props.goodSlug}</li>
                    </ol>
                </div>
            </div>
        </div>

        <div class="container-fluid ">
            <div class="row">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12">

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
                                                    {this.state.cost}<small>.00</small>
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

                                                    {this.renderStars(good.rating)}

                                                </ul>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="divider-dotted"></div>
                                    <div class="row set-panel">
                                        
                                        <div class="col-md-6">
                                            <span class="head">options</span>
                                            <br/><br/>
                                            <select value={this.state.option} onChange={(e) => this.selectOption(e, good.options)}>
                                                {this.renderOptions(good.options)}
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
                                                    <select value={this.state.specificOption} onChange={this.selectSpecificOption}>
                                                        {this.renderSpecificOptions(good.specificOptions)}
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
                                                        this.props.member && this.props.member.token
                                                    ) ? (
                                                        <div class="btns-wrap btn-material bg-white">
                                                            <span class="qnt-select">
                                                                <span class="plus" onClick={this.increaseAmount}>
                                                                    <i class="icofont icofont-plus"></i>
                                                                </span>
                                                                <span class="view-sum">
                                                                    {this.state.amount}
                                                                </span>
                                                                <span class="minus" onClick={this.decreaseAmount}>
                                                                    <i class="icofont icofont-minus"></i>
                                                                </span>
                                                            </span>
                                                            <a class="text-blue" href="#" onClick={() => this.addToCart(good)}>Put in cart</a>
                                                        </div>
                                                    ) : (
                                                        <div class="btns-wrap btn-material bg-white">
                                                            <a href="#" onClick={() => this.props.signIn()}><b>
                                                                Please LogIn, Before buy this good.
                                                            </b></a>
                                                        </div>
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
                                            <p>
                                                {good.description}
                                            </p>
                                            <dl class="dl-horizontal terms">
                                                <dt><span class="body">Leather</span></dt><dd>30%</dd>
                                                <dt><span class="body">Polyester</span></dt><dd>25%</dd>
                                                <dt><span class="body">Guarantee</span></dt><dd>36 month</dd>
                                                <dt><span class="body">Leather</span></dt><dd>30%</dd>
                                                <dt><span class="body">Polyester</span></dt><dd>25%</dd>
                                                <dt><span class="body">Guarantee</span></dt><dd>36 month</dd>
                                            </dl>
                                        </div>
                                    </div>
                                    <div class="row features-pan hidden-xs">
                                        <div class="col-xs-12">
                                            <ul class="row features-list">
                                                <li class="col-md-4">
                                                    <i class="icofont icofont-shield"></i>
                                                    <span>24 days. Money Back Guarantee</span>
                                                </li>
                                                <li class="col-md-4">
                                                    <i class="icofont icofont-ship"></i>
                                                    <span>Free shipping</span>
                                                </li>
                                                <li class="col-md-4">
                                                    <i class="icofont icofont-hand"></i>
                                                    <span>Free help and setup</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                </div>

                            </div>

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
                                                    this.props.member && this.props.member.token
                                                ) ? (
                                                    <div class="form-horizontal" >
                                                        <div class="form-group">
                                                            <label for="inputRate" class="col-sm-3 control-label">Rate this good</label>
                                                            <div class="col-sm-7">
                                                                <div className="rating" style={{fontSize: '2.25em'}} ref={(ref) => this.ratingRef=ref} data-rating={this.state.currentRating} onMouseOut={this.setRating}>
                                                                    {[...Array(+this.state.numberOfStars).keys()].map(n => {
                                                                        return (
                                                                            <span className="star" key={n+1} data-value={n+1} onMouseOver={this.hoverHandler} onClick={this.starClickHandler}>
                                                                            &#9733;
                                                                            </span>
                                                                        );
                                                                    })}
                                                                </div>
                                                                { !this.state.alreadyRate && <div className="alert alert-danger">Rate is required</div> }
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="inputText" class="col-sm-3 control-label">Message (Optional)</label>
                                                            <div class="col-sm-7">
                                                                <textarea class="form-control" id="inputText" cols="30" rows="3" value={this.state.commentMessage} onChange={this.changeTextarea}/>
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <div class="col-sm-offset-3 col-sm-7">
                                                                <button type="submit" class="btn btn-primary btn-material" onClick={(e) => this.addComment(e)}>
                                                                    <span class="body">Send message</span>
                                                                    <i class="icon icofont icofont-check-circled"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <br/><br/>
                                                        Please <a href="#" onClick={() => this.props.signIn()}><b>LogIn</b></a>, Before review this good.
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
                                                {good.comments ? this.renderComments(good.comments) : <li></li>}
                                            </ul>

                                        </div>
                                    </div>
                                    
                                </div>

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
