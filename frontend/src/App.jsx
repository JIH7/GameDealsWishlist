import { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';

import HomePage from './pages/home/home_page';

function App() {
  const [gameList, setGameList] = useState();

  const UpdateList = async () => {
    try {
      let response = await axios.get("http://localhost:8000/api/games/");
    }
    catch (error) {
      console.log(error)
    }
  };

  useEffect(() => UpdateList(), []);

  return (
    <>
      <HomePage />
    </>
  );
}


export default App;
