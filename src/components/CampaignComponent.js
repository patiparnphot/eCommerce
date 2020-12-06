import React from 'react';


export default class Campaign extends React.Component {
  
  componentDidMount() {
    var parallax = require('../../static/assets/js/jquery.TDParallax.min.js');
    $('.parallax').TDParallax();
  }
  
  getHTML(htmlCode) {
    return { __html: htmlCode };
  }
  
  
  render() {
    
    const { campaign } = this.props;
    
    if (!campaign) {
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
                {campaign.title} <br/>
                <small>{campaign.subTitle}</small>
              </span>
              <p>
                <span className="sdw-wrap">
                  <a href={campaign.btnLink} className="sdw-hover btn btn-material btn-yellow btn-lg ripple-cont">
                    {campaign.btnText}
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
      data-parallax-image={campaign.parallaxImage}
      data-speed-direction="-.2">
    </div>
  </div>
</div>
    )
  }
}


