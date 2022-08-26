import React from "react";
import ReactDOM from "react-dom";
import App from "./setup/ap";
import { AuthContextProvider } from './setup/contexs/AuthContex.js'


ReactDOM.render(

  <React.StrictMode>
  <AuthContextProvider>  
      <App />
  </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
