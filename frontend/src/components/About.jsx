import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import aboutus from "../assets/about.webp";
import ourvision from "../assets/ourvision.webp";

const About = () => {
  return (
    <div className="container-fluid cbg py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 order-lg-1 text-center mb-5">
            <h2 className="display-4 mb-4">About Us</h2>
            <p className="lead mb-4">Welcome to NoteVault, your go-to platform for organizing and managing your notes in the cloud. We're passionate about helping individuals and teams stay productive and organized.</p>
          </div>
          <div className="col-lg-6 order-lg-2">
            <img src={aboutus} style={{ width: '600px', height: '350px' }} className="img-fluid rounded shadow" alt="About Us" />
          </div>
        </div>

        <hr className="my-5" />

        <div className="row align-items-center mb-5">
          <div className="col-lg-6 order-lg-2 text-center">
            <h3>Our Vision</h3>
            <p>Our vision is to revolutionize the way people capture, organize, and share information. We're committed to continuously improving our platform and empowering our users to achieve their full potential.</p>
          </div>
          <div className="col-lg-6 order-lg-1">
            <img src={ourvision} style={{ width: '600px', height: '350px' }} className="img-fluid rounded shadow" alt="Our Vision" />
          </div>
        </div>

        <div className="row mb-2">
          <div className="text-center">
            <h3>Follow Us</h3>
            <ul className="list-unstyled mb-0 mt-3">
              <li className="list-inline-item mx-3"><Link to="https://www.facebook.com/profile.php?id=100061708275015" target="_blank"><i className="fab fa-facebook-f fa-2x"></i></Link></li>
              <li className="list-inline-item mx-3"><Link to="https://twitter.com/himanshudixit63" target="_blank"><i className="fab fa-twitter fa-2x"></i></Link></li>
              <li className="list-inline-item mx-3"><Link to="https://www.instagram.com/d_4_dixit007_himanshurocks/" target="_blank"><i className="fab fa-instagram fa-2x"></i></Link></li>
              <li className="list-inline-item mx-3"><Link to="https://www.linkedin.com/in/himanshu-dixit-88460823a/" target="_blank"><i className="fab fa-linkedin-in fa-2x"></i></Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
