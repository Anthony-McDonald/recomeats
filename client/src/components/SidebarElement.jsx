import '../css/sidebar-element.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 

// No comments here, self explanatory. Shows an svg image and text next to it
const SidebarElement = ({svgImage, text, onClick}) => {
  const imageSrc = "/images/svgs/" + svgImage + ".svg";
  
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
