import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validate from './Validation/LoginValidate';
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error,setError] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(()=>{
    if (
      error.email === "" &&
      error.password === ""
    ) {
      axios
        .post("http://localhost:8081/login", {
          email: formData.email,
          password: formData.password,
        })
        .then((res) => {
          if(res.data === "Failure") {
            alert("No record existed")
          } else {
            navigate(`/getUserDetails/${res.data[0].id}`);
          }
        })
        .catch((err) => console.log(err));
    }
  },[error, formData.email, formData.password, navigate])

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = Validate(formData);
  setError(validationErrors);
    
  };

  return (
    <div  className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
      <label>Email:</label>
        <input
          type="text"
          name="email"
          placeholder="Username or Email"
          value={formData.email}
          onChange={handleChange}
        /><br/>
        {error.email && <span style={{color:"red"}}>{error.email}</span>}
        </div>
        <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          /><br/>
          {error.password && <span style={{color:"red"}}>{error.password}</span>}
        </div>
        <button type="submit">Login</button>
      </form>
      <p>{formData.email}</p>
      <p>{formData.password}</p>
      <p>If you have not signed up yet ? <Link to="/signup">Sign Up</Link> </p>
    </div>
  );
};

export default Login;
