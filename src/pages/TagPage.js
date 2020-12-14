import React, { Component } from 'react';
import { useParams } from 'react-router-dom';

export default function TagPage () {
  
  let { tag } = useParams();
  
  return (
      <div className="container d-flex h-100">
        {tag}
      </div>
  );
}
