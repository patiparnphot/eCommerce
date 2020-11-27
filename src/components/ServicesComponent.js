import React from 'react';


export default class Services extends React.Component {
  
//   componentDidMount() {
//     this.props.fetchBlogs();
//   }

  renderBoxes(boxes) {
    return boxes.map((box) => {
      return (
        <div key={box.title} className="col-md-6 col-lg-4 wow bounceInUp" data-wow-duration="1.4s">
          <div className="box">
            <div className="icon" style={{background: box.bgColor}}><i className={box.icon} style={{color: box.iconColor}}></i></div>
            <h4 className="title"><a href={box.href}>{box.title}</a></h4>
            <p className="description">{box.description}</p>
          </div>
        </div>
      );
    });
  }
  
  getHTML(htmlCode) {
    return { __html: htmlCode };
  }
  
  
  render() {
    
    const { services } = this.props;
    
    if (!services) {
      return <div/>
    }
    
    return (
      <div className="container-fluid space-bottom space-bottom-shift">
  <div className="row parallax-wrap">
    <div className="container">
      <div className="row">
        <div className="bnr-frame-top">
          &nbsp;
        </div>
        <div className="col-xs-12">
          <div className="row">
            <div className="col-sm-6">
              <span className="comp-header st-20 text-uppercase text-white">
                Winter 2017 <br/>
                <small>New collections</small>
              </span>
              <p>
                <span className="sdw-wrap">
                  <a href="#" className="sdw-hover btn btn-material btn-yellow btn-lg ripple-cont">
                    View New Collections
                  </a>
                </span>
              </p>
            </div>
            <div className="col-sm-6"></div>
          </div>
        </div>
        <div className="bnr-frame-bottom">
          &nbsp;
        </div>
      </div>
    </div>
    <div className="parallax bg-darkness opc-7"
      data-parallax-image="images/blocks/bg-01.jpg"
      data-speed-direction="-.2">
    </div>
  </div>
</div>
    )
  }
}


