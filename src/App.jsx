import React from 'react';
//import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Routes} from "react-router-dom";
//import App from './App';
import Login from './Login'
import Track from './Track';

function App(){
  return(
    <Router>
      <div>
        <Routes path="/login" component={Login}/>
        <Routes path="/track" componet={Track}/>
      </div>
    </Router>
  );
}




export default App;
