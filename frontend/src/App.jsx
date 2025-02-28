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

  const signupUser = (email, username, password1, password2) => {

  }

  const getPage = (route) => {
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
