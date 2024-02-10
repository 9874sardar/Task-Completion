import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ValidateSignup from "./Validation/SignupValidate";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
    age: "",
    password: "",
  });
  const [error, setError] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'dob') {
      const dateValue = new Date(e.target.value);
      const formattedDate = dateValue.toISOString().split('T')[0];
      setFormData({ ...formData, [e.target.name]: formattedDate });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    // setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (
      error.username === "" &&
      error.email === "" &&
      error.phone === "" &&
      error.dob === "" &&
      error.age === "" &&
      error.password === ""
    ) {
      axios
        .post("http://localhost:8081/signup", {
          username: formData.username,
          age: formData.age,
          contact: formData.phone,
          dob: formData.dob,
          email: formData.email,
          password: formData.password,
        })
        .then((res) => {
          console.log(res);
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  }, [error, formData, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(ValidateSignup(formData));
    console.log("form data", formData);
  };

  return (
    <div className="login-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            //   required
          />
          <br />
          {error.username && (
            <span style={{ color: "red" }}>{error.username}</span>
          )}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            //   required
          />
          <br />
          {error.email && <span style={{ color: "red" }}>{error.email}</span>}
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="number"
            name="phone"
            placeholder="contact number"
            value={formData.phone}
            onChange={handleChange}
          />
          <br />
          {error.phone && <span style={{ color: "red" }}>{error.phone}</span>}
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <div className="dob-container">
            <input
              type="date"
              name="dob"
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleChange}
            />
            <br />
            {error.dob && <span style={{ color: "red" }}>{error.dob}</span>}
          </div>
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            placeholder="Enter your Age"
            value={formData.age}
            onChange={handleChange}
            //   required
          />
          <br />
          {error.age && <span style={{ color: "red" }}>{error.age}</span>}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            //   required
          />
          <br />
          {error.password && (
            <span style={{ color: "red" }}>{error.password}</span>
          )}
        </div>
        <button type="submit">Signup</button>
      </form>
      <p>{formData.age}</p>
      <p>{formData.username}</p>
      <p>{formData.dob}</p>
      <p>{formData.email}</p>
      <p>{formData.password}</p>
      <p>{formData.phone}</p>
      <p>
        Are you a Registered user ? <Link to="/">Sign In</Link>
      </p>
    </div>
  );
};

export default Signup;
