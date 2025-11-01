// components/common/About.js
import React from "react";
import Navigation from "./Header"; // ✅ assuming your Navbar is Header.js
import AboutStyles from "../../Styles/About.module.css";

const About = () => {
  return (
    <>
      <Navigation />
      <div className={AboutStyles.body}>
      <div className={AboutStyles.aboutContainer}>
        <h1>About PowerHouse FitHub 🏋️‍♂️</h1>
        <p>
          Welcome to <strong>PowerHouse FitHub</strong> — your ultimate fitness and wellness destination!  
          Our mission is to help you lead a <strong>healthy, balanced, and powerful lifestyle</strong> through
          high-quality fitness products and expert guidance.
        </p>
        <p>
          At PowerHouse FitHub, we believe fitness is not just a goal — it's a lifestyle.  
          Whether you're a beginner or a professional athlete, we’re here to support your journey
          toward strength, endurance, and wellness.
        </p>
        <p>
          Explore our e-commerce platform to find top-quality gym equipment, nutrition products, and accessories
          carefully chosen to fuel your fitness transformation.
        </p>
        <p className={AboutStyles.highlight}>
          💪 Stay Strong. Stay Focused. Stay Fit — with PowerHouse FitHub!
        </p>
      </div>
      </div>
    </>
  );
};

export default About;
