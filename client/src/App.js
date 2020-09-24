//Import dependencies
import React, { useEffect } from 'react';
import './App.css';

//Import redux components
import { Provider } from "react-redux";
import store from "./store";

//Import chat components
import Chat from "./components/chat/Chat"

//Import action
import { createSession } from "./actions/chatAction";

//Import axios
import axios from "axios";

//Remove the previous session on refresh
if (localStorage.session) {
  localStorage.removeItem('session');
  delete axios.defaults.headers.common["session_id"];
}

//Connect app to redux
const App = () => {
  useEffect(() => {
    //Create a sessionCheck if there isn't any
    if (!localStorage.session) {
      store.dispatch(createSession())
    }
  })
  return (
    <Provider store={store} >
      <div className="container">
        <Chat></Chat>
      </div >
    </Provider >
  );
}

export default App;
