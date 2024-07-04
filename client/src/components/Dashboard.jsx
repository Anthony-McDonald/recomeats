import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import "../css/dashboard.css"
import SidebarElement from './SidebarElement';
import SidebarSeperator from './SidebarSeperator';
import Profile from './Profile';
import Recipes from './Recipes';
import Help from './Help';
import Dropdown from './Dropdown';
import Privacy from './Privacy';


const Dashboard = ({ setAuth, userCuisines, getCuisines }) => {
  const [name, setName] = useState("basename");
  const [selectedElement, setSelectedElement] = useState("profile");
  const [showDropdown, setShowDropdown] = useState(false);

  const mainChange = (e) => {
    console.log("dropdown is setting the shown page to ", e)
    setSelectedElement(e);
    setShowDropdown(false);
  }

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  }

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  }

  useEffect(() => {
    getName();
  }, []); 

  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/users/dashboard/", {
        method: "POST",
        headers: { token: localStorage.getItem("token") }
      });

      const parseRes = await response.json();


      setName(parseRes.user_name);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div className="dash-holder">
      <div className="dash-sidebar"> 
      <div className="logo-holder">
        <img className="reco-logo"src="/images/recomeats.png" alt="reco-logo" />
      </div>
      <div className="main-sidebar">
        <div className="top-elements">
        <SidebarElement svgImage={"profile"} text={"My Profile"} onClick={() => mainChange("profile")}/>
        <SidebarElement svgImage={"recipes"} text={"My Recipes"} onClick={() => mainChange("recipes")}/>
        </div>
        <div className="bottom-elements">
        <SidebarSeperator/>
        <SidebarElement svgImage={"help"} text={"FAQ / Help"} onClick={() => mainChange("help")}/>
        <SidebarElement svgImage={"help"} text={"Privacy Policy"} onClick={() => mainChange("privacy")}/>
        </div>

      </div>  
       </div>
      <div className="dash-mainarea">  
      <div className="dash-main-top">
      <button className='btn btn-primary dropdown-btn' onClick={handleDropdown}>
      <img className='show-more-svg' src={"/images/svgs/show-more.svg"} alt="Show dropdown" />
    </button>
      <h1 className='welcome-msg'>Welcome, {name}</h1>
      <button className="dash-logout btn btn-danger" onClick={logout}>Log out</button>
      </div>
      <div className="dash-main-bottom">
          {showDropdown && <Dropdown mainChange={mainChange} />}
          {!showDropdown && selectedElement === "profile" && <Profile userCuisines={userCuisines} getCuisines={getCuisines} />}
          {!showDropdown && selectedElement === "recipes" && <Recipes/>}
          {!showDropdown && selectedElement === "help" && <Help />}
          {!showDropdown && selectedElement === "privacy" && <Privacy />}
      </div>
      </div>

    </div>
  );
};



export default Dashboard;
