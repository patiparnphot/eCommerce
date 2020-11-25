import React from 'react';


export default class Intro extends React.Component {
  
  // componentDidMount() {
  //   this.props.fetchBlogs();
  // }
  
  getHTML(htmlCode) {
    return { __html: htmlCode };
  }
  
  
  render() {
    
    const { intro } = this.props;
    
    if (!intro) {
      return <div/>
    }
    
    return (
      <div className="container-fluid">
  <div className="row">
    <div className="clearfix">
      <div className="owl-carousel slideshow">

        <div className="item">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-5 hidden-xs hidden-sm">
                <h2 className="header text-uppercase text-blue">Sneakers</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et maxime vero amet, quisquam nihil! Odit, hic fugiat!
                </p>
                <span className="btn-panel">
                  <span className="sdw-wrap">
                    <a href="shop-item.html" className="sdw-hover btn btn-lg btn-material btn-default">
                      <span className="body">More info</span>
                    </a>
                  </span>
                </span>
              </div>
              <div className="col-xs-10 col-xs-offset-1 col-md-7 col-md-offset-0">
                <div className="img">
                  <img src="images/slideshow/img-01.png" alt=""/>
                </div>
                <span className="sale-badge bg-green text-uppercase">
                  new
                </span>
                <span className="price hidden-xs">
                  <span className="wrap text-red">
                    $254<small>.50</small>-
                  </span>
                </span>
                <span className="text-center visible-xs">
                  <span className="sdw-wrap">
                    <a href="#" className="sdw-hover btn btn-lg btn-material btn-primary">
                      <i className="icon icofont icofont-basket"></i>
                      <span className="body">$254<small>.50</small></span>
                    </a>
                  </span> 
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>
    )
  }
}


