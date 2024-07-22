import { useState, useEffect } from 'react';
import '../css/profile.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Cuisines from './Cuisines';

const Profile = ({userCuisines, getCuisines}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [profileImage, setProfileImage] = useState("")
  const fullName = firstName + " " + lastName;
  const fullProfileUrl = "./images/profile-images/" + profileImage + ".png"


  useEffect(() => {
    getUserInfo()
  }, []);

  async function getUserInfo() {
    try {
      const response = await fetch("http://localhost:5000/users/getuser/profile", {
        method: "GET",
        headers: { token: localStorage.getItem("token") }
      });

      const parseRes = await response.json();


      setFirstName(parseRes.first_name);
      setLastName(parseRes.last_name);
      setDateOfBirth(parseRes.date_of_birth);
      setProfileImage(parseRes.profile_image)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  

  return (
    <div id="profile">
  <div className="profile-info">
    <img className='prof-img' src={fullProfileUrl} alt="prof-img" />
    <h3 className="mb-4">{fullName}</h3>
    <h5 className="text-muted">Date of Birth: {dateOfBirth}</h5>
  </div>

        <div className="info-bottom">
        <Cuisines userCuisines={userCuisines} getCuisines={getCuisines}/>
        </div>
    </div>


  );
};

export default Profile;
