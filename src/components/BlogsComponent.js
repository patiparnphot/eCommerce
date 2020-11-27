import React from 'react';
import { Link } from 'react-router-dom';

var initialContentState = require("../../initial_state/initialContentState.json");

export default class Blog extends React.Component {
  
  constructor(props) {
    super(props);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.state = {
      allActive: 'filter-active',
      seoActive: '',
      devActive: '',
      dataActive: ''
    };
  }
  
  componentDidMount() {
    this.props.fetchBlogs();
    //this.props.blogsList.blogs = initialContentState.blogs.blogsList.blogs;
  }
  
  // Click Function
  onFilterChange(newFilter) {
    if (this.iso === undefined) {
      this.iso = new Isotope('.blog-container', {
        itemSelector: '.blog-item',
        masonry: {
          columnWidth: 5
        }
      });
    }
    if (newFilter === '*') {
      this.iso.arrange({ filter: '*' });
    } else {
      this.iso.arrange({ filter: `.${newFilter}` });
    }
    this.setState({
      allActive: '',
      seoActive: '',
      devActive: '',
      dataActive: ''
    });
    if (newFilter === '*') {
      this.setState({allActive: 'filter-active'});
    } else if (newFilter === 'filter-seo') {
      this.setState({seoActive: 'filter-active'});
    } else if (newFilter === 'filter-dev') {
      this.setState({devActive: 'filter-active'});
    } else if (newFilter === 'filter-data') {
      this.setState({dataActive: 'filter-active'});
    }
  }

  renderBlogs(blogs) {
    return blogs.map((blog) => {
      return (
        <div key={blog.title} className={"col-lg-4 col-md-6 blog-item filter-" + blog.type}>
          <div className="blog-wrap">
            <img src={ blog.image } className="img-fluid" alt="" />
            <div className="blog-info">
              <h4><Link to={"/blogs/" + blog.title}>{ blog.title }</Link></h4>
              <p>{blog.type}</p>
              <div>
                <a href={ blog.image } data-lightbox="blog" data-title={ blog.title } className="link-preview" title="Preview">
                  <i className="ion ion-eye"></i>
                </a>
                <Link to={"/blogs/" + blog.slug} className="link-details" title="More Details"><i className="ion ion-android-open"></i></Link>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
  
  
  render() {
    
    const { blogs, loading, error } = this.props.blogsList;
    
    const { content } = this.props;
    

    if(loading) {
      return <div className="container"><h1>MeatSEO</h1><h3>Loading...</h3></div>      
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    } else if(!content) {
      return <div/>;
    }
    
    return (
      <section id="blogs">
      <div className="container-fluid">
        <div className="row">
          <div className="clearfix">
            <div className="substrate-wrap">
              <div className="substrate parallax-block"
                data-speed-direction=".3"
                data-default-pos="-400"
                data-parallax-block="true">
                <div className="text text-dark">
                  POPULAR
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid block space-top">
        <div className="row">
          <div className="container">
            <div className="row">
    
              <div className="col-md-4 col-lg-3 asside">
                <div className="inblock padding-none">
                  <div className="wrap">
                    <span className="comp-header st-16 text-uppercase">
                      Latest
                      <span className="text-grey">
                        on blog
                      </span>
                    </span>
                  </div>
                </div>
              </div>
    
              <div className="col-md-8 col-lg-9">
                <div className="owl-carousel owl-default latest-on-blog nav-bottom-right">
                
                  <div className="blog-item">
                    <div className="wrap">
                      <div className="image">
                        <img src="images/blog/img-01.jpg" alt=""/>
                      </div>                            
                      <div className="caption">
                        <h3 className="header">
                          <span className="date">
                            10 january 2017
                          </span>
                          <span className="text-uppercase">
                            Paper Bag
                          </span>
                        </h3>
                        <p className="text">
                          Fugiat mollitia vero, id eligendi non suscipit
                          <span className="hidden-xs">
                            laboriosam maiores, perspiciatis ullam eveniet molestiae, nesciunt est ipsa veniam consequuntur in totam.
                          </span>
                        </p>
                        <a href="blog-item.html" className="more-info">More info</a>
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
    )
  }
}

