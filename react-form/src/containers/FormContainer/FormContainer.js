import { Component } from "react";
import "./FormContainer.css";
import Frequency from "./../../components/Frequency/Frequency";
import Time from "./../../components/Time/Time";
import Amount from "./../../components/Amount/Amount";
import Output from "../../components/Output/Output";
import { connect } from "react-redux";
import Modal from "../../components/Modal/Modal";
import React from "react";

class FormContainer extends Component {
  /**
   * Функция получает массив объектов с еженедельными датами в соответствии с переданными параметрами
   * @param {Number} targetDay выбранный пользователем в поле select день недели
   * @param {Number} unlimited количество повторов при неограниченном количестве
   * @param {Number} steps количество повторов, заданных пользователем вручную
   * @param {String} time время, вводимое пользователем в одноименное поле. По умолчанию установлено "00:00"
   * @param {String} endDate дата, до которой необходимо выполнять повтор
   * @returns {Array} возвращает массив объектов с информацией по каждой дате (day, month, hours, minutes) и устанавливается результат в state
   */
  getWeekDates = (targetDay, unlimited, steps, time, endDate) => {
    const currentDate = new Date();
    const targetDate = new Date();
    const delta = targetDay - currentDate.getDay();
    const result = [];
    let counter = 0;
    let stepsCount = unlimited;

    if (this.props.isCountChecked) {
      stepsCount = steps;
    }

    currentDate.setHours(time.slice(0, 2), time.slice(3, 5));

    delta > 0
      ? targetDate.setDate(currentDate.getDate() + delta)
      : targetDate.setDate(currentDate.getDate() + 7 + delta);

    while (counter < stepsCount) {
      if (this.props.isDateChecked && targetDate >= new Date(endDate)) {
        this.props.setOutput(result);
        return;
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

      currentDate.setDate(targetDate.getDate()); //
      targetDate.setDate(targetDate.getDate() + 7);
      counter += 1;
    }

    this.props.setOutput(result);
  };

  /**
   * Функция получает массив объектов с ежемесячными датами в соответствии с переданными параметрами
   * @param {Number} targetDay выбранный пользователем в поле select день недели
   * @param {Number} unlimited количество повторов при неограниченном количестве
   * @param {Number} steps количество повторов, заданных пользователем вручную
   * @param {String} time время, вводимое пользователем в одноименное поле. По умолчанию установлено "00:00"
   * @param {String} endDate дата, до которой необходимо выполнять повтор
   * @returns {Array} возвращает массив объектов с информацией по каждой дате (day, month, hours, minutes) и устанавливается результат в state
   */
  getMonthDates = (targetMonth, unlimited, steps, time, endDate) => {
    const currentDate = new Date();
    const result = [];
    let stepsCount = unlimited;
    let counter = 0;

    if (this.props.isCountChecked) {
      stepsCount = steps;
    }

    while (counter < stepsCount) {
      currentDate.setMonth(currentDate.getMonth() + targetMonth);
      if (this.props.isDateChecked && currentDate > new Date(endDate)) {
        break;
      }

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
    if (this.props.isWeekChecked) {
      this.getWeekDates(
        this.props.selectedDay,
        this.props.unlimited,
        this.props.count,
        this.props.time,
        this.props.endDate
      );
    }

    if (this.props.isMonthChecked) {
      this.getMonthDates(
        this.props.selectedMonth,
        this.props.unlimited,
        this.props.count,
        this.props.time,
        this.props.endDate
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
        this.props.endDate
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
  }

  render() {
    return (
      <React.Fragment>
        <h1>Настройка повтора платежей</h1>
        <form className="FormContainer">
          <ul>
            <li>
              <span>Частота</span>
              <div>
                <Frequency />
                <Modal />
              </div>
            </li>
            <li>
              <span>Время</span>
              <div>
                <Time />
              </div>
            </li>
            <li>
              <span>Кол-во</span>
              <div>
                <Amount />
              </div>
            </li>
            <li>
              <span>Сработает</span>
              <div>
                <Output />
              </div>
            </li>
            <li>
              <div>
                <button>Сохранить</button>
              </div>
            </li>
          </ul>
        </form>
      </React.Fragment>
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
