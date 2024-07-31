import SidebarElement from "./SidebarElement";
import SidebarSeperator from "./SidebarSeperator";
import "../css/dropdown.css"


const Dropdown = ({ mainChange }) => {

    const pathTo = (path) => {
        window.location = path
    };

    return (
        <div className="dropdown-div">
        <div className="dropdown-top-elements">
            <button className="btn btn-primary dropdown-btn"> <SidebarElement svgImage={"profile"} text={"My Profile"} onClick={() => mainChange("profile")}/></button>
       
       <button className="btn btn-primary dropdown-btn">        <SidebarElement svgImage={"recipes"} text={"My Recipes"} onClick={() => mainChange("recipes")}/></button>
        </div>
        <div className="bottom-elements">
        <SidebarSeperator/>
        <button className="btn btn-primary dropdown-btn">
        <SidebarElement svgImage={"forum"} text={"Forum"} onClick={() => pathTo("forum")}/>
        </button>
        <SidebarSeperator/>
        <button className="btn btn-primary dropdown-btn">
        <SidebarElement svgImage={"help"} text={"FAQ / Help"} onClick={() => mainChange("help")}/>
        </button>
        <button className="btn btn-primary dropdown-btn">        
        <SidebarElement svgImage={"help"} text={"Privacy Policy"} onClick={() => mainChange("privacy")}/>
        </button>
        <button className="btn btn-primary dropdown-btn">
        <SidebarElement svgImage={"user-delete"} text={"Delete Account"} onClick={() => mainChange("deleteaccount")}/>
        </button>

        </div>
        </div>
    )
}

export default Dropdown;