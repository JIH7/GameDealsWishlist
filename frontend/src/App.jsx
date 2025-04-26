import { useState, useEffect, use } from 'react';
import axios from "axios";
import './App.css';

import HomePage from './pages/home/home_page';
import SignupPage from './pages/signup/signup_page';
import LoginPage from './pages/login/login_page';

const App = () => {
  // Checks for session cookie on page load
  const getCookie = () => {
    if (!document.cookie)
      return null;

    if (!document.cookie.includes(" "))
      return null;

    const cookieArr = document.cookie.split(" ");
    const userID = cookieArr.find(el => el.includes("userid"));
    const val = userID.split("=")[1];
    return val;
  }
  // Initialize session based state
  const [cookie, _setCookie] = useState(getCookie());

  // Setter that changes both the actual cookie, and the React state
  const setCookie = (value) => {
    if (value) {
      document.cookie = `userid=${value}; expires=${Date.now() + 24 * 60 * 60 * 1000}`;
      _setCookie(value);
    }
    else { // Delete cookie
      document.cookie = `userid=${value}; expires=${Date.now() - 5000}`;
      _setCookie(null);
    }
  }

  // Check if user is logged in for initial routing
  const checkSession = () => {
    if (cookie) {
      return "homepage";
    }
    else {
      return "login";
    }    
  }

  // State to handle page routes
  const [currentPage, setCurrentPage] = useState(checkSession());
  // Tracks the user's list of games
  const [gameList, setGameList] = useState();
  // Form error text for signup page
  const [signupFormErrors, setSignupFormErrors] = useState([null, null, null, null]);

  // When cookie changes, route to either home or login page
  useEffect(() => setCurrentPage(checkSession()), [cookie])

  // Requests the user's gamelist from the django API
  // ToDo: Give gamelist items FK for user
  const updateList = async () => {
    try {
      let response = await axios.get(`http://localhost:8000/api/games/?userid=${cookie}`);
      let data = await response.data;
      setGameList(data);
    }
    catch (error) {
      console.log(error)
    }
  };

  const loginUser = async (username, password) => {
    const response = await fetch(`http://localhost:8000/api/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "username": username,
        "password": password
      })
    });
    const data = await response.json();
    console.log(data);
    setCookie(data.id);
  }

  const signupUser = async (email, username, password1, password2) => {
    const signupErrorBuffer = [null, null, null, null];
    if (!email)
      signupErrorBuffer[0] = "Field may not be empty";
    if (!username)
      signupErrorBuffer[1] = "Field may not be empty";
    if (!password1)
      signupErrorBuffer[2] = "Field may not be empty";
    if (!password2)
      signupErrorBuffer[3] = "Field may not be empty";

    if (password1 && password1 != password2)
      signupErrorBuffer[2] = "Passwords must match";

    if (!signupErrorBuffer[0]) {
      const response = await axios.get(`http://localhost:8000/api/users/?email=${email}`);
      const emailMatch = response.data;
      console.log(emailMatch)
      if (emailMatch && emailMatch.some(el => el.email == email))
        signupErrorBuffer[0] = `This email is taken`;
    }

    if (!signupErrorBuffer[1]) {
      const response = await axios.get(`http://localhost:8000/api/users/?username=${username}`)
      const usernameMatch = response.data;
      if (usernameMatch && usernameMatch.some(el => el.username == username))
        signupErrorBuffer[1] = `This username is taken`;
    }

    if (!signupErrorBuffer.some(el => el != null)) {
      const response = await fetch("http://localhost:8000/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "email": email,
          "username": username,
          "password": password1
        })
      })
      const user = await response.json();
      setCookie(user.id);
    }

    setSignupFormErrors(signupErrorBuffer);
  }

  const getPage = route => {
    switch (route){
      case "signup":
        return (<SignupPage signupUser={signupUser} formErrors={signupFormErrors}/>);
      case "homepage":
        return (<HomePage gameList={gameList} updateList={updateList}/>)
      case "login":
        return (<LoginPage setCurrentPage={setCurrentPage} login={loginUser}/>);
    }
  }

  return (
    <>
      {getPage(currentPage)}
    </>
  );
}


export default App;
