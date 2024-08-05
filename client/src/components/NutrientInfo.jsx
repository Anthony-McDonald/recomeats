import { useState, useEffect } from 'react';
import '../css/nutrient-info.css';

const NutrientInfo = ({ rec_id }) => {
  const [nutriInfo, setNutriInfo] = useState(null);

  useEffect(() => {
    if (rec_id) {
      fetchNutriInfo(rec_id);
    }
  }, [rec_id]);

  // Fetches all nutrients for rec_id
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

  // Renders for each nutrient
  const renderNutrientBars = () => {
    if (!nutriInfo) return null;

    // Iterate through nutriInfo and return all that....
    return Object.entries(nutriInfo)
    // Filter out entries where the nutrient value is equal to 0
    .filter(([_, value]) => value !== 0) 
    // Map over all that are not = 0, and show them to the user
    .map(([key, value]) => (
        <div key={key} className="nutrient-bar">
            {/* Display the nutrient name */}
            <div className="nutrient-label">
                {/* 
                    Replace all instances of _loog with nothing and replace all underscores with spaces
                */}
                {key.replace(/_100g/g, '').replace(/_/g, ' ')}:
            </div>
            <div className="bar-container">
                {/* Display nutrient value as a bar, as a percentage of 100*/}
                <div
                    className="bar"
                    style={{ width: `${Math.min(value, 100)}%` }}
                ></div>
                {/* Display the numerical value to 2dp */}
                <div className="bar-value">{value.toFixed(2)}</div>
            </div>
        </div>
    ));

  };

  return (
    <div className="nutrient-info">
      <h3 className="nutrient-heading">Nutrient Information per 100g</h3>
      {renderNutrientBars()}
    </div>
  );
};

export default NutrientInfo;
