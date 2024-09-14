import React from 'react';
import { Link } from 'react-router-dom';
import './Style.css';
import { Header } from '../components/Header';

const LinksPage = () => {
  return (
    <div className="fade-in">
      <Header />

      {/* Main Page Heading */}
      <div className="heading fade-in">
        <h1>Explore these links if you'd like to get in touch and connect with us!</h1>

        {/* Contact Links */}
        <h2 className="contacts">
          Jacob Bailey:<br />
          <a href="https://www.linkedin.com/in/jacob-c-bailey/">LinkedIn</a><br />
          <a href="mailto:bai10224@ttu.edu">Email</a>
        </h2>
        <h2 className="contacts">
          David Drewfs:<br />
          <a href="https://www.linkedin.com/in/daviddrewfs/">LinkedIn</a><br />
          <a href="mailto:ddrewfs@ttu.edu">Email</a>
        </h2>
        <h2 className="contacts">
          Andrew Marra:<br />
          <a href="https://www.linkedin.com/in/andrew-marra-63b485232/">LinkedIn</a><br />
          <a href="mailto:amarra@ttu.edu">Email</a>
        </h2>
        <h2 className="contacts">
          Bhumik Bhakta:<br />
          <a href="https://www.linkedin.com/in/bhumikbhakta/">LinkedIn</a><br />
          <a href="mailto:bhumbhak@ttu.edu">Email</a>
        </h2>
      </div>

      {/* Logos */}
      <div className="fade-in">
        <img className="contactlogo" src="images/linkedin.png" alt="LinkedIn Logo" />
        <img className="emaillogo" src="images/email.png" alt="Email Icon" />
      </div>
    </div>
  );
};

export default LinksPage;
