import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Header from './containers/HeaderContainer';
import Footer from './containers/FooterContainer';
import NotFoundPage from './components/NotFoundPage.js';
import IndexPage from './pages/IndexPage';
import BlogPage from './pages/BlogPage';
import TagPage from './pages/TagPage';
import GoodPage from './pages/GoodPage';

var initialContentState = require("../initial_state/initialContentState.json");

import {
  fetchTemplatecontent,
  fetchTemplatecontentSuccess,
  fetchTemplatecontentFailure
} from './actions/contents';

//const history = createMemoryHistory();


function App({fetchTemplatecontent, templateContent}) {
  
  React.useEffect(() => {
    fetchTemplatecontent();
    //templateContent.content = initialContentState.contents.template.content;
  },[]);
  
  const { content, loading, error } = templateContent;
  
  if(loading) {
    return <div className="container"><h1>MeatSEO</h1><h3>Loading...</h3></div>      
  } else if(error) {
    return <div className="alert alert-danger">Error: {error.message}</div>
  } else if(!content) {
    return <NotFoundPage/>
  }
  
  // console.log('template: ', templateContent);
  
  return (
      <div>
        <Header headerTag={content.headerTag} />
        <Switch>
          <Route exact path="/">
            <IndexPage/>
          </Route>
          <Route path="/blogs">
            <BlogsPage/>
          </Route>
          <Route path="/goods">
            <GoodsPage/>
          </Route>
          <Route path="*" component={NotFoundPage}/>
        </Switch>
        <Footer footerTag={content.footerTag} />
        <a href="#" className="back-to-top"><i className="fa fa-chevron-up"></i></a>
      </div>
  );
}

function BlogsPage() {
  let { path } = useRouteMatch();

  return (
    <Route path={`${path}/:title`}>
      <BlogPage />
    </Route>
  );
}

function GoodsPage() {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/:tag`}>
        <TagPage/>
      </Route>
      <Route path={`${path}/:tag/:slug`}>
        <GoodPage />
      </Route>
    </Switch>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTemplatecontent: () => {
      dispatch(fetchTemplatecontent()).then((response) => {
        console.log('templateContent: ', response.payload);
        !response.error ? dispatch(fetchTemplatecontentSuccess(response.payload)) : dispatch(fetchTemplatecontentFailure(response.payload));
      });
    }
  };
};


function mapStateToProps(state) {
  return {
    templateContent: state.contents.template
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
