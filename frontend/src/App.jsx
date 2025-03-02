import { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';

import HomePage from './pages/home/home_page';
import SignupPage from './pages/signup/signup_page';
import LoginPage from './pages/login/login_page';

function App() {
  // State to handle page routes
  const [currentPage, setCurrentPage] = useState("login");

  const [gameList, setGameList] = useState();

  const [signupFormErrors, setSignupFormErrors] = useState([null, null, null, null]);

  // Requests the user's gamelist from the django API
  // ToDo: Give gamelist items FK for user
  const updateList = async () => {
    try {
      let response = await axios.get("http://localhost:8000/api/games/");
      let data = await response.data;
      setGameList(data);
    }
    catch (error) {
      console.log(error)
    }
  };

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

    if (!signupErrorBuffer.some(el => el != null)) {
      const response = await axios.get(`http://localhost:8000/api/users/?email=${email}`);
      const emailMatch = response.data;
      console.log(emailMatch)
      if (emailMatch && emailMatch.some(el => el.email == email))
        signupErrorBuffer[0] = `This email is taken`;
    }

    if (!signupErrorBuffer.some(el => el != null)) {
      const response = await axios.get(`http://localhost:8000/api/users/?username=${username}`)
      const usernameMatch = response.data;
      if (usernameMatch && usernameMatch.some(el => el.username == username))
        signupErrorBuffer[1] = `This username is taken`;
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
        return (<LoginPage setCurrentPage={setCurrentPage}/>);
    }
  }

  return (
    <>
      {getPage(currentPage)}
    </>
  );
}


export default App;
