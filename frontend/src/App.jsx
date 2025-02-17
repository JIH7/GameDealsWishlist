import { useState, Component } from 'react';
import axios from "axios";
import './App.css';

import HomePage from './pages/home/home_page';

class App extends Component {
  constructor(props) {
    super(props);

    const[gamesList, setGamesList] = useState();
  }

  async componentDidMount() {
    await this.refreshList()
  }

  async refreshList() {
    try {
      let response = await axios.get("http://localhost:8000/api/games/");
      setGamesList(response.data);
      console.log(response.data);
    }
    catch(error) {
      console.log(error);
    }
  }

  render() {
    return (
      <>
        <HomePage />
      </>
    );
  }
}

export default App;
