import { useState, useEffect } from 'react';
import '../css/profile.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Cuisines from './Cuisines';
import EditInfoModal from './EditInfoModal';

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

  async function updateUserProfileInfo(first_name, last_name, profile_image) {
    try {
      const body = {first_name, last_name, profile_image}
      await fetch("http://localhost:5000/users/edituserprofile", {
          method: "PUT",
          headers: { token: localStorage.getItem("token"),"Content-Type": "application/json" },
          body: JSON.stringify(body)
      });
      getUserInfo()


  } catch(err) {
      console.error(err.message);
  }
  }

  

  return (
    <div id="profile">
  <div className="profile-info">
    <img className='prof-img' src={fullProfileUrl} alt="prof-img" />
    <button type='button' className="btn btn-danger btn-sm edit-recipe-button" onClick={() => updateUserProfileInfo(firstName, lastName, 5)}>Update Image</button>
    <h3 className="mb-4">{fullName}</h3>
    <h5 className="text-muted">Date of Birth: {dateOfBirth}</h5>
  </div>

        <div className="info-bottom">
        <Cuisines userCuisines={userCuisines} getCuisines={getCuisines}/>
        </div>
        <EditInfoModal updateUserProfileInfo={updateUserProfileInfo} firstNameResult={firstName} lastNameResult={lastName} profileImageResult={profileImage}/>
    </div>


  );
};

export default Profile;
