import React from 'react';


export default class Team extends React.Component {
  
//   componentDidMount() {
//     this.props.fetchBlogs();
//   }
   
  renderMembers(members) {
    return members.map((member) => {
      return (
        <div key={member.name} className="col-lg-3 col-md-6 wow fadeInUp">
          <div className="member">
            <img src={member.image} className="img-fluid" alt="" />
            <div className="member-info">
              <div className="member-info-content">
                <h4>{member.name}</h4>
                <span>{member.position}</span>
                <div className="social">
                  <a href={member.twitter}><i className="fa fa-twitter"></i></a>
                  <a href={member.facebook}><i className="fa fa-facebook"></i></a>
                  <a href={member.linkIn}><i className="fa fa-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
  
  getHTML(htmlCode) {
    return { __html: htmlCode };
  }
  
  
  render() {
    
    const { team } = this.props;
    
    if (!team) {
      return <div/>
    }
    
    return (
        <section id="team" className="section-bg">
          <div className="container">
            <div className="section-header">
              <div dangerouslySetInnerHTML={this.getHTML(team.header)} />
            </div>
    
            <div className="row">
    
              {this.renderMembers(team.members)}
    
            </div>
    
          </div>
        </section>
    )
  }
}
