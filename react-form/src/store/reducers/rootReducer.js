const initialState = {
  selectedDay: 1,
  selectedMonth: 1,
  isWeekChecked: true,
  isMonthChecked: false,
  isUnlimitedChecked: true,
  isCountChecked: false,
  isDateChecked: false,
  unlimited: 6,
  count: 1,
  endDate: "2021-06-19",
  output: [],
  time: "00:00",
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "ISWEEKCHANGE":
      return {
        ...state,
        isWeekChecked: !state.isWeekChecked,
        isMonthChecked: !state.isMonthChecked,
      };
    case "ISMONTHCHANGE":
      return {
        ...state,
        isMonthChecked: !state.isMonthChecked,
        isWeekChecked: !state.isWeekChecked,
      };
    case "DAY":
      return {
        ...state,
        selectedDay: action.selectedDay,
      };
    case "MONTH":
      return {
        ...state,
        selectedMonth: action.selectedMonth,
      };
    case "UNLIMITED":
      return {
        ...state,
        isUnlimitedChecked: true,
        isCountChecked: false,
        isDateChecked: false,
      };
    case "COUNT":
      return {
        ...state,
        isUnlimitedChecked: false,
        isCountChecked: true,
        isDateChecked: false,
      };
    case "DATE":
      return {
        ...state,
        isUnlimitedChecked: false,
        isCountChecked: false,
        isDateChecked: true,
      };
    case "ADDCOUNT":
      return {
        ...state,
        count: action.count,
      };
    case "ADDDATE":
      return {
        ...state,
        endDate: action.endDate,
      };
    case "OUTPUT":
      return {
        ...state,
        output: action.result,
      };
    case "TIME":
      return {
        ...state,
        time: action.time,
      };
    default:
      return state;
  }
}
