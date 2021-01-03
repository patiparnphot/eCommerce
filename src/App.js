import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, useRouteMatch, useParams, useHistory } from 'react-router-dom';
import Header from './containers/HeaderContainer';
import Footer from './containers/FooterContainer';
import NotFoundPage from './components/NotFoundPage.js';
import IndexPage from './pages/IndexPage';
import BlogPage from './pages/BlogPage';
import CategoryPage from './pages/CategoryPage';
import GoodPage from './pages/GoodPage';
import CartPage from './pages/CartPage';
import SignInPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';
import InvoicePage from './pages/InvoicePage';

var initialContentState = require("../initial_state/initialContentState.json");

import {
  fetchTemplatecontent,
  fetchTemplatecontentSuccess,
  fetchTemplatecontentFailure
} from './actions/contents';

import { meFromPageSuccess, resetMeFromPage } from './actions/users'
import { editCartGoods } from './actions/goods'

//const history = createMemoryHistory();


function App({autoLogin, autoLogout, refreshIncart, fetchTemplatecontent, templateContent}) {
  
  React.useEffect(() => {
    fetchTemplatecontent();
    autoLogin();
    refreshIncart();
    window.addEventListener('storage', function(event){
      if(event.key == "eCommerceAuth") {
        autoLogin();
      }
      if(event.key == "eCommerceLogout") {
        autoLogout();
      }
    });
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
          <Route path="/cart">
            <CartPage/>
          </Route>
          <Route path="/signin">
            <SignInPage/>
          </Route>
          <Route path="/register">
            <RegisterPage/>
          </Route>
          <Route path="/invoice/:invoiceId">
            <InvoicePage/>
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
      <Route exact path={`${path}/:type`}>
        <CategoryPage/>
      </Route>
      <Route path={`${path}/:type/:slug`}>
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
    },
    autoLogin: () => {
      if(localStorage.getItem('eCommerceAuth')) {
        dispatch(meFromPageSuccess(JSON.parse(localStorage.getItem('eCommerceAuth'))));
      }
    },
    autoLogout: () => {
      if(localStorage.getItem('eCommerceLogout')) {
        dispatch(resetMeFromPage());
        localStorage.removeItem('eCommerceLogout');
      }
    },
    refreshIncart: () => {
      if(localStorage.getItem('eCommerceIncart')) {
        dispatch(editCartGoods(JSON.parse(localStorage.getItem('eCommerceIncart'))));
      }
    }
  };
};


function mapStateToProps(state) {
  return {
    templateContent: state.contents.template
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
