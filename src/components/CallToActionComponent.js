import React from 'react';


export default class CallToAction extends React.Component {
  
//   componentDidMount() {
//     this.props.fetchBlogs();
//   }
  
  
  render() {
    
    const { callToAction } = this.props;
    
    if (!callToAction) {
      return <div/>
    }
    
    return (
      <div className="container-fluid">
      <div className="row parallax-wrap">
        <div className="container block">
          <div className="row">
            <div className="col-md-5">
              <span className="comp-header st-18 text-uppercase">
                Subscribe <br/>
                <span className="text-white">on latest news</span>
              </span>
            </div>
            <div className="col-md-7"></div>
          </div>
        </div>
        <div className="parallax bg-grey-light opc-7"
          data-parallax-image="images/blocks/bg-02.jpg"
          data-speed-direction="-.2">
        </div>
      </div>
    </div>
    )
  }
}

