import React from 'react';


export default class Faq extends React.Component {
  
//   componentDidMount() {
//     this.props.fetchBlogs();
//   }
 
  renderList(list) {
    
    let index = 0;
    
    return list.map((list) => {
      
      index += 1;
      
      return (
        <li key={"faqList" + index}>
          <a data-toggle="collapse" className="collapsed" href={"#faq" + index}>
            {list.question} <i className="ion-android-remove"></i>
          </a>
          <div id={"faq" + index} className="collapse" data-parent="#faq-list">
            <p>{list.answer}</p>
          </div>
        </li>
      );
    });
  }
  
  getHTML(htmlCode) {
    return { __html: htmlCode };
  }
  
  
  render() {
    
    const { faq } = this.props;
    
    if (!faq) {
      return <div/>
    }
    
    return (
        <section id="faq">
          <div className="container">
            <header className="section-header">
              <div dangerouslySetInnerHTML={this.getHTML(faq.header)} />
            </header>
    
            <ul id="faq-list" className="wow fadeInUp">
              
              {this.renderList(faq.list)}
    
            </ul>
    
          </div>
        </section>
    )
  }
}
