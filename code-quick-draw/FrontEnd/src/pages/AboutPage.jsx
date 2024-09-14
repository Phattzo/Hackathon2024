import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import './Style.css';
import { Header } from '../components/Header';

const AboutPage = () => {
  return (
    <div className="AboutGround">
      <div className="fade-in">
        <Header />
      </div>

      <div className="heading">
        <div className="fade-in">
          <h1>Meet the Team</h1>
        </div>
      </div>

      <div className="TheBoys">
        <div className="fade-in">
          <img src="images/thaBoys.jpg" alt="The Boys" />
        </div>
      </div>

      <div className="heading">
        <div className="fade-in">
          <h3>
            Our team is comprised of computer science students who enjoy
            pushing themselves to develop coding skills. The Idea of NutriSync
            emerged as a way for our collective ambition to explore and excel in
            diverse areas of computer science. Through this project, we have
            embraced challenges that span a wide spectrum of technological
            competencies and have grown as problem solvers and innovators.
          </h3>
        </div>
      </div>

      <div className="Tech">
        <div className="fade-in">
          <img src="images/TexasTech.png" alt="Go Red Raiders!" />
        </div>
      </div>

      <div className="Whitacre">
        <div className="fade-in">
          <img
            src="images/Whitacare.png"
            alt="Whitacre Jr. College of Engineering"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
