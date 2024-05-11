import React, { useState } from "react";
import { bgLinearGradientClassName } from '@/styles/styles';
import { useRouter } from 'next/router';
import { setSession } from "./session";

function SignInForm() {
  const router = useRouter();
  const [state, setState] = useState({
    email: "",
    password: "",
    role: "",
    uid:""
  });
  const [error, setError] = useState("");

  const handleChange = evt => {
    const { name, value } = evt.target;
    setState({
      ...state,
      [name]: value
    });
  };

  // const handleOnSubmit = async evt => {
  //   evt.preventDefault();
  
  //   const { email, password, role, uid } = state;
  
  //   try {
  //     const response = await fetch("http://localhost:8000/intellitool/users");
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch users");
  //     }
  //     const users = await response.json();
  
  //     let userFound = false;
  //     users.forEach(user => {
  //       if (user.username === email && user.password === password && user.role === role) {
  //         setSession(true, email, role, user.id);
  //         router.push("/");
  //         userFound = true;
  //       }
  //     });
  
  //     if (!userFound) {
  //       setError("Incorrect email, password, or role");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     setError("An error occurred while signing in");
  //   }
  // };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
  
    const { email, password, role, uid } = state;
  
    try {
      // Fetch users
      const response = await fetch("http://localhost:8000/intellitool/users");
      console.log("response")
        console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const users = await response.json();
  
      // Check if the user exists in the users list
      const user = users.find((user) => user.username === email && user.password === password && user.role === role);
  
      console.log(user.role);
      if (user.role === "admin"){
        setSession(true, email, role, user.id);
          router.push("/");

      }
      else if (user.role=== "student" || user.role==="teacher") {
        // Fetch students or professors based on the role
        const roleEndpoint = role === "student" ? "students" : "professors";
        console.log(roleEndpoint);
        const roleResponse = await fetch(`http://localhost:8000/intellitool/${roleEndpoint}`);
        console.log("role")
        console.log(roleResponse);
        if (!roleResponse.ok) {
          throw new Error(`Failed to fetch ${roleEndpoint}`);
        }

        const roleUsers = await roleResponse.json();
  
        // Check if the user exists in the students or professors list
        const userExists = roleUsers.some((roleUser) => roleUser.name === email);
        console.log("userExists")
        console.log(userExists)
  
        if (userExists) {
          // Authenticate the user and redirect to the home page
          setSession(true, email, role, user.id);
          router.push("/");
        } 
        else {
          setError(`User not approved by Admin`);
        }
      } else {
        setError("Incorrect email, password, or role");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while signing in");
    }
  };
  
  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <input
          required
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          required
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />

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

          <input
            type="radio"
            id="admin"
            name="role"
            value="admin"
            checked={state.role === "admin"}
            onChange={handleChange}
          />
          <label htmlFor="admin">Admin</label>
        </div>

        <button type="submit" className={`w-max px-3 py-2 text-white font-bold ${bgLinearGradientClassName}`}>Sign In</button>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}

export default SignInForm;
