import React from 'react';
import './Style.css';
import { Header } from '../components/Header';

const HomePage = () => {
  return (
    <div className="fade-in">
      <Header />

      {/* Main Page Heading */}
      <div className="heading">
        <div className="fade-in">
          <h1>Welcome to the Web Page for our HackWestTx Project!</h1>
          <h3>This website is your gateway to the information about our project and an introduction to our team.</h3>
        </div>
      </div>

      {/* Thank You */}
      <div className="thankyou">
        <div className="fade-in">
          <h1>Thank you!</h1>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
