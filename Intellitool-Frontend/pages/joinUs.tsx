import React, { useState } from "react";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";
import { textLinearGradientClassName } from "@/styles/styles";

export default function JoinUs() {
  const [type, setType] = useState("signIn");
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className="App joinbody">
      <h1 className={`${textLinearGradientClassName} font-bold text-3xl mb-2`}>Sign in/up Form</h1>
      
      <div className={containerClass} id="container">
        <SignUpForm />
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Already Have an Account?</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost "
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              > LogIn
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Excited to join and start your journey with us? click below and create your account</p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                New Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
