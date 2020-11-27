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
          <nav>
            <ul>
              <li>
                <a href="https://www.creative-tim.com">
                  Creative Tim
                </a>
              </li>
              <li>
                <a href="http://presentation.creative-tim.com">
                  About Us
                </a>
              </li>
              <li>
                <a href="http://blog.creative-tim.com">
                  Blog
                </a>
              </li>
            </ul>
          </nav>
          <div className="copyright" id="copyright">
            &copy; 2020, Designed by <a href="https://www.invisionapp.com" target="_blank">Invision</a>. Coded by <a href="https://www.creative-tim.com" target="_blank">Creative Tim</a>.
          </div>
        </div>
      </footer>
    )
  }
}
