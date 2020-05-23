import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import BoatBoard from "./components/BoatBoard";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddBoat from "./components/Boat/AddBoat";
import { Provider } from "react-redux";
import store from "./store";
import UpdateBoat from "./components/Boat/UpdateBoat";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navigation />
            <Route exact path="/" component={BoatBoard} />
            <Route exact path="/addBoat" component={AddBoat} />
            <Route
              exact
              path="/updateBoat/:pt_id"
              component={UpdateBoat}
            />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
