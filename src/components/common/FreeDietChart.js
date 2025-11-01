// src/components/common/FreeDietChart.js
import React from "react";
import Navigation from "./Header";
import DietStyles from "../../Styles/FreeDiet.module.css";
import { generateDietPDF } from "../../utils/generateDietpdf";

const weightCategories = ["40–50 kg", "50–60 kg", "60–70 kg", "70–80 kg", "80–90 kg", "90–100 kg"];
const regions = ["North", "South"];
const goals = ["Weight Loss", "Maintenance", "Muscle Gain"];

const DietChart = () => {
  return (
    <>
      <Navigation />
      <div className={DietStyles.container}>
        <h1 className={DietStyles.title}>Free Indian Diet Charts 🍱</h1>

        {weightCategories.map((weight, i) => (
          <div key={i} className={DietStyles.chartSection}>
            <h2 className={DietStyles.weightHeader}>{weight}</h2>

            <div className={DietStyles.grid}>
              {regions.map((region) => (
                <div key={region} className={DietStyles.regionColumn}>
                  <h3 className={DietStyles.regionHeader}>{region} Indian</h3>

                  {goals.map((goal) => (
                    <button
                      key={`${weight}-${region}-${goal}`}
                      className={DietStyles.btn}
                      onClick={() => generateDietPDF(weight, region, goal)}
                    >
                      {goal} 📥
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DietChart;
