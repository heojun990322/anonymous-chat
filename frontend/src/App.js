import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Authpage from './Pages/Authpage';
import Chatpage from './Pages/Chatpage';
import Mainpage from './Pages/Mainpage';

function App() {
  return (
    <div className="App">
      <Route path="/" component={Mainpage} exact />
      <Route path="/chats" component={Chatpage} />
      <Route path="/login" component={Authpage} exact />
    </div>
  );
}

export default App;
