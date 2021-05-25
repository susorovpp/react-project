import { Component } from "react";
import { connect } from "react-redux";

class Amount extends Component {
  render() {
    return (
      <div>
        <label>
          <input
            type="radio"
            name="amount"
            checked={this.props.isUnlimitedChecked}
            onChange={this.props.onUnlimitedChecked}
          />
          неограниченно
        </label>

        <label>
          <input
            type="radio"
            name="amount"
            checked={this.props.isCountChecked}
            onChange={this.props.onCountChecked}
          />
          <input
            type="number"
            value={this.props.count}
            onChange={(event) => {
              if (this.props.isCountChecked) {
                this.props.onAddCount(event)
              }
              
            }}
          />
          раза
        </label>

        <label>
          <input
            type="radio"
            name="amount"
            checked={this.props.isDateChecked}
            onChange={this.props.onDateChecked}
          />
          до
          <input
            type="date"
            value={this.props.endDate}
            onChange={(event) => {
              if (this.props.isDateChecked) {
                this.props.onAddDate(event)
              }
              
            }}
          />
        </label>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    unlimited: state.unlimited,
    isUnlimitedChecked: state.isUnlimitedChecked,
    count: state.count,
    isCountChecked: state.isCountChecked,
    endDate: state.endDate,
    isDateChecked: state.isDateChecked,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUnlimitedChecked: () => dispatch({ type: "UNLIMITED" }),
    onCountChecked: () => dispatch({ type: "COUNT" }),
    onDateChecked: () => dispatch({ type: "DATE" }),
    onAddCount: (event) => dispatch({type: "ADDCOUNT", count: event.target.value}),
    onAddDate: (event) => dispatch({type: "ADDDATE", endDate: event.target.value})
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Amount);
