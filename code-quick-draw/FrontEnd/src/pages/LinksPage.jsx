import React from 'react';
import './Style.css';
import { Header } from '../components/Header';

const LinksPage = () => {
  return (
    <div className="fade-in">
      <Header />

       {/* Page Header */}
       <div className="heading">
        <h1>Contact Us</h1>
      </div>

      {/* Contact Links */}
      <div className="contacts">
        <h2 className="contact-name">Jacob Bailey:</h2>
        <a className="contact-link" href="https://www.linkedin.com/in/jacob-c-bailey/">LinkedIn</a><br />
        <a className="contact-link" href="mailto:bai10224@ttu.edu">Email</a>

        <h2 className="contact-name">David Drewfs:</h2>
        <a className="contact-link" href="https://www.linkedin.com/in/daviddrewfs/">LinkedIn</a><br />
        <a className="contact-link" href="mailto:ddrewfs@ttu.edu">Email</a>

        <h2 className="contact-name">Andrew Marra:</h2>
        <a className="contact-link" href="https://www.linkedin.com/in/andrew-marra-63b485232/">LinkedIn</a><br />
        <a className="contact-link" href="mailto:amarra@ttu.edu">Email</a>

        <h2 className="contact-name">Bhumik Bhakta:</h2>
        <a className="contact-link" href="https://www.linkedin.com/in/bhumikbhakta/">LinkedIn</a><br />
        <a className="contact-link" href="mailto:bhumbhak@ttu.edu">Email</a>
      </div>

      {/* Logos */}
      <img className="contactlogo" src="images/linkedin.png" alt="LinkedIn Logo" />
      <img className="emaillogo" src="images/email.png" alt="Email Logo" />
    </div>
  );
};

export default LinksPage;
