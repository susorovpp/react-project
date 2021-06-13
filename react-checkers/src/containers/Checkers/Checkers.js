import { Component } from "react";
import classes from "./Checkers.module.css";
import Background from "../../components/Background/Background";

class Checkers extends Component {
  render() {
    return (
      <div className={classes.Checkers}>
        <h1>Chekers</h1>
        <Background />
      </div>
    );
  }
}

export default Checkers;

/* <div className={classes.Checkers}>
  <h1>Chekers</h1>
  <Background rows={this.state.rows} />
</div>; */
