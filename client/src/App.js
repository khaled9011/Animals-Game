import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Signup from "./components/signup";
import Login from "./components/login";
import Landing from "./components/landing";
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";

import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={}>
      <Router>
        <div className="App" id="background">
          <div id="background-tint">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Footer />
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
