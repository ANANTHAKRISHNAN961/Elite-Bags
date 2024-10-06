import React from 'react';
import Cards from '../components/Cards';
import Carousel from '../components/Carousel';

const Home = ({ searchQuery }) => {
  return (
    <>
      <header className="bg-warning text-center py-5">
        <div className="container">
          <h1 className="display-4">Welcome to Elite Bags</h1>
          <p className="lead">Discover the finest selection of bags tailored just for you</p>
          <a href="#products" className="btn btn-outline-dark btn-lg">Shop Now</a>
        </div>
      </header>
      
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Featured Products</h2>
          <Carousel />
        </div>
      </section>
      
      <section id="products" className="py-5 bg-light" >
        <div className="container" >
          <h2 className="text-center mb-4">Our Products</h2>
          <Cards searchQuery={searchQuery} />
        </div>
      </section>
    </>
  );
};

export default Home;
