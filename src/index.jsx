import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route,Routes} from "react-router-dom";
import App from './App';
import Login from './Login'
import Track from './Track';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/track" element={<Track/>}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


