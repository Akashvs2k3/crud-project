import React from 'react';
import { auth, provider } from "../config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate,Navigate } from 'react-router-dom';
import { useGetUserInfo } from '../Hooks/useGetUserInfo'
import sub from './img/sub.png'
import main  from "./img/main.png";
import './index.css'

function Index() {

    const navigate =useNavigate();
    const {isAuth} =useGetUserInfo

  const login = async () => {
    try {
      const results = await signInWithPopup(auth, provider);
      const authInfo = {
        userId: results.user.uid,
        name: results.user.displayName,
        profilePhoto: results.user.photoURL,
        isAuth: true,
      };
      localStorage.setItem("auth", JSON.stringify(authInfo));
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
    navigate("/expense-tracker")
  };
if (isAuth) {
  return <Navigate to="/expense-tracker"/>
}

  return (
    <div className="main-div">
      <img src={sub} alt="" className='img'/>
      <div className="sub">
       
      <div className="login">
       <div className='a'>
        <h5><b>Sign in With Google</b></h5>
        <button className="login-btn" onClick={login}>Sign in</button>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Index;
