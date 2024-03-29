import React, { Component } from 'react';
import Blog from '../containers/BlogContainer';
import { useParams } from 'react-router-dom';

export default function BlogPage () {

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  let { title } = useParams();
  
  return (
      <div className="container h-100">
        <Blog title={title} />
      </div>
  );
}
