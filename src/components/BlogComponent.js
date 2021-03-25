import React from 'react';
import { Link } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import Loader from './loader';
import { Helmet } from 'react-helmet';

var initialBlogState = require("../../initial_state/initialBlogState");


export default class BlogPage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { blogTitleHistory: '' };
  }
  
  componentDidMount() {
    
    this.props.fetchBlogdetailcontent();
    
    //window.fbAsyncInit = function() {
    //  window.FB.init({
    //    appId            : '182388739813749',
    //    autoLogAppEvents : true,
    //    xfbml            : true,
    //    version          : 'v5.0'
    //  })
    //};
    
    // Load the SDK asynchronously
    //(function(d, s, id) {
    //    var js, fjs = d.getElementsByTagName(s)[0];
    //    if (d.getElementById(id)) return;
    //    js = d.createElement(s); js.id = id;
    //    js.src = "//connect.facebook.net/en_US/sdk.js";
    //    fjs.parentNode.insertBefore(js, fjs);
    //}(document, 'script', 'facebook-jssdk'));
    
    this.props.fetchBlog(this.props.blogTitle);
    // this.props.fetchAuthorblog();
    //this.props.activeBlog.blog = initialBlogState(this.props.blogTitle);
    this.setState({blogTitleHistory: this.props.blogTitle});
    
  }
  
  componentDidUpdate() {
    
    if ( window.FB ) {
      window.FB.XFBML.parse();
    }
    
    console.log("blog title: ", this.props.blogTitle);
    console.log("blog histitle: ", this.state.blogTitleHistory);
    
    if ( this.state.blogTitleHistory != this.props.blogTitle ) {
      this.props.fetchBlog(this.props.blogTitle);
      //this.props.activeBlog.blog = initialBlogState(this.props.blogTitle);
      //console.log("BlogState", initialBlogState(this.props.blogTitle));
      console.log("activeBlogTitle", this.props.activeBlog.blog);
      this.setState({blogTitleHistory: this.props.blogTitle});
    }
    
  }
    
  renderRecentPosts(posts) {
    return posts.map((post) => {
      return (
        <div key={post.title} className="media post_item">
          <img src={post.image} alt="post" />
          <div className="media-body">
            <Link to={"/blogs/" + post.slug}>
              <h3>{post.title}</h3>
            </Link>
            <p>{post.postedDuration}</p>
          </div>
        </div>
      );
    });
  }
  
  getHTML(htmlCode) {
    return { __html: htmlCode };
  }

  render() {
    const { content } = this.props.blogdetailContent;
    const contentLoading = this.props.blogdetailContent.loading;
    const contentError = this.props.blogdetailContent.error;
    const { blog } = this.props.activeBlog;
    const blogLoading = this.props.activeBlog.loading;
    const blogError = this.props.activeBlog.error;
    
    // console.log("blog detail content: ", content);
    console.log("blog detail: ", blog);
    
    if (contentLoading || blogLoading || !this.props.authorBlog.data) {
      return <Loader/>;
    } else if(contentError) {
      return  <div className="alert alert-danger">{contentError.message}</div>
    } else if(blogError) {
      return  <div className="alert alert-danger">{blogError.message}</div>
    } else if(!content) {
      return <NotFoundPage/>
    } else if(!blog || (blog.title == "noSlug")) {
      return <NotFoundPage/>
    }

    return (
      <section id="blog">
         <Helmet>
            <title>{blog.titleHtml}</title>
            <meta name='description' content={blog.descriptionHtml} />
         </Helmet>

          <div className="bradcam_area">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="bradcam_text text-center">
                    <h3>{content.headerLine}</h3>
                    <nav className="brad_cam_lists">
                      <ul className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">{content.homeBreadcrumb}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{content.blogDetailBreadcrumb}</li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section className="blog_area single-post-area section-padding">
            <div className="container">
              <div className="row">
                <div className="col-lg-9 col-md-9 col-12 posts-list">
                  <div className="single-post">
                    <div className="feature-img">
                      <img className="img-fluid" style={{width: '100%'}} src={blog.image} alt="" />
                    </div>
                    <div className="blog_details">
                      <h2>{blog.title}</h2>
                      <br/>
                      <br/>
                      <div dangerouslySetInnerHTML={this.getHTML(blog.text)} />
                      <br/>
                      <br/>
                    </div>
                  </div>
                  <div className="navigation-top">
                    <div className="fb-like" data-href={content.url + "/blogs/" + blog.id} data-width="" data-layout="standard" data-action="like" data-size="small" data-share="true"></div>
                    <div className="navigation-area">
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-12 nav-left flex-row d-flex  align-items-center">
                          <div className="thumb">
                            <Link to={"/blogs/" + blog.prevBlog.slug} >
                              <img className="img-fluid" src={blog.prevBlog.image} alt="" />
                            </Link>
                          </div>
                          <div className="arrow">
                            <Link to={"/blogs/" + blog.prevBlog.slug} >
                              <span className="lnr text-white"><i className="fa fa-arrow-left"></i></span>
                            </Link>
                          </div>
                          <div className="detials">
                            <p>{content.previousBlogNav}</p>
                            <Link to={"/blogs/" + blog.prevBlog.slug} >
                              <h4>{blog.prevBlog.title}</h4>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12 nav-right flex-row d-flex justify-content-end align-items-center">
                          <div className="detials">
                            <p>{content.nextBlogNav}</p>
                            <Link to={"/blogs/" + blog.nextBlog.slug}>
                              <h4>{blog.nextBlog.title}</h4>
                            </Link>
                          </div>
                          <div className="thumb">
                            <Link to={"/blogs/" + blog.nextBlog.slug}>
                              <img className="img-fluid" src={blog.nextBlog.image} alt="" />
                            </Link>
                          </div>
                          <div className="arrow">
                            <Link to={"/blogs/" + blog.nextBlog.slug}>
                              <span className="lnr text-white"><i className="fa fa-arrow-right"></i></span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="blog-author">
                    <div className="media align-items-center">
                      <img src={this.props.authorBlog.data.image} alt="" />
                      <div className="media-body">
                        <a href="#">
                           <h4>{this.props.authorBlog.data.name}</h4>
                        </a>
                        <p>{this.props.authorBlog.data.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="fb-comments" data-href={content.url + "/blogs/" + blog.id} data-width="100%" data-numposts="5"></div>
                </div>
                <div className="col-lg-3 col-md-3 col-12">
                  <div className="blog_right_sidebar">
                    <aside className="single_sidebar_widget popular_post_widget">
                      <h3 className="widget_title">{content.recentPostHead}</h3>
                      {this.renderRecentPosts(blog.recentBlogs)}
                    </aside>
                  </div>
                </div>
              </div>
            </div>
          </section>
      </section>
    );
  }
}

// <img className="img-fluid" src={blog.image}/>
//         <div className="caption-full">
//           <h1>{blog.title}</h1>
//           <div dangerouslySetInnerHTML={this.getHTML(blog.text)} />
//         </div>
//       </div>
//       <div className="well">
//         <div className="text-right">
//           <a className="btn btn-success pull-right" role="button" data-toggle="collapse" href="#collapseComment" aria-expanded="false" aria-controls="collapseComment">
//             <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add new comment
//           </a>
//         </div>
        
//         <hr/>
        
//       </div>
