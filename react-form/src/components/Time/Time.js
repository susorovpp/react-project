import { Component } from "react";
import { connect } from "react-redux";

class Time extends Component {
  render() {
    return (
      <div>
        <input
          type="time"
          onChange={this.props.onAddTime}
          value={this.props.time}
        />
        <span> (+4 utc, время московское)</span>
      </div>
    );
  }
}
// написать, механизм передачи выставленного значения в state

function mapStateToProps(state) {
  return {
    time: state.time,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAddTime: (event) => dispatch({ type: "TIME", time: event.target.value }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Time);
