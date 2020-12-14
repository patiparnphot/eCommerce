import React, { Component } from 'react';
import Good from '../containers/GoodContainer';
import { useParams } from 'react-router-dom';

export default function GoodPage () {
  
  let { tag, slug } = useParams();
  
  return (
    <section id="goodDetail">

        <Good slug={slug} tag={tag}/>

    </section>
  );
}
