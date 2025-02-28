import { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';

import HomePage from './pages/home/home_page';

function App() {
  const [gameList, setGameList] = useState();

  // Requests the user's gamelist from the django API
  // ToDo: Give gamelist items FK for user
  const UpdateList = async () => {
    try {
      let response = await axios.get("http://localhost:8000/api/games/");
      let data = await response.data;
      setGameList(data);
    }
    catch (error) {
      console.log(error)
    }
  };
  // Fetch game list when component mounts
  useEffect(() => UpdateList, []);

  return (
    <>
      <HomePage gameList={gameList} />
    </>
  );
}


export default App;
