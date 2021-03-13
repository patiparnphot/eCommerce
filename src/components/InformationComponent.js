import React from 'react';
import Loader from './loader';


export default function Information({information}) {
  
  React.useEffect(() => {
    var parallax = require('../../static/assets/js/jquery.TDParallax.min.js');
    $('.parallax').TDParallax();
  }, []);

  
  if (!information) {
    return <Loader/>
  } else if (!information.title || (information.title == "")) {
    return <div/>
  } else {
    return (
      <section id="information">
        <div className="container-fluid">
          <div className="row parallax-wrap">
            <div className="container block">
              <div className="row">
                <div className="col-sm-12">
                  <span className="comp-header st-18 text-uppercase">
                    {information.title} <br/>
                    <div className="desc">{information.text}</div>
                  </span>
                  <p>
                    <span className="sdw-wrap">
                      {
                        (
                          !information.btnText || (information.btnText == "")
                        ) ? (
                          <span></span>
                        ) : (
                          <a href={information.btnLink} className="sdw-hover btn btn-material btn-yellow btn-lg ripple-cont">
                            {information.btnText}
                          </a>
                        )
                      }
                    </span>
                  </p>
                </div>
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

