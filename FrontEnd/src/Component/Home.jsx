import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import './Home.css';

const Home = () => {
  const data = useParams();

  const [user, setUser] = useState({
    username:"",
    email:"",
    contact:"",
    age:""
  });


  useEffect(() => {
    const callDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/home/${data.id}/`);
        setUser(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    }
    callDetails();
  }, []);

  return (
    <div className="home-container">
      <div className="user-info">
      <h1>Welcome, {user.username}!</h1>
      <div className="user-details">
      <p>Email : {user.email}</p>
      <p>Contact : {user.contact}</p>
      <p>DOB : {user.dob}</p>
      <p>Age : {user.age}</p>
      </div>
      </div>
      <Link to={`/update/${user.id}`}>Update Details</Link>{"   |   "}
      <Link to={`/`}>Logout</Link>
    </div>
  )
}

export default Home
