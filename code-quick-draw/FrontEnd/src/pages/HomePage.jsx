import React from 'react';
import { Link } from 'react-router-dom';
import './Style.css';

const HomePage = () => {
  return (
    <div className="fade-in">
      {/* Banner for Top of Webpage */}
      <div className="fade-in">
        <div className="banner">
          {/* Logo Ontop of Page */}
          <img className="logo" src="images/CodeQuickdrawLogo.png" alt="CodeQuickdrawLogo Logo" />
        </div>
      </div>

      {/* Buttons */}
      <div className="buttonRow">
        <div className="fade-in">
          <button className="submit">
            <Link className="link" to="/">Home</Link>
          </button>
          <button type="submit" className="submit">
            <Link className="link" to="/play">Play</Link>
          </button>
          <button type="submit" className="submit">
            <Link className="link" to="/about">About Us</Link>
          </button>
          <button type="submit" className="submit">
            <Link className="link" to="/contacts">Contacts</Link>
          </button>
        </div>
      </div>

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
