import { Component } from "react";
import "./FormContainer.css";
import Frequency from "./../../components/Frequency/Frequency";
import Time from "./../../components/Time/Time";
import Amount from "./../../components/Amount/Amount";
import WillWork from "../../components/WillWork/Output";
import { connect } from "react-redux";

class FormContainer extends Component {
  getWeekDates = (targetDay, unlimited, steps, time, endDate) => {
    const currentDate = new Date();
    const targetDate = new Date();
    const delta = targetDay - currentDate.getDay();
    const result = [];
    let counter = 0;
    let stepsCount = unlimited;

    // if (this.props.isUnlimitedChecked) {
    //   stepsCount = unlimited;
    // }

    if (this.props.isCountChecked) {
      stepsCount = steps;
    }

    currentDate.setHours(time.slice(0, 2), time.slice(3, 5));

    delta >= 0
      ? targetDate.setDate(currentDate.getDate() + delta)
      : targetDate.setDate(currentDate.getDate() + 7 + delta);

    while (counter < stepsCount) {
      if (
        this.props.isDateChecked && (
        currentDate >= new Date(endDate))
      ) {
        console.log("зашел в if")
        break;
      }

      if (counter === 5) {
        result.push({
          date: "-//-//-//-",
        });
        break;
      }

      result.push({
        date: targetDate.getDate(),
        month: targetDate.getMonth(),
        hours: time.slice(0, 2),
        minutes: time.slice(3, 5),
      });

      currentDate.setDate(targetDate.getDate());
      targetDate.setDate(targetDate.getDate() + 7);
      counter += 1;
    }

    this.props.setOutput(result);
  };

  getMonthDates = (targetMonth, unlimited, steps, time, endDate) => {
    const currentDate = new Date();
    const result = [];
    let stepsCount = unlimited;
    let counter = 0;

    // if (this.props.isUnlimitedChecked) {
    //   stepsCount = unlimited;
    // }

    if (this.props.isCountChecked) {
      stepsCount = steps;
    }

    while (counter < stepsCount) {
      
      if (
        this.props.isDateChecked && (
        currentDate >= new Date(endDate))
      ) {
        console.log("зашел в if")
        break;
      }

      currentDate.setMonth(currentDate.getMonth() + targetMonth);

      if (counter === 5) {
        result.push({
          date: "-//-//-//-",
          month: null,
        hours: null,
        minutes: null,
        });
        break;
      }

      result.push({
        date: currentDate.getDate(),
        month: currentDate.getMonth(),
        hours: time.slice(0, 2),
        minutes: time.slice(3, 5),
      });

      counter += 1;
    }

    this.props.setOutput(result);
  };

  componentDidMount() {
    // console.log(this.props);

    if (this.props.isWeekChecked) {
      this.getWeekDates(
        this.props.selectedDay,
        this.props.unlimited,
        this.props.count,
        this.props.time,
        this.props.endDate,
      );
    }

    if (this.props.isMonthChecked) {
      this.getMonthDates(
        this.props.selectedMonth,
        this.props.unlimited,
        this.props.count,
        this.props.time,
        this.props.endDate,
      );
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props && this.props.isWeekChecked) {
      this.getWeekDates(
        this.props.selectedDay,
        this.props.unlimited,
        this.props.count,
        this.props.time,
        this.props.endDate,
      );
    }

    if (prevProps !== this.props && this.props.isMonthChecked) {
      this.getMonthDates(
        this.props.selectedMonth,
        this.props.unlimited,
        this.props.count,
        this.props.time,
        this.props.endDate
      );
    }

    // console.log("prevProps", prevProps);
    // console.log("this.props", this.props);
  }

  render() {
    return (
      <form className="container">
        <ul>
          <li>
            <span>Частота</span>
            <Frequency />
          </li>
          <li>
            <span>Время</span>
            <Time />
          </li>
          <li>
            <span>Кол-во</span>
            <Amount />
          </li>
          <li>
            <span>Сработает</span>
            <WillWork />
          </li>
        </ul>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedDay: state.selectedDay,
    selectedMonth: state.selectedMonth,
    unlimited: state.unlimited,
    isWeekChecked: state.isWeekChecked,
    isMonthChecked: state.isMonthChecked,
    isDateChecked: state.isDateChecked,
    endDate: state.endDate,
    count: state.count,
    isCountChecked: state.isCountChecked,
    isUnlimitedChecked: state.isUnlimitedChecked,
    time: state.time,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setOutput: (result) => dispatch({ type: "OUTPUT", result: result }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
