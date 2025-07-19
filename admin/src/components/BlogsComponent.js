import React from 'react';
import { Link } from 'react-router-dom';
import Loader from './loader';


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
    this.props.fetchBlogAmount();
    //this.props.blogsList.blogs = initialContentState.blogs.blogsList.blogs;
  }

  componentDidUpdate() {
    if(this.props.blogsList.blogs) {
      $(document).ready(function() {
        // Blog isotope
        demo.initIsotope();
      });
    }
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
                <a onClick={() => this.props.deleteBlog(blog.id, this.props.member.token, this.state.start, this.state.end)} href="#" className="link-delete" title="Delete">
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
    
    const { blogs, loading, error } = this.props.blogsList;
    
    const { data } = this.props.blogAmount;

    const buttons = [];
    const pageNumber = Math.ceil(Number(data) / 3);
    for (let i=0; i<pageNumber; i++) {
      buttons.push(<button onClick={() => this.onChange(i)} >{i+1}</button>)
    }

    if((!data && (data != 0)) || !blogs) {
      return <Loader/>
    //} else if(error) {
    //  return <div className="alert alert-danger">Error: {error.message}</div>
    //} else if(!content) {
    //  return <div/>;
    }
    
    return (
      <div className="content">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5 className="title">List of Blogs</h5>
                <Link to="/admin/blogs/create/">Create New Blog</Link>
              </div>
              <div className="card-body all-icons">
                <div className="row blog-container">              
                  {
                    (
                      data == 0
                    ) ? (
                      "NO BLOGS"
                    ) : (
                      this.renderBlogs(blogs)
                    )
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12">
            {buttons}
          </div>
        </div>
      </div>
    )
  }
}
