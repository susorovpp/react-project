import { Component } from "react";
import { connect } from "react-redux";
import "./Frequency.css";

class Frequency extends Component {
  renderDaysOptions() {
    const days = [
      { value: 1, title: "Понедельник" },
      { value: 2, title: "Вторник" },
      { value: 3, title: "Среда" },
      { value: 4, title: "Четверг" },
      { value: 5, title: "Пятница" },
      { value: 6, title: "Суббота" },
      { value: 0, title: "Воскресение" },
    ];

    return days.map((day, index) => {
      return (
        <option key={index} value={day.value}>
          {day.title}
        </option>
      );
    });
  }

  renderMonthsOptions() {
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    return months.map((month) => {
      return (
        <option key={month} value={month}>
          {month}
        </option>
      );
    });
  }

  render() {
    return (
      <div>
        <label>
          <input
            type="radio"
            name="frequency"
            checked={this.props.isWeekChecked}
            onChange={this.props.onIsWeekChange}
          />
          еженедельно в
          <select
          className="Select"
          value={this.props.selectedDay}
          onChange={(event) => {
            if (this.props.isWeekChecked) {
              this.props.onAddDay(event);
            }
          }}
        >
          {this.renderDaysOptions()}
        </select>
        </label>

        

        <label>
          <input
            type="radio"
            name="frequency"
            checked={this.props.isMonthChecked}
            onChange={this.props.onIsMonthChange}
          />
          ежемесячно
          <select
          className="Select"
          value={this.props.selectedMonth}
          onChange={(event) => {
            if (this.props.isMonthChecked) {
              this.props.onAddMonth(event);
            }
          }}
        >
          {this.renderMonthsOptions()}
        </select>
        </label>

        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedDay: state.selectedDay,
    selectedMonth: state.selectedMonth,
    isWeekChecked: state.isWeekChecked,
    isMonthChecked: state.isMonthChecked,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onIsWeekChange: () => dispatch({ type: "ISWEEKCHANGE" }),
    onIsMonthChange: () => dispatch({ type: "ISMONTHCHANGE" }),
    onAddDay: (event) =>
      dispatch({ type: "DAY", selectedDay: +event.target.value }),
    onAddMonth: (event) =>
      dispatch({ type: "MONTH", selectedMonth: +event.target.value }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Frequency);
