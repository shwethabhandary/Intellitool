import React from "react";
import { bgLinearGradientClassName } from '@/styles/styles';

function SignUpForm() {
  const [state, setState] = React.useState({
    email: "",
    password: "",
    role: "" // New state for role
  });

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = evt => {
    evt.preventDefault();

    const { email, password, role } = state;
    const randomId = Math.floor(Math.random() * 10000); // Generate random ID
    const userData = {
      role,
      username: email,
      id: randomId,
      password
    };

    fetch('http://localhost:8000/intellitool/addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Handle success response
      alert(`User added successfully with ID: ${data.id}`);
      
      // Clear form fields
      setState({
        email: "",
        password: "",
        role: ""
      });
    })
    .catch(error => {
      // Handle fetch error
      console.error('Fetch Error:', error);
      alert('An error occurred while adding user.');
    });
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>

        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />

        {/* Radio buttons for selecting role */}
        <div className="role-selection">
          <input
            type="radio"
            id="student"
            name="role"
            value="student"
            checked={state.role === "student"}
            onChange={handleChange}
          />
          <label htmlFor="student">Student</label>

          <input
            type="radio"
            id="teacher"
            name="role"
            value="teacher"
            checked={state.role === "teacher"}
            onChange={handleChange}
          />
          <label htmlFor="teacher">Teacher</label>
        </div>

        <button className={`w-max px-3 py-2 text-white font-bold ${bgLinearGradientClassName}`}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
