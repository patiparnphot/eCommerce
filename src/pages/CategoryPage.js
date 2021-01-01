import React, { Component } from 'react';
import { useParams } from 'react-router-dom';

export default function CategoryPage () {
  
  let { type } = useParams();
  
  return (
      <div className="container d-flex h-100">
        {type}
      </div>
  );
}
