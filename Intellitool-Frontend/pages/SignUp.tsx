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
    alert(
      `You are signing up with email: ${email} and role: ${role}`
    );

    for (const key in state) {
      setState({
        ...state,
        [key]: ""
      });
    }
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

// export default SignUpForm;
// import React from "react";
// import { bgLinearGradientClassName } from '@/styles/styles';
// function SignUpForm() {
//   const [state, setState] = React.useState({
//     name: "",
//     email: "",
//     password: ""
//   });
//   const handleChange = evt => {
//     const value = evt.target.value;
//     setState({
//       ...state,
//       [evt.target.name]: value
//     });
//   };

//   const handleOnSubmit = evt => {
//     evt.preventDefault();

//     const { name, email, password } = state;
//     alert(
//       `You are sign up with name: ${name} email: ${email} and password: ${password}`
//     );

//     for (const key in state) {
//       setState({
//         ...state,
//         [key]: ""
//       });
//     }
//   };

//   return (
//     <div className="form-container sign-up-container">
//       <form onSubmit={handleOnSubmit}>
//         <h1>Create Account</h1>
//         <input
//           type="text"
//           name="name"
//           value={state.name}
//           onChange={handleChange}
//           placeholder="Name"
//         />
//         <input
//           type="email"
//           name="email"
//           value={state.email}
//           onChange={handleChange}
//           placeholder="Email"
//         />
//         <input
//           type="password"
//           name="password"
//           value={state.password}
//           onChange={handleChange}
//           placeholder="Password"
//         />
//         <button className={`w-max px-3 py-2 text-white font-bold ${bgLinearGradientClassName}`}>Sign Up</button>
//       </form>
//     </div>
//   );
// }

export default SignUpForm;
