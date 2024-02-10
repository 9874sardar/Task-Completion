import axios from 'axios';
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ValidateSignup from './Validation/SignupValidate';

const Update = () => {
    const data = useParams()
    console.log("id ",data.id);
    const [formData, setFormData] = useState({
        username: "",
        phone: "",
        dob: "",
        age: "",
      });
      const [error, setError] = useState([]);
    
      const navigate = useNavigate();
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      console.log()
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(ValidateSignup(formData));
        try {
          await axios.put(`http://localhost:8081/update/${data.id}`,{
                username: formData.username,
                age: formData.age,
                contact: formData.phone,
                dob: formData.dob,
          });
          navigate(`/home/${data.id}`);
        } catch (err) {
          console.log(err);
          setError(true);
        }
      };

  return (
    <div>
      <h2>Update Your Details</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <br />
        {error.username && (
          <span style={{ color: "red" }}>{error.username}</span>
        )}
        <br />
        <input
          type="number"
          name="phone"
          placeholder="contact number"
          value={formData.phone}
          onChange={handleChange}
        />
        <br />
        {error.phone && <span style={{ color: "red" }}>{error.phone}</span>}
        <br />
        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          value={formData.dob}
          onChange={handleChange}
        />
        <br />
        {error.dob && <span style={{ color: "red" }}>{error.dob}</span>}
        <br />
        <input
          type="number"
          name="age"
          placeholder="Enter your Age"
          value={formData.age}
          onChange={handleChange}
        />
        <br />
        {error.age && <span style={{ color: "red" }}>{error.age}</span>}
        <br />
        <button type="submit">Update Details</button>
      </form>
      <p>{formData.age}</p>
      <p>{formData.username}</p>
      <p>{formData.dob}</p>
      <p>{formData.email}</p>
      <p>{formData.password}</p>
      <p>{formData.phone}</p>
    </div>
  )
}

export default Update
