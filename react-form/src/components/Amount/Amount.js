import { Component } from "react";
import { connect } from "react-redux";
import "./Amount.css";

class Amount extends Component {
  render() {
    return (
      <div className="Amount">
        <label>
          <input
            type="radio"
            name="amount"
            checked={this.props.isUnlimitedChecked}
            onChange={this.props.onUnlimitedChecked}
          />
          <span>неограниченно</span>
        </label>

        <label>
          <input
            type="radio"
            name="amount"
            checked={this.props.isCountChecked}
            onChange={this.props.onCountChecked}
          />
          <input
            className="AmountInputNumber"
            type="number"
            value={this.props.count}
            onChange={(event) => {
              if (this.props.isCountChecked) {
                this.props.onAddCount(event);
              }
            }}
          />
          <span>раза</span>
        </label>

        <label>
          <input
            type="radio"
            name="amount"
            checked={this.props.isDateChecked}
            onChange={this.props.onDateChecked}
          />
          <span>до</span>
          <input
            className="AmountInputDate"
            type="date"
            value={this.props.endDate}
            onChange={(event) => {
              if (this.props.isDateChecked) {
                this.props.onAddDate(event);
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
    onAddCount: (event) =>
      dispatch({ type: "ADDCOUNT", count: event.target.value }),
    onAddDate: (event) =>
      dispatch({ type: "ADDDATE", endDate: event.target.value }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Amount);
