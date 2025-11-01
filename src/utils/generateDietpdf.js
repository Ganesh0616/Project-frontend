import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Meals structured by Goal → Region
const mealPlans = {
  "Weight Loss": {
    North: [
      { time: "Early AM", veg: "Warm water + Lemon", nonVeg: "Warm water + Lemon" },
      { time: "Breakfast", veg: "Poha / Upma", nonVeg: "Boiled Eggs + Toast" },
      { time: "Mid-Morning", veg: "Fruits", nonVeg: "Fruits" },
      { time: "Lunch", veg: "Chapati + Sabzi + Dal", nonVeg: "Chapati + Grilled Chicken" },
      { time: "Snack", veg: "Green Tea + Nuts", nonVeg: "Protein Shake" },
      { time: "Dinner", veg: "Soup + Veg", nonVeg: "Grilled Fish + Veg" },
    ],
    South: [
      { time: "Early AM", veg: "Warm water + Lemon", nonVeg: "Warm water + Lemon" },
      { time: "Breakfast", veg: "Idli / Upma", nonVeg: "Boiled Eggs + Dosa" },
      { time: "Mid-Morning", veg: "Fruits", nonVeg: "Fruits" },
      { time: "Lunch", veg: "Rice + Sambar + Veg", nonVeg: "Rice + Chicken + Veg" },
      { time: "Snack", veg: "Buttermilk + Nuts", nonVeg: "Protein Shake" },
      { time: "Dinner", veg: "Vegetable Stew + Rice", nonVeg: "Fish Curry + Rice" },
    ],
  },
  Maintenance: {
    North: [
      { time: "Early AM", veg: "Warm water + Lemon", nonVeg: "Warm water + Lemon" },
      { time: "Breakfast", veg: "Upma / Idli", nonVeg: "2 Eggs + Toast" },
      { time: "Mid-Morning", veg: "Fruits + Nuts", nonVeg: "Fruits + Nuts" },
      { time: "Lunch", veg: "Chapati + Sabzi + Dal", nonVeg: "Chapati + Chicken + Veg" },
      { time: "Snack", veg: "Sprouts / Smoothie", nonVeg: "Smoothie / Egg" },
      { time: "Dinner", veg: "Rice + Veg + Dal", nonVeg: "Rice + Fish / Chicken + Veg" },
    ],
    South: [
      { time: "Early AM", veg: "Warm water + Lemon", nonVeg: "Warm water + Lemon" },
      { time: "Breakfast", veg: "Idli / Dosa", nonVeg: "2 Eggs + Dosa" },
      { time: "Mid-Morning", veg: "Fruits + Nuts", nonVeg: "Fruits + Nuts" },
      { time: "Lunch", veg: "Rice + Sambar + Veg", nonVeg: "Rice + Chicken + Veg" },
      { time: "Snack", veg: "Buttermilk + Sprouts", nonVeg: "Smoothie / Egg" },
      { time: "Dinner", veg: "Vegetable Stew + Rice", nonVeg: "Fish Curry + Rice" },
    ],
  },
  "Muscle Gain": {
    North: [
      { time: "Early AM", veg: "Milk + Banana", nonVeg: "Milk + Eggs" },
      { time: "Breakfast", veg: "Oats + Nuts", nonVeg: "Oats + Eggs + Toast" },
      { time: "Mid-Morning", veg: "Protein Shake", nonVeg: "Protein Shake + Nuts" },
      { time: "Lunch", veg: "Rice + Dal + Paneer", nonVeg: "Rice + Chicken + Veg" },
      { time: "Snack", veg: "Greek Yogurt + Fruits", nonVeg: "Greek Yogurt + Boiled Eggs" },
      { time: "Dinner", veg: "Chapati + Sabzi + Paneer", nonVeg: "Chapati + Fish / Chicken + Veg" },
    ],
    South: [
      { time: "Early AM", veg: "Milk + Banana", nonVeg: "Milk + Eggs" },
      { time: "Breakfast", veg: "Rava Upma / Dosa", nonVeg: "Eggs + Dosa" },
      { time: "Mid-Morning", veg: "Protein Shake", nonVeg: "Protein Shake + Nuts" },
      { time: "Lunch", veg: "Rice + Sambar + Paneer", nonVeg: "Rice + Chicken + Veg" },
      { time: "Snack", veg: "Greek Yogurt + Fruits", nonVeg: "Greek Yogurt + Boiled Eggs" },
      { time: "Dinner", veg: "Vegetable Stew + Rice + Paneer", nonVeg: "Fish Curry + Rice" },
    ],
  },
};

export const generateDietPDF = (weightRange, region, goal) => {
  const doc = new jsPDF("p", "mm", "a4");

  doc.setFontSize(22);
  doc.setTextColor(0, 150, 136);
  doc.text("PowerHouse FitHub - Free Diet Chart", 105, 20, { align: "center" });

  doc.setFontSize(14);
  doc.setTextColor(33, 33, 33);
  doc.text(`Weight Range: ${weightRange}`, 14, 35);
  doc.text(`Region: ${region}`, 14, 45);
  doc.text(`Goal: ${goal}`, 14, 55);

  const tableColumns = ["Time", "Vegetarian", "Non-Vegetarian"];
  const tableRows = mealPlans[goal][region].map(item => [item.time, item.veg, item.nonVeg]);

  autoTable(doc, {
    head: [tableColumns],
    body: tableRows,
    startY: 65,
    theme: "grid",
    headStyles: { fillColor: [0, 150, 136], textColor: 255 },
    styles: { fontSize: 12, cellPadding: 4 },
  });

  doc.setFontSize(10);
  doc.text("Stay healthy and fit with PowerHouse FitHub 💪", 105, 285, { align: "center" });

  doc.save(`${region}_${weightRange.replace("–", "_")}_${goal.toLowerCase()}.pdf`);
};
