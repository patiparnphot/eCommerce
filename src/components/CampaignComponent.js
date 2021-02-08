import React from 'react';


export default function Campaign ({campaign}) {
  
  React.useEffect(() => {
    var parallax = require('../../static/assets/js/jquery.TDParallax.min.js');
    $('.parallax').TDParallax();
  }, []);
  
    
  if (!campaign) {
    return <div/>
  } else {
    return (
      <section id="campaign">
        <div className="container-fluid space-bottom space-bottom-shift">
          <div className="row parallax-wrap">
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                  <div className="row">
                    <div className="col-sm-6">
                      <span className="comp-header st-20 text-uppercase text-white">
                        {campaign.title} <br/>
                        <small>{campaign.subTitle}</small>
                      </span>
                      <p>
                        <span className="sdw-wrap">
                          {
                            (
                              !campaign.btnText || (campaign.btnText == "")
                            ) ? (
                              <span></span>
                            ) : (
                              <a href={campaign.btnLink} className="sdw-hover btn btn-material btn-yellow btn-lg ripple-cont">
                                {campaign.btnText}
                              </a>
                            )
                          }
                        </span>
                      </p>
                    </div>
                    <div className="col-sm-6"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="parallax bg-darkness opc-7"
              data-parallax-image={campaign.parallaxImage}
              data-speed-direction="-.2"
              style={{backgroundColor: campaign.background}}
            ></div>
          </div>
        </div>
      </section>
    );
  }
}


