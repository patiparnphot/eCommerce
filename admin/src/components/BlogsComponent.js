import React from 'react';
import { Link } from 'react-router-dom';


//var initialContentState = require("../../initial_state/initialContentState.json");

export default class Blogs extends React.Component {
  
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this)
    this.state = {
      start: 1,
      end: 3
    };
  }
  
  componentDidMount() {
    this.props.fetchBlogs(this.state.start, this.state.end);
    //this.props.blogsList.blogs = initialContentState.blogs.blogsList.blogs;

    $(document).ready(function() {
      // Blog isotope
      demo.initIsotope();
    });
  }

  // Click Function
  onChange(i) {
    this.setState({
      start: 1+(3*i),
      end: 3+(3*i)
    });
    this.props.fetchBlogs(1+(3*i), 3+(3*i));
  }
  
  renderBlogs(blogs) {
    return blogs.map((blog) => {
      return (
        <div key={blog.title} className={"col-lg-4 col-md-6 blog-item filter-" + blog.type}>
          <div className="blog-wrap">
            <img src={ blog.image } className="img-fluid" alt="" />
            <div className="blog-info">
              <h4><Link to={"/admin/blogs/edit/" + blog.slug}>{ blog.title }</Link></h4>
              <p>{blog.type}</p>
              <div>
                <a href={ blog.image } data-lightbox="blog" data-title={ blog.title } className="link-preview" title="Preview">
                  <i className="now-ui-icons media-1_album"></i>
                </a>
                <Link to={"/admin/blogs/edit/" + blog.slug} className="link-details" title="More Details">
                  <i className="now-ui-icons travel_info"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
  
  
  render() {
    
    const { blogs, loading, error } = this.props.blogsList;
    
    const { blogAmount } = this.props;

    const buttons = [];
    const pageNumber = Math.ceil(blogAmount / 3);
    for (let i=0; i<pageNumber; i++) {
      buttons.push(<button onClick={() => this.onChange(i)} >{i+1}</button>)
    }

    if(!blogAmount || !blogs) {
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
                <h5 className="title">List of Blogs</h5>
                <p className="category">Blogs about Datascience, Search Engine Optimiser and Developer</p>
              </div>
              <Link to="/admin/blogs/create/">Create New Blog</Link>
              <div className="card-body all-icons">
                <div className="row blog-container">              
                  {this.renderBlogs(blogs)}
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
