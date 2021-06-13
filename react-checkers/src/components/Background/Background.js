const WHITE = "rbg(100, 133, 68)";
const BLACK = "rgb(102, 148, 107)";

const Cell = (props) => {
  // Сделать обработку цвета
  // const offset = props.row % 2 === 0 ? 1 : 0;
  // const backgroundColor = (props.col + ) % 2 === 0 ? WHITE : BLACK;

  return (
    <div
      style={{
        width: "50px",
        height: "50px",
        textAlign: "center",
        lineHeight: "45px",
        border: "1px solid rgb(100, 133, 68)",
        margin: "-1px -1px 0 0",
        boxSizing: "border-box",
        backgroundColor,
      }}
    >
      {props.row}
      {props.col}
    </div>
  );
};

const Row = (props) => {
  const cols = [8, 7, 6, 5, 4, 3, 2, 1];

  return (
    <div style={{ flex: 1, flexDirection: "row" }}>
      {cols.map((col, index) => {
        return <Cell key={index} row={props.row} col={col} />;
      })}
    </div>
  );
};

const Background = () => {
  const row = ["a", "b", "c", "d", "e", "f", "j", "h"];

  return (
    <div style={{ width: "400px", height: "400px", display: "flex" }}>
      {row.map((row, index) => {
        return <Row key={index} row={row} />;
      })}
    </div>
  );
};

export default Background;
