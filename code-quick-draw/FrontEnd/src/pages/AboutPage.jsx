import React from 'react';
import './Style.css';
import { Header } from '../components/Header';

const AboutPage = () => {
  return (
    <div className="AboutGround">
      <div className="fade-in">
        <Header />
      

  {/* Main Page Heading */}
  <div className="heading">
          <h1>Meet the Team</h1>
        </div>

        {/* Picture of Us */}
        <div className="TheBoys">
          <img src="images/thaBoys.jpg" alt="The Boys" />
        </div>

        {/* Our Description */}
        <div className="heading">
          <h3>
            Our team is comprised of computer science students who enjoy pushing themselves to develop coding skills. 
            The Idea of Code QuickDraw emerged as a way for our collective ambition to explore and excel in diverse areas of 
            computer science. Through this project, we have embraced challenges that span a wide spectrum of technological 
            competencies and have grown as problem solvers and innovators.
          </h3>
        </div>

        {/* Tech Logo */}
        <div className="Tech">
          <img src="images/TexasTech.png" alt="Go Red Raiders!" />
        </div>
        <div className="Whitacre">
          <img src="images/Whitacare.png" alt="Whitacre Jr. College of Engineering" />
        </div>
      </div> 
      </div>
  );
};

export default AboutPage;
