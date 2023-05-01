import React from 'react';
import { Link } from 'react-router-dom';

type Props = {};

const Home = (props: Props) => {
  return (
    <main>
      <div className="content">
        <h1>Bring peace of mind</h1>
        <p>
          This is a demonstration project that showcases a RESTful API for managing user and product
          information for cannabis-derived products. The documentation includes the four
          microservices that make up the API.
        </p>
        <div>
          <Link to="/login">
            <button className="home-btn">Get Started</button>
          </Link>
          <Link to="/api">
            <button className="home-btn">Learn More</button>
          </Link>
        </div>
      </div>
      <div>
        <img src="./dragon_eye.png" alt="logo dragon eye" />
      </div>
    </main>
  );
};

export default Home;
