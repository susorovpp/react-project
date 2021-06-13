import { Component } from "react";
import "./App.css";
import Layout from "./hoc/Layout/Layout";
import Checkers from "./containers/Checkers/Checkers";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Checkers />
        </Layout>
      </div>
    );
  }
}

export default App;
