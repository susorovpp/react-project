import { Component } from "react";
import { connect } from "react-redux";

class Output extends Component {
  render() {
    const monthRu = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];

    return (
      <div>
        {this.props.output.map((item, index) => {
          return (
            <div key={index}>
              {item.date === "-//-//-//-"
                ? `${item.date}`
                : `${item.date} ${monthRu[item.month]} в ${item.hours}:${
                    item.minutes
                  }`}
            </div>
          );
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    output: state.output,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Output);
