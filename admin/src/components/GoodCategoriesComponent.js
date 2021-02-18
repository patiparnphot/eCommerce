import React from 'react';
import { Link } from 'react-router-dom';


//var initialContentState = require("../../initial_state/initialContentState.json");

export default class GoodCategories extends React.Component {
  
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this)
    this.state = {
      start: 1,
      end: 9
    };
    this.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QzIiwiZmlyc3RuYW1lIjoiM3JkUGVvcGxlIiwibGFzdG5hbWUiOiJpc0hlcmUiLCJlbWFpbCI6IjNyZFBlb3BsZUBlbWFpbC5jb20iLCJhdmF0YXIiOiIzIHBhc3RlIGltZyBzcmMgaGVyZSIsImlzQWRtaW4iOmZhbHNlLCJhZGRyZXNzIjoiMTIzIHdvcnNoaW5ndG9uIG1hZGFnYXRnYSIsInBheXBhbCI6eyJ1c2VybmFtZSI6IjNyZHBheXBhbCJ9LCJjcmVkaXRDYXJkIjp7ImNhcmROdW1iZXIiOiIxMjM0NTY3ODkwMTIzNDU2IiwiZXhwaXJlZERhdGUiOiIxMi8yNCJ9LCJpYXQiOjE2MDUzNzMzMzd9.wfZxaBT6NWVjK6ydgVFmbLyQok2QjMZIDSeNo3rHE8E";
  }

  
  componentDidMount() {
    this.props.fetchGoodCategories(this.state.start, this.state.end);
    this.props.fetchGoodCategoryAmount();
    //this.props.blogsList.blogs = initialContentState.blogs.blogsList.blogs;
  }

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetDeletedGoodCategory();
  }

  // Click Function
  onChange(i) {
    this.setState({
      start: 1+(9*i),
      end: 9+(9*i)
    });
    this.props.fetchGoodCategories(1+(9*i), 9+(9*i));
  }
  
  renderGoodCategories(goodCategories) {
    return goodCategories.map((goodCategory, index) => {
      return (
        <div className="row" style={index%2 == 1 ? {color: "white", backgroundColor: "gray"} : {backgroundColor: "white"}}>
          <div className="col-sm-4">
            {goodCategory.title}
          </div>
          <div className="col-sm-4">
            <Link to={"/admin/goodCategories/edit/" + goodCategory.title}>Edit</Link>
          </div>
          <div className="col-sm-4" style={{color: 'black'}}>
            <button
              style = {{backgroundColor: "orange", color: "white"}}
              onClick = {
                () => this.props.deleteGoodCategory(goodCategory.title, this.props.member.token, this.state.start, this.state.end)
              }
            >
              Delete
            </button>
          </div>
          <br/>
        </div>
      );
    });
  }
  
  
  render() {
    
    const { good, loading, error } = this.props.categoriesList;
    
    const { data } = this.props.goodCategoryAmount;

    const buttons = [];
    const pageNumber = Math.ceil(Number(data) / 9);
    for (let i=0; i<pageNumber; i++) {
      buttons.push(<button onClick={() => this.onChange(i)} >{i+1}</button>)
    }

    if(!data || !good) {
      return <div className="container"><h1>MeatSEO</h1><h3>Loading...</h3></div>      
    //} else if(error) {
    //  return <div className="alert alert-danger">Error: {error.message}</div>
    //} else if(!content) {
    //  return <div/>;
    }
    
    return (
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h5 className="title">List of Good Categories</h5>
          </div>
          <Link to="/admin/goodCategories/create/">Create New Good Category</Link>
          <div className="card-body all-icons">
            <div className="row blog-container">
              
              <div className="row">
                <div className="col-sm-4">
                  Category Title
                </div>
                <div className="col-sm-4">
                  Edit Category
                </div>
                <div className="col-sm-4">
                  Delete Category
                </div>
              </div>

              <hr/>

              {this.renderGoodCategories(good)}

            </div>
          </div>
          {buttons}
        </div>
      </div>
    )
  }
}
