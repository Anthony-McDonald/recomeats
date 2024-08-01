import React from 'react';
import { useState, useEffect } from 'react';
import '../css/nutrient-info.css';

const NutrientInfo = ({ rec_id }) => {
  const [nutriInfo, setNutriInfo] = useState(null);

  useEffect(() => {
    if (rec_id) {
      fetchNutriInfo(rec_id);
    }
  }, [rec_id]);

  const fetchNutriInfo = async (rec_id) => {
    try {
      const url = new URL("http://localhost:5000/recog/info/");
      url.searchParams.append("recipe_id", rec_id);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem("token"),
        },
      });

      const parseRes = await response.json();
      setNutriInfo(parseRes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderNutrientBars = () => {
    if (!nutriInfo) return null;

    return Object.entries(nutriInfo)
      .filter(([_, value]) => value !== 0) // Filter out zero values
      .map(([key, value]) => (
        <div key={key} className="nutrient-bar">
          <div className="nutrient-label"> {key.replace(/_100g/g, '').replace(/_/g, ' ')}:</div>
          <div className="bar-container">
            <div
              className="bar"
              style={{ width: `${Math.min(value, 100)}%` }}
            ></div>
            <div className="bar-value">{value.toFixed(2)}</div>
          </div>
        </div>
      ));
  };

  return (
    <div className="nutrient-info">
      <h3>Nutrient Information per 100g</h3>
      {renderNutrientBars()}
    </div>
  );
};

export default NutrientInfo;
