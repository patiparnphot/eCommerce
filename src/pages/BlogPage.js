import React, { Component } from 'react';
import Blog from '../containers/BlogContainer';
import { useParams } from 'react-router-dom';

export default function BlogPage () {
  
  let { title } = useParams();
  
  return (
      <div className="container d-flex h-100">
        <Blog title={title} />
      </div>
  );
}
