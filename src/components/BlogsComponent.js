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
    //this.props.fetchBlogs();
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
                <Link to={"/blogs/" + blog.title} className="link-details" title="More Details"><i className="ion ion-android-open"></i></Link>
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
        <section id="blog" className="section-bg">
          <div className="container">
    
            <header className="section-header">
              <h3 className="section-title">{content.header}</h3>
            </header>
    
            <div className="row">
              <div className="col-lg-12">
                <ul id="blog-flters">
                  <li data-filter="*" className={this.state.allActive} onClick={() => {this.onFilterChange('*')}}>{content.all}</li>
                  <li data-filter=".filter-seo" className={this.state.seoActive} onClick={() => {this.onFilterChange('filter-seo')}}>{content.seo}</li>
                  <li data-filter=".filter-dev" className={this.state.devActive} onClick={() => {this.onFilterChange('filter-dev')}}>{content.dev}</li>
                  <li data-filter=".filter-data" className={this.state.dataActive} onClick={() => {this.onFilterChange('filter-data')}}>{content.data}</li>
                </ul>
              </div>
            </div>
    
            <div className="row blog-container">
              
              {this.renderBlogs(blogs)}
              
            </div>
    
          </div>
        </section>
    )
  }
}