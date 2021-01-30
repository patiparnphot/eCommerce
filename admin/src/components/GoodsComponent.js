import React from 'react';
import { Link } from 'react-router-dom';


//var initialContentState = require("../../initial_state/initialContentState.json");

export default class Goods extends React.Component {
  
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this)
    this.state = {
      start: 1,
      end: 3
    };
    this.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QzIiwiZmlyc3RuYW1lIjoiM3JkUGVvcGxlIiwibGFzdG5hbWUiOiJpc0hlcmUiLCJlbWFpbCI6IjNyZFBlb3BsZUBlbWFpbC5jb20iLCJhdmF0YXIiOiIzIHBhc3RlIGltZyBzcmMgaGVyZSIsImlzQWRtaW4iOmZhbHNlLCJhZGRyZXNzIjoiMTIzIHdvcnNoaW5ndG9uIG1hZGFnYXRnYSIsInBheXBhbCI6eyJ1c2VybmFtZSI6IjNyZHBheXBhbCJ9LCJjcmVkaXRDYXJkIjp7ImNhcmROdW1iZXIiOiIxMjM0NTY3ODkwMTIzNDU2IiwiZXhwaXJlZERhdGUiOiIxMi8yNCJ9LCJpYXQiOjE2MDUzNzMzMzd9.wfZxaBT6NWVjK6ydgVFmbLyQok2QjMZIDSeNo3rHE8E";
  }

  
  componentDidMount() {
    this.props.fetchGoods(this.state.start, this.state.end);
    this.props.fetchGoodAmount();
    //this.props.blogsList.blogs = initialContentState.blogs.blogsList.blogs;

    $(document).ready(function() {
      // Blog isotope
      demo.initIsotope();
    });
  }

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetDeletedGood();
  }

  // Click Function
  onChange(i) {
    this.setState({
      start: 1+(3*i),
      end: 3+(3*i)
    });
    this.props.fetchGoods(1+(3*i), 3+(3*i));
  }
  
  renderGoods(goods) {
    return goods.map((good) => {
      return (
        <div key={good.title} className={"col-lg-4 col-md-6 blog-item filter-" + good.category}>
          <div className="blog-wrap">
            <img src={ good.image } className="img-fluid" alt="" />
            <div className="blog-info">
              <h4><Link to={"/admin/goods/edit/" + good.slug}>{ good.title }</Link></h4>
              <p>{good.category}</p>
              <div>
                <a href={ good.image } data-lightbox="blog" data-title={ good.title } className="link-preview" title="Preview">
                  <i className="now-ui-icons media-1_album"></i>
                </a>
                <Link to={"/admin/goods/edit/" + good.slug} className="link-details" title="More Details">
                  <i className="now-ui-icons travel_info"></i>
                </Link>
                <a onClick={() => this.props.deleteGood(good.slug, this.props.member.token, this.state.start, this.state.end)} href="#" className="link-delete" title="Delete">
                <i className="now-ui-icons ui-1_simple-remove"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
  
  
  render() {
    
    const { goods, loading, error } = this.props.goodsList;
    
    const { data } = this.props.goodAmount;

    const buttons = [];
    const pageNumber = Math.ceil(Number(data) / 3);
    for (let i=0; i<pageNumber; i++) {
      buttons.push(<button onClick={() => this.onChange(i)} >{i+1}</button>)
    }

    if(!data || !goods) {
      return <div className="container"><h1>MeatSEO</h1><h3>Loading...</h3></div>      
    //} else if(error) {
    //  return <div className="alert alert-danger">Error: {error.message}</div>
    //} else if(!content) {
    //  return <div/>;
    }
    
    return (
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h5 className="title">List of Goods</h5>
                <p className="category">Goods about Datascience, Search Engine Optimiser and Developer</p>
              </div>
              <Link to="/admin/goods/create/">Create New Good</Link>
              <div className="card-body all-icons">
                <div className="row blog-container">              
                  {this.renderGoods(goods)}
                </div>
              </div>
              {buttons}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
