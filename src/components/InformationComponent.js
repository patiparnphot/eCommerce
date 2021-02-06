import React from 'react';


export default function Information({information}) {
  
  React.useEffect(() => {
    var parallax = require('../../static/assets/js/jquery.TDParallax.min.js');
    $('.parallax').TDParallax();
  }, []);

  
  if (!information || !information.title || (information.title == "")) {
    return <div/>
  } else {
    return (
      <section id="information">
        <div className="container-fluid">
          <div className="row parallax-wrap">
            <div className="container block">
              <div className="row">
                <div className="col-md-5">
                  <span className="comp-header st-18 text-uppercase">
                    {information.title} <br/>
                    <span className="text-white">{information.text}</span>
                  </span>
                </div>
                <div className="col-md-7"></div>
              </div>
            </div>
            <div className="parallax bg-grey-light opc-7"
              data-parallax-image={information.parallaxImage}
              data-speed-direction="-.2"
              style={{backgroundColor: information.background}}
            ></div>
          </div>
        </div>
      </section>
    );
  }
}

