import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, useRouteMatch, useLocation } from 'react-router-dom';
import SideBar from './containers/SideBarContainer';
import DashboardPage from './pages/DashboardPage';
import IndexContentPage from './pages/IndexContentPage';
import TemplateContentPage from './pages/TemplateContentPage';
import ContactUsContentPage from './pages/ContactUsContentPage';
import UploadPage from './pages/UploadPage';
import SignInPage from './pages/SignInPage';
import BlogsPage from './pages/BlogsPage';
import GoodsPage from './pages/GoodsPage';
import GoodCategoriesPage from './pages/GoodCategoriesPage';
import OrdersPage from './pages/OrdersPage';
import BlogPage from './pages/BlogPage';
import GoodPage from './pages/GoodPage';
import GoodCategoryPage from './pages/GoodCategoryPage';
import OrderPage from './pages/OrderPage';
import CreateBlogPage from './pages/CreateBlogPage';
import CreateGoodPage from './pages/CreateGoodPage';
import CreateGoodCategoryPage from './pages/CreateGoodCategoryPage';
import Footer from './containers/FooterContainer';
import NotFoundPage from './components/NotFoundPage';
import fetch from 'cross-fetch';


function App({member}) {

  // if(loading) {
  //   return <div className="container"><h1>MeatSEO</h1><h3>Loading...</h3></div>      
  // } else if(error) {
  //   return <div className="alert alert-danger">Error: {error.message}</div>
  // } else if(!data) {
  //   return <NotFoundPage/>
  // } else
  if(!member.user || !member.token) {
    return <SignInPage/>
  }

  return (
      <div>
        <SideBar pathname={useLocation().pathname} />
        <div className="main-panel" id="main-panel">
          <Switch>
            <Route exact path="/admin/">
              <OrdersPage/>
            </Route>
            <Route path="/admin/upload">
              <UploadPage/>
            </Route>
            <Route path="/admin/contents/index">
              <IndexContentPage/>
            </Route>
            <Route path="/admin/contents/template">
              <TemplateContentPage/>
            </Route>
            <Route path="/admin/contents/contactUs">
              <ContactUsContentPage/>
            </Route>
            <Route exact path="/admin/blogs">
              <BlogsPage/>
            </Route>
            <Route exact path="/admin/goods">
              <GoodsPage/>
            </Route>
            <Route exact path="/admin/goodCategories">
              <GoodCategoriesPage/>
            </Route>
            <Route exact path="/admin/orders">
              <OrdersPage/>
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
            <Route path="/admin/goodCategories/edit">
              <GoodCategoryRoute/>
            </Route>
            <Route path="/admin/goodCategories/create">
              <CreateGoodCategoryPage/>
            </Route>
            <Route path="/admin/orders">
              <OrderRoute/>
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

function GoodCategoryRoute() {
  let { path } = useRouteMatch();

  return (
    <Route path={`${path}/:categoryTitle`}>
      <GoodCategoryPage />
    </Route>
  );
}

function OrderRoute() {
  let { path } = useRouteMatch();

  return (
    <Route path={`${path}/:invoiceId`}>
      <OrderPage />
    </Route>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

function mapStateToProps(state) {
  return {
    member: state.member
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
