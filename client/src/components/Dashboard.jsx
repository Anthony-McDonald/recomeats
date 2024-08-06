import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/dashboard.css"
import SidebarElement from './SidebarElement';
import SidebarSeperator from './SidebarSeperator';
import Profile from './Profile';
import Recipes from './Recipes';
import Help from './Help';
import Dropdown from './Dropdown';
import Privacy from './Privacy';
import DeleteAccount from './DeleteAccount';
import NotificationsModal from './NotificationsModal';


const Dashboard = ({ setAuth, userCuisines, getCuisines }) => {
  const navigate = useNavigate();
  // States
  const [name, setName] = useState("basename");
  const [selectedElement, setSelectedElement] = useState("profile");
  const [showDropdown, setShowDropdown] = useState(false);

  // Currently shown element in main area
  const mainChange = (e) => {
    setSelectedElement(e);
    setShowDropdown(false);
  }

  // Logout functionality
  const logout = (e) => {
    if (e) e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
}

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  }

  // Get user's name on page load
  useEffect(() => {
    getName();
  }, []); 

  // Path to retrieve username
  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/users/dashboard/", {
        method: "GET",
        headers: { token: localStorage.getItem("token") }
      });

      const parseRes = await response.json();


      setName(parseRes.user_name);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function goTo(here) {
    navigate(here);
  }

  return (
    <div className="dash-holder">
      <div className="dash-sidebar"> 
      <div className="logo-holder">
        <img className="reco-logo"src="/images/recomeats.png" alt="reco-logo" />
      </div>
      <div className="main-sidebar">
        {/* Various sidebar elements that will change what component is shown in the main area on click */}
        <div className="top-elements">
        <SidebarElement svgImage={"profile"} text={"My Profile"} onClick={() => mainChange("profile")}/>
        <SidebarElement svgImage={"recipes"} text={"My Recipes"} onClick={() => mainChange("recipes")}/>
        <SidebarElement svgImage={"forum"} text={"Forum"} onClick={() => goTo("/forum")}/>
        </div>
        <div className="bottom-elements">
        <SidebarSeperator/>
        <SidebarElement svgImage={"help"} text={"FAQ / Help"} onClick={() => mainChange("help")}/>
        <SidebarElement svgImage={"privacy"} text={"Privacy Policy"} onClick={() => mainChange("privacy")}/>
        <SidebarElement svgImage={"user-delete"} text={"Delete Account"} onClick={() => mainChange("deleteaccount")}/>
        </div>

      </div>  
       </div>
      <div className="dash-mainarea">  
      <div className="dash-main-top">
      <button className='btn btn-primary dropdown-btn' onClick={handleDropdown}>
      <img className='show-more-svg' src={"/images/svgs/show-more.svg"} alt="Show dropdown" />
    </button>
      <h1 className='welcome-msg'>Welcome, {name}</h1>
      <NotificationsModal/>
      <button className="dash-logout btn btn-danger" onClick={logout}>Log out</button>
      </div>
      <div className="dash-main-bottom">
      {/* Various dropdown elements that will change what component is shown in the main area on click*/}
          {showDropdown && <Dropdown mainChange={mainChange} />}
          {!showDropdown && selectedElement === "profile" && <Profile userCuisines={userCuisines} getCuisines={getCuisines} />}
          {!showDropdown && selectedElement === "recipes" && <Recipes/>}
          {!showDropdown && selectedElement === "help" && <Help />}
          {!showDropdown && selectedElement === "privacy" && <Privacy />}
          {!showDropdown && selectedElement === "deleteaccount" && <DeleteAccount logout={logout}/>}
      </div>
      </div>

    </div>
  );
};





export default Dashboard;
