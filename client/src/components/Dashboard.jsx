import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import "../css/dashboard.css"
import SidebarElement from './SidebarElement';
import SidebarSeperator from './SidebarSeperator';
import Profile from './Profile';
import Cuisines from './Cuisines';
import Recipes from './Recipes';
import Help from './Help';


const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("basename");
  const [selectedElement, setSelectedElement] = useState("profile");

  const mainChange = (e) => {
    console.log(e);
    setSelectedElement(e);
  }

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  }

  useEffect(() => {
    getName();
  }, []); 

  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "POST",
        headers: { token: localStorage.getItem("token") }
      });

      const parseRes = await response.json();

      console.log(parseRes);

      setName(parseRes.user_name);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div className="dash-holder">
      <div className="dash-sidebar"> 
      <div className="logo-holder">
        <img className="reco-logo"src="/public/images/recomeats.png" alt="reco-logo" />
      </div>
      <div className="main-sidebar">
        <div className="top-elements">
        <SidebarElement svgImage={"profile"} text={"My Profile"} onClick={() => mainChange("profile")}/>
        <SidebarElement svgImage={"recipes"} text={"My Recipes"} onClick={() => mainChange("recipes")}/>
        </div>
        <div className="bottom-elements">
        <SidebarSeperator/>
        <SidebarElement svgImage={"help"} text={"FAQ / Help"} onClick={() => mainChange("help")}/>
        </div>

      </div>
       </div>
      <div className="dash-mainarea">  
      <div className="dash-main-top">
      <h1 className='welcome-msg'>Welcome, {name}</h1>
      <button className="dash-logout btn btn-danger" onClick={logout}>Log out</button>
      </div>
      <div className="dash-main-bottom">
      {selectedElement === "profile" && <Profile/>}
          {selectedElement === "cuisines" && <Cuisines/>}
          {selectedElement === "recipes" && <Recipes/>}
          {selectedElement === "help" && <Help />}
      </div>
      </div>

    </div>
  );
};



export default Dashboard;
