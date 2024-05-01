import { useState, useEffect } from 'react';
import '../css/profile.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Cuisines from './Cuisines';

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const fullName = firstName + " " + lastName;


  useEffect(() => {
    getUserInfo()
  }, []);

  async function getUserInfo() {
    try {
      const response = await fetch("http://localhost:5000/getuser/profile", {
        method: "GET",
        headers: { token: localStorage.getItem("token") }
      });

      const parseRes = await response.json();


      setFirstName(parseRes.first_name);
      setLastName(parseRes.last_name);
      setDateOfBirth(parseRes.date_of_birth);
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  

  return (
    <div id="profile">
        <div className="profile-info">
          <h3>{fullName}</h3>
          <h5>date of birth: {dateOfBirth}</h5>
        </div>
        <div className="info-bottom">
        <Cuisines/>
        </div>
    </div>


  );
};

export default Profile;
