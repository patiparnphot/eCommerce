import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

export default class Header extends React.Component {
  
  //componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    //  this.props.resetPage();
  //}

  componentDidMount(){
    // this.props.loadUserFromPage();
  }
  
//   renderMemberNav(user) {
//     if(user) {
//       return (
//         <ul className="nav navbar-nav navbar-right">
//           <li><Link to={"/users/" + user.userId}>Signed In As {user.username}</Link></li>
//           <li><a role="button" href="#" onClick={this.props.signOut}>SignOut</a></li>
//         </ul>
//       );
//     } else {
//       return (
//         <ul className="nav navbar-nav navbar-right">
//           <li><Link to="/signin">SignIn</Link></li>
//           <li><Link to="/signup">Signup</Link></li>
//         </ul>
//       );
//     }
//   }
  
  render() {
    
    // const { user } = this.props.member;
    
    const { headerTag } = this.props;
    
    if (!headerTag) {
      return <div/>
    }
    
    return (
      <header id="header">

        <div id="topbar">
          <div className="container">
            <div className="social-links">
              <a href={headerTag.twitter} className="twitter"><i className="fa fa-twitter"></i></a>
              <a href={headerTag.facebook} className="facebook"><i className="fa fa-facebook"></i></a>
              <a href={headerTag.linkedin} className="linkedin"><i className="fa fa-linkedin"></i></a>
              <a href={headerTag.instagram} className="instagram"><i className="fa fa-instagram"></i></a>
            </div>
          </div>
        </div>
    
        <div className="container">
    
          <div className="logo float-left">
            <h1 className="text-light">
              <Link to="/" className="scrollto">
                <span>
                  <img src="/img/meatseoLogoMonotone.png" />
                </span>
              </Link>
            </h1>
          </div>
    
          <nav className="main-nav float-right d-none d-lg-block">
            <ul>
              <li className="active"><Link to="/#intro">{headerTag.introNav}</Link></li>
              <li><Link to="/#about">{headerTag.aboutNav}</Link></li>
              <li><Link to="/#services">{headerTag.servicesNav}</Link></li>
              <li><Link to="/#blog">{headerTag.blogNav}</Link></li>
              <li><Link to="/#team">{headerTag.teamNav}</Link></li>
              <li><Link to="/#footer">{headerTag.footerNav}</Link></li>
            </ul>
          </nav>
          
        </div>
      </header>
      
    );
  }
}

// <nav className="navbar navbar-default">
//         <div className="container">
//           <div className="navbar-header">
//             <Link className="navbar-brand" to="/">MEATSEO</Link>
//           </div>
//           <div className="collapse navbar-collapse">
//             <ul className="nav navbar-nav navbar-right">
//               <li><Link to={"/users/"}>Signed In As Bukunjom</Link></li>
//               <li><a role="button" href="#">SignOut</a></li>
//             </ul>
//           </div>
//         </div>
//       </nav>