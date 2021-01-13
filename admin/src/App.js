import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, useRouteMatch, useLocation } from 'react-router-dom';
import SideBar from './containers/SideBarContainer';
import DashboardPage from './pages/DashboardPage';
import IndexContentPage from './pages/IndexContentPage';
import BlogsPage from './pages/BlogsPage';
import GoodsPage from './pages/GoodsPage';
import BlogPage from './pages/BlogPage';
import GoodPage from './pages/GoodPage';
import CreateBlogPage from './pages/CreateBlogPage';
import CreateGoodPage from './pages/CreateGoodPage';
import Footer from './containers/FooterContainer';
import NotFoundPage from './components/NotFoundPage';
import fetch from 'cross-fetch';

import {
  fetchPreloadedblogdata,
  fetchPreloadedblogdataSuccess,
  fetchPreloadedblogdataFailure
} from './actions/preloadedData';


function App({fetchPreloadedblogdata, preloadedBlogData}) {

  React.useEffect(() => {
    fetchPreloadedblogdata();
  },[]);

  const {data, error, loading} = preloadedBlogData;

  if(loading) {
    return <div className="container"><h1>MeatSEO</h1><h3>Loading...</h3></div>      
  } else if(error) {
    return <div className="alert alert-danger">Error: {error.message}</div>
  } else if(!data) {
    return <NotFoundPage/>
  }

  return (
      <div>
        <SideBar pathname={useLocation().pathname} />
        <div className="main-panel" id="main-panel">
          <Switch>
            <Route exact path="/admin/">
              <DashboardPage/>
            </Route>
            <Route path="/admin/contents/index">
              <IndexContentPage/>
            </Route>
            <Route exact path="/admin/blogs">
              <BlogsPage blogAmount={data.blogAmount}/>
            </Route>
            <Route exact path="/admin/goods">
              <GoodsPage goodAmount={11}/>
            </Route>
            <Route path="/admin/blogs/edit">
              <BlogRoute/>
            </Route>
            <Route path="/admin/blogs/create">
              <CreateBlogPage/>
            </Route>
            <Route path="/admin/goods/edit">
              <GoodRoute/>
            </Route>
            <Route path="/admin/goods/create">
              <CreateGoodPage/>
            </Route>
            <Route path="*" component={NotFoundPage}/>
          </Switch>
          <Footer/>
        </div>
      </div>
  );
}

function BlogRoute() {
  let { path } = useRouteMatch();

  return (
    <Route path={`${path}/:slug`}>
      <BlogPage />
    </Route>
  );
}

function GoodRoute() {
  let { path } = useRouteMatch();

  return (
    <Route path={`${path}/:slug`}>
      <GoodPage />
    </Route>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPreloadedblogdata: () => {
      dispatch(fetchPreloadedblogdata()).then((response) => {
        console.log('preloadedblogdata: ', response.payload);
        !response.error ? dispatch(fetchPreloadedblogdataSuccess(response.payload)) : dispatch(fetchPreloadedblogdataFailure(response.payload));
      });
    }
  };
};

function mapStateToProps(state) {
  return {
    preloadedBlogData: state.preloadedData.blogData
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
