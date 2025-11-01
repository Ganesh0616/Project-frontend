// src/components/common/GetStarted.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Getstyles from "../../Styles/getstart.module.css";
import heroImg from "../../assets/2.jpeg";

const GetStarted = () => {
  const navigate = useNavigate();
  return (
    <div className={Getstyles.bg}>
      <div className={Getstyles.container}>
        <div className={Getstyles.left}>
          <h1>
            Welcome To <span className={Getstyles.highlight}>PowerHouse</span> FitHub 🏋🏽🔥💪🏼
          </h1>
          <p className={Getstyles.subTitle}>Unlock your fitness potential!</p>
          <ul className={Getstyles.features}>
            <li>🏋️ High-quality gym equipment</li>
            <li>🥗 Expert nutrition plans</li>
            <li>💪 Supplements for muscle growth</li>
            <li>📈 Track your progress effortlessly</li>
          </ul>
          <button className={Getstyles.button} onClick={() => navigate("/login")}>
            Get Started
          </button>
        </div>
        <div className={Getstyles.right}>
          <img src={heroImg} alt="Fitness Hero" className={Getstyles.heroImage} />
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
