import React from 'react';
import { useNavigate } from 'react-router-dom'

import Navbar from './Navbar.jsx'
import './home.css'

const Home = () => {
  const navigate = useNavigate();

  const useTool = () => {
    navigate("/hackathon1/useTool")
  }


  return (
    <section className="homeSection">
      <div className='navbar'>
        <Navbar />
      </div>

      <div className='homeContent'>
        <h2>USE OUR TOOL TO</h2>
        <h3>MONITOR THE ENVIRONMENT</h3>
        <div className='homeButton'>
          <button 
          className='homeButt'
          onClick={useTool}>
            <a href="">Use Tool</a>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
