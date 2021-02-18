import React from 'react';


export default class Footer extends React.Component {
  
  componentDidMount() {
  }
  
  render() {
    
    //const { footerTag } = this.props;
    
    //if (!footerTag) {
    //  return <div/>
    //}
    
    return (
      <footer className="footer">
        <div className=" container-fluid ">
          <div className="copyright" id="copyright">
            &copy; 2020, Coded by <a href="https://www.octorax.com" target="_blank">OCTORAX</a>.
          </div>
        </div>
      </footer>
    )
  }
}