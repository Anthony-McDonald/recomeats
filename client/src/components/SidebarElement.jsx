import React from 'react';
import '../css/sidebar-element.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 

const SidebarElement = ({svgImage, text, onClick}) => {

  const imageSrc = "/public/images/svgs/" + svgImage + ".svg";
  

    console.log(imageSrc);
  return (
    <div id="sidebar-element" onClick={onClick}>
        <div className="side-el-left">
            <img className="sidebar-svg" src={imageSrc} alt="svgImage" />
        </div>
        <div className="side-el-right">
            {text}
        </div>
    </div>
  );
};

export default SidebarElement;
