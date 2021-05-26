import React from "react";
import { Component } from "react";
import "./Modal.css";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = { isModalOpen: false };
  }

  /**
   * Функция, которая меняет значение свойства isModalOpen с false на true и наоборот
   */
  onToogleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  render() {
    return (
      <div>
        <a href="/#" className="link" onClick={this.onToogleModal}>
          Выбрать даты
        </a>
        {this.state.isModalOpen === false ? null : (
          <div>
            <div className="Calendar" onClose={this.onToogleModal}>
              Здесь будет календарь
            </div>
            <div className="Bg" onClick={this.onToogleModal}></div>
          </div>
        )}
        <div></div>
      </div>
    );
  }
}

export default Modal;
