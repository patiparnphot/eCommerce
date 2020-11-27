import React from 'react';
import { Route, Switch } from 'react-router-dom';

import IndexPage from './pages/IndexPage';
import BlogPage from './pages/BlogPage';
import NotFoundPage from './components/NotFoundPage';

const routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <IndexPage/>
      </Route>
      <Route path="/blogs/:id">
        <BlogPage/>
      </Route>
      <Route path="**" component={NotFoundPage}/>
    </Switch>
  );
};

export default routes;

// <Route path="/shareblog" component={ShareBlog}/>
//       <Route path="/blogs/:id" component={BlogPage}/>