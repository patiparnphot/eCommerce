import React from 'react';


export default function Campaign ({campaign}) {
  
  // React.useEffect(() => {
  //   var parallax = require('../../static/assets/js/jquery.TDParallax.min.js');
  //   $('.parallax').TDParallax();
  // }, []);
  
    
  if (!campaign || !campaign.features || !Array.isArray(campaign.features) || !campaign.features.length) {
    return <div/>
  } else {
    return (
      <section id="campaign">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <span className="comp-header st-20 text-uppercase">
                {campaign.title}
              </span>
              <Features features={campaign.features}/>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

function Features({features}) {
  return features.map((feature, index) => {
    
    if (index % 2 == 0) {
      return (
        <div key={"feature" + index} className="row feature-item">
          <div className="col-lg-6 wow fadeInUp">
            <img src={feature.image} className="img-fluid" alt="" />
          </div>
          <div className="col-lg-6 wow fadeInUp pt-5 pt-lg-0">
            <h3>{feature.topic}</h3>
            <p>{feature.content}</p>
          </div>
        </div>
      );
    } else if (index % 2 == 1) {
      return (
        <div key={"feature" + index} className="row feature-item mt-5 pt-5">
          <div className="col-lg-6 wow fadeInUp order-1 order-lg-2">
            <img src={feature.image} className="img-fluid" alt="" />
          </div>
          <div className="col-lg-6 wow fadeInUp pt-4 pt-lg-0 order-2 order-lg-1">
            <h3>{feature.topic}</h3>
            <p>{feature.content}</p>
          </div>
        </div>
      );
    }
    
  });
}

function getHTML(htmlCode) {
  return { __html: htmlCode };
}
