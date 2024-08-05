import { useState, useEffect } from 'react';
import '../css/profile.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Cuisines from './Cuisines';
import EditInfoModal from './EditInfoModal';
import CookieConsent from "react-cookie-consent";

const Profile = ({userCuisines, getCuisines}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [profileImage, setProfileImage] = useState("")

  // Create variables from state
  const fullName = firstName + " " + lastName;
  const fullProfileUrl = "./images/profile-images/" + profileImage + ".png"


  useEffect(() => {
    getUserInfo()
  }, []);

  // Path to get user's information
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

  // path to update user's profile with new information
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
      {/* Show cookie consent box if cookies have not been accepted before*/}
            <CookieConsent
        enableDeclineButton
        onDecline={() => {
          console.log("Cookies declined");
        }}
          buttonText="I accept to your use of cookies"
          cookieName="CookieConsent"
          style={{ background: "#93785B" }}
          buttonStyle={{ background: "#865D36", fontSize: "13px" , color: "#ffffff", borderRadius: "1rem"}}
          declineButtonStyle={{ background: "#3E362E", fontSize: "13px" , color: "#ffffff", borderRadius: "1rem"}}
          expires={150}
      >
  This website uses cookies to enhance the user experience.{" "}
  <span style={{ fontSize: "10px" }}>By clicking accept, you agree to our use of cookies. If you are interested in how we use this data, click on the Privacy Policy section of the webpage</span>
      </CookieConsent>
  <div className="profile-info">
    <img className='prof-img' src={fullProfileUrl} alt="prof-img" />
    <h3 className="mb-4">{fullName}</h3>
    <h5 className="text-muted">Date of Birth: {dateOfBirth}</h5>
  </div>

        {/* Show cuisines selected */}
        <div className="info-bottom">
        <Cuisines userCuisines={userCuisines} getCuisines={getCuisines}/>
        </div>
        {/* Modal to change user information */}
        <EditInfoModal updateUserProfileInfo={updateUserProfileInfo} firstNameResult={firstName} lastNameResult={lastName} profileImageResult={profileImage}/>

    </div>
  );
};

export default Profile;
